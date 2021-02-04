import { Session } from './types';

export function isSession(arg: any): arg is Session {
    return arg && arg.id && arg.state;
}
