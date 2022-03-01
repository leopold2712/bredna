import React from 'react';
import { Layout, Link, Page } from '@shopify/polaris';
import Logo from '../../../assets/images/home/Brenda.svg';

import './terms.scss';

const TermsAndConditions = (): JSX.Element => (
  <div>
    <div className="terms__header">
      <img src={Logo} alt="logo" />
    </div>
    <Page>
      <h1 className="terms__headline">Terms & conditions</h1>
      <Layout>
        <Layout.Section>
          <div className="terms__section">
            <p className="terms__text terms__text-headline">
              Independent Contractor Agreement and Platform Terms of Use
            </p>
          </div>
          <div className="terms__section">
            <p className="terms__text terms__text-normal">
              This Independent Contractor Agreement and Platform Terms of Use (the “Agreement”) are
              between Kato Acquisition Sub Inc. (the “Platform Provider”) and all users (“You” or
              “Advisor”) who access and/or use the Brenda platform to provide online advice and
              services described in this Agreement to consumers who have purchased a subscription or
              have otherwise accessed the platform (“Members”).
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">1. What Is Brenda?</p>
            <p className="terms__text terms__text-normal">
              <span>
                Brenda is a platform that allows Members to connect with Advisors to receive
                counseling, consulting, advice, and other professional services (the “Services”).
                The Services are made available to Members via websites, mobile applications, and
                other channels of communication which may be owned or operated by the Platform
                Provider (collectively, the “Advisor Platform” or “Site”). The Advisor Platform
                enables Members to communicate directly with Advisors and pay for a subscription or
                otherwise access the platform to receive these services on a recurring basis.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">
              2. Disclaimer and Limitation of Liability
            </p>
            <p className="terms__text terms__text-normal">
              <span>
                a. YOU ACKNOWLEDGE AND AGREE THAT THE SITE IS BEING PROVIDED FOR USE AS IS. THE USE
                OF THE SITE IS ACCORDINGLY BEING MADE AT YOUR SOLE AND ENTIRE RISK, WITHOUT
                WARRANTIES OF ANY KIND, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, NON-INFRINGEMENT, COMPATIBILITY, SECURITY OR ACCURACY. THE SITE
                PROVIDER EXPRESSLY DISCLAIMS ALL WARRANTIES FOR INFORMATION POSTED OR TRANSMITTED BY
                ITS MEMBERS. THE PLATFORM PROVIDER CANNOT GUARANTEE THAT ACCESS TO THE ADVISOR
                PLATFORM WILL BE UNINTERRUPTED OR THAT IT WILL BE ACCESSIBLE, CONSISTENT, TIMELY OR
                ERROR-FREE.
              </span>
              <span>
                b. UNDER NO CIRCUMSTANCES WILL THE PLATFORM PROVIDER, ITS AFFILIATES, AND THEIR
                RESPECTIVE OFFICERS, DIRECTORS, SHAREHOLDERS, EMPLOYEES, SUB-CONTRACTORS AND AGENTS
                BE LIABLE TO ANY ADVISOR FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL,
                PUNITIVE OR EXEMPLARY DAMAGES (INCLUDING BUT NOT LIMITED TO LOSS OF BUSINESS,
                REVENUE, PROFITS, USE, DATA OR OTHER ECONOMIC ADVANTAGE), HOWEVER IT ARISES, WHETHER
                IN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, OR ARISING FROM THE
                SERVICES OR ANY PROVISION OF THIS AGREEMENT. THE PLATFORM PROVIDER, ITS AFFILIATES,
                THEIR RESPECTIVE OFFICERS, DIRECTORS, SHAREHOLDERS, EMPLOYEES, SUB-CONTRACTORS AND
                AGENTS’ AGGREGATE LIABILITY FOR DIRECT DAMAGES ARISING WITH RESPECT TO THIS
                AGREEMENT AND ANY AND ALL USE OF THE ADVISOR PLATFORM WILL NOT EXCEED THE LESSER OF
                (I) TOTAL AMOUNT OF MONEY PAID TO THE PLATFORM PROVIDER BY YOU THROUGH THE ADVISOR
                PLATFORM IN THE SIX MONTH PERIOD PRIOR TO THE DATE THE CLAIM AROSE; OR (II) $100.
              </span>
              <span>
                c. If You decide to provide your services through the use of the Advisor Platform,
                You must exercise a reasonable standard of care, at least the same as a professional
                advisor would in a similar transaction not conducted through the internet, or the
                standard of care mandated by your profession, whichever is higher. You shall not
                have any plea, claim or demand against the Platform Provider, its affiliates, and
                their respective officers, directors, shareholders, employees, sub-contractors and
                agents in respect of any Services You provide in connection with the use of the
                Advisor Platform. The Platform Provider will not under any circumstances be deemed
                the provider or recipient of any Services provided or received through the Advisor
                Platform. The sale or purchase of Services is accordingly at your sole and entire
                risk.
              </span>
              <span>
                d. You acknowledge and agree that the Platform Provider disclaims any liability in
                relation to any claim, suit or action brought by any Member in connection with any
                Services by You, including, but not limited to, representations by You as to your
                qualifications, certifications, licenses and advice provided through the Advisor
                Platform. You agree to indemnify and hold the Platform Provider and its affiliates
                harmless in connection with any such claim and any damages or expenses arising
                therefrom. You further acknowledge that You will be solely responsible and liable
                for any damages to any Member You provide the Services to and to any Member who
                suffers damages arising from or connected to such Services.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">3. Relationship of the Parties</p>
            <p className="terms__text terms__text-normal">
              <span>
                a. <span className="text-underline">Independent Contractors</span>. Advisors are
                independent contractors of the Platform Provider, and nothing in this Agreement
                shall be construed to create any association, partnership, joint venture, employee,
                or agency relationship between You and the Platform Provider for any purpose.
                Neither party to this Agreement shall have or hold itself out to any third party as
                having any authority to make any statements, representations, or commitments of any
                kind or to take any action that shall be binding on the other, except as provided
                for in this Agreement or authorized in writing by the party to be bound.
              </span>
              <span>
                b. As independent contractors, Advisors shall not be eligible to participate in any
                vacation, group medical or life insurance, disability, profit sharing or retirement
                benefits, or any other fringe benefits or benefit plans offered by the Platform
                Provider to its employees. The Platform Provider shall not be responsible for
                withholding or paying any income, payroll, Social Security, or other federal, state,
                or local taxes, making any insurance contributions, including for unemployment or
                disability, or obtaining worker&apos;s compensation insurance on any Advisors&apos;
                behalf. As an independent contractor, each Advisor shall be independently and solely
                responsible for any income, sales and use, or other tax which Advisor may be or
                become obligated to pay by virtue of Advisor’s receipt of any fees or other
                remuneration. Advisors shall be responsible for, and shall indemnify the Platform
                Provider against, all such taxes or contributions including penalties and interest.
              </span>
              <span>
                c. <span className="text-underline">Conduct of Professional Practice</span>.
                Advisors will solely and exclusively control the provision of any professional
                services they render in connection with this Agreement, and the Platform Provider
                will neither have nor exercise any control or discretion over the rendering of such
                services by Advisors. If any requirement or permission of the Platform Provider
                under this Agreement is deemed to constitute the practice of the Advisor’s
                profession or otherwise violate applicable professional practice laws, then (i) the
                performance of such requirement or exercise of such permission will be deemed waived
                by the Advisor to the extent required by applicable law and (ii) such requirement or
                permission will automatically be modified to avoid such violation but otherwise
                maintain the Parties’ business intent to the maximum extent permitted by applicable
                law. Nothing in this Agreement will be construed to alter or otherwise affect any
                legal, ethical or professional relationships between Advisors and Members, nor does
                anything in this Agreement abrogate any right, privilege or obligation arising from
                or related to such relationships.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">4. Privacy</p>
            <p className="terms__text terms__text-normal">
              <span>
                a. <span className="text-underline">Log-in Credentials</span>. You are responsible
                for maintaining the confidentiality of your password, username, and any other
                security information related to your Advisor Platform account. You are fully
                responsible for all activities that occur under your account or user name. The
                Advisor Provider will not be liable for any loss that you incur as a result of any
                breach of your account, either with or without your knowledge. You may be held
                liable for any losses incurred by the Platform Provider due to someone else’s use of
                your account or password.
              </span>
              <span>
                b. <span className="text-underline">Privacy Policy</span>. By accessing and/or using
                the Advisor Platform, You agree to the terms of our Privacy Policy at{' '}
                <Link url="https://www.brenda.app/privacy-policy">
                  https://www.brenda.app/privacy-policy
                </Link>
                .
              </span>
              <span>
                c. <span className="text-underline">Permitted Disclosures</span>. The Platform
                Provider may disclose Advisor information, including, but not limited to, personal
                information, transcripts, surveys, and recordings, if Platform Provider reasonably
                believe that disclosure (i) is necessary to comply with a legal process (such as a
                court order, subpoena, search warrant, etc.) or other legal requirements of any
                governmental authority; (ii) would potentially mitigate the Platform Provider’s
                liability in an actual or potential lawsuit; (iii) is necessary or appropriate to
                protect the Platform Provider’s rights or property, or the rights or property of any
                person or entity; (iv) is necessary or appropriate to enforce this Agreement; (v) is
                necessary to deter illegal behavior (including, but not limited to, fraud); or (vi)
                is necessary because someone may be in danger.
              </span>
              <span>
                d. <span className="text-underline">Your Information</span>. The Platform Provider
                may review any Advisor’s profile and amend any typing or spelling errors. The
                Platform Provider takes no responsibility for evaluating or verifying the
                truthfulness or accuracy of the information contained in an Advisor’s profile, an
                Advisor’s credentials, licenses or qualifications, or an Advisor’s postings or
                transmissions. The Platform Provider may, in its sole discretion, remove or refuse
                to post or transmit any content uploaded by an Advisor. Each Advisor is responsible
                for all risks associated with uploading and transmitting material through the
                Advisor Platform, including its accuracy, reliability, and legality. Any information
                or content that you post or transmit through the Advisor Platform will not be
                considered your confidential information. You hereby grant the Platform Provider an
                unlimited, irrevocable, royalty-free license to use, reproduce, edit, copy,
                transmit, distribute, publicly display, publicly perform, create derivative works
                based on, on a worldwide basis, any information or content that you post, transmit,
                deliver, or receive via the Advisor Platform. Platform Provider does not take any
                ownership rights in any material, information or content Advisor uploads or posts to
                the Advisor Platform and Advisor retains any ownership rights therein.
              </span>
              <span>
                e. The Platform Provider may retain your information for the purposes and timeframes
                as set out in our Privacy Policy. Nevertheless, you acknowledge that the Platform
                Provider is not required to store information (including your transcripts, surveys,
                and recordings) indefinitely.
              </span>
              <span>
                f. <span className="text-underline">Use of Data</span>. The Platform Provider may
                use the details of transactions executed through the Advisor Platform for
                promotional and informational purposes and publish such details on the Advisor
                Platform, provided that such publication will not identify the Advisor or Member in
                any means other than their user names.
              </span>
              <span>
                g. The Platform Provider may also, in its discretion, create co-branded websites
                with its partners. In such case, the Advisor listings may appear in the co-branded
                site. The co-branded sites are maintained on servers maintained and controlled by
                the Platform Provider. The Platform Provider may record the website from which a
                visitor has linked to the site. If a visitor registers to become a Member and/or an
                Advisor, the Platform Provider may track the partner&apos;s name, in order to
                further the relationships the Platform Provider has with its partners.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">
              5. Cancellations, Modifications to and Termination of Service
            </p>
            <p className="terms__text terms__text-normal">
              <span>
                a. If you are unable to attend a scheduled session with a Member, You may cancel or
                reschedule such session by providing at least 6 hours advanced notice to the Member.
                If You fail to show up for a scheduled session with a Member 3 or more times or if
                you cancel a scheduled session with a Member with less than 6 hours advance notice 3
                or more times, your account on the Advisor Platform may be subject to review, or
                temporary or permanent suspension.
              </span>
              <span>
                b. The Platform Provider may modify, suspend, or discontinue, temporarily or
                permanently, any part of the Advisor Platform, with or without notice to You,
                without liability. The Platform Provider, in its sole discretion, may terminate this
                Agreement upon notice to You: (i) upon any breach by You, (ii) for Your inadequate
                performance or provision of services to Members; or (iii) at any time in its sole
                discretion. For the avoidance of doubt, the Platform Provider may terminate or
                prevent You from accessing or providing Services on the Advisor Platform at its sole
                discretion for any reason and for any period of time.
              </span>
              <span>
                c. You may terminate this Agreement on 20 days’ notice by providing notice at{' '}
                <a href="mailto:support@brenda.app">support@brenda.app</a>.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">6. Fees</p>
            <p className="terms__text terms__text-normal">
              <span>
                a. All interactions between Advisors and Members will be billed through the Advisor
                Platform, regardless of whether the interaction is online or offline. Within 14 days
                following the end of each month, the Platform Provider will deliver payment of the
                Advisor’s fee in accordance with this Agreement. You are solely responsible for
                reporting and paying any applicable tax or tariffs in connection with fees
                receivable or received from or through the Platform Provider. Notwithstanding the
                above, the Platform Provider may withhold, in its discretion, amounts paid by
                Members by credit card until adequate time has passed to ensure that the payment
                will not be disputed or charged back, or if the Platform Provider reasonably
                believes that fraud may have occurred in connection with payment, until the Platform
                Provider is able to verify that no fraud has occurred. If a Member has not paid or
                has later charged back payment, no advisor fee will be paid to You for that
                transaction. In cases of fraud, if payment had already been made to You, You are
                required to repay this amount back to the Platform Provider, and the Platform
                Provider may deduct this amount from your account or from future payments. If You
                simultaneously participate as a Member, the Platform Provider may transfer or set
                off payments from your pending earnings as an Advisor to your outstanding balance as
                a Member.
              </span>
              <span>
                b. You will receive $37.50 for each 50-minutes live session via video/voice channels
                with a Member. You will receive $18.75 for each 25-minutes live session via
                video/voice channels with a Member who utilizes a free trial of the Advisor
                Platform. You will receive $5 per Member per day for at least 3 back and forth
                messages via messaging channels.
              </span>
              <span>
                c. The Platform Provider’s billing system is not error-free, and the Platform
                Provider shall not be liable for any miscalculations or malfunctions in processing
                payments. If you think a mistake has occurred, you must submit a complaint to the
                Advisor Platform’s service department at{' '}
                <Link url="https://www.brenda.app/contact">https://www.brenda.app/contact</Link>{' '}
                within 30 days of any such payment. You hereby agree that any disputes raised after
                30 days of payment will not be valid and will not be considered by the Platform
                Provider.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">7. Acceptable Use</p>
            <p className="terms__text terms__text-normal">
              <span>
                a. You may provide Services only for non-emergency matters. For emergency matters,
                You will instruct the Member to immediately call 911 or their local emergency
                assistance.
              </span>
              <span>
                b. You will not provide advice regarding purchasing or selling securities or any
                other investments of any sort, or any report or analysis concerning securities,
                other investments, or any product or services related to lotteries or gambling.
              </span>
              <span>
                c. You will not engage in conduct that is harmful, unethical, fraudulent, deceptive,
                misleading, or offensive.
              </span>
              <span>
                d. You will provide Services to Members only through the Advisor Platform and will
                not exchange personal contact information with Members.
              </span>
              <span>
                e. You will not take actions which may manipulate the integrity of the Member
                feedback rating system.
              </span>
              <span>
                f. You will not stalk, threaten, or harass others or attempt to invade any Member’s
                privacy.
              </span>
              <span>
                g. You will not disclose information that was provided to you by a Member.
              </span>
              <span>
                h. You will not transmit through the Advisor Platform: (a) any information or
                material that infringes a third-party right; (b) any third-party advertisements; (c)
                software viruses, Trojan horses, worms, or any other malicious application; (d) any
                information or material which may encourage conduct that is a criminal offense, a
                civil wrong, or otherwise violates any applicable law; (e) any content that is
                unlawful, harassing, threatening, vulgar, racist, harmful, or otherwise
                objectionable; or (f) any unsolicited mass distribution of email or bulletin board
                postings.
              </span>
              <span>
                i. You will not interfere with, disrupt, or attempt to gain unauthorized access to
                the Advisor Platform or its related servers or networks or operate robots or spiders
                to scan the Advisor Platform.
              </span>
              <span>
                j. You may not view the Advisor Platform with a graphic user interface different
                from the one provided by the Advisor Platform.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">8. Representations and Warranties</p>
            <p className="terms__text terms__text-normal">
              <span>
                a. By accessing and/or using the Advisor Platform, You represent, warrant and agree
                to the following:
                <ol>
                  <li>
                    You are at least 18 years of age and legally able to enter into this Agreement.
                    If You are under the age of 18, You may not use or register for the Advisor
                    Platform or provide any personal information to us. The Platform Provider
                    reserves the right to immediately terminate any account and delete any
                    respective information if it believes the account holder is under the age of 18.
                  </li>
                  <li>
                    You agree not to perform any Services (i) in any jurisdiction where You are not
                    authorized or licensed to do so, and (ii) unless you are a licensed professional
                    in good standing in the relevant jurisdiction and field of expertise abiding by
                    all applicable laws, rules, and regulations, including but not limited to rules
                    of ethics and professional responsibility.
                  </li>
                  <li>
                    You shall exercise a reasonable standard of care, at least the same as a
                    professional advisor would in a similar transaction not conducted through the
                    internet, or the standard of care mandated by your profession, whichever is
                    higher.
                  </li>
                  <li>
                    You will comply with all applicable laws, rules, regulations, and ethical codes
                    in the performance of the Services.
                  </li>
                  <li>
                    You shall be the person actually providing the Services. You warrant that You
                    will remain free of any obligations and restrictions that would interfere,
                    conflict or be inconsistent with the performance of this Agreement.
                  </li>
                  <li>
                    All the information provided in or through the Advisor Platform is accurate,
                    true, current, and complete. You will make sure to maintain and update this
                    information so it will continue to be accurate, current, and complete.
                  </li>
                  <li>
                    You agree that you will provide a correct and accurate representation of your
                    skills, degrees, qualifications, educational and professional background, and
                    any other relevant information in any kind of communication on the Advisor
                    Platform, to the Platform Provider, and when providing the Services.
                  </li>
                  <li>
                    You will provide immediate written notice to the Platform provider of any (i)
                    results of any investigation or disciplinary proceeding by any licensing
                    authority or governmental body against you; (ii) any malpractice action which is
                    commenced, adjudicated or settled; or (iii) any change in status of your license
                    or qualifications.
                  </li>
                </ol>
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">9. Indemnification</p>
            <p className="terms__text terms__text-normal">
              <span>
                a. Advisor shall defend, indemnify and hold Platform Provider, its affiliates and
                its and their officers, directors, employees, consultants, representatives and
                agents (collectively, the &ldquo;Indemnified Parties&rdquo;) harmless from any and
                all losses, damages, suits, judgments, costs and expenses (including litigation
                costs and reasonable attorneys&apos; fees) arising out of or in connection with any
                claim, suit, action, or other proceeding brought against an Indemnified Party
                related to: (a) any breach of any representation, warranty, covenant or agreement
                made or to be performed by Advisor according to this Agreement; (b) any content the
                Advisor submits, posts or transmits through the Advisor Platform or otherwise
                provided by Advisor; and (d) Advisor’s use of any the Advisor Platform. This section
                shall survive the expiration or termination of this Agreement.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">
              10. Advisor and Member Communications
            </p>
            <p className="terms__text terms__text-normal">
              <span>
                a. The Platform Provider is not responsible for screening or editing the content of
                communications between Advisors and Members, but the Platform Provider may screen,
                copy, transmit and review all communications conducted by or through the Advisor
                Platform for technical support and/or in order to uphold the terms of this
                Agreement.
              </span>
              <span>
                b. Messages between Advisors and Members are stored on the Advisor Platform servers
                and are available for review by Advisors and Members. You acknowledge and agree that
                because Members may retain transcripts, recordings, and other communications with
                Advisors as part of their purchase of Services, that You do not have the right to
                delete such communications or the information contained within such communications.
              </span>
              <span>
                c. <span className="text-underline">Response Times</span>. You agree that You will
                respond to all communications from Members within a reasonable amount of time. The
                Platform Provider has the right to institute or modify required response times upon
                notice to You.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">11. Intellectual Property Rights</p>
            <p className="terms__text terms__text-normal">
              <span>
                a. The Advisor Platform contains copyrighted material, trade secrets and proprietary
                information owned by the Platform Provider, in particular the copyright, trademarks,
                database and patents, in the Advisor Platform and in any software, application,
                graphics, text and other materials used therein. The Platform Provider grants You a
                nonexclusive, revocable right to use the Advisor Platform provided that You do not
                copy, modify, create a derivative work of, reverse engineer, disassemble or
                otherwise attempt to discover any source code, or breach this Agreement.
              </span>
              <span>
                b. This Agreement does not grant You any rights to patents, copyrights, trade
                secrets, trade names, trademarks (whether registered or unregistered), domain names
                or any other rights, functions or licenses in respect of the Advisor Platform. You
                may not create derivative software based upon any trade secret, intellectual
                property or proprietary information of the Advisor Platform or the Platform
                Provider. Furthermore, you may not sub-license, assign or transfer, sell or make any
                other commercial use of your membership in the Advisor Platform.
              </span>
              <span>
                c. You may not adapt or use any trademark or trade name, domain name similar to or
                likely to be confused with that of the Platform Provider or the Advisor Platform, or
                take any other action which infringes or impairs the Platform Provider’s trademark
                rights.
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">12. Copyright Policy</p>
            <p className="terms__text terms__text-normal">
              <span>
                a. The Platform Provider respects the intellectual property of others, and we ask
                our users to do the same. The Platform Provider may terminate the account or access
                of users who infringe the intellectual property rights of others. If you believe
                that your work has been copied in a way that constitutes copyright infringement,
                please provide the following information:
                <ol>
                  <li>
                    an electronic or physical signature of the person authorized to act on behalf of
                    the owner of the copyright interest;
                  </li>
                  <li>
                    a description of the copyrighted work, including the location where the
                    copyrighted work exists;
                  </li>
                  <li>your telephone number, and email address;</li>
                  <li>
                    a statement by You that you have a good faith belief that the use is not
                    authorized by the copyright owner, its agent, or the law; and
                  </li>
                  <li>
                    a statement by You, made under penalty of perjury, that the above information is
                    accurate and that you are the copyright owner or authorized to act on the
                    copyright owner&apos;s behalf.
                  </li>
                </ol>
              </span>
              <span>
                b. The Advisor Platform’s Copyright Agent for Notice of claims of copyright
                infringement can be reached as follows:
                <span>
                  <span className="text-underline">By mail:</span>
                  <br />
                  Kato Acquisition Sub, Inc.
                  <br />
                  Attn: LivePerson Legal Department
                  <br />
                  530 7th Ave, Floor M1
                  <br />
                  New York, NY 10018
                </span>
                <span>
                  <span className="text-underline">Mandatory copy by email:</span> <br />
                  <a href="mailto:copyright@liveperson.com">copyright@liveperson.com</a>
                </span>
              </span>
            </p>
          </div>

          <div className="terms__section">
            <p className="terms__text terms__text-headline">13. Miscellaneous</p>
            <p className="terms__text terms__text-normal">
              <span>
                a. <span className="text-underline">Notices</span>. The Platform Provider may
                provide notices or other communications to You regarding changes to this Agreement
                and/or changes to any aspect of the Advisor Platform, by email to the email address
                that we have on record, by regular mail or by posting on the Advisor Platform. The
                date of receipt shall be deemed the date on which such notice is given. Therefore,
                You are encouraged to check the terms of this Agreement frequently. By using the
                Advisor Platform after the changes become effective, You agree to be bound by such
                changes. If You do not agree to the changes, You must terminate access to the
                Advisor Platform and stop providing Services.
                <br />
                Notices sent to the Platform Provider must be delivered via express delivery or
                regular mail to:
                <br />
                <span>
                  Kato Acquisition Sub, Inc.
                  <br />
                  Attn: LivePerson Legal Department
                  <br />
                  530 7th Ave, Floor M1
                  <br />
                  New York, NY 10018
                </span>
                <span>
                  Mandatory Copy by email:{' '}
                  <a href="mailto:Legal@LivePerson.com">Legal@LivePerson.com</a>
                </span>
              </span>
              <span>
                b. You shall not assign your rights or obligations pursuant to this Agreement
                without the prior, written consent of the Platform Provider.
              </span>
              <span>
                c. This Agreement shall be interpreted only in accordance with the laws of the State
                of New York (excluding any rules governing choice of laws), and any legal proceeding
                arising out of this Agreement will occur exclusively in the courts located in New
                York, New York. This Agreement will be binding and will inure to the benefit of the
                legal representatives, successors and assigns of the parties hereto. This Agreement
                (and the policies referenced herein and incorporated by reference) constitutes the
                entire agreement between the Platform Provider and the Advisor with respect to the
                subject matter hereof, and the Advisor has not relied upon any promises or
                representations by the Platform Provider with respect to the subject matter except
                as set forth herein. Persons and entities who live in a territory that is prohibited
                by law from entering into trade relations with the United States are not permitted
                to use or access the Advisor Platform.
              </span>
              <span>
                d. No amendment to this Agreement will be effective unless made in writing. If any
                provision of this Agreement is held by a court of competent jurisdiction to be
                illegal, invalid, unenforceable, or otherwise contrary to law, the remaining
                provisions of this Agreement will remain in full force and effect.
              </span>
              <span>
                e. The Platform Provider may change this Agreement by posting modifications here.
                Unless otherwise specified by the Platform Provider, all modifications shall be
                effective upon posting. Therefore, You are encouraged to check the terms of this
                Agreement frequently. By using the Advisor Platform after the changes become
                effective, you agree to be bound by such changes to the Agreement. If you do not
                agree to the changes, you should discontinue use of the Advisor Platform.
              </span>
            </p>
          </div>

          <br />
          <p className="terms__text terms__text-normal">Last Updated: November 22, 2021</p>
        </Layout.Section>
      </Layout>
    </Page>
  </div>
);

export default TermsAndConditions;
