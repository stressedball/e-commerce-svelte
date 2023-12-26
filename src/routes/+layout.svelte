<script lang="ts">
	import Menu from '$lib/Menu.svelte';
	// import { afterUpdate, onMount } from 'svelte';
	import { current_category, cart } from '$lib/stores';
	import '../css/global.css';

	const handle_category = (category: string) => {
		current_category.update(() => category);
	};

	// margin top 69px
	let menu_button_top = 69;

	const handle_menu_position = () => {
		menu_button_top = 69 - window.scrollY;
		if (menu_button_top < 0) menu_button_top = 0;
	};

</script>

<svelte:window on:scroll={() => handle_menu_position()} />
<main>
	<header>
		<h1><a href="/">E-Commerce</a></h1>
		<button on:click={() => (window.location.href = '/cart')}>
			<img src="/icons/shopping-svgrepo-com.svg" alt="cart-icon" />
			<span>{$cart.length || ''}</span>
		</button>
	</header>
	<Menu {handle_category} {menu_button_top} />
	<slot {current_category} />
</main>

<style>
	header {
		position: relative;
		grid-column: 2;
	}

	h1 {
		padding: 1em 0;
		padding-left: 1em;

		& a {
			text-decoration: none;
			color: inherit;
		}
	}

	button {
		position: absolute;
		top: 50%;
		right: 1em;
		max-height: 50px;
		transform: translate(0, -50%);
		border: none;
		background-color: transparent;
	}

	img {
		max-height: inherit;
	}

	span {
		position: absolute;
		top: 9px;
		left: 29px;
		font-size: 1.2em;
		font-weight: 600;
	}

	@media screen and (max-width: 600px) {
		h1 {
			padding: 0.5em 0;
			padding-left: 0.25em;
		}

		button {
			right: 0.25em;
			padding: 0;
		}

		span {
			/* left: 15px; */
			left: 23px;
		}
	}
</style>
