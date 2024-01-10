<script>
	import { range } from './constants';
	import { cookieCounter } from './store';
	import { fly } from 'svelte/transition';
	import cookieImg from '../../assets/cookie.png';
	import Santa from '../../assets/Santa_former_.webp';
	import SantaHappy from '../../assets/SantaTransparent.webp';
	let dir = 1;
	const COOKIE_MAX = 100;
	const increaseCookie = () => {
		if ($cookieCounter < COOKIE_MAX) {
			cookieCounter.update((n) => n + 1);
			dir = 1;
		}
	};
	const decreaseCookie = () => {
		if ($cookieCounter > 0) {
			cookieCounter.update((n) => n - 1);
		}
		dir = -1;
	};
</script>

<div class="page">
	<h1>Merry-O-Munch Meter</h1>
	<div class="counter_controls">
		{#key $cookieCounter}
			<h2 in:fly={{ duration: 200, y: -21 * dir }}>{$cookieCounter}</h2>
		{/key}
		<button class="btn" on:click={increaseCookie}>+</button>
		<button class="btn" on:click={decreaseCookie}>-</button>
	</div>
	<div>
		{#if $cookieCounter > 50}
			<img class="santa" src={Santa} alt="South park Santa" />
		{:else}
			<img class="santa" src={SantaHappy} alt="South park happy santa" />
		{/if}
	</div>
	<div>
		{#each range($cookieCounter) as count}
			<img
				in:fly={{ duration: 200, y: -21 }}
				out:fly={{ duration: 200, y: 21 }}
				class="cookie"
				src={cookieImg}
				alt={`${count} cookie`}
			/>
		{/each}
	</div>
</div>

<style>
	h2 {
		font-size: 20px;
	}
	h1 {
		margin: 10px;
		font-size: 24px;
		font-weight: 500;
		grid-column: 1/-1;
	}
	.counter_controls {
		display: flex;
		column-gap: 20px;
		align-items: center;
	}

	.btn {
		width: 40px;
		aspect-ratio: 1;
		background-color: red;
		color: white;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}

	.page {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		place-items: center;
		padding: 20px;
	}

	.cookie {
		aspect-ratio: 1;
		width: 40px;
	}

	.cookie:nth-of-type(even) {
		position: absolute;
	}

	.cookie:nth-of-type(odd) {
		position: relative;
		left: 20px;
	}

	.santa {
		height: 200px;
	}
</style>
