import { snakeCase } from 'change-case';
import { isObject } from 'utils/isObject';

export const camelToSnakeCaseDeep = (target: any): void => {
    if (Array.isArray(target)) {
        target.forEach((t) => camelToSnakeCaseDeep(t));
    }
    if (isObject(target)) {
        Object.keys(target).forEach((key) => {
            if (isObject(target[key]) || Array.isArray(target[key])) {
                camelToSnakeCaseDeep(target[key]);
            }

            if (/[A-Z]/.test(key)) {
                target[snakeCase(key)] = target[key];
                delete target[key];
            }
        });
    }
};
