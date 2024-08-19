import { z } from "zod";
import useAxios from "../hooks/useAxios";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { toTitleCase } from "../lib/utils";
import ReactError from "../lib/reactError";
import type { SignUpForm } from "../lib/types";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotification from "../hooks/useNotification";
import { SignUpValidations } from "../lib/validations/UserValidations";

const SignUpPage = () => {
    const customAxios = useAxios();
    const navigate = useNavigate();
    const { setNotification } = useNotification();
    type SignUpFormType = z.infer<typeof SignUpValidations>;
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormType>({
        resolver: zodResolver(SignUpValidations)
    });

    const handleFormSubmit = async (data: SignUpFormType) => {
        try {
            const signUpForm: SignUpForm = {
                name: toTitleCase(data.name),
                email: data.email.toLowerCase(),
                password: data.password
            };

            await customAxios.post('/auth/signup', JSON.stringify(signUpForm), ["json", "skip-authorization"]);
            navigate("/login");
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        }
    };

    return (
        <form className="flex flex-col items-center w-full" onSubmit={handleSubmit(handleFormSubmit)}>
            <TextField
                className="auth-from-control"
                label="Name*"
                title="Name"
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <TextField
                className="auth-from-control"
                label="Email Address*"
                title="Email Address"
                type="email"
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                className="auth-from-control"
                label="Password*"
                title="Password"
                type="password"
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
            />
            <TextField
                className="auth-from-control"
                label="Confirm Password*"
                title="Confirm Password"
                type="password"
                margin="normal"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
            />
            <LoadingButton className="auth-from-control" sx={{ mt: 2 }} type="submit" variant="contained" loading={isSubmitting} title="Sign Up">
                Sign Up
            </LoadingButton>
        </form>
    );
};

export default SignUpPage;
