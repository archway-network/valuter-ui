import { Box, createStyles, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
// import SearchBar from '../components/SearchBar'
import * as API from "../api";
import DataTable, { DataTableRow } from '../components/DataTable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '5%',
            textAlign: 'center',
        },
        table: {
            marginTop: '10px',
        }
    }),
);

/**------------ */

interface Props {
    onSearchResultClick?: (dataRow: any) => void;
}

/**------------ */

export default function WinnersList(props: Props) {

    const classes = useStyles();

    /**------------ */

    useEffect(() => {

        doLoad()
        // return () => {}
    }, [])

    /**------------ */

    // const [pagination, setPagination] = useState(null as API.Pagination)
    const [listRows, setListRows] = useState(null as unknown as DataTableRow[])
    // const [searchQuery, setSearchQuery] = useState(null)
    const [listLoading, setLoading] = useState(false)
    const doLoad = () => {
        setLoading(true)
        API.getAllWinners().then(
            res => {

                console.log(res)

                // setPagination(res.pagination)
                // let tableRows: DataTableRow[] = new Array()
                let tableRows: DataTableRow[] = []
                if (res && res.length > 0) {

                    for (let row of res) {
                        tableRows.push({
                            // id: row.Address,
                            title: row.Address,
                            subtitle: row.Rewards.toLocaleString(),
                        });
                    }
                }
                setListRows(tableRows)
            },
            err => { console.error(err); }
        ).finally(() => {
            setLoading(false)
        })
    }

    // const handleSearchSubmit = (e: any) => {
    //     e.preventDefault();
    //     doSearch(searchQuery, 1);
    // }

    // /**------------ */

    // const handleChangePage = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
    //     e.preventDefault();
    //     doSearch(searchQuery, page + 1); // We need to increase it by one as the TablePagination component starts with zero
    // }

    /**------------ */

    const handleTableRowClick = (e: any, rowIndex: number) => {
        if (props.onSearchResultClick) {
            props.onSearchResultClick(listRows[rowIndex])
        }
    }

    /**------------ */

    let dataTable = null;
    if (listRows) {
        if (listRows.length) {
            dataTable = <DataTable rows={listRows} //pagination={pagination} onChangePage={handleChangePage}
                onRowClick={handleTableRowClick} />
        } else {
            dataTable = <Box component="span">No Winners Found!</Box>
        }
    }

    /**------------ */

    return (
        <div className={classes.root} >
            {/* <SearchBar
                onChange={(e) => { setSearchQuery(e.target.value); }}
                onSubmit={handleSearchSubmit}
                label="Search"
                placeholder="Search a sensor name" /> */}
            {/* {listLoading && <LinearProgress />} */}

            <Box component="div" mt={5}>
                {dataTable}
            </Box>

            {listLoading && listRows && <LinearProgress />}
        </div>
    )
}
