import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transporter;
/*
######    EXPORTS  #######//
export default is used when we have to export a single class, function, or primitive from a file. 
It allows us to import the exported value with any name we choose in another file.

normal export is used when we want to export multiple values from a file. 
 It allows us to import the exported values with their original names in another file.
*/
