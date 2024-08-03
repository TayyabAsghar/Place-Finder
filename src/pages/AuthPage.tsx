import LogInSVG from "../components/LogInSVG";
import { Link, Outlet, useLocation } from "react-router-dom";

const AuthPage = () => {
    const location = useLocation();

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
                            <div className="text-foreground opacity-70">
                                Please {location.pathname === "/login" ? "Log-in to" : "create"} your account and start exploring locations
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full">
                        <Outlet />
                        <div className="flex flex-col gap-1">
                            <div className="text-foreground text-opacity-70">
                                {location.pathname === "/login" ? "New on our platform?" : "Already have an account?"}&nbsp;
                                <Link to={location.pathname === "/login" ? "/signup" : "/login"} className="text-accent hover:underline hover:text-accent-600">
                                    {location.pathname === "/login" ? "Sign Up" : "Log In"}
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
        </div >
    );
};

export default AuthPage;