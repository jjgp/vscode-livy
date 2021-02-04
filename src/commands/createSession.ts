import { CommandIdentifiers, LivyServer } from '../common/constants';
import { CommandRecord } from './base';
import { isSession } from '../livy-rest-api/guards';
import { postSessions } from '../livy-rest-api';

export class CreateSession extends CommandRecord {
    command = CommandIdentifiers.createSession;

    callback = async () => {
        const url: string | undefined = this.context.memento.get(LivyServer.url);
        if (url) {
            const result = await this.context.livyStatusDisplay.inProgress(() => postSessions(url));
            if (isSession(result)) {
                this.context.memento.update(LivyServer.activeSessionId, result.id);
                this.context.livyStatusDisplay.setSessionName(result.id.toString());
            }
        }
    };
}
