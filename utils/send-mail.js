import transporter from '../config/mail.js';
import path from 'path';
import fs from 'fs';

const sendMail = async (to, subject, data) => {
    const templatePath = path.join(
        process.cwd(),
        'templates',
        'accept-invite.html'
    );
    let html = fs.readFileSync(templatePath, 'utf8');
    Object.entries({
        link: data.link,
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        userName: data.name,
    }).forEach(([key, value]) => {
        html = html.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'), value);
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
    });
};

export default sendMail;
