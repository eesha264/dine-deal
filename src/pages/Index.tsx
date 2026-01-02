import { useState, useEffect, useMemo } from "react";
import { Sparkles, MapPin, AlertCircle, Navigation, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/RestaurantCard";
import FeedbackButton from "@/components/FeedbackButton";
import FilterToggle, { type FilterOption } from "@/components/FilterToggle";
import { sampleRestaurants, topDeals } from "@/data/sampleRestaurants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation, calculateDistance, getLocationCoordinates } from "@/hooks/useGeolocation";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filter, setFilter] = useState<FilterOption>("best");
  const [showNonHydMessage, setShowNonHydMessage] = useState(false);
  
  const { latitude, longitude, area, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();

  // Auto-request location on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const commonNonHydLocations = ["bangalore", "mumbai", "delhi", "chennai", "pune", "kolkata"];
      const isNonHyd = commonNonHydLocations.some(loc => 
        searchQuery.toLowerCase().includes(loc)
      );
      
      setShowNonHydMessage(isNonHyd);
      setHasSearched(true);
    }
  };

  // Filter restaurants based on search query
  const filteredRestaurants = useMemo(() => {
    if (!hasSearched || !searchQuery.trim()) return [];
    
    return sampleRestaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [hasSearched, searchQuery]);

  // Sort restaurants based on filter and geolocation
  const sortedRestaurants = useMemo(() => {
    const restaurants = [...filteredRestaurants];
    
    if (filter === "highest") {
      return restaurants.sort((a, b) => {
        const aMax = Math.max(...a.offers.map(o => parseInt(o.discount.match(/\d+/)?.[0] || "0")));
        const bMax = Math.max(...b.offers.map(o => parseInt(o.discount.match(/\d+/)?.[0] || "0")));
        return bMax - aMax;
      });
    }
    
    if (filter === "nearest" && latitude && longitude) {
      return restaurants.sort((a, b) => {
        const aCoords = getLocationCoordinates(a.location);
        const bCoords = getLocationCoordinates(b.location);
        if (!aCoords || !bCoords) return 0;
        const aDist = calculateDistance(latitude, longitude, aCoords.lat, aCoords.lng);
        const bDist = calculateDistance(latitude, longitude, bCoords.lat, bCoords.lng);
        return aDist - bDist;
      });
    }
    
    return restaurants;
  }, [filteredRestaurants, filter, latitude, longitude]);

  // Sort top deals based on filter and geolocation
  const sortedTopDeals = useMemo(() => {
    const deals = [...topDeals];
    
    if (filter === "highest") {
      return deals.sort((a, b) => {
        const aMax = Math.max(...a.offers.map(o => parseInt(o.discount.match(/\d+/)?.[0] || "0")));
        const bMax = Math.max(...b.offers.map(o => parseInt(o.discount.match(/\d+/)?.[0] || "0")));
        return bMax - aMax;
      });
    }
    
    if (filter === "nearest" && latitude && longitude) {
      return deals.sort((a, b) => {
        const aCoords = getLocationCoordinates(a.location);
        const bCoords = getLocationCoordinates(b.location);
        if (!aCoords || !bCoords) return 0;
        const aDist = calculateDistance(latitude, longitude, aCoords.lat, aCoords.lng);
        const bDist = calculateDistance(latitude, longitude, bCoords.lat, bCoords.lng);
        return aDist - bDist;
      });
    }
    
    return deals;
  }, [filter, latitude, longitude]);

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
            
            {/* Location indicator */}
            <div className="mb-6 flex items-center justify-center gap-2">
              {geoLoading ? (
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Detecting your location...</span>
                </div>
              ) : area ? (
                <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-sm">
                  <Navigation className="h-4 w-4" />
                  <span>Near {area}</span>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={requestLocation}
                  className="text-white/80 hover:bg-white/20 hover:text-white"
                >
                  <MapPin className="mr-1.5 h-4 w-4" />
                  Enable location for nearby deals
                </Button>
              )}
            </div>

            <div className="mb-2 flex items-center justify-center gap-1.5 text-sm opacity-80">
              <MapPin className="h-4 w-4" />
              <span>Banjara Hills • Jubilee Hills • Gachibowli • Madhapur • Hitech City</span>
            </div>

            <div className="flex justify-center">
              <SearchBar 
                value={searchQuery} 
                onChange={(value) => {
                  setSearchQuery(value);
                  if (!value.trim()) {
                    setHasSearched(false);
                    setShowNonHydMessage(false);
                  }
                }} 
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

        {/* Geolocation Error Message */}
        {geoError && (
          <div className="container mx-auto px-4 pt-6">
            <Alert className="border-primary/30 bg-primary/5">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                {geoError}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Non-Hyderabad Message */}
        {showNonHydMessage && (
          <div className="container mx-auto px-4 pt-6">
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
        {hasSearched && !showNonHydMessage && (
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
                      {filter === "nearest" && latitude && " • Sorted by distance"}
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
        {!hasSearched && (
          <section className="px-4 py-12">
            <div className="container mx-auto">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                    Top Offers {area ? `Near ${area}` : "in Hyderabad"}
                  </h2>
                </div>
                <FilterToggle selected={filter} onChange={setFilter} />
              </div>

              {filter === "nearest" && !latitude && (
                <div className="mb-6">
                  <Button
                    variant="outline"
                    onClick={requestLocation}
                    disabled={geoLoading}
                    className="border-primary/30 text-primary hover:bg-primary/5"
                  >
                    {geoLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Detecting location...
                      </>
                    ) : (
                      <>
                        <Navigation className="mr-2 h-4 w-4" />
                        Enable location to sort by distance
                      </>
                    )}
                  </Button>
                </div>
              )}

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
