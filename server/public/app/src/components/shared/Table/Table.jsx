import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import './table.css';

const Table = (props) => {
    const { top, cb } = props;
    const columns = [{
        Header: 'Name',
        accessor: 'user',
        style: {
            textAlign: 'left',
            fontSize: '20px'
        }
    }, {
        Header: 'Average(pups)',
        accessor: 'average',
        style: {
            textAlign: 'right',
            fontSize: '20px'
        }
    }, {
        Header: 'Top(pups)',
        accessor: 'top',
        style: {
            textAlign: 'right',
            fontSize: '20px'
        }
    }, {
        Header: 'Date',
        accessor: 'date',
        style: {
            textAlign: 'right',
            fontSize: '20px'
        }
    }];

    return (
        <div className="table">
            <ReactTable
                data={top}
                columns={columns}
                pageSize = "10"
                showPagination = {false}
                defaultSortMethod = {(a, b, desc) => {
                    return b - a;
                }}
                getTdProps={(state, rowInfo, column, instance) => {
                    return {
                        onClick: (e, handleOriginal) => {
                            cb(rowInfo.original);
                        }
                    };
                }}
            />
        </div>
    );
};


Table.defaultProps = {
};

Table.propTypes = {
    top: PropTypes.array.isRequired,
    cb: PropTypes.func.isRequired
};


export default Table;
