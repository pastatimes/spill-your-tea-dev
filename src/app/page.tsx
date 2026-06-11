import ParallaxInit from './ParallaxInit';

export default function Home() {
  return (
    <main>

      <ParallaxInit />

      {/* Nav */}
      <nav className="nav">
        <span className="nav-logo">Spill Your Tea</span>
        <div className="nav-links">
          <a href="#over" className="nav-link">Over</a>
          <a href="#aanbod" className="nav-link">Aanbod</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <p className="hero-tag fade-up">Kimberley van Ruiven · Soul tech architect</p>
        <h1 className="hero-title fade-up fade-up-1">
          Ethische AI<br />
          <span>zonder bullshit.</span>
        </h1>
        <p className="hero-subtitle fade-up fade-up-2">
          Voor een mens-gerichte toekomst met technologie.
        </p>
        <div className="hero-buttons fade-up fade-up-3">
          <a href="#over" className="btn-primary">Wie ik ben</a>
          <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="btn-secondary">Spill Your Tea</a>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Over */}
      <section id="over" className="section-wide">
        <span className="section-label">Over</span>

        <div className="over-grid">
          <div className="over-left">
            <h2 className="section-heading">Wie ik ben</h2>
            <div className="prose">
              <p>
                Ik ben Kimberley, voormalig IT consultant en gespecialiseerd in ethische AI en AI-bias vanuit mijn academische achtergrond MSc Information Studies. Ik werk met AI vanuit een zo ethisch, bewuste en verantwoordelijke manier en ik help je om je bedrijf aan de achterkant op orde te krijgen, zodat je productiever en met meer structuur kunt werken.
              </p>
              <p>
                Ik geloof dat technologie en menselijkheid samen kunnen gaan, en dat vrouwelijke perspectieven onmisbaar zijn in hoe we AI bouwen en gebruiken. Vanuit een achtergrond in informatiekunde, AI-bias en ethiek help ik ondernemers en kleine bedrijven begrijpen wat ze gebruiken, wat dat betekent, en hoe ze het verantwoord kunnen inrichten.
              </p>
            </div>
          </div>

          <div className="over-right">
            <a href="#" className="callout callout-link">
              <p className="callout-italic">
                Ik gids ondernemers bewuster om te gaan met AI en te schalen vanuit integriteit.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Grote quote */}
      <div className="quote-stripe-full">
        <div className="quote-section">
          <p className="quote-text">
            <span className="quote-serif">Technologie en menselijkheid</span><br />
            gaan <em>samen.</em>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-section"><hr /></div>

      {/* Aanbod */}
      <section id="aanbod" className="section-wide">
        <span className="section-label">Aanbod</span>
        <h2 className="section-heading">Wat ik aanbied</h2>

        <div className="cards-grid">

          <a href="/co2" className="card card-featured">
            <span className="card-label">01</span>
            <h3 className="card-title">AI CO₂ Calculator</h3>
            <p className="card-desc">Bereken hoeveel CO₂ jouw AI-gebruik uitstoot en ontdek groenere alternatieven.</p>
            <span className="card-cta">Open calculator →</span>
          </a>

          <div className="dienst-card-static">
            <span className="card-label">02</span>
            <h3 className="card-title" style={{marginTop: '1rem', marginBottom: '0.75rem'}}>Gratis Ethical AI Checklist</h3>
            <p className="card-desc">Ontdek hoe bewust jij omgaat met AI in je bedrijf. De checklist helpt je inzicht te krijgen in je huidige gebruik en mogelijke blinde vlekken.</p>
            <span className="badge">Binnenkort beschikbaar</span>
          </div>

          <a href="#" className="card">
            <span className="card-label">03</span>
            <h3 className="card-title">Lees &amp; leer</h3>
            <p className="card-desc">Artikelen en dashboards over ethische AI, bias, vertrouwen en wat het betekent voor jou als ondernemer.</p>
            <span className="card-cta">Lees verder →</span>
          </a>

          <a href="https://www.instagram.com/kimberleyvanruiven" className="card card-featured">
            <span className="card-label">04</span>
            <h3 className="card-title">Volg me</h3>
            <p className="card-desc">Op Instagram deel ik inzichten, vragen en eerlijke meningen over AI en ondernemen.</p>
            <span className="card-cta">Naar Instagram →</span>
          </a>

        </div>
      </section>

      {/* Diensten */}
      <section className="section-wide">
        <span className="section-label">Werk met mij</span>
        <h2 className="section-heading">Persoonlijk aanbod</h2>
        <div className="diensten-grid">

          <div className="dienst-blok">
            <h3 className="dienst-title">Strippenkaart Bewuste AI</h3>
            <p className="dienst-desc">Een vast aanspreekpunt voor alles rondom verantwoord AI-gebruik in je bedrijf. Tien uur hulp voor kwartaalchecks, vragen over nieuwe tools of sparren over ethische vraagstukken.</p>
            <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="btn-primary">Plan een kennismaking</a>
          </div>

          <div className="dienst-blok">
            <h3 className="dienst-title">Losse sessie</h3>
            <p className="dienst-desc">Één uur gerichte hulp, precies waar jij op dat moment behoefte aan hebt. Vastzit met een technisch vraagstuk of wil sparren over AI? Je boekt wanneer het jou uitkomt.</p>
            <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="btn-primary">Boek een sessie</a>
          </div>

        </div>
      </section>

      {/* Parallax divider */}
      <div className="parallax-divider" />

      {/* Sessie CTA */}
      <section id="sessie" className="cta-section">
        <div className="cta-inner">
          <span className="section-label">Spill Your Tea sessie</span>
          <h2 className="cta-title">Klaar om te spillen?</h2>
          <p className="cta-text">
            Boek een gesprek met mij. We praten over AI, jouw business, en hoe jij het eerlijk, verantwoord en efficiënt kunt inzetten.
          </p>
          <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="btn-primary">
            Spill Your Tea
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <span className="section-label">Contact</span>
        <h2 className="section-heading">Laten we praten</h2>
        <div className="contact-grid">
          <a href="mailto:info@kimberleyvanruiven.nl" className="contact-item">
            <span className="contact-label">Email</span>
            <span className="contact-value">info@kimberleyvanruiven.nl</span>
          </a>
          <a href="https://www.instagram.com/kimberleyvanruiven" className="contact-item">
            <span className="contact-label">Instagram</span>
            <span className="contact-value">@kimberleyvanruiven</span>
          </a>
          <a href="https://www.linkedin.com/in/kimberley-van-ruiven" className="contact-item">
            <span className="contact-label">LinkedIn</span>
            <span className="contact-value">Kimberley van Ruiven</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span>© 2026 Kimberley van Ruiven</span>
        <span className="footer-brand">Spill Your Tea</span>
      </footer>

    </main>
  );
}
