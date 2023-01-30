import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "../../utils/validation/auth";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../common/form/Button";
import type { FC } from "react";
import { FiEye } from "react-icons/fi";
import FormGroup from "../common/form/FormGroup";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChangePasswordProps {}

const ChangePassword: FC<ChangePasswordProps> = ({}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate } = api.auth.changePassword.useMutation({
    onSuccess() {
      router.reload();
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
        icon={<FiEye size="1.25rem" />}
        errors={errors.old_password}
        {...register("old_password", {
          required: "Old password is required",
        })}
      />

      <FormGroup
        label="Password"
        type="password"
        placeholder="Enter password"
        icon={<FiEye size="1.25rem" />}
        errors={errors.password}
        {...register("password", {
          required: "Password is required",
        })}
      />

      <FormGroup
        label="Confirm password"
        type="password"
        placeholder="Confirm password"
        icon={<FiEye size="1.25rem" />}
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