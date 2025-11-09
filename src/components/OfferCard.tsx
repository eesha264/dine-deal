import { ExternalLink, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Offer } from "./RestaurantCard";

interface OfferCardProps {
  offer: Offer;
}

const platformColors: Record<string, string> = {
  Swiggy: "bg-primary",
  Zomato: "bg-secondary",
  District: "bg-accent",
  Magicpin: "bg-verified",
  EazyDiner: "bg-trending",
};

const OfferCard = ({ offer }: OfferCardProps) => {
  const platformColor = platformColors[offer.platform] || "bg-primary";

  return (
    <Card className="group relative overflow-hidden p-4 transition-all duration-300 hover:shadow-card-hover">
      {/* Platform Badge */}
      <div className={`mb-3 inline-flex items-center rounded-full ${platformColor} px-3 py-1 text-xs font-semibold text-white`}>
        {offer.platform}
      </div>

      {/* Discount */}
      <div className="mb-3">
        <p className="text-2xl font-bold text-foreground">{offer.discount}</p>
      </div>

      {/* Tags */}
      <div className="mb-3 flex flex-wrap gap-2">
        {offer.verified && (
          <Badge variant="outline" className="border-verified text-verified">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Verified
          </Badge>
        )}
        {offer.trending && (
          <Badge variant="outline" className="border-trending text-trending">
            <TrendingUp className="mr-1 h-3 w-3" />
            Trending
          </Badge>
        )}
      </div>

      {/* CTA Button */}
      <Button
        variant="outline"
        size="sm"
        className="w-full transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
        onClick={() => window.open(offer.link, "_blank")}
      >
        Go to Offer
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
};

export default OfferCard;
