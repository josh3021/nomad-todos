import { selector } from "recoil";
import { selectedCategoryState, toDosState } from "./atoms";

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const category = get(selectedCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
