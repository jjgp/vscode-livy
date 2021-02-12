import { CommandIdentifiers, LivyServer } from '../common/constants';
import { CommandRecord } from './base';
import { urlInputBox } from '../window';

export class SpecifyUrl extends CommandRecord {
    command = CommandIdentifiers.specifyUrl;
    private inputPlaceHolder = 'https://hostname:8998';
    private inputPrompt = 'Enter the URL of the Livy server';

    callback = async () => {
        const { livyRestApi, livyStatusBarDisplay, memento } = this.context;
        const previousUrl = memento.get(LivyServer.url);
        const options = previousUrl
            ? { value: previousUrl, prompt: this.inputPrompt }
            : { placeHolder: this.inputPlaceHolder, prompt: this.inputPrompt };
        const url = await urlInputBox(options);

        if (url) {
            memento.update(LivyServer.url, url);
            livyStatusBarDisplay.inProgress(() => livyRestApi.healthCheck(url));
        }
    };
}
