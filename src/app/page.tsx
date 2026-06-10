export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen font-[family-name:var(--font-geist)] overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-sm bg-black/60">
        <span className="text-sm font-semibold tracking-widest uppercase text-white/90">
          Spill Your Tea
        </span>
        <div className="flex items-center gap-8 text-sm text-white/50">
          <a href="#over" className="hover:text-white transition-colors">Over</a>
          <a href="#aanbod" className="hover:text-white transition-colors">Aanbod</a>
          <a href="#diensten" className="hover:text-white transition-colors">Diensten</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="cosmic-bg grain relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-28">
        <p className="fade-up text-xs tracking-[0.3em] uppercase text-white/30 mb-6">
          Kimberley van Ruiven
        </p>
        <h1 className="fade-up fade-up-delay-1 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl">
          Ethische AI
          <br />
          <span className="text-white/55">zonder bullshit.</span>
        </h1>
        <p className="fade-up fade-up-delay-2 mt-8 text-lg text-white/40 max-w-md leading-relaxed">
          Geen hype, geen vaagtaal. Eerlijke verhalen over wat AI doet met mensen, bedrijven en de wereld.
        </p>
        <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center" style={{marginTop: '5rem'}}>
          <a href="#over" className="btn-primary">Wie ik ben</a>
          <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="btn-secondary">Spill Your Tea</a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* Over / Mijn verhaal */}
      <section id="over" className="section-narrow">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-10">Over</p>

        {/* Tagline callout */}
        <div className="border border-white/10 rounded-2xl p-7 bg-white/[0.02] mb-12">
          <p className="italic text-white/55 leading-relaxed text-lg">
            Ik gids ondernemers bewuster om te gaan met AI en te schalen vanuit integriteit.
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-5 text-white/60 leading-relaxed text-lg mb-16">
          <p>
            Ik ben gepassioneerd over werken met tech terwijl ik ook een hart heb voor spiritualiteit, kunst, cultuur, rechtvaardigheid en de natuur. Ik geloof dat technologie en menselijkheid samen kunnen gaan, en dat vrouwelijke perspectieven onmisbaar zijn in hoe we AI bouwen en gebruiken.
          </p>
        </div>

        <div className="h-px bg-white/5 mb-16" />

        {/* Mijn verhaal */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Mijn verhaal</h2>
        <div className="space-y-5 text-white/60 leading-relaxed text-lg mb-16">
          <p>
            Ik ben Kimberley, voormalig IT consultant en gespecialiseerd in ethische AI en AI-bias vanuit mijn academische achtergrond MSc Information Studies. Ik werk met AI vanuit een zo ethisch, bewuste en verantwoordelijke manier en ik help je om je bedrijf aan de achterkant op orde te krijgen, zodat je productiever en met meer structuur kunt werken.
          </p>
        </div>

        {/* Ethical AI callout */}
        <div className="border border-white/10 rounded-2xl p-7 bg-white/[0.02] mb-16">
          <h3 className="text-base font-semibold mb-4 text-white/80">Ethisch(er) werken met AI, kan dat?</h3>
          <p className="text-white/50 leading-relaxed">
            Ja, ik geloof dat dat kan, vanuit bewustwording en verantwoordelijkheid. En nee, ik denk niet dat we 100% ethisch om kunnen gaan met AI — dan moeten we helemaal geen technologie meer gebruiken. Maar ik denk wel dat we vanuit meer kennis op een bewustere manier om kunnen gaan met onze tools, onze data, onze aandacht en welke AI we hierin kiezen te gebruiken en welke juist niet.
          </p>
        </div>

        {/* Thesis */}
        <div className="space-y-5 text-white/60 leading-relaxed text-lg">
          <p>
            Tijdens mijn afstuderen heb ik me gericht op bias in taalmodellen. Ik vond en vind dit nog steeds een net zo fascinerend als belangrijk onderwerp. Ik geloof dat AI en technologie niet alleen gaat om het optimaliseren van onze maatschappij, maar ook om onze menselijkheid hierin mee te nemen.
          </p>
          <p>
            Vraagstukken die ik daarom meeneem tijdens het werken met technologie en AI zijn: wie krijgen er een plek aan tafel tijdens het ontwikkelen van nieuwe taalmodellen, hoe is het taalmodel dat ik gebruik gebouwd, op welke data is dit model ingericht, wat doet dit model met mijn data als ik dit gebruik en wat zijn de effecten op het milieu als ik dit model gebruik?
          </p>
          <p>
            En is het altijd nodig om AI in te zetten? Dat is de afweging die ik maak, en blijf maken, bij het gebruiken van AI.
          </p>
        </div>
      </section>

      {/* Foto sectie */}
      <div className="max-w-3xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1538425790521-78e7b5b1310c?w=800&q=80"
              alt=""
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
          <div className="w-full h-80 rounded-2xl bg-white/[0.03] border border-dashed border-white/10 flex items-center justify-center">
            <p className="text-white/20 text-sm tracking-wide">Foto volgt</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-white/5" />
      </div>

      {/* Aanbod */}
      <section id="aanbod" className="section-wide">
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
              cta: "Spill Your Tea",
              href: "https://calendar.app.google/douZqiDQ7p39Xf6u7",
            },
            {
              label: "03",
              title: "Volg me",
              desc: "Op Instagram deel ik dagelijkse inzichten, vragen en eerlijke meningen over AI en ondernemen.",
              cta: "Naar Instagram",
              href: "https://www.instagram.com/kimberleyvanruiven",
            },
            {
              label: "04",
              title: "AI CO₂ Calculator",
              desc: "Bereken hoeveel CO₂ jouw AI-gebruik uitstoot — en ontdek groenere alternatieven.",
              cta: "Open calculator",
              href: "/co2",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group block p-8 border rounded-2xl transition-all duration-300 border-white/10 hover:border-white/30 hover:bg-white/[0.03]"
            >
              <span className="text-xs text-white/20 font-mono">{item.label}</span>
              <h3 className="mt-4 text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">{item.desc}</p>
              <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                {item.cta} →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-white/5" />
      </div>

      {/* Diensten */}
      <section id="diensten" className="section-wide">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Diensten</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Wat ik aanbied</h2>
        <p className="text-white/50 text-lg leading-relaxed mb-16 max-w-2xl">
          AI is niet meer weg te denken uit het moderne bedrijfsleven. Maar de meeste ondernemers gebruiken het op de automatische piloot, zonder te weten wat er met hun data gebeurt, of ze voldoen aan de wet, en wat de bredere impact is van de tools die ze dagelijks inzetten. Vanuit een achtergrond in informatiekunde, AI-bias en ethiek help ik ondernemers en kleine bedrijven begrijpen wat ze gebruiken, wat dat betekent, en hoe ze het verantwoord kunnen inrichten.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Ethical AI Checklist — placeholder */}
          <div className="p-8 border rounded-2xl border-white/10 bg-white/[0.01]">
            <h3 className="text-xl font-semibold mb-3">Gratis Ethical AI Checklist</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Ontdek hoe bewust jij omgaat met AI in je bedrijf. De checklist helpt je inzicht te krijgen in je huidige gebruik en mogelijke blinde vlekken — zodat je bewustere keuzes kunt maken over welke tools je gebruikt en hoe.
            </p>
            <span className="inline-block px-4 py-2 rounded-full border border-white/10 text-white/25 text-xs tracking-wide">
              Binnenkort beschikbaar
            </span>
          </div>

          {/* Strippenkaart Bewuste AI */}
          <a
            href="https://calendar.app.google/douZqiDQ7p39Xf6u7"
            className="group block p-8 border rounded-2xl transition-all duration-300 border-white/10 hover:border-white/30 hover:bg-white/[0.03]"
          >
            <h3 className="text-xl font-semibold mb-3">Strippenkaart Bewuste AI</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              AI verandert snel. De tools veranderen, de wetgeving verandert, en wat vandaag klopt kan over drie maanden alweer anders liggen. Met de Strippenkaart Bewuste AI heb je een vast aanspreekpunt voor alles rondom verantwoord AI-gebruik in je bedrijf. Tien uur hulp die je inzet wanneer jij het nodig hebt — voor een kwartaalcheck, vragen over nieuwe tools, aanpassingen aan je AI-beleid of sparren over ethische vraagstukken.
            </p>
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
              Plan een kennismaking →
            </span>
          </a>

          {/* Technische Ondersteuning */}
          <a
            href="https://calendar.app.google/douZqiDQ7p39Xf6u7"
            className="group block p-8 border rounded-2xl transition-all duration-300 border-white/10 hover:border-white/30 hover:bg-white/[0.03]"
          >
            <h3 className="text-xl font-semibold mb-3">Technische Ondersteuning</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Tien uur flexibele technische hulp, in te zetten wanneer jij het nodig hebt. Voor de ondernemer die weet wat ze wil maar niet altijd weet hoe ze het technisch moet aanpakken. In te zetten voor automatiseringen via Zapier of Make, websitebeheer, e-mailmarketing, CRM- en projecttools zoals Notion, en het schrijven van SOP&apos;s voor terugkerende processen.
            </p>
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
              Plan een kennismaking →
            </span>
          </a>

          {/* Losse sessie */}
          <a
            href="https://calendar.app.google/douZqiDQ7p39Xf6u7"
            className="group block p-8 border rounded-2xl transition-all duration-300 border-white/10 hover:border-white/30 hover:bg-white/[0.03]"
          >
            <h3 className="text-xl font-semibold mb-3">Losse sessie</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Één uur gerichte hulp, precies waar jij op dat moment behoefte aan hebt. Of je nu vastzit met een technisch vraagstuk, vragen hebt over een AI-tool die je overweegt, of gewoon wil sparren over hoe je AI bewuster kunt inzetten in je bedrijf. Je boekt wanneer het jou uitkomt, zonder verdere verplichtingen.
            </p>
            <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
              Boek een sessie →
            </span>
          </a>

        </div>

        {/* Diensten foto's */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1525847185619-02460ddde30d?w=800&q=80"
              alt=""
              className="w-full h-72 object-cover rounded-2xl"
            />
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1648158554076-e3a1513d7217?w=800&q=80"
              alt=""
              className="w-full h-72 object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Sessie CTA */}
      <section id="sessie" className="cosmic-bg px-6 py-32">
        <div style={{maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-6">Spill Your Tea sessie</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Klaar om te spillen?
          </h2>
          <p className="text-white/40 text-lg leading-relaxed mb-10">
            Boek een gesprek met mij. We praten over AI, jouw business, en hoe jij het eerlijk en slim kunt inzetten.
          </p>
          <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="btn-primary" style={{marginTop: '5rem', display: 'inline-block'}}>
            Spill Your Tea
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-narrow">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Contact</p>
        <h2 className="text-3xl font-bold mb-12">Laten we praten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          {[
            { label: "Email", value: "info@kimberleyvanruiven.nl", href: "mailto:info@kimberleyvanruiven.nl" },
            { label: "Instagram", value: "@kimberleyvanruiven", href: "https://www.instagram.com/kimberleyvanruiven" },
            { label: "LinkedIn", value: "Kimberley van Ruiven", href: "https://www.linkedin.com/in/kimberley-van-ruiven" },
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
