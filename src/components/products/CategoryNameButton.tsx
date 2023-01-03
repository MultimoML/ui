import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { dataGridStore } from './datagrid-store';
import { useStore } from '@nanostores/react';

export default function CategoryNameButton() {
    const $dataGridStore = useStore(dataGridStore);

    const handleChange = (event: SelectChangeEvent) => {
        dataGridStore.setKey("queryCategory", event.target.value)
    };
  
  return (
    <Box className='w-56 p-6'>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Query category</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={$dataGridStore.queryCategory}
            label="Query category"
            onChange={handleChange}
        >
            <MenuItem value={"Mešani keksi"}>Mešani keksi</MenuItem>
            <MenuItem value={"Pudingi"}>Pudingi</MenuItem>
            <MenuItem value={"Drugi sladki prigrizki"}>Drugi sladki prigrizki</MenuItem>
            <MenuItem value={"Zaščita pred insekti"}>Zaščita pred insekti</MenuItem>
            <MenuItem value={"Olive"}>Olive</MenuItem>
            <MenuItem value={"Zeliščni čaj"}>Zeliščni čaj</MenuItem>
        </Select>
        </FormControl>
    </Box>
  )
}