import { Box, createStyles, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import Alert from '@mui/material/Alert';
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
    onListItemClick?: (dataRow: any) => void;
    filterByChallenge?: string;
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

        // console.log(props)

        let apiToCall = API.getAllWinners()
        if (props?.filterByChallenge) {
            apiToCall = API.getWinnersByChallenge(props.filterByChallenge)
        }
        apiToCall.then(
            res => {
                // setPagination(res.pagination)
                // let tableRows: DataTableRow[] = new Array()
                let tableRows: DataTableRow[] = []
                if (res && res.length > 0) {

                    for (let row of res) {
                        tableRows.push({
                            id: row.Address,
                            cols: [
                                row.Address,
                                row.Rewards.toLocaleString()
                            ]
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
        if (props.onListItemClick) {
            props.onListItemClick(listRows[rowIndex])
        }
    }

    /**------------ */

    let dataTable = null;
    if (listRows) {
        if (listRows.length) {
            dataTable = <DataTable rows={listRows} headers={["Winner Address", "Total Reward"]} //pagination={pagination} onChangePage={handleChangePage}
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

            {listLoading && <LinearProgress />}

            {props?.filterByChallenge &&
                <Alert severity="info" >
                    List of winners for challenge:
                    <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                        {" " + props.filterByChallenge}
                    </span>
                </Alert>}

            <Box component="div" mt={5}>
                {dataTable}
            </Box>

            {listLoading && listRows && <LinearProgress />}
        </div>
    )
}
