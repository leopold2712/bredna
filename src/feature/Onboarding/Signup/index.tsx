/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState, SyntheticEvent } from 'react';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { InlineError } from '@shopify/polaris';
import classNames from 'classnames';

import Congrats from './components/Congrats';
import { clearError, getError } from '../../../shared/store/error';
import { signup } from '../store/actions';
import { isAuthenticated } from '../store';
import { useAppDispatch, useAppSelector } from '../../../main/store/hooks';
import { signupAnalyticsService } from '../services';
import { useCustomWindowWidth } from '../../../shared/hooks/useCustomWindowWidth';

import type { SignupRequestDTO } from '../dtos';

import logoWithText from '../../../assets/images/logo-with-text.svg';
import livePersonLogoWhite from '../../../assets/images/signup/liveperson_logo.svg';
import eyeIcon from '../../../assets/images/signup/eye.svg';
import imageDecorationStep4 from '../../../assets/images/signup/image_decoration_step_4.jpg';
import styles from './signup.module.scss';
import './signup.scss';

type SignupForm = SignupRequestDTO & { confirmPassword: string; termsAccepted: boolean };

const validationSchema = yup.object().shape({
  first_name: yup.string().trim().required('First name is required'),
  last_name: yup.string().trim().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(
      6,
      'Password should contain minimum 6 characters with capitals letters and small letters and number',
    )
    .max(12, 'Your password should include no more than 12 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      'Password should contain minimum 6 characters with capitals letters and small letters and number',
    ),
  confirmPassword: yup
    .string()
    .required('Confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must be identical.'),
  termsAccepted: yup.bool().oneOf([true], 'Field must be checked'),
});

const { GASignupTriggers, signupAnalyticsLog, signupErrorLog } = signupAnalyticsService;
type PossibleSignupErrors = signupAnalyticsService.PossibleSignupErrors;

