import * as React from "react";
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { Controller, useFormContext, ControllerProps } from "react-hook-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import LocalizationProvider from "@mui/lab/LocalizationProvider";

interface TimeFieldProps
  extends Pick<ControllerProps, "rules">,
    Omit<
      TimePickerProps,
      "label" | "value" | "minutesStep" | "ampm" | "onChange" | "renderInput"
    > {
  fieldName: string;
  label: string;
  timeZone: string;
}
export default function TimeFieldTz({
  fieldName,
  label,
  rules,
  timeZone,
  ...props
}: TimeFieldProps) {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  const [date1, setDate] = React.useState(
    utcToZonedTime(getValues(fieldName), timeZone) as Date
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        control={control}
        name={`${fieldName}`}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TimePicker
            label={label}
            value={date1}
            minutesStep={5}
            ampm={false}
            onChange={(date: unknown) => {
              setDate(date as Date);
              if (date)
                onChange(zonedTimeToUtc(date as Date, timeZone).getTime());
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
