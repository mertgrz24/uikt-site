# CLAUDE.md — Proje Talimatları

> **Bu dosya, Claude Code'un proje boyunca uyması gereken TÜM kuralları ve spesifikasyonları içerir. Her yeni oturumda bu dosyayı başta oku, sonra kodlamaya başla.**

---

## 🚨 KIRMIZI ÇİZGİLER — PAZARLIK KONUSU DEĞİL

Aşağıdaki 3 kural projenin temelidir ve **hiçbir koşulda ihlal edilemez**. Bu kurallardan herhangi birini ihlal eden bir yaklaşım önerirsen veya uygularsan, kullanıcı hatayı derhal geri çevirecek ve zaman kaybı yaşanacaktır.

### 🔴 KURAL 1 — Altyapı (Zorunlu Teknoloji Yığını)

- Proje **KESİNLİKLE Next.js ile kurulmayacaktır.**
- Proje `React 18 + Vite + Tailwind CSS` ile kurulacaktır.
- Kurulum komutu: `npm create vite@latest . -- --template react`
- Tailwind için `tailwindcss`, `postcss`, `autoprefixer` paketleri kullanılacak.
- Route yönetimi için `react-router-dom` kullanılacak (Next.js app router YOK).
- SSR/SSG yapılmayacak. Sadece client-side React uygulaması (SPA).
- `next`, `next/link`, `next/router`, `next/image` gibi Next.js'e ait hiçbir import yapılmayacak.

### 🔴 KURAL 2 — Token Güvenliği ve Terminal Disiplini

- Terminalde **herhangi bir hata** alındığında (npm install hatası, build hatası, module not found, port çakışması, vb.):
  - Claude Code **kendi kendine farklı yöntemler denemeyecektir.**
  - Alternatif paketler kurmayı, sürüm değiştirmeyi, workaround uygulamayı **denemeyeceksin.**
  - İşlemi **anında durduracak**, hatayı olduğu gibi raporlayacak ve **kullanıcının komutunu bekleyeceksin.**
- Terminali kilitleyen komutlar **YASAKTIR**:
  - `sleep`, `watch`, `tail -f`, süresiz `ping`, arka plana atılmamış uzun süreli process'ler.
  - `npm run dev` gibi sürekli çalışan komutları Claude Code **kendisi başlatmayacak**; kullanıcı manuel olarak ayrı bir terminalde çalıştıracak.
- Bu kural **token tasarrufu** ve **kontrol disiplini** içindir. İstisnası yoktur.

### 🔴 KURAL 3 — Çalışma Ortamı

- Claude Code **VS Code üzerinden** çalıştırılmaktadır.
- Tüm dosya yolları ve komutlar Windows/macOS'ta VS Code'un entegre terminaliyle uyumlu olmalıdır.
- Dosya oluştururken **sadece göreceli yollar** kullan (örn. `src/pages/CountryPage.jsx`), mutlak sistem yolları kullanma.

---

## 📋 PROJE KULLANILACAK SKILL'LER

Aşağıdaki iki skill projenin başında yüklenmeli ve aktif şekilde kullanılmalıdır:

```bash
npx claude-code-templates@latest --skill creative-design/scroll-experience
npx claude-code-templates@latest --skill creative-design/frontend-design
```

- `scroll-experience`: Ana sayfadaki scroll-triggered animasyonlar, küre dönüşü, bölümler arası geçişler için.
- `frontend-design`: Tüm UI bileşenlerinin görsel kalitesi, tipografi, renk paleti ve düzen için.

---

## 🎯 PROJE GENEL TANIMI

**"International Relations Explorer"** — Animasyonlu, etkileşimli bir tek sayfa uygulaması (SPA). İki ana işlev vardır:

