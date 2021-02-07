import { CommandIdentifiers, LivyServer } from '../common/constants';
import { CommandRecord } from './base';
import { isSession } from '../livy-api/guards';
import { sessionNameInputBox } from '../window';

export class CreateSession extends CommandRecord {
    command = CommandIdentifiers.createSession;

    callback = async () => {
        const { livyRestApi, livyStatusDisplay, memento } = this.context;
        const name = await sessionNameInputBox();
        const configuration = name ? { name } : undefined;

        const url: string | undefined = memento.get(LivyServer.url);
        if (url) {
            const result = await livyStatusDisplay.inProgress(() => livyRestApi.postSessions(url, configuration));
            if (isSession(result)) {
                this.context.memento.update(LivyServer.activeSessionId, result.id);
                this.context.livyStatusDisplay.setSessionName(name ?? result.id.toString());
            }
        }
    };
}
