export function getBezoutCoeffs(a: number, b: number) {
    let [r1, u1, v1, r2, u2, v2] = [a, 1, 0, b, 0, 1];
    let q = 0;
    while (r2 != 0) {
        q = Math.floor(r1 / r2);
        [r1, u1, v1, r2, u2, v2] = [r2, u2, v2, r1 - q * r2, u1 - q * u2, v1 - q * v2];
    }
    const alpha = Math.ceil(-v1 / a);
    return [u1 - alpha * b, v1 + alpha * a];
}
