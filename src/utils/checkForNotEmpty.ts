export const checkForNotEmpty = (object: any) => {
    let result = false;
    for (const key in object) {
        if (!object[key]) {
            return;
        } else {
            result = true;
        }
    }
    return result;
};
