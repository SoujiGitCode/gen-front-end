import * as Yup from 'yup';

export const validationStep1 = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .max(100, "Maximum 100 characters"),

    full_name: Yup.string()
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "Name should only contain letters and single spaces between words")
        .required("First name is required")
        .max(20, "Maximum 20 characters"),

    school_name: Yup.string()
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "School name should only contain letters and single spaces between words")
        .required("School name is required")
        .max(20, "Maximum 20 characters"),
})
