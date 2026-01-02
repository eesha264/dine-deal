import { useState } from "react";
import { Sparkles, MapPin, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/RestaurantCard";
import FeedbackButton from "@/components/FeedbackButton";
import FilterToggle, { type FilterOption } from "@/components/FilterToggle";
import { sampleRestaurants, topDeals, isHyderabadLocation } from "@/data/sampleRestaurants";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState<FilterOption>("best");
  const [showNonHydMessage, setShowNonHydMessage] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Check if search might be for non-Hyderabad location
      const commonNonHydLocations = ["bangalore", "mumbai", "delhi", "chennai", "pune", "kolkata"];
      const isNonHyd = commonNonHydLocations.some(loc => 
        searchQuery.toLowerCase().includes(loc)
      );
      
      setShowNonHydMessage(isNonHyd);
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

  // Sort based on filter
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (filter === "highest") {
      const aMax = Math.max(...a.offers.map(o => parseInt(o.discount.match(/\d+/)?.[0] || "0")));
      const bMax = Math.max(...b.offers.map(o => parseInt(o.discount.match(/\d+/)?.[0] || "0")));
      return bMax - aMax;
    }
    // For "best" and "nearest", we'll use a simple heuristic
    // In real app, "nearest" would use geolocation
    return 0;
  });

  const sortedTopDeals = [...topDeals].sort((a, b) => {
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero px-4 py-16 text-center text-white md:py-24">
          <div className="container mx-auto">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="text-4xl">🍽️</span>
              <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">DineDeal</h1>
            </div>
            <p className="mb-2 text-lg opacity-95 md:text-xl">
              Compare Dine-In Offers in Hyderabad
            </p>
            <div className="mb-8 flex items-center justify-center gap-1.5 text-sm opacity-80">
              <MapPin className="h-4 w-4" />
              <span>Banjara Hills • Jubilee Hills • Gachibowli • Madhapur • Hitech City</span>
            </div>

            <div className="flex justify-center">
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                onSearch={handleSearch}
                placeholder="Search restaurant, café, or area in Hyderabad..."
              />
            </div>

            {/* Platform indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs opacity-75">
              <span>Comparing:</span>
              <span className="rounded-full bg-white/20 px-3 py-1">Swiggy</span>
              <span className="rounded-full bg-white/20 px-3 py-1">Zomato</span>
              <span className="rounded-full bg-white/20 px-3 py-1">District</span>
              <span className="rounded-full bg-white/20 px-3 py-1">Magicpin</span>
              <span className="rounded-full bg-white/20 px-3 py-1">EazyDiner</span>
            </div>
          </div>
        </section>

        {/* Non-Hyderabad Message */}
        {showNonHydMessage && (
          <div className="container mx-auto px-4 pt-8">
            <Alert variant="destructive" className="border-secondary/30 bg-secondary/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                DineDeal currently supports <strong>Hyderabad only</strong>. 
                Try searching for restaurants in Banjara Hills, Jubilee Hills, Gachibowli, or other Hyderabad areas.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Results Section */}
        {showResults && !showNonHydMessage && (
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                    {sortedRestaurants.length > 0 ? "Search Results" : "No Results Found"}
                  </h2>
                  {sortedRestaurants.length > 0 && (
                    <p className="mt-1 text-muted-foreground">
                      Found {sortedRestaurants.length} restaurant{sortedRestaurants.length !== 1 ? "s" : ""} in Hyderabad
                    </p>
                  )}
                </div>
                <FilterToggle selected={filter} onChange={setFilter} />
              </div>

              <div className="space-y-6">
                {sortedRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>

              {sortedRestaurants.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Try searching for "Paradise", "Olive Bistro", or "Jubilee Hills"
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Top Offers Section */}
        {!showResults && (
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                    Top Offers in Hyderabad
                  </h2>
                </div>
                <FilterToggle selected={filter} onChange={setFilter} />
              </div>

              <div className="space-y-6">
                {sortedTopDeals.map((restaurant) => (
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
