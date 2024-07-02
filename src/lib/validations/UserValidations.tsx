import * as z from 'zod';

export const SignUpValidations = z.object({
    name: z.string().trim()
        .min(1, { message: 'Required field.' })
        .max(30, { message: 'Maximum 30 characters.' }),
    email: z.string().trim().toLowerCase()
        .min(1, { message: 'Required field.' })
        .email('Invalid email!'),
    password: z.string()
        .min(1, { message: 'Required field.' })
        .min(8, { message: 'Password must be at least 8 characters long.' }),
    confirmPassword: z.string().min(1, { message: 'Required field.' })
}).refine(value => value.password === value.confirmPassword, {
    message: 'Password doesn\'t match.',
    path: ['confirmPassword']
});
