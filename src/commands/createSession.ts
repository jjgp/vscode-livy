import { CommandIdentifiers, LivyServer } from '../common/constants';
import { CommandRecord } from './base';
import { isSession } from '../livy-rest-api/guards';
import { postSessions } from '../livy-rest-api';
import { sessionNameInputBox } from '../window';

export class CreateSession extends CommandRecord {
    command = CommandIdentifiers.createSession;

    callback = async () => {
        const name = await sessionNameInputBox();
        const configuration = name ? { name } : undefined;

        const url: string | undefined = this.context.memento.get(LivyServer.url);
        if (url) {
            const result = await this.context.livyStatusDisplay.inProgress(() => postSessions(url, configuration));
            if (isSession(result)) {
                this.context.memento.update(LivyServer.activeSessionId, result.id);
                this.context.livyStatusDisplay.setSessionName(name ?? result.id.toString());
            }
        }
    };
}
