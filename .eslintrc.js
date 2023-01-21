const config = require('@chrillaz/eslint-plugin');

module.exports = {
	...config,
	rules: {
		'sort-keys': 0,
        '@typescript-eslint/no-var-requires': 0
	},
};
