'use client';

import { useViewDocumentsStore } from 'app/(Main)/workers/[id]/components/WorkerDocuments/store/viewDocumentsStore';

import ColumnSvg from './svg/column.svg';
import GridSvg from './svg/grid.svg';

import scss from 'app/(Main)/workers/[id]/components/WorkerDocuments/WorkerDocuments.module.scss';

export const WorkerDocumentsActions = () => {
    const [view, setView] = useViewDocumentsStore((state) => [
        state.view,
        state.setView,
    ]);

    const handleSvgClick = (viewType: typeof view) => {
        setView(viewType);
    };

    return (
        <div className={scss.worker_documents_actions}>
            <ColumnSvg
                onClick={() => handleSvgClick('column')}
                data-isactive={view === 'column'}
            />
            <GridSvg
                onClick={() => handleSvgClick('grid')}
                data-isactive={view === 'grid'}
            />
        </div>
    );
};
