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

export const WorkerProfileSkeleton = () => {
    return (
        <section
            style={{ height: '500px' }}
            className={scss.worker_page_section}
        >
            <div className={scss.worker_page_section_content}>
                <div className={scss.worker_layout}>
                    <div className={scss.worker_header}>
                        <h3 />
                    </div>
                    <div className={scss.worker_content}>
                        <div />
                        <div />
                    </div>
                </div>
            </div>
        </section>
    );
};