1. **3D Dünya Küresi**: Kullanıcı fareyle döndürebilir; ülkeler gri dolgulu, siyah sınır çizgileriyle gösterilir; bir ülkeye tıklandığında o ülkenin detay sayfasına yönlendirir.
2. **Uİ Teorileri Bölümü**: Scroll tabanlı, 10 teorinin sırayla sunulduğu içerik bölümü.

---

## 🏗️ TEKNİK MİMARİ

### Klasör Yapısı

```
/
├── CLAUDE.md
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── world-110m.json           # Küre için TopoJSON haritası
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── router.jsx                # react-router-dom konfigürasyonu
    ├── data/
    │   ├── countries.js          # 30 ülkenin verileri (Türkiye dahil)
    │   └── theories.js           # 10 Uİ teorisinin verileri
    ├── pages/
    │   ├── HomePage.jsx          # Küre + teori bölümleri
    │   └── CountryPage.jsx       # /country/:id route
    ├── components/
    │   ├── Globe3D.jsx           # 3D döndürülebilir küre
    │   ├── TheorySection.jsx     # Her teori için scroll bölümü
    │   ├── TheoryNavigator.jsx   # Teoriler arası navigasyon
    │   ├── CountryCard.jsx       # Ülke bilgi kartı
    │   └── Navbar.jsx
    └── hooks/
        └── useScrollAnimation.js
```

### Gerekli Paketler

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "d3-geo": "^3.1.0",
    "topojson-client": "^3.1.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

**ÖNEMLİ:** Kullanıcı `npm install` komutunu kendi çalıştıracaktır. Sen sadece `package.json`'ı hazırla, kurulum hatası olursa **dur ve bildir**.

---

## 🌍 KÜRE (Globe3D) SPESİFİKASYONLARI

