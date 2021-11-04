export const $ = (query: string): HTMLElement => {
  const $el = document.querySelector(query);

  // null 제어
  if (!$el) {
    throw new Error(`querySelector ${query} failed!`);
  }

  // HTMLElement 제어
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

// 다크모드 구현 (기본값을 light로 설정)
document.documentElement.setAttribute("color-theme", "light");

// 체크 여부에 따라 setItem으로 로컬 스토리지에 아이템 저장
checkbox.addEventListener("change", (e) => {
  if (!(e.target instanceof HTMLInputElement)) throw new Error();
  const target = e.target;
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
    if (!(checkbox instanceof HTMLInputElement)) throw new Error();
    checkbox.checked = true;
  }
}

// 커스텀 드롭다운 구현
navPeriod.addEventListener("click", () => {
  if (navDropdown.style.visibility === "visible") {
    navDropdown.style.visibility = "hidden";
    return;
  }
  navDropdown.style.visibility = "visible";
});

navDropdown.addEventListener("click", (e) => {
  if (!(e.target instanceof HTMLElement)) throw new Error();
  const target = e.target;
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
    modalBackground.classList.add("show");
    modalWrapper.classList.add("show");

    const clone = item.cloneNode(true);
    if (!(clone instanceof Element)) throw new Error();
    modalContent.appendChild(clone);

    closeBtn.addEventListener("click", () => {
      document.body.style.overflow = "scroll";
      modalBackground.classList.remove("show");
      modalWrapper.classList.remove("show");
      clone.remove();
    });
  });
});
