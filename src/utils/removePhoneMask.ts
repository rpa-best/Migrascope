export const removePhoneMask = (phone: string) => {
    const replacedPhone = phone.replace(/[_()-]/g, '');

    const startPhoneIndex = replacedPhone.indexOf('7');
    if (!replacedPhone[startPhoneIndex + 1]) {
        return '';
    }
};
