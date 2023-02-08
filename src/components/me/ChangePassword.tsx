import Button from "../common/form/Button";
import type { ChangePasswordSchema } from "../../utils/validation/user";
import type { FC } from "react";
import { FiEye } from "react-icons/fi";
import FormGroup from "../common/form/FormGroup";
import type { SubmitHandler } from "react-hook-form";
import { api } from "../../utils/api";
import { changePasswordSchema } from "../../utils/validation/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChangePasswordProps {}

const ChangePassword: FC<ChangePasswordProps> = ({}) => {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate } = api.user.changePassword.useMutation({
    onSuccess() {
      reset();
    },
    onError(e) {
      setError("old_password", { message: e.message });
      setFocus("old_password");
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
      <FormGroup
        label="Old Password"
        type="password"
        placeholder="Enter old password"
        Icon={FiEye}
        errors={errors.old_password}
        {...register("old_password", {
          required: "Old password is required",
        })}
      />

      <FormGroup
        label="Password"
        type="password"
        placeholder="Enter password"
        Icon={FiEye}
        errors={errors.password}
        {...register("password", {
          required: "Password is required",
        })}
      />

      <FormGroup
        label="Confirm password"
        type="password"
        placeholder="Confirm password"
        Icon={FiEye}
        errors={errors.confirm_password}
        {...register("confirm_password")}
      />
      <div>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};
export default ChangePassword;
