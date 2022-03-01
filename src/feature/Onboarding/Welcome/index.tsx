import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AnalyticsService } from '../../../shared/services/analytics';
import galleryImage01 from '../../../assets/images/welcome/gallery_image_01.jpg';
import galleryImage02 from '../../../assets/images/welcome/gallery_image_02.jpg';
import galleryImage03 from '../../../assets/images/welcome/gallery_image_03.jpg';
import logoWhite from '../../../assets/images/welcome/logo_white.svg';
import welcomeImage from '../../../assets/images/welcome/welcome_image.png';
import livePersonLogoWhite from '../../../assets/images/welcome/liveperson_logo_white.svg';
import { useCustomWindowWidth } from '../../../shared/hooks/useCustomWindowWidth';

import styles from './welcome.module.scss';
import './welcome.scss';

export default function Welcome(): JSX.Element {
  const history = useHistory();
  const { mobileView, desktopView } = useCustomWindowWidth();

  const onRedirectSignUp = () => {
    AnalyticsService.trackCustom('JoinNowClick');
    history.push('/signup');
  };

  return (
    <div className={`welcome_page ${styles.page}`}>
      <main>
        <div className="welcome_wrapper">
          <div className={`welcome_wrapper_inner flex ${styles.wrapperInner}`}>
            <div className={`welcome_content ${styles.content}`}>
              <div className={`welcome_content_inner ${styles.contentInner}`}>
                <div className={styles.above}>
                  <div className={`welcome_header ${styles.header}`}>
                    <div className={`welcome_head_wrapper flex ${styles.headWrapper}`}>
                      <div className={`welcome_title_wrapper ${styles.titleWrapper}`}>
                        <div className={`welcome_title ${styles.title}`}>Welcome To</div>
                      </div>
                      <div className="logo_wrapper">
                        <img
                          className={`hey-expert-common-img ${styles.img}`}
                          src={logoWhite}
                          alt="logo_white"
                        />
                      </div>
                    </div>
                    <div className={`content_wrapper ${styles.contentWrapper}`}>
                      Join thousands of fellow professionals who provide their services on HeyExpert
                      and enjoy a robust new income stream!
                    </div>
                  </div>
                  <div className={`content_list_wrapper ${styles.contentListWrapper}`}>
                    <div className="content_row">
                      <div className={`row_title ${styles.rowTitle}`}>
                        TAKE YOUR PROFESSIONAL SERVICES ONLINE!
                      </div>
                      <div className={`row_content ${styles.rowContent}`}>
                        HeyExpert ensures you are on the right side of the
                        <br />
                        latest technology by providing your services on our
                        <br />
                        cutting edge platform.
                      </div>
                    </div>
                    <div className="content_row">
                      <div className={`row_title ${styles.rowTitle}`}>GROW YOUR BUSINESS.</div>
                      <div className={`row_content ${styles.rowContent}`}>
                        Increase your client base and reap the benefits of traffic
                        <br />
                        on our platform. Enjoy 100% revenue from the clients that
                        <br />
                        you bring, and 65% from referrals.
                      </div>
                    </div>
                    <div className="content_row">
                      <div className={`row_title ${styles.rowTitle}`}>HASSLE FREE.</div>
                      <div className={`row_content ${styles.rowContent}`}>
                        No need to deal with billing, service, legal, or financial
                        <br />
                        aspects, as Hey takes care of all of that for you.
                      </div>
                    </div>
                  </div>
                  <div className={`image_gallery  ${styles.imageGallery}`}>
                    <div className="gallery_list flex">
                      <div className="list_item">
                        <div
                          className="gallery_image bg_image"
                          style={{
                            backgroundImage: `url(${galleryImage01})`,
                          }}
                        />
                      </div>
                      <div className="list_item">
                        <div
                          className="gallery_image bg_image"
                          style={{
                            backgroundImage: `url(${galleryImage02})`,
                          }}
                        />
                      </div>
                      <div className="list_item">
                        <div
                          className="gallery_image bg_image"
                          style={{
                            backgroundImage: `url(${galleryImage03})`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`form_wrapper ${styles.formWrapper}`}>
                    {desktopView && (
                      <>
                        <div className={`form_title ${styles.formTitle}`}>
                          <span>Hey is free for experts! There are no membership fees.</span>
                        </div>
                        <button
                          className={`btn btn_template btn_join ${styles.btnJoin}`}
                          type="button"
                          onClick={onRedirectSignUp}
                        >
                          Join now!
                        </button>
                      </>
                    )}
                    {mobileView && (
                      <div className={`form_title ${styles.formTitle}`}>
                        <div>Hey is free for experts!</div>
                        <div>There are no membership fees.</div>
                      </div>
                    )}
                  </div>
                </div>
                {desktopView && (
                  <div className={`custom_link_wrap ${styles.customLinkWrap}`}>
                    <div>
                      Already have an account?&nbsp;
                      <Link className="link" to="/login">
                        Log in
                      </Link>
                    </div>
                  </div>
                )}
                {mobileView && (
                  <div className={`custom_link_wrap ${styles.customLinkWrap}`}>
                    <button
                      className={`btn btn_template btn_join ${styles.btnJoin}`}
                      type="button"
                      onClick={onRedirectSignUp}
                    >
                      Join now!
                    </button>
                    <div>
                      Already have an account?&nbsp;
                      <Link className="link" to="/login">
                        Log in
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={`welcome_image_wrapper ${styles.imageWrapper}`}>
              <img src={welcomeImage} alt="" />
            </div>
          </div>
          <div className={`footer_content text_center ${styles.footerContent}`}>
            <div className="footer_wrapper">
              By
              <img className="hey-expert-common-img" src={livePersonLogoWhite} alt="" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
