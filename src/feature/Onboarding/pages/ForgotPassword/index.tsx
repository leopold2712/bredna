import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Frame, InlineError, Link, TextField, Toast } from '@shopify/polaris';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../../../../main/store/hooks';

import { sendRecoverPassword } from '../../store/actions';
import { forgotAnalyticsLog, GAForgotPasswordTriggers } from '../../services/forgot.analytics';
import { forgotPasswordSchema } from '../../constants/validationSchemas';
import type { RootState } from '../../../../main/store/rootReducer';

import { PageTemplate, FormTemplate, FormTitle, FormHint, FormMobileImage } from '../../components';

import imageDecorationForgot from '../../../../assets/images/forgot/image_decoration_forgot.jpg';
import imageMobileDecorationForgot from '../../../../assets/images/forgot/image_mobile_decoration_forgot.jpg';

import styles from './styles.module.scss';

export const ForgotPassword = (): JSX.Element => {
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { loading } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const formik = useFormik<{ email: string }>({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        const response = await dispatch(sendRecoverPassword(values.email));
        unwrapResult(response);
        setShowToast(true);
        formikHelpers.resetForm();
      } catch (apiError) {
        setError(apiError !== undefined ? (apiError as string) : 'Unavailable For Legal Reasons');
      }
    },
  });

  const closeToast = () => setShowToast(false);

  const handleChange = (value: string, id: string) => {
    if (error) setError('');
    formik.handleChange({ target: { id, value } });
  };

  const submitForm = () => {
    formik.handleSubmit();
    forgotAnalyticsLog(GAForgotPasswordTriggers.FORGOT_PASSWORD_CTA)();
  };

  useEffect(() => {
    if (formik.isSubmitting) forgotAnalyticsLog(GAForgotPasswordTriggers.FORGOT_PASSWORD_ERROR)();
  }, [formik.errors]);

  return (
    <Frame>
      <PageTemplate>
        <FormTemplate image={imageDecorationForgot}>
          <Form onSubmit={submitForm}>
            <FormTitle>Forgot Your Password?</FormTitle>
            <FormHint>Enter your email address to recover your password</FormHint>

            <div className="fs-mask">
              <TextField
                type="email"
                id="email"
                label="email"
                labelHidden
                value={formik.values.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                onFocus={forgotAnalyticsLog(GAForgotPasswordTriggers.FORGOT_PASSWORD_INPUT)}
                error={formik.touched.email && formik.errors.email}
              />
            </div>

            {error.length > 0 && <InlineError message={error} fieldID="email" />}

            <div className={styles.link}>
              <Link
                url="/login"
                onClick={forgotAnalyticsLog(GAForgotPasswordTriggers.FORGOT_PASSWORD_RETURN)}
                removeUnderline
              >
                Return to login
              </Link>
            </div>

            <FormMobileImage src={imageMobileDecorationForgot} />

            <div className={styles.button}>
              <Button primary submit loading={loading}>
                Recover password
              </Button>
            </div>
          </Form>
        </FormTemplate>
      </PageTemplate>

      {showToast && <Toast content="Message sent" onDismiss={closeToast} />}
    </Frame>
  );
};
