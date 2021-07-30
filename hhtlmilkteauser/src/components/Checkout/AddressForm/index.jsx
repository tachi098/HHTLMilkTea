import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function AddressForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Địa chỉ giao hàng
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        name="name"
                        label="Tên người nhận"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="address"
                        label="Địa chỉ"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="phone"
                        label="Số điện thoại"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        name="Email"
                        label="Địa chỉ email"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        multiline
                        rows={3}
                        name="note"
                        label="Ghi chú"
                        fullWidth
                    />
                </Grid>

            </Grid>
        </React.Fragment>
    );
}