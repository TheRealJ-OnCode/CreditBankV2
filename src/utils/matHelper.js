function safeAdd(a, b) {
    return Math.round((Number(a) + Number(b)) * 100) / 100;
}

function safeSubtract(a, b) {
    return Math.round((Number(a) - Number(b)) * 100) / 100;
}

function safeMultiply(a, b) {
    return Math.round((Number(a) * Number(b)) * 100) / 100;
}

function safeDivide(a, b) {
    if (Number(b) === 0) return 0;
    return Math.round((Number(a) / Number(b)) * 100) / 100;
}

function formatMoney(amount) {
    return Number(amount).toFixed(2);
}

function parseMoneyInput(value) {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return 0;
    return Math.round(parsed * 100) / 100;
}

module.exports = {
    safeAdd,
    safeSubtract,
    safeMultiply,
    safeDivide,
    formatMoney,
    parseMoneyInput
};