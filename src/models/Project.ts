import { Schema, Document, models, model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  image?: string;
  isHackathon?: boolean;
  hackathonDate?: string;
  slug?: string; // New field for clean URLs
  category?: string;
  role?: string;
  client?: string;
  year?: string;
  status?: string;
  overview?: string[];
  contributions?: { title: string; desc: string }[];
  technicalDeepDive?: { title: string; desc: string }[];
  challenges?: { chal: string; learn: string }[];
  outcome?: string;
  outcomeStats?: string[];
  techBreakdown?: { layer: string; tech: string }[];
  images?: string[];
}

const ContributionSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

const TechnicalDeepDiveSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

const ChallengeSchema = new Schema({
  chal: { type: String, required: true },
  learn: { type: String, required: true }
});

const TechBreakdownSchema = new Schema({
  layer: { type: String, required: true },
  tech: { type: String, required: true }
});

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stack: { type: [String], required: true },
  github: { type: String, required: false },
  demo: { type: String, required: false },
  image: { type: String, required: false },
  isHackathon: { type: Boolean, default: false },
  hackathonDate: { type: String, required: false },
  slug: { type: String, required: false, unique: true, sparse: true },
  category: { type: String, required: false },
  role: { type: String, required: false },
  client: { type: String, required: false },
  year: { type: String, required: false },
  status: { type: String, required: false },
  overview: { type: [String], required: false },
  contributions: { type: [ContributionSchema], default: [] },
  technicalDeepDive: { type: [TechnicalDeepDiveSchema], default: [] },
  challenges: { type: [ChallengeSchema], default: [] },
  outcome: { type: String, required: false },
  outcomeStats: { type: [String], default: [] },
  techBreakdown: { type: [TechBreakdownSchema], default: [] },
  images: { type: [String], default: [] }
}, { timestamps: true });

export const Project = models.Project || model<IProject>('Project', ProjectSchema);
