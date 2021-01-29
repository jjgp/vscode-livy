import { commands, ExtensionContext, window } from 'vscode';

namespace Commands {
	export const specifyUrl = 'vscode-livy.specifyUrl';
}

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand(Commands.specifyUrl, () => {
		window.showInformationMessage("Eventually you'll be able to specify a URL!");
	}));
}

export function deactivate() {}
