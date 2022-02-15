import { Box, createStyles, LinearProgress, makeStyles, Theme } from '@material-ui/core';
import { AlertTitle } from '@mui/material';
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
    address: string;
}

/**------------ */

export default function Winner(props: Props) {

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
        API.getWinnerChallenges(props.address).then(
            res => {
                let tableRows: DataTableRow[] = []
                if (res && res.length > 0) {
                    var total = null as unknown as API.WinnerChallenge
                    for (let row of res) {
                        tableRows.push({
                            id: row.Challenge,
                            cols: [
                                row.Challenge.charAt(0).toUpperCase() + row.Challenge.slice(1), // Make the first letter Uppercase
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

    /**------------ */

    let dataTable = null;
    if (listRows) {
        if (listRows.length) {
            dataTable = <DataTable rows={listRows} headers={["Challenge", "Reward"]}
            />
        } else {
            dataTable = <Box component="span">No Details Found!</Box>
        }
    }

    /**------------ */

    return (
        <div className={classes.root} >
            {listLoading && <LinearProgress />}

            {props?.address &&
                <Alert severity="info" >
                    Address:
                    <span style={{ fontWeight: 'bold' }}>
                        {" " + props.address}
                    </span>
                </Alert>}

            <Box component="div" mt={5}>
                {dataTable}
            </Box>

        </div>
    )
}
