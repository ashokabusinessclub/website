/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the Payload CMS REST API, e.g. https://cms.example.com/api.
   *  When unset the site renders purely from bundled markdown content. */
  readonly VITE_CMS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}