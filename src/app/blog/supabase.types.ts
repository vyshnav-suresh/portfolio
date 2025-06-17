export type BlogPost = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  featured_image_url?: string; // featured image URL (base64 or URL)
  status?: string; // e.g., 'active', 'featured', etc.
  image?: string; // deprecated, for backward compatibility
  author?: {
    name: string;
    image?: string;
  };
  category?: string;
  reading_time?: string;
  excerpt?: string;
};
