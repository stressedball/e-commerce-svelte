<script lang="ts">
	import { onMount } from 'svelte';
	import type { Product_Type } from '$lib';
	import { current_category, cart } from '$lib/stores';
	import { afterNavigate } from '$app/navigation';
	import Rating from '$lib/Rating.svelte';

	let products: Array<Product_Type> = [];

	onMount(() => {
		if ($current_category === '') {
			let category = window.location.pathname.split('/').pop();
			current_category.update(() => category || '');
		}
	});

	const fetchData = async () => {
		const req = await fetch(
			`https://dummyjson.com/products/category/${$current_category}/?skip=0&select=title,brand,price,thumbnail,rating,discountPercentage`
		);
		const res = await req.json();
		products = res.products;
	};

	afterNavigate(async () => {
		await fetchData();
	});
</script>

<section>
	<h2>{$current_category}</h2>
	{#if products}
		{#each products as product}
			<article>
				<div class="img-container">
					<img src={product.thumbnail} alt="product-thumbnail" />
				</div>
				<div class="item-container">
					<a class="title" href="/products/{product.id}">{product.title}</a>
					<p class="brand">By {product.brand}</p>
					<div class="rating">
						<Rating {product} />
						<p>({product.rating})</p>
					</div>
					<div class="price-container">
						<p class="price">{product.price} €</p>
						<p class="discount-rate">- {product.discountPercentage} %</p>
					</div>
					<button class="add-to-cart" on:click={() => cart.update((arr) => [...arr, product])}
						>Add To Cart</button
					>
				</div>
			</article>
		{/each}
	{/if}
</section>

<style>

	h2 {
		margin-bottom: 1em;
		text-transform: capitalize;
	}

	article {
		border: 1px solid;
		flex-wrap: wrap;
		width: min(90%, 500px);
		border-radius: 1em;
		justify-content: center;
	}

	.item-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* IMAGE */
	.img-container {
		width: min(250px, 90%);
	}

	@media screen and (max-width: 730px) {
		section {
			padding: 1em 0.5em;
		}

		.title,
		.brand {
			display: inline;
		}

		.img-container {
			overflow: hidden;
		}
	}

	@media screen and (max-width: 300px) {
		article {
			width: 100%;
		}
	}
</style>
