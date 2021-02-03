import { window } from 'vscode';
import { CommandRecord } from './base';
import { LivyServer } from '../common/constants';
import { isFetchError } from '../common/guards';
import { healthCheck } from '../livy-rest-api';
import { urlInputBox } from '../window';

export class SpecifyUrl extends CommandRecord {
    command = 'vscode-livy.specifyUrl';
    private inputPlaceHolder = 'https://hostname:8998';
    private inputPrompt = 'Enter the URL of the Livy server';
    private progressTitle = 'Checking connection to Livy server...';

    callback = async () => {
        const previousUrl = this.context.memento.get(LivyServer.url);
        const options = previousUrl
            ? { value: previousUrl, prompt: this.inputPrompt }
            : { placeHolder: this.inputPlaceHolder, prompt: this.inputPrompt };
        const url = await urlInputBox(options);

        if (url) {
            this.context.memento.update(LivyServer.url, url);
            const result = await this.context.livyStatusDisplay.inProgress(() => healthCheck(url));
            if (isFetchError(result)) {
                result && window.showErrorMessage(result.message);
            }
        }
    };
}
