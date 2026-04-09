export default function AboutSection() {
  return (
    <section id="about" className="rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-6 backdrop-blur-xl md:p-8">
      <h3 className="text-2xl font-semibold text-cyan-50">About</h3>
      <p className="mt-3 leading-7 text-slate-300">
        I am a full-stack engineer focused on shipping software that feels fast, clear, and dependable.
        My work spans product strategy, architecture, implementation, and mentoring teams toward clean,
        maintainable systems.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <h4 className="font-semibold text-cyan-100">Engineering Focus</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">Scalable Next.js frontends, performant API layers, automation pipelines, and cloud-native tooling.</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <h4 className="font-semibold text-cyan-100">Approach</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">Measure first, optimize second. Good UX with strong observability and healthy team velocity.</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <h4 className="font-semibold text-cyan-100">Working Style</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">High ownership, async-friendly communication, and practical architecture over novelty.</p>
        </article>
      </div>
    </section>
  );
}
