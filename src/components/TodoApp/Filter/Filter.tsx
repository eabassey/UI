
import { useCallback, useMemo, useState } from 'react';
import { FilterBy } from '../../../models/FilterBy';
import './Filter.css';

interface Props {
    setFilterBy: (filterBy: FilterBy) => void;
}

export const Filter = ({setFilterBy}: Props) => {
    const [selectedFilter, setSelectedFilter] = useState<FilterBy>('all');
    const onClick = (filterBy: FilterBy) => {
        setFilterBy(filterBy);
        setSelectedFilter(filterBy);
    };

    const getColor = useCallback((by: FilterBy) => selectedFilter !== by ? '#4a77e5' : 'var(--dark-blue-grey)', [selectedFilter]);

    return (
        <>
        <span className="Show">
        Show:
        </span>
        <span className="All" style={{color: getColor('all')}} onClick={() => onClick('all')}>
        All
        </span>
        <span className="Completed" style={{color: getColor('completed')}} onClick={() => onClick('completed')}>
        Completed
        </span>
        <span className="Incompleted" style={{color: getColor('incompleted')}} onClick={() => onClick('incompleted')}>
        Incompleted
        </span>
        </>
    );
};