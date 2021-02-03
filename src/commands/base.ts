import { commands, Disposable } from 'vscode';
import { Context } from '../context';

export abstract class CommandRecord {
    abstract command: string;
    abstract callback: (...args: any[]) => any;

    constructor(public context: Context) {}

    register(): Disposable {
        return commands.registerCommand(this.command, this.callback);
    }
}
