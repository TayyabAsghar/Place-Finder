import { SearchProps } from "../lib/types";
import { OutlinedInput } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ search, setSearch }: SearchProps) => {
    const navigate = useNavigate();

    return (
        <form>
            <OutlinedInput onInput={e => setSearch((e.target as HTMLInputElement).value)}
                placeholder="Search..." size="small" title="Search"
                endAdornment={
                    <IconButton type="submit" disabled={!search} color="primary"
                        onClick={() => navigate(`/properties/search/${search}`)}>
                        <SearchIcon />
                    </IconButton>
                }
            />
        </form>
    );
};

export default SearchBar;