"use strict";

const tagInput = document.querySelector(".tag-input") as HTMLInputElement;
const set = new Set();

tagInput.addEventListener("keyup", (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement;
  const targetValue: string = target.value;
  if (e.key === "Enter") {
    if (!targetValue || set.has(targetValue)) {
      target.value = "";
      return;
    }
    addTag(targetValue);
  }
});

const addTag = (text: string): void => {
  set.add(text);

  const span: HTMLSpanElement = document.createElement("span");
  span.setAttribute("class", "tag-span");
  span.innerText = text;
  document.body.insertBefore(span, tagInput);
  tagInput.value = "";

  span.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLSpanElement;
    set.delete(target.innerText);
    span.remove();
  });
};
