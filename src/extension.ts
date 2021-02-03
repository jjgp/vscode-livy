import { ExtensionContext } from 'vscode';
import { registerCommands } from './commands';
import { LivyStatusBarDisplay } from './window';

export function activate({ subscriptions, workspaceState }: ExtensionContext) {
    const context = { memento: workspaceState, livyStatusDisplay: new LivyStatusBarDisplay() };
    registerCommands(context).forEach((disposable) => subscriptions.push(disposable));
}

export function deactivate() {}
