import { useUserId } from "~/composables/useUserId";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase as string;
  const userId = useUserId().value || 'anonymous';

  const api = $fetch.create({
    baseURL,
    onRequest({ options }) {
      const headers = new Headers(options.headers as HeadersInit);
      headers.set('x-user-id', userId);
      options.headers = headers;
    }
  });

  return { provide: { api } };
});
