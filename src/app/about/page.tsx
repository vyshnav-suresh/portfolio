export default function AboutPage() {
  return (
    <section className="py-20 min-h-screen bg-[#faf6ff] px-20">
      <div className="mx-auto px-8 text-left bg-white border border-[#e3d7fa] rounded-2xl p-10 shadow-lg">
        {/* Professional Summary */}
        <h2 className="text-5xl md:text-7xl font-extrabold leading-tight flex flex-wrap gap-x-4 text-slate-900 mb-2">About Me</h2>
        <div className="h-1 w-20 bg-highlight rounded-full mb-6"></div>
        <p className="mt-2 text-primary text-lg text-slate-700">
          I&apos;m Vyshnav Suresh — a full stack developer and tech architect building AI-driven tools, trading systems, and web experiences that scale. From streamlining SEO analytics to crafting custom automation, I turn ideas into real-world solutions.
        </p>
        {/* Background */}
        <p className="mt-4 text-base text-slate-700">
          My journey started with curiosity — exploring how code can solve real problems. Over the years, I&apos;ve built systems across fintech, e-commerce, SEO, and AI. I believe in pragmatic development, clean architecture, and delivering meaningful impact through tech.
        </p>
        <p className="mt-2 text-base ">
          Whether it&apos;s a chatbot that understands your intent, an SEO dashboard that makes insights actionable, or a trading bot that watches the markets for you &mdash; I love designing systems that just work.
        </p>

        {/* Tech Stack */}
        <h3 className="mt-10 text-3xl font-bold text-slate-700">Tech Stack</h3>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[#6c3fd1] text-base mt-4">
          <li>🧠 AI: OpenRouter, LangChain, FastAPI</li>
          <li>📊 SEO Tools: GSC, GA4, MongoDB</li>
          <li>📈 Trading: Binance API, Node.js</li>
          <li>🕸️ Web: Next.js, Tailwind CSS, Supabase</li>
          <li>🗂️ Backend: NestJS, PostgreSQL, Redis</li>
          <li>☁️ DevOps: Docker, GCP</li>
        </ul>

        {/* Fun Facts */}
        <h3 className="mt-10 text-3xl font-bold text-slate-700">Fun Facts</h3>
        <ul className="mt-6 space-y-2 text-base text-slate-700 ">
          <li>🎯 I once built an entire SEO audit system in &lt; 2 weeks</li>
          <li>📷 I run a meme page and an AI influencer on Instagram</li>
          <li>🛹 I help manage a local skating club and community</li>
          <li>💡 I love automating everything — even my Instagram posts 😄</li>
        </ul>
      </div>
    </section>
  );
}
