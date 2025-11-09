import { useState } from "react";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/RestaurantCard";
import FeedbackButton from "@/components/FeedbackButton";
import { sampleRestaurants, topDeals } from "@/data/sampleRestaurants";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  // Filter restaurants based on search query
  const filteredRestaurants = showResults
    ? sampleRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero px-4 py-16 text-center text-white md:py-24">
          <div className="container mx-auto">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="text-4xl">🍽️</span>
              <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">DineDeal</h1>
            </div>
            <p className="mb-8 text-lg opacity-95 md:text-xl">Find the Best Dine-In Offers</p>
            <p className="mx-auto mb-12 max-w-2xl text-sm opacity-90 md:text-base">
              Compare discounts and cashback offers from Swiggy, Zomato, District, Magicpin, and EazyDiner - all in one place
            </p>

            <div className="flex justify-center">
              <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
            </div>
          </div>
        </section>

        {/* Results Section */}
        {showResults && (
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  {filteredRestaurants.length > 0 ? "Search Results" : "No Results Found"}
                </h2>
                {filteredRestaurants.length > 0 && (
                  <p className="mt-2 text-muted-foreground">
                    Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? "s" : ""} matching "{searchQuery}"
                  </p>
                )}
              </div>

              <div className="space-y-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>

              {filteredRestaurants.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">Try searching for "Spice Route", "Café", or "Sushi"</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Top Offers Section */}
        {!showResults && (
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="mb-8 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">Top Offers Near You</h2>
              </div>

              <div className="space-y-6">
                {topDeals.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <FeedbackButton />
    </div>
  );
};

export default Index;
