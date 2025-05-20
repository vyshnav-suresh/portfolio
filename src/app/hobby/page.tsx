export default function HobbyPage() {
  return (
    <section className="py-20 bg-background/90 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Hobbies & Interests</h2>
        <div className="max-w-2xl mx-auto text-lg text-center text-muted-foreground">
          <p>
            Outside of coding, I enjoy a variety of hobbies that help me stay creative and balanced:
          </p>
          <ul className="list-disc list-inside mt-6 space-y-2 text-left mx-auto max-w-md">
            <li>Photography & Traveling</li>
            <li>Playing Guitar & Music Production</li>
            <li>Reading Tech Blogs & Sci-Fi Books</li>
            <li>Fitness & Outdoor Adventures</li>
            <li>Cooking and Exploring New Cuisines</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
