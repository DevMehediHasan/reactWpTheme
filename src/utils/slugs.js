export const FALLBACK = 'blocking';
export const isCustomPageUri = ( uri ) => {
	const pagesToExclude = [
		'/',
	];

	return pagesToExclude.includes( uri );
};