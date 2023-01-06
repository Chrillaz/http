const isEnvTest = process.env.NODE_ENV === 'test';

const presets = [
	[
		require.resolve('@babel/preset-env'),
		{
			modules: isEnvTest ? 'commonjs' : false,
		},
	],
	require.resolve('@babel/preset-typescript'),
	'minify',
];

module.exports = {
	presets,
};
