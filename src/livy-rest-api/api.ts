import { Session as LivySession, SessionConfiguration } from './types';
import fetch, { RequestInit, Response } from 'node-fetch';
import AbortController from 'abort-controller';

export interface GetSessionsResponse {
    from: number;
    total: number;
    sessions: LivySession[];
}

function fetchResponse(url: string, additionalInit?: RequestInit): Promise<Response> {
    const controller = new AbortController();
    // TODO: make request timeout configurable
    const ms = 200;
    const timeout = setTimeout(() => controller.abort(), ms);
    const init = { signal: controller.signal, ...additionalInit };
    return fetch(url, init).finally(() => clearTimeout(timeout));
}

async function fetchJson(url: string, additionalInit?: RequestInit) {
    const response = await fetchResponse(url, additionalInit);
    return await response.json();
}

export async function getSessions(url: string): Promise<GetSessionsResponse> {
    return await fetchJson(`${url}/sessions`);
}

export async function postSessions(url: string, configuration?: SessionConfiguration): Promise<LivySession> {
    const init = {
        method: 'POST',
        body: JSON.stringify(configuration ?? {}),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'application/json' },
    };
    return fetchJson(`${url}/sessions`, init);
}

export async function healthCheck(url: string): Promise<void> {
    await fetchResponse(`${url}/sessions`, { method: 'HEAD' });
}
