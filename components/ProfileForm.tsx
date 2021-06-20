import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Grid } from "@material-ui/core";

type ProfileFormProps = {
  defaultValues?: InputsType;
};

type InputsType = {
  name: string;
  description: string;
};

const schema = yup.object().shape({
  name: yup.string().max(20, "名前は20文字までです").required("名前は必須です"),
  description: yup.string().max(100, "プロフィールは100文字までです"),
});

export const ProfileForm = ({
  defaultValues = { name: "", description: "" },
}: ProfileFormProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({ resolver: yupResolver(schema) });

  const updateProfile = (data: InputsType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(updateProfile)}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Controller
            name="name"
            control={control}
            defaultValue={defaultValues["name"]}
            render={({ field }) => (
              <TextField
                label="名前（ニックネーム）"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="description"
            control={control}
            defaultValue={defaultValues["description"]}
            render={({ field }) => (
              <TextField
                label="自己紹介"
                error={!!errors.description}
                helperText={errors.description?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            更新する
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
