import { Subject } from 'rxjs';
import { Timer } from './timer';

export enum TimerState {
    Stopped,
    Running,
    Paused,
}

export class PausableTimer {

    private pausedTimer = new Timer();
    private elapsedTimer = new Timer();

    private currentState = TimerState.Stopped;
    private totalTime = 0;
    private pausedTime = 0;
    private totalPausedTime = 0;

    public elapsedTime = () => this.totalTime - this.totalPausedTime;
    public tick$ = new Subject<number>();
    public state$ = new Subject<TimerState>();

    
    constructor() {
        this.pausedTimer.tick$.subscribe(v => {
            this.pausedTime = v;
        });

        this.elapsedTimer.tick$.subscribe(v => {
            this.totalTime = v;

            if (this.currentState === TimerState.Running) {
                this.tick$.next(this.elapsedTime());
            }
        });
    }

    public pause() {
        this.pausedTimer.start();
        this.currentState = TimerState.Paused;
        this.state$.next(this.currentState);
    }

    public resume() {
        this.totalPausedTime += this.pausedTime;
        this.pausedTimer.stop();       
        this.pausedTime = 0;

        this.currentState = TimerState.Running;
        this.state$.next(this.currentState);
    }

    public start() {
        this.elapsedTimer.start();
        this.currentState = TimerState.Running;
        this.state$.next(this.currentState);
    }


    public stop() {
        
        this.currentState = TimerState.Stopped;
        
        this.elapsedTimer.stop();
        this.totalTime = 0;
        this.pausedTimer.stop();   
        this.pausedTime = 0;
        this.totalPausedTime = 0;
        
        this.state$.next(this.currentState);
        this.tick$.next(this.elapsedTime());
    }
}
