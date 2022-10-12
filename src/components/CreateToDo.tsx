import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCategoryState, toDosState } from "../recoil/atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDosState);
  const category = useRecoilValue(selectedCategoryState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    const item = { id: new Date().getTime(), title: toDo, category };
    setToDos((prev) => [...prev, item]);
    setValue("toDo", "");
    const oldToDos = localStorage.getItem(category);
    const oldToDosArr = oldToDos ? oldToDos.split(",") : [];
    localStorage.setItem(
      category,
      [...oldToDosArr, JSON.stringify(item)].join(",")
    );
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "ToDo is required",
        })}
        placeholder="Type Todo Here!"
      />
      <span>{errors?.toDo?.message}</span>
      <button type="submit">Add</button>
    </form>
  );
}

export default CreateToDo;
