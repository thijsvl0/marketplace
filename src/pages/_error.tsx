import Button from "../components/common/form/Button";
import Link from "next/link";
import type { NextPage } from "next";
import { getReasonPhrase } from "http-status-codes";

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-9xl font-black text-gray-200">{statusCode}</h1>
      <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Uh-oh!
      </p>
      <p className="mt-4 text-gray-500">
        {statusCode && getReasonPhrase(statusCode)}
      </p>
      <Link href="/" className="mt-4">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
