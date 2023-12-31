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
import Label from '../../components/label/label';

const schema = yup.object({
  email:yup.string().email().required(), 
})

// ----------------------------------------------------------------------

export default function ForgetPasswordView() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

    const onSubmit = (data) => {
    
  }
  const renderForm = (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
      <TextField label="Email address" {...register("email")}/>
        {errors.email?.message ? <Label color={'error'}>{errors.email?.message}</Label> : ""}
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
          Forget Password
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
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Lost your password? Please enter your email address. You will
            receive a link to create a new password via email.
          </Typography>

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
