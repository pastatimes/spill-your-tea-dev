'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

type ServiceId = 'claude' | 'chatgpt' | 'gemini' | 'sonnet' | 'lechat' | 'greenpt';
type Period = 'day' | 'month';

const FACTORS: Record<ServiceId, { whPer1kTokens: number; gCO2PerKwh: number }> = {
  claude:  { whPer1kTokens: 0.010, gCO2PerKwh: 200 },
  chatgpt: { whPer1kTokens: 0.020, gCO2PerKwh: 200 },
  gemini:  { whPer1kTokens: 0.010, gCO2PerKwh: 100 },
  sonnet:  { whPer1kTokens: 0.007, gCO2PerKwh: 200 },
  lechat:  { whPer1kTokens: 0.008, gCO2PerKwh: 50  },
  greenpt: { whPer1kTokens: 0.010, gCO2PerKwh: 10  },
};

const COLORS: Record<string, string> = {
  claude:  '#ea580c',
  chatgpt: '#d97706',
  gemini:  '#b45309',
  sonnet:  '#16a34a',
  lechat:  '#2563eb',
  greenpt: '#15803d',
  local:   '#78716c',
};

const LABELS: Record<string, string> = {
  claude:  'Claude Opus',
  chatgpt: 'ChatGPT',
  gemini:  'Gemini',
  sonnet:  'Claude Sonnet',
  lechat:  'Le Chat',
  greenpt: 'GreenPT',
  local:   'Lokaal',
};

const TOKEN_PRESETS = [
  { label: 'Kort',      value: 200 },
  { label: 'Gemiddeld', value: 800 },
  { label: 'Lang',      value: 2000 },
  { label: 'Uitgebreid',value: 5000 },
];

function fmt(g: number): string {
  if (g < 0.001) return '0 mg';
  if (g < 1) return (g * 1000).toFixed(1) + ' mg';
  if (g < 1000) return g.toFixed(1) + ' g';
  return (g / 1000).toFixed(2) + ' kg';
}

interface ServiceInputs { msgs: number; tokens: number; }

const DEFAULT_SERVICES: Record<ServiceId, ServiceInputs> = {
  claude:  { msgs: 10, tokens: 800 },
  chatgpt: { msgs: 5,  tokens: 800 },
  gemini:  { msgs: 3,  tokens: 800 },
  sonnet:  { msgs: 0,  tokens: 800 },
  lechat:  { msgs: 0,  tokens: 800 },
  greenpt: { msgs: 0,  tokens: 800 },
};

