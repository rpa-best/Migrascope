import { NewsType } from 'components/News/types';
import { getDateDescription } from 'utils/getDateDescription';
import { msToTime } from 'utils/msToTime';

export function getTitleDesc(
    type: NewsType['type'],
    username?: string,
    userTo?: string
) {
    switch (type) {
        case 'addFile':
            return 'Добавлен файл';
        case 'commentary':
            return `Коментарий от ${username} для ${userTo}`;
        case 'completed':
            return 'Выполнена задача';
        case 'moved':
            return 'Сдвинута задача';
    }
}

export function getTimeDescription(time: Date) {
    const ms = msToTime(Date.now() - time.getTime());

    return getDateDescription(ms.type, ms.count);
}
