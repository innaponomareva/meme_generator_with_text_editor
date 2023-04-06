<script setup lang="ts">
import clsx from "clsx";
import { toRefs } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { IOption } from "../models/models";

interface DropdownProps {
  options: IOption[];
  selectedOption: IOption;
  icon?: string[];
  btnLarge?: boolean;
  onOptionClick?: (opt: IOption) => void;
}

const props = defineProps<DropdownProps>();
const { selectedOption } = toRefs(props);
</script>

<template>
  <Listbox
    as="div"
    v-model="selectedOption.name"
    class="listbox"
    v-slot="{ open }"
  >
    <ListboxButton :class="clsx('listbox-btn', btnLarge && 'btn-large')">
      <span
        ><font-awesome-icon v-if="icon" :icon="icon" />{{
          selectedOption.name
        }}</span
      >

      <font-awesome-icon
        v-if="open"
        :icon="['fa', 'chevron-up']"
        class="icon"
      />
      <font-awesome-icon v-else :icon="['fa', 'chevron-down']" class="icon" />
    </ListboxButton>
    <ListboxOptions class="listbox-options">
      <ListboxOption
        v-for="option in options"
        :key="option.name"
        :value="option.name"
        as="template"
        v-slot="{ active, selected }"
      >
        <li
          :class="clsx('listbox-option', selected && 'listbox-option-selected')"
          @click="onOptionClick ? onOptionClick(option) : null"
        >
          <span>{{ option.name }}</span>
          <font-awesome-icon
            v-show="selected"
            :icon="['fa', 'check']"
            class="icon"
          />
        </li>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<style scoped>
.listbox {
  position: relative;
}
.listbox-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  border: 1px solid #676c71;
  font-size: 0.9rem;
  color: #676c71;
  padding: 0.5rem;
  cursor: pointer;
  gap: 1rem;
}
.listbox-btn span {
  height: 1rem;
  overflow-y: hidden;
  display: flex;
  text-align: left;
  gap: 1rem;
}

.btn-large {
  width: 9rem;
}

.listbox-btn p span {
  height: 1rem;
  overflow: hidden;
}
.listbox-options {
  padding: 0.5rem 0;
  position: absolute;
  z-index: 10;
  background-color: white;
  border: 1px solid #676c71;
  border-top: none;
  left: 0;
  right: 0;
}
.listbox-option {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  color: #676c71;
}
.listbox-option-selected {
  font-weight: bold;
}
.listbox-option:hover {
  background-color: #adb5bd31;
}
.icon {
  font-size: 0.8rem;
}
</style>
