import { ExtensionContext } from 'vscode';
import { SpecifyUrl } from './specifyUrl';

export const registerCommands = (context: ExtensionContext) =>
    [new SpecifyUrl(context)].map((record) => record.register());
