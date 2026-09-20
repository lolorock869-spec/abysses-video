

import {Composition, getInputProps} from 'remotion';
import {AbyssVideo} from './AbyssVideo';
import {z} from 'zod';

const sceneSchema = z.object({
  imageUrl: z.string(),
  audioUrl: z.string(),
  text: z.string(),
  durationInFrames: z.number(),
});

const schema = z.object({
  scenes: z.array(sceneSchema),
});

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AbyssVideo"
      component={AbyssVideo}
      fps={30}
      width={1080}
      height={1920}
      schema={schema}
      defaultProps={{
        scenes: [
          {
            imageUrl: "https://picsum.photos/1080/1920",
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            text: "Le poisson-vipere vit a plus de 1500 metres de profondeur.",
            durationInFrames: 150,
          },
        ],
      }}
      calculateMetadata={async ({props}) => {
        const total = props.scenes.reduce(
          (sum, s) => sum + s.durationInFrames,
          0,
        );
        return {durationInFrames: total || 30};
      }}
    />
  );
};