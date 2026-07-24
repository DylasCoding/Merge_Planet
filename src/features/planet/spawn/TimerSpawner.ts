export class Timer {
    public timer: number = 0;

    public timerAccount!: number;
    public isCounting!: boolean;
    constructor() {}
    public update(deltaTime: number) {
        if (this.isCounting) this.timer += deltaTime;
    }
    public timeUp() {
        if (this.timer > this.timerAccount) {
            this.timer -= this.timerAccount;
            return true;
        }
        return false;
    }
    public turnTimer() {
        if (this.isCounting) {
            return (this.isCounting = false);
        }
        return (this.isCounting = true);
    }
    public onOffTimer(boolean: boolean) {
        return (this.isCounting = boolean);
    }
    public setTimer(timeAccount: number) {
        this.timerAccount = timeAccount;
    }
    public resetTimer() {
        this.timer = 0;
    }
}
