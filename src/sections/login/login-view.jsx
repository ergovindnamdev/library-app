import { createContext, useState } from 'react';
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
import { bgGradient } from '../../theme/css';
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 
import Label from '../../components/label/label';

import {userLogin} from "../../services/user";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'




const schema = yup.object({
  email:yup.string().email().required(), 
  password:yup.string().min(8).max(32).required()
})

// ----------------------------------------------------------------------

export default function LoginView() {

  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

  
  const onSubmit = async(data) => {
    await userLogin(data).then((res) => {
      if(res.status ===200){        
        
        localStorage.setItem('loginToken', res.resdata.accessToken);
        toast.success('Login Successfully');
        setTimeout(() => {
          navigate("/profile");
        }, 5000)
      } else {
        toast.error(res.resdata.response.data.message);
      }
    }).catch((err) => {
      toast.error(`Error in code ${err}`);
    });  
  }

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  
  const renderForm = (
    <>

     <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField label="Email address" {...register("email")}/>
        {errors.email?.message ? <Label color={'error'}>{errors.email?.message}</Label> : ""}
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("password")}
        />
        {errors.password?.message ? <Label color={'error'}>{errors.password?.message}</Label> : ""}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" href="/forget-password" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      <Button 
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"        
      >
        Login
      </Button> 
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
          <Typography variant="h4">Sign in to LMS</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link href='/signup' variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
