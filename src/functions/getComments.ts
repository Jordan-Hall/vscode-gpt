import * as vscode from 'vscode';


export function getComments(document: vscode.TextDocument): string[] {
	const comments: string[] = [];
	for (const line of document.getText().split('\n')) {
		const commentRange = document.getWordRangeAtPosition(
			new vscode.Position(document.lineCount - 1, line.indexOf('//')),
			/\/\/.*/
		);
		if (commentRange) {
			comments.push(document.getText(commentRange));
		}
	}
	return comments;
}