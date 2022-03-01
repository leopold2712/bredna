import React, { useEffect, useState } from 'react';
import { Form, Button, FormLayout, InlineError, TextField, Link } from '@shopify/polaris';
import { useFormik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import type { RootState } from '../../../../main/store/rootReducer';
import { loginAnalyticsService } from '../../services';
import { loginAsync } from '../../store/actions';
import { loginSchema } from '../../constants/validationSchemas';

import { PageTemplate, FormTemplate, FormTitle, FormMobileImage } from '../../components';
import { LoginFooter } from './components/Footer';

import imageDecoration from '../../../../assets/images/signup/image_decoration_login.jpg';

import styles from './styles.module.scss';

const { GALoginTriggers, loginAnalyticsLog, loginErrorLog } = loginAnalyticsService;
type PossibleLoginErrors = loginAnalyticsService.PossibleLoginErrors;

export const Login = (): JSX.Element => {
  const { loading } = useAppSelector((state: RootState) => state.auth);

  const [error, setError] = useState('');

  const dispatch = useAppDispatch();

  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(
          loginAsync({ email: values.email, password: values.password }),
        );
        unwrapResult(response);
      } catch (apiError) {
        setError(apiError !== undefined ? (apiError as string) : 'Unavailable For Legal Reasons');
      }
    },
  });

  const handleChange = (value: string, id: string) => {
    if (error) setError('');
    formik.handleChange({ target: { id, value } });
  };

  useEffect(() => {
    if (formik.isSubmitting) {
      loginErrorLog(formik.errors as PossibleLoginErrors);
    }
  }, [formik.errors]);

  const submitForm = () => {
    formik.handleSubmit();
    loginAnalyticsLog(GALoginTriggers.LOGIN_CTA)();
  };

  return (
    <PageTemplate>
      <FormTemplate image={imageDecoration}>
        <FormTitle>Log In</FormTitle>
        <div className={styles.link}>
          <Link
            url="/forgot-password"
            removeUnderline
            onClick={loginAnalyticsLog(GALoginTriggers.LOGIN_FORGOT_PASSWORD)}
          >
            Forgot password?
          </Link>
        </div>
        <Form onSubmit={submitForm}>
          <FormLayout>
            <div className="fs-mask">
              <TextField
                value={formik.values.email}
                type="email"
                id="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
                onFocus={loginAnalyticsLog(GALoginTriggers.LOGIN_EMAIL_INPUT)}
                label="email"
                labelHidden
                error={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="fs-mask">
              <TextField
                value={formik.values.password}
                type="password"
                id="password"
                placeholder="Insert your password"
                onChange={handleChange}
                onFocus={loginAnalyticsLog(GALoginTriggers.LOGIN_PASSWORD_INPUT)}
                label="password"
                labelHidden
                error={formik.touched.password && formik.errors.password}
              />
            </div>
            {error.length > 0 && <InlineError message={error} fieldID="password" />}
          </FormLayout>

          <FormMobileImage src={imageDecoration} />

          <div className={styles.button}>
            <Button primary submit loading={loading}>
              Enter Your Therapist Profile
            </Button>
          </div>
          <LoginFooter />
        </Form>
      </FormTemplate>
    </PageTemplate>
  );
};
