import type { Component } from "solid-js";
import ScratchBlocks from "./ScratchBlocks";

const MoveArrowDemo: Component = () => (
  <div class="move-demo">
    <div class="move-item">
      <div class="move-stage">
        <img src="sprites/kucing.svg" alt="Scratch Cat" class="move-cat" />
        <svg
          class="move-arrow-layer"
          width="100"
          height="16"
          viewBox="0 0 100 16"
          aria-hidden="true"
        >
          <line class="move-arrow-line" x1="0" y1="8" x2="86" y2="8" stroke-width="8" />
          <path class="move-arrow-head" d="M86 0 L100 8 L86 16 Z" />
        </svg>
      </div>
      <p class="move-caption">Arah gerak saat direction = 90</p>
      <div class="move-block">
        <ScratchBlocks code="move (10) steps" scale={0.9} />
      </div>
    </div>

    <div class="move-item">
      <div class="move-stage">
        <img src="sprites/kucing.svg" alt="Scratch Cat" class="move-cat" />
        <svg
          class="move-turn-layer"
          width="210"
          height="210"
          viewBox="0 0 210 210"
          aria-hidden="true"
        >
          <path
            class="move-turn-arc"
            d="M74.9 187.7 A88 88 0 1 1 135.1 187.7"
            stroke-width="8"
            fill="none"
          />
          <g transform="translate(135.1 187.7) rotate(160)">
            <path class="move-turn-head" d="M0 0 L-18 -9 L-18 9 Z" />
          </g>
        </svg>
      </div>
      <p class="move-caption">Berputar 15 derajat searah jarum jam</p>
      <div class="move-block">
        <ScratchBlocks code="turn cw (15) degrees" scale={0.9} />
      </div>
    </div>

    <p class="move-hint print-hidden">
      Arahkan kursor ke blok untuk melihat arah gerak atau putaran.
    </p>
  </div>
);

export default MoveArrowDemo;
