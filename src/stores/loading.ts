import { writable } from "svelte/store";

export const loading = writable({
  state: false,
  message: ""
});