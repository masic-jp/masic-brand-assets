// MaSIC 名刺 — type-forward layouts at 364×220 (4× of 91×55mm)
// Rebalance pass: name 0.85x, org/contact 1.2x.

const CARD_W = 364;
const CARD_H = 220;
const BLEED = 12;

const C = {
  teal:   '#1E656D',
  navy:   '#152B3B',
  red:    '#C32F30',
  ink:    '#0D1117',
  paper:  '#FAFAF7',
  paperWarm: '#F4F1EA',
  muted:  '#6B7280',
};

// MaSIC logo — abstract SVG mark (icon only; wordmark is set in type per layout)
const MaSICLogo = ({ size = 48, style = {}, mono = false }) => {
  const T = mono ? '#FAFAF7' : '#1E656D';
  const R = mono ? '#FAFAF7' : '#C32F30';
  const N = mono ? '#FAFAF7' : '#152B3B';
  return (
    <svg viewBox="0 0 222 242" width={size} height={size * 242 / 222} style={{ display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd">
      <path d="M 0 0 L 0 131 L 116 131 Z" fill={T} />
      <path d="M 123 4 L 135 4 C 183.07 3.43, 219.49 45.89, 222 86 L 222 91 L 123 91 Z" fill={N} />
      <path d="M 123 98 L 137 98 C 184.80 100.24, 227.21 138.18, 222 185 C 218.63 214.14, 192.37 238.91, 160 242 L 123 242 Z" fill={N} />
      <path d="M 3 143 L 113 143 Q 116 143 116 146 C 116.31 183.55, 95.21 217.28, 59 235 C 21.56 218.17, -0.48 183.78, 0 146 Q 0 143 3 143 Z" fill={R} />
    </svg>
  );
};

// Personal-info defaults. Overridable at build time by `_rebuild.py --profile`,
// which prepends `window.__MaSIC_PROFILE = {...}` before this file is bundled.
const P = (() => {
  const defaults = {
    org_jp:  '一般社団法人',
    org_jp2: '数理社会実装教育研究センター',
    org_en_full: 'Mathematics for Social Implementation Center',
    org_en_short: 'Mathematics for Social\nImplementation Center',
    org_en_legal: 'General Incorporated Association',
    dept_jp: '役職',
    dept_en: 'Your Title',
    name_jp: 'お名前',
    name_en: 'Your Name',
    email:   'name@example.com',
    web:     'example.com',
  };
  const profile = (typeof window !== 'undefined' && window.__MaSIC_PROFILE) || {};
  return { ...defaults, ...profile };
})();

const Card = ({ children, bg = C.paper }) => (
  <div style={{
    width: CARD_W, height: CARD_H, background: bg,
    position: 'relative', overflow: 'hidden',
    boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 14px 28px -14px rgba(13,17,23,0.20), 0 0 0 1px rgba(13,17,23,0.06)',
    borderRadius: 2,
  }}>{children}</div>
);

// ─────────────────────────────────────────────────────
// V1 — Classic Mincho. Quiet authority; serifed grace.
// ─────────────────────────────────────────────────────
const V1Front = () => (
  <Card bg={C.paperWarm}>
    <div style={{ position: 'absolute', inset: 0, padding: '20px 22px', display: 'flex' }}>
      <div style={{ width: 64, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <MaSICLogo size={50} />
        <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 12, color: C.navy, opacity: 0.7, lineHeight: 1.2 }}>
          est.<br/>2026
        </div>
      </div>
      <div style={{ width: 1, background: C.navy, opacity: 0.25, margin: '4px 14px' }}></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Noto Serif JP, serif', fontWeight: 500, fontSize: 13, color: C.navy, letterSpacing: 1.2, lineHeight: 1.45 }}>
          一般社団法人<br/>数理社会実装教育研究センター
        </div>
        <div>
          <div style={{ fontFamily: 'Noto Serif JP, serif', fontWeight: 500, fontSize: 13, color: C.red, letterSpacing: 3, marginBottom: 6 }}>
            {P.dept_jp}
          </div>
          <div style={{ fontFamily: 'Noto Serif JP, serif', fontWeight: 500, fontSize: 32, color: C.ink, letterSpacing: 5, lineHeight: 1 }}>
            {P.name_jp}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, fontFamily: 'EB Garamond, serif', fontSize: 15, color: C.navy }}>
          <span>{P.email}</span>
          <span style={{ color: C.muted }}>·</span>
          <span>{P.web}</span>
        </div>
      </div>
    </div>
  </Card>
);

