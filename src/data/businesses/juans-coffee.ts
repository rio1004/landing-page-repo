import type { BusinessConfig } from "../../types/business";
export const juansCoffee: BusinessConfig = {
  slug: "juans-coffee",
  name: "Juan’s Coffee",
  logo: "jc.",
  description:
    "A little coffee, a little conversation. Your everyday corner for slow mornings and good company.",
  headline: "GOOD COFFEE.\nGREAT COMPANY.",
  theme: {
    background: "#f6f2e8",
    ink: "#29271f",
    accent: "#70452d",
    soft: "#e8ddca",
  },
  cover: {
    src: "/images/coffee.jpg",
    alt: "A warm cup of coffee on a wooden café table",
  },
  menu: [
    {
      id: "coffee",
      name: "Coffee",
      items: [
        {
          name: "Spanish Latte",
          description: "Espresso, silky milk & a sweet condensed-milk finish.",
          price: 165,
          badge: "HOUSE FAVORITE",
          image: {
            src: "/images/latte.jpg",
            alt: "Latte with delicate foam art",
          },
        },
        {
          name: "Americano",
          description:
            "A bold espresso, softened with hot water. Simple and satisfying.",
          price: 110,
        },
        {
          name: "Cappuccino",
          description: "Equal parts espresso, steamed milk & cloud-like foam.",
          price: 145,
        },
        {
          name: "Iced Vanilla Latte",
          description:
            "Espresso and vanilla over ice with your choice of milk.",
          price: 170,
        },
      ],
    },
    {
      id: "non-coffee",
      name: "Beyond coffee",
      items: [
        {
          name: "Matcha Latte",
          description: "Earthy green tea with creamy milk. Hot or iced.",
          price: 175,
        },
        {
          name: "Tablea Chocolate",
          description: "Rich Filipino-style cacao, served warm.",
          price: 155,
        },
      ],
    },
    {
      id: "bites",
      name: "Little bites",
      items: [
        {
          name: "Butter Croissant",
          description: "Golden, flaky layers. Best enjoyed with a coffee.",
          price: 95,
          image: { src: "/images/pastry.jpg", alt: "Fresh golden pastries" },
        },
        {
          name: "Banana Bread",
          description: "A comforting slice with walnuts and a soft crumb.",
          price: 85,
        },
      ],
    },
  ],
  links: {
    socials: [
      {
        platform: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Fcafelandgame%2F",
      },
    ],
  },
  promotion: {
    eyebrow: "A LITTLE EVERYDAY TREAT",
    title: "YOUR PERFECT PAIR.",
    description:
      "A Spanish latte + butter croissant. A small pause, made a little sweeter. Sample offer, available in this fictional demo only.",
    price: 230,
    image: {
      src: "/images/pastry.jpg",
      alt: "Buttery pastries ready for a coffee break",
    },
  },
  hours: [
    { days: "Monday – Friday", time: "7:00 AM – 8:00 PM" },
    { days: "Saturday – Sunday", time: "8:00 AM – 9:00 PM" },
  ],
  address:
    "12 Sample Lane, Demo District, Metro Manila, Philippines (fictional address)",
  gallery: [
    {
      src: "/images/cafe.jpg",
      alt: "Sunlit café interior with plants and wooden tables",
    },
    { src: "/images/latte.jpg", alt: "A close-up of latte art" },
    {
      src: "/images/coffee.jpg",
      alt: "Coffee and a quiet moment at a wooden table",
    },
  ],
};
