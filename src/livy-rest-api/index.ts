import { Session } from 'inspector';
import fetch from 'node-fetch';
import { Session as LivySession } from './types';

interface GetSessionsResponse {
    from: number;
    total: number;
    sessions: LivySession[];
}

export const getSessions = async (url: string): Promise<GetSessionsResponse> => {
    const response = await fetch(`${url}/sessions`);
    return await response.json();
};
