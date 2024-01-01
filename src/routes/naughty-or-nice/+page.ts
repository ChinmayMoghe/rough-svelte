import type { PageLoadEvent } from './$types';
import { generateCurvePath, scoreMapFn } from './constants';

export type Score = {
	name: string;
	tally: number;
	x1: number;
	x2: number;
	y1: number;
	y2: number;
};
export async function load({ fetch }: PageLoadEvent) {
	const data = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
	let scores: Array<Score> = await data.json();
	const offset = 7;
	const strokeWidth = 5;
	const maxScore = Math.max(...scores.map((score) => score.tally));
	const minScore = Math.min(...scores.map((score) => score.tally));
	const lineLen = strokeWidth * scores.length + offset * (scores.length - 1);
	const [width, height] = [
		lineLen + strokeWidth * 2,
		maxScore + Math.abs(minScore) + strokeWidth * 5
	];
	scores = scores.map((score, i) => scoreMapFn(score, i, strokeWidth, offset, height));
	const pathData = generateCurvePath(scores);
	return {
		scores,
		svg: { width, height, offset, strokeWidth, viewBox: [0, 0, width, height], pathData }
	};
}
