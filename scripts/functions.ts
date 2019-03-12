export function formatTime(n: number): string {

    const hours = Math.floor(n / 3600);
    const minutes = Math.floor((n - (hours * 3600)) / 60);
    const seconds = n - (hours * 3600) - (minutes * 60);

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
}

export function padNumber(num: number) {
    return (num < 10) ? `0${num}` : num;
}