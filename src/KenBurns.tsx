import {AbsoluteFill, Img, useCurrentFrame, interpolate} from 'remotion';

type Props = {
  src: string;
  durationInFrames: number;
  zoomOut?: boolean;
};

export const KenBurns: React.FC<Props> = ({src, durationInFrames, zoomOut}) => {
  const frame = useCurrentFrame();

  const scale = zoomOut
    ? interpolate(frame, [0, durationInFrames], [1.18, 1], {extrapolateRight: 'clamp'})
    : interpolate(frame, [0, durationInFrames], [1, 1.18], {extrapolateRight: 'clamp'});

  const translateX = zoomOut
    ? interpolate(frame, [0, durationInFrames], [20, 0], {extrapolateRight: 'clamp'})
    : interpolate(frame, [0, durationInFrames], [0, -20], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translateX(${translateX}px)`,
        }}
      />
    </AbsoluteFill>
  );
};