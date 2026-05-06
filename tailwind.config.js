/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
          accentLight: '#7ab8ff',  // koyu zeminde okunabilir açık mavi vurgu
          gold: '#d4a017',
        },
        globe: {
          fill: '#9ca3af',
          border: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
