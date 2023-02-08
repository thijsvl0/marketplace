import { FiAtSign, FiEye, FiEyeOff } from "react-icons/fi";
import type { GetServerSideProps, NextPage } from "next";
import { SignInSchema, signInSchema } from "../../utils/validation/auth";
import { getSession, signIn } from "next-auth/react";

import Button from "../../components/common/form/Button";
import FormGroup from "../../components/common/form/FormGroup";
import Head from "next/head";
import Link from "next/link";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const Signin: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<SignInSchema>({ resolver: zodResolver(signInSchema) });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (!res?.ok)
      return setError("password", {
        message: "Your email or password is incorrect",
      });

    router.push(res?.url ?? "/").catch(console.error);
  };

  return (
    <>
      <Head>
        <title>{`Sign In | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
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
            label="Email"
            type="email"
            placeholder="Enter email"
            icon={<FiAtSign size="1.25rem" />}
            errors={errors.email}
            {...register("email")}
          />

          <FormGroup
            label="Password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter password"
            icon={
              passwordVisible ? (
                <FiEyeOff
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="cursor-pointer"
                  size="1.25rem"
                />
              ) : (
                <FiEye
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="cursor-pointer"
                  size="1.25rem"
                />
              )
            }
            errors={errors.password}
            {...register("password")}
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link className="ml-1 underline" href="/auth/signup">
                Sign up
              </Link>
            </p>

            <Button type="submit">Sign in</Button>
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

export default Signin;
