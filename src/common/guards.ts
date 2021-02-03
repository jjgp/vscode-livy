import { FetchError } from 'node-fetch';

export function isFetchError(arg: any): arg is FetchError {
    return arg && arg.name === 'FetchError' && arg.message;
}
