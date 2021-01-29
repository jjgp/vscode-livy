import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-livy.specifyUrl', () => {
		vscode.window.showInformationMessage("Eventually you'll be able to specify a URL!");
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
