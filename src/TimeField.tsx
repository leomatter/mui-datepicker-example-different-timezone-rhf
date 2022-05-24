import * as React from "react";
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { Controller, useFormContext, ControllerProps } from "react-hook-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import LocalizationProvider from "@mui/lab/LocalizationProvider";

interface TimeFieldProps
  extends Pick<ControllerProps, "rules">,
    Omit<
      TimePickerProps,
      "label" | "value" | "minutesStep" | "ampm" | "onChange" | "renderInput"
    > {
  fieldName: string;
  label: string;
}
export default function TimeField({
  fieldName,
  label,
  rules,
  ...props
}: TimeFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        control={control}
        name={`${fieldName}`}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TimePicker
            label={label}
            value={value}
            minutesStep={5}
            ampm={false}
            onChange={(date: Date | null) => {
              onChange(date);
            }}
            {...props}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ mt: 2 }}
                error={errors && !!errors[`${fieldName}`]}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}
