import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import { useFormik } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';
import { dark } from '@mui/material/styles/createPalette';
import Step4 from './step4';
import { FormData } from "./constants"


const buttons = {
    mt: 1,
    mr: 1,
    width: '250px !important'
}


const VerticalStepper = ({ darkMode }: { darkMode: boolean }) => {
    const initialFormData: FormData = {
        email: "dev@gg.com",
        full_name: "reinaldo c",
        school_name: "upv",

        size: "1",
        jobs: "10",
        job_step: "5",
        machines: "10",
        machine_step: "5",
        distributions: ["normal"],
        speed_scaling: "5",
        release_due_date: "2",
        seeds: "1",

        pickle_file_output: false,
        json_file_output: false,
        dzn_file_output: true,
        taillard_file_output: true,
        single_folder_output: false,
        custom_folder_name: ""

    };
    // const initialFormData: FormData = {
    //     email: "",
    //     full_name: "",
    //     school_name: "",

    //     size: "",
    //     jobs: "",
    //     job_step: "",
    //     machines: "",
    //     machine_step: "",
    //     distributions: [],
    //     speed_scaling: "",
    //     release_due_date: "",
    //     seeds: ""
    // };

    const [activeStep, setActiveStep] = useState(0);
    const [isStepValid, setStepValid] = useState(false);
    const [uniqueIdDownload, setUniqueIdDowload] = useState("");

    const API_BASE_URL = "http://127.0.0.1:8000";

    const parseFormData = (formData: FormData) => {
        // Extracción de campos específicos del objeto original
        const {
            email,
            full_name,
            school_name,
            seeds,
            pickle_file_output,
            json_file_output,
            dzn_file_output,
            taillard_file_output,
            single_folder_output,
            custom_folder_name,
            ...dataToProcess } = formData;

        // Transformar `size`, `speed_scaling`, y `release_due_date` a números, si son necesarios
        const transformedData = {
            size: parseInt(dataToProcess.size),
            speed_scaling: parseInt(dataToProcess.speed_scaling),
            release_due_date: parseInt(dataToProcess.release_due_date),
            seeds: [seeds]
        };

        // Calcular los arrays para 'jobs' y 'machines' correctamente
        const jobStep = parseInt(dataToProcess.job_step);
        const jobs = parseInt(dataToProcess.jobs);
        const machineStep = parseInt(dataToProcess.machine_step);
        const machines = parseInt(dataToProcess.machines);

        const jobsArray = Array.from({ length: Math.ceil((jobs - jobStep + jobStep) / jobStep) }, (_, i) => (i * jobStep + jobStep));
        const machinesArray = Array.from({ length: Math.ceil((machines - machineStep + machineStep) / machineStep) }, (_, i) => (i * machineStep + machineStep));

        // Retornar el nuevo objeto combinando el objeto transformado con los nuevos arrays para 'jobs' y 'machines'
        return {
            email,
            full_name,
            school_name,
            pickle_file_output,
            json_file_output,
            dzn_file_output,
            taillard_file_output,
            single_folder_output,
            custom_folder_name,
            ...transformedData,
            jobs: jobsArray,
            machines: machinesArray,
            distributions: dataToProcess.distributions,
        };
    }

    const handleNext = async () => {
        const nextStep = activeStep + 1;

        // Verificar si el usuario está avanzando desde el paso 2
        if (activeStep === 2) {
            setStepValid(false); // Desactivar el botón mientras carga la petición

            // Mostrar un modal de carga
            Swal.fire({
                title: 'Loading...',
                text: 'Please wait.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(); // Mostrar el spinner de carga
                }
            });

            try {
                const response = await axios.post(`${API_BASE_URL}/custom_generation`, parseFormData(formData));
                console.log('Datos enviados con éxito:', response.data);
                setStepValid(true);
                setUniqueIdDowload(response.data.unique_id);

                Swal.fire({
                    title: '¡Success!',
                    text: 'Data has been sent.',
                    // icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Proceder al siguiente paso tras el éxito
                setActiveStep(nextStep);
            } catch (error) {
                console.error('Error al enviar los datos:', error);
                setStepValid(true);

                Swal.fire({
                    title: 'Error',
                    text: 'Data could not been sent.',
                    // icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            setActiveStep(nextStep); // Procede al siguiente paso si no estamos en el paso 2
        }
    };

    const onGenerateClick = async () => {
        setActiveStep(1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const updateFormData = (data: Partial<FormData>, reset = false) => {
        if (reset) {
            setFormData(initialFormData);
            return;
        }
        setFormData(prevData => ({ ...prevData, ...data }));
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const steps = [
        {
            label: 'Personal Information',
            description: 'Please fill in your details.',
            content: (
                <>
                    <Step1 formData={formData} setFormData={setFormData} isStepValid={isStepValid} setStepValid={setStepValid} updateFormData={updateFormData} />
                </>
            ),
        },
        {
            label: 'JSP Instance Generator',
            description: 'Please fill in the fields in order to generate instances.',
            content: (
                <>
                    <Step2 formData={formData} setFormData={setFormData} isStepValid={isStepValid} setStepValid={setStepValid} updateFormData={updateFormData} />
                </>
            ),
        },
        {
            label: 'Output Configuration',
            description: 'Set your Output Configuration files and folder.',
            content: (
                <Step3 formData={formData} setFormData={setFormData} isStepValid={isStepValid} setStepValid={setStepValid} updateFormData={updateFormData} />
            ),
        },

        {
            label: 'Download',
            description: 'Thank you for using the JSP Instance Generator',
            content: (
                <Step4 />
            ),
        },

    ];

    const onClickDownload = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/download/${uniqueIdDownload}`, {
                method: 'GET',
                headers: {}
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = uniqueIdDownload; // El nombre con el que quieres guardar el archivo
                document.body.appendChild(a);
                a.click();
                a.remove(); // Limpiar el DOM
                window.URL.revokeObjectURL(url);
            } else {
                throw new Error('Error en la descarga del archivo.');
            }
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
            // Manejar el error, mostrar mensaje al usuario, etc.
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <>{step.content}</>
                            <Box sx={{ mb: 2 }}>
                                {index < 3 ?
                                    <>
                                        <Button
                                            disabled={!isStepValid}
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ ...buttons, color: darkMode ? '#303030 !important' : '#fdfefd !important', }}
                                        >
                                            Continue
                                        </Button>

                                        <Button
                                            disabled={index === 0 || !isStepValid}
                                            variant="contained"
                                            onClick={handleBack}
                                            sx={{ ...buttons, color: darkMode ? '#303030 !important' : '#fdfefd !important', }}
                                        >
                                            Back
                                        </Button>
                                    </>

                                    :

                                    <>
                                        <Button
                                            disabled={!uniqueIdDownload}
                                            variant="contained"
                                            onClick={onClickDownload}
                                            sx={{
                                                ...buttons,
                                                backgroundColor: darkMode ? '#fdfdfd ' : '#303030',
                                                color: darkMode ? '#303030 !important' : '#fdfdfd !important',
                                                ':hover': {
                                                    backgroundColor: darkMode ? '#e0e0e0' : '#3c3c3c',
                                                    color: darkMode ? '#303030' : '#fdfdfd',
                                                }
                                            }}
                                        >
                                            Download Zip
                                        </Button>

                                        <Button
                                            variant="contained"
                                            onClick={onGenerateClick}
                                            sx={{ ...buttons, color: darkMode ? '#303030 !important' : '#fdfefd !important', }}
                                        >
                                            Generate
                                        </Button>
                                    </>
                                }
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default VerticalStepper