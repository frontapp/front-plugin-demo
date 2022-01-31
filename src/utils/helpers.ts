export function getBaseId(): string | null {
    return window.localStorage.getItem('airTableBaseId') || null;
}

export function setBaseId(value: string): void {
    window.localStorage.setItem('airTableBaseId', value);
}
