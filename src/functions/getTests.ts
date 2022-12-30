export function getTest(code: string, language: string): string[] | undefined {
	const tests: string[] = [];
	let testRegex: RegExp;
	let testMatch: RegExpExecArray | null
	// Extract the unit tests from the code, based on the language
	switch (language) {
		case 'javascript':
			// Use regular expressions to extract the unit tests
			testRegex = /(?:test|it)\(.+\,\s*\(.*\)\s*=>/g;
			testMatch = testRegex.exec(code);
			while (testMatch) {
				tests.push(testMatch[0]);
				testMatch = testRegex.exec(code);
			}
			return tests;
		case 'python':
			// Use regular expressions to extract the unit tests

			testRegex = /def\s+test_.+:/g;
			testMatch = testRegex.exec(code);
			while (testMatch) {
				tests.push(testMatch[0]);
				testMatch = testRegex.exec(code);
			}
			return tests;
		default:
			return undefined;
	}
}