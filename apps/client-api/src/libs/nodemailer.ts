import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport(
  'smtp://127.0.0.1:1025?secure=false',
)
