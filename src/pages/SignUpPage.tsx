import { z } from "zod";
import useAxios from "../hooks/useAxios";
import { LoadingButton } from "@mui/lab";
import { SignUpForm } from "../lib/types";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { toTitleCase } from "../lib/utils";
import ReactError from "../lib/ReactError";
import LogInSVG from "../components/LogInSVG";
import { Link, useNavigate } from "react-router-dom";
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
                            <div className="text-foreground opacity-70">Please create your account and start exploring locations</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full">
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
                        <div className="flex flex-col gap-1">
                            <div className="text-foreground text-opacity-70">
                                Already have an account?&nbsp;
                                <Link to={"/login"} className="text-accent hover:underline hover:text-accent-600">
                                    Log In
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

export default SignUpPage;
