# UIKT - Uluslararası İlişkiler ve Kariyer Topluluğu

UIKT'nin akademik tanıtım sitesi. 3D dünya küresi üzerinden 30 ülkeyi keşfetmenizi ve uluslararası ilişkiler teorilerini öğrenmenizi sağlar.

## Özellikler

- Etkileşimli 3D dünya küresi (react-globe.gl ile)
- 30 ülke detay sayfası (başkent, başkan, nüfus, GSYH, üye olduğu kurumlar)
- 10 uluslararası ilişkiler teorisi (Realizm, Liberalizm, İnşacılık, Marksizm vd.)
- Scroll-tabanlı animasyonlar (Framer Motion)
- Tam mobil uyumlu tasarım

## Teknoloji Yığını

- React 18 + Vite + Tailwind CSS
- React Router DOM
- Three.js + react-globe.gl
- Framer Motion

## Geliştirme

```bash
npm install
npm run dev
```

Site http://localhost:5173 adresinde açılır.

## Proje Yapısı

```
src/
├── data/
│   ├── countries.js        # 30 ülke verisi
│   └── theories.js         # 10 uluslararası ilişkiler teorisi
├── pages/
│   ├── HomePage.jsx        # Ana sayfa (Hakkımızda + Küre + Teoriler)
│   └── CountryPage.jsx     # Ülke detay sayfası (/country/:id)
├── components/
│   ├── Globe3D.jsx         # 3D dünya küresi
│   ├── AboutSection.jsx    # Hakkımızda / Vizyon / Misyon kartları
│   ├── TheorySection.jsx   # Teori içerik bölümü
│   ├── TheoryNavigator.jsx # Sağ kenar scroll navigatörü (12 bölüm)
│   ├── CountryCard.jsx     # Ülke özet kartı
│   ├── Navbar.jsx          # Üst gezinme çubuğu
│   └── Footer.jsx          # Alt bilgi (iletişim + sosyal medya)
├── hooks/
│   └── useScrollAnimation.js
├── router.jsx              # React Router yapılandırması
├── main.jsx
├── App.jsx
└── index.css
public/
└── world-110m.json         # TopoJSON dünya haritası
```

## İletişim

- E-posta: uluslararasiiliskilervekariyer@gmail.com
- Instagram: [@banu.uikt](https://www.instagram.com/banu.uikt/)
- X: [@uiktnews](https://x.com/uiktnews)
- LinkedIn: [UIKT Grubu](https://www.linkedin.com/groups/9888043/)
- WhatsApp: [Gruba Katıl](https://chat.whatsapp.com/IXohgyDG2hN0J0CC1Z8HE0)
