import scss from './Skeletons.module.scss';

export const BarsSkeleton = () => {
    return (
        <>
            <div className={scss.bars_skeleton_wrapper}>
                <div className={scss.bars_skeleton}>
                    <div className={scss.shimmer} />
                </div>
            </div>
        </>
    );
};

export const TableSkeleton = () => {
    return (
        <div className={scss.skeleton_table_wrapper}>
            <div className={scss.table_body}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className={scss.table_row} />
                ))}
            </div>
            <div className={scss.shimmer} />
        </div>
    );
};
