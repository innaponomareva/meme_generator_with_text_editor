<script setup lang="ts">
import clsx from "clsx";
import { IOption } from "../models/models";

interface ButtonProps {
  label?: string;
  border?: true;
  icon?: string[];
  option?: IOption;
  active?: boolean;
  onClick?: (option?: IOption) => void;
}
const { label, icon, active, onClick } = defineProps<ButtonProps>();
</script>

<template>
  <button
    type="button"
    @click="onClick(option && option)"
    :class="border && 'border'"
  >
    <span v-if="label" class="btn-label">{{ label }}</span>
    <font-awesome-icon
      v-if="icon"
      :icon="icon"
      :class="clsx('icon', active && 'icon-active')"
    />
  </button>
</template>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  color: rgba(103, 108, 113, 0.5);
  padding: 0.4rem;
  cursor: pointer;
}
.border {
  border: 1px solid #676c71;
}
.icon {
  font-size: 1rem;
  color: rgba(103, 108, 113, 0.6);
}
.icon-active,
.btn-label {
  color: #676c71;
}
.btn-label {
  font-size: 0.9rem;
}
</style>
