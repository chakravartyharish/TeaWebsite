import { NextRequest, NextResponse } from 'next/server'
import { sendAdminNotification, sendCustomerConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, subject, message, category } = body
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, and message are required' },
        { status: 400 }
      )
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Create contact submission object
    const contactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: body.phone?.trim() || '',
      subject: subject.trim(),
      category: category || 'general',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'new',
      source: 'website_contact_form'
    }
    
    // Log the submission
    console.log('🍃 New Contact Form Submission:', {
      id: contactSubmission.id,
      name: contactSubmission.name,
      email: contactSubmission.email,
      category: contactSubmission.category,
      subject: contactSubmission.subject,
      timestamp: contactSubmission.timestamp
    })
    
    // Send email notification to admin
    try {
      await sendAdminNotification(contactSubmission)
      await sendCustomerConfirmation(contactSubmission)
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Continue processing even if email fails
    }
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate response based on category
    let autoReplyMessage = ''
    let estimatedResponseTime = '24 hours'
    
    switch (category) {
      case 'product':
        autoReplyMessage = 'Thank you for your product inquiry! Our wellness expert will provide detailed information about A-ZEN and help you choose the best options for your health journey.'
        estimatedResponseTime = '12 hours'
        break
      case 'order':
        autoReplyMessage = 'We\'ve received your order support request. Our customer care team will review your order details and provide assistance promptly.'
        estimatedResponseTime = '6 hours'
        break
      case 'health':
        autoReplyMessage = 'Thank you for reaching out about health and wellness. Our certified wellness consultant will provide personalized guidance based on your needs.'
        estimatedResponseTime = '12 hours'
        break
      case 'wholesale':
        autoReplyMessage = 'Thank you for your wholesale inquiry! Our business development team will contact you with pricing, minimum orders, and partnership details.'
        estimatedResponseTime = '48 hours'
        break
      case 'media':
        autoReplyMessage = 'Thank you for your media inquiry. Our PR team will get back to you with press materials and interview availability.'
        estimatedResponseTime = '24 hours'
        break
      default:
        autoReplyMessage = 'Thank you for contacting Inner Veda! We\'ve received your message and our team will respond with helpful information soon.'
        estimatedResponseTime = '24 hours'
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        submissionId: contactSubmission.id,
        autoReply: autoReplyMessage,
        estimatedResponseTime,
        nextSteps: [
          'Check your email for an auto-reply confirmation',
          `Expect a personal response within ${estimatedResponseTime}`,
          'Follow up at innervedacare@gmail.com if urgent',
          'Join @innerveda.in on social media for wellness tips'
        ],
        contactInfo: {
          email: 'innervedacare@gmail.com',
          phone: '9113920980',
          hours: 'Mon-Sat, 9 AM - 7 PM IST',
          socialMedia: '@innerveda.in'
        }
      }
    })
    
  } catch (error) {
    console.error('❌ Contact form submission error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again or contact us directly at innervedacare@gmail.com',
        fallbackContact: {
          email: 'innervedacare@gmail.com',
          phone: '9113920980'
        }
      },
      { status: 500 }
    )
  }
}
