
import * as React from 'react';
import { useState, useMemo } from 'react';
//import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// REACT DATA TABLE COMPONENT
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

//import { useTableTemplates } from './tableTemplates';

import { customStyles } from '../styles/tableTemplatesStyles'


const FilteredDataTable = ( props ) => {

    const { columns, data } = props;     

    // TABLE TEMPLATES HOOK
    //const tableTemplates = useTableTemplates(); 

    // REDUX SELECTORS
    //const fullResearch = useSelector(state => state.research.research);
    
    // REACT STATES
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


    const filteredItems = data.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);


    return (
        <DataTable
        //title="Índice de Pesquisa"
            columns={columns}
            data={filteredItems}
            customStyles={customStyles}
            striped
            responsive
            selectableRows
            pagination
            paginationResetDefaultPage={resetPaginationToggle} 
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
        />
    );
};

export default FilteredDataTable;

FilteredDataTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};