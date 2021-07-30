import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl, Radio, RadioGroup } from '@material-ui/core';

export default function PaymentForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Phương thức thanh toán
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="method">
                            <FormControlLabel value="cod" control={<Radio />} label="Thanh toán khi nhận hàng" />
                            <FormControlLabel value="paypal" control={<Radio />} label="Thanh toán paypal" />
                            <FormControlLabel value="visa" control={<Radio />} label="Thanh toán visa" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}