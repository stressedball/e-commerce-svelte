import { writable } from 'svelte/store';
import type { Product_Type } from '$lib';
import { browser } from '$app/environment';

export const current_category = writable('');

export const cart = writable(browser && JSON.parse(localStorage.getItem('cart') || '[]'));
cart.subscribe((arr) => browser && localStorage.setItem('cart', JSON.stringify(arr)));