const V1Back = () => (
  <Card bg={C.navy}>
    <div style={{ position: 'absolute', inset: 0, padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: C.paperWarm }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <MaSICLogo size={38} mono />
        <div style={{ textAlign: 'right', fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 16, opacity: 0.8, lineHeight: 1.25 }}>
          Mathematics,<br/>as foundation for society.
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontSize: 11, opacity: 0.55, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 4 }}>
          {P.org_en_legal}
        </div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontWeight: 500, fontSize: 17, letterSpacing: 0.3, lineHeight: 1.3 }}>
          {P.org_en_full}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 13, opacity: 0.65, marginBottom: 4 }}>
            {P.dept_en}
          </div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontWeight: 500, fontSize: 26, lineHeight: 1 }}>
            {P.name_en}
          </div>
        </div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontSize: 14, opacity: 0.85, textAlign: 'right', lineHeight: 1.4 }}>
          <div>{P.email}</div>
          <div>{P.web}</div>
        </div>
      </div>
    </div>
  </Card>
);

// ─────────────────────────────────────────────────────
// V2 — Modern Geometric. Big tagline back, bold sans.
// ─────────────────────────────────────────────────────
const V2Front = () => (
  <Card bg={C.paper}>
    <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
      <div style={{ width: 110, background: C.paperWarm, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <MaSICLogo size={72} />
        <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 16, color: C.navy, letterSpacing: 4 }}>
          MaSIC
        </div>
      </div>
      <div style={{ flex: 1, padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Zen Kaku Gothic New, sans-serif', fontWeight: 500, fontSize: 12, color: C.muted, letterSpacing: 1, lineHeight: 1.4 }}>
            一般社団法人<br/>数理社会実装教育研究センター
          </div>
          <div style={{ width: 22, height: 2.5, background: C.red, marginTop: 8, marginBottom: 8 }}></div>
          <div style={{ fontFamily: 'Zen Kaku Gothic New, sans-serif', fontWeight: 700, fontSize: 13, color: C.teal, letterSpacing: 2 }}>
            {P.dept_jp}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'Zen Kaku Gothic New, sans-serif', fontWeight: 900, fontSize: 36, color: C.ink, letterSpacing: 2, lineHeight: 1 }}>
            {P.name_jp}
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: 16, color: C.muted, letterSpacing: 1, marginTop: 6 }}>
            {P.name_en}
          </div>
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15, color: C.navy, lineHeight: 1.5, fontWeight: 500 }}>
          <div><span style={{ color: C.muted, marginRight: 8, fontWeight: 700 }}>E</span>{P.email}</div>
          <div><span style={{ color: C.muted, marginRight: 8, fontWeight: 700 }}>W</span>{P.web}</div>
        </div>
      </div>
    </div>
  </Card>
);

const V2Back = () => (
  <Card bg={C.paper}>
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 38, color: C.navy, letterSpacing: -1, lineHeight: 1.0 }}>
          Mathematics,
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 38, color: C.navy, letterSpacing: -1, lineHeight: 1.0 }}>
          as foundation
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 38, color: C.red, letterSpacing: -1, lineHeight: 1.0 }}>
          for society.
        </div>
      </div>
      <div style={{ height: 64, background: C.navy, display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 13, color: C.paper, letterSpacing: 0.8, lineHeight: 1.3, whiteSpace: 'pre-line' }}>
            {P.org_en_short}
          </div>
        </div>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: C.paper, letterSpacing: 4 }}>
          MaSIC
        </div>
      </div>
    </div>
  </Card>
);

// ─────────────────────────────────────────────────────
// V3 — Editorial Mono. Lab-notebook discipline.
// ─────────────────────────────────────────────────────
const V3Front = () => (
  <Card bg={C.paper}>
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }}>
      <defs>
        <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={C.navy} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid3)"/>
    </svg>
    <div style={{ position: 'absolute', inset: 0, padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <MaSICLogo size={44} />
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.muted, letterSpacing: 1, textAlign: 'right', lineHeight: 1.5 }}>
          <div>NO.001 / 2026</div>
          <div>JP — TYO</div>
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.red, letterSpacing: 1.5, marginBottom: 8, fontWeight: 600 }}>
          → {P.dept_jp} / {P.dept_en.split(' ')[0].toUpperCase()}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <div style={{ fontFamily: 'IBM Plex Sans JP, sans-serif', fontWeight: 600, fontSize: 32, color: C.ink, letterSpacing: 4, lineHeight: 1 }}>
            {P.name_jp}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 500, fontSize: 16, color: C.muted }}>
            {P.name_en}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `1px solid ${C.navy}33`, paddingTop: 8 }}>
        <div style={{ fontFamily: 'IBM Plex Sans JP, sans-serif', fontWeight: 500, fontSize: 13, color: C.navy, letterSpacing: 0.5, lineHeight: 1.4 }}>
          <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2, marginBottom: 2, fontFamily: 'JetBrains Mono, monospace' }}>ORG</div>
          一般社団法人<br/>数理社会実装教育研究センター
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.navy, textAlign: 'right', lineHeight: 1.5, fontWeight: 500 }}>
          <div>{P.email}</div>
          <div>{P.web}</div>
        </div>
      </div>
    </div>
  </Card>
);

