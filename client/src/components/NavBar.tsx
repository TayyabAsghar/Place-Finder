import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import type { UserState } from "../lib/types";
import NavBarDropdown from "./NavBarDropdown";
import { HideNavBar } from "../lib/constants";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();
    const isLoggedIn = useSelector((state: UserState) => state.isLoggedIn);
    if (HideNavBar.includes(location.pathname)) return <></>;

    return (
        <nav className="flex justify-between items-center px-10 py-3 h-[72px] border-b sticky top-0 bg-background z-50 max-ml:px-8 max-mm:px-5">
            <Link to="/" title="Place Finder">
                <img className="w-16 h-16 max-ml:w-14 max-ml:h-14 max-mm:w-12 max-mm:h-12"
                    src="/assets/images/logo/logo192.png" alt="Logo" />
            </Link>
            {location.pathname !== "/login" && location.pathname !== "/signup" &&
                <SearchBar />
            }

            <div className="flex items-center gap-5">
                {location.pathname !== "/create-listing" &&
                    <Link className="text-accent font-bold hover:text-accent-600 max-tab:hidden"
                        to={isLoggedIn ? "/create-listing" : "/login"}>
                        Become A Host
                    </Link>
                }
                <NavBarDropdown />
            </div>
        </nav >
    );
};

export default NavBar;