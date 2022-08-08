import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const appState = writable('intro');
export const dragSize = writable(false);
export const geolocation = writable([0, 0]);
export const markers = writable([]);

export const userState = writable(
	(browser && JSON.parse(localStorage.getItem('userState'))) || {
		car: true,
		paid: false,
		first_visit: true
	}
);

userState.subscribe((val) => browser && (localStorage.userState = JSON.stringify(val)));
