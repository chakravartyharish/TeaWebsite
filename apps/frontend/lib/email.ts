import nodemailer from 'nodemailer'

// Create email transporter using Gmail SMTP
const createTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT || '587')
  const config = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: port,
    secure: port === 465, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD?.replace(/\s/g, ''), // Remove any spaces from app password
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    requireTLS: true,
    debug: true, // Enable debugging
    logger: true // Enable logging
  }
  
  console.log('📧 Email Transporter Configuration:', {
    host: config.host,
    port: config.port,
    user: config.auth.user,
    passwordSet: !!config.auth.pass,
    passwordLength: config.auth.pass?.length || 0
  })
  
  return nodemailer.createTransport(config)
}

// Send admin notification email
export async function sendAdminNotification(submission: any) {
  const transporter = createTransporter()
  const adminEmail = process.env.ADMIN_EMAIL || 'hkchakravarty@gmail.com'
  
  const categoryEmojis = {
    general: '💬',
    product: '🍃',
    order: '📦',
    health: '⚕️',
    wholesale: '💼',
    media: '📰'
  }
  
  const categoryEmoji = categoryEmojis[submission.category as keyof typeof categoryEmojis] || '💬'
  
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
    to: adminEmail,
    subject: `${categoryEmoji} New Contact Form - ${submission.category.toUpperCase()} - ${submission.subject}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2d5a45, #3b7057); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">🍃 Inner Veda</h1>
          <p style="color: #e8f5e8; margin: 10px 0 0 0; font-size: 16px;">New Customer Inquiry Received</p>
        </div>
        
        <!-- Content -->
        <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Alert Badge -->
          <div style="background: #fff3cd; border: 2px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
            <h2 style="color: #856404; margin: 0; font-size: 18px;">🚨 New Customer Inquiry - Action Required</h2>
          </div>
          
          <!-- Customer Details Card -->
          <div style="background: #f8f9fa; border-left: 5px solid #2d5a45; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2d5a45; margin-top: 0; font-size: 20px; margin-bottom: 20px;">📋 Customer Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: 600; color: #495057; width: 35%;">Reference ID:</td>
                <td style="padding: 12px 0; color: #6c757d; font-family: monospace; background: #f1f3f4; padding: 8px 12px; border-radius: 4px;">${submission.id}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: 600; color: #495057;">👤 Customer Name:</td>
                <td style="padding: 12px 0; color: #212529; font-size: 16px; font-weight: 500;">${submission.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: 600; color: #495057;">📧 Email Address:</td>
                <td style="padding: 12px 0;"><a href="mailto:${submission.email}" style="color: #2d5a45; text-decoration: none; font-weight: 500;">${submission.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: 600; color: #495057;">📱 Phone Number:</td>
                <td style="padding: 12px 0; color: #212529;">${submission.phone ? `<a href="tel:${submission.phone}" style="color: #2d5a45; text-decoration: none;">${submission.phone}</a>` : '<span style="color: #6c757d;">Not provided</span>'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: 600; color: #495057;">📂 Inquiry Type:</td>
                <td style="padding: 12px 0;">
                  <span style="background: linear-gradient(135deg, #2d5a45, #3b7057); color: white; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; text-transform: uppercase;">
                    ${categoryEmoji} ${submission.category}
                  </span>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: 600; color: #495057;">📝 Subject:</td>
                <td style="padding: 12px 0; color: #212529; font-weight: 500;">${submission.subject}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: 600; color: #495057;">⏰ Submitted:</td>
                <td style="padding: 12px 0; color: #6c757d;">${new Date(submission.timestamp).toLocaleString('en-IN', { 
                  timeZone: 'Asia/Kolkata',
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
            </table>
          </div>
          
          <!-- Customer Message -->
          <div style="background: #e8f5e8; border: 2px solid #c3e6c3; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2d5a45; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💬 Customer Message</h3>
            <div style="color: #495057; line-height: 1.7; font-size: 15px; background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #2d5a45;">
              ${submission.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div style="background: linear-gradient(135deg, #fff3cd, #ffeaa7); border: 2px solid #ffd93d; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">⚡ Quick Actions</h3>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
              <a href="mailto:${submission.email}?subject=Re: ${submission.subject}&body=Dear ${submission.name},%0A%0AThank you for contacting Inner Veda regarding ${submission.category}. I hope this message finds you in good health.%0A%0A" 
                 style="background: #2d5a45; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: 600; display: inline-block; transition: all 0.3s;">
                📧 Reply to Customer
              </a>
              ${submission.phone ? `<a href="tel:${submission.phone}" 
                 style="background: #17a2b8; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: 600; display: inline-block;">
                📱 Call Customer
              </a>` : ''}
              <a href="https://wa.me/${submission.phone ? submission.phone.replace(/[^0-9]/g, '') : ''}?text=Hello ${submission.name}, thank you for contacting Inner Veda regarding ${submission.category}. How can I assist you today?" 
                 style="background: #25d366; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-weight: 600; display: inline-block;">
                💬 WhatsApp
              </a>
            </div>
          </div>
          
          <!-- Priority Indicator -->
          ${['order', 'health', 'wholesale'].includes(submission.category) ? `
          <div style="background: #f8d7da; border: 2px solid #f5c6cb; padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
            <h3 style="color: #721c24; margin: 0; font-size: 16px;">🔥 High Priority Inquiry - ${submission.category.toUpperCase()}</h3>
            <p style="color: #721c24; margin: 10px 0 0 0; font-size: 14px;">Recommended response time: Within 6-12 hours</p>
          </div>
          ` : ''}
          
          <!-- Footer -->
          <div style="border-top: 2px solid #dee2e6; padding-top: 25px; text-align: center;">
            <p style="color: #6c757d; font-size: 14px; margin: 0 0 10px 0;">
              This notification was sent from Inner Veda Contact Form System
            </p>
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              <strong>🍃 innerveda.in</strong> • Made with ❤️ for your wellness journey
            </p>
            <p style="color: #6c757d; font-size: 12px; margin: 15px 0 0 0;">
              Contact Support: innervedacare@gmail.com • +91 9113920980
            </p>
          </div>
        </div>
      </div>
    `
  }
  
  console.log('📧 Attempting to send admin notification email to:', adminEmail)
  console.log('📧 Mail options prepared:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    htmlLength: mailOptions.html.length
  })
  
  try {
    console.log('📧 Sending email via transporter...')
    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Admin notification email sent successfully!')
    console.log('📧 Email result:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    })
    return { success: true, messageId: result.messageId }
  } catch (error: any) {
    console.error('❌ Failed to send admin notification email!')
    console.error('📧 Error details:', {
      message: error?.message || 'Unknown error',
      code: error?.code || 'N/A',
      command: error?.command || 'N/A',
      response: error?.response || 'N/A',
      responseCode: error?.responseCode || 'N/A',
      stack: error?.stack || 'N/A'
    })
    throw error
  }
}

