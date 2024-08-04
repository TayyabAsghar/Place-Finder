import { useState } from "react";
import { OutlinedInput } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const navigateToPage = (key: string) => {
        if (key === 'Enter') navigate(`/listing/search?query=${search}`);
        setSearch("");
    };

    return (
        <OutlinedInput className="max-ml:max-w-40 max-ms:max-w-36 min-w-0" onKeyDown={e => navigateToPage(e.key)}
            onInput={e => setSearch((e.target as HTMLInputElement).value)} placeholder="Search..." size="small" title="Search"
            endAdornment={
                <IconButton type="submit" disabled={!search} color="primary"
                    onClick={() => navigate(`/listing/search?query=${search}`)}>
                    <SearchIcon />
                </IconButton>
            }
        />
    );
};

export default SearchBar;