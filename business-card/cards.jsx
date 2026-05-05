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

// MaSIC wordmark — icon + "MaSIC" set in type. Sync with logo/masic-logo.svg.
const MaSICWordmark = ({ width = 120, style = {}, mono = false }) => {
  const T = mono ? '#FAFAF7' : '#1E656D';
  const N = mono ? '#FAFAF7' : '#152B3B';
  const R = mono ? '#FAFAF7' : '#C32F30';
  const TXT = mono ? '#FAFAF7' : '#0d0d0d';
  return (
    <svg viewBox="0 0 540 375" width={width} height={width * 375 / 540} style={{ display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg" fillRule="evenodd">
      <g transform="translate(159 0)">
        <path fill={T} d="M 0 0 L 0 131 L 116 131 Z" />
        <path fill={N} d="M 123 4 L 135 4 C 183.07 3.43, 219.49 45.89, 222 86 L 222 91 L 123 91 Z" />
        <path fill={N} d="M 123 98 L 137 98 C 184.80 100.24, 227.21 138.18, 222 185 C 218.63 214.14, 192.37 238.91, 160 242 L 123 242 Z" />
        <path fill={R} d="M 3 143 L 113 143 Q 116 143 116 146 C 116.31 183.55, 95.21 217.28, 59 235 C 21.56 218.17, -0.48 183.78, 0 146 Q 0 143 3 143 Z" />
      </g>
      <path fill={TXT} transform="translate(66.10 239.78)" d="M8.96 128.00L8.96 35.84L24.58 35.84L55.04 97.02L85.50 35.84L101.12 35.84L101.12 128.00L84.86 128.00L84.86 72.96L58.11 128.00L51.97 128.00L25.22 72.96L25.22 128.00ZM138.24 129.92Q130.82 129.92 125.66 127.07Q120.51 124.22 117.86 119.46Q115.20 114.69 115.20 108.93Q115.20 104.13 116.67 100.16Q118.14 96.19 121.44 93.15Q124.74 90.11 130.30 88.06Q134.14 86.66 139.46 85.57Q144.77 84.48 151.49 83.46Q155.46 82.88 159.87 82.24Q159.36 77.95 157.06 75.71Q154.11 72.83 147.20 72.83Q143.36 72.83 139.20 74.69Q135.04 76.54 133.38 81.28L117.63 76.29Q120.26 67.71 127.49 62.34Q134.72 56.96 147.20 56.96Q156.35 56.96 163.46 59.78Q170.56 62.59 174.21 69.50Q176.26 73.34 176.64 77.18Q177.02 81.02 177.02 85.76L177.02 128.00L161.79 128.00L161.79 119.49Q157.70 124.35 153.09 126.78Q147.20 129.92 138.24 129.92ZM141.95 116.22Q146.75 116.22 150.05 114.53Q153.34 112.83 155.30 110.66Q157.25 108.48 157.95 107.01Q159.30 104.19 159.55 100.42Q159.68 98.18 159.68 96.32Q155.39 97.09 152.32 97.60Q147.52 98.50 144.58 99.20Q141.63 99.90 139.39 100.74Q136.83 101.76 135.26 102.94Q133.70 104.13 132.96 105.54Q132.22 106.94 132.22 108.67Q132.22 111.04 133.41 112.74Q134.59 114.43 136.77 115.33Q138.94 116.22 141.95 116.22ZM228.48 129.92Q218.24 129.92 210.02 126.30Q201.79 122.69 196.51 115.94Q191.23 109.18 189.82 99.84L208.00 97.15Q209.92 105.09 215.94 109.38Q221.95 113.66 229.63 113.66Q233.92 113.66 237.95 112.32Q241.98 110.98 244.58 108.35Q247.17 105.73 247.17 101.89Q247.17 100.48 246.75 99.17Q246.34 97.86 245.38 96.70Q244.42 95.55 242.66 94.53Q240.90 93.50 238.21 92.67L214.27 85.63Q211.58 84.86 208.03 83.46Q204.48 82.05 201.15 79.42Q197.82 76.80 195.62 72.48Q193.41 68.16 193.41 61.57Q193.41 52.29 198.08 46.14Q202.75 40.00 210.56 36.99Q218.37 33.98 227.84 34.05Q237.38 34.18 244.86 37.31Q252.35 40.45 257.41 46.43Q262.46 52.42 264.70 61.06L245.89 64.26Q244.86 59.78 242.11 56.70Q239.36 53.63 235.55 52.03Q231.74 50.43 227.58 50.30Q223.49 50.18 219.87 51.42Q216.26 52.67 213.98 55.04Q211.71 57.41 211.71 60.67Q211.71 63.68 213.57 65.57Q215.42 67.46 218.24 68.61Q221.06 69.76 224.00 70.53L240.00 74.88Q243.58 75.84 247.94 77.41Q252.29 78.98 256.29 81.76Q260.29 84.54 262.88 89.09Q265.47 93.63 265.47 100.61Q265.47 108.03 262.37 113.57Q259.26 119.10 254.02 122.72Q248.77 126.34 242.14 128.13Q235.52 129.92 228.48 129.92ZM280.83 128.00L280.83 35.84L298.24 35.84L298.24 128.00ZM356.99 129.92Q343.17 129.92 333.15 123.90Q323.14 117.89 317.73 107.07Q312.32 96.26 312.32 81.92Q312.32 67.58 317.73 56.77Q323.14 45.95 333.15 39.94Q343.17 33.92 356.99 33.92Q372.86 33.92 383.65 41.79Q394.43 49.66 398.85 63.10L381.31 67.97Q378.75 59.58 372.67 54.94Q366.59 50.30 356.99 50.30Q348.22 50.30 342.37 54.21Q336.51 58.11 333.57 65.22Q330.62 72.32 330.62 81.92Q330.62 91.52 333.57 98.62Q336.51 105.73 342.37 109.63Q348.22 113.54 356.99 113.54Q366.59 113.54 372.67 108.86Q378.75 104.19 381.31 95.87L398.85 100.74Q394.43 114.18 383.65 122.05Q372.86 129.92 356.99 129.92Z" />
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
    degree_jp: '',
    degree_en: '',
    name_jp: 'お名前',
    name_en: 'Your Name',
    email:   'name@example.com',
    web:     'example.com',
  };
  const profile = (typeof window !== 'undefined' && window.__MaSIC_PROFILE) || {};
  return { ...defaults, ...profile };
})();

// Display URL — accept bare domain or full URL in P.web; always show with scheme.
const WEB_URL = /^https?:\/\//i.test(P.web) ? P.web : `https://${P.web}`;

// QR for https://masic.jp/ — generated offline (segno, version 2, error-correction M).
// 25×25 modules with a 4-module quiet zone baked into the viewBox.
const MASIC_JP_QR_PATH = 'M0 0h7v1h-7zM10 0h2v1h-2zM15 0h1v1h-1zM18 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM12 1h1v1h-1zM14 1h1v1h-1zM16 1h1v1h-1zM18 1h1v1h-1zM24 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h2v1h-2zM13 2h1v1h-1zM15 2h1v1h-1zM18 2h1v1h-1zM20 2h3v1h-3zM24 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM10 3h1v1h-1zM18 3h1v1h-1zM20 3h3v1h-3zM24 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM12 4h4v1h-4zM18 4h1v1h-1zM20 4h3v1h-3zM24 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM11 5h1v1h-1zM14 5h1v1h-1zM16 5h1v1h-1zM18 5h1v1h-1zM24 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h7v1h-7zM9 7h1v1h-1zM11 7h4v1h-4zM1 8h3v1h-3zM5 8h2v1h-2zM9 8h1v1h-1zM12 8h3v1h-3zM22 8h2v1h-2zM1 9h1v1h-1zM8 9h2v1h-2zM16 9h1v1h-1zM19 9h1v1h-1zM23 9h1v1h-1zM5 10h4v1h-4zM11 10h1v1h-1zM14 10h1v1h-1zM17 10h1v1h-1zM19 10h2v1h-2zM0 11h6v1h-6zM11 11h1v1h-1zM13 11h5v1h-5zM20 11h3v1h-3zM0 12h2v1h-2zM4 12h4v1h-4zM11 12h1v1h-1zM17 12h2v1h-2zM20 12h1v1h-1zM22 12h3v1h-3zM4 13h1v1h-1zM7 13h1v1h-1zM9 13h1v1h-1zM11 13h3v1h-3zM15 13h2v1h-2zM18 13h3v1h-3zM24 13h1v1h-1zM1 14h3v1h-3zM5 14h2v1h-2zM8 14h1v1h-1zM14 14h1v1h-1zM16 14h1v1h-1zM20 14h1v1h-1zM22 14h2v1h-2zM0 15h1v1h-1zM2 15h2v1h-2zM8 15h1v1h-1zM10 15h1v1h-1zM13 15h1v1h-1zM16 15h2v1h-2zM19 15h2v1h-2zM24 15h1v1h-1zM3 16h4v1h-4zM9 16h1v1h-1zM11 16h2v1h-2zM15 16h10v1h-10zM8 17h4v1h-4zM13 17h1v1h-1zM16 17h1v1h-1zM20 17h1v1h-1zM22 17h1v1h-1zM24 17h1v1h-1zM0 18h7v1h-7zM9 18h1v1h-1zM11 18h2v1h-2zM14 18h1v1h-1zM16 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM22 18h3v1h-3zM0 19h1v1h-1zM6 19h1v1h-1zM8 19h7v1h-7zM16 19h1v1h-1zM20 19h1v1h-1zM0 20h1v1h-1zM2 20h3v1h-3zM6 20h1v1h-1zM9 20h1v1h-1zM12 20h3v1h-3zM16 20h6v1h-6zM0 21h1v1h-1zM2 21h3v1h-3zM6 21h1v1h-1zM8 21h1v1h-1zM12 21h2v1h-2zM16 21h3v1h-3zM20 21h5v1h-5zM0 22h1v1h-1zM2 22h3v1h-3zM6 22h1v1h-1zM8 22h2v1h-2zM11 22h4v1h-4zM17 22h2v1h-2zM20 22h1v1h-1zM22 22h2v1h-2zM0 23h1v1h-1zM6 23h1v1h-1zM8 23h1v1h-1zM10 23h1v1h-1zM12 23h1v1h-1zM18 23h1v1h-1zM20 23h1v1h-1zM22 23h1v1h-1zM0 24h7v1h-7zM11 24h2v1h-2zM14 24h1v1h-1zM17 24h8v1h-8z';

const MaSICQR = ({ size = 64, style = {}, color = '#0D1117', bg = '#FFFFFF' }) => (
  <svg viewBox="-4 -4 33 33" width={size} height={size} style={{ display: 'block', ...style }} shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
    <rect x="-4" y="-4" width="33" height="33" fill={bg} />
    <path d={MASIC_JP_QR_PATH} fill={color} />
  </svg>
);

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
        <MaSICWordmark width={60} />
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
          <div style={{ fontFamily: 'Noto Serif JP, serif', fontWeight: 500, fontSize: 13, color: C.ink, letterSpacing: 1, marginBottom: 6 }}>
            {P.dept_jp}{P.degree_jp && <span style={{ color: C.muted, marginLeft: 8, fontSize: 11, letterSpacing: 0.5 }}>{P.degree_jp}</span>}
          </div>
          <div style={{ fontFamily: 'Noto Serif JP, serif', fontWeight: 500, fontSize: 32, color: C.ink, letterSpacing: 0.5, lineHeight: 1 }}>
            {P.name_jp}
          </div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 13, color: C.muted, letterSpacing: 1, marginTop: 6 }}>
            {P.name_en}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, fontFamily: 'EB Garamond, serif', fontSize: 15, color: C.navy }}>
          <span>{P.email}</span>
          <span style={{ color: C.muted }}>·</span>
          <span>{WEB_URL}</span>
        </div>
      </div>
    </div>
  </Card>
);

