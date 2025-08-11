import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Starting email configuration test...')
    
    // Check environment variables
    const emailConfig = {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      from: process.env.EMAIL_FROM,
      fromName: process.env.EMAIL_FROM_NAME,
      adminEmail: process.env.ADMIN_EMAIL
    }
    
    console.log('🔧 Environment Variables Check:', {
      host: emailConfig.host,
      port: emailConfig.port,
      user: emailConfig.user,
      passwordSet: !!emailConfig.password,
      passwordLength: emailConfig.password?.length || 0,
      from: emailConfig.from,
      fromName: emailConfig.fromName,
      adminEmail: emailConfig.adminEmail
    })
    
    // Check for missing variables
    const missing = []
    if (!emailConfig.host) missing.push('EMAIL_HOST')
    if (!emailConfig.port) missing.push('EMAIL_PORT')
    if (!emailConfig.user) missing.push('EMAIL_USER')
    if (!emailConfig.password) missing.push('EMAIL_PASSWORD')
    if (!emailConfig.from) missing.push('EMAIL_FROM')
    if (!emailConfig.adminEmail) missing.push('ADMIN_EMAIL')
    
    if (missing.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        missing,
        message: 'Please check your .env.local file'
      }, { status: 400 })
    }
    
    // Create transporter with debugging
    console.log('📧 Creating email transporter...')
    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: parseInt(emailConfig.port || '587'),
      secure: false,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true,
      logger: true
    })
    
    // Test connection
    console.log('🔗 Testing SMTP connection...')
    await transporter.verify()
    console.log('✅ SMTP connection verified successfully!')
    
    // Send test email
    console.log('📤 Sending test email...')
    const testEmail = {
      from: `"${emailConfig.fromName}" <${emailConfig.from}>`,
      to: emailConfig.adminEmail,
      subject: '🧪 Test Email - Inner Veda Contact Form Setup',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2d5a45, #3b7057); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🧪 Email Test Successful!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #2d5a45; margin-top: 0;">Inner Veda Contact Form Email Setup</h2>
            
            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #155724; margin-top: 0;">✅ Email Configuration Working!</h3>
              <p style="color: #155724; margin: 0;">
                This test email confirms that your email configuration is working correctly. 
                Contact form submissions will now send notifications to this email address.
              </p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2d5a45; margin-top: 0;">📧 Configuration Details</h3>
              <ul style="color: #666; line-height: 1.6;">
                <li><strong>SMTP Host:</strong> ${emailConfig.host}</li>
                <li><strong>Port:</strong> ${emailConfig.port}</li>
                <li><strong>From Email:</strong> ${emailConfig.from}</li>
                <li><strong>Admin Email:</strong> ${emailConfig.adminEmail}</li>
                <li><strong>Test Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                🍃 Inner Veda Email System - Contact Form Ready!
              </p>
            </div>
          </div>
        </div>
      `
    }
    
    const result = await transporter.sendMail(testEmail)
    
    console.log('🎉 Test email sent successfully!')
    console.log('📧 Email result:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    })
    
    return NextResponse.json({
      success: true,
      message: 'Email test completed successfully!',
      details: {
        messageId: result.messageId,
        accepted: result.accepted,
        rejected: result.rejected,
        response: result.response,
        timestamp: new Date().toISOString(),
        config: {
          host: emailConfig.host,
          port: emailConfig.port,
          from: emailConfig.from,
          to: emailConfig.adminEmail
        }
      }
    })
    
  } catch (error: any) {
    console.error('❌ Email test failed!')
    console.error('📧 Test error details:', {
      message: error?.message || 'Unknown error',
      code: error?.code || 'N/A',
      command: error?.command || 'N/A',
      response: error?.response || 'N/A',
      responseCode: error?.responseCode || 'N/A',
      stack: error?.stack || 'N/A'
    })
    
    return NextResponse.json({
      success: false,
      error: 'Email test failed',
      details: {
        message: error?.message || 'Unknown error',
        code: error?.code || 'N/A',
        command: error?.command || 'N/A',
        response: error?.response || 'N/A',
        responseCode: error?.responseCode || 'N/A'
      }
    }, { status: 500 })
  }
}
