// ponytail: satu file dataengganti CMS sampai Fase 3 PRD (Decap). Nanti pindah ke content collections.
export const SITE = {
  name: 'BITOMBANG',
  url: 'https://bitombang.com',
  tagline: 'Photographer',
  location: 'Melbourne, Australia',
  email: 'manaaki.studio.id@gmail.com',
  whatsapp: '61466377242',
  instagram: 'https://instagram.com/bitombang',
  // daftar gratis di web3forms.com lalu taruh access key di sini
  web3formsKey: 'a6bde9d7-6e6b-4c57-9ef6-80bf41c547ac',
};

export type Photo = { src: string; alt: string; w: number; h: number };

const pic = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const COLLECTION: Photo[] = [
  { src: pic('bt-c1', 700, 950), alt: 'Portrait at dusk', w: 700, h: 950 },
  { src: pic('bt-c2', 700, 480), alt: 'Morning fog in the valley', w: 700, h: 480 },
  { src: pic('bt-c3', 700, 700), alt: 'Studio portrait', w: 700, h: 700 },
  { src: pic('bt-c4', 700, 1000), alt: 'Traditional wedding', w: 700, h: 1000 },
  { src: pic('bt-c5', 700, 520), alt: 'South coast', w: 700, h: 520 },
  { src: pic('bt-c6', 700, 880), alt: 'Fabric editorial', w: 700, h: 880 },
  { src: pic('bt-c7', 700, 600), alt: 'City street at night', w: 700, h: 600 },
  { src: pic('bt-c8', 700, 920), alt: 'Prewedding in the rice fields', w: 700, h: 920 },
  { src: pic('bt-c9', 700, 500), alt: 'Misty mountains', w: 700, h: 500 },
  { src: pic('bt-c10', 700, 760), alt: 'Mother and child portrait', w: 700, h: 760 },
  { src: pic('bt-c11', 700, 640), alt: 'Morning market', w: 700, h: 640 },
  { src: pic('bt-c12', 700, 980), alt: 'Bride waiting', w: 700, h: 980 },
];

export type Project = {
  slug: string;
  title: string;
  meta: string;
  desc: string;
  cover: Photo;
  photos: Photo[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'dusk-at-bromo',
    title: 'Dusk at Bromo',
    meta: 'Landscape · Bromo, 2026',
    desc: 'A three-day trip chasing light in the Tengger caldera — from the sea of sand to the Penanjakan viewpoint.',
    cover: { src: pic('bt-p1-cover', 900, 650), alt: 'Bromo at dusk', w: 900, h: 650 },
    photos: [1, 2, 3, 4, 5, 6].map((n) => ({
      src: pic(`bt-p1-${n}`, 800, n % 2 ? 1050 : 600),
      alt: `Dusk at Bromo ${n}`,
      w: 800,
      h: n % 2 ? 1050 : 600,
    })),
  },
  {
    slug: 'andi-sari-prewedding',
    title: 'Andi & Sari Prewedding',
    meta: 'Wedding · Rice terraces, 2025',
    desc: 'A relaxed two-hour session in the rice fields — no stiff poses, mostly candids and laughter.',
    cover: { src: pic('bt-p2-cover', 900, 650), alt: 'Andi and Sari', w: 900, h: 650 },
    photos: [1, 2, 3, 4, 5].map((n) => ({
      src: pic(`bt-p2-${n}`, 800, n % 2 ? 600 : 1000),
      alt: `Prewedding Andi & Sari ${n}`,
      w: 800,
      h: n % 2 ? 600 : 1000,
    })),
  },
  {
    slug: 'batik-editorial',
    title: 'Batik Editorial',
    meta: 'Portrait · Studio, 2025',
    desc: 'A studio series framing batik as contemporary fashion — one light, grey backdrop.',
    cover: { src: pic('bt-p3-cover', 900, 650), alt: 'Batik editorial', w: 900, h: 650 },
    photos: [1, 2, 3, 4].map((n) => ({
      src: pic(`bt-p3-${n}`, 800, n % 2 ? 1000 : 620),
      alt: `Batik editorial ${n}`,
      w: 800,
      h: n % 2 ? 1000 : 620,
    })),
  },
];

export const AWARDS = [
  { year: '2025', text: '2nd Place, Cultural Photography Contest — Nusantara Festival' },
  { year: '2024', text: 'Solo exhibition “Land & Light” — Galeri Kita' },
  { year: '2023', text: 'Official photographer — Java Wedding Expo' },
];
