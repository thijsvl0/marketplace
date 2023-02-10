import Button from "../common/form/Button";
import type { CreateProductSchema } from "../../utils/validation/product";
import type { FC } from "react";
import { FiDollarSign } from "react-icons/fi";
import FormGroup from "../common/form/FormGroup";
import ImageUpload from "../common/form/ImageUpload";
import Label from "../common/form/Label";
import Modal from "../common/modal/Modal";
import type { SubmitHandler } from "react-hook-form";
import Title from "../common/modal/Title";
import { createProductSchema } from "../../utils/validation/product";
import { useForm } from "react-hook-form";
import { useProductStore } from "../../stores/product";
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
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit: SubmitHandler<CreateProductSchema> = (data) => {
    console.log(data);
  };
  console.log(errors.images);
  return (
    <Modal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <Title>Create Product</Title>
          </div>
          <div className="mt-4 space-y-4">
            <FormGroup
              label="Title"
              placeholder="Enter Title"
              errors={errors.title}
              {...register("title")}
            />
            <FormGroup
              label="Price"
              type="number"
              step="0.01"
              placeholder="0.00"
              errors={errors.price}
              Icon={FiDollarSign}
              {...register("price")}
            />
            <FormGroup
              label="Description"
              variant="textarea"
              placeholder="Enter Description"
              errors={errors.description}
              {...register("description")}
            />
            <FormGroup
              label="Images"
              variant="image"
              length={3}
              errors={errors.images}
              {...register("images")}
            />
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
            type="submit"
            className="row-start-1 justify-center sm:col-span-3 sm:row-span-1"
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default CreateProduct;
