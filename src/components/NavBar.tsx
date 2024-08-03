import LogOut from "./LogOut";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { FiLogIn } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getInitials } from "../lib/utils";
import type { UserState } from "../lib/types";
import { HideNavBar } from "../lib/constants";
import { BsFileEarmarkLock } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { Person, MenuOutlined } from "@mui/icons-material";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { PiBuildingOfficeBold, PiListHeartBold } from "react-icons/pi";
import { HiClipboardDocumentList, HiOutlineUserPlus } from "react-icons/hi2";

const NavBar = () => {
    const location = useLocation();
    const apiUrl = process.env.REACT_APP_API_URL;
    const user = useSelector((state: UserState) => state.user);
    const [dropdownEl, setDropdownEl] = useState<EventTarget & HTMLButtonElement | null>(null);
    const menuOpen = Boolean(dropdownEl);

    if (HideNavBar.includes(location.pathname)) return <></>;

    const DropDownMenu = () => {
        if (!dropdownEl) return <></>;

        return (
            <Menu anchorEl={dropdownEl} open={menuOpen} onClose={() => setDropdownEl(null)}
                aria-labelledby="basic-button" disableScrollLock>
                {user ?
                    <div>
                        <MenuItem selected={location.pathname === "/user/trips"}>
                            <Link to="/user/trips" className="profile-dropdown">
                                <HiClipboardDocumentList />
                                Trip List
                            </Link>
                        </MenuItem>
                        <MenuItem selected={location.pathname === "/user/wishes"}>
                            <Link to="/user/wishes" className="profile-dropdown">
                                <PiListHeartBold />
                                Wish List
                            </Link>
                        </MenuItem>
                        <MenuItem selected={location.pathname === "/user/properties"}>
                            <Link to="/user/properties" className="profile-dropdown">
                                <PiBuildingOfficeBold />
                                Property List
                            </Link>
                        </MenuItem>
                        <MenuItem selected={location.pathname === "/user/reservations"}>
                            <Link to="/user/reservations" className="profile-dropdown">
                                <BsFileEarmarkLock />
                                Reservation List
                            </Link>
                        </MenuItem>
                        <MenuItem selected={location.pathname === "/create-listing"}>
                            <Link className="profile-dropdown" to={user ? "/create-listing" : "/login"}>
                                <RiPlayListAddFill />
                                Become A Host
                            </Link>
                        </MenuItem>
                        <MenuItem> <LogOut /> </MenuItem>
                    </div> :
                    <div>
                        <MenuItem selected={location.pathname === "/login"}>
                            <Link to="/login" className="profile-dropdown">
                                <FiLogIn />
                                Log In
                            </Link>
                        </MenuItem>
                        <MenuItem selected={location.pathname === "/signup"}>
                            <Link to="/signup" className="profile-dropdown">
                                <HiOutlineUserPlus />
                                Sign Up
                            </Link>
                        </MenuItem>
                    </div>
                }
            </Menu>
        );
    };

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
                        to={user ? "/create-listing" : "/login"}>
                        Become A Host
                    </Link>
                }

                <Button className="gap-3 h-12 max-ml:!min-w-0 max-ml:!p-0.5 max-ml:h-auto" sx={{ borderRadius: 28 }} variant="contained"
                    id="basic-button" aria-haspopup="true" aria-controls={menuOpen ? 'basic-menu' : undefined}
                    aria-expanded={menuOpen ? 'true' : undefined} onClick={e => setDropdownEl(e.currentTarget)}>
                    <div className="max-ml:hidden" >
                        <MenuOutlined />
                    </div>
                    {user ? user.avatar ?
                        <Avatar src={`${apiUrl}${user.avatar.replace("public", "")}`} sx={{ bgcolor: 'primary.main' }}
                            alt="profile photo" /> :
                        <Avatar sx={{ bgcolor: 'background.default', color: 'text.primary' }} >{getInitials(user.name)}</Avatar> :
                        <Person />
                    }
                </Button>
                <DropDownMenu />
            </div>
        </nav >
    );
};

export default NavBar;