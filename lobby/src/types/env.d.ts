declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      CORS_ORIGIN: string;
      PORT: string;
      SESSION_SECRET: string;
      QAPI_URL: string;
      ACCESS_SECRECT_KEY: string;
      QAPI_BEARER: string;
      LOBBY_ID: string;
    }
  }
}

export {}
