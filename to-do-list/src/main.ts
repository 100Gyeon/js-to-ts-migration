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

const dates = document.querySelectorAll(".todos__date");
const inputs = Array.from(
  document.querySelectorAll(".todos__input")
) as HTMLInputElement[];
const addBtns = document.querySelectorAll(".todos__add");
const allItems = document.querySelectorAll(".todos__items");
const nav = $(".options");
const todos = document.querySelectorAll(".todos > section");
let i = 0;

// 오늘, 내일 날짜 계산 후 표시
const findDate = (str: string): string => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const day = today.getDate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowYear = tomorrow.getFullYear();
  const tomorrowMonth = tomorrow.getMonth() + 1;
  const nextDay = tomorrow.getDate();

  const todayStr = `${todayYear}년 ${todayMonth}월 ${day}일`;
  const tomorrowStr = `${tomorrowYear}년 ${tomorrowMonth}월 ${nextDay}일`;
  const when = str === "today" ? todayStr : tomorrowStr;
  return when;
};
if (!(dates[0] instanceof HTMLSpanElement)) throw new Error();
const todayDate = dates[0];
if (!(dates[1] instanceof HTMLSpanElement)) throw new Error();
const tomorrowDate = dates[1];
todayDate.innerText = findDate("today");
tomorrowDate.innerText = findDate("tomorrow");

// + 버튼으로 todo 추가
addBtns.forEach((btn, index) =>
  btn.addEventListener("click", () => {
    onAdd(index);
  })
);

// 엔터로 todo 추가
inputs.forEach((input, index) =>
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      onAdd(index);
    }
  })
);

// 할 일 몇 개 남았는지 표시
const countCheckbox = () => {
  const checkTodayArr = Array.from(
    document.querySelectorAll(".todos__today .todos__check")
  ) as HTMLInputElement[];
  const filteredTodayArr = checkTodayArr.filter((box) => box.checked);
  const totalTodayArr = Array.from(
    document.querySelectorAll(".todos__today .todos__check")
  );
  const checkTomorrowArr = Array.from(
    document.querySelectorAll(".todos__tomorrow .todos__check")
  ) as HTMLInputElement[];
  const filteredTomorrowArr = checkTomorrowArr.filter((box) => box.checked);
  const totalTomorrowArr = Array.from(
    document.querySelectorAll(".todos__tomorrow .todos__check")
  );

  const todayDone = $(".todos__today .todos__done");
  const tomorrowDone = $(".todos__tomorrow .todos__done");
  todayDone.innerText = `Check : ${filteredTodayArr.length} / ${totalTodayArr.length}`;
  tomorrowDone.innerText = `Check : ${filteredTomorrowArr.length} / ${totalTomorrowArr.length}`;
};

// 동적으로 태그 삽입하고 삭제하기
const onAdd = (index: number): void => {
  if (!(inputs[index] instanceof HTMLInputElement)) throw new Error();
  const todoInput = inputs[index];
  if (!todoInput.value) return;

  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  checkbox.setAttribute("class", "todos__check");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "check" + i);
  label.setAttribute("for", "check" + i);
  li.setAttribute("class", "todos__item");
  span.setAttribute("class", "todos__name");
  deleteBtn.setAttribute("class", "todos__delete");

  span.innerText = todoInput.value;

  allItems[index].appendChild(li);
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  i++;
  todoInput.value = "";

  checkbox.addEventListener("change", (event) => {
    if (!(event.target instanceof HTMLInputElement)) throw new Error();
    const checkTarget = event.target;
    // 체크된 항목만 글자 색상 바꾸고 줄 긋기
    if (checkTarget.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "#AAAAAA";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "black";
    }
    countCheckbox();
  });

  // 휴지통 버튼 클릭하면 todo 삭제
  deleteBtn.addEventListener("click", () => {
    li.remove();
    countCheckbox();
  });

  countCheckbox();
};

// 오늘만 보기, 내일만 보기, 모두 보기 기능
nav.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) throw new Error();
  const target = event.target;
  if (target.className.includes("options__today")) {
    todos[0].classList.add("open");
    todos[1].classList.remove("open");
  } else if (target.className.includes("options__tomorrow")) {
    todos[1].classList.add("open");
    todos[0].classList.remove("open");
  } else if (target.className.includes("options__both")) {
    todos[0].classList.add("open");
    todos[1].classList.add("open");
  }
});
