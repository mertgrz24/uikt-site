# TASK — UİKT Premium UI Yükseltme

> CLAUDE.md kurallarına uy. Her adım sonunda dur, onay bekle.
> Veri dosyalarına (countries.js, theories.js, events.json) DOKUNMA.
> Animasyon mantığı, routing, modal logic, API çağrıları DOKUNMA.
> Sadece görsel/layout/tipografi değişikliği.

---

## 🎯 HEDEF

Dribbble kalitesinde, her cihazda kusursuz çalışan premium bir arayüz.

**Tasarım yönü:** Refined Dark — koyu zemin üzerinde cam efekti (glassmorphism), güçlü tipografi hiyerarşisi, tutarlı spacing sistemi, telefon dahil tüm ekranlarda pixel-perfect responsive.

---

## ADIM 0 — Font Sistemi Kur

`index.html`'e Google Fonts ekle (head içine):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

`index.css`'e ekle:

```css
/* Tipografi sistemi */
:root {
  --font-display: 'Syne', sans-serif;   /* başlıklar */
  --font-body: 'DM Sans', sans-serif;   /* gövde metni */
}

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

/* Spacing scale — 8px grid */
/* Kullanım: p-2=8px, p-4=16px, p-6=24px, p-8=32px, p-12=48px, p-16=64px, p-24=96px */

/* Geliştirilmiş card-glass */
.card-glass {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background 200ms ease, border-color 200ms ease, transform 200ms ease;
}

.card-glass:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.14);
}

/* Glow efekti — accent renk için */
.glow-accent {
  box-shadow: 0 0 24px rgba(122, 184, 255, 0.15);
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #7ab8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Section ayırıcı — ince gradient çizgi */
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
}
```

---

## ADIM 1 — Navbar (`Navbar.jsx`)

```jsx
// Nav — daha belirgin ayrım, blur artır
<nav className="fixed top-0 w-full z-50 bg-brand-bg/70 backdrop-blur-xl border-b border-white/6">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    
    // Logo — biraz büyüt
    <img src="/uikt-logo.jpeg" alt="UİKT" className="h-10 w-auto" />

    // Masaüstü linkler — font ve spacing
    <div className="hidden md:flex items-center gap-8">
      <Link
        style={{ fontFamily: 'var(--font-body)' }}
        className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
      >
        {/* link text */}
      </Link>
      // "Bize Katılın" butonu — diğerlerinden ayrışsın
      <button className="px-4 py-2 text-sm font-medium bg-brand-accentLight/10 hover:bg-brand-accentLight/20 text-brand-accentLight border border-brand-accentLight/25 rounded-full transition-all duration-200">
        Bize Katılın
      </button>
    </div>
  </div>
</nav>
```

---

## ADIM 2 — Hero Section (`HomePage.jsx`)

```jsx
<section className="relative min-h-[90vh] md:min-h-screen bg-brand-bgSection flex flex-col items-center justify-center overflow-hidden pt-16">

  {/* Arka plan ambient glow — dekoratif */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-accentLight/5 rounded-full blur-3xl" />
  </div>

  {/* İçerik */}
  <div className="relative z-10 w-full flex flex-col items-center px-4">

    {/* Üst etiket — küçük, zarif */}
    <div className="flex items-center gap-2 mb-6">
      <div className="w-6 h-px bg-brand-accentLight/50" />
      <span className="text-xs font-medium text-brand-accentLight/70 tracking-[0.2em] uppercase"
        style={{ fontFamily: 'var(--font-body)' }}>
        Bandırma Onyedi Eylül Üniversitesi
      </span>
      <div className="w-6 h-px bg-brand-accentLight/50" />
    </div>

    {/* Ana başlık */}
    <h1 className="text-gradient text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 max-w-4xl"
      style={{ fontFamily: 'var(--font-display)' }}>
      Uluslararası İlişkiler ve Kariyer Topluluğu
    </h1>

    {/* Alt başlık */}
    <p className="text-brand-textMuted text-sm md:text-base text-center mb-10 max-w-lg leading-relaxed"
      style={{ fontFamily: 'var(--font-body)' }}>
      Küresel perspektif, akademik derinlik, kariyer vizyonu.
    </p>

    {/* Harita */}
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
        alt="Dünya Haritası"
        className="w-full h-auto object-contain opacity-80"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    </div>
  </div>
</section>
```

