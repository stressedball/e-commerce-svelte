<script lang="ts">
	import type { Product_Type } from '$lib';
	import Rating from '$lib/Rating.svelte';
	import { onMount } from 'svelte';

	let product: Product_Type;

	let id = '';

	onMount(async () => {
		id = window.location.pathname.split('/').pop() || '';
		const req = await fetch('https://dummyjson.com/products/' + id);
		product = await req.json();
	});
</script>

<section>
	{#if product}
		<h2 class="title">{product.title}</h2>
		<p class="brand">By {product.brand}</p>
		<div class="carrousel">
			<img src={product.thumbnail} alt="" />
			{#each product.images as image}
				<img src={image} alt="product" />
			{/each}
		</div>
		<div class="price-container">
			<p class="price">{product.price} €</p>
			<p class="discount-rate">- {product.discountPercentage} %</p>
		</div>
		<div class="rating">
			<Rating {product} />
			<span>{product.rating}</span>
		</div>
		<p class="category">{product.category}</p>
		<p class="description">{product.description}</p>
		<p class="stock"><span>Stock : </span>{product.stock}</p>
	{/if}
</section>

<style>
	.carrousel {
		width: 100%;
		display: flex;
		height: 300px;
		align-items: center;
		overflow-x: auto;
		margin-bottom: 0.5rem;
	}

	.brand {
		margin-bottom: 0;
		text-align: center;
	}

	.description {
		text-transform: capitalize;
		margin-bottom: 0.5rem;
		border-left: 0.4rem solid;
		padding-left: 1rem;
	}

	.rating {
		margin: auto;
		margin-bottom: 0.5rem;
	}

	.price {
		font-size: 1.2rem;
		font-weight: 400;
	}

	.category {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
		border: 1px solid;
		border-radius: 1rem;
		width: fit-content;
		padding: 0.2rem 0.5rem;
	}

	@media screen and (max-width: 420px) {
		section {
			margin-top: 4em;
		}
	}

	@media screen and (max-width: 250px) {
		.carrousel {
			height: unset;
		}
	}
</style>
