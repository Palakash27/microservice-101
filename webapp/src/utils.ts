export const truncateName = (name: string, maxCharLength: number = 20) => {
    return name.length > maxCharLength
        ? name.substring(0, maxCharLength) + "..."
        : name;
};
