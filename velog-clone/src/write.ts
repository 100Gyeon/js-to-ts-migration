export const $ = (query: string): HTMLElement => {
  const $el = document.querySelector(query);

  if (!$el) {
    throw new Error(`querySelector ${query} failed!`);
  }

  if (!($el instanceof HTMLElement)) {
    throw new Error(`${query} is not HTMLElement.`);
  }

  return $el;
};

const tagInput = $(".tag-input");
const set = new Set();

tagInput.addEventListener("keyup", (e) => {
  if (!(e.target instanceof HTMLInputElement)) throw new Error();
  const target = e.target;
  const targetValue = target.value;
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

  const span = document.createElement("span");
  span.setAttribute("class", "tag-span");
  span.innerText = text;
  document.body.insertBefore(span, tagInput);
  if (!(tagInput instanceof HTMLInputElement)) throw new Error();
  tagInput.value = "";

  span.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLSpanElement)) throw new Error();
    const target = e.target;
    set.delete(target.innerText);
    span.remove();
  });
};
