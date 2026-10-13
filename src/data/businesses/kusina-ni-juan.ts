import type { BusinessConfig } from "../../types/business";
export const kusinaNiJuan: BusinessConfig = {
  template: "restaurant",
  slug: "kusina-ni-juan",
  name: "Kusina ni Juan",
  logo: "kj.",
  headline: "A seat at our table.\nA taste of home.",
  description:
    "Filipino favorites, generous plates, and time together. Come hungry, bring your people, and settle in.",
  theme: {
    background: "#faf6ed",
    ink: "#292823",
    accent: "#99452f",
    soft: "#eee1ce",
  },
  cover: {
    src: "/images/restaurant-food.jpg",
    alt: "An illustrative spread of colorful dishes on a dining table",
  },
  menuDisplay: { mode: "vertical" },
  menu: [
    {
      id: "starters",
      name: "Starters",
      items: [
        {
          name: "Lumpiang Shanghai",
          description: "Crisp pork spring rolls with a sweet dipping sauce.",
          price: 195,
          bestSeller: true,
          allergens: ["Wheat", "Soy"],
        },
        {
          name: "Ensaladang Talong",
          description:
            "Grilled eggplant with tomatoes, onions, and a calamansi dressing.",
          price: 165,
          dietaryLabels: ["Vegetarian — sample label"],
        },
      ],
    },
    {
      id: "mains",
      name: "Main Dishes",
      items: [
        {
          name: "Chicken Adobo",
          description:
            "Chicken simmered in soy sauce, vinegar, bay leaves, and garlic. Served with rice.",
          price: 285,
          bestSeller: true,
          allergens: ["Soy", "Wheat"],
        },
        {
          name: "Sinigang na Baboy",
          description:
            "A tangy tamarind broth with pork and vegetables. Served with rice.",
          price: 325,
        },
        {
          name: "Kare-Kare",
          description:
            "Peanut stew with beef and vegetables, with bagoong on the side.",
          price: 365,
          allergens: ["Peanuts", "Shellfish"],
        },
      ],
    },
    {
      id: "sharing",
      name: "Sharing Platters",
      items: [
        {
          name: "Inihaw Family Platter",
          description:
            "Grilled chicken, pork, vegetables, and garlic rice. Suggested for 3–4.",
          price: 995,
          bestSeller: true,
        },
        {
          name: "Seafood Fiesta",
          description: "Grilled fish, prawns, and squid to share.",
          price: 1195,
          available: false,
          allergens: ["Fish", "Shellfish"],
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          name: "Halo-Halo",
          description:
            "Shaved ice, milk, sweet beans, jelly, and ube ice cream.",
          price: 165,
          allergens: ["Milk"],
        },
        {
          name: "Leche Flan",
          description: "Silky caramel custard, made for one more spoonful.",
          price: 120,
          allergens: ["Eggs", "Milk"],
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        {
          name: "Calamansi Cooler",
          description: "Bright citrus over ice.",
          price: 95,
        },
        {
          name: "Sago’t Gulaman",
          description:
            "A chilled brown-sugar drink with sago pearls and jelly.",
          price: 110,
        },
      ],
    },
  ],
  promotion: {
    eyebrow: "THE TABLE SPECIAL · DEMO OFFER",
    title: "Good food. Better together.",
    description:
      "The Inihaw Family Platter and four calamansi coolers. Fictional sample offer only.",
    price: 1250,
    image: {
      src: "/images/restaurant-food.jpg",
      alt: "Illustrative food spread, not the advertised platter",
    },
  },
  hours: [
    { days: "Monday – Thursday", time: "11:00 AM – 9:00 PM" },
    { days: "Friday – Sunday", time: "11:00 AM – 10:00 PM" },
  ],
  address:
    "24 Sample Mabuhay Street, Demo District, Metro Manila, Philippines (fictional address)",
  gallery: [
    {
      src: "/images/restaurant-food.jpg",
      alt: "Illustrative food spread on a dining table",
    },
    {
      src: "/images/dining.jpg",
      alt: "Illustrative restaurant dining room with warm lighting",
    },
  ],
  // Add verified client destinations to links; this fictional business has none.
};
