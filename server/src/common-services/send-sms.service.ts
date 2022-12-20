
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC4e3a2e398722134e879b05ed63df1397';
const authToken = process.env.TWILIO_AUTH_TOKEN || '4a12a28933365c0371d65b35e9742f55';
const senderPhoneNumber= process.env.TWILIO_PHONE_NUMBER || '+13022512120';
const client = require('twilio')(accountSid, authToken);

export const smsSender:any = (receiver: string, msg: string) =>{
    client.messages
    .create({
       body: msg,
       from: senderPhoneNumber,
       to: receiver
     })
    .then((message: any) => {
      console.log('Send SMS Success: ', message)
      return;
    })
    .catch((err: any) => {console.log('error send SMS',err); return false});
}

