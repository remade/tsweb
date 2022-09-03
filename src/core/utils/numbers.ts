export const isPositiveInteger = (numberString: string | number) => {
    return !Number.isNaN(Number.parseInt(String(numberString), 10)) && Number.parseInt(String(numberString)) > 0;
};
