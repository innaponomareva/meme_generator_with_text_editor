<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watchEffect, watch } from "vue";
import {
  IOption,
  ISettingMap,
  IIsChanged,
  CategoryType,
  ISettingOptionsMap,
} from "./models/models";
import Button from "./components/Button.vue";
import ColorPalette from "./components/ColorPalette.vue";

import TextspacesBox from "./components/TextspacesBox.vue";
import TopBarSettings from "./components/TopBarSettings.vue";
import Checkbox from "./components/Checkbox.vue";
import ColorPicker from "./components/ColorPicker.vue";
import { defaultFontFamily, fontFamilies } from "./lib/ff";
import { defaultFontSize, fontSizes } from "./lib/fs";
import { defaultFontWeight, fontWeights } from "./lib/fw";
import { defaultFontStyle, fontStyles } from "./lib/fst";
import { defaultFontDecoration, fontDecorations } from "./lib/fd";
import { defaultParagraphAlignment, paragraphAlignments } from "./lib/pa";
import { defaultFontColor, fontColors } from "./lib/fc";
import { defaultParagraphLineHeight, paragraphLineHeights } from "./lib/plh";
import {
  createCanvas,
  onCanvasDownload,
  drawImageOnCanvas,
} from "./utils/canvas";

const canvas = ref(null);
const ratio = ref(2);
const showTextGrid = ref(true);
const displaySize = reactive({ width: 0, height: 0 });
const image = reactive({ size: { width: 0, height: 0, coeff: 1 }, src: "" });
const activeColor = ref("#000000");

const setDisplaySize = () => {
  displaySize.width = window.innerWidth;
  displaySize.height = window.innerHeight;
};

const setImageSize = () => {
  image.size.width = displaySize.width > 500 ? 500 : 384;
  image.size.height =
    image.src === "" ? image.size.coeff * image.size.width : image.size.height;
};

const handleResize = () => {
  console.log("resize");
  setDisplaySize();
  setImageSize();

  if (canvas.value) {
    const { ctx } = createCanvas(
      image.size.width,
      image.size.height,
      ratio.value
    );
    image.src !== "" && drawImageOnCanvas(ctx, image);
  }
};

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
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="app-container">
    <TopBarSettings
      :image="image"
      :ratio="ratio"
      :settingMap="settingMap"
      :setIsChanged="setIsChanged"
      :setSettingMap="setSettingMap"
    />

    <div
      class="color-settings"
      :style="{
        width: `${image.size.width}px`,
      }"
    >
      <ColorPicker
        id="color-picker"
        :activeColor="activeColor"
        :onColorPickerChange="onColorPickerChange"
      />
      <ColorPalette
        :colors="settingOptionsMap.font.fc"
        :onColorPaletteBtnClick="onColorPaletteBtnClick"
      />
    </div>

    <div
      class="canvas-container"
      :style="{
        width: `${image.size.width}px`,
        height: `${image.size.height}px`,
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
  max-width: 620px;
  margin: 0 auto;
  padding: 50px 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.color-settings {
  display: flex;
  gap: 0.5rem;
  overflow-x: scroll;
}

.canvas-container {
  position: relative;
  margin: 0 auto;
}

canvas {
  margin: 0;
  image-rendering: pixelated;
}

.settings-bottom {
  display: flex;
  gap: 1rem;
}

@media only screen and (max-width: 506px) {
  .main-container {
    flex-direction: column;
  }
  .left-bar-settings {
    flex-direction: row;
  }
}
</style>
