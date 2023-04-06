<script setup lang="ts">
import clsx from "clsx";
interface FileInputProps {
  id: string;
  accept: string;
  label?: string;
  icon?: string[];
  border?: boolean;
  onChange: (event: Event) => void;
}
const props = defineProps<FileInputProps>();
</script>

<template>
  <div class="file-input-container">
    <label
      for="fileInput"
      :class="clsx('custom-file-upload', border && 'border')"
    >
      <p v-if="label">{{ label }}</p>
      <font-awesome-icon v-if="icon" :icon="icon" class="icon" />
      <input
        :id="id"
        type="file"
        :name="id"
        :accept="accept"
        @change="onChange"
      />
    </label>
  </div>
</template>

<style scoped>
.icon {
  font-size: 1.1rem;
  color: #676c71;
}
.file-input-container {
  display: flex;
  flex-direction: column;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: #676c71;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
}

.border {
  border: 1px solid #676c71;
}
</style>
