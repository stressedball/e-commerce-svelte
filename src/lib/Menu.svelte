<script lang="ts">
	import { onMount } from 'svelte';
	import SearchBar from './Search_bar.svelte';
	import { current_category } from '$lib/stores';

	let categories: Array<string> = [];
	let menu_hide_class = '';

	onMount(async () => {
		const req = await fetch('https://dummyjson.com/products/categories');
		const res = await req.json();
		categories = res;
		current_category.update(() => 'home');
	});

	const handle_class = () => {
		menu_hide_class === '' ? (menu_hide_class = 'show') : (menu_hide_class = '');
		handle_menu();
	};

	const handle_menu = () => {
		document.addEventListener('click', (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.id === 'menu-button') return;
			if (menu_hide_class !== 'show') return;
			if (target?.id !== 'menu-container') menu_hide_class = '';
		});
	};

	export let menu_button_top = 69;
	export let handle_category: (category: string) => void;
</script>

<aside class={menu_hide_class} id="menu-container" style="top: {menu_button_top}px">
	<SearchBar />
	<button id="menu-button" on:click={handle_class}>Menu</button>
	<ul class={menu_hide_class}>
		<li>
			<a
				href="/"
				class="category-link {$current_category === 'home' ? 'current-category' : ''}"
				on:click={() => {
					handle_class();
					handle_category('home');
				}}>Home</a
			>
		</li>
		{#each categories as category}
			<li>
				<a
					on:click={() => {
						handle_class();
						handle_category(category);
					}}
					href="/categories/{category}"
					class="category-link {$current_category === category ? 'current-category' : ''}"
					>{category}</a
				>
			</li>
		{/each}
	</ul>
</aside>

<style>
	aside {
		grid-column: 1;
		max-width: fit-content;
	}

	button {
		display: none;
		width: 100%;
		/* margin: 0 0.5em; */
		box-sizing: border-box;
		padding: 0.3em;
		font-size: 1.1em;
		border: none;
		box-shadow: 0 0 2px 0 black;
	}

	ul {
		margin: 0;
		/* padding: 0 0.5em; */
		padding-left: 0;
		overflow: auto;
		box-sizing: border-box;
		height: 100%;
	}

	li {
		list-style: none;
		height: fit-content;
	}

	a {
		display: block;
		text-decoration: none;
		color: inherit;
		padding: 0.2em;
		text-transform: uppercase;
		border-bottom: 1px solid;
	}

	.current-category {
		background-color: black;
		color: white;
	}

	@media screen and (max-width: 600px) {
		aside {
			position: fixed;
			width: 100%;
			height: 32px;
			/* margin: 0 0.5em; */
			box-sizing: border-box;
			padding: 0 0.5em;
			max-width: unset;
			z-index: 1;
		}

		aside.show {
			height: 100%;
		}

		button {
			display: block;
			width: calc(100% - 2px);
			margin: auto;
		}

		ul {
			animation: menu-slide-out 150ms forwards ease-out;
			background-color: white;
			width: 100%;
			padding: 0;
			border: 1px;
			border-style: solid;
		}

		ul.show {
			animation: menu-slide-in 200ms forwards ease-in;
		}

		@keyframes menu-slide-in {
			from {
				transform: translate(-100%);
				opacity: 0;
			}
			to {
				transform: translate(0);
				opacity: 1;
			}
		}

		@keyframes menu-slide-out {
			from {
				transform: translate(0);
				opacity: 1;
			}
			to {
				transform: translate(-100%);
				opacity: 0;
			}
		}
	}
</style>
