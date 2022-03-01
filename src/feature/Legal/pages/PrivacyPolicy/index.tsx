import React from 'react';
import { Layout, Link, Page } from '@shopify/polaris';

const PrivacyPolicy = (): JSX.Element => (
  <Page breadcrumbs={[{ content: 'Settings', url: '/settings/legal' }]} title="Privacy policy">
    <Layout>
      <Layout.Section>
        <div className="terms__section">
          <p className="terms__text terms__text-normal">
            This Privacy Policy explains what personal data we collect from you and how we use it.
            This Privacy Policy applies if you visit or use Brenda websites or mobile applications.
            This Privacy Policy also applies if you visit Brenda’s social media or other web pages
            located on third-party websites.
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">What Is Brenda?</p>
          <p className="terms__text terms__text-normal">
            <span>
              Brenda is a platform that allows Members to connect with Advisors to receive
              counseling, consulting, advice, and other professional services online or via
              downloadable mobile applications (the “Advisor Platform”). The Advisor Platform
              enables users to communicate directly with the Advisor and pay for a subscription for
              access to these services from each Advisor.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">
            What information do we collect from you?
          </p>
          <p className="terms__text terms__text-normal">
            <span>
              By visiting and/or communicating on the Advisor Platform, we may collect certain
              information from you, including but not limited to:
            </span>
          </p>
          <ul className="terms__list">
            <p className="terms__list-section-title terms__text">
              Information you provide to us, such as:
            </p>
            <li className="terms__list-item terms__text">
              Personal information, such as your name, contact information (which may include phone
              number), and profile picture.
            </li>
            <li className="terms__list-item terms__text">
              Surveys, transcripts and recordings of your communications with Advisors, members, and
              us.
            </li>
            <li className="terms__list-item terms__text">
              Your payment information, including credit card number(s) and related billing
              information.
            </li>
            <li className="terms__list-item terms__text">
              Any personal information you choose to share through your use of the Advisor Platform,
              such as your medical (physical and/or mental health) information, sexual orientation,
              etc. Please note that if you do not wish to disclose this information, you should not
              do so.
            </li>
            <li className="terms__list-item terms__text">For Advisors, applicable tax forms.</li>
          </ul>

          <ul className="terms__list">
            <p className="terms__list-section-title terms__text">Automatic information, such as:</p>
            <li className="terms__list-item terms__text">
              Web browser and usage information, including IP address, browser types, page view
              tallies, time spent on each page, page browsing information, operating system and type
              of device used.
            </li>
          </ul>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">
            How does the Advisor Platform collect information from you?
          </p>
          <ul className="terms__list-numeric">
            <p className="terms__list-section-title terms__text">
              We collect information when you sign up to use the Advisor Platform and also when you
              communicate with other members of the Advisor Platform, including through:
            </p>
            <li className="terms__text">1. The Advisor Platform registration process;</li>
            <li className="terms__text">2. Chats;</li>
            <li className="terms__text">3. Messages;</li>
            <li className="terms__text">
              4. If you register for the Advisor Platform via a third-party social media platform,
              we may receive information from that third-party platform about you;
            </li>
            <li className="terms__text">
              5. If you are referred to the Advisor Platform through an affiliate or referral
              partner, we may receive information from such partners about you; or
            </li>
            <li className="terms__text">
              6. If you sign up as an Advisor, although the Platform Provider is not responsible for
              vetting Advisors, we may use a third party to confirm your credentials, including
              relevant licenses and certifications.
            </li>
          </ul>

          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-vertical-padding">
              Please note that if we receive your information from third parties as mentioned above,
              the data you provide to such third parties is also subject to the third party’s
              Privacy Policy.
            </span>
          </p>

          <ul className="terms__list-numeric">
            <p className="terms__list-section-title terms__text">
              In addition, we may collect information through the following methods if you use the
              Advisor Platform or visit Brenda social media pages or other pages located on
              third-party websites:
            </p>
            <li className="terms__text">1. Your communications with the Platform Provider;</li>
            <li className="terms__text">
              2. Your requests for information, news and other content;
            </li>
            <li className="terms__text">3. A technical support request you submit; or</li>
            <li className="terms__text">4. Your participation in a Brenda promotion.</li>
          </ul>

          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-top-padding">
              We may also collect information from our direct interactions with you, publicly
              available data or data provided by third-party sources, such as marketing opt-in
              lists.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">
            How does the Advisor Platform use the information it collects about me?
          </p>
          <p className="terms__text terms__text-normal">
            <span>
              We use the information we collect to provide and improve our services, to deliver
              information requested by you (for example in response to technical support requests),
              to deliver marketing or other materials to you (including through phone calls if you
              provide your telephone number or SMS if you have opted in to receive SMS messages), or
              for promotions you may enter into. We process your information if you have given your
              consent; if it’s necessary to perform a contract with you or to take steps at your
              request prior to entering into a contract; if it’s necessary to comply with legal
              obligations; or if it’s necessary for us or a third party to pursue a legitimate
              interest. We may retain your information for a period of time consistent with the
              original purpose of collection. For example, we may retain your information during the
              time in which you have an account to use the Advisor Platform. We may also retain your
              information during the period of time needed for us to pursue our legitimate business
              interests, conduct audits, comply with our legal obligations, resolve disputes, and
              enforce our agreements. We are not required to store information (including your
              transcripts, surveys, and recordings) indefinitely.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">Does the Advisor Platform use cookies?</p>
          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-bottom-padding--small">Cookies:</span>
          </p>
          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-vertical-padding--small">
              We may use cookies and other identification technologies to deliver and improve the
              Services and to enhance your experience.
            </span>
          </p>
          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-top-padding--small">
              Cookies are small text files stored on a visitor’s web browser and applications.
              Cookies are often used to make web-browsing easier by performing functions such as
              saving passwords and maintaining lists of personal preferences regarding the use of
              the website.
            </span>
          </p>
          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-top-padding">
              The Advisor Platform may use the following types of cookies:
            </span>
          </p>
          <ul className="terms__list">
            <li className="terms__text terms__text-normal">
              Strictly Necessary Cookies – these cookies are essential to enable you to browse the
              Advisor Platform and use the available features.
            </li>
            <li className="terms__text terms__text-normal">
              Preference or Functionality Cookies – these cookies allow the Advisor Platform to
              remember choices you make while browsing, such as geographic location and preferences
              (e.g., text size and fonts).
            </li>
            <li className="terms__text terms__text-normal">
              Statistics or Performance Cookies – these cookies collect information about how you
              use the Advisor Platform. For instance, these cookies track which pages you visit
              most. This data may be used to help optimize the Advisor Platform and make it easier
              for you to navigate within them.
            </li>
            <li className="terms__text terms__text-normal">
              Analytics Cookies - these cookies track your activity on the Advisor Platform to help
              advertisers deliver to you and track relevant marketing and advertising to you.
            </li>
          </ul>
          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-top-padding">
              Other identification technologies that may be used by the Advisor Platform:
            </span>
          </p>
          <ul className="terms__list">
            <li className="terms__text terms__text-normal">
              Pixel tags (also called beacons or pixels) – these are small blocks of code installed
              on (or called by) a webpage or application, which can retrieve certain information
              about your device and browser, including device type, operating system, browser type
              and version, website visited, time of visit, referring website, IP address and other
              similar information.
            </li>
            <li className="terms__text terms__text-normal">
              Software Development Kits (also called SDKs) - function like pixels and cookies, but
              operate in the mobile application context where pixels and cookies cannot always
              function. The application developer can install pieces of code (the SDK) into the
              application to collect certain information about user interaction with the application
              and information about the user device and network information.
            </li>
          </ul>
          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-vertical-padding">
              First and third-party technologies:
            </span>
          </p>
          <p className="terms__text terms__text-normal">
            <span>
              The Advisor Platform may use first-party cookies or other tracking technologies as
              above - these cookies or technologies originate from the same domain as the website
              you’re currently visiting. The Advisor Platform may also use third-party service
              providers who are authorized to place cookies, pixel tags or similar technologies on
              the Advisor Platform with our permission. These technologies help us compile metrics
              and analytics to help improve our Services. Third-party cookies and technologies are
              covered by the third party’s Privacy Policy.
            </span>
          </p>
          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-vertical-padding">How to Control Cookies:</span>
          </p>
          <p className="terms__text terms__text-normal">
            <span>
              Web browsers are usually set to accept cookies. However, if you prefer not to receive
              cookies, you can modify your settings in most web browsers to accept or deny cookies
              or to request your permission each time a site attempts to set a cookie. Note that if
              you choose to disable cookies, not all functionality offered by the Advisor Platform
              will be available or will work as effectively for you.
            </span>
          </p>

          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-vertical-padding">
              Instructions for how to manage cookies on certain desktop browsers:
            </span>
          </p>
          <a
            href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop"
            className="terms__link"
            rel="noreferrer"
            target="_blank"
          >
            Google Chrome
          </a>
          <a
            href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
            className="terms__link"
            rel="noreferrer"
            target="_blank"
          >
            Firefox
          </a>
          <a
            href="https://support.apple.com/en-gb/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
            className="terms__link"
            rel="noreferrer"
            target="_blank"
          >
            Safari
          </a>
          <a
            href="https://support.microsoft.com/help/17442/windows-internet-explorer-delete-manage-cookies"
            className="terms__link"
            rel="noreferrer"
            target="_blank"
          >
            Internet Explorer
          </a>

          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-vertical-padding">
              Instructions for how to manage cookies on certain mobile browsers:
            </span>
          </p>
          <a
            href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DAndroid"
            className="terms__link"
            rel="noreferrer"
            target="_blank"
          >
            Google Chrome on Android
          </a>
          <a
            href="https://support.mozilla.org/en-US/kb/clear-your-browsing-history-and-other-personal-data"
            className="terms__link"
            rel="noreferrer"
            target="_blank"
          >
            Firefox on Android
          </a>
          <a
            href="https://support.apple.com/en-gb/HT201265"
            className="terms__link"
            rel="noreferrer"
            target="_blank"
          >
            Safari on iOS
          </a>

          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-top-padding">
              For further information about cookies, including how to see what cookies have been set
              on your device and how to manage and delete them, you can visit{' '}
              <a href="https://www.youronlinechoices.com." rel="noreferrer" target="_blank">
                www.youronlinechoices.com.
              </a>
            </span>
          </p>

          <p className="terms__text terms__text-normal">
            <span className="terms__span-with-vertical-padding">Do Not Track</span>
          </p>

          <p className="terms__text terms__text-normal">
            <span>
              Various browsers currently offer a “do not track” or “DNT” option that relies on a
              technology that sends a signal to websites a user visits about that user’s browser DNT
              preferences. The Advisor Platform currently does not respond to such signals because a
              common industry standard for DNT has not been adopted. The Advisor Platform will
              continue to monitor developments around DNT browser technology.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">Sharing of information collected</p>
          <p className="terms__text terms__text-normal">
            <span>
              We do not sell, trade or rent personal information provided by you in any transcript,
              survey or recording for direct marketing or any other purpose, except as provided in
              this Privacy Policy or with your permission. We do not disclose the contents of
              transcripts, surveys or recordings other than to service providers performing services
              on behalf of the Platform Provider other than as provided in this Privacy Policy or
              with your permission.
            </span>
            <span>
              <i>For legal reasons:</i> We may share your information if we reasonably believe that
              it: (i) is necessary to comply with a legal process (such as a court order, subpoena,
              or search warrant) or other legal requirement of any governmental authority; (ii)
              would potentially mitigate our liability in an actual or potential lawsuit; (iii) is
              necessary to enforce this Privacy Policy or the Advisor Terms and Conditions or Member
              Terms and Conditions you are subject to or any other agreement in place between you
              and the Platform Provider; (iv) is necessary to investigate and prevent unauthorized
              transactions or other illegal activities; (v) is otherwise necessary or appropriate to
              protect our rights or property or the rights or property of any person or entity;
              and/or (vi) is necessary because someone may be in danger.
            </span>
            <span>
              <i>To deliver and improve the Advisor Platform:</i> Member information may be shared
              with Advisors to enable them to ensure a high level of quality of the services
              provided through the Advisor Platform. We also may aggregate information so that it is
              not personally identifiable and use and share such aggregated information for training
              and quality assurance purposes and to deliver and improve the Advisor Platform.
            </span>
            <span>
              <i>Service providers:</i> We may share your information when reasonably necessary with
              third-party service providers used to deliver and make the Advisor Platform and
              certain features and functionality available, including but not limited to payment
              processors, customer contact centers, and a third party to review Advisor profiles.
            </span>
            <span>
              <i>Business partners:</i> If you accessed the Advisor Platform through an affiliate or
              referral partner, we may share your information with such partner to optimize your
              experience and improve our services.
            </span>
            <span>
              <i>Affiliates:</i> We may share your information with subsidiaries, parent companies,
              or other affiliates of the Platform Provider corporate group in order to deliver and
              improve the Advisor Platform.
            </span>
            <span>
              <i>Other third parties:</i> The Cookies section above addresses the information the
              Platform Provider or third parties collect through cookies, pixel tags, SDKs, and
              similar third-party technologies and how you can control cookies through your web
              browsers. We may also disclose your personal information to any third party with your
              prior consent.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">Third-party integrations</p>
          <p className="terms__text terms__text-normal">
            <span>
              From time to time, we may partner with other companies to allow the Platform Provider
              and its customers to offer integrations with the Advisor Platform. If you use one of
              these integrations, we may share your data with the third-party partner, receive data
              about you from the third-party partner, and/or combine third-party partner data about
              you with information about you that we collect. We do not control how a third-party
              partner may use your data. Use of your information by the third-party partner there is
              governed by its privacy policies. If you do not wish for your information to be shared
              in this way, you may opt not to use such integrations.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">
            How can I review, correct, delete, transfer, or receive a copy of my information or
            withdraw my consent to process my information?
          </p>
          <p className="terms__text terms__text-normal">
            <span>
              If you elect to engage in any communication session on the Advisor Platform, it is up
              to you to decide what, if any, information to provide during such session. Depending
              on your request, it may not be possible for us or Advisors to fully provide all
              requested services to you. Nevertheless, if you do not wish to provide certain
              information, then you should not do so.
            </span>
            <span>
              If you have signed up to receive marketing or advertising communications from the
              Platform Provider, you may, at any time, opt out of receiving further communications
              by clicking on the opt-out link at the bottom of a marketing or advertising email you
              receive. You may also contact us at{' '}
              <a href="mailto:support@brenda.app" rel="noreferrer" target="_blank">
                support@brenda.app
              </a>{' '}
              to opt out or to request changes to your personal information.
            </span>
            <span>
              You may view your communication history on the Advisor Platform by logging in and
              accessing your account page.
            </span>
            <span>
              You may request to review, correct, delete, transfer, or receive a copy of any of the
              personal information you’ve provided to us through the Advisor Platform or withdraw
              your consent to the Platform Provider processing your personal data by contacting us
              at{' '}
              <a href="https://www.brenda.app/contact" rel="noreferrer" target="_blank">
                www.brenda.app/contact
              </a>
              , and we will respond within 30 days. You may generally update your account settings,
              user profile, and billing information by logging in to your account.
            </span>
            <span>
              If you believe that we have not been able to assist you with your inquiry, and you are
              located in the European Economic Area, you have the right to file a complaint with the
              relevant supervisory authority.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">
            How does the Advisor Platform keep my information secure?
          </p>
          <p className="terms__text terms__text-normal">
            <span>
              We use security measures designed to protect against the loss, misuse and alteration
              of the information under our control, although data transmissions over the internet
              cannot be guaranteed to be absolutely secure. Transcripts of your conversations
              through the Advisor Platform are stored and backed up on our servers, where access to
              data is protected by multiple layers of controls, such as role-based access controls,
              authentication mechanisms and monitoring. You may review your message history and see
              transcripts of your past messages.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">International data transfers</p>
          <p className="terms__text terms__text-normal">
            <span>
              If you are located outside of the United States, please note that we may transfer your
              personal data outside your country of origin. By providing or making available your
              personal data, you consent to that transfer. We will take steps to ensure that your
              data is subject to appropriate safeguards required under this Privacy Policy,
              applicable data protection laws, and appropriate legally recognized data transfer
              adequacy mechanisms which may include entering into European Commission-approved
              standard contractual clauses related to transfers of personal information (available
              at{' '}
              <a
                href="http://ec.europa.eu/justice/dataprotection/internationaltransfers/transfer/index_en.html"
                rel="noreferrer"
                target="_blank"
              >
                http://ec.europa.eu/justice/dataprotection/internationaltransfers/transfer/index_en.html
              </a>
              ). Any inquiries or complaints regarding our data privacy practices may be directed to{' '}
              <a href="mailto:support@brenda.app">support@brenda.app</a> or to our external Data
              Protection Officer Prof. Dr. Christoph Bauer at Große Bleichen 21, 20354 Hamburg,
              Germany. We will respond within a reasonable period of time. You also have the right
              to file a complaint with the appropriate supervisory authority in your jurisdiction.
              Our EU Representative is LivePerson Netherlands B.V. located at Herengracht 124,
              1015BT Amsterdam, The Netherlands. Further, our UK Representative is LivePerson (UK)
              Limited located at 16 Great Queen Street, London EC2B 5DG, United Kingdom.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">Children</p>
          <p className="terms__text terms__text-normal">
            <span>
              The Advisor Platform is not directed to individuals under 18. If you are under the age
              of 18, you may not use or register for the Advisor Platform or provide any personal
              information to us. We do not knowingly collect personal information from individuals
              under the age of 18. If you are a parent of an individual under 18 and believe your
              child has provided personal information to the Platform Provider, or if you are a
              California resident under the age of 18 and wish to remove content you have made
              publicly available, please contact us at{' '}
              <a href="mailto:support@brenda.app" rel="noreferrer" target="_blank">
                support@brenda.app
              </a>
              , where you may request to exercise your applicable access, rectification,
              cancellation, and/or objection rights. We reserve the right to immediately terminate
              any member account and delete his or her information if it believes the member is
              under the age of 18.
            </span>
          </p>
        </div>

        <div className="terms__section">
          <p className="terms__text terms__text-headline">Miscellaneous</p>
          <p className="terms__text terms__text-normal">
            <span>
              We recommend that you review this Privacy Policy periodically, as we may update it
              from time to time. Your use of the Advisor Platform, as applicable, constitutes your
              consent to the new Privacy Policy to the fullest extent permitted by law.
            </span>
            <span>
              We are not responsible for and do not control the privacy practices of any of our
              customers or any other third party. We encourage you to review the privacy practices
              of each third party.
            </span>
            <span>
              We welcome your feedback on our Privacy Policy. Please send any comments or questions
              to{' '}
              <a href="mailto:support@brenda.app" rel="noreferrer" target="_blank">
                support@brenda.app
              </a>{' '}
              or to Kato Acquisition Sub, Inc.‎, Attn: LivePerson Legal Department – Privacy, 530
              7th Ave, Floor M1, New York, NY 10018.
            </span>
          </p>
        </div>

        <br />
        <p className="terms__text terms__text-normal">Last Updated: November 10, 2021</p>
      </Layout.Section>
    </Layout>
  </Page>
);

export default PrivacyPolicy;
