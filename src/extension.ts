import { ExtensionContext } from 'vscode';
import { registerCommands } from './commands';

export function activate({ subscriptions, workspaceState }: ExtensionContext) {
    const context = { state: workspaceState, status: {} };
    registerCommands(context).forEach((disposable) => subscriptions.push(disposable));
}

export function deactivate() {}
