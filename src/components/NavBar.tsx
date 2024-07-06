import { useState } from "react";
import SearchBar from "./SearchBar";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { UserState } from "../lib/types";
import { getInitials } from "../lib/utils";
import { setLogout } from "../lib/redux/state";
import { Person, MenuOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const user = useSelector((state: UserState) => state.user);
    const [dropdownEl, setDropdownEl] = useState<EventTarget & HTMLButtonElement | null>(null);
    const menuOpen = Boolean(dropdownEl);

    const DropDownMenu = () => {
        if (!dropdownEl) return <></>;

        return (
            <Menu anchorEl={dropdownEl} open={menuOpen} onClose={() => setDropdownEl(null)}
                aria-labelledby="'basic-button">
                {user ?
                    <div>
                        <MenuItem><Link to={`/${user._id}/trips`}>Trip List</Link></MenuItem>
                        <MenuItem><Link to={`/${user._id}/wishList`}>Wish List</Link></MenuItem>
                        <MenuItem><Link to={`/${user._id}/properties`}>Property List</Link></MenuItem>
                        <MenuItem><Link to={`/${user._id}/reservations`}>Reservation List</Link></MenuItem>
                        <MenuItem><Link to="/login" onClick={() => dispatch(setLogout())}>Log Out</Link></MenuItem>
                    </div> :
                    <div>
                        <MenuItem><Link to="/login">Log In</Link></MenuItem>
                        <MenuItem><Link to="/register">Sign Up</Link></MenuItem>
                    </div>
                }
            </Menu>
        );

    };

    return (
        <nav className="flex justify-between items-center relative px-10 py-3">
            <Link to="/" title="Place Finder">
                <img src="/assets/logo.png" alt="logo" />
            </Link>
            <SearchBar search={search} setSearch={setSearch}></SearchBar>

            <div className="flex items-center gap-5">
                <Link className="text-blue-500 font-bold hover:text-blue-700" to={user ? "/create-listing" : "/login"}>
                    Become A Host
                </Link>

                <button className="flex items-center p-2 border border-gray-400 rounded-[30px] gap-3 h-12"
                    id="basic-button" aria-controls={menuOpen ? 'basic-menu' : undefined}
                    aria-haspopup="true" aria-expanded={menuOpen ? 'true' : undefined}
                    onClick={e => setDropdownEl(e.currentTarget)} >
                    <MenuOutlined />
                    {user ? user.profileImagePath ?
                        <Avatar src={`http://localhost:3001/${user.profileImagePath.replace("public", "")}`} sx={{ bgcolor: 'primary.main' }}
                            alt="profile photo" >
                            {getInitials(user.name)}
                        </Avatar> :
                        <Avatar sx={{ bgcolor: 'primary.main' }} >
                            {getInitials(user.name)}
                        </Avatar> :
                        <Person />
                    }
                </button>
                <DropDownMenu />
            </div>
        </nav >
    );
};

export default NavBar;