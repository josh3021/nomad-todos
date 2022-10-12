import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "../recoil/atoms";

interface ICreateCategory {
  newCategory: string;
}

function CreateCategory() {
  const { register, handleSubmit } = useForm<ICreateCategory>();
  const setCategoriesState = useSetRecoilState(categoriesState);
  const handleValid = ({ newCategory }: ICreateCategory) => {
    setCategoriesState((v) => [...v, newCategory]);
    const oldCategories = localStorage.getItem("categories") as string;
    localStorage.setItem("categories", `${oldCategories},${newCategory}`);
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("newCategory", { required: true })}
        placeholder="write new Category"
      />
      <input type="submit" />
    </form>
  );
}

export default CreateCategory;
