import { Subject, interval, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class Timer {

    private timer$: Subscription;
    private stop$ = new Subject<void>();
    public tick$ = new Subject<number>();
    public state$ = new Subject<boolean>();

    constructor() {
    }

    public start() {

        const t = new Date();

        if (this.timer$) {
            return;
        }

        const source = interval(1000);

        this.timer$ = source.pipe(
            takeUntil(this.stop$)
        ).subscribe(e => {
            const newSeconds = Math.round((new Date().getTime() - t.getTime()) / 1000);
            this.tick$.next(newSeconds);
        });

        this.state$.next(true);
    }
    public stop() {

        if (!this.timer$) {
            return;
        }

        this.timer$.unsubscribe();
        this.timer$ = undefined;
        this.stop$.next();
        this.state$.next(false);
        this.tick$.next(0);
    }
}
