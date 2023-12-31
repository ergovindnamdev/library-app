import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '../../routes/hooks';
import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 
import Label from "../../components/label/label";
import { Tooltip } from "@mui/material";


const schema = yup.object({
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/,
      "Must Contain Min 8 & Max 32 Characters."
    ),
    cpassword: yup.string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords do not match")
});

// ----------------------------------------------------------------------

export default function ResetPasswordView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    router.push('/')
  };

  const renderForm = (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

      <Stack spacing={3}>
        <Box sx={{display:"flex"}}>
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
                        icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password")}
            />
            <Tooltip sx={{"&:hover": {backgroundColor: "transparent"}}}  title="Must Contain Min 8 & Max 32 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character">
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
            <TextField
              label="Confirm Password"
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
                        icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("cpassword")}
            />
            {errors.cpassword?.message ? (
              <Label color={"error"}>{errors.cpassword?.message}</Label>
            ) : (
              ""
            )}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Button 
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
        >
          Save Password
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
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
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
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
