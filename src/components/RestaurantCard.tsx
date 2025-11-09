import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import OfferCard from "./OfferCard";

export interface Offer {
  platform: string;
  discount: string;
  link: string;
  verified?: boolean;
  trending?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  location: string;
  cuisine: string;
  offers: Offer[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  // Sort offers by discount percentage (highest first)
  const sortedOffers = [...restaurant.offers].sort((a, b) => {
    const aPercent = parseInt(a.discount.match(/\d+/)?.[0] || "0");
    const bPercent = parseInt(b.discount.match(/\d+/)?.[0] || "0");
    return bPercent - aPercent;
  });

  return (
    <Card className="overflow-hidden shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div className="grid gap-4 p-0 md:grid-cols-[300px_1fr]">
        {/* Restaurant Image & Info */}
        <div className="relative h-48 md:h-auto">
          <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="mb-1 text-xl font-bold">{restaurant.name}</h3>
            <p className="mb-1 text-sm opacity-90">{restaurant.cuisine}</p>
            <div className="flex items-center gap-1 text-xs opacity-80">
              <MapPin className="h-3 w-3" />
              <span>{restaurant.location}</span>
            </div>
          </div>
        </div>

        {/* Offers Section */}
        <div className="p-4">
          <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Available Offers</h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedOffers.map((offer, index) => (
              <OfferCard key={index} offer={offer} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
