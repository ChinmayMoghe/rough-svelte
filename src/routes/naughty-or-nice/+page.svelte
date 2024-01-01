<script lang="ts">
	import type { Score } from './+page';
	import { scoreMapFn, generateCurvePath } from './constants';
	export let data: {
		scores: Array<Score>;
		svg: {
			width: number;
			height: number;
			viewBox: Array<number>;
			pathData: string;
			strokeWidth: number;
			offset: number;
		};
	};
	let hoverScore: Score | null;
	let sortProps: { sortDir: String; sortBy: keyof Score | '' } = { sortDir: '', sortBy: '' };
	let scores: Array<Score> = [...data.scores];
	let pathData = data.svg.pathData;
	$: sortScores(sortProps);
	$: pathData = generateCurvePath(scores);
	function plotGraph(scores: Array<Score>) {
		return scores.map((score, i) =>
			scoreMapFn(score, i, data.svg.strokeWidth, data.svg.offset, data.svg.height)
		);
	}

	function sortScores({ sortDir, sortBy }: { sortDir: String; sortBy: keyof Score | '' }) {
		let comparator;
		if (sortDir === 'asc' && sortBy === 'tally') {
			comparator = (a: Score, b: Score) => a[sortBy] - b[sortBy];
		} else if (sortDir === 'dsc' && sortBy === 'tally') {
			comparator = (a: Score, b: Score) => b[sortBy] - a[sortBy];
		}
		if (sortDir === 'asc' && sortBy === 'name') {
			comparator = (a: Score, b: Score) => a[sortBy]?.localeCompare(b[sortBy]);
		} else if (sortDir === 'dsc' && sortBy === 'name') {
			comparator = (a: Score, b: Score) => b[sortBy]?.localeCompare(a[sortBy]);
		}
		scores = plotGraph([...scores].sort(comparator));
	}

	function hoverIn(score: Score) {
		hoverScore = score;
	}
	function hoverOut() {
		hoverScore = null;
	}
	function sortHeader(header: keyof Score) {
		if (sortProps.sortBy !== header) {
			sortProps.sortBy = header;
		}
		sortProps.sortDir = sortProps.sortDir === 'asc' ? 'dsc' : 'asc';
		sortProps = { ...sortProps };
	}
</script>

<h1>Naughty or nice</h1>
<div class="grid">
	<div>
		<button
			on:click={() => {
				sortHeader('name');
			}}
			>Name {sortProps.sortBy === 'name'
				? sortProps.sortDir === 'asc'
					? '⬆️'
					: '⬇️'
				: ' '}</button
		>
		<button
			on:click={() => {
				sortHeader('tally');
			}}
			>Tally {sortProps.sortBy === 'tally'
				? sortProps.sortDir === 'asc'
					? '⬆️'
					: '⬇️'
				: ' '}</button
		>
		{#if hoverScore}
			{hoverScore.name}:{hoverScore.tally}
		{/if}
	</div>
	<div>
		<svg width={data.svg.width} height={data.svg.height} viewBox={data.svg.viewBox.join(' ')}>
			<path d={pathData} fill="transparent" stroke-width="2" stroke="green" />
			<line
				x1={0}
				y1={data.svg.height / 2}
				x2={data.svg.width}
				y2={data.svg.height / 2}
				stroke-width="2"
				stroke="transparent"
			/>
			{#each scores as score}
				<circle
					tabindex="0"
					role="button"
					cx={score.x2}
					cy={score.y2}
					r={data.svg.strokeWidth}
					fill="red"
					on:mouseover={() => hoverIn(score)}
					on:mouseout={() => hoverOut()}
					on:focus={() => hoverIn(score)}
					on:blur={() => hoverOut()}
				/>
			{/each}
		</svg>
	</div>
</div>

<style>
	.grid {
		display: grid;
		gap: 20px;
	}
</style>
