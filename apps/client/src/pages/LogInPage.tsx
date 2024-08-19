import { z } from "zod";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import useAxios from "../hooks/useAxios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ReactError from "../lib/reactError";
import type { LogInForm } from "../lib/types";
import { setLogin } from "../lib/redux/state";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import useNotification from "../hooks/useNotification";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LogInValidations } from "../lib/validations/UserValidations";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";

const LogInPage = () => {
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setNotification } = useNotification();
    type LogInFormType = z.infer<typeof LogInValidations>;
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LogInFormType>({
        resolver: zodResolver(LogInValidations)
    });

    const changePasswordVisibility = () => setShowPassword(showPassword => !showPassword);

    const handleFormSubmit = async (data: LogInFormType) => {
        try {
            const logInForm: LogInForm = {
                email: data.email.toLowerCase(),
                password: data.password
            };

            const response = await customAxios.post('/auth/login', JSON.stringify(logInForm), ["json", "skip-authorization"]);

            dispatch(
                setLogin({
                    user: response.data.user,
                    token: response.data.accessToken
                }));
            navigate("/");
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        }
    };

    return (
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
            <FormControl className="auth-from-control" sx={{ my: 2 }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    label="Password"
                    title="Password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    error={!!errors.password}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton edge="end" aria-label="toggle password visibility"
                                onClick={changePasswordVisibility}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <LoadingButton className="auth-from-control" sx={{ mt: 2 }} type="submit" variant="contained" loading={isSubmitting} title="Log In">
                Log In
            </LoadingButton>
        </form>
    );
};

export default LogInPage;
