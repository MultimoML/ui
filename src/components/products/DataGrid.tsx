import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useStore } from '@nanostores/react';
import { dataGridStore, setSortModel, updateRows } from './datagrid-store';

export default function DataGridComponent() {
  const $dataGridStore = useStore(dataGridStore);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'category-name', headerName: 'Category name', width: 130 },
    { field: 'code-internal', headerName: 'Code internal', width: 90 },
    { field: 'created-at', headerName: 'Created at', width: 90 },
    { field: 'url', headerName: 'URL', width: 90 },
    { field: 'brand', headerName: 'Brand', width: 90 },
    { field: 'timestamp', headerName: 'Timestamp', width: 90 },
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

  updateRows()


  function HelloWorld() {
    setSortModel("category-name", "asc")
  }
  
  // setTimeout(HelloWorld, 3000);

  function HelloWorld2() {
    setSortModel()
  }
  
  // setTimeout(HelloWorld2, 6000);

  const flattenObj = (ob: any) => {

    // The object which contains the
    // final result
    let result: any = {};
    
    // loop through the object "ob"
    for (const i in ob) {
    
      // We check the type of the i using
      // typeof() function and recursively
      // call the function again
      if ((typeof ob[i]) === 'object') {
        let temp = flattenObj(ob[i]);

        if (Array.isArray(ob[i])) {
          temp = flattenObj(ob[i][0]);
        }

        for (const j in temp) {
      
          // Store temp in result
          result[i + '.' + j] = temp[j];
          }
        }
      
      // Else store ob[i] in result directly
      else {
        result[i] = ob[i];
      }
    }
    return result;
  };


  return (
    <>       { /*JSON.stringify(flattenObj($dataGridStore.rows))*/ }
      <div className='h-1/2 flex items-center justify-center'>
 
        <div className='h-full w-full p-6'>
          <DataGrid
            rows={$dataGridStore.rows.flatMap(x => x)}
            columns={columns}
            autoPageSize={true}
            {...($dataGridStore.sortModel ? {sortModel:$dataGridStore.sortModel} : {})}
            loading={false}
          />
        </div>
      </div>
    </>
  );
};

/*

      <code className="grid h-screen place-items-center">
        { JSON.stringify($dataGridStore.rows) }
      </code>

*/