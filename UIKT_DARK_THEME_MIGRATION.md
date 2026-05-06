# 🎨 UİKT — Koyu Lacivert Tema Geçişi (Claude Code Talimatı)

> **Bu dosya Claude Code'a verilecek hazır talimattır. Sırayla uygula, her adım sonunda dur ve onay bekle.**
> CLAUDE.md kurallarına uy: kendi başına paket kurma, terminalde dev server başlatma, hata olursa dur ve sor.

---

## 🎯 HEDEF

Mevcut beyaz/açık tema tüm siteden kaldırılacak. Yerine koyu lacivert temalı, geometrik ağ desenli, ikinci referans tasarımdaki dil tüm sayfalara uygulanacak.

**Tasarım dili:**
- Ana arka plan: koyu lacivert (`#0a1628`)
- Bölüm arka planı: biraz daha açık lacivert (`#0e1e36`)
- Kartlar: yarı saydam beyaz (`rgba(255,255,255,0.06)`) + ince beyaz kenarlık
- Metin: kırık beyaz (`#f0f4f8`) ve orta gri (`#94a3b8`)
- Geometrik ağ deseni: noktalı subtle pattern (background-image)
- Marka rengi `#0e3c7d` korunur ama **artık başlıklarda KULLANILMAZ** (koyu zeminde okunmaz). Başlıklar beyaz olur.
- Küre zaten koyu, dokunulmaz.

---

## 📋 ADIM SIRASI

### ADIM 0 — Önce Dosya Yapısını Doğrula

```bash
ls src/components/
ls src/pages/
cat tailwind.config.js
```

Beklenen dosyalar: `Navbar.jsx`, `AboutSection.jsx`, `EventsSection.jsx`, `TheorySection.jsx`, `TheoryNavigator.jsx`, `JoinModal.jsx`, `Footer.jsx`, `CountryCard.jsx`, `Globe3D.jsx`, `EventDetailModal.jsx`, `ImageLightbox.jsx`, `ScrollToTop.jsx`. Sayfalar: `HomePage.jsx`, `EventsPage.jsx`, `TheoriesPage.jsx`, `CountryPage.jsx`, `VerificationPage.jsx`.

Eksik dosya varsa **dur ve bildir**.

---

### ADIM 1 — `tailwind.config.js` güncelle

`theme.extend.colors.brand` bloğunu **tamamen** aşağıdakiyle değiştir:

```js
brand: {
  // Koyu tema arka planları
  bg: '#0a1628',           // ana arka plan — koyu lacivert
  bgSection: '#0e1e36',    // bölüm arka planı — biraz açık
  bgCard: 'rgba(255,255,255,0.06)',  // yarı saydam kart
  border: 'rgba(255,255,255,0.1)',   // ince beyaz kenarlık
  borderStrong: 'rgba(255,255,255,0.2)',

  // Metin
  text: '#f0f4f8',         // ana metin — kırık beyaz
  textMuted: '#94a3b8',    // ikincil metin — orta gri
  textSubtle: '#64748b',   // 3. seviye — koyu gri

  // Etkileşim
  hover: 'rgba(255,255,255,0.08)',

  // Marka — DEĞİŞMEDİ (vurgu/ikon/buton için saklı)
  primary: '#0e3c7d',
  secondary: '#2d6cbf',
  accent: '#4a8fd9',
  accentLight: '#7ab8ff',  // koyu zeminde okunabilir açık mavi vurgu (yeni)
  gold: '#d4a017',
}
```

**ÖNEMLİ:** `#0e3c7d` koyu zeminde okunmaz. Başlık/vurgu metinler için `text-brand-accentLight` (`#7ab8ff`) veya doğrudan `text-white` kullanılacak.

`darkMode` ayarına dokunma. `content` ayarına dokunma.

---

### ADIM 2 — `src/index.css` güncelle

Dosyanın **sonuna** aşağıdakileri ekle (varolan `@tailwind` direktiflerini silme):

```css
/* === Koyu lacivert tema — global === */
html, body {
  background-color: #0a1628;
  color: #f0f4f8;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Geometrik ağ deseni — ikinci referans tasarımdaki subtle nokta deseni */
.bg-network-pattern {
  background-color: #0a1628;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0);
  background-size: 32px 32px;
}

/* Daha yoğun versiyon — hero bölümleri için */
.bg-network-pattern-dense {
  background-color: #0a1628;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0),
    linear-gradient(135deg, rgba(74,143,217,0.04) 0%, transparent 50%);
  background-size: 28px 28px, 100% 100%;
}

/* Kart hover efekti */
.card-glass {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 200ms ease;
}

.card-glass:hover {
  background: rgba(255,255,255,0.09);
  border-color: rgba(255,255,255,0.18);
}

/* Scrollbar — koyu temaya uyumlu */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: #0a1628;
}
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.2);
}

/* Seçim rengi */
::selection {
  background: rgba(74,143,217,0.4);
  color: #ffffff;
}
```

