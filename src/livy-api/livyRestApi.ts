import { Session as LivySession, SessionConfiguration } from './types';
import fetch, { RequestInit, Response } from 'node-fetch';
import AbortController from 'abort-controller';

export interface GetSessionsResponse {
    from: number;
    total: number;
    sessions: LivySession[];
}

export interface LivyRestApiInit {
    timeout: number;
}

export class LivyRestApi {
    constructor(public init: LivyRestApiInit) {}

    private fetchResponse = (url: string, additionalInit?: RequestInit): Promise<Response> => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.init.timeout);
        const init = { signal: controller.signal, ...additionalInit };
        return fetch(url, init).finally(() => clearTimeout(timeout));
    };

    private fetchJson = async <R>(url: string, additionalInit?: RequestInit): Promise<R> => {
        const response = await this.fetchResponse(url, additionalInit);
        return response.json();
    };

    getSessions = (url: string): Promise<GetSessionsResponse> => this.fetchJson(`${url}/sessions`);

    postSessions = (url: string, configuration?: SessionConfiguration): Promise<LivySession> => {
        const init = {
            method: 'POST',
            body: JSON.stringify(configuration ?? {}),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            headers: { 'Content-Type': 'application/json' },
        };
        return this.fetchJson(`${url}/sessions`, init);
    };

    healthCheck = async (url: string): Promise<void> => void this.fetchResponse(`${url}/sessions`, { method: 'HEAD' });
}
