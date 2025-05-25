export default function AboutPage() {
  return (
    <section className="py-20 min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="mx-auto px-4 max-w-3xl card text-left bg-card text-body">
        {/* Professional Summary */}
        <h2 className="text-3xl font-bold text-accent-text">About Me</h2>
        <hr className="gradient-divider" />
        <p className="mt-2 text-muted-foreground text-lg">
          I'm Vyshnav Suresh — a full stack developer and tech architect building AI-driven tools, trading systems, and web experiences that scale. From streamlining SEO analytics to crafting custom automation, I turn ideas into real-world solutions.
        </p>
        {/* Background */}
        <p className="mt-4 text-base text-muted-foreground">
          My journey started with curiosity — exploring how code can solve real problems. Over the years, I’ve built systems across fintech, e-commerce, SEO, and AI. I believe in pragmatic development, clean architecture, and delivering meaningful impact through tech.
        </p>
        <p className="mt-2 text-base text-muted-foreground">
          Whether it’s a chatbot that understands your intent, an SEO dashboard that makes insights actionable, or a trading bot that watches the markets for you — I love designing systems that just work.
        </p>

        {/* Tech Stack */}
        <h3 className="mt-8 text-2xl font-semibold">Tech Stack</h3>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 text-muted-foreground text-sm mt-4">
          <li>🧠 AI: OpenRouter, LangChain, FastAPI</li>
          <li>📊 SEO Tools: GSC, GA4, MongoDB</li>
          <li>📈 Trading: Binance API, Node.js</li>
          <li>🕸️ Web: Next.js, Tailwind CSS, Supabase</li>
          <li>🗂️ Backend: NestJS, PostgreSQL, Redis</li>
          <li>☁️ DevOps: Docker, GCP</li>
        </ul>

        {/* Fun Facts */}
        <h3 className="mt-10 text-2xl font-semibold">Fun Facts</h3>
        <ul className="mt-6 space-y-2 text-base text-muted-foreground">
          <li>📍 Based in Thrissur, Kerala 🇮🇳</li>
          <li>🎯 I once built an entire SEO audit system in &lt; 2 weeks</li>
          <li>📷 I run a meme page and an AI influencer on Instagram</li>
          <li>🛹 I help manage a local skating club and community</li>
          <li>💡 I love automating everything — even my Instagram posts 😄</li>
        </ul>
      </div>
    </section>
  );
}
