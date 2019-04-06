import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import './table.css';

const Table = (props) => {
    const { top } = props;
    const columns = [{
        Header: 'Name',
        accessor: 'user'
    }, {
        Header: 'Average',
        accessor: 'average'
    }, {
        Header: 'Top',
        accessor: 'top'
    }, {
        Header: 'Date',
        accessor: 'date'
    }];

    return (
        <div className="table">
            <ReactTable
                data={top}
                columns={columns}
                pageSize = "10"
                showPagination = {false}
            />
        </div>
    );
};


Table.defaultProps = {
};

Table.propTypes = {
    top: PropTypes.array.isRequired
};


export default Table;
