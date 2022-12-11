import { authenticator } from 'otplib';

authenticator.options = {
    // algorithm: process.env.HMAC_ALGORITHM || 'sha1',
    digits: 6,
    // encoding: 'ascii',
    epoch: Date.now(),
    step: 1200,
    window: 0,
}

const otpService = authenticator

export { otpService }