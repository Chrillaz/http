module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts"
    ],
    coveragePathIgnorePatterns: [
        "node_modules",
        "<rootDir>/src/index.ts"
    ],
	testMatch: ['<rootDir>/src/**/*.test.ts'],
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }],
	},
	testEnvironment: 'jsdom',
	verbose: true,
};
