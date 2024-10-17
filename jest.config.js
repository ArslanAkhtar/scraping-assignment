module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coveragePathIgnorePatterns: ["/node_modules/"],
	collectCoverage: false,
};
