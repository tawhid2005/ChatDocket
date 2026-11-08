import { ImageResponse } from 'next/og';

export const alt = 'ChatDocket — Official WhatsApp to Legal & Spouse Visa PDF Exporter';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#060810',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(163, 230, 53, 0.12) 0%, transparent 50%)',
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: '#090E17',
              border: '2px solid #10B981',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#A3E635',
                borderRadius: '6px',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.5px',
              }}
            >
              Chat<span style={{ color: '#34D399' }}>Docket</span>
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#A3E635',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              100% Client-Side RAM Processing
            </span>
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '1000px' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-1.5px',
            }}
          >
            WhatsApp Chat to Official{' '}
            <span style={{ color: '#34D399' }}>Spouse Visa &amp; Legal</span> PDF Exporter
          </h1>
          <p
            style={{
              fontSize: '22px',
              color: '#94A3B8',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Turn WhatsApp .zip &amp; .txt exports into court-ready exhibits and embassy dossiers with Bates numbering, SHA-256 hash validation &amp; smart sampling.
          </p>
        </div>

        {/* Bottom Trust Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '28px',
            width: '100%',
          }}
        >
          <span style={{ fontSize: '16px', color: '#CBD5E1', fontWeight: 600 }}>
            🏛️ UK Home Office (Appendix FM)
          </span>
          <span style={{ fontSize: '16px', color: '#CBD5E1', fontWeight: 600 }}>
            🇺🇸 US USCIS (Form I-130)
          </span>
          <span style={{ fontSize: '16px', color: '#CBD5E1', fontWeight: 600 }}>
            🇨🇦 Canada IRCC (IMM 5289)
          </span>
          <span style={{ fontSize: '16px', color: '#A3E635', fontWeight: 700 }}>
            🔒 Zero Server Uploads
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
