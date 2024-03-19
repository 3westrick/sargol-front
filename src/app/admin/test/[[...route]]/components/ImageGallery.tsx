import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

export default function ImageGallery() {

  const {setValue, getValues, watch} = useFormContext()
  const gallery = watch('gallery')
  
  const itemData = gallery.map((gallery_image: any) => gallery_image.image ? 
  {image:gallery_image.image,  id:gallery_image.id} 
  : 
  {image:URL.createObjectURL(gallery_image.file), id: gallery_image.id} 
  )
  function deleteImage(image: any){
    
    setValue('gallery', gallery.filter((item: any) => item.id != image.id))
  }
  
  return (
    <ImageList sx={{ width: '100%', height: 450 }} cols={1}  rowHeight={'auto'}>
      {itemData.map((item: any) => (
        <ImageListItem key={item.id}>
          <Box position={'relative'}>
          <Box
            component={'img'}
            sx={{
              width: '100%',
              // height: 'auto'
            }}
            src={item.image}
            loading="lazy"
          />
          <Box position={'absolute'} top={8} right={8} >
          <IconButton aria-label="delete" color="error" onClick={() => deleteImage(item)}>
            <Avatar sx={{bgcolor: 'white'}}>
              <DeleteIcon color='error'/>
            </Avatar>
          </IconButton>
          </Box>
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//   },
// ];