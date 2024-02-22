export const getValueByPath = (obj: any, path: string[]) => {
    return path.reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
        obj
    );
};
