import * as vscode from 'vscode';

export class Gpt3Node {
	constructor(
		public readonly label: string,
		public readonly icon: string,
		public readonly command: vscode.Command
	) { }
}
