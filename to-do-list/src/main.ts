"use strict";

const dates = document.querySelectorAll(".todos__date");
const inputs = Array.from(
  document.querySelectorAll(".todos__input")
) as HTMLInputElement[];
const addBtns = document.querySelectorAll(".todos__add");
const allItems = document.querySelectorAll(".todos__items");
const nav = document.querySelector(".options");
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
const todayDate = dates[0] as HTMLSpanElement;
const tomorrowDate = dates[1] as HTMLSpanElement;
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

  const todayDone = document.querySelector(
    ".todos__today .todos__done"
  ) as HTMLSpanElement;
  const tomorrowDone = document.querySelector(
    ".todos__tomorrow .todos__done"
  ) as HTMLSpanElement;
  todayDone.innerText = `Check : ${filteredTodayArr.length} / ${totalTodayArr.length}`;
  tomorrowDone.innerText = `Check : ${filteredTomorrowArr.length} / ${totalTomorrowArr.length}`;
};

// 동적으로 태그 삽입하고 삭제하기
const onAdd = (index: number): void => {
  const todoInput = inputs[index] as HTMLInputElement;
  if (!todoInput.value) return;

  const div = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  div.setAttribute("class", "todos__item--left");
  checkbox.setAttribute("class", "todos__check");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "check" + i);
  label.setAttribute("for", "check" + i);
  li.setAttribute("class", "todos__item");
  span.setAttribute("class", "todos__name");
  deleteBtn.setAttribute("class", "todos__delete");

  span.innerText = todoInput.value;

  allItems[index].appendChild(li);
  div.appendChild(checkbox);
  div.appendChild(label);
  div.appendChild(span);
  li.appendChild(div);
  li.appendChild(deleteBtn);

  i++;
  todoInput.value = "";

  checkbox.addEventListener("change", (event) => {
    const checkTarget = event.target as HTMLInputElement;
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
nav?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
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
