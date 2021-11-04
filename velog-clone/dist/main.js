export const $ = (query) => {
    const $el = document.querySelector(query);
    if (!$el) {
        throw new Error(`querySelector ${query} failed!`);
    }
    if (!($el instanceof HTMLElement)) {
        throw new Error(`${query} is not HTMLElement.`);
    }
    return $el;
};
const checkbox = $(".header__checkbox");
const navPeriod = $(".nav__period");
const navDropdown = $(".nav__dropdown");
const navText = $(".nav__text");
const items = document.querySelectorAll(".item");
const modalBackground = $(".modal__background");
const modalWrapper = $(".modal__wrapper");
const modalContent = $(".modal__content");
const closeBtn = $(".modal__close");
document.documentElement.setAttribute("color-theme", "light");
checkbox.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement))
        throw new Error();
    const target = e.target;
    if (target.checked) {
        localStorage.setItem("color-theme", "dark");
        document.documentElement.setAttribute("color-theme", "dark");
    }
    else {
        localStorage.setItem("color-theme", "light");
        document.documentElement.setAttribute("color-theme", "light");
    }
});
const currentTheme = localStorage.getItem("color-theme");
if (currentTheme) {
    document.documentElement.setAttribute("color-theme", currentTheme);
    if (currentTheme === "dark") {
        if (!(checkbox instanceof HTMLInputElement))
            throw new Error();
        checkbox.checked = true;
    }
}
navPeriod.addEventListener("click", () => {
    if (navDropdown.style.visibility === "visible") {
        navDropdown.style.visibility = "hidden";
        return;
    }
    navDropdown.style.visibility = "visible";
});
navDropdown.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLElement))
        throw new Error();
    const target = e.target;
    navText.innerText = target.innerText;
    Array.from(navDropdown.children).forEach((element) => element.classList.remove("active"));
    target.classList.add("active");
});
items.forEach((item) => {
    item.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
        modalBackground.classList.add("show");
        modalWrapper.classList.add("show");
        const clone = item.cloneNode(true);
        if (!(clone instanceof Element))
            throw new Error();
        modalContent.appendChild(clone);
        closeBtn.addEventListener("click", () => {
            document.body.style.overflow = "scroll";
            modalBackground.classList.remove("show");
            modalWrapper.classList.remove("show");
            clone.remove();
        });
    });
});
//# sourceMappingURL=main.js.map