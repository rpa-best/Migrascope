export const setPhoneMask = (tel: string) => {
    if (!tel) return '';
    return `+7(${tel[2] + tel[3] + tel[4]})${tel[5] + tel[6] + tel[7]}-${
        tel[8] + tel[9]
    }-${tel[10] + tel[11]}`;
};
