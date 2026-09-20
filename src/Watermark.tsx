import {AbsoluteFill} from 'remotion';

export const Watermark: React.FC<{label?: string}> = ({label = '@TonCompteYouTube'}) => {
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 30,
          color: 'rgba(255,255,255,0.55)',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 1,
          textShadow: '0 2px 6px rgba(0,0,0,0.6)',
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};