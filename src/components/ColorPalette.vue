<script setup lang="ts">
import { CategoryType, IImageSize, IOption } from "../models/models";

interface ColorPaletteProps {
  imageSize: IImageSize;
  colors: IOption[];
  onColorPaletteBtnClick: (option: IOption) => void;
}

const { colors, onColorPaletteBtnClick } = defineProps<ColorPaletteProps>();
</script>

<template>
  <div class="color-palette">
    <div
      v-for="color in colors"
      :key="color.name"
      :style="{
        backgroundColor: color.value,
      }"
      @click="() => onColorPaletteBtnClick(color)"
    ></div>
  </div>
</template>

<style>
.color-palette {
  display: flex;

  justify-content: space-between;
  gap: 0.5rem;
  overflow: scroll;
}

.color-palette div {
  min-width: 32px;
  min-height: 32px;
  cursor: pointer;
  border: 0.5px solid #676c71;
}
</style>
