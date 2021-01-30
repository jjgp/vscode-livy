import { CommandRecord } from './base';
import { urlInputBox } from '../inputs';

export class SpecifyUrl extends CommandRecord {
    command: string = 'vscode-livy.specifyUrl';

    callback = async () => {
        const key = 'url';
        const previousUrl = this.context.globalState.get(key);
        const prompt = 'Enter the URL of the Livy server';
        const options = previousUrl ? { value: previousUrl, prompt } : { placeHolder: 'https://hostname:8998', prompt };
        const url = await urlInputBox(options);
        this.context.globalState.update(key, url);
    };
}