// Send customer confirmation email
export async function sendCustomerConfirmation(submission: any) {
  const transporter = createTransporter()
  
  const categoryMessages = {
    general: 'Thank you for your general inquiry! Our wellness team will provide you with comprehensive information about Inner Veda and our wellness philosophy.',
    product: 'Thank you for your interest in A-ZEN! Our product specialist will share detailed information about ingredients, benefits, and how A-ZEN can support your wellness journey.',
    order: 'We\'ve received your order-related inquiry. Our customer care team will review your order details and provide prompt assistance.',
    health: 'Thank you for trusting us with your health and wellness questions. Our certified wellness consultant will provide personalized guidance.',
    wholesale: 'Thank you for your wholesale inquiry! Our business development team will contact you with detailed pricing, minimum orders, and partnership information.',
    media: 'Thank you for your media inquiry. Our PR team will respond with press materials, interview availability, and any additional information you need.'
  }
  
  const categoryEmojis = {
    general: '💬',
    product: '🍃',
    order: '📦',
    health: '⚕️',
    wholesale: '💼',
    media: '📰'
  }
  
  const categoryEmoji = categoryEmojis[submission.category as keyof typeof categoryEmojis] || '💬'
  const customMessage = categoryMessages[submission.category as keyof typeof categoryMessages] || categoryMessages.general
  
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
    to: submission.email,
    subject: `🍃 Thank you for contacting Inner Veda - Your ${submission.category} inquiry received`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2d5a45, #3b7057); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 600;">🍃 Inner Veda</h1>
          <p style="color: #e8f5e8; margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Ancient wisdom for modern living</p>
        </div>
        
        <!-- Content -->
        <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Thank You Message -->
          <div style="text-align: center; margin-bottom: 35px;">
            <div style="background: linear-gradient(135deg, #e8f5e8, #c3e6c3); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 40px;">
              ✅
            </div>
            <h2 style="color: #2d5a45; margin: 0 0 15px 0; font-size: 26px;">Thank you for reaching out!</h2>
            <p style="color: #495057; font-size: 18px; line-height: 1.6; margin: 0;">
              Dear <strong>${submission.name}</strong>,<br>
              We've successfully received your inquiry and are excited to help you on your wellness journey.
            </p>
          </div>
          
          <!-- Personalized Message -->
          <div style="background: #e8f5e8; border-left: 5px solid #2d5a45; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #2d5a45; margin-top: 0; font-size: 18px; margin-bottom: 15px;">
              ${categoryEmoji} Your ${submission.category.charAt(0).toUpperCase() + submission.category.slice(1)} Inquiry
            </h3>
            <p style="color: #495057; line-height: 1.7; margin: 0; font-size: 15px;">
              ${customMessage}
            </p>
          </div>
          
          <!-- Inquiry Details -->
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #2d5a45; margin-top: 0; font-size: 18px; margin-bottom: 20px;">📋 Your Inquiry Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: 600; color: #495057; width: 35%;">Reference ID:</td>
                <td style="padding: 10px 0; color: #6c757d; font-family: monospace; font-size: 14px;">${submission.id}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: 600; color: #495057;">Category:</td>
                <td style="padding: 10px 0; color: #2d5a45; font-weight: 500; text-transform: capitalize;">${submission.category}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 10px 0; font-weight: 600; color: #495057;">Subject:</td>
                <td style="padding: 10px 0; color: #495057;">${submission.subject}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #495057;">Submitted:</td>
                <td style="padding: 10px 0; color: #6c757d;">${new Date(submission.timestamp).toLocaleString('en-IN', { 
                  timeZone: 'Asia/Kolkata',
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
            </table>
          </div>
          
          <!-- What Happens Next -->
          <div style="background: linear-gradient(135deg, #fff3cd, #ffeaa7); border: 2px solid #ffd93d; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #856404; margin-top: 0; margin-bottom: 20px; font-size: 18px;">🕐 What happens next?</h3>
            <div style="display: grid; gap: 15px;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="background: #2d5a45; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">1</span>
                <p style="margin: 0; color: #856404; line-height: 1.6;">Our wellness team will review your inquiry within <strong>24 hours</strong></p>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="background: #2d5a45; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">2</span>
                <p style="margin: 0; color: #856404; line-height: 1.6;">You'll receive a <strong>personalized response</strong> with helpful guidance</p>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="background: #2d5a45; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0;">3</span>
                <p style="margin: 0; color: #856404; line-height: 1.6;">For urgent matters, call us at <strong>+91 9113920980</strong></p>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <span style="background: #2d5a45; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-center; font-size: 12px; font-weight: bold; flex-shrink: 0;">4</span>
                <p style="margin: 0; color: #856404; line-height: 1.6;">Follow <strong>@innerveda.in</strong> for daily wellness tips</p>
              </div>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div style="background: #f8f9fa; border: 2px solid #2d5a45; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #2d5a45; margin-top: 0; margin-bottom: 20px; font-size: 18px;">📞 Need immediate assistance?</h3>
            <div style="display: grid; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 18px;">📧</span>
                <span style="color: #495057;"><strong>Email:</strong> <a href="mailto:innervedacare@gmail.com" style="color: #2d5a45; text-decoration: none;">innervedacare@gmail.com</a></span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 18px;">📱</span>
                <span style="color: #495057;"><strong>Phone:</strong> <a href="tel:+919113920980" style="color: #2d5a45; text-decoration: none;">+91 9113920980</a></span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 18px;">🕒</span>
                <span style="color: #495057;"><strong>Hours:</strong> Monday-Saturday, 9 AM - 7 PM IST</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 18px;">👤</span>
                <span style="color: #495057;"><strong>Contact:</strong> Sonam Garg (Wellness Consultant)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 18px;">📷</span>
                <span style="color: #495057;"><strong>Social:</strong> <a href="https://instagram.com/innerveda.in" style="color: #2d5a45; text-decoration: none;">@innerveda.in</a></span>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="border-top: 2px solid #dee2e6; padding-top: 25px; text-align: center;">
            <p style="color: #6c757d; font-size: 16px; margin: 0 0 10px 0; font-weight: 500;">
              Thank you for choosing Inner Veda for your wellness journey
            </p>
            <p style="color: #6c757d; font-size: 14px; margin: 0 0 15px 0;">
              <strong>🍃 innerveda.in</strong> • Made with ❤️ for your wellness
            </p>
            <p style="color: #6c757d; font-size: 12px; margin: 0; line-height: 1.5;">
              This is an automated confirmation email. Please do not reply to this message.<br>
              For any queries, contact us at innervedacare@gmail.com
            </p>
          </div>
        </div>
      </div>
    `
  }
  
  console.log('📧 Attempting to send customer confirmation email to:', submission.email)
  
  try {
    console.log('📧 Sending customer confirmation via transporter...')
    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Customer confirmation email sent successfully!')
    console.log('📧 Customer email result:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    })
    return { success: true, messageId: result.messageId }
  } catch (error: any) {
    console.error('❌ Failed to send customer confirmation email!')
    console.error('📧 Customer email error details:', {
      message: error?.message || 'Unknown error',
      code: error?.code || 'N/A',
      command: error?.command || 'N/A',
      response: error?.response || 'N/A',
      responseCode: error?.responseCode || 'N/A',
      stack: error?.stack || 'N/A'
    })
    throw error
  }
}
