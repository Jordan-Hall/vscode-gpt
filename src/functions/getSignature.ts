export function getSignature(test: string, language: string): string {
	let signatureRegex: RegExp;
	let signatureMatch: RegExpExecArray | null;
	// Extract the signature of the unit test, based on the language
	switch (language) {
		case 'javascript':
			// Use regular expressions to extract the signature
			signatureRegex = /(?:test|it)\((.+)\,/;
			signatureMatch = signatureRegex.exec(test);
			if (signatureMatch) {
				return signatureMatch[1];
			} else {
				return '';
			}
		case 'python':
			// Use regular expressions to extract the signature
			signatureRegex = /def\s+(test_.+)\(/;
			signatureMatch = signatureRegex.exec(test);
			if (signatureMatch) {
				return signatureMatch[1];
			} else {
				return '';
			}
		default:
			return '';
	}
}