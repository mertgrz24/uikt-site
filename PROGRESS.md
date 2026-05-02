# UIKT Site - PROGRESS

**Son güncelleme:** 2 Mayıs 2026 — mobil optimizasyon

---

## Proje Durumu: AKTİF GELİŞTİRME ✅

---

## Yapılan İşler

### Temel Yapı
- Vite + React 18 + Tailwind CSS kurulumu
- React Router (HomePage, CountryPage) — `createBrowserRouter + RouterProvider`
- Brand renk paleti tanımlı (`tailwind.config.js`) — açık tema:
  - `brand.bg: #ffffff` (beyaz ana arka plan)
  - `brand.bgSection: #f8fafc` (çok hafif gri-beyaz)
  - `brand.bgCard: #f1f5f9` (açık gri kart)
  - `brand.border: #e2e8f0` (ince açık gri)
  - `brand.text: #0f172a` (neredeyse siyah)
  - `brand.textMuted: #475569` (orta gri)
  - `brand.hover: #eff6ff` (çok açık mavi, hover)
  - `brand.primary: #0e3c7d` (koyu lacivert — değişmedi)
  - `brand.secondary: #2d6cbf` (orta mavi — değişmedi)
  - `brand.accent: #4a8fd9` (açık mavi — değişmedi)
  - `brand.gold: #d4a017` (akademik altın — değişmedi)

### Bileşenler
- **Navbar** — sabit üst çubuk
- **AboutSection** — Hakkımızda / Vizyon / Misyon kartları (framer-motion staggered animasyon)
- **Globe3D** — react-globe.gl tabanlı; zoom butonları sol-alt köşede, otomatik dönüş (2.5s sonra resume), hover/tıklama ile ülke navigasyonu
- **TheorySection** — 10 teori için tek bileşen (scroll animasyonları `once: false`)
- **TheoryNavigator** — 12 bölümlük scroll navigatörü: Hakkımızda + Küre + 10 teori; sadece `lg:` ekranlarda görünür; sadece noktalar (label yok), `title` attr ile tarayıcı tooltip, CSS `hover:bg-gray-400`, IntersectionObserver ile scroll tracking
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
- TheoryNavigator hover efekti state-based'den CSS `hover:bg-gray-400`'e geçildi (state bağımlılığı ortadan kalktı)
- **Açık tema (light theme) tüm siteye uygulandı** — beyaz arka plan, `#0e3c7d` marka laciverd korundu
- **Küre intentionally koyu temada bırakıldı** — karanlık ada efekti, küre görselini bozmamak için

### Etkinlikler
- **`src/data/events.json`** oluşturuldu — 14 gerçek UIKT etkinliği (2022–2026), tarih sıralı
- **`EventsSection.jsx`** oluşturuldu — emoji ikonlar (`TYPE_EMOJI` map), tip rozetleri (renk bazında), Türkçe tarih formatı, framer-motion `whileInView` animasyonu
- **`image` alanı** boşsa emoji gösterir, doluysa fotoğraf gösterir (ileride kullanılmaya hazır)
- **`HomePage.jsx`**'e eklendi — AboutSection altına, Globe3D önüne

### Mobil Optimizasyon (2 Mayıs 2026)
- **`src/utils/motion.jsx`** oluşturuldu — `window.innerWidth < 768` kontrolüyle: mobilde `MotionDiv/MotionH2/MotionBlockquote` düz HTML elementleri döndürür, masaüstünde `framer-motion` dinamik import ile yüklenir (`await import('framer-motion')`)
- **framer-motion mobilde hiç yüklenmiyor** — `AboutSection`, `TheorySection`, `EventsSection` artık `motion.*` yerine `MotionDiv/MotionH2/MotionBlockquote` kullanıyor; TheorySection'daki kullanılmayan `useInView` import'u da temizlendi
- **Globe3D mobil görünüm** — `< 768px` ekranda Three.js / react-globe.gl hiç yüklenmez; yerine `countries.js`'teki 30 ülke 2 kolonlu buton grid olarak listelenir, tıklayınca `/country/{slug}` sayfasına yönlendirir; masaüstünde küre aynen çalışır
- **`vite.config.js` — `build.target: 'esnext'`** eklendi; top-level `await` gerektiren dynamic import için gerekli (Vercel build hatası giderildi)

### Temizlik
- `Globe3D_OLD.jsx` silindi (yedek gereksiz hale geldi)
- `README.md` yazıldı (UIKT tanıtımı, teknoloji yığını, proje yapısı, iletişim)
- Tüm `amber` / `emerald` renk kullanımları `brand-*` paletine dönüştürüldü
- Eski `bg.*` ve `accent.*` Tailwind grupları kaldırıldı, `brand.*` altında birleştirildi

### Belge Doğrulama (3 Mayıs 2026)
- **`src/pages/VerificationPage.jsx`** oluşturuldu — belge numarası girişi, loading/success/error state'leri, InfoCard ile Ad/Soyad/Etkinlik gösterimi, framer-motion animasyonu
- **`/verify` rotası** `router.jsx`'e eklendi
- **Navbar** `HomePage.jsx` ve `CountryPage.jsx`'e eklendi (daha önce hiçbir sayfada render edilmiyordu)

### Son Commit
- `a8c8500` — "Açık tema tamamlandı"
- `EventsSection eklendi` — 14 UIKT etkinliği, emoji ikonlar

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

### ⚡ Sonraki Gündem (Öncelikli)

| # | İş | Öncelik |
|---|-----|---------|
| 1 | **Google Apps Script düzeltmesi** — `Code.gs`'teki `doGet` JSON yerine HTML döndürüyor; `ContentService.createTextOutput(JSON.stringify(...)).setMimeType(ContentService.MimeType.JSON)` yapısına geçilecek, yeniden deploy edilecek, yeni URL `VerificationPage.jsx`'e yazılacak | **Kritik** |
| 2 | **Etkinlik görselleri** — zip hazır; `public/events/` klasörüne atılacak, `events.json` image alanları doldurulacak | Yüksek |
| 3 | **Favicon + site başlığı** — tarayıcı sekmesi | Orta |
| 4 | **Deploy** — Vercel | Orta |

### Bekleyen / Opsiyonel

| # | İş | Öncelik |
|---|-----|---------|
| 4 | **Çift tıklama gerektiren ülke seçimi** — Küre dönerken ilk tıklama bazen ülkeyi seçemiyor; kritik değil | Düşük |
