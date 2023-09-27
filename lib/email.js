// an email template that can be used with Nodemailer to send emails

const HTML_TEMPLATE = (text,subject) => {
    return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
    
        <!-- CSS Reset : BEGIN -->
        <style>
    
            /* What it does: Remove spaces around the email design added by some email clients. */
            /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
            html,
    body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
    }
    
    /* What it does: Stops email clients resizing small text. */
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
    
    /* What it does: Centers email on Android 4.4 */
    div[style*="margin: 16px 0"] {
        margin: 0 !important;
    }
    
    /* What it does: Stops Outlook from adding extra spacing to tables. */
    table,
    td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
    }
    
    /* What it does: Fixes webkit padding issue. */
    table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
    }
    
    /* What it does: Uses a better rendering method when resizing images in IE. */
    img {
        -ms-interpolation-mode:bicubic;
    }
    
    /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
    a {
        text-decoration: none;
    }
    
    /* What it does: A work-around for email clients meddling in triggered links. */
    *[x-apple-data-detectors],  /* iOS */
    .unstyle-auto-detected-links *,
    .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
    .a6S {
        display: none !important;
        opacity: 0.01 !important;
    }
    
    /* What it does: Prevents Gmail from changing the text color in conversation threads. */
    .im {
        color: inherit !important;
    }
    
    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img + div {
        display: none !important;
    }
    
    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
    /* Create one of these media queries for each additional viewport size you'd like to fix */
    
    /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    /* iPhone 6, 6S, 7, 8, and X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    /* iPhone 6+, 7+, and 8+ */
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }
    
        </style>
    
        <!-- CSS Reset : END -->
    
        <!-- Progressive Enhancements : BEGIN -->
        <style>
    
          .primary{
      background: #30e3ca;
    }
    .bg_white{
      background: #ffffff;
    }
    .bg_light{
      background: #fafafa;
    }
    .bg_black{
      background: #000000;
    }
    .bg_dark{
      background: rgba(0,0,0,.8);
    }
    .email-section{
      padding:2.5em;
    }
    
    /*BUTTON*/
    .btn{
      padding: 10px 15px;
      display: inline-block;
    }
    .btn.btn-primary{
      border-radius: 5px;
      background: #30e3ca;
      color: #ffffff;
    }
    .btn.btn-white{
      border-radius: 5px;
      background: #ffffff;
      color: #000000;
    }
    .btn.btn-white-outline{
      border-radius: 5px;
      background: transparent;
      border: 1px solid #fff;
      color: #fff;
    }
    .btn.btn-black-outline{
      border-radius: 0px;
      background: transparent;
      border: 2px solid #000;
      color: #000;
      font-weight: 700;
    }
    
    h1,h2,h3,h4,h5,h6{
      font-family: 'Lato', sans-serif;
      color: #000000;
      margin-top: 0;
      font-weight: 400;
    }
    
    body{
      font-family: 'Lato', sans-serif;
      font-weight: 400;
      font-size: 15px;
      line-height: 1.8;
      color: rgba(0,0,0,.4);
    }
    
    a{
      color: #30e3ca;
    }
    
    table{
    }
    /*LOGO*/
    
    .logo h1{
      margin: 0;
    }
    .logo h1 a{
      color: #30e3ca;
      font-size: 24px;
      font-weight: 700;
      font-family: 'Lato', sans-serif;
    }
    
    /*HERO*/
    .hero{
      position: relative;
      z-index: 0;
    }
    
    .hero .text{
      color: rgba(0,0,0,.3);
    }
    .hero .text h2{
      color: #000;
      font-size: 40px;
      margin-bottom: 0;
      font-weight: 400;
      line-height: 1.4;
    }
    .hero .text h3{
      font-size: 24px;
      font-weight: 300;
    }
    .hero .text h2 span{
      font-weight: 600;
      color: #30e3ca;
    }
    
    
    /*HEADING SECTION*/
    .heading-section{
    }
    .heading-section h2{
      color: #000000;
      font-size: 28px;
      margin-top: 0;
      line-height: 1.4;
      font-weight: 400;
    }
    .heading-section .subheading{
      margin-bottom: 20px !important;
      display: inline-block;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(0,0,0,.4);
      position: relative;
    }
    .heading-section .subheading::after{
      position: absolute;
      left: 0;
      right: 0;
      bottom: -10px;
      content: '';
      width: 100%;
      height: 2px;
      background: #30e3ca;
      margin: 0 auto;
    }
    
    .heading-section-white{
      color: rgba(255,255,255,.8);
    }
    .heading-section-white h2{
      font-family: 
      line-height: 1;
      padding-bottom: 0;
    }
    .heading-section-white h2{
      color: #ffffff;
    }
    .heading-section-white .subheading{
      margin-bottom: 0;
      display: inline-block;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(255,255,255,.4);
    }
    
    
    ul.social{
      padding: 0;
    }
    ul.social li{
      display: inline-block;
      margin-right: 10px;
    }
    
    /*FOOTER*/
    
    .footer{
      border-top: 1px solid rgba(0,0,0,.05);
      color: rgba(0,0,0,.5);
    }
    .footer .heading{
      color: #000;
      font-size: 20px;
    }
    .footer ul{
      margin: 0;
      padding: 0;
    }
    .footer ul li{
      list-style: none;
      margin-bottom: 10px;
    }
    .footer ul li a{
      color: rgba(0,0,0,1);
    }
    
    
    @media screen and (max-width: 500px) {
    
    
    }
    
    
        </style>
    
    
    </head>
    
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
      <center style="width: 100%; background-color: #f1f1f1;">
        <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
          &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
          <!-- BEGIN BODY -->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
            <tr>
              <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td class="logo" style="text-align: center;">
                      <h1><a href="#">TRADE-CAFE</a></h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end tr -->
            <tr>
              <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
                <table>
                  <tr>
                    <td>
                      <div class="text" style="padding: 0 2.5em; text-align: center;">
                        <h2>${subject}</h2>
                        <h3>${text}</h3>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end tr -->
          <!-- 1 Column Text + Button : END -->
          </table>
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
            <tr>
              <td valign="middle" class="bg_light footer email-section">
                <table>
                  <tr>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-right: 10px;">
                            <h3 class="heading">About</h3>
                            <p>TRADE~CAFE</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                            <h3 class="heading">Contact Info</h3>
                            <ul>
                              <li><span class="text">Nairobi, Kenya</span></li>
                              <li><span class="text">+254 701 958 738</span></a></li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="33.333%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 10px;">
                            <h3 class="heading">Useful Links</h3>
                            <ul>
                              <li><a href="trade-cafe.com">Home</a></li>
                              <li><a href="trade-cafe.com/about">About</a></li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr><!-- end: tr -->
            <tr>
              <td class="bg_light" style="text-align: center;">
                <p></p>
              </td>
            </tr>
          </table>
    
        </div>
      </center>
    </body>
    </html>
    `;
  }
//Email function for when we want to send stuff
module.exports = {

    email: function (params = { to: 'email', subject: 'cmpe165', text: 'some text here', html:'some html here' }) {
        var nodemailer = require('nodemailer');
        //parameter: { subject: "cmpe133", text: "some text here", header:"header1"....

        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'tulivuapps@gmail.com',
        //         pass: 'alvinpeter'
        //     }
        // });

        // var mailOptions = {
        //     from: 'tulivuapps@gmail.com',
        //     to: params.to,
        //     subject: params.subject,
        //     text: params.text,
        //     html: params.html
        //     //headers: params.header
        // }
        const output =HTML_TEMPLATE(`${params.text}`,`${params.subject}`);

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
             type: "OAuth2",    // defining the authentication type  
             clientId: "810570145117-48q2flkrv77sbqf8mlfvmiubhocbg1h0.apps.googleusercontent.com",    // this will be obtained in part 2
             clientSecret: "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",    // this will be obtained in part 2  
            }
          });
          
          let mailOptions = {
            from:"tradecafe58@gmail.com" ,   // You can change this to whatever you like. !this is NOT where you add in the email address!
            to:`${params.to}`,    // Use your same googele email ("send yourself an email") to test if the app works.
            subject: params.subject,   // change the subject to whatever you like.
            html: output,   // this is the output variable defined earlier that contains our message.
            auth: {
             user: "tradecafe58@gmail.com",   // replace this with your google email 1//04wJfPycNlSaXCgYIARAAGAQSNwF-L9Ir2ue1KnEWZsmr9p87U3yHPPsUcH2_ZyIkh0-DHRAiH4PyYXzqOsjJZF4CzI38gOzYU40
             refreshToken: "1//04RUUAAup23dcCgYIARAAGAQSNwF-L9Ir1IdZ5DEmvckfZj0iVDnSXKGu3xCzEWgiv3ym_1OTsrUEYmxrAcFBUqTM5Ass1MawfGE",//"1//04EHUarxJpRqCCgYIARAAGAQSNwF-L9Irlr98fz8xioCgl6W1ZQtEXEmSNRRL05P1ddPnKHcIMprtIQ9ujy_FvnlPHDlex2n5edU", //"1//04wJfPycNlSaXCgYIARAAGAQSNwF-L9Ir2ue1KnEWZsmr9p87U3yHPPsUcH2_ZyIkh0-DHRAiH4PyYXzqOsjJZF4CzI38gOzYU40",    // this will be obtained in part 2 
             accessToken: "ya29.a0Ael9sCPFVYgEqghPYz0Pj1EL4DMGbhvQBHcliVtfHNJdK3_R0vS9s9VTGPoOoN4w_uAESFSKIN8I0ngkz2EinrznSV_poV_8cL6JxZPg8bOP_Nm6wS0nxAzZGdrFp40cxIY7JVvbgqs7oQhf99v1MErFJ1sRaCgYKAaQSARASFQF4udJh1ogFmlznc2CUyJRK8RmwWA0163",//"ya29.A0ARrdaM8fJRK9UaC_cUARPcxu7UF2wohwnKuzWLNylQ-C-AtG1N18nHlEW5MbkFH_qcO8AaqtsrkiT78iWPW9Qq_f_RjxhoF899CuFkYkEcAImNZpvMiiGH_egzbzKfalSNenFise4B_f43uFs9Qg6b9Scr8w", //"ya29.A0ARrdaM8tGUkYPgrTfXJ82GcAq4ZIfe6P9TaRID0dKIlUr7PGWzJ5ThQ59u277BeZ4COsw0uNaYfJMt2Xi3f1dbWhMhjz2O7sKFf9LFf0ImSanlghCG9p2c7VpXnKKdm-joqNHR0bDhdNAqfc-M1hTI3q-6aj",    // this will be obtained in part 2 
             expires: new Date().getTime(),  // this will request a new token each time so that it never expires. google allows up to 10,000 requests per day for free.
           },
          };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                console.log(params.to)
                console.log(params.subject)
                console.log(params.text)
            } else {
                console.log('Email sent: ' + info.response);
            }
        }); 
              
    }
};