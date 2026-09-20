import {
  AbsoluteFill,
  Audio,
  Sequence,
  useVideoConfig,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import {z} from 'zod';
import {KenBurns} from './KenBurns';
import {AbyssOverlay} from './AbyssOverlay';
import {Watermark} from './Watermark';

const sceneSchema = z.object({
  imageUrl: z.string(),
  audioUrl: z.string(),
  text: z.string(),
  durationInFrames: z.number(),
});

const schema = z.object({
  scenes: z.array(sceneSchema),
});

export const AbyssVideo: React.FC<z.infer<typeof schema>> = ({scenes}) => {
  let startFrame = 0;

  return (
    <AbsoluteFill style={{backgroundColor: 'black'}}>
      {scenes.map((scene, i) => {
        const from = startFrame;
        startFrame += scene.durationInFrames;

        return (
          <Sequence key={i} from={from} durationInFrames={scene.durationInFrames}>
            <SceneContent scene={scene} index={i} />
          </Sequence>
        );
      })}
      <AbyssOverlay />
      <Watermark />
    </AbsoluteFill>
  );
};

const SceneContent: React.FC<{
  scene: z.infer<typeof sceneSchema>;
  index: number;
}> = ({scene, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, fps * 0.5, scene.durationInFrames - fps * 0.5, scene.durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <AbsoluteFill>
      <KenBurns
        src={scene.imageUrl}
        durationInFrames={scene.durationInFrames}
        zoomOut={index % 2 === 1}
      />
      <Audio src={scene.audioUrl} />
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 120,
          opacity,
        }}
      >
        <div
          style={{
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 700,
            fontSize: 42,
            textAlign: 'center',
            maxWidth: '80%',
            textShadow: '0 3px 10px rgba(0,0,0,0.8)',
          }}
        >
          {scene.text}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};