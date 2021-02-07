import { ExtensionContext } from 'vscode';
import { LivyRestApi } from './livy-api';
import { LivyStatusBarDisplay } from './window';
import { registerCommands } from './commands';

export function activate({ subscriptions, workspaceState }: ExtensionContext) {
    const context = {
        enablements: {},
        memento: workspaceState,
        // TODO: make request timeout configurable. This may mean the API becomes an instance in the context.
        livyRestApi: new LivyRestApi({ timeout: 1000 }),
        livyStatusBarDisplay: new LivyStatusBarDisplay(),
    };
    registerCommands(context).forEach((disposable) => subscriptions.push(disposable));
}

export function deactivate() {}
