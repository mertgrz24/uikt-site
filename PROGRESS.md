# UIKT Site - PROGRESS

**Son güncelleme:** 25 Nisan 2026 (akşam)

---

## Proje Durumu: AKTİF GELİŞTİRME ✅

---

## Yapılan İşler

### Temel Yapı
- Vite + React 18 + Tailwind CSS kurulumu
- React Router (HomePage, CountryPage) — `createBrowserRouter + RouterProvider`
- Brand renk paleti tanımlı (`tailwind.config.js`):
  - `brand.primary: #0e3c7d` (koyu lacivert)
  - `brand.secondary: #2d6cbf` (orta mavi)
  - `brand.accent: #4a8fd9` (açık mavi)
  - `brand.gold: #d4a017` (akademik altın)

### Bileşenler
- **Navbar** — sabit üst çubuk
- **AboutSection** — Hakkımızda / Vizyon / Misyon kartları (framer-motion staggered animasyon)
- **Globe3D** — react-globe.gl tabanlı; zoom butonları sol-alt köşede, otomatik dönüş (2.5s sonra resume), hover/tıklama ile ülke navigasyonu
- **TheorySection** — 10 teori için tek bileşen (scroll animasyonları `once: false`)
- **TheoryNavigator** — 12 bölümlük scroll navigatörü: Hakkımızda + Küre + 10 teori; sadece `lg:` ekranlarda görünür; sadece noktalar (label yok), `title` attr ile tarayıcı tooltip, CSS `hover:bg-gray-500`, IntersectionObserver ile scroll tracking
- **CountryCard** — ülke özet kartı
- **Footer** — UIKT iletişim, sosyal medya (Instagram, WhatsApp, X, LinkedIn)
- **ScrollToTop** — route değişiminde sayfa en üste atlar (`HomePage` ve `CountryPage`'e eklendi)

### Veriler
- `src/data/countries.js` — 30 ülke (Türkiye dahil), Nisan 2026 güncel liderler
- `src/data/theories.js` — 10 uluslararası ilişkiler teorisi (docx içeriğine birebir sadık)

### Sayfa Akışı
1. Hakkımızda (üç kart: Hakkımızda / Vizyon / Misyon)
2. Küre (3D dünya, 30 ülkeden birine tıklayınca CountryPage açılır)
3. 10 teori bölümü (sırayla, scroll-triggered)
4. Footer

### Çözülen Önemli Sorunlar
- Three.js + d3-geo triangulation hataları → `react-globe.gl`'e geçildi (`three` 0.170'e yükseltildi)
- Scroll/zoom çakışması → `enableZoom` kapatıldı, ayrı zoom butonları eklendi (sol-alt köşe)
- Animasyon tek seferlik tetiklenme → `viewport: { once: false }` yapıldı
- Verisi olan/olmayan ülke ayrımı → `ISO_TO_SLUG` ile 30 ülke açık gri, diğerleri koyu gri
- TheoryNavigator + zoom butonu çakışması → butonlar sol-alt'a taşındı
- TheoryNavigator 10 → 12 bölüme genişletildi (`sections` prop yapısına geçildi)
- Sayfa geçişlerinde scroll pozisyonu miras kalması → `ScrollToTop` bileşeni eklendi
- Footer e-posta mobil taşması → `break-all`, `text-xs md:text-sm`, `text-center` eklendi
- CountryPage bayrak + başlık dar ekranda taşması → `flex-col sm:flex-row` yapısına geçildi
- TheoryNavigator etiketleri tamamen kaldırıldı → sadece noktalar, `title` attr ile tooltip, CSS-only hover
- TheoryNavigator hover efekti state-based'den CSS `hover:bg-gray-500`'e geçildi (state bağımlılığı ortadan kalktı)

### Temizlik
- `Globe3D_OLD.jsx` silindi (yedek gereksiz hale geldi)
- `README.md` yazıldı (UIKT tanıtımı, teknoloji yığını, proje yapısı, iletişim)
- Tüm `amber` / `emerald` renk kullanımları `brand-*` paletine dönüştürüldü

### Son Commit
- `663291b` — "TheoryNavigator: etiketler kaldırıldı, sadece noktalar ve title tooltip"

---

## Bağımlılıklar

```json
"react": "^18.3.1"
"react-dom": "^18.3.1"
"react-router-dom": "^6.26.0"
"three": "^0.170.0"
"react-globe.gl": "^2.37.1"
"topojson-client": "^3.1.0"
"framer-motion": "^11.0.0"
"tailwindcss": "^3.4.0"
```

---

## Sonraki Adımlar

### ⚡ Yarınki Gündem (Öncelikli)

| # | İş | Öncelik |
|---|-----|---------|
| 1 | **Renk değişikliği** — Detay kullanıcı tarafından gelecek | Yüksek |
| 2 | **Instagram API entegrasyonu** — UIKT geçmiş etkinlikleri Instagram'dan çekilip siteye yansıtılacak | Yüksek |

### Bekleyen / Opsiyonel

| # | İş | Öncelik |
|---|-----|---------|
| 3 | **Site yayına alma** — Vercel veya Netlify deploy | Orta |
| 4 | **Çift tıklama gerektiren ülke seçimi** — Küre dönerken ilk tıklama bazen ülkeyi seçemiyor; kritik değil | Düşük |
| 5 | **n8n ile otomatik haber çekme entegrasyonu** — Uzun vadeli, isteğe bağlı | Düşük |
