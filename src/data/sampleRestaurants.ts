import type { Restaurant } from "@/components/RestaurantCard";

export const sampleRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Spice Route",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    location: "Indiranagar, Bangalore",
    cuisine: "North Indian, Chinese",
    offers: [
      { platform: "Swiggy", discount: "50% off", link: "#", verified: true, trending: true },
      { platform: "Zomato", discount: "40% off", link: "#", verified: true },
      { platform: "District", discount: "30% off", link: "#" },
      { platform: "Magicpin", discount: "25% cashback", link: "#", verified: true },
      { platform: "EazyDiner", discount: "35% off", link: "#" },
    ],
  },
  {
    id: "2",
    name: "Café Milano",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    location: "Koramangala, Bangalore",
    cuisine: "Italian, Continental",
    offers: [
      { platform: "Zomato", discount: "50% off", link: "#", verified: true, trending: true },
      { platform: "Swiggy", discount: "45% off", link: "#", verified: true },
      { platform: "EazyDiner", discount: "40% off", link: "#" },
      { platform: "Magicpin", discount: "20% cashback", link: "#" },
    ],
  },
  {
    id: "3",
    name: "Sushi Express",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
    location: "Whitefield, Bangalore",
    cuisine: "Japanese, Asian",
    offers: [
      { platform: "District", discount: "60% off", link: "#", verified: true, trending: true },
      { platform: "Swiggy", discount: "50% off", link: "#", verified: true },
      { platform: "Zomato", discount: "45% off", link: "#" },
      { platform: "EazyDiner", discount: "35% off", link: "#" },
    ],
  },
  {
    id: "4",
    name: "BBQ Nation",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    location: "MG Road, Bangalore",
    cuisine: "Barbecue, Multi-cuisine",
    offers: [
      { platform: "Magicpin", discount: "30% cashback", link: "#", verified: true },
      { platform: "Swiggy", discount: "25% off", link: "#" },
      { platform: "Zomato", discount: "20% off", link: "#", trending: true },
    ],
  },
];

export const topDeals: Restaurant[] = [
  {
    id: "5",
    name: "Biryani Blues",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    location: "HSR Layout, Bangalore",
    cuisine: "Biryani, Indian",
    offers: [
      { platform: "Swiggy", discount: "60% off", link: "#", verified: true, trending: true },
      { platform: "Zomato", discount: "55% off", link: "#", verified: true },
    ],
  },
  {
    id: "6",
    name: "The Breakfast Club",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80",
    location: "JP Nagar, Bangalore",
    cuisine: "Breakfast, Cafe",
    offers: [
      { platform: "District", discount: "50% off", link: "#", verified: true, trending: true },
      { platform: "Magicpin", discount: "35% cashback", link: "#" },
    ],
  },
];
