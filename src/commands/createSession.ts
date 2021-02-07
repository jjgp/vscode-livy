import { CommandIdentifiers, LivyServer } from '../common/constants';
import { CommandRecord } from './base';
import { isSession } from '../livy-api/guards';
import { sessionNameInputBox } from '../window';

export class CreateSession extends CommandRecord {
    command = CommandIdentifiers.createSession;

    callback = async () => {
        const { livyRestApi, livyStatusBarDisplay, memento } = this.context;
        const name = await sessionNameInputBox();
        const configuration = name ? { name } : undefined;

        // TODO: handle canceling
        const url: string | undefined = memento.get(LivyServer.url);
        if (!url) {
            return;
        }

        const result = await livyStatusBarDisplay.inProgress(() => livyRestApi.postSessions(url, configuration));
        if (isSession(result)) {
            memento.update(LivyServer.activeSessionId, result.id);
            livyStatusBarDisplay.setSessionName(name ?? result.id.toString());
        }
    };
}