const Signup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { desktopView } = useCustomWindowWidth();

  const { isAuthenticated: authenticated } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCreatingProfile, setCreatingProfile] = useState(false);

  const controlFormClassNames = (errorText?: string | number, touched?: boolean) =>
    classNames('form_control', 'fs-mask', { error: errorText && touched });

  const toggleShowPassword = () => {
    setShowPassword((value) => !value);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((value) => !value);
  };

  const error = useAppSelector(getError);

  useEffect(
    () => () => {
      dispatch(clearError({ typePrefix: 'signup' }));
    },
    [],
  );

  const successSignup = () => {
    const timeOut = setTimeout(() => {
      dispatch(isAuthenticated(true));
      clearTimeout(timeOut);
    }, 3000);
    localStorage.setItem('isFirstVisit', 'true');
    localStorage.setItem('onboarding-step', '1');
  };

  const formik = useFormik<SignupForm>({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      // in purpose of not breaking logic of sign up, if we won't do this, user will be redirected
      // to unknown page after sign up
      if (sessionStorage.getItem('redirect-url')) sessionStorage.removeItem('redirect-url');

      const { first_name, last_name, email, password } = values;

      const { payload } = await dispatch(
        signup({ dto: { first_name, last_name, email, password } }),
      );

      if (payload && typeof payload === 'string') {
        setCreatingProfile(true);
        signupAnalyticsLog(GASignupTriggers.SIGNUP_SUCCESS)();
        successSignup();
      } else {
        signupAnalyticsLog(GASignupTriggers.SIGNUP_ERROR)();
        setCreatingProfile(false);
      }
    },
  });

  useEffect(() => {
    if (formik.isSubmitting) {
      signupErrorLog(formik.errors as PossibleSignupErrors);
    }
  }, [formik.errors]);

  if (isCreatingProfile) {
    return <Congrats />;
  }

  const handleCheckboxValue = (e: SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) signupAnalyticsLog(GASignupTriggers.SIGNUP_TOU_CHECKED)();
    formik.handleChange({
      target: { id: e.currentTarget.id, value: e.currentTarget.checked },
    });
  };

  const renderFooter = (
    <div className={styles.footer}>
      <div className={`has_account custom_link_wrap text_center ${styles.customLinkWrap}`}>
        <span className={styles.account}>Already have an account? </span>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          className="link"
          to={authenticated ? '#' : '/login'}
          onClick={signupAnalyticsLog(GASignupTriggers.SIGNUP_LOGIN)}
        >
          Log in
        </Link>
      </div>
    </div>
  );

  const renderLivePerson = (
    <footer className={`b_footer sign ${styles.bFooter}`}>
      <div className="container">
        <div className="footer_wrapper">
          {'By '}
          <img className="hey-expert-common-img" src={livePersonLogoWhite} alt="" />
        </div>
      </div>
    </footer>
  );

  const renderCheckbox = (
    <div className={styles.cbWrapper}>
      <div className={styles.cbPlacement}>
        <div className={styles.cbInput}>
          <input
            type="checkbox"
            name="createAccount"
            title="Create Account"
            id="termsAccepted"
            checked={formik.values.termsAccepted}
            onChange={handleCheckboxValue}
          />
          <span className={styles.cbContent}>
            By clicking Create an account you accept&nbsp;
            <Link
              to="terms"
              target="_blank"
              rel="noopener noreferrer"
              onClick={signupAnalyticsLog(GASignupTriggers.SIGNUP_TERMS_OF_USE)}
            >
              Terms&Conditions
            </Link>
          </span>
        </div>
        {formik.errors.termsAccepted && formik.touched.termsAccepted && (
          <div className={styles.cbError}>
            <InlineError message="Please accept the terms and conditions" fieldID="termsAccepted" />
          </div>
        )}
      </div>
    </div>
  );

  const renderMobileCheckbox = (
    <div className={styles.cbWrapper}>
      <div className={styles.cbPlacement}>
        <div className={styles.cbInput}>
          <input
            className={styles.cbControl}
            type="checkbox"
            name="createAccount"
            title="Create Account"
            id="termsAccepted"
            checked={formik.values.termsAccepted}
            onChange={handleCheckboxValue}
          />
          <span className={styles.cbContent}>By clicking Create an account you accept</span>
        </div>
      </div>
      <div className={styles.cbTermsConditions}>
        <Link to="terms" target="_blank" rel="noopener noreferrer">
          <span className={styles.cbContent}>Terms&Conditions</span>
        </Link>
      </div>
      {formik.errors.termsAccepted && formik.touched.termsAccepted && (
        <div className={styles.cbError}>
          <InlineError message="Please accept the terms and conditions" fieldID="termsAccepted" />
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.signupPage}>
      <header className="b_header sign">
        <div className={`logo_wrapper ${styles.logoSignup}`}>
          <div className={`logo ${styles.logo}`}>
            <img src={logoWithText} alt="logo" />
          </div>
        </div>
      </header>
      <main>
        <div className={`b_signin_page_v2 jsHeightContent ${styles.signup}`}>
          <div className="form_block flex">
            <div className={`form_wrapper bg_form ${styles.formWrapper}`}>
              <div style={{ textAlign: 'center' }}>
                <div className="logo_wrapper">
                  <span className={styles.header}>Sign Up</span>
                </div>
                <p className={`b_signin_page_v2__header-text ${styles.headerText}`}>
                  Sign up for free and boost your business rapidly
                </p>
              </div>
              <div className="step_form">
                <div className="password_form">
                  <form className={styles.passwordForm} onSubmit={formik.handleSubmit}>
                    <div className="row_wrapper">
                      <div className="form_row">
                        <div className={`input_label ${styles.inputLabel}`}>First Name</div>
                        <input
                          id="first_name"
                          className={controlFormClassNames(
                            formik.errors.first_name,
                            formik.touched.first_name,
                          )}
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.first_name}
                          onFocus={signupAnalyticsLog(GASignupTriggers.SIGNUP_FIRST_NAME_INPUT)}
                        />

                        {formik.errors.first_name && formik.touched.first_name && (
                          <div className="error_message">{formik.errors.first_name}</div>
                        )}
                      </div>
                      <div className="form_row">
                        <div className={`input_label ${styles.inputLabel}`}>Last Name</div>
                        <input
                          id="last_name"
                          className={controlFormClassNames(
                            formik.errors.last_name,
                            formik.touched.last_name,
                          )}
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.last_name}
                          onFocus={signupAnalyticsLog(GASignupTriggers.SIGNUP_LAST_NAME_INPUT)}
                        />

                        {formik.errors.last_name && formik.touched.last_name && (
                          <div className="error_message">{formik.errors.last_name}</div>
                        )}
                      </div>
                      <div className="form_row">
                        <div className={`input_label ${styles.inputLabel}`}>Email</div>
                        <input
                          id="email"
                          className={controlFormClassNames(
                            formik.errors.email,
                            formik.touched.email,
                          )}
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onFocus={signupAnalyticsLog(GASignupTriggers.SIGNUP_EMAIL_INPUT)}
                        />

                        {formik.errors.email && formik.touched.email && (
                          <div className="error_message">{formik.errors.email}</div>
                        )}
                      </div>
                      <div className="form_row">
                        <div className={`input_label ${styles.inputLabel}`}>Password</div>
                        <div className="password-input-container">
                          <img
                            className="password-input-icon"
                            src={eyeIcon}
                            alt=""
                            onClick={toggleShowPassword}
                          />
                          <input
                            data-lpignore="true"
                            id="password"
                            className={controlFormClassNames(
                              formik.errors.password,
                              formik.touched.password,
                            )}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onFocus={signupAnalyticsLog(GASignupTriggers.SIGNUP_PASSWORD_INPUT)}
                          />
                        </div>

                        {formik.errors.password && formik.touched.password ? (
                          <div className="error_message">{formik.errors.password}</div>
                        ) : (
                          <p className={styles.passwordMemo}>
                            *Password should include a capital letter, lowercase letters and numbers
                          </p>
                        )}
                      </div>
                      <div className={`form_row ${styles.confirmPassword}`}>
                        <div className={`input_label ${styles.inputLabel}`}>Confirm Password</div>
                        <div className="password-input-container">
                          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                          <img
                            className="password-input-icon"
                            src={eyeIcon}
                            alt=""
                            onClick={toggleShowConfirmPassword}
                          />
                          <input
                            data-lpignore="true"
                            id="confirmPassword"
                            className={controlFormClassNames(
                              formik.errors.confirmPassword,
                              formik.touched.confirmPassword,
                            )}
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                          />
                        </div>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                          <div className="error_message">{formik.errors.confirmPassword}</div>
                        )}
                        {error.signup && <div className="error_message">{error.signup}</div>}
                      </div>
                    </div>

                    {desktopView ? renderCheckbox : renderMobileCheckbox}

                    <div className={styles.btnWrapper}>
                      <button
                        className={`btn btn_template btn_create-account ${styles.btnCreateAccount}`}
                        type="submit"
                        onClick={signupAnalyticsLog(GASignupTriggers.SIGNUP_CTA)}
                      >
                        Create an account
                      </button>
                    </div>

                    {desktopView ? (
                      renderFooter
                    ) : (
                      <div className={styles.mobileFooterGroup}>
                        {renderFooter}
                        {renderLivePerson}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
            <div
              className="image_decoration bg_image"
              style={{
                backgroundImage: `url(${imageDecorationStep4})`,
              }}
            />
          </div>
        </div>
      </main>
      {desktopView && renderLivePerson}
    </div>
  );
};

export default Signup;
