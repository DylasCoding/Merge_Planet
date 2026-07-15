export class TimerSpawner {
    public timer: number = 0;
    //set-up spawn per time 2 seconds
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
    public setTimer(timeAccount: number) {
        this.timerAccount = timeAccount;
    }
}
