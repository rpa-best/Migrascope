export const setQuery = (target: any) => {
    const params = new URLSearchParams();
    for (const name in target) {
        if (target[name] !== undefined) {
            params.append(name, target[name]);
        }
    }

    return params;
};
