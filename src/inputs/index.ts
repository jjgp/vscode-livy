import { window } from 'vscode';

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
