import { ISignInForm } from '@/services/auth.interface';
import { login } from '@/store/auth/authAction';
import { useAppDispatch } from '@/store/hook';
import { showLoading } from '@/store/loading/loadingSlice';
import { sxTextField } from '@/utils/helper/style';
import { ErrorMessage } from '@hookform/error-message';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControl, Grid, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInForm>();

  const handleSignIn = (values: ISignInForm) => {
    dispatch(showLoading(true));
    const body = {
      email: values.email,
      password: values.password,
    };
    dispatch(login(body))
      .then((res: any) => {
        if (!res) {
          router.push('/');
        }
      })

      .finally(() => {
        dispatch(showLoading(false));
      });
  };

  return (
    <div>
      <div className="w-full">
        <form
          className="px-[32px] w-full"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <TextField
                  sx={sxTextField}
                  label="Email Address or UserName"
                  type="text"
                  error={Boolean(errors.email)}
                  {...register('email', {
                    required: 'Enter Your Email Address!',
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }: any) => (
                    <div
                      className="ml-2 mt-1 text-sm text-text-error"
                      role="alert"
                    >
                      <span className="font-medium">{message}</span>
                    </div>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <TextField
                  sx={sxTextField}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors.password)}
                  {...register('password', {
                    required: 'Enter Your Password!',
                    minLength: {
                      value: 9,
                      message: 'Password must be more than 8 characters!',
                    },
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }: any) => (
                    <div
                      className="ml-2 mt-1 text-sm text-text-error"
                      role="alert"
                    >
                      <span className="font-medium">{message}</span>
                    </div>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <div className="mt-[10px] flex w-full items-center justify-between">
            <div></div>
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  sx={sxCheckBox}
                  onChange={(_, v) => {
                    setRememberMe(v);
                  }}
                />
              }
              label="Remember me"
            /> */}
            <Link
              href="/forget-password"
              className="cursor-pointer font-medium hover:!border-0"
            >
              Forget Password?
            </Link>
          </div>

          <Button
            variant="contained"
            className="!mt-[23px] h-[48px] w-full rounded-lg bg-mango-primary-blue !font-semibold !text-white "
            type="submit"
            sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
          >
            LOGIN
          </Button>
          <div className="mb-[120px] mt-[20px] flex cursor-pointer  items-center justify-center">
            <div>Dont have an account?&ensp; </div>
            <Link href="/register">
              <div className="font-bold text-mango-primary-blue">
                Create new account
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(LoginForm);
