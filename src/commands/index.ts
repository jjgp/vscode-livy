import { Context } from '../context';
import { SpecifyUrl } from './specifyUrl';

export const registerCommands = (context: Context) => [new SpecifyUrl(context)].map((record) => record.register());
