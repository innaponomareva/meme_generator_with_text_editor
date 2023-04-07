<script setup lang="ts">
import clsx from "clsx";

interface ColorPickerProps {
  id: string;
  activeColor: string;
  onColorPickerChange: (value: string) => void;
}
const { activeColor, onColorPickerChange } = defineProps<ColorPickerProps>();

const onInput = (event: InputEvent) => {
  const input = event.target as HTMLInputElement;
  onColorPickerChange(input.value);
};
</script>

<template>
  <input
    :id="id"
    type="color"
    :name="id"
    :value="activeColor"
    @input="onInput"
  />
</template>

<style scoped>
input[type="color"] {
  appearance: none;
  border: none;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0.2rem;
  cursor: pointer;
}
input[type="color"] {
  border: 1px solid #676c71;
}
</style>
