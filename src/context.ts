import { LivyRestApi } from './livy-api';
import { Memento } from 'vscode';

export interface Enablements {}

export interface LivyStatusDisplay {
    inProgress<R>(task: () => Thenable<R>): Thenable<R | unknown>;
    setSessionName(name: string): void;
}

export interface Context {
    enablements: Enablements;
    memento: Memento;
    livyRestApi: LivyRestApi;
    livyStatusDisplay: LivyStatusDisplay;
}
