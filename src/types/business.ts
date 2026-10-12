export interface MenuItem { name: string; description?: string; price: number; image?: BusinessImage; badge?: string; dietaryLabels?: string[]; bestSeller?: boolean; available?: boolean }
export interface MenuDisplay { mode: 'vertical' | 'horizontal' | 'paginated'; pageSize?: number }
export interface SocialLink { platform: string; label: string; url: string }
export interface BusinessImage { src: string; alt: string }
export interface BusinessConfig {
  slug: string; name: string; logo: string; description: string; headline: string;
  theme: { background: string; ink: string; accent: string; soft: string };
  cover?: BusinessImage;
  menu: { id: string; name: string; items: MenuItem[] }[];
  menuDisplay?: MenuDisplay;
  promotion?: { eyebrow: string; title: string; description: string; price?: number; image?: BusinessImage };
  hours?: { days: string; time: string }[];
  address?: string;
  links?: { directions?: string; phone?: string; socials?: SocialLink[]; review?: string };
  gallery?: BusinessImage[];
}


