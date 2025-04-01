declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        HOST: string;
        NODE_ENV: 'development' | 'production';
        TRUST_PROXY:string;
        MAX_REQUEST_PER_WINDOW:string;

        MONGO_URI: string;
      }
    }
}

export {}