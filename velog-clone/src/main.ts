"use strict";

const checkbox = document.querySelector(
  ".header__checkbox"
) as HTMLInputElement;
const navPeriod = document.querySelector(".nav__period");
const navDropdown = document.querySelector(
  ".nav__dropdown"
) as HTMLUListElement;
const navText = document.querySelector(".nav__text") as HTMLSpanElement;
const items = document.querySelectorAll(".item");
const modalBackground = document.querySelector(".modal__background");
const modalWrapper = document.querySelector(".modal__wrapper");
const modalContent = document.querySelector(".modal__content");
const closeBtn = document.querySelector(".modal__close");

// 다크모드 구현 (기본값을 light로 설정)
document.documentElement.setAttribute("color-theme", "light");

// 체크 여부에 따라 setItem으로 로컬 스토리지에 아이템 저장
checkbox.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    localStorage.setItem("color-theme", "dark");
    document.documentElement.setAttribute("color-theme", "dark");
  } else {
    localStorage.setItem("color-theme", "light");
    document.documentElement.setAttribute("color-theme", "light");
  }
});

// getItem을 통해 로컬 스토리지에서 아이템의 값(테마) 알아내기
const currentTheme = localStorage.getItem("color-theme");

// 로컬 스토리지에 아이템이 있으면
if (currentTheme) {
  // 그 아이템의 값으로 color-theme 설정
  document.documentElement.setAttribute("color-theme", currentTheme);
  // 다크모드면 checked 속성을 true로 설정
  if (currentTheme === "dark") {
    checkbox.checked = true;
  }
}

// 커스텀 드롭다운 구현
navPeriod?.addEventListener("click", () => {
  if (navDropdown.style.visibility === "visible") {
    navDropdown.style.visibility = "hidden";
    return;
  }
  navDropdown.style.visibility = "visible";
});

navDropdown.addEventListener("click", (e) => {
  const target = e.target as HTMLSpanElement;
  navText.innerText = target.innerText;

  Array.from(navDropdown.children).forEach((element) =>
    element.classList.remove("active")
  );
  target.classList.add("active");
});

// 모달창 구현
items.forEach((item) => {
  item.addEventListener("click", () => {
    // body 스크롤 방지
    document.body.style.overflow = "hidden";
    modalBackground?.classList.add("show");
    modalWrapper?.classList.add("show");

    const clone = item.cloneNode(true) as Element;
    modalContent?.appendChild(clone);

    closeBtn?.addEventListener("click", () => {
      document.body.style.overflow = "scroll";
      modalBackground?.classList.remove("show");
      modalWrapper?.classList.remove("show");
      clone.remove();
    });
  });
});
