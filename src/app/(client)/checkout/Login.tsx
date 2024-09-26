"use client"
import { authenticate } from '@/lib/actions'
import React, { useState, useTransition } from 'react'
import { AppBar, Button, Dialog, Divider, IconButton, List, ListItemButton, ListItemText, Slide, Toolbar, Typography } from "@mui/material";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from '@tanstack/react-query';
import { createBasket } from '@/api/client/orders/orderAPI';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Page({open, setOpen, coupons}: {open:boolean, setOpen:any, coupons: any}) {
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [basket, set_basket] = useLocalStorage('basket', [])

  const create_basket = useMutation({
    mutationFn: (data:any) => createBasket(data),
    onSuccess: (res, data) => {
      set_basket([])
    }
  })

  const [isPending, startTransition] = useTransition()
  const handleSubmit = () => {
    startTransition(() => {
      authenticate({email, password})
      .then((data) => {
        create_basket.mutate({
            basket: basket,
            coupons: coupons.map((coupon:any) => coupon.id),
        })
      })
    })
  }
  return (

    <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form action={handleSubmit}>
        <input type="text" name="email" placeholder="Email" required  value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" name="password" placeholder="Password"  value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <Button type="submit">Login</Button>
        </form>
      </Dialog>

  )
}