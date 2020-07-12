import { Subject } from 'rxjs';

export class BootController {
    private static instance: BootController;
    private reboot = new Subject();
    private reboot$ = this.reboot.asObservable();

    // Singleton
    static getbootControl() {
        if (!BootController.instance) {
            BootController.instance = new BootController();
        }
        return BootController.instance;
    }

    public watchReboot() {
        return this.reboot$;
    }

    public restart() {
        this.reboot.next(true);
    }
}