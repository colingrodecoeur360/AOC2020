export function assertIsNever(anything: never): never {
    throw new Error(`not possible: ${anything}`);
}
