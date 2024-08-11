import React, { HTMLAttributes, useEffect, useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, NativeSelect, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { validationStep3 } from './step3Validations';
import { useTheme, useMediaQuery } from '@mui/material';
import { FormData } from "./constants"

interface StepData {
    formData: FormData;
    setFormData: (formData: FormData) => void;
    isStepValid: boolean
    setStepValid: (isStepValid: boolean) => void;
    updateFormData: (data: Partial<FormData>, reset: boolean) => void;
}

const Step3 = ({ formData, setFormData, isStepValid, setStepValid, updateFormData }: StepData) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [parsedCustomName, setParsedCustomName] = useState<string>('');
    const [isSolverChecked, setIsSolverChecked] = useState<boolean>(false);

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            pickle_file_output: formData.pickle_file_output,
            json_file_output: formData.json_file_output,
            dzn_file_output: formData.dzn_file_output,
            taillard_file_output: formData.taillard_file_output,
            single_folder_output: formData.single_folder_output,
            custom_folder_name: formData.custom_folder_name,
            solver: formData.solver,
            anyChecked: false,
        },
        validationSchema: validationStep3,
        onSubmit: async (values) => {
            console.log(values);
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true
    });

    useEffect(() => {
        if (!formik.isValid) {
            setStepValid(false)
            console.log(formik.errors)
        }
        if (formik.isValid) {
            setStepValid(true)
            updateFormData({
                pickle_file_output: formik.values.pickle_file_output,
                json_file_output: formik.values.json_file_output,
                dzn_file_output: formik.values.dzn_file_output,
                taillard_file_output: formik.values.taillard_file_output,
                single_folder_output: formik.values.single_folder_output,
                custom_folder_name: formik.values.custom_folder_name,
                solver: formik.values.solver,
            }, false);
        }
    }, [formik.values, formik.touched, formik.isValid]);


    useEffect(() => {
        console.log('holi')
        setParsedCustomName(parseCustomFolderName(formik.values.custom_folder_name, formData))
    }, [formik.values.custom_folder_name]);

    function parseCustomFolderName(customFolderName, formData) {
        // Destructuramos formData usando alias para seeds y distributions
        const {
            size,
            jobs,
            machines,
            release_due_date,
            speed_scaling,
            seeds: seed,  // Renombrando seeds a seed
            distributions: distribution  // Renombrando distributions a distribution
        } = formData;

        // Crear un objeto para mapear los nombres de los campos a sus valores correspondientes en formData
        const replacements = {
            size,
            jobs,
            machines,
            release_due_date,
            speed_scaling,
            seed,  // Usando el nuevo nombre 'seed'
            distribution: distribution.join(', ') // Usando 'distribution' y uniendo los elementos del array
        };

        // Reemplazar cada campo en el string customFolderName
        return customFolderName.replace(/\{(size|jobs|machines|release_due_date|speed_scaling|seed|distribution)\}/g, (match) => {
            // Eliminar los corchetes {} para obtener la clave
            const key = match.replace(/[{}]/g, '');
            // Retornar el valor correspondiente si existe, si no, dejar el match como está
            return replacements.hasOwnProperty(key) ? replacements[key] : match;
        });
    }


    const onSolver = () => {
        console.log(' onsolver: ' + formik.values.dzn_file_output)
        if (!formik.values.dzn_file_output) setIsSolverChecked(false);
        setIsSolverChecked(prev => !prev);
    }

    useEffect(() => {
        // Listener para el checkbox que controla si se debe resolver instancias
        if (!isSolverChecked || !formik.values.dzn_file_output) {
            formik.setFieldValue('solver', 'None');  // Actualiza el campo solver a 'None'
            formData.solver = 'None';  // También actualiza el objeto formData si es necesario
            console.log('solver updated to None due to checkbox');
        }
    }, [isSolverChecked, formik.setFieldValue, formData]);


    useEffect(() => {
        console.log(formik.values.dzn_file_output)
        if (!formik.values.dzn_file_output) setIsSolverChecked(false);
    }, [formik.values.dzn_file_output])

    return (
        <>
            <Box sx={{ maxHeight: isSmallScreen ? 'auto' : 'auto', overflowY: 'none', display: 'flex' }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12} sx={{ paddingX: '1rem', paddingY: "4rem" }}>
                        <Typography >
                            Output Settings:
                        </Typography>

                        <FormControlLabel
                            control={<Checkbox name="single_folder_output" checked={formik.values.single_folder_output} onChange={formik.handleChange} />}
                            label="Single Folder"
                        />

                        <Box display="flex" flexDirection="row" sx={{ marginTop: '1rem' }}>
                            <FormControlLabel
                                control={<Checkbox name="pickle_file_output" checked={formik.values.pickle_file_output} onChange={formik.handleChange} />}
                                label="Pickle"
                            />
                            <FormControlLabel
                                control={<Checkbox name="json_file_output" checked={formik.values.json_file_output} onChange={formik.handleChange} />}
                                label="Json"
                            />
                            <FormControlLabel
                                control={<Checkbox name="dzn_file_output" checked={formik.values.dzn_file_output} onChange={formik.handleChange} />}
                                label="DZN"
                            />
                            <FormControlLabel
                                control={<Checkbox name="taillard_file_output" checked={formik.values.taillard_file_output} onChange={formik.handleChange} />}
                                label="Taillard"
                            />

                        </Box>
                        {/* Error message for checkbox group */}

                        <Typography color="error" variant="body2">
                            {formik.errors.anyChecked}
                        </Typography>


                        <Grid item xs={12} lg={6} sx={{ paddingX: '0rem' }}>
                            <FormControl fullWidth required sx={{ marginBottom: "1em !important" }}>
                                <TextField
                                    name="custom_folder_name"
                                    label="Custom Folder Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.custom_folder_name}
                                    error={formik.touched.custom_folder_name && Boolean(formik.errors.custom_folder_name)}
                                    helperText={formik.touched.custom_folder_name && formik.errors.custom_folder_name}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6} sx={{ paddingX: '0rem' }}>
                            <FormControl fullWidth required sx={{ marginBottom: "1em !important" }}>
                                <TextField
                                    name="custom_folder_name_parsed"
                                    label="Parsed Custom Folder Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    value={parsedCustomName}
                                    inputProps={{  // Usar inputProps para propiedades específicas del elemento input
                                        readOnly: true  // Establecer readOnly aquí
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6} sx={{ paddingX: '0rem' }}>
                            <FormControlLabel
                                control={<Checkbox name="solve_instances" checked={isSolverChecked} onChange={onSolver} />}
                                label="Solve Instances"
                                disabled={!formik.values.dzn_file_output}
                            />

                            <FormControl fullWidth required sx={{ marginBottom: "1em !important" }}>
                                <TextField
                                    label="Solver"
                                    select
                                    fullWidth
                                    margin="dense"
                                    name='solver'
                                    id="solver"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.solver || formData.solver}
                                    error={formik.touched.solver && Boolean(formik.errors.solver)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        disabled: !isSolverChecked || !formik.values.dzn_file_output
                                    }}
                                >
                                    <MenuItem value={'None'}>None</MenuItem>
                                    <MenuItem value={'Gecode'}>Gecode</MenuItem>
                                    <MenuItem value={'Cplex'}>Cplex</MenuItem>
                                    <MenuItem value={'Gurobi'}>Gurobi</MenuItem>
                                    <MenuItem value={'ORTOOLS'}>ORTOOLS</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>

                    </Grid>


                </Grid>
            </Box >
        </>
    );
}

export default Step3;
