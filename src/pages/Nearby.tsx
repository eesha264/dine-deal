import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import FeedbackButton from "@/components/FeedbackButton";
import { sampleRestaurants } from "@/data/sampleRestaurants";

const Nearby = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Nearby Deals</h1>
            <p className="text-muted-foreground">Discover the best restaurant offers in your area</p>
          </div>

          <div className="space-y-6">
            {sampleRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FeedbackButton />
    </div>
  );
};

export default Nearby;
