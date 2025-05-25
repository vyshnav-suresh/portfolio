export type BlogPost = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  image?: string; // featured image URL
  author?: {
    name: string;
    image?: string;
  };
  category?: string;
  reading_time?: string;
  excerpt?: string;
};
