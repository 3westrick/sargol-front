import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material';
import ShippingMethodType from './ShippingMethodType';
import ShippingMethodDetails from './ShippingMethodDetails';
import { useFormContext } from 'react-hook-form';
import { method_type_atom, method_flate_rate_cost_atom, method_free_shipping_requirements_atom,
  method_local_pickup_cost_atom, method_minimum_order_amount_atom, method_name_atom, method_shipping_classes_atom,
  method_taxable_atom, methods_atom
 } from './Atoms';

import { useAtom } from 'jotai';
import { time } from 'console';
 

const steps = [
  'Select campaign settings', 
  'Create an ad group'
];



export default function ShippingAddingMethod({open, setOpen}: {
  open: boolean,
  setOpen: any
}) {

  const [activeStep, setActiveStep] = React.useState(0);

  const [methods, set_methods] =  useAtom(methods_atom);
  const [method_type, set_method_type] =  useAtom(method_type_atom);
  const [method_name, set_method_name] = useAtom(method_name_atom);
  const [method_taxable, set_method_taxable] = useAtom(method_taxable_atom);
  const [method_free_shipping_requirements, set_method_free_shipping_requirements] = useAtom(method_free_shipping_requirements_atom);
  const [method_minimum_order_amount, set_method_minimum_order_amount] = useAtom(method_minimum_order_amount_atom);
  const [method_flate_rate_cost, set_method_flate_rate_cost] = useAtom(method_flate_rate_cost_atom);
  const [method_local_pickup_cost, set_method_local_pickup_cost] = useAtom(method_local_pickup_cost_atom);
  const [method_shipping_classes, set_method_shipping_classes] = useAtom(method_shipping_classes_atom);


  const handleNext = () => {
    
    if (activeStep == 1){

      const data = {
        id: Date.now(),
        type: method_type,
        name: method_name,
        taxable: method_taxable,
        free_shipping_requirements: method_free_shipping_requirements,
        minimum_order_amount: method_minimum_order_amount,
        flate_rate_cost: method_flate_rate_cost,
        local_pickup_cost: method_local_pickup_cost,
        shipping_classes: method_shipping_classes,
        enabled: true,
      }
      
      set_methods([...methods, data])

      handleClose()
      setActiveStep(0)
      set_method_type('free_shipping')
      set_method_name('')
      set_method_taxable(false)
      set_method_free_shipping_requirements('none')
      set_method_minimum_order_amount(0)
      set_method_flate_rate_cost(0)
      set_method_local_pickup_cost(0)
      set_method_shipping_classes({})
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const step_elemets = [
    <ShippingMethodType  />,
    <ShippingMethodDetails />,
  ]

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'body'}
        transitionDuration={0}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {
          activeStep == 0 ? 'Create shipping method':
          method_type == 'free_shipping' ? 'Set up free shipping':
          method_type == 'flat_rate' ? 'Set up flat rate':
          method_type == 'local_pickup' ? 'Set up local pickup':
          ''
          }
        </DialogTitle>
        <Divider/>
        <DialogActions>
          <Box sx={{ width: 600 }}>
                      <Box sx={{ mt: 2, mb: 1 }}>{step_elemets[activeStep]}</Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
                        <Button
                          // color="inherit"
                          disabled={activeStep === 0}
                          variant='outlined'
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} variant='contained'>
                          {activeStep === steps.length - 1 ? 'Create and save' : 'Next'}
                        </Button>
                      </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
