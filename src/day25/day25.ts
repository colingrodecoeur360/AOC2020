import { loadInput, splitLines, toInt } from "../utils";

export function day25() {
    const input = loadInput("day25");
    const [cardPublicKey, doorPublicKey] = parseInput(input);
    console.log(cardPublicKey, doorPublicKey);

    return {
        part1: () => part1(cardPublicKey, doorPublicKey)
    };
}

export function parseInput(input: string) {
    return splitLines(input).map(toInt);
}

export function part1(cardPublicKey: number, doorPublicKey: number) {
    const modulus = 20201227;
    return computeEncryptionKey(computeDoorLoopSize());

    function computeDoorLoopSize() {
        const subjectNumber = 7;
        let doorLoopSize = 0;
        let y = 1;
        while (y !== doorPublicKey) {
            y = (y * subjectNumber) % modulus;
            doorLoopSize++;
        }
        return doorLoopSize;
    }
    function computeEncryptionKey(doorLoopSize: number) {
        let encryptionKey = 1;
        for (let i = 0; i < doorLoopSize; i++) {
            encryptionKey = (encryptionKey * cardPublicKey) % modulus;
        }
        return encryptionKey;
    }
}
