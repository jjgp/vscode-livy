import { LivyRestApi } from './livy-api';
import { LivyStatusBarDisplay } from './window';
import { Memento } from 'vscode';

export interface Enablements {}

export interface Context {
    enablements: Enablements;
    memento: Memento;
    livyRestApi: LivyRestApi;
    livyStatusBarDisplay: LivyStatusBarDisplay;
}
