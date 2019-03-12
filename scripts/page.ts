import { PausableTimer, TimerState } from "./pausable-timer";
import * as fn from './functions';
let ko = require('knockout') as KnockoutStatic;

export class Page {

    isRunning = ko.pureComputed(() => {
        return this._timerState() === TimerState.Running || this._timerState() === TimerState.Paused
    }, this);

    isPaused = ko.pureComputed(() => {
        return this._timerState() === TimerState.Paused
    }, this);

    isStopped = ko.pureComputed(() => {
        return this._timerState() === TimerState.Stopped
    }, this);

    private readonly _timer = new PausableTimer();
    
    formattedTime = ko.observable('');
    currentSeconds = ko.observable(0);
    _timerState = ko.observable<TimerState>();

    constructor() {
        this._timer.tick$.subscribe((n) => {
            this.currentSeconds(n);
            this.formattedTime(fn.formatTime(n));
        });

        this._timer.state$.subscribe((state) => {
            this._timerState(state);
        });

        let container = document.getElementById('page-container');
        ko.applyBindings(this, container);
    }


    private onStartClick(e: Event) {
        this._timer.start();
    }

    private onPauseClick(e: Event) {
        this._timer.pause();
    }

    private onResumeClick(e: Event) {
        this._timer.resume();
    }

    private onStopClick(e: Event) {
        this._timer.stop();
    }
}