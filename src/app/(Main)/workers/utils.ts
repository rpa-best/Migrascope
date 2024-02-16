export const getIds = (string: string) => {
    const splitString = string.split('-');

    return { orgId: splitString[0], id: splitString[1] };
};
