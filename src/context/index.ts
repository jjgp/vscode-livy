import { Memento } from 'vscode';

export interface LivyStatusDisplay {
    inProgress<R>(task: () => Thenable<R>): Thenable<R | unknown>;
}

export interface Context {
    memento: Memento;
    livyStatusDisplay: LivyStatusDisplay;
}
