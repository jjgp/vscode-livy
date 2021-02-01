import { CancellationToken, Progress, ProgressLocation, ProgressOptions, window } from 'vscode';

export type Task = (
    progress: Progress<{ message?: string; increment?: number }>,
    token: CancellationToken,
) => Thenable<any>;

export const displayProgress = (title: string, task: Task) => {
    const progressOptions: ProgressOptions = {
        location: ProgressLocation.Notification,
        title,
    };

    window.withProgress(progressOptions, task);
};

export interface URLInputBoxPromptOptions {
    prompt: string;
}

export type URLInputBoxPlaceholderOptions = URLInputBoxPromptOptions | { placeHolder: string };

export type URLInputBoxValueOptions = URLInputBoxPromptOptions | { value: string };

export const urlInputBox = (options: URLInputBoxPlaceholderOptions | URLInputBoxValueOptions) =>
    window.showInputBox({
        ...options,
        ignoreFocusOut: true,
        validateInput: (text) => {
            try {
                new URL(text);
            } catch {
                return 'Invalid URL specified';
            }
        },
    });
