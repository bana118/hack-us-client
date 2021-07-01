import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { themeColor } from "../utils/style-variables";
import { useForm, Controller } from "react-hook-form";
import Router from "next/dist/client/router";

type InputsType = {
  query: string;
};

export const SearchInput = (): JSX.Element => {
  const { control, handleSubmit } = useForm<InputsType>();
  const searchProject = (data: InputsType) => {
    Router.push(`/search/${data["query"]}`);
  };
  return (
    <div
      css={{
        color: "white",
        backgroundColor: themeColor,
        textAlign: "center",
        paddingBottom: "5px",
      }}
    >
      <form onSubmit={handleSubmit(searchProject)}>
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <TextField
              placeholder="Search Project"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
        />
      </form>
    </div>
  );
};
