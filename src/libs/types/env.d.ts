declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly NEXT_PUBLIC_SUPABASE_URL: string;
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}
