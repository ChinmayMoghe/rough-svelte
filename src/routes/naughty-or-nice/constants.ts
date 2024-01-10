import type { Score } from './+page';

export const scoreMapFn = (
	score: Score,
	i: number,
	strokeWidth: number,
	offset: number,
	height: number
) => {
	return {
		...score,
		x2: strokeWidth * (i + 1) + i * offset + strokeWidth / 2,
		y1: height / 2,
		y2: score.tally >= 0 ? height / 2 - score.tally : height / 2 + Math.abs(score.tally)
	};
};
export function generateCurvePath(scores: Array<Score>) {
	const pathData = ['M', scores[0].x2, scores[0].y2];

	for (let i = 1; i < scores.length - 1; i++) {
		const xc = (scores[i].x2 + scores[i + 1].x2) / 2;
		const yc = (scores[i].y2 + scores[i + 1].y2) / 2;
		pathData.push('C', scores[i].x2, scores[i].y2, xc, yc, scores[i + 1].x2, scores[i + 1].y2);
	}

	return pathData.join(' ');
}
