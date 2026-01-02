import { MapPin, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import OfferCard from "./OfferCard";

export interface Offer {
  platform: string;
  discount: string;
  link: string;
  verified?: boolean;
  trending?: boolean;
  maxDiscount?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  location: string;
  cuisine: string;
  avgCost?: number;
  offers: Offer[];
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

// Calculate effective discount value for sorting
const getDiscountValue = (discount: string, maxDiscount?: number): number => {
  const percentMatch = discount.match(/(\d+)%/);
  if (percentMatch) {
    return parseInt(percentMatch[1]);
  }
  return 0;
};

// Calculate final payable amount
const calculateFinalAmount = (avgCost: number, discount: string, maxDiscount?: number): number => {
  const percentMatch = discount.match(/(\d+)%/);
  if (percentMatch && avgCost) {
    const percent = parseInt(percentMatch[1]);
    const discountAmount = (avgCost * percent) / 100;
    const effectiveDiscount = maxDiscount ? Math.min(discountAmount, maxDiscount) : discountAmount;
    return Math.round(avgCost - effectiveDiscount);
  }
  return avgCost;
};

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  // Sort offers by discount percentage (highest first) and identify best deal
  const sortedOffers = [...restaurant.offers].sort((a, b) => {
    // Calculate effective savings considering max discount caps
    const aFinal = restaurant.avgCost ? calculateFinalAmount(restaurant.avgCost, a.discount, a.maxDiscount) : 0;
    const bFinal = restaurant.avgCost ? calculateFinalAmount(restaurant.avgCost, b.discount, b.maxDiscount) : 0;
    
    // Lower final amount = better deal
    if (aFinal !== bFinal) return aFinal - bFinal;
    
    // Fallback to percentage comparison
    const aPercent = getDiscountValue(a.discount);
    const bPercent = getDiscountValue(b.discount);
    return bPercent - aPercent;
  });

  const bestDealPlatform = sortedOffers[0]?.platform;

  return (
    <Card className="overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover">
      <div className="grid gap-4 p-0 md:grid-cols-[280px_1fr]">
        {/* Restaurant Image & Info */}
        <div className="relative h-48 md:h-auto md:min-h-[200px]">
          <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="mb-1 text-xl font-bold">{restaurant.name}</h3>
            <p className="mb-1.5 text-sm opacity-90">{restaurant.cuisine}</p>
            <div className="flex items-center gap-1 text-xs opacity-80">
              <MapPin className="h-3 w-3" />
              <span>{restaurant.location}</span>
            </div>
            {restaurant.avgCost && (
              <p className="mt-1.5 text-xs opacity-70">
                ₹{restaurant.avgCost} for two (approx)
              </p>
            )}
          </div>
        </div>

        {/* Offers Section */}
        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-muted-foreground">Available Offers</h4>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Crown className="h-3.5 w-3.5 text-primary" />
              <span>Best deal highlighted</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedOffers.map((offer, index) => (
              <OfferCard 
                key={index} 
                offer={offer} 
                isBestDeal={offer.platform === bestDealPlatform}
                avgCost={restaurant.avgCost}
              />
            ))}
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground/70">
            * Final amount may vary. GST & service charges extra.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