- Teknoloji: `three.js` + `@react-three/fiber` + `@react-three/drei` (`OrbitControls`).
- Küre üzerindeki ülkeler **gri dolgulu (#9ca3af veya benzeri tonlar)** olarak render edilecek.
- Ülke sınırları **siyah ince çizgilerle (#000000, stroke-width yaklaşık 0.5)** belirtilecek.
- Arka plan: koyu (örn. `#0a0a0a` veya degrade lacivert-siyah).
- Kontroller:
  - Mouse ile döndürme (OrbitControls `enableRotate: true`).
  - Zoom `enableZoom: true` (limitlerle: minDistance 2, maxDistance 6).
  - Pan kapalı (`enablePan: false`).
  - Otomatik yavaş dönüş (autoRotate, speed 0.3) — kullanıcı etkileşimine geçince duracak.
- Ülkeye tıklama:
  - Her ülke bir mesh'tir, `onClick` ile `useNavigate()` kullanarak `/country/:id` rotasına geçiş yapılır.
  - Hover'da ülke rengi **beyaza (#ffffff)** geçer, imleç `cursor-pointer` olur.
- Harita verisi: `public/world-110m.json` dosyasından `topojson-client` ile parse edilecek (`d3-geo` ile küresel projeksiyon).
- Küre, scroll'un ilk bölümünde ekranın ortasında büyük (yaklaşık `60vh`) gösterilir.

> TopoJSON dosyasını projede hazır varsayıyoruz; eğer indirilmesi gerekiyorsa kullanıcıya `https://unpkg.com/world-atlas@2/countries-110m.json` kaynağından indirmesi gerektiğini söyle — sen indirme denemeyeceksin.

---

## 📊 ÜLKELER LİSTESİ (30 Ülke — Türkiye Dahil)

`src/data/countries.js` dosyasında aşağıdaki 30 ülke olmalı. Her ülke için şu alanlar zorunludur: `id`, `name`, `capital`, `president`, `population`, `gdp`, `organizations` (dizi), `flag` (emoji), `description` (kısa paragraf).

**Ülke listesi:**

1. Türkiye (Turkey)
2. Amerika Birleşik Devletleri (United States)
3. Çin (China)
4. Rusya (Russia)
5. Almanya (Germany)
6. Fransa (France)
7. Birleşik Krallık (United Kingdom)
8. Japonya (Japan)
9. Hindistan (India)
10. Brezilya (Brazil)
11. Kanada (Canada)
12. İtalya (Italy)
13. İspanya (Spain)
14. Güney Kore (South Korea)
15. Avustralya (Australia)
16. Meksika (Mexico)
17. Arjantin (Argentina)
18. Güney Afrika (South Africa)
19. Mısır (Egypt)
20. Suudi Arabistan (Saudi Arabia)
21. İran (Iran)
22. İsrail (Israel)
23. Pakistan (Pakistan)
24. Endonezya (Indonesia)
25. Nijerya (Nigeria)
26. Hollanda (Netherlands)
27. İsveç (Sweden)
28. Polonya (Poland)
29. Yunanistan (Greece)
30. Ukrayna (Ukraine)

**Veri formatı örneği:**

```javascript
{
  id: "turkey",
  name: "Türkiye",
  capital: "Ankara",
  president: "Recep Tayyip Erdoğan",
  population: "85.4 milyon (2024)",
  gdp: "1.11 trilyon USD (2024, nominal)",
  organizations: ["BM", "NATO", "G20", "OECD", "Avrupa Konseyi", "İKT", "D-8"],
  flag: "🇹🇷",
  description: "Avrupa ve Asya kıtaları arasında stratejik konuma sahip, NATO üyesi ve AB ile Gümrük Birliği anlaşmalı bir ülke."
}
```

**ÖNEMLİ:** Veriler Nisan 2026 itibarıyla doğru olmalı. Başkan/cumhurbaşkanı isimleri, nüfus ve GSYH rakamları güncel kaynaklardan alınmalı. Emin olmadığın rakamlar için **uydurma yapma, kullanıcıya sor**.

---

## 🗺️ ÜLKE DETAY SAYFASI (`/country/:id`)

- Ülke bayrağı (emoji, büyük boy), adı ve kısa açıklama üstte.
- Grid düzeninde bilgi kartları: Başkent, Devlet/Hükümet Başkanı, Nüfus, GSYH.
- Üye olduğu organizasyonlar rozet (badge) olarak listelenir.
- "← Küreye Dön" butonu üstte sol köşede (`useNavigate(-1)` veya `to="/"`).
- Framer Motion ile sayfa geçişinde `fade-in + slide-up` animasyonu.

---

## 📚 Uİ TEORİLERİ BÖLÜMÜ

`src/data/theories.js` dosyasında tam olarak aşağıdaki **10 teori** yer alacak. İçerik, kullanıcının yüklediği `ui_teorileri_rehberi.docx` dosyasına birebir sadık olacak — **özetleme, genişletme veya yorumlama yapılmayacaktır.**

Her teori için şu alanlar olacak:

```javascript
{
  id: "realism",
  number: "1",
  title: "REALİZM (Gerçekçilik)",
  summary: "Dünya tehlikeli bir yerdir. Devletler güçlerini artırmak ve hayatta kalmak zorundadır.",
  coreIdea: "...",        // "Temel Fikir" metni
  keyConcepts: [...],     // "Temel Kavramlar" madde dizisi
  subSchools: [...],      // "Alt Akımlar" (varsa)
  thinkers: [             // "Önemli Düşünürler"
    { name: "...", description: "..." }
  ],
  relations: "...",       // "Diğer Teorilerle İlişkisi"
  criticisms: [...]       // "Eleştiriler"
}
```

### İçerikler (kaynak dosyadan birebir aktarılacak):

**1. REALİZM** — Anarşi, ulusal çıkar, güç dengesi, güvenlik ikilemi. Alt akımlar: Klasik Realizm, Yapısal Realizm (Neorealizm), Saldırgan Realizm. Düşünürler: Thucydides, Machiavelli, Morgenthau, Waltz.

**2. LİBERALİZM** — İşbirliği mümkündür. Karşılıklı bağımlılık, demokratik barış, uluslararası kurumlar, insan hakları. Alt akımlar: Klasik Liberalizm, Neoliberal Kurumsalcılık, Karmaşık Karşılıklı Bağımlılık. Düşünürler: Kant, Keohane, Doyle.

**3. İNŞACILIK (Constructivism)** — Gerçeklik sosyal olarak inşa edilir. Sosyal inşa, kimlik ve çıkar, normlar, söylem ve dil. Düşünürler: Wendt, Katzenstein, Finnemore.

**4. MARKSİZM VE ELEŞTİREL TEORİLER** — Sınıf çatışması ve ekonomik güç ilişkileri. Dünya sistemi, emperyalizm, hegemonya. Düşünürler: Marx & Engels, Lenin, Wallerstein, Cox.

**5. POSTKOLONYALİZM** — Batı merkezli bakış açısının sorgulanması. Oryantalizm, dekolonizasyon, sessizlik. Düşünürler: Said, Fanon, Spivak.

**6. FEMİNİST ULUSLARARASI İLİŞKİLER** — Cinsiyet ilişkileri ve uluslararası politika. Toplumsal cinsiyet, güvenliğin yeniden tanımı, askeri milliyetçilik. Düşünürler: Tickner, Enloe, Sylvester.

**7. İNGİLİZ OKULU (Uluslararası Toplum Teorisi)** — Realizm ve liberalizm arasında orta yol. Uluslararası sistem, uluslararası toplum, dünya toplumu, kurumlar. Düşünürler: Bull, Wight, Buzan.

**8. POST-YAPISALCILIK VE POSTMODERNİZM** — Nesnel gerçeklik ve evrensel doğru iddialarının sorgulanması. Düşünürler: Foucault, Derrida, Campbell.

**9. GÜVENLİK ÇALIŞMALARI: KOPENHAGEN OKULU** — Güvenliğin yeniden tanımı ve güvenlikleştirme. Beş sektör: askeri, siyasi, ekonomik, toplumsal, çevresel. Düşünürler: Buzan, Wæver.

**10. TEORİLERİN KARŞILAŞTIRMASI** — Karşılaştırma tablosu (Realizm, Liberalizm, İnşacılık, Marksizm, Postkolonyal, Feminist, İngiliz Okulu, Post-yapısalcılık için: Ana soru / Temel aktör / İşbirliği mümkün mü?). Bu son bölüm **tablo bileşeni** olarak ayrı render edilecek.

> **İçerik kullanım kuralı:** Kullanıcı teori içeriklerini docx dosyasından birebir alınmasını istiyor. Metinleri parafraz etme, kısaltma veya "daha akıcı" hale getirme. Orijinal cümleleri koru.

### Görsel Sunum

- Her teori, ekranı tam kaplayan bir `section` halinde scroll ile açılacak.
- Sol tarafta büyük teori numarası (örn. "01", "02"), sağ tarafta içerik.
- Başlık, özet (callout box, sarı/amber arka planla), temel fikir, kavramlar, düşünürler (kart grid), ilişkiler ve eleştiriler sırayla.
- Framer Motion `whileInView` ile her bölümde `fade-in + slide` animasyonu.
- Bölümler arası pürüzsüz geçiş için `scroll-snap` veya benzeri teknik kullanılabilir (scroll-experience skill'inin önerdiği yaklaşımı takip et).
- Sağ kenarda sabit bir "teori navigatörü" (10 noktadan oluşan dikey progress) — hangi teoride olduğunu gösterir, tıklanırsa o teoriye scroll atar.

---

## 🎨 TASARIM YÖNERGELERİ

- **Renk paleti:**
  - Arka plan: koyu tonlar (`#0a0a0a`, `#111827`, `#1f2937`)
  - Metin: beyaz/açık gri (`#f9fafb`, `#d1d5db`)
  - Vurgu: amber (`#f59e0b`) veya emerald (`#10b981`) — callout, linkler
  - Küre ülke dolgusu: `#9ca3af` (gri)
  - Küre ülke sınırı: `#000000` (siyah)
- **Tipografi:**
  - Başlıklar: `Inter`, `Poppins` veya `Space Grotesk` (Google Fonts'tan)
  - Gövde: `Inter` 400/500
  - Teori numaraları: büyük, mono font (`JetBrains Mono` veya `IBM Plex Mono`), `font-weight 700`
- **Animasyon prensipleri:**
  - Kısa ve amaçlı: 300–600ms
  - `ease-in-out` veya `cubic-bezier(0.4, 0, 0.2, 1)`
  - Gereksiz parlaklık efektleri ve glow yok
  - Mobil uyumluluk için `prefers-reduced-motion` kontrolü

---

## 🔀 ROUTING

`src/router.jsx`:

```javascript
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/country/:id", element: <CountryPage /> },
]);
```

---

## 🧭 İŞ AKIŞI (Claude Code için adım-adım)

Kullanıcı sana çalışmaya başlamanı söylediğinde aşağıdaki sırayı takip et. **Her adımda tek bir şey yap, sonra dur ve kullanıcıdan onay bekle.**

1. Vite ile React 18 projesini kur (`npm create vite@latest . -- --template react`).
2. Tailwind'i kur ve `tailwind.config.js` + `index.css` yapılandır.
3. `react-router-dom`, `three`, `@react-three/fiber`, `@react-three/drei`, `d3-geo`, `topojson-client`, `framer-motion` paketlerini `package.json`'a ekle.
4. Klasör iskeletini oluştur (boş dosyalarla).
5. `src/data/countries.js` dosyasını oluştur (30 ülke).
6. `src/data/theories.js` dosyasını oluştur (10 teori, docx içeriğine birebir sadık).
7. `Globe3D.jsx` bileşenini yaz.
8. `HomePage.jsx`'te küreyi ve teori bölümlerini yerleştir.
9. `CountryPage.jsx`'i yaz.
10. `TheorySection.jsx` ve `TheoryNavigator.jsx` bileşenlerini yaz.
11. Router'ı bağla.
12. Stil ve animasyonları uygula.

**Her adım sonunda:** "✅ Adım X tamamlandı. Devam edeyim mi?" diye sor, **kendi kendine devam etme.**

---

## ⚠️ HATA YÖNETİMİ (tekrar vurgu)

Terminalde gördüğün ilk hata mesajında:

1. **DUR.** Başka komut çalıştırma.
2. Hatayı olduğu gibi kullanıcıya göster.
3. "Ne yapmamı istersiniz?" diye sor.
4. **Kullanıcıdan net bir talimat gelene kadar bekle.**

Yasaklı davranışlar:
- ❌ "Bu hatayı düzeltmek için X paketini deneyelim" → YAPMA, kullanıcıya sor.
- ❌ "Versiyonu düşürelim" → YAPMA, kullanıcıya sor.
- ❌ `sleep`, `tail -f`, sürekli çalışan komutlar → YAPMA.
- ❌ `npm run dev`'i kendi başlatmak → YAPMA, kullanıcı kendi terminalinde başlatır.

---

## 📝 NOT

Bu `CLAUDE.md` dosyası projenin anayasasıdır. Kullanıcı herhangi bir şey sorduğunda, önce bu dosyaya bakarsın. Burada yazan kurallar başka hiçbir talimatla (genel AI en iyi uygulamaları, popüler framework önerileri vb.) değiştirilemez.

**Son kontrol:** Başlamadan önce kullanıcıya şu soruyu sor:
> "CLAUDE.md dosyasını okudum. Kurulum adımına (Adım 1: Vite ile React 18 projesi) başlayabilir miyim?"
