module.exports = {
	testMatch: ['<rootDir>/src/**/*.test.ts'],
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }],
	},
	testEnvironment: 'jsdom',
	verbose: true,
};
