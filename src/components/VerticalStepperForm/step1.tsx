import React from 'react';
import { Box, FormControl, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { validationStep1 } from './step1Validations';

const Step1 = () => {
    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            email: "",
            full_name: "",
            school_name: "",
        },
        validationSchema: validationStep1,
        onSubmit: async (values) => {
            console.log(values);
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true
    });

    return (
        <>
            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1em !important" }}>
                            <TextField
                                name="email"
                                label="Email"
                                variant="standard"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1em !important" }}>
                            <TextField
                                name="full_name"
                                label="Full name"
                                variant="standard"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.full_name}
                                error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                                helperText={formik.touched.full_name && formik.errors.full_name}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1em !important" }}>
                            <TextField
                                name="school_name"
                                label="School name"
                                variant="standard"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.school_name}
                                error={formik.touched.school_name && Boolean(formik.errors.school_name)}
                                helperText={formik.touched.school_name && formik.errors.school_name}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Step1;
