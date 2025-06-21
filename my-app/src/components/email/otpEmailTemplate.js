const generateOtpEmailTemplate = ({ recipientName, otp }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>OTP Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          color: #343a40;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #0d6efd;
          color: white;
          padding: 15px;
          border-radius: 12px 12px 0 0;
          text-align: center;
        }
        .otp-box {
          font-size: 24px;
          font-weight: bold;
          background: #e9ecef;
          padding: 10px 20px;
          margin: 20px auto;
          display: inline-block;
          border-radius: 6px;
          letter-spacing: 4px;
        }
        .footer {
          font-size: 12px;
          color: #6c757d;
          margin-top: 30px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🚆 Railway Reservation</h2>
        </div>
        <p>Hi <strong>${recipientName}</strong>,</p>
        <p>Thank you for using our railway reservation service.</p>
        <p>Please use the OTP below to verify your email and complete the booking process:</p>
        <div class="otp-box">${otp}</div>
        <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
        <p>If you didn’t request this, please ignore this email.</p>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Railway Reservation System. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `;
  };
  
  export default generateOtpEmailTemplate;
  