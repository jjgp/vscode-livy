import { window } from 'vscode';
import { LivyStatusDisplay } from '../context';

export class LivyStatusBarDisplay implements LivyStatusDisplay {
    private displayLivyStatusMessage(icon: string, sessionName?: string): void {
        sessionName = sessionName ? ` (${sessionName})` : '';
        window.setStatusBarMessage(`${icon} Livy${sessionName}`);
    }

    inProgress<R>(task: () => Thenable<R>): Thenable<R | unknown> {
        const onfulfilled = (result: R) => {
            this.displayLivyStatusMessage('$(check)');
            return result;
        };
        const onrejected = (reason: any) => {
            this.displayLivyStatusMessage('$(error)');
            return reason;
        };

        this.displayLivyStatusMessage('$(sync~spin)');
        return task().then(onfulfilled, onrejected);
    }

    setSessionName(name: string): void {
        this.displayLivyStatusMessage('$(check)', name);
    }
}
