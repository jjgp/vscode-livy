import { Context } from '../context';
import { CreateSession } from './createSession';
import { SpecifyUrl } from './specifyUrl';

export const registerCommands = (context: Context) =>
    [new SpecifyUrl(context), new CreateSession(context)].map((record) => record.register());
