import { z } from "zod";
import useAxios from "../hooks/useAxios";
import { LoadingButton } from "@mui/lab";
import { SignUpForm } from "../lib/types";
import { useForm } from "react-hook-form";
import { toTitleCase } from "../lib/utils";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, TextField, Typography } from "@mui/material";
import { SignUpValidations } from "../lib/validations/UserValidations";

const SignUpPage = () => {
    const customAxios = useAxios();
    const navigate = useNavigate();
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

            await customAxios.post('http://localhost:3001/auth/signup', JSON.stringify(signUpForm), 'json');
            navigate("/login");
        } catch (err) {
            console.error("Registration failed", err);
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center gap-4 p-8 w-1/3">
                <div className="flex flex-col items-center">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h4">Sign Up</Typography>
                </div>
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
                    <LoadingButton className="auth-from-control" sx={{ mt: 2 }} type="submit" variant="contained" loading={isSubmitting} title="SignUp">
                        Sign Up
                    </LoadingButton>
                </form>
                <Link to={"/login"} className="text-blue-600 hover:underline">Have an account? Log In</Link>
            </div>
        </div>
    );
};

export default SignUpPage;
