export interface BusinessImage { src: string; alt: string }
export interface BusinessConfig {
  slug: string; name: string; logo: string; description: string; headline: string;
  theme: { background: string; ink: string; accent: string; soft: string };
  cover?: BusinessImage;
  menu: { id: string; name: string; items: { name: string; description?: string; price: number; image?: BusinessImage; badge?: string }[] }[];
  promotion?: { eyebrow: string; title: string; description: string; price?: number; image?: BusinessImage };
  hours?: { days: string; time: string }[];
  address?: string;
  links?: { directions?: string; phone?: string; socials?: { label: string; url: string }[]; review?: string };
  gallery?: BusinessImage[];
}
