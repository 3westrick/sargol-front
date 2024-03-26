import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CouponGeneral from './CouponGeneral';
import CouponUsageRestriction from './CouponUsageRestriction';
import CouponUsageLimits from './CouponUsageLimits';
// import ProductInventory from './ProductInventory';
// import ProductGeneral from './ProductGeneral';
// import ProductShipping from './ProductShipping';
// import ProductAttribute from './ProductAttribute';
// import ProductVariant from './ProductVariant';

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

export default function CouponData() {
  const [value, setValue] = React.useState(0);

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
        sx={{ borderRight: 1, borderColor: 'divider', width: '200px' }}
      >
        <Tab label="General" {...a11yProps(0)} sx={{p:3, textTransform: 'unset'}} />
        <Tab label="Usage restriction" {...a11yProps(1)} sx={{p:3, textTransform: 'unset'}} />
        <Tab label="Usage limits" {...a11yProps(2)} sx={{p:3, textTransform: 'unset'}} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CouponGeneral/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CouponUsageRestriction/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CouponUsageLimits/>
      </TabPanel>
    </Box>
  );
}