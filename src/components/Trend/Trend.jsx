
import {AgGridReact} from 'ag-grid-react';
import {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Trend.css'
import axios from 'axios'



function Trend({deepDive}) {
const gridRef = useRef();

const [rowData, setRowData] = useState([]);

const [columnDefs, setColumnDefs] = useState([
    {   
       headerName: "Rank",
       valueGetter: "node.rowIndex + 1",
       width: 100,
       sortable: false,
       filter: false,
    },
    {
        field: 'player_name', 
            headerName: 'Player', 
            width: 200,
    },
    {
        field: 'pos', 
            headerName: 'Position',
            width: 110, 
            cellStyle: params => {
                if (params.value === 'RB') {
                    return {backgroundColor: 'lightgreen', border: '2px solid green'};
                } else {
                    if (params.value === 'WR') {
                    return {backgroundColor: 'lightblue', border: '2px solid blue'};
                } else {
                   if (params.value === 'TE') {
                    return {backgroundColor: 'lightsalmon', border: '2px solid red'};
                } else {
                   if (params.value === 'QB') {
                    return {backgroundColor: 'lightcoral', border: '2px solid red'};
                } 
            }}}
        }
    },
    {
        field: 'team', 
            headerName: 'Team',
            width: 110, 
    },
    {
        field: 'as_of', 
            headerName: 'From', 
            sortingOrder: ['desc', 'asc'],
            width: 110,
    },
    {
        field: 'rcr', 
            headerName: 'RCR', 
            sortingOrder: ['desc', 'asc'],
            width: 110, 
    },
    {
        field: 'rfr', 
            headerName: 'RFR', 
            sortingOrder: ['desc', 'asc'],
            width: 110, 
    },
    ]);


const defaultColDef = useMemo( ()=> ({
    sortable: true,
    filter: true,
    resizable: true,
}), []);


// useEffect(()=> {
//     fetch('http://localhost:3002/deepDive')
//         .then(result => result.json())
//         .then(rowData => setRowData(rowData))
// }, []);


axios.get('http://localhost:3002/deepDive')
  .then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.error(error)
})



const rowHeight = 25;

return (
    <div className='ag-theme-alpine' style={{height: 500, width: 850}}>
        <AgGridReact
            ref={gridRef}
            rowDragManaged={true}
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection='multiple'
            animateRows={true}
            rowHeight={rowHeight}       
            defaultColDef={defaultColDef}/>
    </div>
)
}

export default Trend
