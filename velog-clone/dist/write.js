"use strict";
const tagInput = document.querySelector(".tag-input");
const set = new Set();
tagInput.addEventListener("keyup", (e) => {
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
const addTag = (text) => {
    set.add(text);
    const span = document.createElement("span");
    span.setAttribute("class", "tag-span");
    span.innerText = text;
    document.body.insertBefore(span, tagInput);
    tagInput.value = "";
    span.addEventListener("click", (e) => {
        const target = e.target;
        set.delete(target.innerText);
        span.remove();
    });
};
//# sourceMappingURL=write.js.map