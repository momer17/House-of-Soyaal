"use client"

export default function MockWebsite() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>House of Soyaal Mockup</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --br: #3D2E20;
    --br2: #5C4433;
    --br3: #7A5C46;
    --am: #C17F3E;
    --am2: #D9975A;
    --am3: #EDB87A;
    --cr: #F7F1E8;
    --cr2: #EDE3D4;
    --cr3: #DDD0BC;
    --gn: #1A6B5A;
    --gn2: #E2F3EE;
    --wh: #FFFFFF;
    --tx: #2A1F15;
    --tx2: #6B5240;
    --tx3: #9B8070;
    --bd: rgba(61,46,32,0.12);
    --serif: 'Playfair Display', Georgia, serif;
    --sans: 'DM Sans', system-ui, sans-serif;
  }

  html, body { height: 100%; font-family: var(--sans); background: #1a1410; }

  /* ── OUTER CHROME ── */
  .chrome-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 24px 16px 40px;
    background: #1a1410;
    background-image: radial-gradient(ellipse at 20% 0%, rgba(193,127,62,0.08) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 100%, rgba(61,46,32,0.3) 0%, transparent 60%);
  }

  .chrome-label {
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .chrome-label::before, .chrome-label::after {
    content: '';
    display: block;
    height: 1px;
    width: 60px;
    background: rgba(255,255,255,0.1);
  }

  .browser-shell {
    width: 100%;
    max-width: 1280px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
  }

  .browser-bar {
    background: #2a2018;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .dots { display: flex; gap: 6px; }
  .dot { width: 11px; height: 11px; border-radius: 50%; }
  .url { flex: 1; background: rgba(255,255,255,0.07); border-radius: 6px; padding: 5px 14px; font-size: 12px; color: rgba(255,255,255,0.4); text-align: center; font-family: var(--sans); }
  .view-tabs { display: flex; gap: 2px; }
  .vtab { font-size: 11px; padding: 5px 12px; border-radius: 5px; cursor: pointer; color: rgba(255,255,255,0.4); font-family: var(--sans); transition: all .15s; }
  .vtab.active { background: var(--am); color: #fff; }
  .vtab:hover:not(.active) { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }

  /* ── ALL VIEWS ── */
  .view { display: none; background: var(--wh); }
  .view.active { display: block; }

  /* ── SHARED NAV ── */
  .site-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px;
    background: var(--wh);
    border-bottom: 1px solid var(--bd);
    position: sticky; top: 0; z-index: 10;
  }
  .logo { display: flex; align-items: center; gap: 11px; cursor: pointer; }
  .logo-mark {
    width: 38px; height: 38px; border-radius: 8px; background: var(--br);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .logo-name { font-family: var(--serif); font-size: 17px; color: var(--br); letter-spacing: -.01em; }
  .nav-links { display: flex; align-items: center; gap: 28px; }
  .nl { font-size: 13px; color: var(--tx2); cursor: pointer; font-weight: 400; transition: color .15s; }
  .nl:hover { color: var(--br); }
  .nav-actions { display: flex; gap: 10px; align-items: center; }
  .btn-ghost { background: none; border: 1px solid var(--cr3); color: var(--tx2); border-radius: 7px; padding: 7px 16px; font-size: 13px; cursor: pointer; font-family: var(--sans); transition: all .15s; }
  .btn-ghost:hover { border-color: var(--br); color: var(--br); }
  .btn-solid { background: var(--br); color: var(--cr); border: none; border-radius: 7px; padding: 8px 18px; font-size: 13px; cursor: pointer; font-family: var(--sans); font-weight: 500; transition: background .15s; }
  .btn-solid:hover { background: var(--br2); }
  .btn-amber { background: var(--am); color: #fff; border: none; border-radius: 7px; padding: 8px 18px; font-size: 13px; cursor: pointer; font-family: var(--sans); font-weight: 500; }

  /* ════════════ LANDING ════════════ */
  .announce-bar {
    background: var(--br); color: var(--cr);
    text-align: center; font-size: 12px; padding: 9px;
    font-weight: 400; letter-spacing: .02em;
    cursor: pointer;
  }
  .announce-bar span { color: var(--am3); }

  .hero {
    padding: 72px 40px 60px;
    display: grid; grid-template-columns: 1fr 420px;
    gap: 60px; align-items: center;
    background: var(--wh);
    position: relative; overflow: hidden;
  }
  .hero-pattern {
    position: absolute; right: -40px; top: -40px;
    width: 480px; height: 480px; opacity: .04;
    pointer-events: none;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
    color: var(--am); margin-bottom: 20px; font-weight: 500;
  }
  .hero-eyebrow::before { content: ''; width: 24px; height: 1px; background: var(--am); display: block; }
  .hero-h1 {
    font-family: var(--serif); font-size: 54px; line-height: 1.12;
    color: var(--br); margin-bottom: 22px; font-weight: 600;
  }
  .hero-h1 em { color: var(--am); font-style: italic; }
  .hero-body { font-size: 15px; color: var(--tx2); line-height: 1.75; max-width: 460px; margin-bottom: 32px; font-weight: 300; }
  .hero-ctas { display: flex; gap: 12px; align-items: center; }
  .hero-cta-sec { font-size: 13px; color: var(--tx2); cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }

  .hero-right { display: flex; flex-direction: column; gap: 14px; }
  .stat-strip {
    background: var(--cr); border-radius: 12px; padding: 18px 22px;
    display: grid; grid-template-columns: repeat(3,1fr); gap: 16px;
    border: 1px solid var(--cr2);
  }
  .stat-item { text-align: center; cursor: pointer; }
  .stat-n { font-family: var(--serif); font-size: 28px; color: var(--br); font-weight: 600; }
  .stat-l { font-size: 11px; color: var(--tx3); margin-top: 2px; }

  .poem-preview {
    background: var(--br); border-radius: 12px; padding: 20px 22px; color: var(--cr);
    cursor: pointer;
  }
  .pp-label { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--am3); margin-bottom: 10px; }
  .pp-text { font-family: var(--serif); font-size: 14px; line-height: 1.8; font-style: italic; margin-bottom: 12px; opacity: .9; }
  .pp-author { font-size: 11px; color: rgba(247,241,232,.5); }

  .section { padding: 48px 40px; }
  .section-hd { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 24px; }
  .section-ttl { font-family: var(--serif); font-size: 26px; color: var(--br); font-weight: 500; }
  .section-more { font-size: 13px; color: var(--am); cursor: pointer; }

  .courses-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
  .c-card {
    border: 1px solid var(--cr2); border-radius: 10px; overflow: hidden;
    cursor: pointer; transition: border-color .2s, transform .2s;
  }
  .c-card:hover { border-color: var(--am); transform: translateY(-2px); }
  .c-thumb {
    height: 100px; position: relative;
    display: flex; align-items: flex-end; padding: 10px;
  }
  .bg1 { background: var(--br); }
  .bg2 { background: #1A6B5A; }
  .bg3 { background: #7A4A1E; }
  .bg4 { background: #3A2A5C; }
  .thumb-geo { position: absolute; right: 10px; top: 10px; opacity: .18; }
  .level-tag { font-size: 10px; padding: 3px 8px; border-radius: 4px; font-weight: 500; }
  .lt-beg { background: rgba(247,241,232,.92); color: var(--br); }
  .lt-int { background: rgba(193,127,62,.9); color: #fff; }
  .lt-adv { background: rgba(26,107,90,.9); color: #fff; }
  .c-body { padding: 12px 14px; }
  .c-title { font-size: 13px; font-weight: 500; color: var(--tx); line-height: 1.4; margin-bottom: 6px; }
  .c-meta { font-size: 11px; color: var(--tx3); display: flex; align-items: center; gap: 6px; }
  .free-tag { background: var(--gn2); color: var(--gn); font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 500; }

  .feature-strip {
    background: var(--cr); border-top: 1px solid var(--cr2); border-bottom: 1px solid var(--cr2);
    padding: 40px 40px;
    display: grid; grid-template-columns: repeat(4,1fr); gap: 32px;
  }
  .feat { cursor: pointer; }
  .feat-icon { font-size: 20px; margin-bottom: 10px; }
  .feat-title { font-size: 13px; font-weight: 500; color: var(--br); margin-bottom: 6px; }
  .feat-body { font-size: 12px; color: var(--tx2); line-height: 1.6; font-weight: 300; }

  .footer {
    background: var(--br); padding: 32px 40px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .footer-logo { font-family: var(--serif); font-size: 18px; color: var(--cr); cursor: pointer; }
  .footer-sub { font-size: 11px; color: rgba(247,241,232,.4); margin-top: 2px; }
  .footer-links { display: flex; gap: 20px; }
  .footer-l { font-size: 12px; color: rgba(247,241,232,.5); cursor: pointer; }
  .footer-l:hover { color: rgba(247,241,232,.8); }

  /* ════════════ DASHBOARD ════════════ */
  .portal-layout { display: flex; height: calc(100vh - 90px); min-height: 600px; }
  .sidebar {
    width: 56px; background: var(--cr); border-right: 1px solid var(--cr2);
    display: flex; flex-direction: column; align-items: center;
    padding: 20px 0; gap: 4px; flex-shrink: 0;
  }
  .sb-ico {
    width: 38px; height: 38px; border-radius: 9px; display: flex;
    align-items: center; justify-content: center; cursor: pointer; transition: all .15s;
  }
  .sb-ico.on { background: var(--br); }
  .sb-ico:not(.on):hover { background: var(--cr2); }
  .ico { font-size: 16px; line-height: 1; }
  .ico.lit { filter: brightness(0) invert(1) sepia(1) saturate(0.5); }
  .sb-spacer { flex: 1; }

  .dash-main { flex: 1; overflow-y: auto; padding: 32px 36px; background: var(--wh); }
  .dash-top { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 28px; }
  .dash-greeting { font-family: var(--serif); font-size: 26px; color: var(--br); font-weight: 500; }
  .dash-date { font-size: 12px; color: var(--tx3); }

  .kpis { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 24px; }
  .kpi { background: var(--cr); border-radius: 10px; padding: 16px 18px; cursor: pointer; }
  .kpi:hover { background: var(--cr2); }
  .kpi-n { font-family: var(--serif); font-size: 30px; color: var(--br); font-weight: 500; }
  .kpi-l { font-size: 11px; color: var(--tx3); margin-top: 2px; }

  .continue-card {
    background: var(--br); border-radius: 12px; padding: 22px 26px;
    display: flex; align-items: center; gap: 24px; margin-bottom: 24px;
  }
  .cc-left { flex: 1; }
  .cc-ey { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--am3); margin-bottom: 6px; }
  .cc-title { font-family: var(--serif); font-size: 17px; color: var(--cr); margin-bottom: 12px; font-style: italic; }
  .prog-track { background: rgba(247,241,232,.15); border-radius: 3px; height: 4px; margin-bottom: 8px; }
  .prog-fill { background: var(--am); border-radius: 3px; height: 4px; }
  .cc-meta { font-size: 11px; color: rgba(247,241,232,.45); }
  .cc-btn {
    background: var(--am); color: #fff; border: none; border-radius: 8px;
    padding: 10px 22px; font-size: 13px; cursor: pointer; font-family: var(--sans);
    font-weight: 500; white-space: nowrap;
  }

  .dash-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; }
  .panel { background: var(--cr); border-radius: 12px; padding: 20px; }
  .panel-title { font-size: 10px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--tx3); margin-bottom: 16px; }
  .course-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; cursor: pointer; }
  .course-row:hover { opacity: 0.8; }
  .cr-swatch { width: 8px; height: 32px; border-radius: 3px; flex-shrink: 0; }
  .cr-info { flex: 1; min-width: 0; }
  .cr-name { font-size: 13px; font-weight: 500; color: var(--tx); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
  .cr-pct { font-size: 11px; color: var(--tx3); }
  .mini-bar { background: var(--cr2); border-radius: 2px; height: 3px; margin-top: 4px; overflow: hidden; }
  .mini-fill { height: 3px; border-radius: 2px; background: var(--am); }

  .flash-nudge {
    background: var(--wh); border-radius: 8px; padding: 12px 14px;
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 4px; border: 1px solid var(--cr2);
  }
  .fn-text { font-size: 12px; color: var(--tx2); }
  .fn-num { font-family: var(--serif); font-size: 20px; color: var(--am); margin-right: 4px; }
  .fn-btn { background: var(--am); color: #fff; border: none; border-radius: 6px; padding: 5px 12px; font-size: 11px; cursor: pointer; font-family: var(--sans); }

  .event-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px; cursor: pointer; }
  .event-item:hover { opacity: 0.8; }
  .ev-cal { background: var(--wh); border-radius: 8px; padding: 8px 12px; text-align: center; flex-shrink: 0; border: 1px solid var(--cr2); }
  .ev-day { font-family: var(--serif); font-size: 20px; color: var(--br); line-height: 1; }
  .ev-mon { font-size: 9px; text-transform: uppercase; letter-spacing: .08em; color: var(--am); }
  .ev-name { font-size: 13px; font-weight: 500; color: var(--tx); margin-bottom: 3px; }
  .ev-detail { font-size: 11px; color: var(--tx3); }
  .ev-tag { display: inline-block; font-size: 10px; padding: 2px 7px; border-radius: 4px; margin-top: 4px; }
  .ev-paid { background: rgba(193,127,62,.12); color: var(--am); }
  .ev-free { background: var(--gn2); color: var(--gn); }

  /* ════════════ COURSE PLAYER ════════════ */
  .player-layout { display: flex; height: calc(100vh - 64px); min-height: 600px; }
  .lesson-list {
    width: 240px; flex-shrink: 0;
    border-right: 1px solid var(--cr2);
    display: flex; flex-direction: column;
    background: var(--wh);
  }
  .ll-head {
    padding: 18px 16px 14px;
    border-bottom: 1px solid var(--cr2);
  }
  .ll-course { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--am); margin-bottom: 4px; font-weight: 500; }
  .ll-title { font-family: var(--serif); font-size: 15px; color: var(--br); line-height: 1.35; }
  .ll-prog-bar { background: var(--cr2); border-radius: 2px; height: 3px; margin-top: 10px; overflow: hidden; }
  .ll-prog-fill { background: var(--am); height: 3px; border-radius: 2px; }
  .ll-pct { font-size: 10px; color: var(--tx3); margin-top: 4px; }

  .ll-body { flex: 1; overflow-y: auto; padding: 8px 0; }
  .mod-label {
    font-size: 9px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
    color: var(--tx3); padding: 12px 16px 5px;
  }
  .lesson-li {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 16px; cursor: pointer; font-size: 12px; color: var(--tx2);
    transition: background .1s;
  }
  .lesson-li.done { color: var(--tx3); }
  .lesson-li.current { background: var(--cr); color: var(--br); font-weight: 500; }
  .lesson-li:hover:not(.current) { background: var(--cr); }
  .li-ic {
    width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 8px;
    border: 1.5px solid var(--cr2);
  }
  .li-ic.done { background: var(--gn); border-color: var(--gn); color: #fff; font-size: 9px; }
  .li-ic.cur { border-color: var(--am); background: rgba(193,127,62,.1); color: var(--am); font-size: 10px; }

  .player-body { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
  .video-zone {
    background: #140f08;
    flex-shrink: 0;
    position: relative;
    aspect-ratio: 16 / 9;
    max-height: 56vh;
    display: flex; align-items: center; justify-content: center;
  }
  .vid-geo {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    opacity: .04;
  }
  .play-circle {
    width: 60px; height: 60px; border-radius: 50%;
    background: rgba(193,127,62,.85);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative; z-index: 2;
    transition: transform .15s;
  }
  .play-circle:hover { transform: scale(1.06); }
  .play-tri { width: 0; height: 0; border-left: 20px solid #fff; border-top: 12px solid transparent; border-bottom: 12px solid transparent; margin-left: 5px; }
  .vid-info { position: absolute; top: 14px; left: 16px; z-index: 2; }
  .vi-lesson { font-size: 10px; color: rgba(247,241,232,.5); margin-bottom: 3px; }
  .vi-title { font-size: 13px; color: rgba(247,241,232,.9); font-weight: 500; }
  .vid-controls {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(transparent, rgba(20,15,8,.85));
    padding: 20px 16px 12px;
    display: flex; align-items: center; gap: 10px; z-index: 2;
  }
  .vc-ico { font-size: 13px; color: rgba(247,241,232,.6); cursor: pointer; line-height: 1; }
  .vc-timeline { flex: 1; height: 3px; background: rgba(255,255,255,.15); border-radius: 2px; cursor: pointer; position: relative; }
  .vc-played { width: 38%; height: 100%; background: var(--am); border-radius: 2px; }
  .vc-time { font-size: 11px; color: rgba(247,241,232,.5); white-space: nowrap; }
  .vc-speed { font-size: 10px; color: rgba(247,241,232,.6); border: 1px solid rgba(247,241,232,.2); border-radius: 4px; padding: 2px 6px; cursor: pointer; }
  .vc-cc { font-size: 11px; font-weight: 500; color: rgba(247,241,232,.6); cursor: pointer; letter-spacing: .02em; }

  .player-bottom { display: flex; flex-direction: column; flex: 1; overflow: hidden; }
  .ptabs { display: flex; padding: 0 20px; border-bottom: 1px solid var(--cr2); }
  .ptab { padding: 10px 16px; font-size: 12px; cursor: pointer; color: var(--tx3); border-bottom: 2px solid transparent; transition: all .15s; }
  .ptab.on { color: var(--am); border-bottom-color: var(--am); font-weight: 500; }
  .ptab:hover:not(.on) { color: var(--tx2); }
  .pane { display: none; padding: 18px 20px; overflow-y: auto; flex: 1; }
  .pane.on { display: block; }

  .notes-field {
    width: 100%; min-height: 80px; border: 1px solid var(--cr2); border-radius: 8px;
    padding: 12px 14px; font-size: 13px; color: var(--tx); font-family: var(--sans);
    line-height: 1.7; resize: none; background: var(--cr); outline: none;
  }
  .notes-field:focus { border-color: var(--am); background: #fff; }
  .note-hint { font-size: 11px; color: var(--tx3); margin-top: 8px; }

  .vocab-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
  .vchip {
    display: flex; align-items: center; gap: 6px;
    background: var(--cr); border: 1px solid var(--cr2); border-radius: 7px;
    padding: 6px 11px; cursor: pointer; transition: border-color .15s;
  }
  .vchip:hover { border-color: var(--am); }
  .vchip-so { font-size: 13px; font-weight: 500; color: var(--br); }
  .vchip-en { font-size: 12px; color: var(--tx3); }
  .vchip-plus { font-size: 13px; color: var(--tx3); }
  .vocab-add { margin-top: 14px; }

  .res-list { display: flex; flex-direction: column; gap: 2px; }
  .res-row {
    display: flex; align-items: center; gap: 12px; padding: 10px 12px;
    border-radius: 8px; cursor: pointer; transition: background .1s;
  }
  .res-row:hover { background: var(--cr); }
  .res-ic { width: 32px; height: 32px; background: var(--cr); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; border: 1px solid var(--cr2); }
  .res-name { font-size: 13px; font-weight: 500; color: var(--tx); }
  .res-sub { font-size: 11px; color: var(--tx3); }
  .res-dl { margin-left: auto; font-size: 12px; color: var(--am); }

  .player-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 20px; border-top: 1px solid var(--cr2); background: var(--wh); flex-shrink: 0;
  }
  .pf-nav { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--tx3); cursor: pointer; padding: 7px 0; }
  .pf-nav:hover { color: var(--am); }
  .mark-btn {
    background: var(--br); color: var(--cr); border: none; border-radius: 7px;
    padding: 9px 22px; font-size: 13px; cursor: pointer; font-family: var(--sans); font-weight: 500;
  }
</style>
</head>
<body>
<div class="chrome-wrap">
  <div class="chrome-label">House of Soyaal — Design Preview</div>
  <div class="browser-shell">

    <div class="browser-bar">
      <div class="dots">
        <div class="dot" style="background:#ED6A5A"></div>
        <div class="dot" style="background:#F4BE4F"></div>
        <div class="dot" style="background:#61C554"></div>
      </div>
      <div class="url">houseofsoyaal.com</div>
      <div class="view-tabs">
        <div class="vtab active" onclick="show('landing',this)">Landing</div>
        <div class="vtab" onclick="show('dashboard',this)">Dashboard</div>
        <div class="vtab" onclick="show('player',this)">Player</div>
        <div class="vtab" onclick="show('catalogue',this)">Courses</div>
        <div class="vtab" onclick="show('vocab',this)">Vocab</div>
        <div class="vtab" onclick="show('flashcards',this)">Flashcards</div>
        <div class="vtab" onclick="show('events',this)">Events</div>
        <div class="vtab" onclick="show('resources',this)">Resources</div>
      </div>
    </div>

    <!-- ════ LANDING ════ -->
    <div class="view active" id="v-landing">
      <div class="announce-bar">New workshop — Lorem Ipsum Workshop · <span>19 April, London</span> · <span style="text-decoration:underline;cursor:pointer">Book now →</span></div>
      <nav class="site-nav">
        <div class="logo">
          <div class="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polygon points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6" fill="#F7F1E8" opacity=".92"/>
            </svg>
          </div>
          <div>
            <div class="logo-name">House of Soyaal</div>
          </div>
        </div>
        <div class="nav-links">
          <span class="nl">Courses</span>
          <span class="nl">Archive</span>
          <span class="nl">Events</span>
          <span class="nl">Resources</span>
          <span class="nl">About</span>
        </div>
        <div class="nav-actions">
          <button class="btn-ghost">Sign in</button>
          <button class="btn-solid">Get started</button>
        </div>
      </nav>

      <div class="hero">
        <svg class="hero-pattern" viewBox="0 0 400 400" fill="none">
          <polygon points="200,20 240,110 340,120 270,190 295,290 200,240 105,290 130,190 60,120 160,110" stroke="#C17F3E" stroke-width="2"/>
          <polygon points="200,50 234,127 320,135 255,195 276,280 200,232 124,280 145,195 80,135 166,127" stroke="#3D2E20" stroke-width="1" opacity=".5"/>
          <circle cx="200" cy="200" r="170" stroke="#3D2E20" stroke-width="1" opacity=".3"/>
          <circle cx="200" cy="200" r="120" stroke="#3D2E20" stroke-width="0.5" opacity=".2"/>
          <circle cx="200" cy="200" r="60" stroke="#C17F3E" stroke-width="1" opacity=".3"/>
          <line x1="200" y1="30" x2="200" y2="370" stroke="#3D2E20" stroke-width="0.5" opacity=".15"/>
          <line x1="30" y1="200" x2="370" y2="200" stroke="#3D2E20" stroke-width="0.5" opacity=".15"/>
        </svg>

        <div class="hero-left">
          <div class="hero-eyebrow">Learning Platform</div>
          <h1 class="hero-h1">[Main Headline]<br><em>[Subheadline]</em></h1>
          <p class="hero-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
          <div class="hero-ctas">
            <button class="btn-solid" style="padding:12px 28px;font-size:14px">Start learning free</button>
            <button class="btn-ghost" style="padding:12px 22px;font-size:14px">Browse courses</button>
          </div>
        </div>

        <div class="hero-right">
          <div class="stat-strip">
            <div class="stat-item"><div class="stat-n">40+</div><div class="stat-l">Courses</div></div>
            <div class="stat-item"><div class="stat-n">300+</div><div class="stat-l">Lessons</div></div>
            <div class="stat-item"><div class="stat-n">1,200+</div><div class="stat-l">Resources</div></div>
          </div>
          <div class="poem-preview">
            <div class="pp-label">From the archive</div>
            <div class="pp-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br>sed do eiusmod tempor incididunt ut labore..."</div>
            <div class="pp-author">— [Author Name]</div>
          </div>
        </div>
      </div>

      <div class="section" style="background:var(--cr);border-top:1px solid var(--cr2)">
        <div class="section-hd">
          <div class="section-ttl">Featured courses</div>
          <div class="section-more">View all 40+ courses →</div>
        </div>
        <div class="courses-grid">
          <div class="c-card">
            <div class="c-thumb bg1">
              <svg class="thumb-geo" width="48" height="48" viewBox="0 0 48 48" fill="none"><polygon points="24,4 28,16 40,16 31,23 34,36 24,29 14,36 17,23 8,16 20,16" stroke="#F7F1E8" stroke-width="1"/></svg>
              <span class="level-tag lt-beg">Beginner</span>
            </div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder One</div>
              <div class="c-meta"><span class="free-tag">Free</span> 12 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg2">
              <svg class="thumb-geo" width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="12" y="12" width="24" height="24" rx="2" stroke="#E2F3EE" stroke-width="1" transform="rotate(45 24 24)"/></svg>
              <span class="level-tag lt-int">Intermediate</span>
            </div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Two</div>
              <div class="c-meta">18 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg3">
              <svg class="thumb-geo" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke="#EDB87A" stroke-width="1"/><circle cx="24" cy="24" r="10" stroke="#EDB87A" stroke-width="0.6"/></svg>
              <span class="level-tag lt-beg">Beginner</span>
            </div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Three</div>
              <div class="c-meta"><span class="free-tag">Free</span> 8 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg4">
              <svg class="thumb-geo" width="48" height="48" viewBox="0 0 48 48" fill="none"><polygon points="24,6 28,18 40,18 30,26 34,38 24,30 14,38 18,26 8,18 20,18" stroke="rgba(200,190,255,0.5)" stroke-width="1"/></svg>
              <span class="level-tag lt-adv">Advanced</span>
            </div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Four</div>
              <div class="c-meta">24 lessons</div>
            </div>
          </div>
        </div>
      </div>

      <div class="feature-strip">
        <div class="feat">
          <div class="feat-icon">◈</div>
          <div class="feat-title">Structured Learning</div>
          <div class="feat-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</div>
        </div>
        <div class="feat">
          <div class="feat-icon">✦</div>
          <div class="feat-title">Vocab & Flashcards</div>
          <div class="feat-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim.</div>
        </div>
        <div class="feat">
          <div class="feat-icon">◻</div>
          <div class="feat-title">Resource Archive</div>
          <div class="feat-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nostrud exercitation.</div>
        </div>
        <div class="feat">
          <div class="feat-icon">◯</div>
          <div class="feat-title">Live Events</div>
          <div class="feat-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor.</div>
        </div>
      </div>

      <div class="footer">
        <div>
          <div class="footer-logo">House of Soyaal</div>
          <div class="footer-sub">Lorem ipsum dolor sit amet</div>
        </div>
        <div class="footer-links">
          <span class="footer-l">Courses</span>
          <span class="footer-l">Archive</span>
          <span class="footer-l">Events</span>
          <span class="footer-l">About</span>
        </div>
      </div>
    </div>

    <!-- ════ DASHBOARD ════ -->
    <div class="view" id="v-dashboard">
      <nav class="site-nav">
        <div class="logo">
          <div class="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6" fill="#F7F1E8" opacity=".92"/></svg>
          </div>
          <div>
            <div class="logo-name">House of Soyaal</div>
          </div>
        </div>
        <div style="font-size:13px;color:var(--tx2)">John Doe</div>
      </nav>
      <div class="portal-layout">
        <div class="sidebar">
          <div class="sb-ico on"><span class="ico">⌂</span></div>
          <div class="sb-ico"><span class="ico">▶</span></div>
          <div class="sb-ico"><span class="ico">★</span></div>
          <div class="sb-ico"><span class="ico">◈</span></div>
          <div class="sb-ico"><span class="ico">◯</span></div>
          <div class="sb-spacer"></div>
          <div class="sb-ico"><span class="ico">⊙</span></div>
        </div>
        <div class="dash-main">
          <div class="dash-top">
            <div class="dash-greeting">Welcome back, John</div>
            <div class="dash-date">Sunday, 12 April 2026</div>
          </div>
          <div class="kpis">
            <div class="kpi"><div class="kpi-n">4</div><div class="kpi-l">Courses enrolled</div></div>
            <div class="kpi"><div class="kpi-n">23</div><div class="kpi-l">Lessons done</div></div>
            <div class="kpi"><div class="kpi-n">148</div><div class="kpi-l">Vocab saved</div></div>
            <div class="kpi"><div class="kpi-n">7</div><div class="kpi-l">Day streak</div></div>
          </div>
          <div class="continue-card">
            <div class="cc-left">
              <div class="cc-ey">Continue where you left off</div>
              <div class="cc-title">Course Name · Module 2, Lesson 4 — Lorem Ipsum</div>
              <div class="prog-track"><div class="prog-fill" style="width:42%"></div></div>
              <div class="cc-meta">42% complete · Lesson 4 of 18</div>
            </div>
            <button class="cc-btn">Resume lesson →</button>
          </div>
          <div class="dash-grid">
            <div class="panel">
              <div class="panel-title">My courses</div>
              <div class="course-row">
                <div class="cr-swatch" style="background:var(--br)"></div>
                <div class="cr-info">
                  <div class="cr-name">Course Title One — Lorem Ipsum</div>
                  <div class="cr-pct">42% complete</div>
                  <div class="mini-bar"><div class="mini-fill" style="width:42%"></div></div>
                </div>
              </div>
              <div class="course-row">
                <div class="cr-swatch" style="background:var(--gn)"></div>
                <div class="cr-info">
                  <div class="cr-name">Course Title Two — Dolor Sit</div>
                  <div class="cr-pct">78% complete</div>
                  <div class="mini-bar"><div class="mini-fill" style="width:78%"></div></div>
                </div>
              </div>
              <div class="course-row">
                <div class="cr-swatch" style="background:var(--am)"></div>
                <div class="cr-info">
                  <div class="cr-name">Course Title Three — Amet Consectetur</div>
                  <div class="cr-pct">15% complete</div>
                  <div class="mini-bar"><div class="mini-fill" style="width:15%"></div></div>
                </div>
              </div>
              <div class="flash-nudge">
                <span class="fn-text"><span class="fn-num">16</span> flashcards due today</span>
                <button class="fn-btn">Review now →</button>
              </div>
            </div>
            <div class="panel">
              <div class="panel-title">Upcoming events</div>
              <div class="event-item">
                <div class="ev-cal"><div class="ev-day">19</div><div class="ev-mon">Apr</div></div>
                <div>
                  <div class="ev-name">Workshop Title One</div>
                  <div class="ev-detail">Online · Zoom · 6:00 PM BST</div>
                  <div class="ev-tag ev-paid">£12</div>
                </div>
              </div>
              <div class="event-item">
                <div class="ev-cal"><div class="ev-day">3</div><div class="ev-mon">May</div></div>
                <div>
                  <div class="ev-name">Workshop Title Two</div>
                  <div class="ev-detail">London, Hackney · 2:00 PM</div>
                  <div class="ev-tag ev-paid">£25</div>
                </div>
              </div>
              <div class="event-item">
                <div class="ev-cal"><div class="ev-day">14</div><div class="ev-mon">Jun</div></div>
                <div>
                  <div class="ev-name">Open House — Community Event</div>
                  <div class="ev-detail">Online · 3:00 PM BST</div>
                  <div class="ev-tag ev-free">Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ COURSE PLAYER ════ -->
    <div class="view" id="v-player">
      <nav class="site-nav">
        <div class="logo">
          <div class="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6" fill="#F7F1E8" opacity=".92"/></svg>
          </div>
          <div>
            <div class="logo-name">House of Soyaal</div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--tx3);cursor:pointer">← Back to courses</div>
      </nav>
      <div class="player-layout">
        <div class="lesson-list">
          <div class="ll-head">
            <div class="ll-course">Course Name</div>
            <div class="ll-title">Module Title Placeholder</div>
            <div class="ll-prog-bar"><div class="ll-prog-fill" style="width:42%"></div></div>
            <div class="ll-pct">42% complete · 7 of 18 lessons</div>
          </div>
          <div class="ll-body">
            <div class="mod-label">Module 1 — Introduction</div>
            <div class="lesson-li done"><div class="li-ic done">✓</div>Lorem ipsum dolor</div>
            <div class="lesson-li done"><div class="li-ic done">✓</div>Consectetur adipiscing</div>
            <div class="lesson-li done"><div class="li-ic done">✓</div>Sed do eiusmod</div>
            <div class="mod-label">Module 2 — Core Concepts</div>
            <div class="lesson-li done"><div class="li-ic done">✓</div>Tempor incididunt</div>
            <div class="lesson-li current"><div class="li-ic cur">▶</div>Ut labore et dolore</div>
            <div class="lesson-li"><div class="li-ic"></div>Magna aliqua enim</div>
            <div class="lesson-li"><div class="li-ic"></div>Minim veniam quis</div>
            <div class="mod-label">Module 3 — Advanced</div>
            <div class="lesson-li"><div class="li-ic"></div>Nostrud exercitation</div>
            <div class="lesson-li"><div class="li-ic"></div>Ullamco laboris nisi</div>
            <div class="lesson-li"><div class="li-ic"></div>Aliquip ex ea commodo</div>
          </div>
        </div>

        <div class="player-body">
          <div class="video-zone">
            <div class="vid-geo">
              <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
                <polygon points="150,30 180,110 265,115 200,170 225,255 150,205 75,255 100,170 35,115 120,110" stroke="#C17F3E" stroke-width="1.5"/>
                <circle cx="150" cy="150" r="120" stroke="#3D2E20" stroke-width="1"/>
              </svg>
            </div>
            <div class="vid-info">
              <div class="vi-lesson">Module 2 · Lesson 4</div>
              <div class="vi-title">Lesson Title Placeholder</div>
            </div>
            <div class="play-circle"><div class="play-tri"></div></div>
            <div class="vid-controls">
              <span class="vc-ico">⏮</span>
              <span class="vc-ico">▶</span>
              <span class="vc-ico">⏭</span>
              <span class="vc-time">14:22</span>
              <div class="vc-timeline"><div class="vc-played"></div></div>
              <span class="vc-time">37:10</span>
              <span class="vc-speed">1×</span>
              <span class="vc-cc">CC</span>
              <span class="vc-ico">⛶</span>
            </div>
          </div>

          <div class="player-bottom">
            <div class="ptabs">
              <div class="ptab on" onclick="ptab('notes',this)">Notes</div>
              <div class="ptab" onclick="ptab('vocab',this)">Vocab (4 saved)</div>
              <div class="ptab" onclick="ptab('resources',this)">Resources</div>
            </div>
            <div class="pane on" id="pane-notes">
              <textarea class="notes-field" placeholder="Add your notes for this lesson...">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

★ Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</textarea>
              <div class="note-hint">Notes auto-save · Markdown supported</div>
            </div>
            <div class="pane" id="pane-vocab">
              <div style="font-size:12px;color:var(--tx3);margin-bottom:12px">Words saved from this lesson — click any to open in your Vocab Book</div>
              <div class="vocab-chips">
                <div class="vchip"><span class="vchip-so">Lorem</span><span class="vchip-en">definition one</span></div>
                <div class="vchip"><span class="vchip-so">Ipsum</span><span class="vchip-en">definition two</span></div>
                <div class="vchip"><span class="vchip-so">Dolor</span><span class="vchip-en">definition three</span></div>
                <div class="vchip"><span class="vchip-so">Amet</span><span class="vchip-en">definition four</span></div>
              </div>
              <div class="vocab-add">
                <button class="btn-ghost" style="font-size:12px;padding:7px 14px;margin-top:8px">+ Save a new word</button>
              </div>
            </div>
            <div class="pane" id="pane-resources">
              <div class="res-list">
                <div class="res-row">
                  <div class="res-ic">📄</div>
                  <div><div class="res-name">Lesson notes</div><div class="res-sub">PDF · 3 pages</div></div>
                  <span class="res-dl">↓ Download</span>
                </div>
                <div class="res-row">
                  <div class="res-ic">📋</div>
                  <div><div class="res-name">Vocabulary list</div><div class="res-sub">PDF · 12 terms</div></div>
                  <span class="res-dl">↓ Download</span>
                </div>
                <div class="res-row">
                  <div class="res-ic">📖</div>
                  <div><div class="res-name">Additional reading material</div><div class="res-sub">Annotatable PDF · Reading</div></div>
                  <span class="res-dl">Open →</span>
                </div>
              </div>
            </div>
            <div class="player-footer">
              <div class="pf-nav">← Previous lesson</div>
              <button class="mark-btn">Mark complete</button>
              <div class="pf-nav">Next lesson →</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ COURSE CATALOGUE ════ -->
    <div class="view" id="v-catalogue">
      <nav class="site-nav">
        <div class="logo">
          <div class="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6" fill="#F7F1E8" opacity=".92"/></svg>
          </div>
          <div class="logo-name">House of Soyaal</div>
        </div>
        <div class="nav-links">
          <span class="nl" style="color:var(--am);font-weight:500">Courses</span>
          <span class="nl">Archive</span>
          <span class="nl">Events</span>
          <span class="nl">Resources</span>
          <span class="nl">About</span>
        </div>
        <div class="nav-actions">
          <button class="btn-ghost">Sign in</button>
          <button class="btn-solid">Get started</button>
        </div>
      </nav>
      <div style="padding:32px 40px;background:var(--wh)">
        <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:28px">
          <div>
            <h1 style="font-family:var(--serif);font-size:32px;color:var(--br);margin-bottom:8px">Course Catalogue</h1>
            <p style="font-size:14px;color:var(--tx2)">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <input type="text" placeholder="Search courses..." style="border:1px solid var(--cr2);border-radius:7px;padding:9px 14px;font-size:13px;width:200px;outline:none;font-family:var(--sans)">
          </div>
        </div>
        
        <div style="display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:6px;background:var(--cr);padding:6px 12px;border-radius:6px;font-size:12px;color:var(--tx2)">
            <span style="font-weight:500">Level:</span>
            <span style="background:var(--br);color:var(--cr);padding:2px 8px;border-radius:4px;cursor:pointer">All</span>
            <span style="padding:2px 8px;cursor:pointer">Beginner</span>
            <span style="padding:2px 8px;cursor:pointer">Intermediate</span>
            <span style="padding:2px 8px;cursor:pointer">Advanced</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;background:var(--cr);padding:6px 12px;border-radius:6px;font-size:12px;color:var(--tx2)">
            <span style="font-weight:500">Theme:</span>
            <span style="background:var(--br);color:var(--cr);padding:2px 8px;border-radius:4px;cursor:pointer">All</span>
            <span style="padding:2px 8px;cursor:pointer">Grammar</span>
            <span style="padding:2px 8px;cursor:pointer">Poetry</span>
            <span style="padding:2px 8px;cursor:pointer">Culture</span>
            <span style="padding:2px 8px;cursor:pointer">Dialect</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;background:var(--cr);padding:6px 12px;border-radius:6px;font-size:12px;color:var(--tx2)">
            <span style="font-weight:500">Price:</span>
            <span style="background:var(--br);color:var(--cr);padding:2px 8px;border-radius:4px;cursor:pointer">All</span>
            <span style="padding:2px 8px;cursor:pointer">Free</span>
            <span style="padding:2px 8px;cursor:pointer">Paid</span>
          </div>
        </div>
        
        <div style="font-size:13px;color:var(--tx3);margin-bottom:18px">Showing 12 of 40+ courses</div>
        
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
          <div class="c-card">
            <div class="c-thumb bg1"><span class="level-tag lt-beg">Beginner</span></div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder One</div>
              <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Lorem ipsum dolor sit amet</div>
              <div class="c-meta"><span class="free-tag">Free</span> 12 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg2"><span class="level-tag lt-int">Intermediate</span></div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Two</div>
              <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Consectetur adipiscing elit</div>
              <div class="c-meta">18 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg3"><span class="level-tag lt-beg">Beginner</span></div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Three</div>
              <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Sed do eiusmod tempor</div>
              <div class="c-meta"><span class="free-tag">Free</span> 8 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg4"><span class="level-tag lt-adv">Advanced</span></div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Four</div>
              <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Incididunt ut labore</div>
              <div class="c-meta">24 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg2"><span class="level-tag lt-beg">Beginner</span></div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Five</div>
              <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Et dolore magna aliqua</div>
              <div class="c-meta"><span class="free-tag">Free</span> 6 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg1"><span class="level-tag lt-int">Intermediate</span></div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Six</div>
              <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Ut enim ad minim veniam</div>
              <div class="c-meta">15 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg3"><span class="level-tag lt-adv">Advanced</span></div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Seven</div>
              <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Quis nostrud exercitation</div>
              <div class="c-meta">20 lessons</div>
            </div>
          </div>
          <div class="c-card">
            <div class="c-thumb bg4"><span class="level-tag lt-beg">Beginner</span></div>
            <div class="c-body">
              <div class="c-title">Course Title Placeholder Eight</div>
              <div style="font-size:11px;color:var(--tx3);margin-bottom:6px">Ullamco laboris nisi</div>
              <div class="c-meta"><span class="free-tag">Free</span> 10 lessons</div>
            </div>
          </div>
        </div>
        
        <div style="display:flex;justify-content:center;gap:8px;margin-top:32px">
          <span style="padding:8px 14px;background:var(--br);color:var(--cr);border-radius:6px;font-size:13px;cursor:pointer">1</span>
          <span style="padding:8px 14px;background:var(--cr);border-radius:6px;font-size:13px;cursor:pointer">2</span>
          <span style="padding:8px 14px;background:var(--cr);border-radius:6px;font-size:13px;cursor:pointer">3</span>
          <span style="padding:8px 14px;background:var(--cr);border-radius:6px;font-size:13px;cursor:pointer">4</span>
          <span style="padding:8px 14px;background:var(--cr);border-radius:6px;font-size:13px;cursor:pointer">→</span>
        </div>
      </div>
    </div>

    <!-- ════ VOCAB BOOK ════ -->
    <div class="view" id="v-vocab">
      <nav class="site-nav">
        <div class="logo">
          <div class="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6" fill="#F7F1E8" opacity=".92"/></svg>
          </div>
          <div class="logo-name">House of Soyaal</div>
        </div>
        <div style="font-size:13px;color:var(--tx2)">John Doe</div>
      </nav>
      <div class="portal-layout">
        <div class="sidebar">
          <div class="sb-ico"><span class="ico">⌂</span></div>
          <div class="sb-ico"><span class="ico">▶</span></div>
          <div class="sb-ico on"><span class="ico">★</span></div>
          <div class="sb-ico"><span class="ico">◈</span></div>
          <div class="sb-ico"><span class="ico">◯</span></div>
          <div class="sb-spacer"></div>
          <div class="sb-ico"><span class="ico">⊙</span></div>
        </div>
        <div class="dash-main">
          <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:28px">
            <div>
              <h1 style="font-family:var(--serif);font-size:26px;color:var(--br);margin-bottom:6px">My Vocab Book</h1>
              <p style="font-size:13px;color:var(--tx3)">148 words saved</p>
            </div>
            <div style="display:flex;gap:10px">
              <input type="text" placeholder="Search words..." style="border:1px solid var(--cr2);border-radius:7px;padding:8px 14px;font-size:12px;width:180px;outline:none;font-family:var(--sans)">
              <button class="btn-solid" style="font-size:12px;padding:8px 14px">+ Add word</button>
              <button class="btn-ghost" style="font-size:12px;padding:8px 14px">Export PDF</button>
            </div>
          </div>
          
          <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap">
            <span style="background:var(--br);color:var(--cr);padding:5px 12px;border-radius:5px;font-size:11px;cursor:pointer">All words</span>
            <span style="background:var(--cr);padding:5px 12px;border-radius:5px;font-size:11px;cursor:pointer;color:var(--tx2)">Course One</span>
            <span style="background:var(--cr);padding:5px 12px;border-radius:5px;font-size:11px;cursor:pointer;color:var(--tx2)">Course Two</span>
            <span style="background:var(--cr);padding:5px 12px;border-radius:5px;font-size:11px;cursor:pointer;color:var(--tx2)">Poetry</span>
            <span style="background:var(--cr);padding:5px 12px;border-radius:5px;font-size:11px;cursor:pointer;color:var(--tx2)">Grammar</span>
          </div>
          
          <div style="display:flex;flex-direction:column;gap:10px">
            <div style="background:var(--cr);border-radius:10px;padding:16px 20px;cursor:pointer;border:1px solid var(--cr2)">
              <div style="display:flex;align-items:flex-start;justify-content:space-between">
                <div>
                  <div style="font-family:var(--serif);font-size:18px;color:var(--br);margin-bottom:4px">Lorem</div>
                  <div style="font-size:13px;color:var(--tx2);margin-bottom:8px">definition one — noun</div>
                  <div style="font-size:12px;color:var(--tx3);font-style:italic">"Lorem ipsum dolor sit amet consectetur."</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span style="font-size:16px;cursor:pointer" title="Play pronunciation">🔊</span>
                  <span style="background:var(--am);color:#fff;padding:3px 8px;border-radius:4px;font-size:10px">Course One</span>
                </div>
              </div>
            </div>
            <div style="background:var(--cr);border-radius:10px;padding:16px 20px;cursor:pointer;border:1px solid var(--cr2)">
              <div style="display:flex;align-items:flex-start;justify-content:space-between">
                <div>
                  <div style="font-family:var(--serif);font-size:18px;color:var(--br);margin-bottom:4px">Ipsum</div>
                  <div style="font-size:13px;color:var(--tx2);margin-bottom:8px">definition two — verb</div>
                  <div style="font-size:12px;color:var(--tx3);font-style:italic">"Ipsum dolor sit amet adipiscing."</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span style="font-size:16px;cursor:pointer">🔊</span>
                  <span style="background:var(--gn);color:#fff;padding:3px 8px;border-radius:4px;font-size:10px">Poetry</span>
                </div>
              </div>
            </div>
            <div style="background:var(--cr);border-radius:10px;padding:16px 20px;cursor:pointer;border:1px solid var(--cr2)">
              <div style="display:flex;align-items:flex-start;justify-content:space-between">
                <div>
                  <div style="font-family:var(--serif);font-size:18px;color:var(--br);margin-bottom:4px">Dolor</div>
                  <div style="font-size:13px;color:var(--tx2);margin-bottom:8px">definition three — adjective</div>
                  <div style="font-size:12px;color:var(--tx3);font-style:italic">"Dolor sit amet consectetur elit."</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span style="font-size:16px;cursor:pointer">🔊</span>
                  <span style="background:var(--br2);color:#fff;padding:3px 8px;border-radius:4px;font-size:10px">Grammar</span>
                </div>
              </div>
            </div>
            <div style="background:var(--cr);border-radius:10px;padding:16px 20px;cursor:pointer;border:1px solid var(--cr2)">
              <div style="display:flex;align-items:flex-start;justify-content:space-between">
                <div>
                  <div style="font-family:var(--serif);font-size:18px;color:var(--br);margin-bottom:4px">Amet</div>
                  <div style="font-size:13px;color:var(--tx2);margin-bottom:8px">definition four — noun</div>
                  <div style="font-size:12px;color:var(--tx3);font-style:italic">"Amet consectetur adipiscing elit sed."</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span style="font-size:16px;cursor:pointer">🔊</span>
                  <span style="background:var(--am);color:#fff;padding:3px 8px;border-radius:4px;font-size:10px">Course Two</span>
                </div>
              </div>
            </div>
            <div style="background:var(--cr);border-radius:10px;padding:16px 20px;cursor:pointer;border:1px solid var(--cr2)">
              <div style="display:flex;align-items:flex-start;justify-content:space-between">
                <div>
                  <div style="font-family:var(--serif);font-size:18px;color:var(--br);margin-bottom:4px">Consectetur</div>
                  <div style="font-size:13px;color:var(--tx2);margin-bottom:8px">definition five — verb</div>
                  <div style="font-size:12px;color:var(--tx3);font-style:italic">"Consectetur adipiscing elit tempor."</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center">
                  <span style="font-size:16px;cursor:pointer">🔊</span>
                  <span style="background:var(--gn);color:#fff;padding:3px 8px;border-radius:4px;font-size:10px">Poetry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ FLASHCARDS ════ -->
    <div class="view" id="v-flashcards">
      <nav class="site-nav">
        <div class="logo">
          <div class="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6" fill="#F7F1E8" opacity=".92"/></svg>
          </div>
          <div class="logo-name">House of Soyaal</div>
        </div>
        <div style="font-size:13px;color:var(--tx2)">John Doe</div>
      </nav>
      <div class="portal-layout">
        <div class="sidebar">
          <div class="sb-ico"><span class="ico">⌂</span></div>
          <div class="sb-ico"><span class="ico">▶</span></div>
          <div class="sb-ico"><span class="ico">★</span></div>
          <div class="sb-ico on"><span class="ico">◈</span></div>
          <div class="sb-ico"><span class="ico">◯</span></div>
          <div class="sb-spacer"></div>
          <div class="sb-ico"><span class="ico">⊙</span></div>
        </div>
        <div class="dash-main">
          <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:28px">
            <div>
              <h1 style="font-family:var(--serif);font-size:26px;color:var(--br);margin-bottom:6px">Flashcards</h1>
              <p style="font-size:13px;color:var(--tx3)">Spaced repetition review</p>
            </div>
            <button class="btn-solid" style="font-size:12px;padding:8px 14px">+ Create deck</button>
          </div>
          
          <div style="display:grid;grid-template-columns:1fr 1.3fr;gap:24px">
            <div>
              <div style="font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:14px">Today&apos;s review</div>
              <div style="background:var(--am);border-radius:12px;padding:24px;color:#fff;margin-bottom:20px">
                <div style="font-family:var(--serif);font-size:42px;margin-bottom:4px">16</div>
                <div style="font-size:13px;opacity:.85;margin-bottom:16px">cards due for review</div>
                <button style="background:#fff;color:var(--am);border:none;border-radius:8px;padding:10px 24px;font-size:13px;cursor:pointer;font-weight:500;font-family:var(--sans)">Start review →</button>
              </div>
              
              <div style="font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:14px">Stats</div>
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
                <div style="background:var(--cr);border-radius:8px;padding:14px;text-align:center">
                  <div style="font-family:var(--serif);font-size:24px;color:var(--br)">7</div>
                  <div style="font-size:11px;color:var(--tx3)">Day streak</div>
                </div>
                <div style="background:var(--cr);border-radius:8px;padding:14px;text-align:center">
                  <div style="font-family:var(--serif);font-size:24px;color:var(--br)">148</div>
                  <div style="font-size:11px;color:var(--tx3)">Cards learned</div>
                </div>
                <div style="background:var(--cr);border-radius:8px;padding:14px;text-align:center">
                  <div style="font-family:var(--serif);font-size:24px;color:var(--br)">86%</div>
                  <div style="font-size:11px;color:var(--tx3)">Accuracy</div>
                </div>
                <div style="background:var(--cr);border-radius:8px;padding:14px;text-align:center">
                  <div style="font-family:var(--serif);font-size:24px;color:var(--br)">4</div>
                  <div style="font-size:11px;color:var(--tx3)">Decks</div>
                </div>
              </div>
            </div>
            
            <div>
              <div style="font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--tx3);margin-bottom:14px">My decks</div>
              <div style="display:flex;flex-direction:column;gap:10px">
                <div style="background:var(--cr);border-radius:10px;padding:16px 18px;cursor:pointer;border:1px solid var(--cr2);display:flex;align-items:center;justify-content:space-between">
                  <div>
                    <div style="font-size:14px;font-weight:500;color:var(--tx);margin-bottom:4px">Course One Vocabulary</div>
                    <div style="font-size:12px;color:var(--tx3)">42 cards · 5 due today</div>
                  </div>
                  <button class="btn-ghost" style="font-size:11px;padding:6px 12px">Drill →</button>
                </div>
                <div style="background:var(--cr);border-radius:10px;padding:16px 18px;cursor:pointer;border:1px solid var(--cr2);display:flex;align-items:center;justify-content:space-between">
                  <div>
                    <div style="font-size:14px;font-weight:500;color:var(--tx);margin-bottom:4px">Poetry Terms</div>
                    <div style="font-size:12px;color:var(--tx3)">28 cards · 8 due today</div>
                  </div>
                  <button class="btn-ghost" style="font-size:11px;padding:6px 12px">Drill →</button>
                </div>
                <div style="background:var(--cr);border-radius:10px;padding:16px 18px;cursor:pointer;border:1px solid var(--cr2);display:flex;align-items:center;justify-content:space-between">
                  <div>
                    <div style="font-size:14px;font-weight:500;color:var(--tx);margin-bottom:4px">Grammar Essentials</div>
                    <div style="font-size:12px;color:var(--tx3)">56 cards · 3 due today</div>
                  </div>
                  <button class="btn-ghost" style="font-size:11px;padding:6px 12px">Drill →</button>
                </div>
                <div style="background:var(--cr);border-radius:10px;padding:16px 18px;cursor:pointer;border:1px solid var(--cr2);display:flex;align-items:center;justify-content:space-between">
                  <div>
                    <div style="font-size:14px;font-weight:500;color:var(--tx);margin-bottom:4px">Custom Deck</div>
                    <div style="font-size:12px;color:var(--tx3)">22 cards · 0 due today</div>
                  </div>
                  <button class="btn-ghost" style="font-size:11px;padding:6px 12px">Drill →</button>
                </div>
              </div>
              
              <div style="margin-top:24px;background:var(--br);border-radius:10px;padding:20px;display:flex;align-items:center;justify-content:center;flex-direction:column;min-height:140px">
                <div style="font-size:11px;color:var(--am3);margin-bottom:10px">Card preview</div>
                <div style="font-family:var(--serif);font-size:28px;color:var(--cr);margin-bottom:12px">Lorem</div>
                <div style="font-size:12px;color:rgba(247,241,232,.5)">Click to reveal definition</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ EVENTS ════ -->
    <div class="view" id="v-events">
      <nav class="site-nav">
        <div class="logo">
          <div class="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6" fill="#F7F1E8" opacity=".92"/></svg>
          </div>
          <div class="logo-name">House of Soyaal</div>
        </div>
        <div class="nav-links">
          <span class="nl">Courses</span>
          <span class="nl">Archive</span>
          <span class="nl" style="color:var(--am);font-weight:500">Events</span>
          <span class="nl">Resources</span>
          <span class="nl">About</span>
        </div>
        <div class="nav-actions">
          <button class="btn-ghost">Sign in</button>
          <button class="btn-solid">Get started</button>
        </div>
      </nav>
      <div style="padding:32px 40px;background:var(--wh)">
        <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:28px">
          <div>
            <h1 style="font-family:var(--serif);font-size:32px;color:var(--br);margin-bottom:8px">Events & Workshops</h1>
            <p style="font-size:14px;color:var(--tx2)">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
          <div style="display:flex;gap:8px">
            <span style="background:var(--br);color:var(--cr);padding:6px 14px;border-radius:6px;font-size:12px;cursor:pointer">Upcoming</span>
            <span style="background:var(--cr);padding:6px 14px;border-radius:6px;font-size:12px;cursor:pointer;color:var(--tx2)">Past events</span>
          </div>
        </div>
        
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
          <div style="border:1px solid var(--cr2);border-radius:12px;overflow:hidden;cursor:pointer">
            <div style="background:var(--br);padding:24px;position:relative">
              <div style="position:absolute;top:12px;right:12px;background:var(--am);color:#fff;padding:4px 10px;border-radius:5px;font-size:11px;font-weight:500">£12</div>
              <div style="font-size:11px;color:var(--am3);margin-bottom:6px">ONLINE WORKSHOP</div>
              <div style="font-family:var(--serif);font-size:18px;color:var(--cr);line-height:1.3">Workshop Title One</div>
            </div>
            <div style="padding:16px 18px">
              <div style="display:flex;gap:16px;font-size:12px;color:var(--tx2);margin-bottom:12px">
                <span>📅 19 Apr 2026</span>
                <span>⏰ 6:00 PM BST</span>
              </div>
              <div style="font-size:12px;color:var(--tx3);margin-bottom:14px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:11px;color:var(--tx3)">12 spots left</span>
                <button class="btn-solid" style="font-size:12px;padding:8px 16px">Book now</button>
              </div>
            </div>
          </div>
          
          <div style="border:1px solid var(--cr2);border-radius:12px;overflow:hidden;cursor:pointer">
            <div style="background:var(--gn);padding:24px;position:relative">
              <div style="position:absolute;top:12px;right:12px;background:var(--gn2);color:var(--gn);padding:4px 10px;border-radius:5px;font-size:11px;font-weight:500">Free</div>
              <div style="font-size:11px;color:rgba(255,255,255,.7);margin-bottom:6px">ONLINE SEMINAR</div>
              <div style="font-family:var(--serif);font-size:18px;color:#fff;line-height:1.3">Workshop Title Two</div>
            </div>
            <div style="padding:16px 18px">
              <div style="display:flex;gap:16px;font-size:12px;color:var(--tx2);margin-bottom:12px">
                <span>📅 26 Apr 2026</span>
                <span>⏰ 3:00 PM BST</span>
              </div>
              <div style="font-size:12px;color:var(--tx3);margin-bottom:14px">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:11px;color:var(--tx3)">Open enrollment</span>
                <button class="btn-solid" style="font-size:12px;padding:8px 16px">Register</button>
              </div>
            </div>
          </div>
          
          <div style="border:1px solid var(--cr2);border-radius:12px;overflow:hidden;cursor:pointer">
            <div style="background:#7A4A1E;padding:24px;position:relative">
              <div style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,.9);color:#7A4A1E;padding:4px 10px;border-radius:5px;font-size:11px;font-weight:500">£25</div>
              <div style="font-size:11px;color:rgba(255,255,255,.7);margin-bottom:6px">IN-PERSON · LONDON</div>
              <div style="font-family:var(--serif);font-size:18px;color:#fff;line-height:1.3">Workshop Title Three</div>
            </div>
            <div style="padding:16px 18px">
              <div style="display:flex;gap:16px;font-size:12px;color:var(--tx2);margin-bottom:12px">
                <span>📅 3 May 2026</span>
                <span>📍 Hackney, London</span>
              </div>
              <div style="font-size:12px;color:var(--tx3);margin-bottom:14px">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:11px;color:var(--am)">Only 4 spots left!</span>
                <button class="btn-solid" style="font-size:12px;padding:8px 16px">Book now</button>
              </div>
            </div>
          </div>
          
          <div style="border:1px solid var(--cr2);border-radius:12px;overflow:hidden;cursor:pointer">
            <div style="background:var(--br2);padding:24px;position:relative">
              <div style="position:absolute;top:12px;right:12px;background:var(--gn2);color:var(--gn);padding:4px 10px;border-radius:5px;font-size:11px;font-weight:500">Free</div>
              <div style="font-size:11px;color:rgba(255,255,255,.7);margin-bottom:6px">COMMUNITY EVENT</div>
              <div style="font-family:var(--serif);font-size:18px;color:#fff;line-height:1.3">Open House Event</div>
            </div>
            <div style="padding:16px 18px">
              <div style="display:flex;gap:16px;font-size:12px;color:var(--tx2);margin-bottom:12px">
                <span>📅 14 Jun 2026</span>
                <span>⏰ 3:00 PM BST</span>
              </div>
              <div style="font-size:12px;color:var(--tx3);margin-bottom:14px">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:11px;color:var(--tx3)">Online · Zoom</span>
                <button class="btn-solid" style="font-size:12px;padding:8px 16px">Register</button>
              </div>
            </div>
          </div>
          
          <div style="border:1px solid var(--cr2);border-radius:12px;overflow:hidden;cursor:pointer">
            <div style="background:#3A2A5C;padding:24px;position:relative">
              <div style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,.9);color:#3A2A5C;padding:4px 10px;border-radius:5px;font-size:11px;font-weight:500">£18</div>
              <div style="font-size:11px;color:rgba(255,255,255,.7);margin-bottom:6px">ONLINE WORKSHOP</div>
              <div style="font-family:var(--serif);font-size:18px;color:#fff;line-height:1.3">Advanced Workshop</div>
            </div>
            <div style="padding:16px 18px">
              <div style="display:flex;gap:16px;font-size:12px;color:var(--tx2);margin-bottom:12px">
                <span>📅 21 Jun 2026</span>
                <span>⏰ 5:00 PM BST</span>
              </div>
              <div style="font-size:12px;color:var(--tx3);margin-bottom:14px">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</div>
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:11px;color:var(--tx3)">20 spots left</span>
                <button class="btn-solid" style="font-size:12px;padding:8px 16px">Book now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ════ RESOURCES LIBRARY ════ -->
    <div class="view" id="v-resources">
      <nav class="site-nav">
        <div class="logo">
          <div class="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10,2 12.4,7.6 18.5,8.1 14,12.3 15.6,18.3 10,15.1 4.4,18.3 6,12.3 1.5,8.1 7.6,7.6" fill="#F7F1E8" opacity=".92"/></svg>
          </div>
          <div class="logo-name">House of Soyaal</div>
        </div>
        <div class="nav-links">
          <span class="nl">Courses</span>
          <span class="nl">Archive</span>
          <span class="nl">Events</span>
          <span class="nl" style="color:var(--am);font-weight:500">Resources</span>
          <span class="nl">About</span>
        </div>
        <div class="nav-actions">
          <button class="btn-ghost">Sign in</button>
          <button class="btn-solid">Get started</button>
        </div>
      </nav>
      <div style="padding:32px 40px;background:var(--wh)">
        <div style="margin-bottom:28px">
          <h1 style="font-family:var(--serif);font-size:32px;color:var(--br);margin-bottom:8px">Resources Library</h1>
          <p style="font-size:14px;color:var(--tx2)">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        
        <div style="display:flex;gap:8px;margin-bottom:28px">
          <span style="background:var(--br);color:var(--cr);padding:8px 18px;border-radius:7px;font-size:13px;cursor:pointer">Poetry Archive</span>
          <span style="background:var(--cr);padding:8px 18px;border-radius:7px;font-size:13px;cursor:pointer;color:var(--tx2)">YouTube Playlists</span>
          <span style="background:var(--cr);padding:8px 18px;border-radius:7px;font-size:13px;cursor:pointer;color:var(--tx2)">Reading List</span>
        </div>
        
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <div style="display:flex;gap:8px">
            <input type="text" placeholder="Search poems..." style="border:1px solid var(--cr2);border-radius:7px;padding:9px 14px;font-size:13px;width:220px;outline:none;font-family:var(--sans)">
            <select style="border:1px solid var(--cr2);border-radius:7px;padding:9px 14px;font-size:12px;outline:none;font-family:var(--sans);color:var(--tx2);background:var(--wh)">
              <option>All poets</option>
              <option>Poet One</option>
              <option>Poet Two</option>
            </select>
            <select style="border:1px solid var(--cr2);border-radius:7px;padding:9px 14px;font-size:12px;outline:none;font-family:var(--sans);color:var(--tx2);background:var(--wh)">
              <option>All themes</option>
              <option>Theme One</option>
              <option>Theme Two</option>
            </select>
          </div>
          <span style="font-size:13px;color:var(--tx3)">124 poems in archive</span>
        </div>
        
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
          <div style="background:var(--cr);border-radius:10px;padding:20px;cursor:pointer;border:1px solid var(--cr2)">
            <div style="font-size:10px;color:var(--am);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Poet Name One · 1970s</div>
            <div style="font-family:var(--serif);font-size:17px;color:var(--br);margin-bottom:10px;line-height:1.35">Lorem Ipsum Dolor</div>
            <div style="font-size:12px;color:var(--tx3);font-style:italic;line-height:1.6;margin-bottom:12px">"Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit..."</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Theme Tag</span>
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Form Tag</span>
              <span style="font-size:11px;color:var(--am);margin-left:auto">🔊 Audio</span>
            </div>
          </div>
          <div style="background:var(--cr);border-radius:10px;padding:20px;cursor:pointer;border:1px solid var(--cr2)">
            <div style="font-size:10px;color:var(--am);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Poet Name Two · 1980s</div>
            <div style="font-family:var(--serif);font-size:17px;color:var(--br);margin-bottom:10px;line-height:1.35">Amet Consectetur</div>
            <div style="font-size:12px;color:var(--tx3);font-style:italic;line-height:1.6;margin-bottom:12px">"Sed do eiusmod tempor,<br>incididunt ut labore..."</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Theme Tag</span>
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Era Tag</span>
            </div>
          </div>
          <div style="background:var(--cr);border-radius:10px;padding:20px;cursor:pointer;border:1px solid var(--cr2)">
            <div style="font-size:10px;color:var(--am);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Poet Name Three · 1960s</div>
            <div style="font-family:var(--serif);font-size:17px;color:var(--br);margin-bottom:10px;line-height:1.35">Adipiscing Elit</div>
            <div style="font-size:12px;color:var(--tx3);font-style:italic;line-height:1.6;margin-bottom:12px">"Ut enim ad minim veniam,<br>quis nostrud exercitation..."</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Theme Tag</span>
              <span style="font-size:11px;color:var(--am);margin-left:auto">🔊 Audio</span>
            </div>
          </div>
          <div style="background:var(--cr);border-radius:10px;padding:20px;cursor:pointer;border:1px solid var(--cr2)">
            <div style="font-size:10px;color:var(--am);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Poet Name Four · 1990s</div>
            <div style="font-family:var(--serif);font-size:17px;color:var(--br);margin-bottom:10px;line-height:1.35">Tempor Incididunt</div>
            <div style="font-size:12px;color:var(--tx3);font-style:italic;line-height:1.6;margin-bottom:12px">"Duis aute irure dolor,<br>in reprehenderit..."</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Form Tag</span>
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Era Tag</span>
            </div>
          </div>
          <div style="background:var(--cr);border-radius:10px;padding:20px;cursor:pointer;border:1px solid var(--cr2)">
            <div style="font-size:10px;color:var(--am);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Poet Name Five · 1970s</div>
            <div style="font-family:var(--serif);font-size:17px;color:var(--br);margin-bottom:10px;line-height:1.35">Magna Aliqua</div>
            <div style="font-size:12px;color:var(--tx3);font-style:italic;line-height:1.6;margin-bottom:12px">"Excepteur sint occaecat,<br>cupidatat non proident..."</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Theme Tag</span>
              <span style="font-size:11px;color:var(--am);margin-left:auto">🔊 Audio</span>
            </div>
          </div>
          <div style="background:var(--cr);border-radius:10px;padding:20px;cursor:pointer;border:1px solid var(--cr2)">
            <div style="font-size:10px;color:var(--am);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Poet Name Six · 2000s</div>
            <div style="font-family:var(--serif);font-size:17px;color:var(--br);margin-bottom:10px;line-height:1.35">Veniam Quis</div>
            <div style="font-size:12px;color:var(--tx3);font-style:italic;line-height:1.6;margin-bottom:12px">"Sunt in culpa qui officia,<br>deserunt mollit anim..."</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Theme Tag</span>
              <span style="background:var(--wh);padding:3px 8px;border-radius:4px;font-size:10px;color:var(--tx3)">Form Tag</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<script>
function show(id, el) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.vtab').forEach(t => t.classList.remove('active'));
  document.getElementById('v-' + id).classList.add('active');
  el.classList.add('active');
  const url = {
    landing:'houseofsoyaal.com',
    dashboard:'houseofsoyaal.com/dashboard',
    player:'houseofsoyaal.com/courses/course-name/lesson-4',
    catalogue:'houseofsoyaal.com/courses',
    vocab:'houseofsoyaal.com/vocab-book',
    flashcards:'houseofsoyaal.com/flashcards',
    events:'houseofsoyaal.com/events',
    resources:'houseofsoyaal.com/resources'
  };
  document.querySelector('.url').textContent = url[id];
}
function ptab(id, el) {
  document.querySelectorAll('.pane').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('on'));
  document.getElementById('pane-' + id).classList.add('on');
  el.classList.add('on');
}
</script>
</body>
</html>
        `,
      }}
    />
  )
}
