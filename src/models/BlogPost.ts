import { Schema, Document, models, model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: Date;
  image?: string;
  featured?: boolean;
  tags?: string[];
  content: string;
  tableOfContents?: { id: string; label: string }[];
}

const TableOfContentsSchema = new Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
});

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  image: { type: String, required: false },
  featured: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
  content: { type: String, required: true },
  tableOfContents: { type: [TableOfContentsSchema], default: [] },
}, { timestamps: true });

export const BlogPost = models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema);
