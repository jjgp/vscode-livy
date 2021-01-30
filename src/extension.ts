import { ExtensionContext } from 'vscode';
import { registerCommands } from './commands';

export function activate(context: ExtensionContext) {
    registerCommands(context).forEach((disposable) => context.subscriptions.push(disposable));
}

export function deactivate() {}
