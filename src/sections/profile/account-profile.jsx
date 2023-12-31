import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { LoginContext } from "../../routes/sections";
import LatterAvatar from "../../utils/latter-avatar";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "../../components/label/label";
import { Tooltip } from "@mui/material";
import { userSignup, userUpdate } from "../../services/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Iconify from "../../components/iconify";
import InputAdornment from "@mui/material/InputAdornment";


const schema = yup.object({
  username: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string(),
  contact: yup
    .string()
    .required()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
});
// ----------------------------------------------------------------------

export default function AccountProfile() {
  const { LoginUserDetail } = useContext(LoginContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    id: LoginUserDetail.id,
    name: LoginUserDetail.name,
    username: LoginUserDetail.username,
    email: LoginUserDetail.email,
    conatact: LoginUserDetail.contact,
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const onSubmit = async (data) => {
    let userData = {"name": data.name, "email": data.email, "password": data.password, "username": data.username, "contact": data.contact, "id": data.id};
    await userUpdate(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Update Successfully");
          // setTimeout(() => {
          //   navigate("/");
          // }, 5000);
        } else {
          toast.error(res.resdata.response.data.message);
        }
      })
      .catch((err) => {
        toast.error(`Error in code ${err}`);
      });
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          backgroundColor: "rgba(255, 255, 255)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">Account</Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={3}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <LatterAvatar name={LoginUserDetail.name} />

                      <Typography gutterBottom variant="h5">
                        {LoginUserDetail.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {LoginUserDetail.email}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {LoginUserDetail.contact}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={7} sx={{ marginLeft: "10px" }}>
                <form
                  autoComplete="off"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Card>
                    <CardHeader title="Profile" />
                    <CardContent sx={{ pt: 0 }}>
                      <Box>
                        <Stack spacing={3}>
                          <TextField
                            label="Name"
                            value={values.name}
                            {...register("name")}
                          />
                          {errors.name?.message ? (
                            <Label color={"error"}>
                              {errors.name?.message}
                            </Label>
                          ) : (
                            ""
                          )}
                          <TextField
                            label="User Name"
                            value={values.username}
                            {...register("username")}
                          />
                          {errors.username?.message ? (
                            <Label color={"error"}>
                              {errors.username?.message}
                            </Label>
                          ) : (
                            ""
                          )}
                          <TextField
                            label="Email Address"
                            value={values.email}
                            {...register("email")}
                          />
                          {errors.email?.message ? (
                            <Label color={"error"}>
                              {errors.email?.message}
                            </Label>
                          ) : (
                            ""
                          )}
                          <TextField
                            label="Contact Number"
                            value={values.contact}
                            {...register("contact")}
                          />
                          {errors.contact?.message ? (
                            <Label color={"error"}>
                              {errors.contact?.message}
                            </Label>
                          ) : (
                            ""
                          )}

                          <Box sx={{ display: "flex" }}>
                            <TextField
                              label="Password"
                              type={showPassword ? "text" : "password"}
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                      edge="end"
                                    >
                                      <Iconify
                                        icon={
                                          showPassword
                                            ? "eva:eye-fill"
                                            : "eva:eye-off-fill"
                                        }
                                      />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              {...register("password")}
                            />
                            <Tooltip
                              sx={{
                                "&:hover": { backgroundColor: "transparent" },
                              }}
                              title="Must Contain Min 8 & Max 32 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                            >
                              <IconButton>
                                <Iconify icon={"ic:outline-help"} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          {errors.password?.message ? (
                            <Label color={"error"}>
                              {errors.password?.message}
                            </Label>
                          ) : (
                            ""
                          )}
                        </Stack>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <Button type="submit" variant="contained">
                        Save details
                      </Button>
                    </CardActions>
                  </Card>
                </form>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
