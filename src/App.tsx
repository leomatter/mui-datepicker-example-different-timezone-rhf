import { FormControl, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { format } from "date-fns-tz";
import getTimezoneOffset from "date-fns-tz/getTimezoneOffset";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProTip from "./ProTip";
import TimeField from "./TimeField";
import TimeFieldTz from "./TimeFieldTz";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export interface IFormData {
  _id: string;
  time1: Date;
  time2: number;
  time3: Date;
}

export default function App() {
  const d = new Date();

  const methods = useForm<IFormData>({
    defaultValues: {
      time1: d,
      time2: d.getTime(),
    },
  });

  const onSubmit2 = async (data: IFormData) => {
    console.log(data);
  };
  const time1 = methods.watch("time1");
  const time2 = methods.watch("time2");
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit time in another timezone
        </Typography>

        <form onSubmit={methods.handleSubmit(onSubmit2)}>
          <FormProvider {...methods}>
            <FormControl fullWidth>
              <Stack direction="column">
                <Typography>
                  The normal case first, you want edit a date in your timezone
                </Typography>

                <TimeField fieldName={"time1"} label={"local time"} />

                <Typography>
                  This will save the UTC time {time1.toISOString()} to the
                  database. {format(time1, "yyyy-MM-dd HH:mm:ss zzz")}
                </Typography>
                <Typography sx={{ mt: 3 }}>
                  But now, let's say you want to edit an opening time for a
                  physical shop in Europe/Zurich, but the browser being located
                  in some other timezone (maybe on holidays). IMO, you want to
                  be able to edit the time in Europe/Zurich timezone.
                </Typography>
                <TimeFieldTz
                  fieldName={"time2"}
                  label={"Time in Europe/Zurich"}
                  timeZone={"Europe/Zurich"}
                />

                <Typography>
                  one should still save the utc date{" "}
                  {new Date(time2).toISOString()} or {new Date(time2).getTime()}
                </Typography>
                <Typography>
                  note the date is thill in the local timezone{" "}
                  {format(time2, "yyyy-MM-dd HH:mm:ss zzz")} there is not really
                  a way to change that, be careful handling it
                </Typography>
              </Stack>
            </FormControl>
          </FormProvider>
        </form>

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

export const getTimeTz = (dt: Date, timeZone: string) => {
  return (
    dt.getTime() -
    getTimezoneOffset(timeZone, dt) -
    dt.getTimezoneOffset() * 60 * 1000
  );
};

export const getDateTz = (utcTime: number, timeZone: string) => {
  return new Date(
    utcTime +
      getTimezoneOffset(timeZone, utcTime) +
      new Date(utcTime).getTimezoneOffset() * 60 * 1000
  );
};