const V3Back = () => (
  <Card bg={C.ink}>
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
      <defs>
        <pattern id="grid3b" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={C.paper} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid3b)"/>
    </svg>
    <div style={{ position: 'absolute', inset: 0, padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: C.paper }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, opacity: 0.55, letterSpacing: 2 }}>
          MaSIC // 2026—
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={{ display: 'inline-block', width: 10, height: 10, background: C.teal }}></span>
          <span style={{ display: 'inline-block', width: 10, height: 10, background: C.red }}></span>
          <span style={{ display: 'inline-block', width: 10, height: 10, background: C.navy, border: `1px solid ${C.paper}` }}></span>
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 500, fontSize: 28, color: C.paper, letterSpacing: -0.5, lineHeight: 1.1 }}>
          Mathematics,
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 500, fontSize: 28, color: C.paper, letterSpacing: -0.5, lineHeight: 1.1 }}>
          as foundation
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 500, fontSize: 28, color: '#FF6B5C', letterSpacing: -0.5, lineHeight: 1.1 }}>
          for society._
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(250,250,247,0.18)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, opacity: 0.9, lineHeight: 1.4, fontWeight: 500, whiteSpace: 'pre-line' }}>
          {P.org_en_short}
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, opacity: 0.95, textAlign: 'right', fontWeight: 500 }}>
          {P.name_en}<br/>
          <span style={{ opacity: 0.6, fontSize: 10 }}>{P.dept_en}</span>
        </div>
      </div>
    </div>
  </Card>
);

// ─────────────────────────────────────────────────────
// V4 — Bold Display. Logo bleed, heavy display sans.
// ─────────────────────────────────────────────────────
const V4Front = () => (
  <Card bg={C.paper}>
    <div style={{ position: 'absolute', right: -90, top: -55, width: 280, height: 280 }}>
      <MaSICLogo size={280} />
    </div>
    <div style={{ position: 'absolute', inset: 0, padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: C.navy, letterSpacing: 4 }}>
          MaSIC
        </div>
        <div style={{ width: 26, height: 2.5, background: C.navy, marginTop: 6 }}></div>
      </div>
      <div>
        <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 700, fontSize: 12, color: C.teal, letterSpacing: 2.5, marginBottom: 8 }}>
          {P.dept_jp}
        </div>
        <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 900, fontSize: 40, color: C.ink, letterSpacing: 3, lineHeight: 1 }}>
          {P.name_jp}
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: C.muted, marginTop: 8 }}>
          {P.name_en}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 500, fontSize: 12, color: C.muted, letterSpacing: 1, lineHeight: 1.5, maxWidth: 180 }}>
          一般社団法人<br/>数理社会実装教育研究センター
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.navy, textAlign: 'right', lineHeight: 1.5, fontWeight: 600 }}>
          {P.email}<br/>{P.web}
        </div>
      </div>
    </div>
  </Card>
);

const V4Back = () => (
  <Card bg={C.red}>
    <div style={{ position: 'absolute', left: -70, bottom: -70, width: 240, height: 240, opacity: 0.18 }}>
      <MaSICLogo size={240} mono />
    </div>
    <div style={{ position: 'absolute', inset: 0, padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: C.paper }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, letterSpacing: 4 }}>MaSIC</div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: 2, opacity: 0.85, fontWeight: 600 }}>EST. 2026 / TOKYO</div>
      </div>
      <div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 40, lineHeight: 1.0, letterSpacing: -1.5 }}>
          Mathematics,
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 40, lineHeight: 1.0, letterSpacing: -1.5 }}>
          as foundation
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontStyle: 'italic', fontSize: 40, lineHeight: 1.0, letterSpacing: -1.5 }}>
          for society.
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}>
            {P.name_en}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, opacity: 0.92, letterSpacing: 0.5 }}>
            {P.dept_en}
          </div>
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, opacity: 0.95, textAlign: 'right', lineHeight: 1.5, fontWeight: 600, whiteSpace: 'pre-line' }}>
          {P.org_en_short}
        </div>
      </div>
    </div>
  </Card>
);

