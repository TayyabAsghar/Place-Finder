import { useState } from "react";
import { OutlinedInput } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const onKeyEnter = (key: string) => {
        if (key === 'Enter') navigateToPage();
        setSearch("");
    };

    const navigateToPage = () => {
        if (search.trim()) navigate(`/listing/search?query=${search}`);
    };

    return (
        <OutlinedInput className="max-ml:max-w-48 max-ml:max-h-8 max-ml:!pr-0 max-ml:!text-sm max-ms:max-w-36 min-w-0" onKeyDown={e => onKeyEnter(e.key)}
            onInput={e => setSearch((e.target as HTMLInputElement).value)} placeholder="Search..." size="small" title="Search"
            endAdornment={
                <IconButton type="submit" disabled={!search} color="primary"
                    onClick={navigateToPage}>
                    <SearchIcon />
                </IconButton>
            }
        />
    );
};

export default SearchBar;