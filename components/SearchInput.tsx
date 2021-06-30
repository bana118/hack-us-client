import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { themeColor } from "../utils/style-variables";

export const SearchInput = (): JSX.Element => {
  return (
    <div
      css={{
        color: "white",
        backgroundColor: themeColor,
        textAlign: "center",
        paddingBottom: "5px",
      }}
    >
      <TextField
        placeholder="Search Project"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
