import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductInventory from './ProductInventory';
import ProductGeneral from './ProductGeneral';
import ProductShipping from './ProductShipping';
import ProductAttribute from './ProductAttribute';
import ProductVariant from './ProductVariant';
import { useFormContext } from 'react-hook-form';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      width={'100%'}
      component={'div'}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function ProductData() {
  const [value, setValue] = React.useState(0);
  const {getValues} = useFormContext()
  const is_simple = getValues('type') == 'variation'
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ display: 'flex'}}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="General" {...a11yProps(0)} sx={{p:3, textTransform: 'unset'}} />
        <Tab label="Inventory" {...a11yProps(1)} sx={{p:3, textTransform: 'unset'}} />
        <Tab label="Shipping" {...a11yProps(2)} sx={{p:3, textTransform: 'unset'}} />
        <Tab label="Attributes" {...a11yProps(3)} sx={{p:3, textTransform: 'unset'}} />
        {is_simple && <Tab label="Varitations" {...a11yProps(4)} sx={{p:3, textTransform: 'unset'}} /> }
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProductGeneral/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductInventory/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProductShipping/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ProductAttribute/>
      </TabPanel>
      {
        is_simple && (
        <TabPanel value={value} index={4}>
          <ProductVariant/>
        </TabPanel>
        )
      }
    </Box>
  );
}