import LogOut from "./LogOut";
import { UserState } from "../lib/types";
import { FiLogIn } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getInitials } from "../lib/utils";
import { HideNavBar } from "../lib/constants";
import { BsFileEarmarkLock } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { type MouseEvent as RME, useEffect, useState } from "react";
import { Person, MenuOutlined } from "@mui/icons-material";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { PiBuildingOfficeBold, PiListHeartBold } from "react-icons/pi";
import { HiClipboardDocumentList, HiOutlineUserPlus } from "react-icons/hi2";

const NavBarDropdown = () => {
    const location = useLocation();
    const apiUrl = process.env.REACT_APP_API_URL;
    const user = useSelector((state: UserState) => state.user);
    const [dropdownEl, setDropdownEl] = useState<EventTarget & HTMLButtonElement | null>(null);
    const menuOpen = Boolean(dropdownEl);
    const hideDropDown = () => setDropdownEl(null);

    useEffect(() => { hideDropDown(); }, [location]);

    if (HideNavBar.includes(location.pathname)) return <></>;

    const handleClick = (e: RME<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setDropdownEl(e.currentTarget);
    };

    const DropDownMenu = () => {
        if (!dropdownEl) return <></>;

        return (
            <Menu anchorEl={dropdownEl} open={menuOpen} onClose={hideDropDown}
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
        <>
            <Button className="gap-3 h-12 max-ml:!min-w-9 max-ml:!w-9 max-ml:!h-9 max-ml:!p-0" sx={{ borderRadius: 28 }} variant="contained"
                id="basic-button" aria-haspopup="true" aria-controls={menuOpen ? 'basic-menu' : undefined}
                aria-expanded={menuOpen ? 'true' : undefined} onClick={handleClick}>
                <div className="max-ml:hidden" >
                    <MenuOutlined />
                </div>
                {user ? user.avatar ?
                    <Avatar className="max-ml:!size-8" src={`${apiUrl}${user.avatar.replace("public", "")}`} sx={{ bgcolor: 'primary.main' }}
                        alt="profile photo" /> :
                    <Avatar className="max-ml:!size-8 max-ml:!text-base" sx={{ bgcolor: 'background.default', color: 'text.primary' }} >{getInitials(user.name)}</Avatar> :
                    <Person />
                }
            </Button>
            <DropDownMenu />
        </>
    );
};

export default NavBarDropdown;