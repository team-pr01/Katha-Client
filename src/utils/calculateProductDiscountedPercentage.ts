export const calculateProductDiscountedPercentage = (
    basePrice: number,
    discountedPrice?: number,
): number => {
    if (
        !basePrice ||
        !discountedPrice ||
        basePrice <= 0 ||
        discountedPrice <= 0
    ) {
        return 0;
    }
    if (discountedPrice >= basePrice) {
        return 0;
    }
    const discountAmount = basePrice - discountedPrice;
    const discountPercentage = (discountAmount / basePrice) * 100;
    return Math.round(discountPercentage);
};