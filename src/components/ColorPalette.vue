<script setup lang="ts">
import { IOption } from "../models/models";

interface ColorPaletteProps {
  colors: IOption[];
  // activeColor: string;
  // onColorPickerChange: (value: string) => void;
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
  width: 100%;
  display: flex;
  gap: 0.5rem;
  overflow-x: scroll;
}

.color-palette div {
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  cursor: pointer;
  border: 0.5px solid #676c71;
}
</style>
