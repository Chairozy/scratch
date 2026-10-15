import { For, Show, type Component } from "solid-js";

export interface StageSpot {
  name: string;
  image: string;
  x: number;
  y: number;
}

interface StageMapProps {
  backdrop?: string;
  spots: StageSpot[];
}

const toLeft = (x: number) => ((x + 240) / 480) * 100;
const toTop = (y: number) => ((180 - y) / 360) * 100;

const StageMap: Component<StageMapProps> = (props) => (
  <div class="relative aspect-[4/3] w-full overflow-hidden border-2 border-black">
    <Show
      when={props.backdrop}
      fallback={<div class="absolute inset-0 bg-neutral-100" />}
    >
      {(src) => (
        <img
          src={src()}
          alt="Latar panggung"
          class="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </Show>
    <For each={props.spots}>
      {(s) => (
        <div
          class="absolute w-[16%]"
          style={{
            left: `${toLeft(s.x)}%`,
            top: `${toTop(s.y)}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={s.image} alt={s.name} class="w-full" />
        </div>
      )}
    </For>
  </div>
);

export default StageMap;
