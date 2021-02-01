import { CancellationToken, Progress, ProgressLocation, ProgressOptions, window } from 'vscode';

type Task = (progress: Progress<{ message?: string; increment?: number }>, token: CancellationToken) => Thenable<any>;

export const displayProgress = (title: string, task: Task) => {
    const progressOptions: ProgressOptions = {
        location: ProgressLocation.Notification,
        title,
    };

    window.withProgress(progressOptions, task);
};

interface URLInputBoxPromptOptions {
    prompt: string;
}

type URLInputBoxPlaceholderOptions = URLInputBoxPromptOptions | { placeHolder: string };

type URLInputBoxValueOptions = URLInputBoxPromptOptions | { value: string };

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