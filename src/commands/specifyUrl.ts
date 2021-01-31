import { CommandRecord } from './base';
import { displayProgress, urlInputBox } from '../window';
import { getSessions } from '../livy-rest-api';

export class SpecifyUrl extends CommandRecord {
    command = 'vscode-livy.specifyUrl';
    private inputPlaceHolder = 'https://hostname:8998';
    private inputPrompt = 'Enter the URL of the Livy server';
    private progressTitle = 'Connecting to Livy server...';

    callback = async () => {
        const key = 'url';
        const previousUrl = this.context.globalState.get(key);
        const options = previousUrl
            ? { value: previousUrl, prompt: this.inputPrompt }
            : { placeHolder: this.inputPlaceHolder, prompt };
        const url = await urlInputBox(options);

        if (url) {
            this.context.globalState.update(key, url);
            displayProgress(this.progressTitle, () => getSessions(url));
        }
    };
}
