const airTableBaseIdName = 'airTableBaseId';

export function getBaseId(): string | null {
    return window.localStorage.getItem(airTableBaseIdName) || null;
}

export function setBaseId(value: string): void {
    window.localStorage.setItem(airTableBaseIdName, value);
}

export function removeBaseId(): void {
    window.localStorage.removeItem(airTableBaseIdName);
}
