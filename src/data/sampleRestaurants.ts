import type { Restaurant } from "@/components/RestaurantCard";

// Hyderabad areas for validation
export const hyderabadAreas = [
  "Banjara Hills",
  "Jubilee Hills", 
  "Gachibowli",
  "Madhapur",
  "Hitech City",
  "Kondapur",
  "Kukatpally",
  "Secunderabad",
  "Begumpet",
  "Somajiguda",
  "Ameerpet",
  "Himayatnagar",
  "Nampally",
  "Abids",
  "Charminar",
  "Tolichowki",
  "Mehdipatnam",
  "Attapur",
  "Film Nagar",
  "Road No 36"
];

export const isHyderabadLocation = (location: string): boolean => {
  const lowerLocation = location.toLowerCase();
  return hyderabadAreas.some(area => lowerLocation.includes(area.toLowerCase())) ||
    lowerLocation.includes("hyderabad");
};

export const sampleRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Paradise Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    location: "Secunderabad, Hyderabad",
    cuisine: "Biryani, Hyderabadi",
    avgCost: 800,
    offers: [
      { platform: "Swiggy", discount: "50% off", link: "#", verified: true, trending: true, maxDiscount: 150 },
      { platform: "Zomato", discount: "40% off", link: "#", verified: true, maxDiscount: 120 },
      { platform: "District", discount: "35% off", link: "#", maxDiscount: 100 },
      { platform: "Magicpin", discount: "25% cashback", link: "#", verified: true, maxDiscount: 200 },
      { platform: "EazyDiner", discount: "30% off", link: "#", maxDiscount: 90 },
    ],
  },
  {
    id: "2",
    name: "Olive Bistro",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    location: "Road No 46, Jubilee Hills, Hyderabad",
    cuisine: "Mediterranean, Continental",
    avgCost: 2000,
    offers: [
      { platform: "Zomato", discount: "50% off", link: "#", verified: true, trending: true, maxDiscount: 500 },
      { platform: "Swiggy", discount: "40% off", link: "#", verified: true, maxDiscount: 400 },
      { platform: "EazyDiner", discount: "45% off", link: "#", maxDiscount: 450 },
      { platform: "Magicpin", discount: "20% cashback", link: "#", maxDiscount: 300 },
    ],
  },
  {
    id: "3",
    name: "Tatva",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    location: "Banjara Hills, Hyderabad",
    cuisine: "North Indian, Mughlai",
    avgCost: 1500,
    offers: [
      { platform: "District", discount: "55% off", link: "#", verified: true, trending: true, maxDiscount: 400 },
      { platform: "Swiggy", discount: "45% off", link: "#", verified: true, maxDiscount: 350 },
      { platform: "Zomato", discount: "40% off", link: "#", maxDiscount: 300 },
      { platform: "EazyDiner", discount: "35% off", link: "#", maxDiscount: 280 },
    ],
  },
  {
    id: "4",
    name: "Cafe Niloufer",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    location: "Lakdikapul, Hyderabad",
    cuisine: "Cafe, Bakery, Irani",
    avgCost: 300,
    offers: [
      { platform: "Magicpin", discount: "30% cashback", link: "#", verified: true, maxDiscount: 100 },
      { platform: "Swiggy", discount: "20% off", link: "#", maxDiscount: 60 },
      { platform: "Zomato", discount: "15% off", link: "#", trending: true, maxDiscount: 50 },
    ],
  },
  {
    id: "5",
    name: "AB's - Absolute Barbecues",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    location: "Gachibowli, Hyderabad",
    cuisine: "Barbecue, Multi-cuisine",
    avgCost: 1200,
    offers: [
      { platform: "Swiggy", discount: "50% off", link: "#", verified: true, trending: true, maxDiscount: 300 },
      { platform: "Zomato", discount: "45% off", link: "#", verified: true, maxDiscount: 270 },
      { platform: "Magicpin", discount: "35% cashback", link: "#", maxDiscount: 350 },
      { platform: "EazyDiner", discount: "40% off", link: "#", maxDiscount: 250 },
    ],
  },
  {
    id: "6",
    name: "Pista House",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    location: "Charminar, Hyderabad",
    cuisine: "Hyderabadi, Biryani, Desserts",
    avgCost: 600,
    offers: [
      { platform: "Zomato", discount: "40% off", link: "#", verified: true, maxDiscount: 150 },
      { platform: "Swiggy", discount: "35% off", link: "#", maxDiscount: 130 },
      { platform: "District", discount: "30% off", link: "#", trending: true, maxDiscount: 100 },
    ],
  },
];

export const topDeals: Restaurant[] = [
  {
    id: "7",
    name: "Farzi Cafe",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80",
    location: "Hitech City, Hyderabad",
    cuisine: "Modern Indian, Fusion",
    avgCost: 1800,
    offers: [
      { platform: "Swiggy", discount: "60% off", link: "#", verified: true, trending: true, maxDiscount: 500 },
      { platform: "Zomato", discount: "55% off", link: "#", verified: true, maxDiscount: 450 },
      { platform: "EazyDiner", discount: "50% off", link: "#", maxDiscount: 400 },
    ],
  },
  {
    id: "8",
    name: "The Fisherman's Wharf",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
    location: "Madhapur, Hyderabad",
    cuisine: "Seafood, Goan",
    avgCost: 1600,
    offers: [
      { platform: "District", discount: "50% off", link: "#", verified: true, trending: true, maxDiscount: 400 },
      { platform: "Magicpin", discount: "40% cashback", link: "#", maxDiscount: 500 },
      { platform: "Zomato", discount: "45% off", link: "#", maxDiscount: 360 },
    ],
  },
  {
    id: "9",
    name: "Chutneys",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
    location: "Jubilee Hills, Hyderabad",
    cuisine: "South Indian, Andhra",
    avgCost: 500,
    offers: [
      { platform: "Zomato", discount: "45% off", link: "#", verified: true, trending: true, maxDiscount: 150 },
      { platform: "Swiggy", discount: "40% off", link: "#", verified: true, maxDiscount: 130 },
    ],
  },
];
