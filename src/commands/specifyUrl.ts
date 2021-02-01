import { window } from 'vscode';
import { CommandRecord } from './base';
import { displayProgress, urlInputBox } from '../window';
import { healthCheck } from '../livy-rest-api';
import { globalStateKeys } from '../context';

export class SpecifyUrl extends CommandRecord {
    command = 'vscode-livy.specifyUrl';
    private inputPlaceHolder = 'https://hostname:8998';
    private inputPrompt = 'Enter the URL of the Livy server';
    private progressTitle = 'Checking connection to Livy server...';

    callback = async () => {
        const previousUrl = this.context.globalState.get(globalStateKeys.livyServerUrl);
        const options = previousUrl
            ? { value: previousUrl, prompt: this.inputPrompt }
            : { placeHolder: this.inputPlaceHolder, prompt: this.inputPrompt };
        const url = await urlInputBox(options);

        if (url) {
            this.context.globalState.update(globalStateKeys.livyServerUrl, url);
            try {
                await displayProgress(this.progressTitle, () => healthCheck(url));
            } catch (error) {
                window.showErrorMessage(error.message);
            }
        }
    };
}
