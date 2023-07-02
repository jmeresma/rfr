
import {AgGridReact} from 'ag-grid-react';
import {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Table.css'
import axios from 'axios'


function Table({deepDive}) {

const gridRef = useRef();

const [rowData, setRowData] = useState([]);

const [player, setPlayer] = useState(null);

const [columnDefs, setColumnDefs] = useState([
    {   
       headerName: "Rank",
       valueGetter: "node.rowIndex + 1",
       rowDrag: true,
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
        field: 'rcr', 
            headerName: 'RCR', 
            comparator: compareRanks, 
            sortingOrder: ['desc', 'asc'],
            width: 110,
    },
    {
        field: 'rfr', 
            headerName: 'RFR', 
            comparator: compareRanks, 
            sortingOrder: ['desc', 'asc'],
            width: 110, 
    },
    {
        field: 'target', 
            headerName: 'Target', 
            checkboxSelection: true,
            width: 110,
            sortable: false,
            filter: false,
    },
    ]);


//comparator function to correctly sort ranks
function compareRanks(value1, value2) {
  if (value1 === null && value2 === null) {
    return 0;
  }
  if (value1 === null) {
    return -1;
  }
  if (value2 === null) {
    return 1;
  }
  return value1 - value2;
}

const defaultColDef = useMemo( ()=> ({
	sortable: true,
	filter: true,
    resizable: true,
}), []);


// const cellClickedListener = useCallback(e => {
//     setDeepDive(e.value);
// })

const getPlayerData = () => {
    console.log('test');
    const options = {
        method: 'GET',
        url: 'http://localhost:3002/deepDive',
        params:  {player_name: player}
    }

    axios.request(options).then((response) => {
        console.log(options)
        console.log(response.data)
    }).catch((error) => {
        console.error(error)
    })
}

const rowClickedListener = (event) => {
    setPlayer(event.data.player_name)
}

useEffect(() => {
        if (player) getPlayerData()
    }, [player])



useEffect(()=> {
    fetch('http://localhost:3002/')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
}, []);


const rowHeight = 25;


const [update, setUpdate] = useState([]);

useEffect(()=> {

fetch('http://localhost:3002/update')
        .then(result => result.json())
        .then(update => setUpdate(update[0].max))
}, []);


return (
	<div className='ag-theme-alpine' style={{height: 500, width: 850}}>
        <h4>Updated on: {update}</h4>
        <AgGridReact
			ref={gridRef}
			// onCellClicked={cellClickedListener}
			onRowDoubleClicked={rowClickedListener}
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

export default Table
