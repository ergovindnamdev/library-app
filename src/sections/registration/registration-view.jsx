import { useState } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "../../routes/hooks";
import { bgGradient } from "../../theme/css";

import Logo from "../../components/logo";
import Iconify from "../../components/iconify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "../../components/label/label";
import { Tooltip } from "@mui/material";
import { userSignup } from "../../services/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

// ----------------------------------------------------------------------

export default function RegistrationView() {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    
    data.role = "user";

    await userSignup(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Register Successfully");
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          toast.error(res.resdata.response.data.message);
        }
      })
      .catch((err) => {
        toast.error(`Error in code ${err}`);
      });
  };

  const renderForm = (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField label="Name" {...register("name")} />
          {errors.name?.message ? (
            <Label color={"error"}>{errors.name?.message}</Label>
          ) : (
            ""
          )}

          <TextField label="User Name" {...register("username")} />
          {errors.username?.message ? (
            <Label color={"error"}>{errors.username?.message}</Label>
          ) : (
            ""
          )}

          <TextField
            name="role"
            value="user"
            type="hidden"

            sx={{display:"none"}}
          />

          <TextField label="Email address" {...register("email")} />
          {errors.email?.message ? (
            <Label color={"error"}>{errors.email?.message}</Label>
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
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
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

          <TextField label="Contact" {...register("contact")} />
          {errors.contact?.message ? (
            <Label color={"error"}>{errors.contact?.message}</Label>
          ) : (
            ""
          )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ my: 3 }}
        >
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
          >
            Signup
          </Button>
        </Stack>
      </form>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign UP to LMS</Typography>

          {renderForm}

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Login from here ...
            <Link href="/" variant="subtitle2" sx={{ ml: 0.5 }}>
              Login
            </Link>
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
}