---

### ADIM 3 — `src/components/Navbar.jsx` güncelle

Mevcut navbar'da:
- `bg-white` → `bg-brand-bg/80 backdrop-blur-md`
- `border-b` rengini `border-white/10` yap
- Linkler: `text-brand-text hover:text-brand-accentLight`
- Aktif link: `text-brand-accentLight`
- Hamburger ikon rengi: `text-brand-text`
- Mobil menü arka planı: `bg-brand-bg border-t border-white/10`
- Logo'ya filter ekleme **gerekmez** (logo zaten görünür kalmalı; eğer logoda koyu detay varsa gerekirse `brightness-0 invert` denenir, ama önce dene).

**Örnek dönüşüm:**
```jsx
// ÖNCE
<nav className="fixed top-0 w-full bg-white border-b border-brand-border z-50">

// SONRA
<nav className="fixed top-0 w-full bg-brand-bg/85 backdrop-blur-md border-b border-white/10 z-50">
```

```jsx
// Linkler
<Link className="text-brand-text hover:text-brand-accentLight transition-colors">
```

---

### ADIM 4 — `src/components/AboutSection.jsx` güncelle

İkinci referans görselindeki gibi olacak:

- Bölüm arka planı: `bg-network-pattern` (geometrik desen + koyu lacivert)
- Üstte büyük başlık: **beyaz**, ortada, altında ince çizgi (mavi vurgu çizgisi)
- 3 kart yan yana, her kart: `card-glass rounded-2xl p-8`
- Kart içinde küçük dekoratif çizgi (üstte 40px genişlik beyaz çizgi)
- Kart başlığı (Hakkımızda/Misyonumuz/Vizyonumuz): `text-2xl font-semibold text-white mb-4`
- Kart metni: `text-brand-textMuted leading-relaxed`

**Tam yapı şablonu:**

```jsx
<section className="bg-network-pattern py-24 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Başlık */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide">
        ULUSLARARASI İLİŞKİLER VE KARİYER TOPLULUĞU
      </h2>
      <div className="w-24 h-0.5 bg-brand-accentLight mx-auto mt-6"></div>
    </div>

    {/* 3 Kart */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {/* Hakkımızda */}
      <MotionDiv className="card-glass rounded-2xl p-8">
        <div className="w-10 h-0.5 bg-white/40 mb-6"></div>
        <h3 className="text-2xl font-semibold text-white mb-4">Hakkımızda</h3>
        <p className="text-brand-textMuted leading-relaxed">
          Uluslararası İlişkiler ve Kariyer Topluluğu (UİKT), Bandırma Onyedi Eylül Üniversitesi bünyesinde faaliyet gösteren akademik ve sosyal odaklı bir öğrenci topluluğudur. Topluluğumuz; uluslararası farkındalık, kariyer geliştirme, sosyal sorumluluk ve dil becerileri gibi geniş bir yelpazede etkinlikler düzenleyerek öğrencilerin çok boyutlu gelişimine katkı sağlamayı hedeflemektedir.
        </p>
      </MotionDiv>

      {/* Misyonumuz */}
      <MotionDiv className="card-glass rounded-2xl p-8">
        <div className="w-10 h-0.5 bg-white/40 mb-6"></div>
        <h3 className="text-2xl font-semibold text-white mb-4">Misyonumuz</h3>
        <p className="text-brand-textMuted leading-relaxed">
          Uluslararası ilişkiler alanında bilgi ve deneyim paylaşımını teşvik ederek, öğrencilerin kariyer hedeflerine ulaşmalarına yardımcı olmak.
        </p>
      </MotionDiv>

      {/* Vizyonumuz */}
      <MotionDiv className="card-glass rounded-2xl p-8">
        <div className="w-10 h-0.5 bg-white/40 mb-6"></div>
        <h3 className="text-2xl font-semibold text-white mb-4">Vizyonumuz</h3>
        <p className="text-brand-textMuted leading-relaxed">
          Küresel perspektife sahip, liderlik becerileri geliştiren ve uluslararası ilişkiler alanında etkili profesyoneller yetiştiren öncü bir topluluk olmak.
        </p>
      </MotionDiv>
    </div>
  </div>
</section>
```