const V1Back = () => (
  <Card bg={C.navy}>
    <div style={{ position: 'absolute', inset: 0, padding: '20px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: C.paperWarm }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <MaSICWordmark width={88} mono />
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
            {P.dept_en}{P.degree_en && `, ${P.degree_en}`}
          </div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontWeight: 500, fontSize: 26, lineHeight: 1 }}>
            {P.name_en}
          </div>
        </div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontSize: 14, opacity: 0.85, textAlign: 'right', lineHeight: 1.4 }}>
          <div>{P.email}</div>
          <div>{WEB_URL}</div>
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
        <MaSICWordmark width={84} />
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.muted, letterSpacing: 1, textAlign: 'right', lineHeight: 1.5 }}>
          <div>NO.001 / 2026</div>
          <div>JP — TYO</div>
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.ink, letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>
          → {P.dept_jp}{P.degree_jp && ` · ${P.degree_jp}`} / {P.dept_en.split(' ')[0].toUpperCase()}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <div style={{ fontFamily: 'IBM Plex Sans JP, sans-serif', fontWeight: 600, fontSize: 32, color: C.ink, letterSpacing: 0.5, lineHeight: 1 }}>
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
          <div>{WEB_URL}</div>
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

// ─────────────────────────────────────────────────────
// V6 — V1 表 + V4 表ふう見切れ背景の裏 with でかキャッチコピー
// ─────────────────────────────────────────────────────
const V6Front = V1Front;

