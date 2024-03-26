import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { getPermissions } from '@/api/admin/roles/roleAPI';
import { useFormContext } from 'react-hook-form';
import { Box, TextField } from '@mui/material';

function not(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function UserPermissionTransferList() {

    const permissions = useQuery({
        queryKey: ['admin-permissions'],
        queryFn: () => getPermissions()
    })

    const {watch, setValue} = useFormContext()
    const permissions_list = watch('user_permissions')
    
    const [checked, setChecked] = React.useState<readonly number[]>([]);
    const [left, setLeft] = React.useState<readonly number[]>(permissions.data.filter((item : any) => !permissions_list.includes(item.id)).map((item: any) => item.id));
    const [right, setRight] = React.useState<readonly number[]>(permissions_list);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setValue('user_permissions', right.concat(left))
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setValue('user_permissions', right.concat(leftChecked))
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setValue('user_permissions', not(right, rightChecked))
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));

        setValue('user_permissions', [])
        setRight([]);
    };

    const customList = (items: readonly number[]) => {
        const [filter, setFiler] = React.useState("")
        return (
            <Paper sx={{ width: 400, height: 300, overflow: 'auto' }}>
            <Box position={'sticky'} top={0} zIndex={1}>
                <TextField sx={{bgcolor:'white'}} fullWidth placeholder='Filter' value={filter} onChange={e => setFiler(e.target.value)}/>
            </Box>
            <List dense component="div" role="list">
                {items.filter((value: number) => {
                    const permissoin = permissions.data.find((item: any) => item.id == value)
                    if (permissoin.name.toLowerCase().includes(filter)) return value
                }).map((value: number) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItemButton
                            key={value}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={permissions.data.find((item: any) => item.id == value).name} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
        )
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    {/* <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button> */}
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    {/* <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button> */}
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
        </Grid>
    );
}