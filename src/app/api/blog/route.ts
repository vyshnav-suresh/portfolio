import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find({}).sort({ publishedAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Blog GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAuth(request);
  if (unauthorized) return unauthorized;
  try {
    await connectToDatabase();
    const body = await request.json();

    // Auto-generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const post = await BlogPost.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Blog POST error:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
