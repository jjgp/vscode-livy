import { window } from 'vscode';
import { CommandRecord } from './base';
import { LivyServer } from '../constants';
import { healthCheck } from '../livy-rest-api';
import { displayProgress, urlInputBox } from '../window';

export class SpecifyUrl extends CommandRecord {
    command = 'vscode-livy.specifyUrl';
    private inputPlaceHolder = 'https://hostname:8998';
    private inputPrompt = 'Enter the URL of the Livy server';
    private progressTitle = 'Checking connection to Livy server...';

    callback = async () => {
        const previousUrl = this.context.state.get(LivyServer.url);
        const options = previousUrl
            ? { value: previousUrl, prompt: this.inputPrompt }
            : { placeHolder: this.inputPlaceHolder, prompt: this.inputPrompt };
        const url = await urlInputBox(options);

        if (url) {
            await this.context.state.update(LivyServer.url, url);
            const errorMessage = await displayProgress(this.progressTitle, () =>
                healthCheck(url).catch((error) => error.message),
            );
            errorMessage && window.showErrorMessage(errorMessage);
            window.setStatusBarMessage('$(server-environment) Livy');
        }
    };
}
