export default function Home() {
  return (
    <main>

      {/* Nav */}
      <nav className="nav">
        <span className="nav-logo">Spill Your Tea</span>
        <div className="nav-links">
          <a href="#over" className="nav-link">Over</a>
          <a href="#aanbod" className="nav-link">Aanbod</a>
          <a href="#diensten" className="nav-link">Diensten</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <p className="hero-tag fade-up">Kimberley van Ruiven</p>
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

      {/* Over / Mijn verhaal */}
      <section id="over" className="section">
        <span className="section-label">Over</span>

        <div className="callout">
          <p className="callout-italic">
            Ik gids ondernemers bewuster om te gaan met AI en te schalen vanuit integriteit.
          </p>
        </div>

        <div className="prose">
          <p>
            Ik ben gepassioneerd over werken met tech terwijl ik ook een hart heb voor spiritualiteit, kunst, cultuur, rechtvaardigheid en de natuur. Ik geloof dat technologie en menselijkheid samen kunnen gaan, en dat vrouwelijke perspectieven onmisbaar zijn in hoe we AI bouwen en gebruiken.
          </p>
        </div>

        <hr className="divider" />

        <h2 className="section-heading">Mijn verhaal</h2>

        <div className="prose">
          <p>
            Ik ben Kimberley, voormalig IT consultant en gespecialiseerd in ethische AI en AI-bias vanuit mijn academische achtergrond MSc Information Studies. Ik werk met AI vanuit een zo ethisch, bewuste en verantwoordelijke manier en ik help je om je bedrijf aan de achterkant op orde te krijgen, zodat je productiever en met meer structuur kunt werken.
          </p>
        </div>

        <div className="callout">
          <p className="callout-heading">Ethisch(er) werken met AI, kan dat?</p>
          <p className="callout-text">
            Ja, ik geloof dat dat kan, vanuit bewustwording en verantwoordelijkheid. En nee, ik denk niet dat we 100% ethisch om kunnen gaan met AI — dan moeten we helemaal geen technologie meer gebruiken. Maar ik denk wel dat we vanuit meer kennis op een bewustere manier om kunnen gaan met onze tools, onze data, onze aandacht en welke AI we hierin kiezen te gebruiken en welke juist niet.
          </p>
        </div>

        <div className="prose prose-last">
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

      {/* Foto's */}
      <div className="section-photos">
        <div className="photo-grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1538425790521-78e7b5b1310c?w=800&q=80"
              alt=""
            />
          </div>
          <div className="photo-placeholder">
            <span>Foto volgt</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-section">
        <hr />
      </div>

      {/* Aanbod */}
      <section id="aanbod" className="section-wide">
        <span className="section-label">Aanbod</span>
        <h2 className="section-heading">Wat je hier vindt</h2>

        <div className="cards-grid">
          <a href="/co2" className="card">
            <span className="card-label">01</span>
            <h3 className="card-title">AI CO₂ Calculator</h3>
            <p className="card-desc">Bereken hoeveel CO₂ jouw AI-gebruik uitstoot — en ontdek groenere alternatieven.</p>
            <span className="card-cta">Open calculator →</span>
          </a>
          <a href="https://www.instagram.com/kimberleyvanruiven" className="card">
            <span className="card-label">02</span>
            <h3 className="card-title">Volg me</h3>
            <p className="card-desc">Op Instagram deel ik dagelijkse inzichten, vragen en eerlijke meningen over AI en ondernemen.</p>
            <span className="card-cta">Naar Instagram →</span>
          </a>
          <a href="#" className="card">
            <span className="card-label">03</span>
            <h3 className="card-title">Lees &amp; leer</h3>
            <p className="card-desc">Artikelen en dashboards over ethische AI, bias, vertrouwen en wat het betekent voor jou als ondernemer.</p>
            <span className="card-cta">Lees verder →</span>
          </a>
          <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="card">
            <span className="card-label">04</span>
            <h3 className="card-title">Spill Your Tea sessie</h3>
            <p className="card-desc">Een één-op-één gesprek over hoe jij als ondernemer omgaat met AI: eerlijk, praktisch en zonder jargon.</p>
            <span className="card-cta">Spill Your Tea →</span>
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-section">
        <hr />
      </div>

      {/* Diensten */}
      <section id="diensten" className="section-wide">
        <span className="section-label">Diensten</span>
        <h2 className="section-heading">Wat ik aanbied</h2>
        <p className="section-intro">
          AI is niet meer weg te denken uit het moderne bedrijfsleven. Maar de meeste ondernemers gebruiken het op de automatische piloot, zonder te weten wat er met hun data gebeurt, of ze voldoen aan de wet, en wat de bredere impact is van de tools die ze dagelijks inzetten. Vanuit een achtergrond in informatiekunde, AI-bias en ethiek help ik ondernemers en kleine bedrijven begrijpen wat ze gebruiken, wat dat betekent, en hoe ze het verantwoord kunnen inrichten.
        </p>

        <div className="cards-grid">

          <div className="dienst-card-static">
            <h3 className="dienst-title">Gratis Ethical AI Checklist</h3>
            <p className="dienst-desc">
              Ontdek hoe bewust jij omgaat met AI in je bedrijf. De checklist helpt je inzicht te krijgen in je huidige gebruik en mogelijke blinde vlekken — zodat je bewustere keuzes kunt maken over welke tools je gebruikt en hoe.
            </p>
            <span className="badge">Binnenkort beschikbaar</span>
          </div>

          <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="dienst-card">
            <h3 className="dienst-title">Strippenkaart Bewuste AI</h3>
            <p className="dienst-desc">
              AI verandert snel. De tools veranderen, de wetgeving verandert, en wat vandaag klopt kan over drie maanden alweer anders liggen. Met de Strippenkaart Bewuste AI heb je een vast aanspreekpunt voor alles rondom verantwoord AI-gebruik in je bedrijf. Tien uur hulp die je inzet wanneer jij het nodig hebt — voor een kwartaalcheck, vragen over nieuwe tools, aanpassingen aan je AI-beleid of sparren over ethische vraagstukken.
            </p>
            <span className="dienst-cta">Plan een kennismaking →</span>
          </a>

          <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="dienst-card">
            <h3 className="dienst-title">Technische Ondersteuning</h3>
            <p className="dienst-desc">
              Tien uur flexibele technische hulp, in te zetten wanneer jij het nodig hebt. Voor de ondernemer die weet wat ze wil maar niet altijd weet hoe ze het technisch moet aanpakken. In te zetten voor automatiseringen via Zapier of Make, websitebeheer, e-mailmarketing, CRM- en projecttools zoals Notion, en het schrijven van SOP&apos;s voor terugkerende processen.
            </p>
            <span className="dienst-cta">Plan een kennismaking →</span>
          </a>

          <a href="https://calendar.app.google/douZqiDQ7p39Xf6u7" className="dienst-card">
            <h3 className="dienst-title">Losse sessie</h3>
            <p className="dienst-desc">
              Één uur gerichte hulp, precies waar jij op dat moment behoefte aan hebt. Of je nu vastzit met een technisch vraagstuk, vragen hebt over een AI-tool die je overweegt, of gewoon wil sparren over hoe je AI bewuster kunt inzetten in je bedrijf. Je boekt wanneer het jou uitkomt, zonder verdere verplichtingen.
            </p>
            <span className="dienst-cta">Boek een sessie →</span>
          </a>

        </div>

        <div className="photo-grid" style={{marginTop: '4rem'}}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1525847185619-02460ddde30d?w=800&q=80"
              alt=""
            />
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1648158554076-e3a1513d7217?w=800&q=80"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Sessie CTA */}
      <section id="sessie" className="cta-section">
        <div className="cta-inner">
          <span className="section-label">Spill Your Tea sessie</span>
          <h2 className="cta-title">Klaar om te spillen?</h2>
          <p className="cta-text">
            Boek een gesprek met mij. We praten over AI, jouw business, en hoe jij het eerlijk en slim kunt inzetten.
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
