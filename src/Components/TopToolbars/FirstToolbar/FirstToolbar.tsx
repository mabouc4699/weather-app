import SearchIcon from "@mui/icons-material/Search";
import { 
    Toolbar, 
    Typography, 
    Button, 
    Select, 
    MenuItem, 
    InputLabel, 
    FormControl 
} from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "StyledComponents/Style";
import { Units } from 'Types/types';
import { returnUnitTemperature } from "Utils/dataFunctions";

require("../Header.css");


const FirstToolbar = ({ handleState, handler }: any) => {
    return (
        <Toolbar sx={{ backgroundColor: "#FF7F50" }}>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                Weather
                </Typography>

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Units</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="unit"
                    value={Units.imperial}
                >
                    <MenuItem value={Units.imperial}>{`US | °${returnUnitTemperature(Units.imperial)}`}</MenuItem>
                    <MenuItem value={Units.metric}>{`UK | °${returnUnitTemperature(Units.metric)}`}</MenuItem>
                    <MenuItem value={Units.standard }>{`STND | °${returnUnitTemperature(Units.standard)}`}</MenuItem>
                </Select>
                </FormControl>

                <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>

                <StyledInputBase placeholder="Search… zip" inputProps={{ "aria-label": "search" }} onChange={(e) => handler(e)} />
                </Search>

                <Button variant="outlined" onClick={(e) => handleState(e)}>
                GO
                </Button>
        </Toolbar>
    )
}

export default FirstToolbar;