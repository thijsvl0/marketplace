import { FiAtSign, FiUnlock, FiUser } from "react-icons/fi";
import type { GetServerSideProps, NextPage } from "next";

import Button from "../../components/common/form/Button";
import FormGroup from "../../components/common/form/FormGroup";
import Head from "next/head";
import Link from "next/link";
import type { SignUpSchema } from "../../utils/validation/auth";
import type { SubmitHandler } from "react-hook-form";
import { api } from "../../utils/api";
import { getSession } from "next-auth/react";
import { signUpSchema } from "../../utils/validation/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

const Signup: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const { mutate } = api.auth.signUp.useMutation({
    onSuccess() {
      router.push("/auth/signin").catch(console.error);
    },
    onError(e) {
      setError("email", { message: e.message });
      setFocus("email");
    },
  });

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    mutate(data);
  };

  return (
    <>
      <Head>
        <title>{`Sign Up | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
      </Head>
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
          <FormGroup
            label="Username"
            type="username"
            placeholder="Enter username"
            Icon={FiUser}
            errors={errors.username}
            {...register("username")}
          />
          <FormGroup
            label="Email"
            type="email"
            placeholder="Enter email"
            Icon={FiAtSign}
            errors={errors.email}
            {...register("email")}
          />

          <FormGroup
            label="Password"
            type="password"
            placeholder="Enter password"
            Icon={FiUnlock}
            errors={errors.password}
            {...register("password", {
              required: "Password is required",
            })}
          />

          <FormGroup
            label="Confirm password"
            type="password"
            placeholder="Confirm password"
            Icon={FiUnlock}
            errors={errors.confirm_password}
            {...register("confirm_password")}
          />

          <div className="flex items-center justify-between">
            <p className="text-gray-500">
              Already have an account?
              <Link className="ml-1 underline" href="/auth/signin">
                Sign in
              </Link>
            </p>
            <Button type="submit" disabled={isSubmitting}>
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) return { redirect: { permanent: true, destination: "/" } };

  return {
    props: {},
  };
};

export default Signup;
