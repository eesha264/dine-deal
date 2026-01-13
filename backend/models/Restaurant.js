const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    external_ids: {
        type: Map,
        of: String
    },
    cached_offers: [{
        provider: String,
        discount: String,
        deep_link: String,
        last_updated: {
            type: Date,
            default: Date.now
        }
    }]
});

RestaurantSchema.statics.findByFuzzyName = function (name) {
    // Escapes special characters for regex, then creates a case-insensitive regex
    const safeName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.find({ name: new RegExp(safeName, 'i') });
};

module.exports = mongoose.model('Restaurant', RestaurantSchema);
