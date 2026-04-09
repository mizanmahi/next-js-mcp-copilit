import { FormEvent } from 'react';

type ContactSectionProps = {
  contactMode: 'chat' | 'classic';
  setContactMode: React.Dispatch<React.SetStateAction<'chat' | 'classic'>>;
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  chatSuggestion: string;
  chatSubject: string;
  setChatSubject: React.Dispatch<React.SetStateAction<string>>;
  classicName: string;
  setClassicName: React.Dispatch<React.SetStateAction<string>>;
  classicEmail: string;
  setClassicEmail: React.Dispatch<React.SetStateAction<string>>;
  classicMessage: string;
  setClassicMessage: React.Dispatch<React.SetStateAction<string>>;
  contactStatus: string;
  onRefine: () => Promise<void>;
  onChatSend: () => Promise<void>;
  onClassicSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function ContactSection({
  contactMode,
  setContactMode,
  chatInput,
  setChatInput,
  chatSuggestion,
  chatSubject,
  setChatSubject,
  classicName,
  setClassicName,
  classicEmail,
  setClassicEmail,
  classicMessage,
  setClassicMessage,
  contactStatus,
  onRefine,
  onChatSend,
  onClassicSubmit,
}: ContactSectionProps) {
  return (
    <section id="contact" className="rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-6 backdrop-blur-xl md:p-8">
      <h3 className="text-2xl font-semibold text-cyan-50">Contact</h3>
      <div className="mt-3 inline-flex gap-2 rounded-full border border-white/15 bg-white/5 p-1">
        <button
          type="button"
          className={[
            'rounded-full px-3 py-1.5 text-xs text-cyan-100',
            contactMode === 'chat' ? 'bg-cyan-300/20' : '',
          ].join(' ')}
          onClick={() => setContactMode('chat')}
          data-cursor="active"
        >
          Chat Mode
        </button>
        <button
          type="button"
          className="rounded-full px-3 py-1.5 text-xs text-cyan-100"
          onClick={() => setContactMode('classic')}
          data-cursor="active"
          style={contactMode === 'classic' ? { background: 'rgba(0,245,212,0.2)' } : undefined}
        >
          Classic Form
        </button>
      </div>

      {contactMode === 'chat' ? (
        <div className="mt-4 grid gap-3">
          <div className="max-w-4xl rounded-2xl border border-white/10 bg-violet-500/20 px-4 py-3 text-sm text-slate-100">{chatInput || 'Tell me about your project goals, stack, and timeline.'}</div>
          <div className="max-w-4xl rounded-2xl border border-white/10 bg-cyan-300/10 px-4 py-3 text-sm text-slate-100">
            {chatSuggestion || 'AI assistant: Want me to make this more concise and suggest a strong subject line?'}
          </div>

          <label className="grid gap-1 text-sm text-cyan-100">
            Your message
            <textarea
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="We need a full-stack developer for a platform rebuild..."
              className="min-h-[122px] rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-slate-50 outline-none focus:border-cyan-300/60"
            />
          </label>
          <label className="grid gap-1 text-sm text-cyan-100">
            Subject
            <input
              value={chatSubject}
              onChange={(event) => setChatSubject(event.target.value)}
              placeholder="Project subject"
              className="rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-slate-50 outline-none focus:border-cyan-300/60"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onRefine} data-cursor="active" className="rounded-full border border-cyan-300/50 bg-cyan-300/15 px-4 py-2 text-sm text-cyan-100">
              Refine with AI
            </button>
            <button type="button" onClick={onChatSend} data-cursor="active" className="rounded-full border border-cyan-300/45 bg-transparent px-4 py-2 text-sm text-cyan-100">
              Send
            </button>
          </div>
        </div>
      ) : (
        <form className="mt-4 grid gap-3" onSubmit={onClassicSubmit}>
          <label className="grid gap-1 text-sm text-cyan-100">
            Name
            <input
              value={classicName}
              onChange={(event) => setClassicName(event.target.value)}
              required
              className="rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-slate-50 outline-none focus:border-cyan-300/60"
            />
          </label>
          <label className="grid gap-1 text-sm text-cyan-100">
            Email
            <input
              type="email"
              value={classicEmail}
              onChange={(event) => setClassicEmail(event.target.value)}
              required
              className="rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-slate-50 outline-none focus:border-cyan-300/60"
            />
          </label>
          <label className="grid gap-1 text-sm text-cyan-100">
            Subject
            <input
              value={chatSubject}
              onChange={(event) => setChatSubject(event.target.value)}
              required
              className="rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-slate-50 outline-none focus:border-cyan-300/60"
            />
          </label>
          <label className="grid gap-1 text-sm text-cyan-100">
            Message
            <textarea
              value={classicMessage}
              onChange={(event) => setClassicMessage(event.target.value)}
              rows={5}
              required
              className="min-h-[122px] rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-slate-50 outline-none focus:border-cyan-300/60"
            />
          </label>
          <button
            type="submit"
            data-cursor="active"
            className="w-fit rounded-full border border-cyan-300/50 bg-cyan-300/15 px-4 py-2 text-sm text-cyan-100"
          >
            Send Message
          </button>
        </form>
      )}

      {contactStatus ? <p className="mt-3 text-sm text-cyan-300">{contactStatus}</p> : null}
    </section>
  );
}
