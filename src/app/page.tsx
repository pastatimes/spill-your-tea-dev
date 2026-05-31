export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen font-[family-name:var(--font-geist)]">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-sm bg-black/60">
        <span className="text-sm font-semibold tracking-widest uppercase text-white/90">
          Spill Your Tea
        </span>
        <div className="flex items-center gap-8 text-sm text-white/50">
          <a href="#over" className="hover:text-white transition-colors">Over</a>
          <a href="#aanbod" className="hover:text-white transition-colors">Aanbod</a>
          <a href="#sessie" className="hover:text-white transition-colors">Sessie</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="cosmic-bg grain relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
        <p className="fade-up text-xs tracking-[0.3em] uppercase text-white/30 mb-6">
          Kimberley van Ruiven
        </p>
        <h1 className="fade-up fade-up-delay-1 text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] max-w-3xl">
          Ethische AI
          <br />
          <span className="text-white/30">zonder bullshit.</span>
        </h1>
        <p className="fade-up fade-up-delay-2 mt-8 text-lg text-white/40 max-w-md leading-relaxed">
          Geen hype, geen vaagtaal. Eerlijke verhalen over wat AI doet met mensen, bedrijven en de wereld.
        </p>
        <div className="fade-up fade-up-delay-3 mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href="#aanbod"
            className="px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            Wat ik doe
          </a>
          <a
            href="#sessie"
            className="px-8 py-3 border border-white/20 text-white text-sm font-semibold rounded-full hover:border-white/50 transition-colors"
          >
            Boek een sessie
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* Over */}
      <section id="over" className="px-6 py-32 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Over</p>
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-8">
          Ik geloof dat je AI kunt begrijpen
          <span className="text-white/30"> zonder dat je technicus hoeft te zijn.</span>
        </h2>
        <div className="space-y-5 text-white/50 leading-relaxed text-lg">
          <p>
            Ik ben Kimberley van Ruiven. Online ondernemer, denker en iemand die zich actief verdiept in ethische AI: wat het betekent, wat het doet, en hoe we het eerlijker kunnen maken.
          </p>
          <p>
            Spill Your Tea is mijn plek om dat te delen. Geen academisch jargon, geen ongefundeerde hype. Gewoon eerlijke gesprekken over een onderwerp dat iedereen raakt.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-white/5" />
      </div>

      {/* Aanbod */}
      <section id="aanbod" className="px-6 py-32 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Aanbod</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-16">Wat je hier vindt</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              label: "01",
              title: "Lees & leer",
              desc: "Artikelen en dashboards over ethische AI, bias, vertrouwen en wat het betekent voor jou als ondernemer.",
              cta: "Lees verder",
              href: "#",
            },
            {
              label: "02",
              title: "Spill Your Tea sessie",
              desc: "Een één-op-één gesprek over hoe jij als ondernemer omgaat met AI: eerlijk, praktisch en zonder jargon.",
              cta: "Plan een sessie",
              href: "#sessie",
            },
            {
              label: "03",
              title: "Volg me",
              desc: "Op Instagram deel ik dagelijkse inzichten, vragen en eerlijke meningen over AI en ondernemen.",
              cta: "Naar Instagram",
              href: "https://instagram.com",
            },
            {
              label: "04",
              title: "Shop",
              desc: "Binnenkort beschikbaar: tools, gidsen en resources voor ondernemers die AI verantwoord willen inzetten.",
              cta: "Binnenkort",
              href: "#",
              soon: true,
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`group block p-8 border rounded-2xl transition-all duration-300 ${
                item.soon
                  ? "border-white/5 cursor-default"
                  : "border-white/10 hover:border-white/30 hover:bg-white/[0.03]"
              }`}
            >
              <span className="text-xs text-white/20 font-mono">{item.label}</span>
              <h3 className="mt-4 text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">{item.desc}</p>
              <span className={`text-sm font-medium ${item.soon ? "text-white/20" : "text-white/60 group-hover:text-white transition-colors"}`}>
                {item.cta} {!item.soon && "→"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Sessie CTA */}
      <section id="sessie" className="cosmic-bg px-6 py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-6">Spill Your Tea sessie</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Klaar om te spillen?
          </h2>
          <p className="text-white/40 text-lg leading-relaxed mb-10">
            Boek een gesprek met mij. We praten over AI, jouw business, en hoe jij het eerlijk en slim kunt inzetten.
          </p>
          <a
            href="mailto:info@kimberleyvanruiven.nl"
            className="inline-block px-10 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            Plan een sessie
          </a>
        </div>
      </section>

      {/* Contact / Volg */}
      <section id="contact" className="px-6 py-32 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Contact</p>
        <h2 className="text-3xl font-bold mb-12">Laten we praten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          {[
            { label: "Email", value: "info@kimberleyvanruiven.nl", href: "mailto:info@kimberleyvanruiven.nl" },
            { label: "Instagram", value: "@kimberleyvanruiven", href: "https://instagram.com/kimberleyvanruiven" },
            { label: "LinkedIn", value: "Kimberley van Ruiven", href: "https://linkedin.com" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="group">
              <p className="text-white/25 text-xs tracking-widest uppercase mb-2">{item.label}</p>
              <p className="text-white/60 group-hover:text-white transition-colors">{item.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-8 flex items-center justify-between text-xs text-white/20">
        <span>© 2026 Kimberley van Ruiven</span>
        <span className="tracking-widest uppercase">Spill Your Tea</span>
      </footer>

    </main>
  );
}
