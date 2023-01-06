const prettierConf = require('.prettierrc');

const config = {
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	files: ['**/*.ts'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		'prettier/prettier': ['error', prettierConf],
		'block-spacing': 'error',
		'function-paren-newline': ['error', 'multiline-arguments'],
		'keyword-spacing': 'error',
		'no-prototype-builtins': 'error',
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: '*',
				next: 'return',
			},
		],
		'sort-imports': 'error',
		'sort-keys': 'error',
	},
};

module.exports = config;
