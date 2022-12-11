import nodeMailer from 'nodemailer';
const adminEmailAddress = process.env.ADMIN_EMAIL_ADDRESS || 'haigolong@gmail.com';
const adminEmailPassword = process.env.APPLICATION_MAIL_PASSWORD || 'ojnqxhaeygeftfvp';

const mailHost = 'gsmtp.ethereal.email'
const mailPort = 587

export const mailSender = async (to: string, subject: string, textContent: string, htmlContent?:string) => {
    console.log(adminEmailAddress, adminEmailPassword)
    const mailTranposter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        // secure: false,
        service: 'gmail',
        auth: {
            user: adminEmailAddress,
            pass: adminEmailPassword
        },
    })
    const options = {
        from: adminEmailAddress,
        to: to,
        subject: subject,
        text: textContent || '',
        html: htmlContent || '',
    }
    try {
        const result = await mailTranposter.sendMail(options)
        console.log('==> Send Mail Reulst: ', result)
        return 'Send OTP to Email succesfully'
    } catch (err) {
        console.log(err)
    }

}
