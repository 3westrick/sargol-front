import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button, TextField } from '@mui/material';


export default function CustomeSlider({disabled}: {disabled: boolean}) {
  const [value, setValue] = React.useState<number[]>([0, 2750]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  function handleFirst(e: any){
    const data = parseInt(e.target.value)
    if (data > value[1]) setValue([value[1], data] as number[])
    else setValue([data, value[1]] as number[])
  }

  function handleLast(e: any){
    const data = parseInt(e.target.value)
    if (data < value[0]) setValue([data, value[0]] as number[])
    else setValue([value[0], data] as number[])
  }

  return (
    <>
        <Box>
            <Slider
            getAriaLabel={() => 'Price'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={2750}
          />
        </Box>

        <Box>
            <Box display={'flex'} justifyContent={'space-between'}>
                <TextField size='small' value={value[0]} disabled={disabled} onChange={handleFirst}/>
                <TextField size='small' value={value[1]} disabled={disabled} onChange={handleLast}/>
            </Box>
        </Box>
    </>
  );
}