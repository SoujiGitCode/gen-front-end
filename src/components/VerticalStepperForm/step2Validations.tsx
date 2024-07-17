import * as Yup from 'yup';

export const validationStep2 = Yup.object({
    size: Yup.string()
        .matches(/^\d{1,5}$/, "Only numbers are allowed and maximum 5 digits")
        .required('Size field is Required'),

    seed: Yup.string()
        .matches(/^\d{1,20}$/, "Only numbers are allowed and maximum 20 digits")
        .required('Seed field is Required'),

    jobs: Yup.string()
        .matches(/^\d{1,5}$/, "Only numbers are allowed and maximum 5 digits")
        .required('Jobs field is Required'),

    job_step: Yup.string()
        .matches(/^\d{1,5}$/, "Only numbers are allowed and maximum 5 digits")
        .required('Job Step field is Required'),

    machines: Yup.string()
        .matches(/^\d{1,5}$/, "Only numbers are allowed and maximum 5 digits")
        .required('Machines field is Required'),

    machine_step: Yup.string()
        .matches(/^\d{1,5}$/, "Only numbers are allowed and maximum 5 digits")
        .required('Machine Step field is Required'),

    distributions: Yup.array()
        .min(1, "At least one distribution must be selected")
        .required('Distributions are Required'),

    speed_scaling: Yup.string()
        .matches(/^[1-9]$/, "Must be an integer between 1 and 9")
        .required('Speed Scaling field is Required'),

    release_due_date: Yup.string()
        .matches(/^[1-9]$/, "Must be an integer between 1 and 9")
        .required('Release Due Date field is Required'),
});
