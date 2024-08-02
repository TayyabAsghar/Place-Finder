import { z } from "zod";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import useAxios from "../hooks/useAxios";
import { LogInForm } from "../lib/types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLogin } from "../lib/redux/state";
import LogInSVG from "../components/LogInSVG";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LogInValidations } from "../lib/validations/UserValidations";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";

const LogInPage = () => {
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            console.error("Login failed", err);
        }
    };

    return (
        <div className="flex grow w-full min-h-screen items-center bg-accent-300 bg-opacity-80">
            <div className="flex items-center justify-center w-1/2 max-ml:hidden">
                <div className="w-3/4 text-primary-600">
                    <LogInSVG />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 min-h-screen grow bg-background">
                <div className="flex flex-col items-start gap-3 w-3/4 max-ms:w-4/5">
                    <div className="flex flex-col items-start px-6 gap-6 max-lap:px-4 max-tab:px-2">
                        <img className="w-28 h-28 max-ml:w-20 max-ml:h-20"
                            src="/assets/images/logo/logo192.png" alt="Logo" />
                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-lg font-semibold">Welcome to Place Finder!</h3>
                            <div className="text-foreground opacity-70">Please Log-in to your account and start exploring locations</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full">
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
                        <div className="flex flex-col gap-1">
                            <div className="text-foreground text-opacity-70">
                                New on our platform?&nbsp;
                                <Link to={"/signup"} className="text-accent hover:underline hover:text-accent-600">
                                    Sign Up
                                </Link>
                            </div>
                            <div className="text-foreground text-opacity-70">
                                or&nbsp;
                                <Link to={"/"} className="text-accent hover:underline hover:text-accent-600">
                                    Start Exploring
                                </Link>
                                &nbsp;without Log-in
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
