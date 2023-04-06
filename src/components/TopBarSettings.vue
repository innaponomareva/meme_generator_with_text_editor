<script setup lang="ts">
import Dropdown from "./Dropdown.vue";
import Button from "./Button.vue";
import { defaultFontDecoration, fontDecorations } from "../lib/fd";
import { fontFamilies } from "../lib/ff";
import { fontSizes } from "../lib/fs";
import { defaultFontStyle, fontStyles } from "../lib/fst";
import { defaultFontWeight, fontWeights } from "../lib/fw";
import { defaultParagraphAlignment, paragraphAlignments } from "../lib/pa";
import { CategoryType, IOption, ISettingMap } from "../models/models";
import { paragraphLineHeights } from "../lib/plh";

interface TopBarSettingsProps {
  settingMap: ISettingMap;
  setIsChanged: (
    category: CategoryType.font | CategoryType.paragraph,
    status: boolean
  ) => void;
  setSettingMap: (
    category: CategoryType.font | CategoryType.paragraph,
    key: string,
    option: IOption
  ) => void;
}

const { settingMap, setIsChanged, setSettingMap } =
  defineProps<TopBarSettingsProps>();

const onFontFamilyChange = (option: IOption) => {
  setSettingMap(CategoryType.font, "ff", option);
  setIsChanged(CategoryType.font, true);
};
const onFontSizeChange = (option: IOption) => {
  setSettingMap(CategoryType.font, "fs", option);
  setIsChanged(CategoryType.font, true);
};
const onFontWeightChange = (option: IOption) => {
  setSettingMap(
    CategoryType.font,
    "fw",
    settingMap.font.fw.class
      ? settingMap.font.fw.class === defaultFontWeight.class
        ? option
        : defaultFontWeight
      : option
  );
  setIsChanged(CategoryType.font, true);
};
const onFontStyleChange = (option: IOption) => {
  setSettingMap(
    CategoryType.font,
    "fst",
    settingMap.font.fst.class
      ? settingMap.font.fst.class === defaultFontStyle.class
        ? option
        : defaultFontStyle
      : option
  );
  setIsChanged(CategoryType.font, true);
};
const onFontDecorationChange = (option: IOption) => {
  setSettingMap(
    CategoryType.font,
    "fd",
    settingMap.font.fd.class
      ? settingMap.font.fd.class === defaultFontDecoration.class
        ? option
        : defaultFontDecoration
      : option
  );
  setIsChanged(CategoryType.font, true);
};
const onParagraphAlignmentChange = (option: IOption) => {
  setSettingMap(CategoryType.paragraph, "pa", option);
  setIsChanged(CategoryType.paragraph, true);
};

const onParagraphLineHeightChange = (option: IOption) => {
  setSettingMap(CategoryType.paragraph, "plh", option);
  setIsChanged(CategoryType.paragraph, true);
};
</script>

<template>
  <div class="settings">
    <Dropdown
      :options="fontFamilies"
      :selectedOption="settingMap.font.ff"
      :icon="['fa', 'font']"
      :btn-large="true"
      :onOptionClick="onFontFamilyChange"
    />
    <Dropdown
      :options="fontSizes"
      :selectedOption="settingMap.font.fs"
      :icon="['fa', 'text-height']"
      :btn-large="true"
      :onOptionClick="onFontSizeChange"
    />
    <Dropdown
      :options="paragraphLineHeights"
      :selectedOption="settingMap.paragraph.plh"
      :onOptionClick="onParagraphLineHeightChange"
    />
    <Button
      :icon="['fa', 'bold']"
      :option="fontWeights[1]"
      :active="
        settingMap.font.fw && settingMap.font.fw.class === fontWeights[1].class
      "
      :onClick="onFontWeightChange"
    />
    <Button
      :icon="['fa', 'italic']"
      :option="fontStyles[1]"
      :active="
        settingMap.font.fst && settingMap.font.fst.class === fontStyles[1].class
      "
      :onClick="onFontStyleChange"
    />
    <Button
      :icon="['fa', 'underline']"
      :option="fontDecorations[1]"
      :active="
        settingMap.font.fd &&
        settingMap.font.fd.class === fontDecorations[1].class
      "
      :onClick="onFontDecorationChange"
    />
    <Button
      :icon="['fa', 'align-left']"
      :option="defaultParagraphAlignment"
      :onClick="onParagraphAlignmentChange"
      :active="
        settingMap.paragraph.pa &&
        settingMap.paragraph.pa.class === defaultParagraphAlignment.class
      "
    />
    <Button
      :icon="['fa', 'align-center']"
      :option="paragraphAlignments[1]"
      :onClick="onParagraphAlignmentChange"
      :active="
        settingMap.paragraph.pa &&
        settingMap.paragraph.pa.class === paragraphAlignments[1].class
      "
    />
    <Button
      :icon="['fa', 'align-right']"
      :option="paragraphAlignments[2]"
      :onClick="onParagraphAlignmentChange"
      :active="
        settingMap.paragraph.pa &&
        settingMap.paragraph.pa.class === paragraphAlignments[2].class
      "
    />
  </div>
</template>

<style>
.settings {
  display: flex;
  gap: 0.5rem;
}
</style>
