import { Session } from './types';

export function isSession(arg: any): arg is Session {
    return arg && typeof arg.id === 'number' && arg.state;
}
