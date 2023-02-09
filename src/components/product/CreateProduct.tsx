import Button from "../common/form/Button";
import type { CreateProductSchema } from "../../utils/validation/product";
import type { FC } from "react";
import FormGroup from "../common/form/FormGroup";
import Modal from "../common/modal/Modal";
import type { SubmitHandler } from "react-hook-form";
import Title from "../common/modal/Title";
import { createProductSchema } from "../../utils/validation/product";
import { useForm } from "react-hook-form";
import { useProductStore } from "../../stores/Product";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateProductProps {}

const CreateProduct: FC<CreateProductProps> = ({}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useProductStore((state) => [
    state.isCreateModalOpen,
    state.setIsCreateModalOpen,
  ]);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit: SubmitHandler<CreateProductSchema> = (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen}>
      <div>
        <div>
          <Title>Create Product</Title>
        </div>
        <div className="mt-4">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup
              label="Title"
              placeholder="Enter Title"
              errors={errors.title}
              {...register("title")}
            />
            <FormGroup
              label="Description"
              variant="textarea"
              placeholder="Enter Description"
              errors={errors.description}
              {...register("description")}
            />
          </form>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-5">
        <Button
          className="justify-center sm:col-span-2"
          variant="outline"
          onClick={() => setIsCreateModalOpen(false)}
        >
          Cancel
        </Button>
        <Button
          className="row-start-1 justify-center sm:col-span-2 sm:row-span-1"
          onClick={() => setIsCreateModalOpen(false)}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};
export default CreateProduct;
