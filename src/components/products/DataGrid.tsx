import { DataGrid, GridCallbackDetails, GridCellParams, GridColDef, MuiEvent } from '@mui/x-data-grid';
import { useStore } from '@nanostores/react';
import CategoryNameButton from './CategoryNameButton';
import { dataGridStore, updateRows } from './datagrid-store';

export default function DataGridComponent() {
  const $dataGridStore = useStore(dataGridStore);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'string', width: 240 },
    { field: 'name', headerName: 'Name', width: 270 },
    { field: 'category-name', headerName: 'Category name', width: 170 },
    { field: 'code-internal', headerName: 'Code internal', type: 'number', width: 140 },
    { field: 'created-at', headerName: 'Created at', width: 120 },
    { field: 'url', headerName: 'URL', width: 400 },
    { field: 'brand', headerName: 'Brand', width: 120 },
    { field: 'price-in-time.timestamp', headerName: 'Timestamp', width: 120 },
    { field: 'price-in-time.is-on-promotion', headerName: 'Is on promotion', width: 120 },
    { field: 'price-in-time.price', headerName: 'Price', type: 'number', width: 120 },
    { field: 'price-in-time.price-per-unit', headerName: 'Price per unit', width: 120 },
    { field: 'price-in-time.regular-price', headerName: 'Regular price', type: 'number', width: 120 },
    { field: 'price-in-time.price-per-unit-number', headerName: 'Price per unit number', type: 'number', width: 120 },
    { field: 'price-in-time.best-price', headerName: 'Best price', type: 'number', width: 120 },
    { field: 'price-in-time.stock-status', headerName: 'Stock status', width: 120 },
    { field: 'price-in-time.is-new', headerName: 'Is new', width: 120 },
    /* {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    }, */
  ];

  function onCellClick(params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) {
    const id = params.id.toString()

    console.log("selected id", id)
    dataGridStore.setKey("id", id)
  }

  const flattenObj = (ob: any) => {
    let result: any = {};
    
    for (const i in ob) {
      // console.log(i)
      if (i === "price-in-time") {
        let temp = ob[i][0];

        for (const j in temp) {
          result[i + '.' + j] = temp[j];
        }
      } else {
        result[i] = ob[i];
      }
    }

    return result;
  };


  return (
    <>       { /* JSON.stringify($dataGridStore.rows.map(x => flattenObj(x))) */ }
      <CategoryNameButton />

      <div className='h-1/2 flex items-center justify-center'>
 
        <div className='h-full w-full p-6'>
          <DataGrid
            rows={ $dataGridStore.rows ? $dataGridStore.rows.map(x => flattenObj(x)): []}
            columns={columns}
            // autoHeight={true} // doesn't work
            autoPageSize={true}
            density={"compact"}
            filterMode={"client"}
            {...($dataGridStore.sortModel ? {sortModel:$dataGridStore.sortModel} : {})}
            loading={false}
            onCellClick={onCellClick}
          />
        </div>
      </div>

      <div className='h-1/2 flex items-center justify-center'>
        <code className="p-6">{ $dataGridStore.productData != null ? JSON.stringify($dataGridStore.productData): "" }</code>
        <img className="p-6" src={$dataGridStore.qrData} />
      </div>
    </>
  );
};

/*

      <code className="grid h-screen place-items-center">
        { JSON.stringify($dataGridStore.rows) }
      </code>

*/