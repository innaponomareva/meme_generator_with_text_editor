<script setup lang="ts">
import { ref, reactive, onMounted, watch, onUnmounted } from "vue";
import {
  IOption,
  ISettingMap,
  IIsChanged,
  CategoryType,
  InputFileEvent,
  ISettingOptionsMap,
} from "./models/models";
import FileInput from "./components/FileInput.vue";
import Button from "./components/Button.vue";
import ColorPalette from "./components/ColorPalette.vue";
import ColorPicker from "./components/ColorPicker.vue";
import TextspacesBox from "./components/TextspacesBox.vue";
import TopBarSettings from "./components/TopBarSettings.vue";
import Checkbox from "./components/Checkbox.vue";
import { defaultFontFamily, fontFamilies } from "./lib/ff";
import { defaultFontSize, fontSizes } from "./lib/fs";
import { defaultFontWeight, fontWeights } from "./lib/fw";
import { defaultFontStyle, fontStyles } from "./lib/fst";
import { defaultFontDecoration, fontDecorations } from "./lib/fd";
import { defaultParagraphAlignment, paragraphAlignments } from "./lib/pa";
import { defaultFontColor, fontColors } from "./lib/fc";
import { defaultParagraphLineHeight, paragraphLineHeights } from "./lib/plh";
import { createCanvas, onCanvasDownload, onFileChanged } from "./utils/canvas";

const canvas = ref(null);
const ratio = ref(2);
const showTextGrid = ref(true);
const imageSize = reactive({ width: 500, height: 500 });
const activeColor = ref("#000000");

const settingMap = reactive<ISettingMap>({
  font: {
    fc: { ...defaultFontColor },
    fd: { ...defaultFontDecoration },
    ff: { ...defaultFontFamily },
    fs: { ...defaultFontSize },
    fst: { ...defaultFontStyle },
    fw: { ...defaultFontWeight },
  },
  paragraph: {
    pa: { ...defaultParagraphAlignment },
    plh: { ...defaultParagraphLineHeight },
  },
});

const settingOptionsMap = reactive<ISettingOptionsMap>({
  font: {
    fc: [...fontColors],
    fd: fontDecorations,
    ff: fontFamilies,
    fs: fontSizes,
    fst: fontStyles,
    fw: fontWeights,
  },
  paragraph: {
    pa: paragraphAlignments,
    plh: paragraphLineHeights,
  },
});

const isChanged = reactive<IIsChanged>({ font: false, paragraph: false });

const setSettingMap = (
  category: CategoryType.font | CategoryType.paragraph,
  key: string,
  option: IOption
) => {
  settingMap[category][key] = { ...option };
};

const setIsChanged = (
  category: CategoryType.font | CategoryType.paragraph,
  status: boolean
) => {
  isChanged[category] = status;
};

const setActiveColor = (value: string) => {
  activeColor.value = value;
};

const onColorPickerChange = (value: string) => {
  setActiveColor(value);
  const colorOption = {
    name: `picker-${value}`,
    class: `fc-${value}`,
    value: value,
  };
  setSettingMap(CategoryType.font, "fc", colorOption);
  settingOptionsMap.font.fc.push(colorOption);
  setIsChanged(CategoryType.font, true);
};

const onColorPaletteBtnClick = (option: IOption) => {
  setActiveColor(option.value);
  setSettingMap(CategoryType.font, "fc", option);
  setIsChanged(CategoryType.font, true);
};

onMounted(() => {
  if (canvas.value) {
    createCanvas(imageSize.width, imageSize.height, ratio.value);
  }
});
</script>

<template>
  <div class="app-container">
    <TopBarSettings
      :settingMap="settingMap"
      :setIsChanged="setIsChanged"
      :setSettingMap="setSettingMap"
    />

    <div class="main-container">
      <div class="left-bar-settings">
        <ColorPicker
          id="color-picker"
          :activeColor="activeColor"
          :onColorPickerChange="onColorPickerChange"
        />
        <FileInput
          id="fileInput"
          :icon="['far', 'image']"
          :border="true"
          :onChange="(e: InputFileEvent) => onFileChanged(e, imageSize, ratio)"
          accept="image/*"
        />
      </div>

      <div class="center">
        <ColorPalette
          :imageSize="imageSize"
          :colors="fontColors"
          :onColorPaletteBtnClick="onColorPaletteBtnClick"
        />
        <div
          class="display"
          :style="{
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
          }"
        >
          <canvas ref="canvas" id="canvas"></canvas>
          <TextspacesBox
            :showTextGrid="showTextGrid"
            :settingMap="settingMap"
            :settingOptionsMap="settingOptionsMap"
            :isChanged="isChanged"
            :setIsChanged="setIsChanged"
            :setSettingMap="setSettingMap"
          />
        </div>
      </div>
    </div>
    <div class="settings-bottom">
      <Checkbox
        name="grid"
        :checked="showTextGrid"
        :onChange="() => (showTextGrid = !showTextGrid)"
        label="Show Text Grid"
      />
      <Button
        label="Download as jpg"
        :border="true"
        :onClick="() => onCanvasDownload(ratio)"
      />
    </div>
  </div>
</template>

<style>
.app-container {
  width: fit-content;
  margin: 0 auto;
  padding: 50px 0 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.main-container {
  min-width: 32rem;
  display: flex;
  _justify-content: space-between;
  gap: 1.2rem;
}

.left-bar-settings {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.center {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.display {
  position: relative;
}

canvas {
  margin: 0;
  image-rendering: pixelated;
}

.settings-bottom {
  display: flex;
  gap: 1rem;
}
</style>
