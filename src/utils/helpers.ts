export function getBaseId(): string | null {
    return window.localStorage.getItem('airTableBabeId') || null;
}

export function setBaseId(value: string): void {
    window.localStorage.setItem('airTableBabeId', value);
}