const V6Back = () => (
  <Card bg={C.paperWarm}>
    <div style={{ position: 'absolute', right: -80, top: -40, opacity: 0.18 }}>
      <MaSICLogo size={300} />
    </div>
    <div style={{ position: 'absolute', inset: 0, padding: '22px 26px' }}>
      <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 900, fontSize: 42, color: '#0f172a', letterSpacing: 0, lineHeight: 1.1 }}>
        数学を、<br/>
        <span style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>社会の基盤</span>へ。
      </div>
      <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 500, fontSize: 9, color: '#0f172a', opacity: 0.85, letterSpacing: 0, lineHeight: 1.6, maxWidth: 234, marginTop: 6 }}>
        数理科学が持つ力を、教育と社会実装を通じて広く届け、<br/>数学で課題を解く次世代の人材を育成します。
      </div>
      <div style={{ fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 600, fontSize: 9, color: C.navy, opacity: 0.88, letterSpacing: 0.5, lineHeight: 1.5, maxWidth: 234, marginTop: 14 }}>
        一般社団法人 数理社会実装教育研究センター
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 8, color: C.navy, opacity: 0.6, letterSpacing: 0.2, lineHeight: 1.4, maxWidth: 234, marginTop: 2, whiteSpace: 'pre-line' }}>
        {`${P.org_en_legal},\n${P.org_en_short}`}
      </div>
    </div>
    <div style={{ position: 'absolute', right: 22, bottom: 22 }}>
      <MaSICQR size={66} />
    </div>
  </Card>
);

Object.assign(window, {
  MaSIC_C: C, MaSIC_P: P, CARD_W, CARD_H, BLEED, MaSICLogo, MaSICWordmark, MaSICQR,
  V1Front, V1Back, V2Front, V2Back, V3Front, V3Back, V4Front, V4Back, V5Front, V5Back,
  V6Front, V6Back,
  MaSICCard: Card,
});
