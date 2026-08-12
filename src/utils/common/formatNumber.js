export const formatNumber = (num) => {
    if (Number(num) >= 1000000) return (Number(num) / 1000000).toFixed(0) + "M";
    if (Number(num) >= 1000) return (Number(num) / 1000).toFixed(1) + "K";
    return num;
};
