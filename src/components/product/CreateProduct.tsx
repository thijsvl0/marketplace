import {
  CreateProductSchema,
  createProductSchema,
} from "../../utils/validation/product";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../common/form/Button";
import { Dialog } from "@headlessui/react";
import { FC } from "react";
import FormGroup from "../common/form/FormGroup";
import Modal from "../common/modal/Modal";
import TextArea from "../common/form/Textarea";
import Title from "../common/modal/Title";
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
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-5 sm:gap-4">
        <Button
          className="col-span-2 justify-center"
          variant="outline"
          onClick={() => setIsCreateModalOpen(false)}
        >
          Cancel
        </Button>
        <Button
          className="col-span-3 justify-center"
          onClick={() => setIsCreateModalOpen(false)}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};
export default CreateProduct;
