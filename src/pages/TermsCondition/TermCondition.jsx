import { Card, makeStyles, Typography, useTheme } from '@material-ui/core'
import DashboardPage from '@/components/DashboardPage'
import React from 'react'
import { TitleDescription } from '../PrivacyPolicy'

const useStyle = makeStyles((theme) => ({
  privacyCard: {
    // height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  title: {
    fontWeight: 700,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const TermCondition = () => {
  const classes = useStyle()
  const theme = useTheme()
  return (
    <DashboardPage>
      <Card className={classes.privacyCard}>
        <Typography className={classes.title} align="center" variant="h5">
          AGREEMENT / DISCLAIMER / TERMS &amp; CONDITIONS OF USE
        </Typography>
        <Typography
          align="center"
          style={{
            fontWeight: 600,
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
          }}
          variant="h5">
          IMPORTANT – PLEASE READ CAREFULLY{' '}
        </Typography>
        <Typography variant="subtitle1" align="center">
          Corporate Identity Names in Document: Asmita Patel Global School of
          Trading Pvt Ltd, Rytt.com
        </Typography>

        <Typography noWrap>&nbsp;</Typography>
        <TitleDescription
          title={'Risk Disclosure'}
          description={`   The information found on the Asmita Patel Global School Of Trading Private Limited.
(“Rytt”) website / software / applications / portal was prepared without regard to any
particular investor’s investment objectives, financial situation, or needs. Rytt act only as a
website / software / applications / platform / portal service provider according to clients /
your needs. Accordingly, you / clients / investors should not act on any information in this
document without obtaining specific advice from their financial advisors and should not rely
on information herein as the basis for their investment decisions. Futures trading and
algorithmic trading involves a substantial risk of loss and is not appropriate for everyone. No
representation is being made that utilizing the algorithmic trading strategy will result in
profitable trading or be free of risk of loss. Before deciding to trade or invest you should
carefully consider your investment objectives, level of experience, and ability to tolerate risk.
The possibility exists that you could sustain a loss of some or all of your initial investment.
Only risk capital should be used.`}
        />
        <TitleDescription
          title={`Accuracy Of Information`}
          description={`The content of this website / software / applications / platform / portal is subject to change at
any time without notice, and is provided for the sole purpose for convenience / for
automation / for education and assistance in making independent investment decisions.
Rytt has taken reasonable measures to ensure the accuracy of the information contained
herein; however, Rytt does not guarantee its accuracy, and is not liable for any loss or

damage which may arise directly or indirectly from such content or from an inability to
access such information, for any delay in or failure of the transmission or receipt of any
instruction or notification in connection therewith. By using this website / software /
applications / platform / portal, you acknowledge that any recommendations or trading
analysis found herein are provided for educational and illustrative purposes only and should
not be used in connection with the formation or execution of any trading decisions. Futures
trading and algorithmic trading involves a substantial risk of loss and you should never
make a decision based solely on the information found on this website / software /
applications / platform / portal. Rytt reserves the right, in its sole discretion and without any
obligation, to make modifications to any portion of the Rytt website / software / applications /
platform / portal or publications at any time.`}
        />
        <TitleDescription
          title={`Market Research, Reports, And Educational Materials`}
          description={`Any opinions, news, research, analyses, prices, reports, graphs, charts, or other information
          contained herein is provided for informational purposes only and does not constitute
          investment advice or recommendations. Rytt is not liable for any loss or damage, including
          without limitation, any loss of profit, which may arise directly or indirectly from the use of or
          reliance on any such information. You acknowledge and agree that you bear responsibility
          for your own investment research and investment decisions, and that Rytt shall not be held
          liable by you or any others for any decision made or action taken by you or others based
          upon reliance on or use of information or materials obtained or accessed through use of
          Rytt.`}
        />
        <TitleDescription
          title={`Distribution`}
          description={`This information is not intended for distribution, or use by, any person in any country where
such distribution or use would be contrary to local law or regulation. None of the services or
information referred to herein are available to persons residing in any country where the
provision of such services or information would be contrary to local law or regulation. It is

the responsibility of users of this information to ascertain the terms of and comply with any
local law or regulation to which they are subject.`}
        />
        <TitleDescription
          title={`Performance Results`}
          description={`Past performance results are shown for illustration and example only, are hypothetical and
as such have many inherent limitations. No representation is being made that any account
will or is likely to achieve profits or losses similar to those shown. In fact, there are
frequently significant differences between hypothetical performance results and the actual
results subsequently achieved by any particular trading technique or methodology. One of
the limitations of hypothetical performance results is that they are prepared with the benefit
of hindsight. In addition, hypothetical trading does not involve financial risk, and no
hypothetical trading record can completely account for the impact of financial risk in actual
trading. For example, the ability to withstand losses or adhere to a particular trading
program despite trading losses are material factors which can adversely affect actual
trading results. There are numerous other factors related to the markets in general or to the
implementation of any specific trading program which cannot be fully accounted for in the
preparation of hypothetical performance results and all of which can adversely affect actual
trading results`}
        />
        <TitleDescription
          title={`No Warranty`}
          description={`All the information, software, content, products and services available from Rytt are
provided on an “as-is” and “as-available” basis, with no warranties of any kind. Rytt
expressly disclaims any and all warranties, express or implied, including without limitation
the warranty of merchantability, fitness for a particular purpose, and noninfringement. There
are no explicit or implicit warranties of accuracy, timeliness, suitability, or otherwise made
by Rytt or its affiliates with respect to any information found on Rytt website / software /
applications / platform / portal. By using this website / software / applications / platform/
portal, you agree not to hold Rytt, or any of its affiliates, liable for decisions that are based

on information contained in posts or otherwise in the chat room. You further agree not to
hold Rytt, or any of its affiliates, liable for products or services that are bought based on any
recommendations made on the website / software / applications / platform / portal, or for
any partnerships or other dealings that may originate on the forum, private messaging, or
any other source. Futures trading and algorithmic trading involve a substantial risk of loss
and is not appropriate for everyone. Only risk capital should be used.`}
        />
        <TitleDescription
          title={`Third Party Services`}
          description={`Rytt does not warrant, represent, or endorse the accuracy or reliability of any of the
information, content, advertisements, or third party website / software / applications /
platform / portals or Third Party Services (as defined in Section 3 of the Asmita Patel Global
School Of Trading Private Limited. Service Agreement) contained on, distributed through, or
linked, downloaded or accessed from any of Rytt website / software / applications / platform
/ portals, nor the quality of any products, information, or other materials displayed,
purchased, or obtained by you as a result of an advertisement or any other information or
offer on or in connection with Rytt. You acknowledge that any use of or reliance upon third
party website / software / applications / platform / portals or Third-Party Services shall be at
your sole risk.`}
        />
        <TitleDescription
          title={`SERVICE AGREEMENT`}
          description={`This Service Agreement (“Agreement”) is by and between Asmita Patel Global School Of
Trading Private Limited. (“Rytt”) and the User of the Rytt website / software / applications /
platform / portal and services (hereinafter referred to as “you” or “User”) and governs the
use of the Rytt website / software / applications / platform / portal and services (collectively
referred to as the “Service”) by User.`}
        />
        <TitleDescription
          title={`Agreement And General Terms Of Use`}
          description={`(a) By accessing the Rytt website / software / applications / platform / portal, User
          acknowledges and accepts the terms set forth herein. Rytt may modify this Agreement and
          any related terms of use of the Rytt website / software / applications / platform / portals, and
          such modifications shall be effective immediately upon Rytt’ posting of the modifications to
          the “Agreement” and/or “Terms of Use” area of the Rytt website / software / applications /
          platform / portal. Use of the Rytt website / software / applications / platform / portal after
          such revisions constitutes User’s acknowledgment and acceptance of any revisions to the
          terms of the Agreement. User is responsible for reviewing the terms of the Agreement each
          time the Rytt website / software / applications / platform / portal is accessed. (b) User
          agrees to pay the applicable fees, as more fully set forth below, and to take all necessary
          steps to authorize monthly credit card / debit card / UPI / net banking payments in
          consideration for the Services provided by Rytt. (c) User is responsible for the confidentiality
          and use of his or her login information, including usernames, login names, login passwords,
          screen names, and any access numbers, names, or associated information. User is
          responsible for his or her use of the Service and for any unauthorized third party use of the
          Service. User must immediately notify Rytt of any loss or theft of user name, login name,
          login password, or screen name, or any unauthorized use of user name, login name, login
          password or screen name. In selecting a username, login name, and screen name, User
          may not impersonate any other person or entity, and is prohibited from attempting to
          communicate anonymously with Rytt.`}
        />
        <TitleDescription
          title={`Disclaimers`}
          description={`(a) The Rytt website / software / applications / platform / portal is presented for informational
purposes only. Any opinions, news, research, analyses, prices, reports, graphs, charts, links
to third party website / software / applications / portals, or other information contained herein
is provided for informational purposes only and does not constitute investment advice or
recommendations. Rytt is not liable for any loss or damage, including without limitation, any
loss of profit, any loss of capital which may arise directly or indirectly from the use of or
reliance on any such information. (b) The information provided on the Rytt website /

software / applications / platform / portal is for personal, non-commercial use for others.
Neither the information nor any opinion contained in the Rytt website / software /
applications / platform / portal constitutes a solicitation or offer by Rytt or its affiliates and
partners to buy or sell any futures, options on futures or securities of any kind or provide
any investment advice or service. The information on the Rytt website / software /
applications / platform / portal is not intended to be used as the primary basis of investment
decisions. The Rytt website / software / applications / platform / portal does not provide
specific investment advice to any individual viewing the content of the website / software /
applications / portal and does not represent that the services described herein are suitable
for any specific investor. (c) Trading or investing carries a high level of risk, and may not be
suitable for all persons. Before deciding to trade or invest you should carefully consider your
investment objectives, level of experience, and ability to tolerate risk. The possibility exists
that you could sustain a loss of some or all of your initial investment and, therefore, you
should not invest money that you cannot afford to lose. You should be aware of all the risks
associated with trading and investing, and seek advice from an independent financial
advisor if you have any doubts. Past performance is not necessarily indicative of future
results. (d) The information provided on the Rytt website / software / applications / platform /
portal is not intended for distribution to, or use by, any person or entity in any jurisdiction or
country where such distribution or use would be contrary to law or regulation or which would
subject Rytt or its affiliates to any registration requirement within such jurisdiction or country.
It is the responsibility of Users of this information to ascertain the terms of and comply with
any local law or regulation to which they are subject. (e) The information on the Rytt website
/ software / applications / platform / portal, including any links to third party website /
software / applications / portals and the content thereon, is not guaranteed as to accuracy,
completeness, or timeliness, and such information is subject to change at any time without
notice, and is provided for the sole purpose of education and assistance in making
independent investment decisions. Rytt has taken reasonable measures to ensure the
accuracy of the information contained herein; however, Rytt does not guarantee its
accuracy, and is not liable for any loss or damage which may arise directly or indirectly from
such content or from an inability to access such information, for any delay in or failure of the

transmission or receipt of any instruction or notification in connection therewith. (f)
Information contained on the Rytt website / software / applications / platform / portal,
including pricing, valuation, and commentary on specific products, if any, reflects the
authors’ analysis and other information available as of the publication date indicated.
Furthermore, any news, opinions, commentaries, opinions, data, pricing, links to third party
website / software / applications / portals, and all other information contained on the Rytt
website / software / applications / platform / portal are believed to be reliable, but Rytt
cannot and does not guarantee its accuracy, timeliness, or completeness. Rytt expressly
disclaims any warranties of merchantability or fitness for a particular purpose. Rytt will not
be responsible for any loss or damage that could result from interception by third parties of
any information transmitted electronically or otherwise in connection with this website /
software / applications / portal. (g) Neither Rytt, nor any of its affiliates, directors, officers or
employees, nor any third party vendor or service provider will be liable or have any
responsibility of any kind for any loss or damage that you incur in the event of any failure or
interruption of this website / software / applications / portal, or resulting from the act or
omission of any other party involved in making this website / software / applications / portal,
or the website / software / applications / portal’s data, available to you, or from any other
cause relating to your access to, inability to access, or use of the website / software /
applications / portal or these materials, whether or not the circumstances giving rise to such
cause may have been within the control of Rytt or of any vendor providing software or
services support. (h) Hypothetical trading results may appear on the Rytt website / software
/ applications / platform / portal. (i) Hypothetical performance results have many inherent
limitations, some of which are described below. no representation is being made that any
account will or is likely to achieve profits or losses similar to those shown; in fact, there are
frequently sharp differences between hypothetical performance results and the actual
results subsequently achieved by any particular trading program. One of the limitations of
hypothetical performance results is that they are generally prepared with the benefit of
hindsight. In addition, hypothetical trading does not involve financial risk, and no
hypothetical trading record can completely account for the impact of financial risk of actual
trading. For example, the ability to withstand losses or to adhere to a particular trading

program in spite of trading losses are material points which can also adversely affect actual
trading results. There are numerous other factors related to the markets in general or to the
implementation of any specific trading program which cannot be fully accounted for in the
preparation of hypothetical performance results and all of which can adversely affect trading
results.`}
        />
        <TitleDescription
          title={`Third Party Website / Software / Applications / Platform /
Portals And Services`}
          description={`(a) The Rytt website / software / applications/ platform / portal may contain links to third
          party website / software / applications/ platform / portals, which are owned and operated by
          unaffiliated third parties, and may contain offers for various products, services, or
          information (collectively referred to as “Third Party Services”). Rytt is not responsible for the
          contents of any such linked sites and does not assume any responsibility for the accuracy
          or appropriateness of the information contained on such sites. The inclusion of any link
          does not imply endorsement by Rytt. No claims are made as to the reliability of past,
          present or future profitability in connection with the use of any of these Third-Party Services.
          Rytt does not guarantee that use of these Third-Party Services will generate or result in any
          profits. (b) User acknowledges that Third Party Services are produced and owned by third
          parties, and not Rytt, and that Rytt disclaims any responsibility for any Third-Party Services
          provided to User. User is responsible for conducting his or her own due diligence with
          respect to any Third-Party Service utilized by User. User assumes all risk/liability for such
          Third-Party Service. (c) Rytt makes no representations or warranties whatsoever,
          expressed or implied, as to the accuracy, completeness, timeliness, appropriateness,
          suitability or fitness for any purpose or use of such Third-Party Services, products, services
          and information, customer and technical support or web presence or any of their
          presentations or representations. User acknowledges and agrees that Rytt shall not be
          liable in any way for the use of such Third-Party Services. (d) User acknowledges and
          agrees that this Agreement Grants User no rights or licenses with respect to any Third-Party
          Service, and User agrees that use of any Third-Party Services shall be in accordance with
          
          any agreements or other governing rules applicable to such Third-Party Services. User
          acknowledges and agrees that Rytt has no obligation to maintain or provide any updates to
          User regarding any changes to agreements related to Third Party Services. User is
          responsible for reading and understanding the terms and conditions and any other policies
          of any Third-Party Services utilized by User. Any questions related to such Third-Party
          Services should be directed to the third party providing the service.`}
        />
        <TitleDescription
          title={`Waiver Of Liability`}
          description={`User agrees that access to and use of the information contained in the Rytt website /
software / applications / platform / portal is at the User&#39;s risk, and User agrees that no claim
shall be alleged or asserted against Rytt or anyone affiliated therewith based on any
allegation or contention that any of the information was deficient or inaccurate. In addition,
any reference to any Third-Party Service at or on the Rytt website / software / applications /
platform / portal or any linked site is not an express or implied endorsement by Rytt. All the
information, software, content, products and services available from Rytt are provided on an
“as-is” and “as-available” basis, with no warranties of any kind. Rytt expressly disclaims any
and all warranties, express or implied, including without limitation the warranty of
merchantability, fitness for a particular purpose, and non-infringement. Rytt disclaims any
warranty that the site will always be accessible or operational, that the information provided
at the site is accurate, reliable or correct, and that any errors will be corrected. You agree
that, under no circumstances and to the fullest extent allowed by applicable law, will Rytt be
liable for any and all damages under any and all theories (including contract, negligence,
strict liability or tort) arising out of or relating in any way to this agreement, the content,
including without limitation any Rytt content or third party content, the site, your use or
inability to use the site, or any decision or action you make in connection with the site. You
agree that, under no circumstances and to the fullest extent allowed by applicable law, the
maximum aggregate liability, if any, that Rytt may owe to you in connection with this
agreement, the site, and your use of the site and its content, shall not, under any
circumstance or theory of law or recovery, exceed Rs 1/-. your only other remedy for

dissatisfaction with the site, site related services or content or information contained within
the site is to stop using the site and the services offered or provided and to cancel any
subscription. certain state laws do not allow limitations on implied warranties or the
exclusion or limitation of certain damages. If these laws apply to you, some or all of the
above disclaimers, exclusions, or limitations may not apply to you, and you might have
additional rights but the arbitrator shall always be appointed by Rytt the company.`}
        />
        <TitleDescription
          title={`User Subscription Fees And Service Renewals`}
          description={`(a) All User subscriptions for the Service provided by Rytt will automatically renew. Users
          must submit cancellation requests by email to support@Rytt.com at least 48 hours prior to
          the renewal date in order to avoid automatic renewal of the Service. Upon termination of the
          Service, User acknowledges that all monthly subscription fees previously charged to User’s
          credit card / debit card / UPI / net banking in consideration for User’s access to the Service
          will not be refunded, in whole or in part (b) All sales are final and subscription fees are non-
          refundable. Rytt, in its sole discretion, however, reserves the right to refund all or part of
          User’s subscription fees. (c) User agrees to pay the fees charged by Rytt for renewals until
          service has been terminated by User or Rytt. User agrees to pay any fees that may be
          assessed in connection with any products, Services, subscriptions, or information ordered
          by User, as well as any related taxes. User also agrees to pay all costs (including attorneys’
          fees and expenses) incurred by Rytt in collecting any unpaid or overdue fees. (d) User
          represents and warrants to be the owner, holder and authorized user of the credit card /
          debit card / UPI / net banking identified in the Rytt registration form. User authorizes Rytt to
          charge User’s credit card / debit card / UPI / net banking to pay for all Services requested
          by User. User’s credit card / debit card / UPI / net banking authorization will remain in effect
          until revoked by User by submitting a notice of revocation of credit card / debit card / UPI /
          net banking authorization by email to support@Rytt.com.`}
        />
        <TitleDescription
          title={`Duration Of Agreement`}
          description={`This Agreement, including User’s credit card / debit card / UPI / net banking authorization,
will continue month-to-month, unless cancelled or revoked by either User or Rytt in a
manner required by the terms of this Agreement.`}
        />
        <TitleDescription
          title={`Termination Of Agreement`}
          description={`(a) Rytt may terminate this Agreement and User’s access the Service at any time and for
          any reason upon notice to User. In general, however, Rytt will consider terminating this
          Agreement if (i) User fails to observe any provision of this Agreement; (ii) the authorized
          charges to User’s credit card / debit card / UPI / net banking are not honoured; or (iii) User’s
          credit card / debit card / UPI / net banking authorization is withdrawn. Upon cancellation,
          User will be denied further access to the Service provided by Rytt, and Rytt will have no
          obligation to return any portion of the subscription fees remitted by User paid prior to
          cancellation of the Service by either Rytt or User. (b) Rytt may discontinue the Service, at
          any time and for any reason upon notice to User.`}
        />
        <TitleDescription
          title={`Limited User License`}
          description={`(a) All content provided by Rytt on the Service is protected by copyright, trademark, and
other applicable intellectual property and proprietary rights laws and is owned, controlled,
and/or licensed by Asmita Patel Global School Of Trading Private Limited. The Service is
protected by copyright, patent, trademark, and other applicable intellectual property and
proprietary rights laws and is owned, controlled, and/or licensed by Asmita Patel Global
School Of Trading Private Limited. All trademarks appearing on the Service are the property
of their respective owners. (b) Content provided by the Service may be searched, retrieved,
displayed, downloaded, and printed by Users for personal use only. Users shall make no
other use of such content without the express written permission of Rytt. Users shall not
modify any of the content provided by the Service, and in particular Users shall not delete or
alter any proprietary rights or attribution notices in any content. User acknowledges and
agrees that no ownership rights are acquired by User in connection with his or her use of

the Service. User further acknowledges and agrees that all rights not granted to User under
this Agreement are expressly reserved by Rytt and/or its licensors. (c) No User is allowed to
copy, sell, license, modify, distribute, reproduce, transmit, publicly display, publicly perform,
publish, adapt or edit any of the materials or content appearing on Rytt’ website / software /
applications / portal, in whole or in part, except as expressly authorized by this Agreement.
(d) This Agreement and limited license is granted solely to User, and may not be assigned
or transferred by User. User acknowledges and agrees that User is strictly prohibited from
allowing third parties to access the Rytt website / software / applications / platform / portal or
Services. User acknowledges and agrees that User is solely responsible for any liability
arising from any third-party access to or use of the Rytt website / software / applications /
platform / portal permitted or facilitated by User, whether negligently or otherwise.`}
        />
        <TitleDescription
          title={`Indemnification`}
          description={`User agrees to indemnify, defend and hold harmless Rytt, its officers, directors, employees, agents, information providers and suppliers from and against all claims, causes of action, suits, losses, expenses, damages and costs, including reasonable attorney’s fees, arising out of, in connection with or relating to any violation by you of this Agreement, including claims of infringement of intellectual property or other third party rights, or otherwise, directly or indirectly resulting from or attributable in any way to any access to, use of or posting of material or content on the Rytt website / software / applications / platform / portal by you.`}
        />
        <TitleDescription
          title={`Access And Interference`}
          description={`(a) User agrees to use the Service and any content, material, or information associated therewith solely for lawful purposes. User shall not upload to, distribute, or otherwise disseminate through the Service any material or information of any kind that is libellous-, defamatory, obscene, pornographic, abusive, or otherwise violates any law or infringes or violates any rights of any other person or entity, or contains a solicitation of funds, advertising, or a solicitation for goods or services. (b) User agrees to not use any robot, spider, other automatic device, or manual process to monitor or copy any of Rytt’ web pages, or the content contained thereon, or for any other unauthorized purpose without Rytt’ prior express written permission. User agrees to not use any device, software, or routine to interfere or attempt to interfere with the proper functioning of the Rytt website / software / applications / platform / portal. User agrees to not take any action that imposes an unreasonable or disproportionately large load on the Rytt infrastructure and User agrees not to engage in any unauthorized framing, linking, or deep-linking to the Rytt website / software / applications / platform / portal without the prior written consent of Rytt.`}
        />
        <TitleDescription
          title={`Statement Of Privacy`}
          description={`(a) Rytt is committed to protecting your privacy and maintaining the confidentiality and
security of your information. In accordance with its legal obligations, Rytt is required to
inform you how it treats certain information concerning Users and how such information is
used to service Users. Please refer to Rytt’ Privacy Policy found on its website / software /
applications / portal for additional information pertaining to the use of information. (b) Rytt
reserves the right to collect and use data about Users and use of the Service for its own
internal purposes, e.g., performing statistical analyses to assist Rytt in improving the
Service. Rytt further reserves the right to distribute such data in formats that do not identify
individual Users. Rytt may distribute data in formats identifying User only upon the User’s
prior written consent to such distribution of information.`}
        />
        <TitleDescription
          title={`Notices`}
          description={`User may contact Rytt by sending an email to the following email
address: support@Rytt.com. Rytt will contact User by sending an email to the email
address provided by User, or by posting a notice on the Rytt website / software /
applications / platform / portal`}
        />
        <TitleDescription
          title={`No Assignment`}
          description={`The rights and obligations associated with this Agreement and limited license belong only to
the User, and may not be assigned or sold to or used by another person or entity without
the prior written consent of Rytt. User acknowledges and agrees that User is strictly
prohibited from allowing third parties to access the Rytt website / software / applications /
platform / portal or Services without the prior written consent of Rytt. User acknowledges
and agrees that User is solely responsible for any liability arising from any third party access
to or use of the Rytt website / software / applications / platform / portal permitted or
facilitated by User, whether negligently or otherwise.`}
        />
        <TitleDescription
          title={`Other Terms And General Provisions`}
          description={`(a) This Agreement between User and Rytt supersedes and replaces any prior agreement
          between User and Rytt. (b) If any term or provision of this Agreement is found by a court of
          competent jurisdiction to be void, invalid, unenforceable or otherwise contrary to law, the
          remainder of the Agreement that can be given effect without such term or provision shall be
          given full effect. (c) Any failure by Rytt to enforce strict performance of any provision of this
          Agreement will not constitute a waiver of its right subsequently to enforce such provision or
          any other provision of the Agreement. (d) No representation is being made nor implied that
          the use of algorithmic trading system will generate income or guarantee a profit. There is a
          substantial risk of loss associated with futures trading and algorithmic trading traded funds.
          (e) Futures trading and trading exchange traded funds involve a substantial risk of loss and
          is not appropriate for everyone. (f) These results are based on simulated or hypothetical
          performance results that have certain inherent limitations. Unlike the results shown in an
          actual performance record, these results do not represent actual trading. Also, because
          these trades have not actually been executed, these results may have under-or over-
          compensated for the impact, if any, of certain market factors, such as lack of liquidity.
          Simulated or hypothetical trading programs in general are also subject to the fact that they
          are designed with the benefit of hindsight. No representation is being made that any
          
          account will or is likely to achieve profits or losses similar to these being shown. (g)
          Hypothetical or simulated performance results have certain limitations. Unlike an actual
          performance record, simulated results do not represent actual trading. also, since the trades
          have not been executed, the results may have under-or-over compensated for the impact, if
          any, of certain market factors, such as lack of liquidity. Simulated trading programs in
          general are also subject to the fact that they are designed with the benefit of hindsight. No
          representation is being made that any account will or is likely to achieve profit or losses
          similar to those shown.`}
        />
      </Card>
    </DashboardPage>
  )
}

export default TermCondition
