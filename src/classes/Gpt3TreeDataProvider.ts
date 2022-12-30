import * as vscode from 'vscode';
import { Gpt3Node } from './Gpt3Node';

export class Gpt3TreeDataProvider implements vscode.TreeDataProvider<Gpt3Node> {
	private _onDidChangeTreeData: vscode.EventEmitter<
		Gpt3Node | undefined
	> = new vscode.EventEmitter<Gpt3Node | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Gpt3Node | undefined> = this
		._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}

	getTreeItem(element: Gpt3Node): vscode.TreeItem {
		return {
			label: element.label,
			command: element.command,
		};
	}

	getChildren(element?: Gpt3Node): Thenable<Gpt3Node[]> {
		if (!element) {
			return Promise.resolve([
				new Gpt3Node(
					'Execute on current line',
					'line',
					{
						command: 'gpt3.executeLine',
						title: 'Execute GPT-3 on current line'
					}
				),
				new Gpt3Node(
					'Execute on full file',
					'file',
					{
						command: 'gpt3.executeFile',
						title: 'Execute GPT-3 on full file'
					}
				),
				new Gpt3Node(
					'Convert comments',
					'comments',
					{
						command: 'gpt3.convertComments',
						title: 'Convert comments to code'
					}
				),
				new Gpt3Node(
					'Convert tests',
					'tests',
					{
						command: 'gpt3.convertTests',
						title: 'Convert unit tests to code'
					}
				),
			]);
		} else {
			return Promise.resolve([]);
		}
	}
}