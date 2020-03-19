import SplitText from "./SplitText";

window.onload = () => {
  document.querySelectorAll(".split-text").forEach(el => new SplitText(el));
};
