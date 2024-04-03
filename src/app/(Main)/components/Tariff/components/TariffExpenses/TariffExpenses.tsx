import scss from 'app/(Main)/components/Tariff/Tariff.module.scss';

export const TariffExpenses = () => {
    return (
        <div className={scss.expenses_wrapper}>
            <h5>Ваши траты</h5>
            <div>
                <p>В месяц</p>
                <span>12 346₽</span>
            </div>
            <p>
                переходите на необходимый тариф <br /> и сэкономите{' '}
                <span>до 25% в год</span>
            </p>
        </div>
    );
};
