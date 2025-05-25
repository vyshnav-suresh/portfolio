export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-20" style={{ minHeight: '100vh' }}>
  <div className="mx-auto px-4 max-w-3xl card text-left">
    <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--accent)' }}>Contact</h1>
    <hr className="gradient-divider" />
    <p className="text-muted-foreground">Feel free to reach out via email at <a href="mailto:vyshnavsuresh@gmail.com" className="accent-btn">vyshnavsuresh@gmail.com</a>.</p>
  </div>
    </main>
  );
}