export default function CO2Page() {
  const [period, setPeriod] = useState<Period>('day');
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [local, setLocal] = useState({ hours: 0, watt: 200 });

  const { values, total } = useMemo(() => {
    const mult = period === 'month' ? 30 : 1;
    const vals = (Object.keys(FACTORS) as ServiceId[]).map(id => {
      const inp = services[id];
      const f = FACTORS[id];
      const g = ((inp.msgs * inp.tokens * mult / 1000) * f.whPer1kTokens / 1000) * f.gCO2PerKwh;
      return { id, g };
    });
    const localG = (local.watt * local.hours * mult / 1000) * 290;
    vals.push({ id: 'local', g: localG });
    const total = vals.reduce((s, v) => s + v.g, 0);
    return { values: vals, total };
  }, [services, local, period]);

  function stepService(id: ServiceId, field: 'msgs', delta: number) {
    setServices(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: Math.max(0, prev[id][field] + delta) },
    }));
  }

  function setTokens(id: ServiceId, tokens: number) {
    setServices(prev => ({ ...prev, [id]: { ...prev[id], tokens } }));
  }

  function stepLocal(field: 'hours' | 'watt', delta: number) {
    setLocal(prev => ({ ...prev, [field]: Math.max(0, prev[field] + delta) }));
  }

  let displayVal: number, unitStr: string;
  if (total < 1) { displayVal = total * 1000; unitStr = 'mg CO₂'; }
  else if (total < 1000) { displayVal = total; unitStr = 'g CO₂'; }
  else { displayVal = total / 1000; unitStr = 'kg CO₂'; }

  const context = total === 0
    ? 'Vul je gebruik in om je uitstoot te berekenen'
    : total < 1 ? 'Heel weinig! Goed bezig!'
    : total < 50 ? `Vergelijkbaar met een paar minuten autorijden per ${period === 'day' ? 'dag' : 'maand'}.`
    : total < 500 ? `Vergelijkbaar met een korte autorit per ${period === 'day' ? 'dag' : 'maand'}.`
    : 'Niet niks. Overweeg minder zware modellen te gebruiken.';

  const CIRC = 2 * Math.PI * 48;
  let offset = 0;
  const arcs = values.map(v => {
    const pct = total > 0 ? v.g / total : 0;
    const dash = pct * CIRC;
    const arc = { id: v.id, dash, offset, color: COLORS[v.id] };
    offset += dash;
    return arc;
  });

  return (
    <>
      <style>{`
        .co2-page { font-family: 'Inter', -apple-system, sans-serif; background: #0f1117; color: #f3f4f6; min-height: 100vh; }
        .co2-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 2rem; background: rgba(15,17,23,0.85); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .co2-nav a { font-size: 0.82rem; color: rgba(255,255,255,0.5); text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .co2-nav a:hover { color: #fff; }
        .co2-header { padding: 8rem 1.5rem 4rem; text-align: center; background: linear-gradient(to bottom, #1a1200, #0f1117); }
        .co2-tag { display: inline-block; background: rgba(217,119,6,0.15); color: #d97706; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.4rem 1rem; border-radius: 99px; margin-bottom: 1.5rem; }
        .co2-header h1 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; color: #fff; margin-bottom: 0.75rem; }
        .co2-header p { color: rgba(255,255,255,0.5); font-size: 1.05rem; max-width: 440px; margin: 0 auto; }
        .co2-main { max-width: 740px; margin: 0 auto; padding: 0 1rem 4rem; }
        .result-hero { background: #1a1d27; border-radius: 16px; border: 1px solid rgba(255,255,255,0.07); padding: 2rem; text-align: center; margin-bottom: 1.25rem; }
        .result-label { font-size: 0.78rem; font-weight: 600; color: #9ca3af; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.75rem; }
        .co2-display { display: flex; align-items: baseline; justify-content: center; gap: 0.3rem; margin-bottom: 0.25rem; }
        .co2-number { font-size: clamp(3rem, 10vw, 4.5rem); font-weight: 800; background: linear-gradient(135deg, #ea580c, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; }
        .co2-unit { font-size: 1.1rem; font-weight: 600; color: #9ca3af; }
        .co2-context { font-size: 0.82rem; color: #9ca3af; margin-bottom: 1.5rem; }
        .comparisons { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.75rem; }
        .comparison { background: #0f1117; border-radius: 12px; padding: 0.9rem 0.5rem; text-align: center; border: 1px solid #2d3148; }
        .comparison .icon { font-size: 1.4rem; display: block; margin-bottom: 0.35rem; }
        .comparison .val { font-size: 1.1rem; font-weight: 700; color: #f3f4f6; display: block; }
        .comparison .lbl { font-size: 0.72rem; color: #9ca3af; }
        .period-toggle { display: flex; background: #1a1d27; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 0.4rem; gap: 0.4rem; margin-bottom: 1.25rem; }
        .period-btn { flex: 1; padding: 0.55rem; border: none; border-radius: 10px; background: transparent; color: #9ca3af; font-family: inherit; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .period-btn.active { background: #d97706; color: #fff; }
        .card { background: #1a1d27; border-radius: 16px; padding: 1.5rem; margin-bottom: 1.25rem; border: 1px solid rgba(255,255,255,0.07); }
        .card-title { font-size: 0.78rem; font-weight: 700; color: #9ca3af; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.25rem; }
        .service-row { padding: 1rem 0; border-bottom: 1px solid #2d3148; }
        .service-row:last-child { border-bottom: none; padding-bottom: 0; }
        .service-row:first-of-type { padding-top: 0; }
        .service-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
        .service-name { font-size: 0.95rem; font-weight: 600; color: #f3f4f6; }
        .service-sub { font-size: 0.78rem; color: #9ca3af; margin-top: 0.1rem; }
        .service-co2 { font-size: 0.8rem; font-weight: 600; color: #d97706; background: rgba(217,119,6,0.1); padding: 0.2rem 0.6rem; border-radius: 99px; white-space: nowrap; }
        .green-tag { display: inline-block; font-size: 0.62rem; font-weight: 700; background: #14532d; color: #86efac; padding: 0.12rem 0.45rem; border-radius: 99px; margin-left: 0.4rem; vertical-align: middle; }
        .inputs-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .input-block label { display: block; font-size: 0.72rem; font-weight: 600; color: #9ca3af; margin-bottom: 0.3rem; letter-spacing: 0.05em; text-transform: uppercase; }
        .input-wrap { display: flex; align-items: center; background: #252836; border-radius: 10px; border: 1.5px solid transparent; transition: border-color 0.2s; overflow: hidden; }
        .input-wrap:focus-within { border-color: #d97706; }
        .input-wrap button { width: 32px; height: 36px; border: none; background: transparent; color: #9ca3af; font-size: 1.1rem; cursor: pointer; flex-shrink: 0; transition: color 0.15s; }
        .input-wrap button:hover { color: #d97706; }
        .input-num { flex: 1; border: none; background: transparent; font-family: inherit; font-size: 0.95rem; font-weight: 600; color: #f3f4f6; text-align: center; outline: none; padding: 0.4rem 0; }
        .token-select { display: grid; grid-template-columns: repeat(4,1fr); gap: 3px; background: #252836; border-radius: 10px; padding: 3px; }
        .token-btn { border: none; background: transparent; border-radius: 7px; padding: 0.38rem 0.1rem; font-size: 0.72rem; font-weight: 600; color: #9ca3af; cursor: pointer; transition: all 0.15s; font-family: inherit; text-align: center; }
        .token-btn.active { background: #d97706; color: white; }
        .token-hint { font-size: 0.68rem; color: #9ca3af; margin-top: 0.3rem; font-style: italic; }
        .chart-wrap { display: flex; align-items: center; gap: 1.5rem; }
        .legend { flex: 1; display: flex; flex-direction: column; gap: 0.55rem; }
        .legend-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; }
        .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .legend-label { flex: 1; color: #f3f4f6; }
        .legend-val { font-weight: 600; color: #9ca3af; font-size: 0.8rem; }
        .tips-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .tip-item { display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.9rem; background: #0f1117; border-radius: 10px; border: 1px solid #2d3148; }
        .tip-icon { font-size: 1.2rem; flex-shrink: 0; line-height: 1.4; }
        .tip-title { font-size: 0.88rem; font-weight: 700; color: #f3f4f6; margin-bottom: 0.2rem; }
        .tip-desc { font-size: 0.8rem; color: #9ca3af; line-height: 1.55; }
        .disclaimer { font-size: 0.78rem; color: #9ca3af; line-height: 1.7; }
        .disclaimer strong { color: #f3f4f6; }
        .co2-footer { text-align: center; font-size: 0.78rem; color: #9ca3af; padding: 0 1rem 2rem; }
        @media (max-width: 500px) {
          .inputs-row { grid-template-columns: 1fr; }
          .comparisons { gap: 0.4rem; }
          .chart-wrap { flex-direction: column; }
        }
      `}</style>

      <div className="co2-page">
        <nav className="co2-nav">
          <Link href="/">← Spill Your Tea</Link>
          <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            AI CO₂ Calculator
          </span>
        </nav>

        <header className="co2-header">
          <div className="co2-tag">Spill Your Tea · Tool</div>
          <h1>AI CO₂ Calculator</h1>
          <p>Hoeveel CO₂ stoot jouw AI-gebruik eigenlijk uit?</p>
        </header>

        <main className="co2-main">

          {/* Result hero */}
          <div className="result-hero">
            <div className="result-label">
              Geschatte uitstoot per {period === 'day' ? 'dag' : 'maand'}
            </div>
            <div className="co2-display">
              <span className="co2-number">{displayVal.toFixed(displayVal < 1 ? 2 : 1)}</span>
              <span className="co2-unit">{unitStr}</span>
            </div>
            <div className="co2-context">{context}</div>
            <div className="comparisons">
              <div className="comparison">
                <span className="icon">🚗</span>
                <span className="val">{(total / 120).toFixed(2)}</span>
                <span className="lbl">km autorijden</span>
              </div>
              <div className="comparison">
                <span className="icon">💡</span>
                <span className="val">{Math.round(total / 1)}</span>
                <span className="lbl">uur LED-lamp</span>
              </div>
              <div className="comparison">
                <span className="icon">📱</span>
                <span className="val">{(total / 8.8).toFixed(1)}</span>
                <span className="lbl">× telefoon opladen</span>
              </div>
            </div>
          </div>

          {/* Period toggle */}
          <div className="period-toggle">
            <button className={`period-btn${period === 'day' ? ' active' : ''}`} onClick={() => setPeriod('day')}>Per dag</button>
            <button className={`period-btn${period === 'month' ? ' active' : ''}`} onClick={() => setPeriod('month')}>Per maand</button>
          </div>

          {/* Cloud AI */}
          <ServiceCard title="☁️ Cloud AI">
            {(['claude', 'chatgpt', 'gemini'] as ServiceId[]).map(id => (
              <ServiceRow
                key={id}
                id={id}
                name={id === 'claude' ? 'Claude (Opus)' : id === 'chatgpt' ? 'ChatGPT' : 'Gemini'}
                sub={id === 'claude' ? 'Anthropic · zwaarste model' : id === 'chatgpt' ? 'OpenAI · GPT-4o / GPT-4' : 'Google · Pro / Ultra'}
                co2={fmt(values.find(v => v.id === id)?.g ?? 0)}
                inputs={services[id]}
                onStep={d => stepService(id, 'msgs', d)}
                onToken={t => setTokens(id, t)}
              />
            ))}
          </ServiceCard>

          {/* Groenere alternatieven */}
          <ServiceCard title="🌿 Groenere alternatieven">
            <ServiceRow
              id="sonnet" name="Claude Sonnet / Haiku" sub="Anthropic · Sonnet = balans kwaliteit & uitstoot"
              co2={fmt(values.find(v => v.id === 'sonnet')?.g ?? 0)}
              inputs={services.sonnet} greenTag="Efficiënter"
              onStep={d => stepService('sonnet', 'msgs', d)} onToken={t => setTokens('sonnet', t)}
            />
            <ServiceRow
              id="lechat" name="Le Chat" sub="Mistral AI · Frans elektriciteitsnet (kernenergie)"
              co2={fmt(values.find(v => v.id === 'lechat')?.g ?? 0)}
              inputs={services.lechat} greenTag="Europese servers"
              onStep={d => stepService('lechat', 'msgs', d)} onToken={t => setTokens('lechat', t)}
            />
            <ServiceRow
              id="greenpt" name="GreenPT" sub="Nederlands · Scaleway · GDPR-proof"
              co2={fmt(values.find(v => v.id === 'greenpt')?.g ?? 0)}
              inputs={services.greenpt} greenTag="100% hernieuwbaar"
              onStep={d => stepService('greenpt', 'msgs', d)} onToken={t => setTokens('greenpt', t)}
            />
          </ServiceCard>

          {/* Lokale modellen */}
          <div className="card">
            <div className="card-title">💻 Lokale modellen</div>
            <div className="service-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <div className="service-header">
                <div>
                  <div className="service-name">Eigen hardware</div>
                  <div className="service-sub">Ollama, LM Studio, etc.</div>
                </div>
                <span className="service-co2">{fmt(values.find(v => v.id === 'local')?.g ?? 0)}</span>
              </div>
              <div className="inputs-row">
                <div className="input-block">
                  <label>Uren per dag</label>
                  <div className="input-wrap">
                    <button onClick={() => stepLocal('hours', -0.5)}>−</button>
                    <input className="input-num" type="number" value={local.hours} onChange={e => setLocal(p => ({ ...p, hours: Math.max(0, parseFloat(e.target.value) || 0) }))} />
                    <button onClick={() => stepLocal('hours', 0.5)}>+</button>
                  </div>
                </div>
                <div className="input-block">
                  <label>GPU watt</label>
                  <div className="input-wrap">
                    <button onClick={() => stepLocal('watt', -10)}>−</button>
                    <input className="input-num" type="number" value={local.watt} onChange={e => setLocal(p => ({ ...p, watt: Math.max(0, parseFloat(e.target.value) || 0) }))} />
                    <button onClick={() => stepLocal('watt', 10)}>+</button>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.75rem' }}>
                RTX 3080 ≈ 320W · RTX 4060 ≈ 115W · M2 MacBook ≈ 20W
              </p>
            </div>
          </div>

          {/* Donut chart */}
          <div className="card">
            <div className="card-title">🍩 Verdeling per dienst</div>
            <div className="chart-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
                <circle cx="60" cy="60" r="48" fill="none" stroke="#2d3148" strokeWidth="16" />
                {arcs.map(arc => (
                  <circle
                    key={arc.id}
                    cx="60" cy="60" r="48"
                    fill="none"
                    stroke={arc.color}
                    strokeWidth="16"
                    strokeDasharray={`${arc.dash} ${CIRC - arc.dash}`}
                    strokeDashoffset={-arc.offset}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                ))}
              </svg>
              <div className="legend">
                {values.filter(v => v.g > 0).length === 0
                  ? <div style={{ fontSize: '0.82rem', color: '#9ca3af' }}>Vul je gebruik in om de verdeling te zien.</div>
                  : values.filter(v => v.g > 0).map(v => (
                    <div key={v.id} className="legend-item">
                      <span className="legend-dot" style={{ background: COLORS[v.id] }} />
                      <span className="legend-label">{LABELS[v.id]}</span>
                      <span className="legend-val">{fmt(v.g)}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card">
            <div className="card-title">💡 Wat kun je nu al doen?</div>
            <div className="tips-list">
              {[
                { icon: '❓', title: 'Vraag jezelf: heeft AI hier echt meerwaarde?', desc: 'Niet elke vraag heeft AI nodig. Een Google-zoekopdracht, een bestaand template of gewoon even nadenken is soms sneller én duurzamer.' },
                { icon: '🎯', title: 'Kies het juiste model voor de taak', desc: 'Gebruik Claude Sonnet of Haiku voor de meeste taken. Reserveer Opus of GPT-4 alleen voor complexe analyses. Dat scheelt al snel 3× in uitstoot.' },
                { icon: '📚', title: 'Bundel je vragen', desc: 'Stuur één uitgebreid bericht in plaats van tien losse. Elk bericht kost energie voor context én verwerking.' },
                { icon: '🌱', title: 'Switch naar een groenere provider', desc: 'GreenPT draait volledig op hernieuwbare energie en is ook nog eens GDPR-proof. Le Chat (Mistral) gebruikt Europese servers.' },
                { icon: '🔒', title: 'Gebruik lokale modellen voor privégevoelige taken', desc: 'Tools zoals Ollama of LM Studio draaien op je eigen computer. Geen cloud, geen datalek.' },
              ].map(tip => (
                <div key={tip.title} className="tip-item">
                  <div className="tip-icon">{tip.icon}</div>
                  <div>
                    <div className="tip-title">{tip.title}</div>
                    <div className="tip-desc">{tip.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="card">
            <div className="card-title">⚠️ Over de berekeningen</div>
            <p className="disclaimer">
              Schattingen op basis van gepubliceerd onderzoek (Luccioni et al., 2023) en Mistral Environmental Report (2025).<br /><br />
              <strong>Emissiefactoren:</strong><br />
              Claude Opus: ~0,010 Wh/1k tokens · 200 gCO₂/kWh<br />
              Claude Sonnet: ~0,007 Wh/1k tokens · 200 gCO₂/kWh<br />
              ChatGPT: ~0,020 Wh/1k tokens · 200 gCO₂/kWh<br />
              Gemini: ~0,010 Wh/1k tokens · 100 gCO₂/kWh<br />
              Le Chat: ~0,008 Wh/1k tokens · 50 gCO₂/kWh<br />
              GreenPT: ~0,010 Wh/1k tokens · 10 gCO₂/kWh<br />
              Lokaal: GPU-wattage × uren × NL-netintensiteit (≈ 290 gCO₂/kWh)<br /><br />
              Beschouw dit als een <em>indicatie</em>, niet als exacte meting.
            </p>
          </div>

        </main>

        <footer className="co2-footer">© Kimberley van Ruiven · Spill Your Tea: AI zonder bullshit</footer>
      </div>
    </>
  );
}

function ServiceCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      {children}
    </div>
  );
}

function ServiceRow({ id, name, sub, co2, inputs, greenTag, onStep, onToken }: {
  id: string;
  name: string;
  sub: string;
  co2: string;
  inputs: ServiceInputs;
  greenTag?: string;
  onStep: (delta: number) => void;
  onToken: (tokens: number) => void;
}) {
  return (
    <div className="service-row">
      <div className="service-header">
        <div>
          <div className="service-name">
            {name}
            {greenTag && <span className="green-tag">{greenTag}</span>}
          </div>
          <div className="service-sub">{sub}</div>
        </div>
        <span className="service-co2">{co2}</span>
      </div>
      <div className="inputs-row">
        <div className="input-block">
          <label>Berichten</label>
          <div className="input-wrap">
            <button onClick={() => onStep(-1)}>−</button>
            <input className="input-num" type="number" value={inputs.msgs} onChange={e => onStep((parseFloat(e.target.value) || 0) - inputs.msgs)} />
            <button onClick={() => onStep(1)}>+</button>
          </div>
        </div>
        <div className="input-block">
          <label>Gesprekslengte</label>
          <div className="token-select">
            {TOKEN_PRESETS.map(p => (
              <button
                key={p.value}
                className={`token-btn${inputs.tokens === p.value ? ' active' : ''}`}
                onClick={() => onToken(p.value)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="token-hint">Kort ≈ 150 · Gemiddeld ≈ 600 · Lang ≈ 1.500 · Uitgebreid ≈ 3.750 woorden</div>
        </div>
      </div>
    </div>
  );
}
