import { msToTime } from 'utils/msToTime';

export const getRemainingTime = (dateEnd: string) => {
    if (!dateEnd) {
        return;
    }

    const date = new Date(dateEnd);

    const daysLeft = date.getTime() - Date.now();

    const result = msToTime(daysLeft);

    if (result.count > 5 && result.type === 'day') {
        return <></>;
    }

    if (result.count > 0 && result.count <= 5 && result.type === 'day') {
        if (result.count === 1) {
            return (
                <p style={{ color: '#E5A559', marginLeft: '2px' }}>
                    ({result.count} день)
                </p>
            );
        }
        if (result.count === 2 || result.count === 3 || result.count === 4) {
            return (
                <p style={{ color: '#E5A559', marginLeft: '2px' }}>
                    ({result.count} дня)
                </p>
            );
        }

        return (
            <p style={{ color: '#E5A559', marginLeft: '2px' }}>
                ({result.count} дней)
            </p>
        );
    } else {
        return (
            <p style={{ color: '#E55959', marginLeft: '2px' }}>(Просрочено)</p>
        );
    }
};
