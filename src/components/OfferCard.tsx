import { ExternalLink, CheckCircle2, TrendingUp, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Offer } from "./RestaurantCard";

interface OfferCardProps {
  offer: Offer;
  isBestDeal?: boolean;
  avgCost?: number;
}

const platformColors: Record<string, string> = {
  Swiggy: "bg-primary",
  Zomato: "bg-secondary",
  District: "bg-accent text-accent-foreground",
  Magicpin: "bg-verified",
  EazyDiner: "bg-trending text-foreground",
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

const OfferCard = ({ offer, isBestDeal = false, avgCost }: OfferCardProps) => {
  const platformColor = platformColors[offer.platform] || "bg-primary";
  const finalAmount = avgCost ? calculateFinalAmount(avgCost, offer.discount, offer.maxDiscount) : null;

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden p-4 transition-all duration-300",
        isBestDeal 
          ? "border-2 border-primary bg-primary/5 shadow-md ring-1 ring-primary/20" 
          : "opacity-75 hover:opacity-100 hover:shadow-card-hover"
      )}
    >
      {/* Best Deal Badge */}
      {isBestDeal && (
        <div className="absolute -right-8 top-3 rotate-45 bg-primary px-10 py-0.5 text-[10px] font-bold text-primary-foreground shadow-sm">
          BEST DEAL
        </div>
      )}

      {/* Platform Badge */}
      <div className={cn(
        "mb-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white",
        platformColor
      )}>
        {offer.platform}
      </div>

      {/* Discount */}
      <div className="mb-2">
        <p className={cn(
          "text-2xl font-bold",
          isBestDeal ? "text-primary" : "text-foreground"
        )}>
          {offer.discount}
        </p>
        {offer.maxDiscount && (
          <p className="text-xs text-muted-foreground">
            up to ₹{offer.maxDiscount}
          </p>
        )}
      </div>

      {/* Final Amount */}
      {finalAmount && (
        <div className="mb-3 rounded-md bg-muted/50 px-2 py-1.5">
          <p className="text-[10px] text-muted-foreground">Est. final bill</p>
          <p className={cn(
            "text-lg font-bold",
            isBestDeal ? "text-verified" : "text-foreground"
          )}>
            ₹{finalAmount}
          </p>
        </div>
      )}

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {offer.verified && (
          <Badge variant="outline" className="border-verified/50 text-verified text-[10px] px-1.5 py-0">
            <CheckCircle2 className="mr-0.5 h-2.5 w-2.5" />
            Verified
          </Badge>
        )}
        {offer.trending && (
          <Badge variant="outline" className="border-trending/50 text-trending text-[10px] px-1.5 py-0">
            <TrendingUp className="mr-0.5 h-2.5 w-2.5" />
            Popular
          </Badge>
        )}
      </div>

      {/* CTA Button */}
      <Button
        variant={isBestDeal ? "default" : "outline"}
        size="sm"
        className={cn(
          "w-full transition-all",
          isBestDeal 
            ? "bg-primary hover:bg-primary/90" 
            : "group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
        )}
        onClick={() => window.open(offer.link, "_blank")}
      >
        Go to Offer
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
};

export default OfferCard;
