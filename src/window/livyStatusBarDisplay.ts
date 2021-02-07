import { window } from 'vscode';

export class LivyStatusBarDisplay {
    private displayLivyStatusMessage(icon: string, sessionName?: string): void {
        sessionName = sessionName ? ` (${sessionName})` : '';
        window.setStatusBarMessage(`${icon} Livy${sessionName}`);
    }

    private displayRejection = (reason: any): void => {
        window.showErrorMessage(JSON.stringify(reason.stack ?? reason.toString()));
    };

    inProgress = <R>(task: () => Thenable<R>): Thenable<R | unknown> => {
        const onfulfilled = (result: R) => {
            this.displayLivyStatusMessage('$(check)');
            return result;
        };
        const onrejected = (reason: any) => {
            this.displayLivyStatusMessage('$(error)');
            this.displayRejection(reason);
            return reason;
        };

        this.displayLivyStatusMessage('$(sync~spin)');
        return task().then(onfulfilled, onrejected);
    };

    setSessionName = (name: string): void => {
        this.displayLivyStatusMessage('$(check)', name);
    };
}
