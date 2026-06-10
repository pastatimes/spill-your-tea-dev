'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function CO2Page() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let period = 'day';
    const CIRCUMFERENCE = 2 * Math.PI * 48;
    const DAYS = 30;

    const COLORS: Record<string, string> = {
      claude: '#ea580c', chatgpt: '#d97706', gemini: '#b45309',
      sonnet: '#16a34a', lechat: '#2563eb', greenpt: '#15803d', local: '#78716c',
    };

    const FACTORS: Record<string, { whPer1kTokens: number; gCO2PerKwh: number }> = {
      claude:  { whPer1kTokens: 0.010, gCO2PerKwh: 200 },
      chatgpt: { whPer1kTokens: 0.020, gCO2PerKwh: 200 },
      gemini:  { whPer1kTokens: 0.010, gCO2PerKwh: 100 },
      sonnet:  { whPer1kTokens: 0.007, gCO2PerKwh: 200 },
      lechat:  { whPer1kTokens: 0.008, gCO2PerKwh: 50  },
      greenpt: { whPer1kTokens: 0.010, gCO2PerKwh: 10  },
    };

    function step(id: string, delta: number) {
      const el = document.getElementById(id) as HTMLInputElement;
      if (!el) return;
      el.value = String(Math.max(0, (parseFloat(el.value) || 0) + delta));
      calculate();
    }

    function setTokens(id: string, value: number, btn: HTMLElement) {
      const hidden = document.getElementById(id + '-tokens') as HTMLInputElement;
      if (hidden) hidden.value = String(value);
      btn.closest('.token-select')?.querySelectorAll('.token-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calculate();
    }

    function setPeriod(p: string, btn: HTMLElement) {
      period = p;
      document.querySelectorAll('.period-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const label = document.getElementById('result-label');
      if (label) label.textContent = p === 'day' ? 'Geschatte uitstoot per dag' : 'Geschatte uitstoot per maand';
      calculate();
    }

    function toggleTheme() {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      const btn = document.querySelector('.theme-btn');
      if (btn) btn.innerHTML = isDark ? '🌙' : '☀️';
    }

    function fmt(g: number): string {
      if (g < 0.001) return '0 mg';
      if (g < 1) return (g * 1000).toFixed(1) + ' mg';
      if (g < 1000) return g.toFixed(1) + ' g';
      return (g / 1000).toFixed(2) + ' kg';
    }

    function gCO2ForService(id: string): number {
      const msgs = parseFloat((document.getElementById(id + '-msgs') as HTMLInputElement)?.value) || 0;
      const tokens = parseFloat((document.getElementById(id + '-tokens') as HTMLInputElement)?.value) || 0;
      const f = FACTORS[id];
      const multiplier = period === 'month' ? DAYS : 1;
      return ((msgs * tokens * multiplier / 1000) * f.whPer1kTokens / 1000) * f.gCO2PerKwh;
    }

    function gCO2ForLocal(): number {
      const hours = parseFloat((document.getElementById('local-hours') as HTMLInputElement)?.value) || 0;
      const watt  = parseFloat((document.getElementById('local-watt') as HTMLInputElement)?.value) || 0;
      const multiplier = period === 'month' ? DAYS : 1;
      return (watt * hours * multiplier / 1000) * 290;
    }

    function updateDonut(values: { id: string; g: number }[], total: number) {
      const circ = CIRCUMFERENCE;
      let offset = 0;
      const ids = ['claude', 'chatgpt', 'gemini', 'sonnet', 'lechat', 'greenpt', 'local'];
      ids.forEach(id => {
        const arc = document.getElementById('arc-' + id);
        if (!arc) return;
        const v = values.find(v => v.id === id);
        const pct = total > 0 ? (v ? v.g / total : 0) : 0;
        const dash = pct * circ;
        arc.style.strokeDasharray = dash + ' ' + (circ - dash);
        arc.style.strokeDashoffset = String(-offset);
        offset += dash;
      });
    }

    function updateLegend(values: { id: string; g: number; label: string }[], total: number) {
      const legend = document.getElementById('legend');
      if (!legend) return;
      legend.innerHTML = values.filter(v => v.g > 0).map(v => `
        <div class="legend-item">
          <span class="legend-dot" style="background:${COLORS[v.id]}"></span>
          <span class="legend-label">${v.label}</span>
          <span class="legend-val">${fmt(v.g)}</span>
        </div>`).join('') || '<div style="font-size:0.82rem;color:var(--muted)">Vul je gebruik in om de verdeling te zien.</div>';
    }

    function calculate() {
      const services = [
        { id: 'claude',  label: 'Claude Opus' },
        { id: 'chatgpt', label: 'ChatGPT' },
        { id: 'gemini',  label: 'Gemini' },
        { id: 'sonnet',  label: 'Claude Sonnet' },
        { id: 'lechat',  label: 'Le Chat' },
        { id: 'greenpt', label: 'GreenPT' },
      ];
      const values = services.map(s => ({ id: s.id, label: s.label, g: gCO2ForService(s.id) }));
      values.push({ id: 'local', label: 'Lokaal', g: gCO2ForLocal() });
      const total = values.reduce((s, v) => s + v.g, 0);

      values.forEach(v => {
        const badge = document.getElementById(v.id + '-badge');
        if (badge) badge.textContent = fmt(v.g);
      });

      const el = document.getElementById('total-co2');
      const unitEl = document.getElementById('co2-unit');
      const ctx = document.getElementById('co2-context');
      if (!el || !unitEl || !ctx) return;

      let displayVal: number, unitStr: string;
      if (total < 1) { displayVal = total * 1000; unitStr = 'mg CO₂'; }
      else if (total < 1000) { displayVal = total; unitStr = 'g CO₂'; }
      else { displayVal = total / 1000; unitStr = 'kg CO₂'; }

      el.textContent = displayVal.toFixed(displayVal < 1 ? 2 : 1);
      unitEl.textContent = unitStr;

      const period_label = period === 'day' ? 'dag' : 'maand';
      if (total < 1) ctx.textContent = 'Heel weinig! Goed bezig!';
      else if (total < 50) ctx.textContent = `Vergelijkbaar met een paar minuten autorijden per ${period_label}.`;
      else if (total < 500) ctx.textContent = `Vergelijkbaar met een korte autorit per ${period_label}.`;
      else ctx.textContent = 'Niet niks. Overweeg minder zware modellen te gebruiken.';

      const carEl = document.getElementById('car-km');
      const lampEl = document.getElementById('lamp-hours');
      const phoneEl = document.getElementById('phone-charges');
      if (carEl) carEl.textContent = (total / 120).toFixed(2);
      if (lampEl) lampEl.textContent = String(Math.round(total / 1));
      if (phoneEl) phoneEl.textContent = (total / 8.8).toFixed(1);

      updateDonut(values, total);
      updateLegend(values, total);
    }

    // Expose to DOM event handlers
    (window as any).step = step;
    (window as any).setTokens = setTokens;
    (window as any).setPeriod = setPeriod;
    (window as any).toggleTheme = toggleTheme;
    (window as any).calculate = calculate;

    calculate();
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg: #f6f7fb; --card: #ffffff; --card-border: rgba(0,0,0,0.06);
          --text: #0f1117; --muted: #6b7280; --subtle: #e5e7eb;
          --accent: #d97706; --accent2: #b45309;
          --grad-a: #ea580c; --grad-b: #d97706;
          --shadow: 0 2px 12px rgba(0,0,0,0.07); --shadow-lg: 0 8px 32px rgba(217,119,6,0.25);
          --radius: 16px; --input-bg: #f3f4f6;
        }
        [data-theme="dark"] {
          --bg: #0f1117; --card: #1a1d27; --card-border: rgba(255,255,255,0.07);
          --text: #f3f4f6; --muted: #9ca3af; --subtle: #2d3148;
          --shadow: 0 2px 12px rgba(0,0,0,0.3); --input-bg: #252836;
        }
        .co2-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .co2-wrap { font-family: 'Inter', -apple-system, sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
        .co2-topbar { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); position: sticky; top: 0; z-index: 50; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .co2-topbar a { color: #fff; text-decoration: none; font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; transition: opacity 0.2s; }
        .co2-topbar a:hover { opacity: 1; }
        .co2-header { background: linear-gradient(rgba(0,0,0,0.48),rgba(0,0,0,0.48)), url('https://images.unsplash.com/photo-1607135097879-b6371869411a?fm=jpg&q=80&w=1920&auto=format&fit=crop') center/cover no-repeat; padding: 3rem 1.5rem 5rem; text-align: center; position: relative; overflow: hidden; }
        .header-inner { position: relative; z-index: 1; }
        .slogan { display: inline-block; background: rgba(255,255,255,0.22); color: #fff; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.4rem 1.1rem; border-radius: 99px; margin-bottom: 1rem; }
        .co2-header h1 { font-size: clamp(1.8rem,5vw,2.8rem); font-weight: 800; color: #fff; line-height: 1.15; margin-bottom: 0.5rem; text-shadow: 0 2px 12px rgba(0,0,0,0.8); }
        .co2-header p { color: #fff; font-size: 1.1rem; font-weight: 600; max-width: 420px; margin: 0 auto; text-shadow: 0 1px 8px rgba(0,0,0,0.8); }
        .theme-btn { position: absolute; top: 1.25rem; right: 1.25rem; background: rgba(255,255,255,0.15); border: none; border-radius: 99px; color: #fff; font-size: 1.1rem; width: 38px; height: 38px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; z-index: 2; }
        .theme-btn:hover { background: rgba(255,255,255,0.25); }
        .co2-main { max-width: 740px; width: 100%; margin: -2.5rem auto 0; padding: 0 1rem 4rem; position: relative; z-index: 1; }
        .result-hero { background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow-lg); padding: 2rem; text-align: center; margin-bottom: 1.25rem; border: 1px solid var(--card-border); }
        .result-label { font-size: 0.8rem; font-weight: 600; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.75rem; }
        .co2-display { display: flex; align-items: baseline; justify-content: center; gap: 0.3rem; margin-bottom: 0.25rem; }
        .co2-number { font-size: clamp(3rem,10vw,4.5rem); font-weight: 800; background: linear-gradient(135deg,var(--grad-a),var(--grad-b)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; }
        .co2-unit { font-size: 1.1rem; font-weight: 600; color: var(--muted); }
        .co2-context { font-size: 0.82rem; color: var(--muted); margin-bottom: 1.5rem; }
        .comparisons { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.75rem; }
        .comparison { background: var(--bg); border-radius: 12px; padding: 0.9rem 0.5rem; text-align: center; border: 1px solid var(--subtle); }
        .comparison .icon { font-size: 1.6rem; display: block; margin-bottom: 0.35rem; }
        .comparison .val { font-size: 1.1rem; font-weight: 700; color: var(--text); display: block; }
        .comparison .lbl { font-size: 0.72rem; color: var(--muted); }
        .period-toggle { display: flex; background: var(--card); border: 1px solid var(--card-border); border-radius: var(--radius); padding: 0.4rem; gap: 0.4rem; margin-bottom: 1.25rem; box-shadow: var(--shadow); }
        .period-toggle button { flex: 1; padding: 0.55rem; border: none; border-radius: 10px; background: transparent; color: var(--muted); font-family: inherit; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .period-toggle button.active { background: #d97706; color: #fff; box-shadow: 0 2px 8px rgba(217,119,6,0.4); }
        .card { background: var(--card); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.25rem; box-shadow: var(--shadow); border: 1px solid var(--card-border); }
        .card-title { font-size: 0.78rem; font-weight: 700; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.25rem; }
        .service-row { padding: 1rem 0; border-bottom: 1px solid var(--subtle); }
        .service-row:last-child { border-bottom: none; padding-bottom: 0; }
        .service-row:first-of-type { padding-top: 0; }
        .service-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
        .service-name { font-size: 0.95rem; font-weight: 600; }
        .service-sub { font-size: 0.78rem; color: var(--muted); margin-top: 0.1rem; }
        .service-co2 { font-size: 0.8rem; font-weight: 600; color: var(--accent); background: rgba(217,119,6,0.10); padding: 0.2rem 0.6rem; border-radius: 99px; white-space: nowrap; }
        .inputs-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; min-width: 0; }
        .input-block { min-width: 0; }
        .input-block label { display: block; font-size: 0.72rem; font-weight: 600; color: var(--muted); margin-bottom: 0.3rem; letter-spacing: 0.05em; text-transform: uppercase; }
        .input-wrap { display: flex; align-items: center; background: var(--input-bg); border-radius: 10px; border: 1.5px solid transparent; transition: border-color 0.2s; overflow: hidden; width: 100%; min-width: 0; }
        .input-wrap:focus-within { border-color: var(--accent); }
        .input-wrap button { width: 32px; height: 36px; border: none; background: transparent; color: var(--muted); font-size: 1.1rem; cursor: pointer; flex-shrink: 0; transition: color 0.15s; }
        .input-wrap button:hover { color: var(--accent); }
        .input-wrap input[type="number"] { flex: 1; border: none; background: transparent; font-family: inherit; font-size: 0.95rem; font-weight: 600; color: var(--text); text-align: center; outline: none; min-width: 0; padding: 0.4rem 0; -moz-appearance: textfield; }
        .input-wrap input[type="number"]::-webkit-outer-spin-button, .input-wrap input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }
        .token-select { display: grid; grid-template-columns: repeat(4,1fr); gap: 3px; background: var(--input-bg); border-radius: 10px; padding: 3px; }
        .token-btn { border: none; background: transparent; border-radius: 7px; padding: 0.38rem 0.1rem; font-size: 0.72rem; font-weight: 600; color: var(--muted); cursor: pointer; transition: all 0.15s; font-family: inherit; text-align: center; line-height: 1.2; }
        .token-btn.active { background: var(--accent); color: white; }
        .token-hint { font-size: 0.68rem; color: var(--muted); margin-top: 0.3rem; font-style: italic; }
        .green-tag { display: inline-block; font-size: 0.62rem; font-weight: 700; background: #dcfce7; color: #15803d; padding: 0.12rem 0.45rem; border-radius: 99px; margin-left: 0.4rem; vertical-align: middle; letter-spacing: 0.05em; }
        [data-theme="dark"] .green-tag { background: #14532d; color: #86efac; }
        .chart-wrap { display: flex; align-items: center; gap: 1.5rem; }
        .legend { flex: 1; display: flex; flex-direction: column; gap: 0.55rem; }
        .legend-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; }
        .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .legend-label { flex: 1; color: var(--text); }
        .legend-val { font-weight: 600; color: var(--muted); font-size: 0.8rem; }
        .tips-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .tip-item { display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.9rem; background: var(--bg); border-radius: 10px; border: 1px solid var(--subtle); }
        .tip-icon { font-size: 1.2rem; flex-shrink: 0; line-height: 1.4; }
        .tip-title { font-size: 0.88rem; font-weight: 700; color: var(--text); margin-bottom: 0.2rem; }
        .tip-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.55; }
        .disclaimer { font-size: 0.78rem; color: var(--muted); line-height: 1.7; }
        .disclaimer strong { color: var(--text); }
        .co2-footer { text-align: center; font-size: 0.78rem; color: var(--muted); padding: 0 1rem 2rem; }
        @media (max-width: 500px) {
          .co2-main { padding: 0 0.75rem 3rem; }
          .result-hero { padding: 1.5rem 1rem; }
          .comparisons { gap: 0.4rem; }
          .comparison { padding: 0.65rem 0.25rem; }
          .inputs-row { gap: 0.5rem; }
          .chart-wrap { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <Script src="https://unpkg.com/@phosphor-icons/web@2.1.1" strategy="afterInteractive" />

      <div className="co2-wrap" ref={mainRef}>

        <div className="co2-topbar">
          <Link href="/">← Spill Your Tea</Link>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI CO₂ Calculator</span>
        </div>

        <header className="co2-header">
          <button className="theme-btn" onClick={() => (window as any).toggleTheme()}><i className="ph ph-moon"></i></button>
          <div className="header-inner">
            <span className="slogan">Spill Your Tea: AI zonder bullshit</span>
            <h1>AI CO₂ Calculator</h1>
            <p>Hoeveel CO₂ stoot jouw AI-gebruik eigenlijk uit?</p>
            <p style={{ fontStyle: 'italic', marginTop: '0.35rem', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>(en wat je hieraan kunt doen)</p>
          </div>
        </header>

        <main className="co2-main">

          <div className="result-hero">
            <div className="result-label" id="result-label">Geschatte uitstoot per dag</div>
            <div className="co2-display">
              <span className="co2-number" id="total-co2">0</span>
              <span className="co2-unit" id="co2-unit">g CO₂</span>
            </div>
            <div className="co2-context" id="co2-context">Vul je gebruik in om je uitstoot te berekenen</div>
            <div className="comparisons">
              <div className="comparison"><span className="icon"><i className="ph ph-car"></i></span><span className="val" id="car-km">0</span><span className="lbl">km autorijden</span></div>
              <div className="comparison"><span className="icon"><i className="ph ph-lightbulb"></i></span><span className="val" id="lamp-hours">0</span><span className="lbl">uur LED-lamp</span></div>
              <div className="comparison"><span className="icon"><i className="ph ph-device-mobile"></i></span><span className="val" id="phone-charges">0</span><span className="lbl">× telefoon opladen</span></div>
            </div>
          </div>

          <div className="period-toggle">
            <button className="active" onClick={(e) => (window as any).setPeriod('day', e.currentTarget)}>Per dag</button>
            <button onClick={(e) => (window as any).setPeriod('month', e.currentTarget)}>Per maand</button>
          </div>

          <div className="card">
            <div className="card-title"><i className="ph ph-cloud"></i> Cloud AI</div>
            {[
              { id: 'chatgpt', name: 'ChatGPT', sub: 'OpenAI · GPT-4o / GPT-4', defaultMsgs: 5 },
              { id: 'claude',  name: 'Claude (Opus)', sub: 'Anthropic · zwaarste model', defaultMsgs: 10 },
              { id: 'gemini',  name: 'Gemini', sub: 'Google · Pro / Ultra', defaultMsgs: 3 },
            ].map(s => <ServiceRow key={s.id} {...s} />)}
          </div>

          <div className="card">
            <div className="card-title"><i className="ph ph-leaf"></i> Groenere alternatieven</div>
            <ServiceRow id="sonnet" name="Claude Sonnet / Haiku" sub="Anthropic · Sonnet = balans kwaliteit & uitstoot · Haiku = lichtst & snelst" defaultMsgs={0} greenTag="Efficiënter" />
            <ServiceRow id="lechat" name="Le Chat" sub="Mistral AI · Frans elektriciteitsnet (kernenergie)" defaultMsgs={0} greenTag="Europese servers" />
            <ServiceRow id="greenpt" name="GreenPT" sub="Nederlands · Scaleway · GDPR-proof" defaultMsgs={0} greenTag="100% hernieuwbaar" />
          </div>

          <div className="card">
            <div className="card-title"><i className="ph ph-laptop"></i> Lokale modellen</div>
            <div className="service-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <div className="service-header">
                <div><div className="service-name">Eigen hardware</div><div className="service-sub">Ollama, LM Studio, etc.</div></div>
                <span className="service-co2" id="local-badge">0 mg</span>
              </div>
              <div className="inputs-row">
                <div className="input-block">
                  <label>Uren per dag</label>
                  <div className="input-wrap">
                    <button onClick={() => (window as any).step('local-hours', -0.5)}>−</button>
                    <input type="number" id="local-hours" min="0" step={0.5} defaultValue={0} onInput={() => (window as any).calculate()} />
                    <button onClick={() => (window as any).step('local-hours', 0.5)}>+</button>
                  </div>
                </div>
                <div className="input-block">
                  <label>GPU watt</label>
                  <div className="input-wrap">
                    <button onClick={() => (window as any).step('local-watt', -10)}>−</button>
                    <input type="number" id="local-watt" min="0" defaultValue={200} onInput={() => (window as any).calculate()} />
                    <button onClick={() => (window as any).step('local-watt', 10)}>+</button>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.75rem' }}>RTX 3080 ≈ 320W · RTX 4060 ≈ 115W · M2 MacBook ≈ 20W</p>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><i className="ph ph-chart-donut"></i> Verdeling per dienst</div>
            <div className="chart-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
                <circle cx="60" cy="60" r="48" fill="none" stroke="var(--subtle)" strokeWidth="16"/>
                {['claude','chatgpt','gemini','sonnet','lechat','greenpt','local'].map((id, i) => (
                  <circle key={id} id={`arc-${id}`} cx="60" cy="60" r="48" fill="none"
                    stroke={['#ea580c','#d97706','#b45309','#16a34a','#2563eb','#15803d','#78716c'][i]}
                    strokeWidth="16" strokeDasharray="0 302" strokeLinecap="round" transform="rotate(-90 60 60)" />
                ))}
              </svg>
              <div className="legend" id="legend" style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Vul je gebruik in om de verdeling te zien.</div>
            </div>
          </div>

          <div className="card">
            <div className="card-title"><i className="ph ph-lightbulb"></i> Wat kun je nu al doen?</div>
            <div className="tips-list">
              {[
                { icon: 'ph-question', title: 'Vraag jezelf: heeft AI hier echt meerwaarde?', desc: 'Niet elke vraag heeft AI nodig. Een Google-zoekopdracht, een bestaand template of gewoon even nadenken is soms sneller én duurzamer. Bewust niet gebruiken telt ook mee.' },
                { icon: 'ph-target', title: 'Kies het juiste model voor de taak', desc: 'Gebruik Claude Sonnet of Haiku voor de meeste taken. Reserveer Opus of GPT-4 alleen voor complexe analyses. Dat scheelt al snel 3× in uitstoot, zonder in te leveren op kwaliteit.' },
                { icon: 'ph-stack', title: 'Bundel je vragen', desc: 'Stuur één uitgebreid bericht in plaats van tien losse. Elk bericht kost energie voor context én verwerking. Neem even de tijd om je vraag compleet te formuleren.' },
                { icon: 'ph-leaf', title: 'Switch naar een groenere provider', desc: 'GreenPT draait volledig op hernieuwbare energie en is ook nog eens GDPR-proof. Le Chat (Mistral) gebruikt Europese servers met een van de laagste CO₂-intensieve elektriciteitsnetjes ter wereld.' },
                { icon: 'ph-lock', title: 'Gebruik lokale modellen voor privégevoelige taken', desc: 'Tools zoals Ollama of LM Studio draaien op je eigen computer. Geen cloud, geen datalek, en bij groene stroom ook nog eens milieuvriendelijker.' },
              ].map(tip => (
                <div key={tip.title} className="tip-item">
                  <div className="tip-icon"><i className={`ph ${tip.icon}`}></i></div>
                  <div><div className="tip-title">{tip.title}</div><div className="tip-desc">{tip.desc}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title"><i className="ph ph-warning"></i> Over de berekeningen</div>
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

function ServiceRow({ id, name, sub, defaultMsgs, greenTag }: {
  id: string; name: string; sub: string; defaultMsgs: number; greenTag?: string;
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
        <span className="service-co2" id={`${id}-badge`}>0 mg</span>
      </div>
      <div className="inputs-row">
        <div className="input-block">
          <label>Berichten</label>
          <div className="input-wrap">
            <button onClick={() => (window as any).step(`${id}-msgs`, -1)}>−</button>
            <input type="number" id={`${id}-msgs`} min={0} defaultValue={defaultMsgs} onInput={() => (window as any).calculate()} />
            <button onClick={() => (window as any).step(`${id}-msgs`, 1)}>+</button>
          </div>
        </div>
        <div className="input-block">
          <label>Gesprekslengte (input + output)</label>
          <div className="token-select">
            {[['Kort',200],['Gemiddeld',800],['Lang',2000],['Uitgebreid',5000]].map(([label, val]) => (
              <button key={val} className={`token-btn${val === 800 ? ' active' : ''}`}
                onClick={(e) => (window as any).setTokens(id, val, e.currentTarget)}>
                {label}
              </button>
            ))}
          </div>
          <input type="hidden" id={`${id}-tokens`} defaultValue={800} />
          <div className="token-hint">Kort ≈ 150 woorden · Gemiddeld ≈ 600 · Lang ≈ 1.500 · Uitgebreid ≈ 3.750</div>
        </div>
      </div>
    </div>
  );
}
