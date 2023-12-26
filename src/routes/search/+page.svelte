<script lang="ts">
	import { onMount } from 'svelte';
	import type { Product_Type } from '$lib';
	import { browser } from '$app/environment';

	let url: URL;
	let search_params: URLSearchParams;

	onMount(() => {
		url = new URL(window.location.href);
		search_params = new URLSearchParams(url.search);
		if (!search_params.has('query') && browser) {
			window.location.href = '/';
		}
		fetch_results();
	});

	let results: Array<Product_Type> = [];
	async function fetch_results() {
		try {
			const req = await fetch(
				'https://dummyjson.com/products/search?q=' + search_params.get('query')
			);
			const res = await req.json();
			console.log(res);
			results = res.products;
		} catch (error) {
			console.log(error);
		}
	}
</script>

<section>
	{#each results as result}
		<div>
			<p>{result.title}</p>
		</div>
	{/each}
</section>

<style>
    @import '../../css/global.css';
</style>