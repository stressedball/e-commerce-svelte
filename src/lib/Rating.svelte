<script lang="ts">
	import Star from './Star.svelte';
	import type { Product_Type } from '$lib';
	export let product: Product_Type;
	console.log(product);
</script>

<div class="stars-container">
	<Star />
	<Star />
	<Star />
	<Star />
	<Star />
	<div class="cover" style="width: {(1 - product.rating / 5) * 100}%;" />
</div>

<style>
	/* STARS */
	.stars-container {
		position: relative;
		margin-right: 1em;
		width: fit-content;
	}

	.cover {
		position: absolute;
		top: 0;
		right: 0;
		background-color: white;
		content: '';
		height: 100%;
	}
</style>
