import { Memento } from 'vscode';

export interface Status {}

export interface Context {
    state: Memento;
    status: Status;
}
