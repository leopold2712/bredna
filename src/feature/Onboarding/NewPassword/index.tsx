/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Frame, Spinner, Toast } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import imageDecorationForgot from '../../../assets/images/forgot/image_decoration_forgot.jpg';
import imageMobileDecorationForgot from '../../../assets/images/forgot/image_mobile_decoration_forgot.jpg';
import livePersonLogoWhite from '../../../assets/images/signup/liveperson_logo.svg';
import { ResetRequestDTO } from '../dtos/ResetRequestDTO';
import { resetPasswordAsync } from '../store/actions';
import { RootState } from '../../../main/store/rootReducer';
import logoWithText from '../../../assets/images/logo-with-text.svg';

import styles from './newPassword.module.scss';

interface IResetForm {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  password: yup.string().required('Password is required').min(6),
  confirmPassword: yup
    .string()
    .min(6)
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must be the same'),
});

export const NewPassword: React.FC = () => {
  const [width] = useWindowSize();
  const [showToast, setShowToast] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

  const { loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const token = urlParams.get('t');
  const email = urlParams.get('email');

  const formik = useFormik<IResetForm>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (token && email) {
        const resetData: ResetRequestDTO = {
          token,
          email,
          password: values.password,
        };
        dispatch(resetPasswordAsync(resetData));
      } else {
        setShowToast(true);
      }
    },
  });

  const renderButton = (
    <div>
      <div className="btn_wrapper text_right">
        <button
          className="btn btn_template"
          type="button"
          // @ts-ignore
          onClick={formik.handleSubmit}
        >
          Save and Sign in
          {loading && (
            <div style={{ position: 'absolute', right: 7, bottom: 4 }}>
              <Spinner size="small" />
            </div>
          )}
        </button>
      </div>
    </div>
  );

  const renderLivePerson = (
    <footer className="b_footer sign">
      <div className="container">
        <div className="footer_wrapper">
          By
          <img src={livePersonLogoWhite} alt="" />
        </div>
      </div>
    </footer>
  );

  return (
    <div className={styles.newPasswordContainer}>
      <header className="b_header sign">
        <div className="logo_wrapper">
          <div className={`logo ${styles.logo}`}>
            <img src={logoWithText} alt="logo" />
          </div>
        </div>
      </header>
      <main>
        <form onSubmit={formik.handleSubmit}>
          <div className={`b_signin_page jsHeightContent ${styles.page}`}>
            <div className="form_block flex">
              <div
                className={`form_wrapper bg_form ${styles.formWrapper} ${
                  width <= 767 ? styles.grayBackground : ''
                }`}
              >
                <div className={`login_form reset ${styles.loginForm}`}>
                  <div className="title_wrapper">
                    <div className="page_title text_center">Reset Password</div>
                  </div>
                  <div className="row_wrapper">
                    <div className="form_row">
                      <div className="pass_wrapper">
                        <input
                          className={
                            formik.errors.password && formik.touched.password
                              ? 'form_control error'
                              : 'form_control'
                          }
                          type={isVisiblePassword ? 'text' : 'password'}
                          id="password"
                          placeholder="New password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />
                      </div>
                      {formik.errors.password && formik.touched.password && (
                        <div className="error_message">{formik.errors.password}</div>
                      )}
                    </div>
                    <div className="form_row">
                      <div className="pass_wrapper">
                        <input
                          className={
                            formik.errors.confirmPassword && formik.touched.confirmPassword
                              ? 'form_control error'
                              : 'form_control'
                          }
                          type={isVisibleConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          placeholder="Confirm new password"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className={styles.passInfo}>
                        <span>Password must be 8 or more characters</span>{' '}
                      </div>
                      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <div className="error_message">{formik.errors.confirmPassword}</div>
                      )}
                      <div className="mobile_decoration_image">
                        <div
                          className="image_wrapper bg_image"
                          style={{ backgroundImage: `url(${imageMobileDecorationForgot})` }}
                        />
                      </div>
                    </div>
                  </div>
                  {renderButton}
                  <div className={`mobile_decoration_image ${styles.mobileDecorationImage}`}>
                    <div
                      className="image_wrapper bg_image"
                      style={{ backgroundImage: `url(${imageMobileDecorationForgot})` }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="image_decoration bg_image"
                style={{ backgroundImage: `url(${imageDecorationForgot})` }}
              />
            </div>
          </div>
        </form>
      </main>
      {renderLivePerson}
      {showToast && (
        <Frame>
          <Toast
            content="Oops... It looks like invalid link, please go to the forgot password page and send your password reset email again."
            onDismiss={() => {
              setShowToast(false);
            }}
          />
        </Frame>
      )}
    </div>
  );
};
