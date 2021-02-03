import { window } from 'vscode';

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
