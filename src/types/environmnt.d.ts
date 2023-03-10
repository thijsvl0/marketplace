declare namespace NodeJS {
  interface ProcessEnv {
    // CLIENT
    NEXT_PUBLIC_SITE_NAME: string;
    NEXT_PUBLIC_STATIC_URL: string;

    // SERVER
    DATABASE_URL: string;
    NODE_ENV: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    AWS_BUCKET: string;
    AWS_BUCKET_REGION: string;
    AWS_BUCKET_ENDPOINT: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
  }
}