// ─────────────────────────────────────────────────────
// V5 — Vertical Mincho × Mono. East–West juxtaposition.
// ─────────────────────────────────────────────────────
const V5Front = () => (
  <Card bg={C.paperWarm}>
    <div style={{ position: 'absolute', inset: 0, padding: '18px 24px', display: 'flex', justifyContent: 'space-between' }}>
      {/* 縦書き：右が古い列（先に読む）、左が新しい列。
          一般社団法人 → 数理社会実装教育研究 → センター → 役職 → 氏名 */}
      <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', gap: 10, height: '100%', paddingTop: 4, paddingBottom: 4 }}>
        <div style={{ writingMode: 'vertical-rl', fontFamily: 'Shippori Mincho, serif', fontWeight: 500, fontSize: 12, color: C.muted, letterSpacing: 2, lineHeight: 1 }}>
          一般社団法人
        </div>
        <div style={{ writingMode: 'vertical-rl', fontFamily: 'Shippori Mincho, serif', fontWeight: 500, fontSize: 12, color: C.navy, letterSpacing: 2, lineHeight: 1 }}>
          数理社会実装教育研究
        </div>
        <div style={{ writingMode: 'vertical-rl', fontFamily: 'Shippori Mincho, serif', fontWeight: 500, fontSize: 12, color: C.navy, letterSpacing: 2, lineHeight: 1, marginTop: 24 }}>
          センター
        </div>
        <div style={{ writingMode: 'vertical-rl', fontFamily: 'Shippori Mincho, serif', fontWeight: 500, fontSize: 11, color: C.red, letterSpacing: 4, lineHeight: 1, marginTop: 36 }}>
          {P.dept_jp}
        </div>
        <div style={{ writingMode: 'vertical-rl', fontFamily: 'Shippori Mincho, serif', fontWeight: 600, fontSize: 24, color: C.ink, letterSpacing: 8, lineHeight: 1 }}>
          {P.name_jp}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <MaSICLogo size={56} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 16, color: C.navy, letterSpacing: 0.5, lineHeight: 1 }}>
            {P.name_en}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 500, fontSize: 10, color: C.muted, letterSpacing: 1.5, marginTop: 4 }}>
            {P.dept_en.toUpperCase()}
          </div>
          <div style={{ width: 32, height: 1, background: C.navy, opacity: 0.4, marginTop: 10, marginBottom: 10, marginLeft: 'auto' }}></div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.navy, lineHeight: 1.5, fontWeight: 500 }}>
            <div>{P.email}</div>
            <div>{P.web}</div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const V5Back = () => (
  <Card bg={C.paperWarm}>
    <div style={{ position: 'absolute', inset: 0, padding: '16px 24px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <MaSICLogo size={44} />
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.muted, letterSpacing: 2 }}>
          // EN—FACE
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'Shippori Mincho, serif', fontWeight: 500, fontSize: 24, color: C.navy, lineHeight: 1.2 }}>
          Mathematics,
        </div>
        <div style={{ fontFamily: 'Shippori Mincho, serif', fontWeight: 500, fontSize: 24, color: C.navy, lineHeight: 1.2 }}>
          as foundation for
        </div>
        <div style={{ fontFamily: 'Shippori Mincho, serif', fontWeight: 500, fontStyle: 'italic', fontSize: 24, color: C.red, lineHeight: 1.2 }}>
          society.
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 15, color: C.ink, lineHeight: 1 }}>
            {P.name_en}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.muted, letterSpacing: 1.5, marginTop: 4 }}>
            {P.dept_en.toUpperCase()}
          </div>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.navy, textAlign: 'right', lineHeight: 1.4, fontWeight: 500, letterSpacing: 0.2 }}>
          {P.org_en_short.split('\n')[0]}<br/>
          <span style={{ color: C.muted }}>{P.org_en_short.split('\n')[1] ?? ''}</span>
        </div>
      </div>
    </div>
  </Card>
);

Object.assign(window, {
  MaSIC_C: C, MaSIC_P: P, CARD_W, CARD_H, BLEED, MaSICLogo,
  V1Front, V1Back, V2Front, V2Back, V3Front, V3Back, V4Front, V4Back, V5Front, V5Back,
  MaSICCard: Card,
});
