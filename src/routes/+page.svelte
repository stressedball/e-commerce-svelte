<script lang="ts">
	import type { Product_Type } from '$lib';
	import { current_category } from '$lib/stores';

	let products: Array<Product_Type> = [];

	async function fetch_products() {
		for (let i = 0; i < 3; i++) {
			const random = Math.floor(Math.random() * 96);
			const req = await fetch(
				`https://dummyjson.com/products?limit=1&skip=${random}&select=category,thumbnail`
			);
			const res = await req.json();
			products.push(res.products[0]);
		}
	}

	const handle_category = (category:string) => {
		current_category.update(() => category);
	}
</script>

<head>
	<title>E-Commerce with Svelte</title>
</head>

<section>
	<header>
		<p>Welcome to this dummy e-commerce website.</p>
		<p>
			Powered with the amazing
			<a href="https://dummyjson.com/">Dummy JSON API</a>
		</p>
		<p>We have a variety of fake products for you to browse</p>
	</header>
	<div>
		{#await fetch_products() then}
			{#each products as product}
				<article>
					<p class="category">{product.category}</p>
					<div class="img-container">
						<img src={product.thumbnail} alt="product-thumbnail" />
					</div>
					<a on:click={() => handle_category(product.category)} href="/categories/{product.category}">Discover more</a>
				</article>
			{/each}
		{/await}
	</div>
</section>

<style>
	section {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	header p {
		text-align: center;
		padding-bottom: 1em;
	}

	header p:nth-child(1) {
		font-size: 1.4em;
		text-wrap: balance;
		padding: 1em 0;
	}

	header p:nth-child(3) {
		font-size: 1.4em;
		padding-top: 1em;
	}

	div {
		display: flex;
		flex-wrap: wrap;
		margin-top: 1em;
		gap: 1em;
	}

	article {
		flex-direction: column;
		flex: 1;
		border: 1px solid;
		justify-content: space-between;
		padding: 0.5em 0;
		border-radius: 1em;
		min-width: 200px;
	}

	article a {
		text-transform: capitalize;
		text-align: center;
		width: 100%;
	}

	.img-container {
		height: 200px;
		width: 200px;
		margin: 0.5em auto;
	}

	img {
		border-radius: 0;
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.category {
		text-align: center;
		text-transform: capitalize;
		width: 100%;
		font-size: 1.1em;
		font-weight: 600;
	}

	@media screen and (max-width: 420px) {
		section {
			display: block;
			margin-top: 4em;
		}

		div {
			flex-direction: column;
		}

		header p {
			margin-bottom: 0.5em;
		}

		article {
			padding: 0.5em;
		}
	}
</style>
