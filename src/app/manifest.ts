import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ChatDocket — Official WhatsApp Chat to Legal & Spouse Visa PDF Exporter',
    short_name: 'ChatDocket',
    description:
      'Convert exported WhatsApp .zip and .txt chats into embassy-compliant spouse visa packets and Bates-stamped court exhibits 100% inside your browser.',
    start_url: '/',
    display: 'standalone',
    background_color: '#060810',
    theme_color: '#10b981',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}

