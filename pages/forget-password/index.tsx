import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  debounce,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store/hook';
import { Check, Error } from '@mui/icons-material';
import { ErrorMessage } from '@hookform/error-message';
import SendIcon from '@mui/icons-material/Send';
import { sxTextField, sxTextFieldError } from '@/utils/helper/style';
import { emailRegex } from '@/utils/helper/regex';
import GetYourPasswordSucess from '@/components/Authentication/GetYourPasswordSucess';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import {
  checkExistEmailForgotPassword,
  forgotPassword,
} from '@/store/auth/authAction';
import { showLoading } from '@/store/loading/loadingSlice';
import dynamic from 'next/dynamic';
const LayoutAuthen = dynamic(() => import('@/components/layouts/LayoutAuth'), {
  ssr: false,
});
const ForgotPassword = () => {
  const {
    register,
    formState: { errors },

    handleSubmit,
    setError,
    trigger,
    clearErrors,
  } = useForm();

  const [showSucess, setShowSuccess] = useState<boolean>(false);

  const [emailState, setEmailState] = useState({
    emailName: '',
    emailStatus: 'idle', // existed , available
  });
  const dispatch = useAppDispatch();

  const validateEmail = debounce(async (emailValue: string) => {
    if (emailRegex.test(emailValue)) {
      setEmailState((pre) => ({ ...pre, emailName: emailValue }));
      dispatch(showLoading(true));
      dispatch(
        checkExistEmailForgotPassword({
          email: emailValue,
        })
      )
        .then((res) => {
          if (!res.payload) {
            setEmailState((pre) => ({ ...pre, emailStatus: 'existed' }));
            setError('email', {
              type: 'manual',
              message: 'Email does not exists',
            });
          } else {
            setEmailState((pre) => ({ ...pre, emailStatus: 'available' }));
            clearErrors('email');
          }
        })
        .finally(() => dispatch(showLoading(false)));
    } else {
      setEmailState({ emailStatus: 'idle', emailName: '' });
      setError('email', {
        type: 'manual',
        message: 'Invalid email address',
      });
    }
  }, 1000);

  const handleEmailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await trigger('email');
    try {
      await validateEmail(event.target.value);
    } catch (error) {
      setError('email', { type: 'manual', message: 'errorMessage' });
    }
  };

  const handleForgotPassword = (values: any) => {
    dispatch(showLoading(true));
    dispatch(
      forgotPassword({
        email: values.email,
      })
    )
      .then((res: any) => {
        if (!res.error) {
          setShowSuccess(true);
        }
      })
      .finally(() => dispatch(showLoading(false)));
  };
  return (
    <LayoutAuthen>
      <main className="flex  items-center justify-center border border-gray-400 shadow-sm rounded-lg p-4">
        {!showSucess ? (
          <div className="flex min-h-[30%] w-[568px] flex-col items-center justify-between gap-2 rounded-2xl bg-white p-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-text-title ">
                Get your password
              </div>
              <div className="text-sm text-text-secondary">
                Enter your email address to receive a password reset email.
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              className="mt-8 w-full"
              noValidate
            >
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={[sxTextField, sxTextFieldError]}
                      label="Email Address"
                      type="email"
                      required
                      error={Boolean(errors.email)}
                      {...register('email', {
                        required: 'Enter Your Email!',
                      })}
                      onChange={handleEmailChange}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      InputProps={{
                        endAdornment:
                          emailState.emailStatus === 'available' ? (
                            <Check className=" bg-transparent text-green-700" />
                          ) : emailState.emailStatus === 'existed' ? (
                            <Error className=" text-red-500" />
                          ) : emailState.emailName ? (
                            <CircularProgress size="1.2rem" />
                          ) : (
                            <></>
                          ),
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
                    className="w-full text-sm font-normal !text-mango-text-black-1"
                  >
                    <Button
                      variant="contained"
                      className="!mt-3 h-12 w-full rounded-lg bg-mango-primary-blue !font-semibold !text-white "
                      type="submit"
                      sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
                      disabled={!!errors.email}
                    >
                      SEND{' '}
                      <SendIcon fontSize="small" style={{ marginLeft: 5 }} />
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </div>
        ) : (
          <GetYourPasswordSucess />
        )}
      </main>
    </LayoutAuthen>
  );
};
export default ForgotPassword;
