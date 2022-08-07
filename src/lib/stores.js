import { writable } from 'svelte/store';

export const appState = writable('intro');
export const dragSize = writable(false);
export const geolocation = writable([0, 0]);
export const markers = writable([]);
