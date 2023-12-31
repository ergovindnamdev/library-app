import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "../../../components/label/label";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../../services/user";
import { useState } from "react";
import Iconify from "../../../components/iconify";

const schema = yup.object({
  username: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/,
      "Must Contain Min 8 & Max 32 Characters."
    ),
  contact: yup
    .string()
    .required()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
});
export default function AddUser({onUserListRefresh}) {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = React.useState("user");

  const handleChange = (event) => {
    setUserRole(event.target.value);
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    data.role = userRole;

    await userSignup(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User Added Successfully");
          setOpen(false);
          onUserListRefresh();
          setTimeout(() => {
            navigate("/users-list");
          }, 5000);
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
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add User
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth="true"
          maxWidth="sm"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
              <Card
                sx={{
                  p: 5,
                  width: 1,
                }}
              >
                <Stack sx={{ my: 3 }}>
                  <TextField
                    autoFocus
                    id="username"
                    label="User Name"
                    type="text"
                    variant="outlined"
                    {...register("username")}
                  />

                  {errors.username?.message ? (
                    <Label color={"error"}>{errors.username?.message}</Label>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack sx={{ my: 3 }}>
                  <TextField
                    autoFocus
                    id="name"
                    label="name"
                    type="text"
                    variant="outlined"
                    {...register("name")}
                  />

                  {errors.name?.message ? (
                    <Label color={"error"}>{errors.name?.message}</Label>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack sx={{ my: 3 }}>
                  <TextField
                    autoFocus
                    id="email"
                    label="email"
                    type="text"
                    variant="outlined"
                    {...register("email")}
                  />

                  {errors.email?.message ? (
                    <Label color={"error"}>{errors.email?.message}</Label>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack sx={{ my: 3 }}>
                  <TextField
                    autoFocus
                    id="contact"
                    label="contact"
                    type="text"
                    variant="outlined"
                    {...register("contact")}
                  />

                  {errors.contact?.message ? (
                    <Label color={"error"}>{errors.contact?.message}</Label>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack sx={{ my: 3 }}>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
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
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                      title="Must Contain Min 8 & Max 32 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                    >
                      <IconButton>
                        <Iconify icon={"ic:outline-help"} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {errors.password?.message ? (
                    <Label color={"error"}>{errors.password?.message}</Label>
                  ) : (
                    ""
                  )}
                </Stack>
                <Stack sx={{ my: 3 }}>
                  {/* <FormControl>
                    <InputLabel id="user-Role-label">Role</InputLabel>

                    <Select
                      labelId="user-Role-label"
                      id="user-Role-label"
                      value={role}
                      label="Role"
                      onChange={handleRoleChange}
                      {...register("Role")}
                    >
                      <MenuItem value={""}>Select Role</MenuItem>
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"user"}>User</MenuItem>
                    </Select>

                    {errors.role?.message ? (
                      <Label color={"error"}>{errors.role?.message}</Label>
                    ) : (
                      ""
                    )}
                  </FormControl> */}
                </Stack>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="user-role-select-label">Role</InputLabel>
                    <Select
                      labelId="user-role-select-label"
                      id="user-role-select"
                      value={userRole}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"user"}>User</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Card>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="Submit">Save</Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </>
  );
}
