import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoriesState,
  selectedCategoryState,
  toDosState,
} from "../recoil/atoms";
import { toDoSelector } from "../recoil/selectors";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const setAllToDos = useSetRecoilState(toDosState);
  const toDos = useRecoilValue(toDoSelector);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const handleInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value);
  };

  useEffect(() => {
    const categories = localStorage.getItem("categories") as string;
    setCategories(categories.split(","));
  }, [setCategories]);

  useEffect(() => {
    const rawSavedToDos = localStorage.getItem(selectedCategory);
    if (rawSavedToDos) {
      const savedToDos = JSON.parse(`[${rawSavedToDos}]`);
      setAllToDos(savedToDos);
    }
  }, [selectedCategory, setAllToDos]);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateCategory />
      <select onInput={handleInput}>
        {categories.map((category, index) => (
          <option value={category} key={index}>
            {category}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
