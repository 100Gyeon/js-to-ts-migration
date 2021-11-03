"use strict";

const dates: NodeListOf<Element> = document.querySelectorAll(".todos__date");
const inputs: NodeListOf<Element> = document.querySelectorAll(".todos__input");
const addBtns: NodeListOf<Element> = document.querySelectorAll(".todos__add");
const allItems: NodeListOf<Element> =
  document.querySelectorAll(".todos__items");
const nav: Element = document.querySelector(".options");
const todos: NodeListOf<Element> =
  document.querySelectorAll(".todos > section");
let i = 0;

// 오늘, 내일 날짜 계산 후 표시
const findDate = (str: string): string => {
  const today: Date = new Date();
  const todayYear: number = today.getFullYear();
  const todayMonth: number = today.getMonth() + 1;
  const day: number = today.getDate();

  const tomorrow: Date = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowYear: number = tomorrow.getFullYear();
  const tomorrowMonth: number = tomorrow.getMonth() + 1;
  const nextDay: number = tomorrow.getDate();

  const todayStr: string = `${todayYear}년 ${todayMonth}월 ${day}일`;
  const tomorrowStr: string = `${tomorrowYear}년 ${tomorrowMonth}월 ${nextDay}일`;
  const when: string = str === "today" ? todayStr : tomorrowStr;
  return when;
};
const todayDate: HTMLSpanElement = dates[0] as HTMLSpanElement;
const tomorrowDate: HTMLSpanElement = dates[1] as HTMLSpanElement;
todayDate.innerText = findDate("today");
tomorrowDate.innerText = findDate("tomorrow");

// + 버튼으로 todo 추가
addBtns.forEach((btn: HTMLButtonElement, index: number): void =>
  btn.addEventListener("click", () => {
    onAdd(index);
  })
);

// 엔터로 todo 추가
inputs.forEach((input: HTMLInputElement, index: number): void =>
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      onAdd(index);
    }
  })
);

// 할 일 몇 개 남았는지 표시
const countCheckbox = () => {
  const checkTodayArr: Element[] = Array.from(
    document.querySelectorAll(".todos__today .todos__check")
  ).filter((box: HTMLInputElement) => box.checked);
  const totalTodayArr: Element[] = Array.from(
    document.querySelectorAll(".todos__today .todos__check")
  );
  const checkTomorrowArr: Element[] = Array.from(
    document.querySelectorAll(".todos__tomorrow .todos__check")
  ).filter((box: HTMLInputElement) => box.checked);
  const totalTomorrowArr: Element[] = Array.from(
    document.querySelectorAll(".todos__tomorrow .todos__check")
  );

  const todayDone: HTMLSpanElement = document.querySelector(
    ".todos__today .todos__done"
  );
  const tomorrowDone: HTMLSpanElement = document.querySelector(
    ".todos__tomorrow .todos__done"
  );
  todayDone.innerText = `Check : ${checkTodayArr.length} / ${totalTodayArr.length}`;
  tomorrowDone.innerText = `Check : ${checkTomorrowArr.length} / ${totalTomorrowArr.length}`;
};

// 동적으로 태그 삽입하고 삭제하기
const onAdd = (index: number): void => {
  const todoInput: HTMLInputElement = inputs[index] as HTMLInputElement;
  if (!todoInput.value) return;

  const div: HTMLDivElement = document.createElement("div");
  const checkbox: HTMLInputElement = document.createElement("input");
  const label: HTMLLabelElement = document.createElement("label");
  const li: HTMLLIElement = document.createElement("li");
  const span: HTMLSpanElement = document.createElement("span");
  const deleteBtn: HTMLButtonElement = document.createElement("button");

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
    const checkTarget: HTMLInputElement = event.target as HTMLInputElement;
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
  const target: HTMLElement = event.target as HTMLElement;
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
