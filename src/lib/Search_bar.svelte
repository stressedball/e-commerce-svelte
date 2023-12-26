<script lang="ts">
	import SearchIcon from './Search-Icon.svelte';

	let search_request = '';

	const navigate = () => {
		if (search_request === '') return;
		window.location.href = `/search?query=${search_request}`;
	};
</script>

<div class="search-bar">
	<input bind:value={search_request} type="text" name="search" id="search" />
	<button on:click={navigate}>
		<SearchIcon />
	</button>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		border: 1px solid;
		background-color: white;
		height: 30px;
	}

	button {
		border: none;
		background-color: inherit;
		height: 100%;
		border-left: 1px solid;
		display: flex;
		align-items: center;
		justify-content: center;	
		width: 30px;
	}

	input {
		border: none;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		flex: 1;
	}
</style>
