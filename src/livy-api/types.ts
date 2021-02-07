export type Kind = 'spark' | 'pyspark' | 'sparkr' | 'sql';

export type SessionState =
    | 'not_started'
    | 'starting'
    | 'idle'
    | 'busy'
    | 'shutting_down'
    | 'error'
    | 'dead'
    | 'killed'
    | 'success';

export interface Session {
    id: number;
    appId: string;
    owner: string;
    proxyUser: string;
    kind: Kind;
    log: string[];
    state: SessionState;
    appInfo: { [key: string]: string };
}

export interface SessionConfiguration {
    /**
     * @deprecated kind is no longer required as of version 0.5.0-incubating
     */
    kind?: Kind;
    proxyUser?: string;
    jars?: string[];
    pyFiles?: string[];
    files?: string[];
    driverMemory?: string;
    driverCores?: number;
    executorMemory?: string;
    executorCores?: number;
    numExecutors?: number;
    archives?: string;
    queue?: string;
    name?: string;
    conf?: { [key: string]: string };
    heartbeatTimeoutInSecond?: number;
}
