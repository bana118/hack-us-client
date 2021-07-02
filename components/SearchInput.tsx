import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useForm, Controller } from "react-hook-form";

type InputsType = {
  query: string;
};

export const SearchInput = (): JSX.Element => {
  const { control, handleSubmit } = useForm<InputsType>();
  const searchProject = (data: InputsType) => {
    if (data["query"] != null) {
      location.href = `/search/${data["query"]}`;
    }
  };
  return (
    <div
      css={{
        color: "white",
        textAlign: "center",
        paddingBottom: "5px",
        marginRight: "30px",
      }}
    >
      <form onSubmit={handleSubmit(searchProject)}>
        <Controller
          name="query"
          control={control}
          defaultValue={""}
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
