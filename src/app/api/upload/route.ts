import { NextResponse } from "next/server";
import imagekit from "@/lib/imagekit";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the File to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to ImageKit
    const response = await imagekit.files.upload({
      file: buffer.toString('base64'), // Using base64 encoding to be safe with the new SDK
      fileName: file.name,
      folder: "/portfolio", // Optional: organize uploads into a folder
    });

    return NextResponse.json({ url: response.url }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
