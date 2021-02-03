import { CancellationToken, Progress, ProgressLocation, ProgressOptions, window } from 'vscode';

export type Task<R> = (
    progress: Progress<{ message?: string; increment?: number }>,
    token: CancellationToken,
) => Thenable<R>;

export function displayProgress<R>(title: string, task: Task<R>): Thenable<R> {
    const progressOptions: ProgressOptions = {
        location: ProgressLocation.Notification,
        title,
    };

    return window.withProgress(progressOptions, task);
}

export * from './urlInputBox';
