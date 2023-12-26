<script lang="ts">
	import { cart } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { Product_Type } from '$lib';

	let total = 0;

	onMount(() => {
		if ($cart.length) $cart.map((el: Product_Type) => (total += el.price));
	});
</script>

<section>
	<h2>Your list of items</h2>
	<div class="container">
		{#each $cart as item}
			<article>
				<p class="item-title">{item.title}</p>
				<div class="img-container">
					<img src={item.thumbnail} alt="" />
				</div>
				<p class="price">{item.price} €</p>
			</article>
		{/each}
	</div>
	<div class="checkout">
		<p>Total : {total} €</p>
	</div>
</section>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
	}

	article {
		width: fit-content;
		display: flex;
		flex-direction: column;
		border: 1px solid;
	}

	.img-container {
		width: 200px;
		height: 200px;
	}

	img {
		margin: auto;
	}
</style>