**`MotionDiv`** import'u zaten `src/utils/motion.jsx`'ten geliyor — değiştirme. Animasyon prop'ları (`initial`, `whileInView`) varolan halleriyle korunsun, sadece renk/yapı değişecek.

---

### ADIM 5 — `src/pages/HomePage.jsx` güncelle

- Kök sarmalayıcıyı koyu temaya çevir: `<div className="min-h-screen bg-brand-bg text-brand-text">`
- Globe3D bölümünün üstündeki/altındaki açık tema arka planlarını kaldır
- AboutSection zaten kendi arka planını taşır, dokunma

---

### ADIM 6 — `src/components/EventsSection.jsx` veya `src/pages/EventsPage.jsx` güncelle

(Hangisi `/events` rotasında render ediliyorsa onu güncelle — büyük ihtimalle `EventsPage.jsx` `EventsSection`'ı çağırıyor.)

**Kök:**
```jsx
<section className="bg-network-pattern min-h-screen py-24 px-4">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center tracking-wide mb-4">
      FAALİYETLERİMİZ
    </h1>
    <div className="w-24 h-0.5 bg-brand-accentLight mx-auto mb-16"></div>

    {/* Etkinlik kartları grid'i */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Her etkinlik kartı */}
    </div>
  </div>
</section>
```

**Etkinlik kartı:**
```jsx
<article className="card-glass rounded-2xl overflow-hidden flex flex-col">
  {/* Görsel veya emoji üst */}
  <div className="aspect-video bg-white/5 flex items-center justify-center text-6xl border-b border-white/10">
    {event.image ? (
      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
    ) : (
      <span>{TYPE_EMOJI[event.type]}</span>
    )}
  </div>

  {/* İçerik */}
  <div className="p-6 flex flex-col flex-1">
    {/* Tip rozeti */}
    <span className="self-start px-3 py-1 text-xs rounded-full bg-brand-accentLight/15 text-brand-accentLight border border-brand-accentLight/30 mb-3">
      {event.type}
    </span>

    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
    <p className="text-sm text-brand-textMuted mb-4">{formatDate(event.date)}</p>
    <p className="text-brand-textMuted text-sm leading-relaxed mb-4 line-clamp-3">
      {event.shortDescription}
    </p>

    <button
      onClick={() => openModal(event)}
      className="mt-auto self-start px-4 py-2 bg-brand-accentLight/15 hover:bg-brand-accentLight/25 text-brand-accentLight border border-brand-accentLight/30 rounded-lg text-sm font-medium transition-colors"
    >
      Detaylar →
    </button>
  </div>
</article>
```

Tip rozeti renklerini varolan logic'e göre uyarla — sadece `bg-XXX-100 text-XXX-700` paternlerini `bg-XXX-500/15 text-XXX-300 border border-XXX-500/30` paternine çevir.

---

### ADIM 7 — `src/pages/TheoriesPage.jsx` ve `src/components/TheorySection.jsx` güncelle

**TheoriesPage.jsx kök:**
```jsx
<div className="min-h-screen bg-brand-bg text-brand-text">
  {/* TheoryNavigator + TheorySection'lar */}
</div>
```

**TheorySection.jsx — her teori bölümü:**

- Kök: `<section className="bg-network-pattern min-h-screen flex items-center py-20 px-4">`
- Sol taraftaki büyük teori numarası: `text-9xl font-bold text-white/8` (çok soluk, dekoratif)
- Sağ içerik:
  - Başlık (`title`): `text-3xl md:text-4xl font-bold text-white mb-4`
  - Özet (`summary`) — callout box: 
    ```jsx
    <div className="border-l-4 border-brand-accentLight bg-brand-accentLight/10 px-6 py-4 rounded-r-lg my-6">
      <p className="text-brand-text italic">{theory.summary}</p>
    </div>
    ```
  - Alt başlıklar ("Temel Fikir", "Temel Kavramlar", "Önemli Düşünürler" vb.): `text-xl font-semibold text-brand-accentLight mt-8 mb-3`
  - Liste itemleri: `text-brand-textMuted`
  - Düşünür kartları: `card-glass rounded-xl p-4` — isim `text-white font-medium`, açıklama `text-brand-textMuted text-sm`

**Karşılaştırma tablosu (Teori 10):**
```jsx
<div className="overflow-x-auto card-glass rounded-2xl">
  <table className="w-full text-sm">
    <thead className="bg-white/5 border-b border-white/10">
      <tr>
        <th className="px-4 py-3 text-left text-white font-semibold">...</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-white/5">
      <tr className="hover:bg-white/5">
        <td className="px-4 py-3 text-brand-textMuted">...</td>
      </tr>
    </tbody>
  </table>
</div>
```

**TheoryNavigator.jsx:**
- Nokta inaktif: `bg-white/20`
- Nokta aktif: `bg-brand-accentLight scale-125`
- Hover: `bg-white/40`

---

### ADIM 8 — `src/pages/CountryPage.jsx` güncelle

```jsx
<div className="min-h-screen bg-network-pattern text-brand-text py-12 px-4">
  <div className="max-w-5xl mx-auto">
    {/* Geri butonu */}
    <button className="text-brand-textMuted hover:text-brand-accentLight mb-8 flex items-center gap-2">
      ← Küreye Dön
    </button>

    {/* Başlık */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
      <span className="text-7xl">{country.flag}</span>
      <h1 className="text-4xl md:text-5xl font-bold text-white">{country.name}</h1>
    </div>

    <p className="text-brand-textMuted text-lg leading-relaxed mb-12 max-w-3xl">
      {country.description}
    </p>

    {/* Bilgi kartları grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
      {/* Her bilgi kartı: */}
      <div className="card-glass rounded-xl p-6">
        <p className="text-xs uppercase tracking-wider text-brand-textSubtle mb-2">Başkent</p>
        <p className="text-xl text-white font-semibold">{country.capital}</p>
      </div>
      {/* Diğerleri: Devlet Başkanı, Nüfus, GSYH — aynı pattern */}
    </div>

    {/* Organizasyonlar */}
    <h3 className="text-2xl font-semibold text-white mb-4">Üyesi Olduğu Kuruluşlar</h3>
    <div className="flex flex-wrap gap-2">
      {country.organizations.map(org => (
        <span className="px-3 py-1 bg-brand-accentLight/15 text-brand-accentLight border border-brand-accentLight/30 rounded-full text-sm">
          {org}
        </span>
      ))}
    </div>
  </div>
</div>
```

---

### ADIM 9 — `src/pages/VerificationPage.jsx` güncelle

```jsx
<div className="min-h-screen bg-network-pattern text-brand-text flex items-center justify-center px-4">
  <div className="w-full max-w-md">
    <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
      BELGE DOĞRULAMA
    </h1>
    <div className="w-16 h-0.5 bg-brand-accentLight mx-auto mb-8"></div>

    <div className="card-glass rounded-2xl p-8">
      <label className="block text-sm font-medium text-brand-textMuted mb-2">
        Belge Numarası
      </label>
      <input
        type="text"
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-brand-textSubtle focus:outline-none focus:border-brand-accentLight focus:bg-white/10 transition-colors"
        placeholder="Belge numaranızı giriniz"
      />
      <button className="mt-4 w-full py-3 bg-brand-accentLight/15 hover:bg-brand-accentLight/25 text-brand-accentLight border border-brand-accentLight/30 rounded-lg font-medium transition-colors">
        Doğrula
      </button>
    </div>

    {/* Sonuç InfoCard'ları aynı card-glass paterni */}
  </div>
</div>
```

Loading/success/error renkleri:
- Success: `text-emerald-300 bg-emerald-500/10 border-emerald-500/30`
- Error: `text-red-300 bg-red-500/10 border-red-500/30`
- Loading: `text-brand-textMuted`

---

### ADIM 10 — `src/components/Footer.jsx` güncelle

```jsx
<footer className="bg-brand-bgSection border-t border-white/10 py-12 px-4">
  <div className="max-w-7xl mx-auto">
    {/* İçerik grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      {/* Slogan */}
      <div>
        <h3 className="text-xl font-bold text-white mb-2">UİKT</h3>
        <p className="text-brand-textMuted">Sınırlarını aş, kariyerini keşfet!</p>
      </div>

      {/* İletişim */}
      <div>
        <h4 className="text-sm uppercase tracking-wider text-brand-textSubtle mb-3">İletişim</h4>
        <p className="text-brand-textMuted text-xs md:text-sm break-all">...</p>
      </div>

      {/* Sosyal medya */}
      <div>
        <h4 className="text-sm uppercase tracking-wider text-brand-textSubtle mb-3">Sosyal Medya</h4>
        <div className="flex gap-4">
          {/* Her ikon: text-brand-textMuted hover:text-brand-accentLight */}
        </div>
      </div>
    </div>

    <div className="pt-6 border-t border-white/10 text-center text-brand-textSubtle text-xs">
      © 2026 UİKT — Bandırma Onyedi Eylül Üniversitesi
    </div>
  </div>
</footer>
```

---

### ADIM 11 — `src/components/JoinModal.jsx` güncelle

Modal overlay zaten `bg-black/60` olabilir, koru. Modal kutusu:

```jsx
<div className="bg-brand-bgSection border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4">
  <h2 className="text-2xl font-bold text-white mb-4">Bize Katılın</h2>
  <p className="text-brand-textMuted mb-6 leading-relaxed">
    UİKT topluluğuna katılmak için aşağıdaki başvuru formunu doldurabilirsiniz.
  </p>
  <a
    href="https://forms.gle/qHrWc86kqzj9caJ59"
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full text-center py-3 bg-brand-accentLight/15 hover:bg-brand-accentLight/25 text-brand-accentLight border border-brand-accentLight/30 rounded-lg font-medium transition-colors"
  >
    Başvuru Formuna Git →
  </a>
  <button
    onClick={onClose}
    className="mt-3 w-full py-2 text-brand-textMuted hover:text-white transition-colors text-sm"
  >
    Kapat
  </button>
</div>
```

---

### ADIM 12 — `EventDetailModal.jsx` ve `ImageLightbox.jsx` güncelle

Aynı modal mantığı — overlay `bg-black/70`, içerik kutusu `bg-brand-bgSection border border-white/10`. Kapatma butonu `text-white/60 hover:text-white`. Lightbox arka planı `bg-black/90`.

---

### ADIM 13 — Globe3D'ye DOKUNMA

Küre zaten koyu, renk dokunulmaz. Sadece şunu kontrol et: `Globe3D.jsx`'in render edildiği sayfa kök wrapper'ı `bg-brand-bg` veya `bg-network-pattern` olmalı, **ekstra arka plan eklenmemeli**. Küre kendi içinde Three.js arka planını çiziyor.

Mobil grid (Globe3D'nin mobil versiyonu, ülke butonları): butonlar `card-glass rounded-lg p-3 text-white hover:bg-white/10`.

---

### ADIM 14 — Genel Temizlik

Tüm dosyalarda `grep` ile şunları ara ve dönüştür:

| Eski | Yeni |
|------|------|
| `bg-white` (içerik için) | `bg-brand-bgSection` veya kaldır |
| `bg-gray-50`, `bg-gray-100` | `bg-network-pattern` veya `bg-brand-bgSection` |
| `text-gray-700`, `text-gray-800`, `text-gray-900` | `text-brand-text` |
| `text-gray-500`, `text-gray-600` | `text-brand-textMuted` |
| `text-gray-400` | `text-brand-textSubtle` |
| `border-gray-200`, `border-gray-300` | `border-white/10` |
| `text-brand-primary` (başlıklarda) | `text-white` |
| `bg-brand-bgCard` (eski açık) | `card-glass` |
| `bg-brand-hover` | `hover:bg-white/8` |

**ARAMA KOMUTU:**
```bash
grep -rn "bg-white\|text-gray-\|border-gray-\|text-brand-primary" src/ --include="*.jsx"
```

Çıkanları listele, sonra **dur**, kullanıcıya sor: "Şu dosyalarda kalan açık tema kullanımları var, hepsini dönüştüreyim mi?"

---

## 🚦 SON KONTROL

Tüm adımlar bittiğinde:

1. `npm run build` çalıştır (sadece build, dev değil) — hata olursa **dur**, raporla.
2. Build başarılıysa kullanıcıya bildir: "Tema geçişi tamamlandı, manuel olarak `npm run dev` ile test edebilirsiniz."
3. **`npm run dev` SEN BAŞLATMA.** CLAUDE.md kuralı.

---

## ⚠️ HATIRLATMALAR

- Her adım sonunda: "✅ Adım X tamamlandı. Devam edeyim mi?" diye sor.
- Hata gördüğünde **dur**, kullanıcıya raporla.
- `framer-motion`'a, `MotionDiv` import'larına, animasyon prop'larına dokunma — sadece className'leri değiştir.
- Veri dosyalarına (`countries.js`, `theories.js`, `events.json`) **dokunma** — sadece sunum katmanı değişiyor.
- Mevcut routing, modal logic, scroll davranışı, IntersectionObserver kodu **aynı kalır** — sadece görsel.