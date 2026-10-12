import type { BusinessConfig } from "../../types/business";
export const fernCoffee: BusinessConfig = {
  slug: "fern-coffee",
  name: "Fern & Filter",
  logo: "f&f.",
  description:
    "A leafy little escape for thoughtful brews and unhurried afternoons.",
  headline: "SLOW DOWN.\nSIP SOMETHING GOOD.",
  theme: {
    background: "#f0f2e8",
    ink: "#25362b",
    accent: "#345742",
    soft: "#dce3d2",
  },
  cover: { src: "/images/cafe.jpg", alt: "A bright café filled with greenery" },
  menu: [
    {
      id: "brews",
      name: "Our brews",
      items: [
        {
          name: "Filter Coffee",
          description: "A clean, gentle cup, brewed to order.",
          price: 150,
        },
        {
          name: "Oat Latte",
          description: "Espresso meets creamy oat milk.",
          price: 185,
        },
        {
          name: "Cold Brew",
          description: "Slow-steeped coffee served over ice.",
          price: 160,
        },
        {
          name: "Cold Brew",
          description: "Slow-steeped coffee served over ice.",
          price: 160,
        },
        {
          name: "Cold Brew",
          description: "Slow-steeped coffee served over ice.",
          price: 160,
        },
        {
          name: "Cold Brew",
          description: "Slow-steeped coffee served over ice.",
          price: 160,
        },
        {
          name: "Cold Brew",
          description: "Slow-steeped coffee served over ice.",
          price: 160,
        },
        {
          name: "Cold Brew",
          description: "Slow-steeped coffee served over ice.",
          price: 160,
        },
        {
          name: "Cold Brew",
          description: "Slow-steeped coffee served over ice.",
          price: 160,
        },
      ],
    },
  ],
  hours: [
    { days: "Tuesday – Sunday", time: "9:00 AM – 6:00 PM" },
    { days: "Monday", time: "Closed" },
  ],
  address:
    "8 Fictional Garden Road, Demo District, Philippines (fictional address)",
  links: {
    socials: [
      {
        platform: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Fcafelandgame%2F",
      },
    ],
  },
};
