import React from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { validationStep2 } from './step2Validations';
import { useTheme, useMediaQuery } from '@mui/material';

const Step2 = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            size: "",
            jobs: "",
            job_step: "",
            machines: "",
            machine_step: "",
            distributions: "",
            speed_scaling: "",
            release_due_date: "",
            seed: "",
        },
        validationSchema: validationStep2,
        onSubmit: async (values) => {
            console.log(values);
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true
    });

    const onSelectCheckBox = (event) => {
        const { checked, value } = event.target;
        const newDistributions = checked
            ? [...formik.values.distributions, value]
            : formik.values.distributions.filter(item => item !== value);

        formik.setFieldValue('distributions', newDistributions);
    };


    return (
        <>
            <Box sx={{ maxHeight: isSmallScreen ? '50vh' : '60vh', overflowY: 'none', display: 'flex' }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "0.3em !important" }}>
                            <TextField
                                name="size"
                                label="Size"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.size}
                                error={formik.touched.size && Boolean(formik.errors.size)}
                                helperText={formik.touched.size && formik.errors.size}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>



                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "0.3em !important" }}>
                            <TextField
                                name="seed"
                                label="Seed"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.seed}
                                error={formik.touched.seed && Boolean(formik.errors.seed)}
                                helperText={formik.touched.seed && formik.errors.seed}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "0.3em !important" }}>
                            <TextField
                                name="jobs"
                                label="Jobs"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.jobs}
                                error={formik.touched.jobs && Boolean(formik.errors.jobs)}
                                helperText={formik.touched.jobs && formik.errors.jobs}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "0.3em !important" }}>
                            <TextField
                                name="job_step"
                                label="Job Step"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.job_step}
                                error={formik.touched.job_step && Boolean(formik.errors.job_step)}
                                helperText={formik.touched.job_step && formik.errors.job_step}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "0.3em !important" }}>
                            <TextField
                                name="machines"
                                label="Machines"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.machines}
                                error={formik.touched.machines && Boolean(formik.errors.machines)}
                                helperText={formik.touched.machines && formik.errors.machines}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "0.3em !important" }}>
                            <TextField
                                name="machine_step"
                                label="Machine Step"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.machine_step}
                                error={formik.touched.machine_step && Boolean(formik.errors.machine_step)}
                                helperText={formik.touched.machine_step && formik.errors.machine_step}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
                        <Typography >
                            Distributions:
                        </Typography>
                        <FormControl fullWidth margin="none" required error={formik.touched.distributions && Boolean(formik.errors.distributions)}>
                            <Box display="flex" flexDirection="row">
                                <FormControlLabel
                                    control={<Checkbox checked={formik.values.distributions.includes('normal')} onChange={onSelectCheckBox} value="normal" />}
                                    label="Normal"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={formik.values.distributions.includes('uniform')} onChange={onSelectCheckBox} value="uniform" />}
                                    label="Uniform"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={formik.values.distributions.includes('exponential')} onChange={onSelectCheckBox} value="exponential" />}
                                    label="Exponential"
                                />
                            </Box>
                            {formik.touched.distributions && formik.errors.distributions && (
                                <Typography color="error" variant="caption">
                                    {formik.errors.distributions}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "0.3em !important" }}>
                            <TextField
                                name="speed_scaling"
                                label="Speed Scaling"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.speed_scaling}
                                error={formik.touched.speed_scaling && Boolean(formik.errors.speed_scaling)}
                                helperText={formik.touched.speed_scaling && formik.errors.speed_scaling}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "0.3em !important" }}>
                            <TextField
                                name="release_due_date"
                                label="Release Due Date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.release_due_date}
                                error={formik.touched.release_due_date && Boolean(formik.errors.release_due_date)}
                                helperText={formik.touched.release_due_date && formik.errors.release_due_date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Box >
        </>
    );
}

export default Step2;