**NOT:** Başlığı `text-gradient` yaptık — beyazdan accent maviye gradient. Tüm büyük harf yazımını kaldır, Syne fontu zaten ağırlığı taşıyor.

---

## ADIM 3 — Hakkımızda Kartları (`AboutSection.jsx`)

```jsx
<section className="bg-network-pattern py-20 px-4">
  <div className="max-w-6xl mx-auto">

    {/* Başlık bloğu */}
    <div className="text-center mb-14">
      <span className="text-xs font-medium text-brand-accentLight/60 tracking-[0.2em] uppercase mb-4 block"
        style={{ fontFamily: 'var(--font-body)' }}>
        Hakkımızda
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-white"
        style={{ fontFamily: 'var(--font-display)' }}>
        Uluslararası İlişkiler ve Kariyer Topluluğu
      </h2>
    </div>

    {/* 3 Kart — eşit yükseklik */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
      <MotionDiv className="card-glass rounded-2xl p-7 flex flex-col gap-4">
        {/* Üst ikon/aksan */}
        <div className="w-8 h-8 rounded-lg bg-brand-accentLight/10 border border-brand-accentLight/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-brand-accentLight/60" />
        </div>
        <h3 className="text-lg font-semibold text-white"
          style={{ fontFamily: 'var(--font-display)' }}>
          Hakkımızda
        </h3>
        <p className="text-brand-textMuted text-sm leading-relaxed flex-1"
          style={{ fontFamily: 'var(--font-body)' }}>
          {/* mevcut metin — değiştirme */}
        </p>
      </MotionDiv>

      {/* Misyonumuz ve Vizyonumuz — aynı yapı, içerik değişmez */}
    </div>
  </div>
</section>
```

---

## ADIM 4 — Teoriler Sayfası (`TheorySection.jsx` + `TheoryNavigator.jsx`)

**TheoryNavigator.jsx:**
```jsx
// Container — sağdan daha içeri
<div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">

  // İnaktif nokta
  <button className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/50 transition-all duration-200 hover:scale-125" />

  // Aktif nokta
  <button className="w-2.5 h-2.5 rounded-full bg-brand-accentLight shadow-lg shadow-brand-accentLight/30 scale-110" />
</div>
```

**TheorySection.jsx — büyük numara:**
```jsx
// Numara daha soluk, arka planda kalmalı
<span className="text-[160px] font-bold leading-none select-none"
  style={{
    fontFamily: 'var(--font-display)',
    color: 'rgba(255,255,255,0.04)'
  }}>
  {String(index + 1).padStart(2, '0')}
</span>
```

**Teori başlığı:**
```jsx
<h2 className="text-2xl md:text-3xl font-bold text-white mb-6"
  style={{ fontFamily: 'var(--font-display)' }}>
  {theory.title}
</h2>
```

---

## ADIM 5 — Ülke Sayfası (`CountryPage.jsx`)

```jsx
<div className="min-h-screen bg-network-pattern text-brand-text py-8 px-4">
  <div className="max-w-4xl mx-auto">

    {/* Geri butonu */}
    <button className="flex items-center gap-2 text-sm text-brand-textMuted hover:text-white mb-10 transition-colors group">
      <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
      Küreye Dön
    </button>

    {/* Başlık — bayrak + isim */}
    <div className="flex items-center gap-5 mb-4">
      <span className="text-7xl leading-none">{country.flag}</span>
      <h1 className="text-4xl md:text-5xl font-bold text-white"
        style={{ fontFamily: 'var(--font-display)' }}>
        {country.name}
      </h1>
    </div>

    {/* Açıklama */}
    <p className="text-brand-textMuted text-base leading-relaxed mb-10 max-w-2xl"
      style={{ fontFamily: 'var(--font-body)' }}>
      {country.description}
    </p>

    {/* Bilgi kartları — 2x2 grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <div className="card-glass rounded-xl p-5">
        <p className="text-xs uppercase tracking-widest text-brand-textSubtle mb-2"
          style={{ fontFamily: 'var(--font-body)' }}>
          Başkent
        </p>
        <p className="text-xl font-semibold text-white"
          style={{ fontFamily: 'var(--font-display)' }}>
          {country.capital}
        </p>
      </div>
      {/* Diğer kartlar aynı yapı */}
    </div>

    {/* Kuruluşlar */}
    <div className="card-glass rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4"
        style={{ fontFamily: 'var(--font-display)' }}>
        Üyesi Olduğu Kuruluşlar
      </h3>
      <div className="flex flex-wrap gap-2">
        {country.organizations.map(org => (
          <span className="px-3 py-1 text-xs bg-brand-accentLight/10 text-brand-accentLight border border-brand-accentLight/20 rounded-full"
            style={{ fontFamily: 'var(--font-body)' }}>
            {org}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>
```

