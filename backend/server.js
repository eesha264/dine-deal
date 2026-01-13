const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { spawn } = require('child_process');
const path = require('path');
const connectDB = require('./config/db');
const Restaurant = require('./models/Restaurant');

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/offers', async (req, res) => {
    const { name, city, lat, lng } = req.query;

    if (!name || !city) {
        return res.status(400).json({ error: 'Name and city are required' });
    }

    try {
        // 1. Check DB for fresh data (less than 1 hour old)
        const restaurant = await Restaurant.findByFuzzyName(name).findOne();

        if (restaurant && restaurant.cached_offers && restaurant.cached_offers.length > 0) {
            const lastUpdated = new Date(restaurant.cached_offers[0].last_updated);
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

            if (lastUpdated > oneHourAgo) {
                console.log('Returning cached data for', name);
                return res.json(restaurant);
            }
        }

        console.log('Scraping data for', name);

        // 2. Scrape data if no fresh cache
        const scraperPath = path.join(__dirname, '../scraper/engine.py');
        const pythonProcess = spawn('python3', [scraperPath, name, city]);

        let dataString = '';
        let errorString = '';

        pythonProcess.stdout.on('data', (data) => {
            dataString += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorString += data.toString();
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                console.error('Scraper failed:', errorString);
                return res.status(500).json({ error: 'Scraper failed', details: errorString });
            }

            try {
                const scrapedData = JSON.parse(dataString);

                if (scrapedData.error) {
                    // Even if scraper runs, it might return an application-level error
                    return res.status(404).json({ error: scrapedData.error });
                }

                // 3. Save to DB
                // Find existing or create new
                let doc = await Restaurant.findByFuzzyName(name).findOne();

                if (!doc) {
                    doc = new Restaurant({
                        name: name, // Use the query name as canonical if creating new, or ideally the scraped name
                        location: { lat, lng },
                        cached_offers: [scrapedData]
                    });
                } else {
                    // Update existing offers
                    // For simplicity, we replace the offers related to this provider or just push
                    // The requirement implies we want to store this scraped offer.
                    // We'll filter out old offers from this provider and add the new one.
                    doc.cached_offers = doc.cached_offers.filter(o => o.provider !== scrapedData.provider);
                    doc.cached_offers.push(scrapedData);
                    if (lat && lng) {
                        doc.location = { lat, lng };
                    }
                }

                await doc.save();
                res.json(doc);

            } catch (parseError) {
                console.error('JSON Parse Error:', parseError, dataString);
                res.status(500).json({ error: 'Failed to parse scraper output' });
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
