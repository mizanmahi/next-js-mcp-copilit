export default function ServicesSection() {
  return (
    <section id="services" className="rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-6 backdrop-blur-xl md:p-8">
      <h3 className="text-2xl font-semibold text-cyan-50">Services</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-cyan-300/20 bg-slate-950/65 p-4">
          <h4 className="font-semibold text-cyan-100">Full-Stack Product Builds</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">From MVP to production-grade systems with performant UX and secure APIs.</p>
        </article>
        <article className="rounded-xl border border-cyan-300/20 bg-slate-950/65 p-4">
          <h4 className="font-semibold text-cyan-100">Platform Modernization</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">Refactor legacy stacks into maintainable architectures with measurable outcomes.</p>
        </article>
        <article className="rounded-xl border border-cyan-300/20 bg-slate-950/65 p-4">
          <h4 className="font-semibold text-cyan-100">AI Feature Engineering</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">Chat interfaces, automation agents, and LLM-assisted workflows integrated responsibly.</p>
        </article>
      </div>
    </section>
  );
}
