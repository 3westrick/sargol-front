"use client"
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Typography } from '@mui/material';
// import ShippingZones from './ShippingZones';
import ShippingSettings from './ShippingSettings';
import ShippingClasses from './ShippingClasses';
import ShippingZonesList from './ShippingZonesList';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Shipping = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box>
                <Typography>
                    Shipping
                </Typography>   
            </Box>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example">
                        <Tab label="Shipping Zones" {...a11yProps(0)} />
                        <Tab label="Shipping Settings" {...a11yProps(1)} />
                        <Tab label="Classes" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <ShippingZonesList/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <ShippingSettings/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ShippingClasses/>
                </CustomTabPanel>
            </Box>


        </Box>
    );
}

export default Shipping