---

## ADIM 6 — Belge Doğrulama (`VerificationPage.jsx`)

```jsx
<div className="min-h-screen bg-network-pattern flex flex-col items-center justify-center px-4 py-16">

  {/* Üst ikon */}
  <div className="w-14 h-14 rounded-2xl bg-brand-accentLight/10 border border-brand-accentLight/20 flex items-center justify-center mb-6">
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"
      className="text-brand-accentLight" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>

  <h1 className="text-3xl font-bold text-white text-center mb-2"
    style={{ fontFamily: 'var(--font-display)' }}>
    Belge Doğrulama
  </h1>

  <p className="text-brand-textMuted text-sm text-center mb-10 max-w-sm leading-relaxed"
    style={{ fontFamily: 'var(--font-body)' }}>
    UİKT etkinlik katılım belgenizi doğrulamak için belge numaranızı giriniz.
  </p>

  <div className="card-glass rounded-2xl p-8 w-full max-w-md">
    <label className="block text-xs font-medium text-brand-textMuted mb-2 tracking-wide uppercase"
      style={{ fontFamily: 'var(--font-body)' }}>
      Belge Numarası
    </label>
    <div className="flex gap-3">
      <input
        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-accentLight/50 focus:bg-white/8 transition-all"
        placeholder="Örn: UIKT-2025-001"
        style={{ fontFamily: 'var(--font-body)' }}
      />
      <button className="px-5 py-3 bg-brand-accentLight/15 hover:bg-brand-accentLight/25 text-brand-accentLight border border-brand-accentLight/25 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
        style={{ fontFamily: 'var(--font-body)' }}>
        Sorgula
      </button>
    </div>
  </div>

  <p className="mt-6 text-brand-textSubtle text-xs text-center max-w-xs"
    style={{ fontFamily: 'var(--font-body)' }}>
    Belge numaranız katılım sertifikanızın alt kısmında yer almaktadır.
  </p>
</div>
```

---

## ADIM 7 — Küre Karıncalanma Fix (`GlobeDesktop.jsx`)

`GlobeDesktop.jsx`'i oku. React Globe GL'in renderer ayarlarını bul ve şunları uygula:

```jsx
// Globe bileşenine prop olarak ekle:
rendererConfig={{ antialias: true, alpha: true }}

// polygonAltitude varsa 0.006'ya düşür
// polygonCapColor ve polygonSideColor opacity'lerini kontrol et

// Globe container div'ine ekle — piksel oranı fix:
ref={el => {
  if (el) {
    const canvas = el.querySelector('canvas');
    if (canvas) {
      canvas.style.imageRendering = 'crisp-edges';
    }
  }
}}
```

---

## ADIM 8 — Mobil Responsive Kontrol

Her sayfada şu breakpoint'leri kontrol et:

**Navbar mobil menü:**
- Menü açıkken `Bize Katılın` butonu tam genişlik olsun: `w-full text-center py-3`

**Hero mobil:**
- Üst etiket metni `sm:block hidden` — çok küçük ekranda gizle
- Başlık `text-2xl sm:text-3xl md:text-5xl`

**Hakkımızda kartları mobil:**
- `gap-4` mobilde, `gap-5` md+'da
- Her kart `p-6` mobilde, `p-7` md+'da

**Ülke sayfası mobil:**
- Bayrak + başlık: `flex-col sm:flex-row` — mobilde alt alta
- Bilgi kartları: `grid-cols-1 sm:grid-cols-2`

**Footer mobil:**
- `grid-cols-1 md:grid-cols-3` — mobilde tek kolon
- Sosyal medya ikonları `justify-center md:justify-start`

---

## SON KONTROL

Tüm adımlar bittikten sonra:
1. `npm run build` çalıştır
2. Hata yoksa push et
3. `npm run dev` BAŞLATMA

**Push komutu:**
```bash
git add -A && git commit -m "feat: premium UI yükseltme — Syne/DM Sans font, glassmorphism, responsive fix, küre fix" && git push
```
