import LogOut from "./LogOut";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { FiLogIn } from "react-icons/fi";
import { UserState } from "../lib/types";
import { useSelector } from "react-redux";
import { getInitials } from "../lib/utils";
import { BsFileEarmarkLock } from "react-icons/bs";
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

    const DropDownMenu = () => {
        if (!dropdownEl) return <></>;

        return (
            <Menu anchorEl={dropdownEl} open={menuOpen} onClose={() => setDropdownEl(null)}
                aria-labelledby="basic-button" >
                {user ?
                    <div>
                        <MenuItem>
                            <Link to="/user/trips" className="profile-dropdown">
                                <HiClipboardDocumentList />
                                Trip List
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/user/wish" className="profile-dropdown">
                                <PiListHeartBold />
                                Wish List
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/user/properties" className="profile-dropdown">
                                <PiBuildingOfficeBold />
                                Property List
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/user/reservations" className="profile-dropdown">
                                <BsFileEarmarkLock />
                                Reservation List
                            </Link>
                        </MenuItem>
                        <MenuItem> <LogOut /> </MenuItem>
                    </div> :
                    <div>
                        <MenuItem>
                            <Link to="/login" className="profile-dropdown">
                                <FiLogIn />
                                Log In
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/register" className="profile-dropdown">
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
        <nav className="flex justify-between items-center px-10 py-3 h-[72px] border-b sticky top-0 bg-background z-50">
            <Link to="/" title="Place Finder">
                <img className="w-16 h-16" src="/assets/images/logo/logo192.png" alt="Logo" />
            </Link>
            {location.pathname !== "/login" && location.pathname !== "/signup" &&
                <SearchBar />
            }

            <div className="flex items-center gap-5">
                {location.pathname !== "/create-listing" &&
                    <Link className="text-accent font-bold hover:text-accent-600" to={user ? "/create-listing" : "/login"}>
                        Become A Host
                    </Link>
                }

                <Button className="flex items-center p-2 border gap-3 h-12" sx={{ borderRadius: 28 }} variant="contained"
                    id="basic-button" aria-haspopup="true" aria-controls={menuOpen ? 'basic-menu' : undefined}
                    aria-expanded={menuOpen ? 'true' : undefined} onClick={e => setDropdownEl(e.currentTarget)}>
                    <MenuOutlined />
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