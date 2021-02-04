import { ExtensionContext } from 'vscode';
import { LivyStatusBarDisplay } from './window';
import { registerCommands } from './commands';

export function activate({ subscriptions, workspaceState }: ExtensionContext) {
    const context = { enablements: {}, memento: workspaceState, livyStatusDisplay: new LivyStatusBarDisplay() };
    registerCommands(context).forEach((disposable) => subscriptions.push(disposable));
}

export function deactivate() {}
