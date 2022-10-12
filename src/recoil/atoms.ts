import { atom } from "recoil";

export const Category = ["TO_DO", "DOING", "DONE"];

export interface IToDo {
  id: number;
  title: string;
  category: string;
}

export const categoriesState = atom({
  key: "categories",
  default: Category,
});

export const selectedCategoryState = atom({
  key: "selectedCategory",
  default: Category[0],
});

export const toDosState = atom<IToDo[]>({
  key: "toDos",
  default: [],
});
