import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { sxTextField } from '@/utils/helper/style';
import { ErrorMessage } from '@hookform/error-message';

interface CustomInputProps {
  label: string;
  id: string;
  type?: string;

  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  requiredText?: string;
  required: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  id,
  register,
  errors,
  type = 'text',
  requiredText = '',
  required,
}) => {
  return (
    <FormControl
      fullWidth
      className="text-sm font-normal !text-mango-text-black-1"
    >
      <TextField
        sx={sxTextField}
        label={label}
        type={type}
        error={Boolean(errors[id])}
        {...register(id, {
          required: requiredText,
        })}
        className="!rounded-sm border border-mango-text-gray-1 !outline-none"
      />
      <ErrorMessage
        errors={errors}
        name="username"
        render={({ message }: any) => (
          <div className="ml-2 mt-1 text-sm text-text-error" role="alert">
            <span className="font-medium">{message}</span>
          </div>
        )}
      />
    </FormControl>
  );
};

export default CustomInput;
