import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoriesState,
  IToDo,
  selectedCategoryState,
  toDosState,
} from "../recoil/atoms";

function ToDo({ id, title, category }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const setToDos = useSetRecoilState(toDosState);
  const handleClick = (newCategory: string) => {
    setToDos((prevToDos) => {
      const target = prevToDos.findIndex((toDo) => toDo.id === id);
      const newToDo: IToDo = {
        ...prevToDos[target],
        category: newCategory,
      };
      return [
        ...prevToDos.slice(0, target),
        newToDo,
        ...prevToDos.slice(target + 1),
      ];
    });
  };

  return (
    <li>
      <span>{title}</span>
      {categories.map(
        (category, index) =>
          category !== selectedCategory && (
            <button key={index} onClick={() => handleClick(category)}>
              {category}
            </button>
          )
      )}
    </li>
  );
}

export default ToDo;
