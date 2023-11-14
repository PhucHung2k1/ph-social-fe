import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { ErrorMessage } from '@hookform/error-message';
import { Check, Error } from '@mui/icons-material';
import {
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import { debounce } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useDebounce } from 'usehooks-ts';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Face5OutlinedIcon from '@mui/icons-material/Face5Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import {
  sxCheckBox,
  sxTextField,
  sxTextFieldError,
} from '@/utils/helper/style';
import { registerAPI } from '@/store/auth/authAction';
import { IRegister } from '@/services/auth.service';
import { showLoading } from '@/store/loading/loadingSlice';

interface IFormInput {
  fullname: string;
  username: string;
  email: number | string;
  password: string;
  confirmPassword: string;
  inviteToken: string;
  cfpassword: string;
}

const SignUpForm = () => {
  const [isagreePolicy, setIsAgreePolicy] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  const [showCfPassword, setShowCfPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCfPassword = () => {
    setShowCfPassword(!showCfPassword);
  };
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInput>();

  const onSubmit = async (values: IFormInput) => {
    dispatch(showLoading(true));
    const body: IRegister = {
      fullname: values.fullname,
      username: values.username,
      email: values.email,
      password: values.password,
    };
    dispatch(registerAPI(body))
      .then((res) => {
        if (res?.payload?.status === 200) {
          router.push('/login');
        }
      })
      .finally(() => dispatch(showLoading(false)));
  };

  // const validateEmail = debounce(async (emailValue: string) => {}, 800);
  const validateUsername = (value: any) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    return regex.test(value) || 'UserName Invalid !';
  };

  const validatePassword = (value: any) => {
    const password = watch('password');
    return value === password || 'Passwords do not match';
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className=" px-[32px]">
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={[sxTextField]}
                label="Full Name"
                type="text"
                error={Boolean(errors.fullname)}
                {...register('fullname', {
                  required: 'Enter Your Full Name!',
                })}
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Face5OutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage
                errors={errors}
                name="fullname"
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
          <Grid xs={6} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={[sxTextField, sxTextFieldError]}
                label="User Name"
                type="text"
                error={Boolean(errors.username)}
                {...register('username', {
                  required: 'Enter Your UserName!',
                  validate: validateUsername,
                })}
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PeopleAltOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage
                errors={errors}
                name="username"
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
                label="Email Address"
                type="email"
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
                sx={[sxTextField, sxTextFieldError]}
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
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
          <Grid xs={12} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={[sxTextField, sxTextFieldError]}
                label="Confirm Password"
                type={showCfPassword ? 'text' : 'password'}
                error={Boolean(errors.cfpassword)}
                {...register('cfpassword', {
                  required: 'Enter Your Confirm Password!',
                  minLength: {
                    value: 9,
                    message: 'Password must be more than 8 characters!',
                  },
                  validate: validatePassword,
                })}
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleCfPassword}>
                        {showCfPassword ? <VisibilityOff /> : <Visibility />}
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
                name="cfpassword"
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
          <Grid xs={12} item className="flex items-center !pl-2">
            <FormControl className="">
              <Checkbox
                sx={sxCheckBox}
                checked={isagreePolicy}
                onChange={(_, v) => {
                  setIsAgreePolicy(v);
                }}
              />

              <ErrorMessage
                errors={errors}
                name="confirmPassword"
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

            <div className=" flex">
              <p className=" font-medium">
                I agree to the{' '}
                <span className="text-[#00BDD6] font-medium">
                  Privacy Policy{' '}
                </span>
                and{' '}
                <span className="text-[#00BDD6] font-medium">Terms of Use</span>
              </p>
            </div>
          </Grid>
          <Grid xs={12} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <Button
                variant="contained"
                className="!mt-3 h-12 w-full rounded-lg bg-mango-primary-blue !font-semibold !text-white "
                type="submit"
                sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
              >
                SIGN UP
              </Button>
            </FormControl>
          </Grid>
          <Grid xs={12} item>
            <div className="mb-[50px] flex cursor-pointer flex-row items-center justify-center gap-1">
              <div>Had an account?</div>
              <Link href="/login">
                <div className="font-bold text-mango-primary-blue">Login</div>
              </Link>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default React.memo(SignUpForm);
