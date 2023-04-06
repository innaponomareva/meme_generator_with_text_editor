import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faBold,
  faUnderline,
  faItalic,
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faFont,
  faTextHeight,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faImage,
  faCheck,
  faChevronDown,
  faChevronUp,
  faBold,
  faUnderline,
  faItalic,
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faFont,
  faTextHeight,
  faGripLines
);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
