import { commands } from 'vscode';

export class Enablements {
    async isConnectedToLivyServer(isConnected: boolean): Promise<unknown> {
        return commands.executeCommand('setContext', 'vscode-livy.isConnectedToLivyServer', isConnected);
    }
}
