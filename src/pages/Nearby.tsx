import { useState } from "react";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import FeedbackButton from "@/components/FeedbackButton";
import FilterToggle, { type FilterOption } from "@/components/FilterToggle";
import { sampleRestaurants } from "@/data/sampleRestaurants";

const Nearby = () => {
  const [filter, setFilter] = useState<FilterOption>("best");

  // Sort based on filter
  const sortedRestaurants = [...sampleRestaurants].sort((a, b) => {
    if (filter === "highest") {
      const aMax = Math.max(...a.offers.map(o => parseInt(o.discount.match(/\d+/)?.[0] || "0")));
      const bMax = Math.max(...b.offers.map(o => parseInt(o.discount.match(/\d+/)?.[0] || "0")));
      return bMax - aMax;
    }
    return 0;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="mb-2">
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                Nearby Deals in Hyderabad
              </h1>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  Banjara Hills • Jubilee Hills • Gachibowli • Madhapur • Hitech City
                </span>
              </div>
            </div>
            <FilterToggle selected={filter} onChange={setFilter} />
          </div>

          <div className="space-y-6">
            {sortedRestaurants.map((restaurant) => (
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
