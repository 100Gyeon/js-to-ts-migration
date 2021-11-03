"use strict";
const checkbox = document.querySelector(".header__checkbox");
const navPeriod = document.querySelector(".nav__period");
const navDropdown = document.querySelector(".nav__dropdown");
const navText = document.querySelector(".nav__text");
const items = document.querySelectorAll(".item");
const modalBackground = document.querySelector(".modal__background");
const modalWrapper = document.querySelector(".modal__wrapper");
const modalContent = document.querySelector(".modal__content");
const closeBtn = document.querySelector(".modal__close");
document.documentElement.setAttribute("color-theme", "light");
checkbox.addEventListener("change", (e) => {
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
        checkbox.checked = true;
    }
}
navPeriod === null || navPeriod === void 0 ? void 0 : navPeriod.addEventListener("click", () => {
    if (navDropdown.style.visibility === "visible") {
        navDropdown.style.visibility = "hidden";
        return;
    }
    navDropdown.style.visibility = "visible";
});
navDropdown.addEventListener("click", (e) => {
    const target = e.target;
    navText.innerText = target.innerText;
    Array.from(navDropdown.children).forEach((element) => element.classList.remove("active"));
    target.classList.add("active");
});
items.forEach((item) => {
    item.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
        modalBackground === null || modalBackground === void 0 ? void 0 : modalBackground.classList.add("show");
        modalWrapper === null || modalWrapper === void 0 ? void 0 : modalWrapper.classList.add("show");
        const clone = item.cloneNode(true);
        modalContent === null || modalContent === void 0 ? void 0 : modalContent.appendChild(clone);
        closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", () => {
            document.body.style.overflow = "scroll";
            modalBackground === null || modalBackground === void 0 ? void 0 : modalBackground.classList.remove("show");
            modalWrapper === null || modalWrapper === void 0 ? void 0 : modalWrapper.classList.remove("show");
            clone.remove();
        });
    });
});
//# sourceMappingURL=main.js.map