/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CAL_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_WHATSAPP_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
