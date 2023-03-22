import LoadingButton from "@/components/LoadingButton";
import { authUser } from "@/features/accounts/slices/userSlice";
import ZenApi from "@/services/trader";
import theme from "@/theme";
import { Box, Button, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Formik } from "formik";
import React from "react";
import "react-phone-input-material-ui/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import FromikVerifyOtpField from "../inputs/FromikVerifyOtpField";

const OtpVerifyForm = ({
  label,
  phone,
  reason = "signup",
  onSuccess,
  onBack,
}) => {
  const errors = useSelector((s) => s.user.authError);
  const dispatch = useDispatch();

  const initalValues = {
    code: "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().label("Code").required(),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      if (reason === "login") {
        dispatch(
          authUser({
            code: values.code,
            phone: phone,
          })
        );
        console.log("login");
      } else {
        console.log("ssignup");

        const res = await ZenApi.Otp.verify(values.code, phone, reason);
        onSuccess(res.data);
      }
    } catch (e) {
      console.error(e);
      setErrors(e.response.data);
    }
  };

  return (
    <Formik
      initialValues={initalValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialErrors={errors}
      enableReinitialize
    >
      {({ handleSubmit, isSubmitting, values, setErrors }) => (
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid xs={12} item>
              <Box mb={2}>
                <Alert severity="success">
                  An OTP has been sent to your <b>WhatsApp</b> app on{" "}
                  <b>{phone}</b>. <br />
                  Please enter the OTP below to continue.
                </Alert>
              </Box>

              <FromikVerifyOtpField
                name="code"
                label="Code"
                phone={phone}
                onError={(e) => {
                  setErrors(e.response.data);
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: theme.spacing(2) }}>
              <LoadingButton
                color="primary"
                variant="contained"
                fullWidth
                isLoading={isSubmitting}
                btnText={"Verify OTP"}
                loadingText={"Verifying OTP"}
                onClick={handleSubmit}
                type="submit"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: theme.spacing(1),
              }}
            >
              <Button variant="text" size="small" onClick={onBack && onBack}>
                Change Number
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default OtpVerifyForm;
