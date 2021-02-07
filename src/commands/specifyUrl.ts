import { CommandIdentifiers, LivyServer } from '../common/constants';
import { CommandRecord } from './base';
import { isFetchError } from '../common/guards';
import { urlInputBox } from '../window';
import { window } from 'vscode';

export class SpecifyUrl extends CommandRecord {
    command = CommandIdentifiers.specifyUrl;
    private inputPlaceHolder = 'https://hostname:8998';
    private inputPrompt = 'Enter the URL of the Livy server';

    callback = async () => {
        const { livyRestApi, livyStatusDisplay, memento } = this.context;
        const previousUrl = memento.get(LivyServer.url);
        const options = previousUrl
            ? { value: previousUrl, prompt: this.inputPrompt }
            : { placeHolder: this.inputPlaceHolder, prompt: this.inputPrompt };
        const url = await urlInputBox(options);

        if (url) {
            memento.update(LivyServer.url, url);
            const result = await livyStatusDisplay.inProgress(() => livyRestApi.healthCheck(url));
            // TODO: just check for message in guard and make a more generic type.. or check that it is an abort and change the message.
            if (isFetchError(result)) {
                result && window.showErrorMessage(result.message);
            }
        }
    };
}
