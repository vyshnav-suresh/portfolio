import Skills from "../../components/Skills";

export default function SkillsPage() {
  return (
    <section className="py-20 min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
  <div className="mx-auto px-4 max-w-3xl card text-left bg-card text-body">
    <Skills />
  </div>
</section>
  );
}
