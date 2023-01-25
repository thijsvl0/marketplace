import { FiAtSign, FiEye } from "react-icons/fi";

import Button from "../../components/common/form/Button";
import Input from "../../components/common/form/Input";
import type { NextPage } from "next";
import type { SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { useForm } from "react-hook-form";

interface FormInput {
  email: string;
  password: string;
}

const Signin: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Join The Marketplace Revolution!
        </h1>

        <p className="mt-4 text-gray-500">
          Unlock the door to endless possibilities by signing up for our
          marketplace now! Experience the convenience of buying and selling at
          your fingertips and change the way you do business forever.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter email"
            icon={
              <FiAtSign
                size="1.25rem"
                className={clsx(
                  errors.email ? "text-red-900" : "text-gray-400"
                )}
              />
            }
            className={clsx(
              errors.email &&
                "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
            )}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is incorrect format",
              },
            })}
          />
          {errors.email && (
            <div className="mt-1 text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter password"
            icon={
              <FiEye
                size="1.25rem"
                className={clsx(
                  errors.password ? "text-red-900" : "text-gray-400"
                )}
              />
            }
            className={clsx(
              errors.password &&
                "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
            )}
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <div className="mt-1 text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <a className="ml-1 underline" href="">
              Sign up
            </a>
          </p>

          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
