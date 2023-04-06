<script setup lang="ts">
interface CheckboxProps {
  name: string;
  value?: string;
  checked: boolean;
  label: string;
  onChange: () => void;
}
const {
  name,
  value = "0",
  checked,
  label,
  onChange,
} = defineProps<CheckboxProps>();
</script>

<template>
  <div class="checkbox">
    <div class="input-container">
      <input
        type="checkbox"
        :id="`${name}-${value}`"
        :name="name"
        :value="value"
        :checked="checked"
        @change="onChange"
      />
      <font-awesome-icon v-if="checked" :icon="['fa', 'check']" class="icon" />
    </div>

    <label :for="`${name}-${value}`">{{ label }}</label>
  </div>
</template>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.input-container {
  width: fit-content;
  position: relative;
}
.icon {
  font-size: 0.8rem;
  color: #676c71;
  position: absolute;
  inset: 0;
  z-index: 0;
  padding: 0.1rem;
}

input[type="checkbox"] {
  appearance: none;
  display: block;
  margin: 0;
  width: 1rem;
  height: 1rem;
  border: 1px solid #676c71;
  position: relative;
  z-index: 10;
  cursor: pointer;
}
</style>
