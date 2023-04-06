<script setup lang="ts">
import { reactive, onMounted, watchEffect } from "vue";
import {
  ITargetRange,
  IOption,
  ISettingMap,
  IIsChanged,
  CategoryType,
  ISettingOptionsMap,
} from "../models/models";
import {
  getTargetParagraph,
  setFocusToEndOf,
  updateSelectionAndTargetParagraph,
  updateSelectionAndTargetTextspace,
  updateCursor,
} from "../utils/texteditor";
import Textspace from "./Textspace.vue";

interface TextspacesBoxProps {
  showTextGrid: boolean;
  settingMap: ISettingMap;
  settingOptionsMap: ISettingOptionsMap;
  isChanged: IIsChanged;
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

const {
  showTextGrid,
  settingMap,
  settingOptionsMap,
  isChanged,
  setIsChanged,
  setSettingMap,
} = defineProps<TextspacesBoxProps>();

const targetRange = reactive<ITargetRange>({
  startContainer: null,
  startOffset: 0,
  endContainer: null,
  endOffset: 0,
  startParagraph: null,
  endParagraph: null,
  textspace: null,
});

onMounted(() => {
  setTargetRangeOnMounted();
});

const setTargetRangeOnMounted = () => {
  const textspacesBox = document.getElementById(
    "textspaces-box"
  ) as HTMLDivElement;
  const firstTextarea = textspacesBox.firstChild as HTMLDivElement;
  const paragraph = firstTextarea.firstChild as HTMLParagraphElement;
  targetRange.startContainer = paragraph;
  targetRange.startOffset = 0;
  targetRange.endContainer = paragraph;
  targetRange.endOffset = 0;
  targetRange.startParagraph = paragraph;
  targetRange.endParagraph = paragraph;
  targetRange.textspace = firstTextarea;
};

const setTargetRange = () => {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    targetRange.startContainer = range.startContainer;
    targetRange.startOffset = range.startOffset;
    targetRange.endContainer = range.endContainer;
    targetRange.endOffset = range.endOffset;
    const startParagraph = getTargetParagraph(range.startContainer);
    const endParagraph = getTargetParagraph(range.endContainer);
    targetRange.startParagraph = startParagraph;
    targetRange.endParagraph = endParagraph;
    const textarea = startParagraph.parentNode as HTMLDivElement;
    targetRange.textspace = textarea;
  }
};

watchEffect(() => {
  if (isChanged.font || isChanged.paragraph) {
    const targetParagraph = targetRange.startParagraph as HTMLParagraphElement;
    const cursor = document.querySelector(".cursor") as HTMLSpanElement;
    const br = targetParagraph.querySelector("br") as HTMLBRElement;
    if (br) br.remove();

    const sameParagraph = targetRange.startParagraph.isSameNode(
      targetRange.endParagraph
    );

    sameParagraph
      ? cursor
        ? updateCursor(cursor, targetParagraph, settingMap)
        : updateSelectionAndTargetParagraph(
            isChanged,
            targetRange,
            settingMap,
            settingOptionsMap
          )
      : updateSelectionAndTargetTextspace(
          isChanged,
          targetRange,
          settingMap,
          settingOptionsMap
        );

    setIsChanged(CategoryType.font, false);
    setIsChanged(CategoryType.paragraph, false);

    setTimeout(() => {
      const cursor = document.querySelector(".cursor");
      if (cursor) setFocusToEndOf(cursor.firstChild);
    }, 10);
  }
});
</script>

<template>
  <div id="textspaces-box">
    <Textspace
      textspaceId="one"
      :maxRows="4"
      :placeholder="'enter your text here (max 4 lines)'"
      :showTextGrid="showTextGrid"
      :targetRange="targetRange"
      :setTargetRange="setTargetRange"
      :setSettingMap="setSettingMap"
      :settingMap="settingMap"
      :settingOptionsMap="settingOptionsMap"
    />
    <Textspace
      textspaceId="two"
      :maxRows="4"
      :placeholder="'enter your text here (max 4 lines)'"
      :showTextGrid="showTextGrid"
      :targetRange="targetRange"
      :setTargetRange="setTargetRange"
      :setSettingMap="setSettingMap"
      :settingMap="settingMap"
      :settingOptionsMap="settingOptionsMap"
    />
  </div>
</template>

<style>
#textspaces-box {
  margin: 0;
  padding: 0;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 0 1px #676c71ad;
}

#textspaces-box p {
  margin: 0;
  padding: 0;
}
</style>
