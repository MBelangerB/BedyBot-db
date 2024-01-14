exports.generateUnsignedBigInt64 = function() {
    const maxUint64 = BigInt('18446744073709551615'); // 2^64 - 1
    const randomUint64 = BigInt(Math.floor(Math.random() * Number(maxUint64)));
    return randomUint64;
};
