import { z } from "zod";
import { LoadingButton } from "@mui/lab";
import useAxios from "../hooks/useAxios";
import { LogInForm } from "../lib/types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLogin } from "../lib/redux/state";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, TextField, Typography } from "@mui/material";
import { LogInValidations } from "../lib/validations/UserValidations";

const LogInPage = () => {
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    type LogInFormType = z.infer<typeof LogInValidations>;
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LogInFormType>({
        resolver: zodResolver(LogInValidations)
    });

    const handleFormSubmit = async (data: LogInFormType) => {
        try {
            const logInForm: LogInForm = {
                email: data.email.toLowerCase(),
                password: data.password
            };

            const response = await customAxios.post('http://localhost:3001/auth/login', JSON.stringify(logInForm), 'json');

            if (response) {
                dispatch(setLogin({
                    user: response.data.user,
                    token: response.data.token
                }));
                navigate("/");
            }
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <div className="flex grow justify-center items-center">
            <div className="flex flex-col items-center gap-4 p-8 w-1/3">
                <div className="flex flex-col items-center">
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h4">Log In</Typography>
                </div>
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit(handleFormSubmit)}>
                    <TextField
                        className="auth-from-control"
                        label="Email"
                        title="Email"
                        type="email"
                        margin="normal"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        className="auth-from-control"
                        label="Password"
                        title="Password"
                        type="password"
                        margin="normal"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <LoadingButton className="auth-from-control" sx={{ mt: 2 }} type="submit" variant="contained" loading={isSubmitting} title="Log In">
                        Log In
                    </LoadingButton>
                </form>
                <Link to={"/signup"} className="text-accent hover:underline hover:text-accent-600">
                    Doesn't have an account? Sign Up
                </Link>
            </div>
        </div>
    );
};

export default LogInPage;
