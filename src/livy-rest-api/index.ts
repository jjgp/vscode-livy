import fetch from 'node-fetch';
import { Session as LivySession } from './types';

export interface GetSessionsResponse {
    from: number;
    total: number;
    sessions: LivySession[];
}

export const getSessions = async (url: string): Promise<GetSessionsResponse> => {
    const response = await fetch(`${url}/sessions`);
    return await response.json();
};

export const healthCheck = async (url: string): Promise<void> => {
    await fetch(`${url}/sessions`, { method: 'HEAD' });
};
