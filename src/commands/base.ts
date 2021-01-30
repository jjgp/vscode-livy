import { commands, Disposable, ExtensionContext } from 'vscode';

export abstract class CommandRecord {
    abstract command: string;
    abstract callback: (...args: any[]) => any;

    constructor(public context: ExtensionContext) {}

    register(): Disposable {
        return commands.registerCommand(this.command, this.callback);
    }
}
