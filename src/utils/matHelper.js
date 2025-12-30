function round(num) {
    return Math.round(num * 100) / 100;
}

function safeAdd(a, b) {
    return round(Number(a) + Number(b));
}

function safeSubtract(a, b) {
    return round(Number(a) - Number(b));
}

function safeMultiply(a, b) {
    return round(Number(a) * Number(b));
}

function safeDivide(a, b) {
    if (Number(b) === 0) return 0;
    return round(Number(a) / Number(b));
}

function parseAmount(value) {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return 0;
    return round(parsed);
}

function formatMoney(amount) {
    return Number(amount).toFixed(2);
}

module.exports = {
    round,
    safeAdd,
    safeSubtract,
    safeMultiply,
    safeDivide,
    parseAmount,
    formatMoney
};