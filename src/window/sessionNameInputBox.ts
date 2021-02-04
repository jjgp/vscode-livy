import { nameFromMenagerie } from '../session-name-generator';
import { window } from 'vscode';

export const sessionNameInputBox = () => window.showInputBox({ value: nameFromMenagerie() });
