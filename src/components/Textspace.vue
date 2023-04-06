<script setup lang="ts">
import { onMounted } from "vue";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import {
  ITargetRange,
  IOption,
  Key,
  CategoryType,
  ISettingOptionsMap,
  ISettingMap,
} from "../models/models";
import {
  getNextSibling,
  getPreviousSibling,
  getTargetParagraph,
  removeCursor,
  setFocusToEndOf,
  setFocusToNextSibling,
  setFocusToPreviousSibling,
  splitTargetParagraphAndAddNewParagraph,
  updateSettings,
  onBackspace,
} from "../utils/texteditor";
import { defaultFontFamily } from "../lib/ff";
import { defaultFontSize } from "../lib/fs";
import { defaultParagraphLineHeight } from "../lib/plh";

interface TextspaceProps {
  textspaceId: string;
  maxRows: number;
  placeholder: string;
  showTextGrid: boolean;
  targetRange: ITargetRange;
  setTargetRange: () => void;
  setSettingMap: (
    category: CategoryType.font | CategoryType.paragraph,
    key: string,
    option: IOption
  ) => void;
  settingMap: ISettingMap;
  settingOptionsMap: ISettingOptionsMap;
}

const {
  textspaceId,
  maxRows,
  placeholder,
  showTextGrid,
  targetRange,
  setTargetRange,
  setSettingMap,
  settingMap,
  settingOptionsMap,
} = defineProps<TextspaceProps>();

const firstParagraphId = uuidv4();

onMounted(() => {
  document.addEventListener("selectionchange", onSelectChange);
});

const onSelectChange = () => {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const targetParagraph = getTargetParagraph(range.startContainer);
    const targetTextspace =
      !!targetParagraph && (targetParagraph.parentNode as HTMLElement);

    if (
      targetTextspace.nodeName === "DIV" &&
      targetTextspace.id === textspaceId
    ) {
      setTargetRange();
      updateSettings(targetRange, setSettingMap, settingOptionsMap);
    }
  }
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === Key.Enter || (event.key === Key.Enter && event.shiftKey)) {
    event.preventDefault();
    const currentTextarea = event.target as HTMLDivElement;
    const numberOfRows = currentTextarea.childNodes.length;
    if (numberOfRows < maxRows) {
      splitTargetParagraphAndAddNewParagraph(
        currentTextarea,
        targetRange,
        settingMap,
        settingOptionsMap
      );
    }
  } else if (event.key === Key.Backspace) {
    event.preventDefault();
    onBackspace(targetRange, settingMap, settingOptionsMap);
  } else if (event.key === Key.ArrowLeft) {
    const isStart = targetRange.startOffset === 0;
    if (isStart) {
      const prevSibling = getPreviousSibling(targetRange);
      if (prevSibling) setFocusToPreviousSibling(prevSibling);
    }
  } else if (event.key === Key.ArrowRight) {
    const isEnd =
      targetRange.startOffset === targetRange.startContainer.textContent.length;
    if (isEnd) {
      const nextSibling = getNextSibling(targetRange);
      if (nextSibling) setFocusToNextSibling(nextSibling);
    }
  }
};

const onChange = () => {
  const cursor = document.querySelector(".cursor") as HTMLSpanElement;
  const targetParagraph = targetRange.startParagraph as HTMLParagraphElement;

  if (targetParagraph) {
    const br = targetParagraph.querySelector("br") as HTMLBRElement;
    if (br) br.remove();
  }
  if (cursor) {
    const cursorParent = cursor.parentElement as HTMLElement;
    const cursorIndex = [...cursorParent.childNodes].indexOf(cursor);
    const fragment = document.createDocumentFragment();
    fragment.append(cursor.innerHTML.replace(/\uFEFF/, ""));
    cursor.replaceWith(fragment);
    setFocusToEndOf(cursorParent.childNodes[cursorIndex]);
  }
  setTargetRange();
};

const onClick = () => {
  const cursor = document.querySelector(".cursor") as HTMLSpanElement;
  if (cursor) removeCursor(cursor);
};

const onFocus = () => {
  const textspace = document.getElementById(textspaceId);
  textspace.setAttribute("data-placeholder", "");
};

const onBlur = () => {
  const textspace = document.getElementById(textspaceId);
  const firstParagraph = textspace.firstChild as HTMLParagraphElement;
  textspace.childNodes.length === 1 &&
    firstParagraph.childNodes[0].nodeName === "BR" &&
    textspace.setAttribute("data-placeholder", placeholder);
};

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault();
  let paste = event.clipboardData.getData("text");
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(document.createTextNode(paste));
  selection.collapseToEnd();
};
</script>

<template>
  <div
    :id="textspaceId"
    contenteditable="true"
    :data-placeholder="placeholder"
    :class="clsx('textspace', showTextGrid && 'textspace-visible')"
    @input="onChange"
    @click="onClick"
    @keydown="onKeydown"
    @paste="onPaste"
    @focus="onFocus"
    @blur="onBlur"
  >
    <p
      :id="firstParagraphId"
      :style="{
        fontFamily: defaultFontFamily.value,
        fontSize: defaultFontSize.value + 'rem',
        lineHeight: defaultParagraphLineHeight.value + 'rem',
      }"
    >
      <br />
    </p>
  </div>
</template>

<style scoped>
.textspace {
  background-color: transparent;
  height: fit-content;
  border: none;
  resize: none;
  margin: 0.5rem;
  padding: 0;
}

.textspace::before {
  content: attr(data-placeholder);
  display: block;
  position: absolute;
  top: 0.25rem;
  left: 0.5rem;
  color: #676c71ad;
  font-size: 0.9rem;
  font-family: "Helvetica", sans-serif;
}
.textspace-visible {
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 0 1px #676c71ad;
}
.textspace:focus {
  outline: none;
}
</style>
