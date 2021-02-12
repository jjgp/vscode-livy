import { window } from 'vscode';

export const sessionNameInputBox = () => {
    const prompt = 'Enter session name or leave blank';

    return window.showInputBox({ prompt });
};
