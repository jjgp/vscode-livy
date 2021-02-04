import { Session as LivySession, SessionConfiguration } from './types';
import fetch from 'node-fetch';

export interface GetSessionsResponse {
    from: number;
    total: number;
    sessions: LivySession[];
}

export const getSessions = async (url: string): Promise<GetSessionsResponse> => {
    const response = await fetch(`${url}/sessions`);
    return await response.json();
};

export const postSessions = async (url: string, configuration?: SessionConfiguration): Promise<LivySession> => {
    const body = JSON.stringify(configuration ?? {});
    const response = await fetch(`${url}/sessions`, {
        method: 'POST',
        body,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
};

export const healthCheck = async (url: string): Promise<void> => {
    await fetch(`${url}/sessions`, { method: 'HEAD' });
};
