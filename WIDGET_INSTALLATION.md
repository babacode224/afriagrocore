# AfriAgroCore Feedback Widget - Installation Guide

## 🎯 Overview

The AfriAgroCore Feedback Widget is an embeddable JavaScript component that allows you to collect user feedback, ratings, and contact information on any website. All submissions are automatically stored in your database, and both you and your users receive email notifications.

## ✨ Features

- **5-Star Rating System**: Users can rate their experience from 1-5 stars
- **Contact Information Collection**: Name, email, and phone number
- **Comment/Feedback Box**: Detailed feedback from users
- **Automatic Email Notifications**:
  - Users receive a thank-you email and newsletter confirmation
  - Admins receive notifications with full submission details
- **Admin Dashboard**: View all submissions at `/admin/feedback`
- **Mobile Responsive**: Works perfectly on all devices
- **Easy Integration**: Just one line of code

## 📦 Installation

### Step 1: Copy the Embed Code

Add this single line of code to any webpage where you want the feedback widget to appear:

```html
<script src="https://your-afriagrocore-domain.com/widget/feedback.js"></script>
```

### Step 2: Place the Code

Paste the script tag just before the closing `</body>` tag in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Your Page</title>
</head>
<body>
  <!-- Your page content here -->
  
  <!-- Feedback Widget - Place before closing body tag -->
  <script src="https://your-afriagrocore-domain.com/widget/feedback.js"></script>
</body>
</html>
```

### Step 3: Test It!

1. Load your webpage
2. Look for the green chat button (💬) in the bottom-right corner
3. Click it to open the feedback form
4. Fill out the form and submit
5. Check your email for the admin notification
6. View the submission in your dashboard at `/admin/feedback`

## 🎨 Widget Appearance

The widget appears as:
- **Closed State**: A floating green button with a chat icon (💬) in the bottom-right corner
- **Open State**: A feedback form with:
  - Name field
  - Email field
  - Phone number field
  - 5-star rating selector
  - Comment text area
  - Submit button

## 📧 Email Notifications

### User Email (Automatic)
When a user submits feedback, they receive:
- Thank you message
- Confirmation of their feedback
- Newsletter subscription confirmation
- Copy of their rating and comment

### Admin Email (Automatic)
You receive:
- User's name, email, and phone number
- Star rating
- Full comment
- Source URL (where the feedback was submitted)
- Timestamp

## 📊 Viewing Submissions

Access the admin dashboard to view all feedback:

```
https://your-afriagrocore-domain.com/admin/feedback
```

The dashboard shows:
- Total submissions count
- Average rating
- Number of 5-star reviews
- Email delivery status
- Full details of each submission
- Ability to contact submitters directly

## 🧪 Testing

### Demo Page
Visit the demo page to see the widget in action:

```
https://your-afriagrocore-domain.com/widget-demo.html
```

### Test Submission
1. Fill out the form with test data
2. Check that emails are sent correctly
3. Verify submission appears in `/admin/feedback`
4. Confirm all data is captured properly

## 🔧 Technical Details

### Database Table
Submissions are stored in the `feedback_submissions` table with:
- `id`: Auto-increment primary key
- `name`: User's name
- `email`: User's email address
- `phoneNumber`: User's phone number
- `rating`: Star rating (1-5)
- `comment`: Feedback text
- `sourceUrl`: URL where widget was embedded
- `ipAddress`: Submitter's IP address
- `userAgent`: Browser information
- `emailSent`: Email delivery status
- `createdAt`: Submission timestamp

### API Endpoint
- **Endpoint**: `/api/trpc/feedback.submit`
- **Method**: POST
- **Authentication**: None required (public endpoint)
- **Rate Limiting**: Handled by server

### Email Service
Uses your existing Gmail SMTP configuration:
- **From**: Your configured SMTP_USER
- **To (User)**: Submitter's email
- **To (Admin)**: info@africybercore.com

## 🚀 Deployment Checklist

- [ ] Widget script is accessible at `/widget/feedback.js`
- [ ] Database table `feedback_submissions` exists
- [ ] Email SMTP credentials are configured
- [ ] Admin dashboard route `/admin/feedback` is accessible
- [ ] Test submission completes successfully
- [ ] Both user and admin emails are received
- [ ] Submission appears in admin dashboard

## 🛠️ Customization

The widget is pre-styled with AfriAgroCore branding (green colors). If you need to customize:

1. Edit `/client/public/widget/feedback.js`
2. Modify the CSS styles in the `createWidget()` function
3. Change colors, fonts, positioning as needed
4. Redeploy the updated widget file

## 📱 Browser Compatibility

The widget works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

- Form inputs are validated on both client and server
- Email addresses are verified
- SQL injection protection via Drizzle ORM
- XSS protection via input sanitization
- CORS configured for cross-origin requests

## 💡 Tips

1. **Placement**: The widget works best on pages where users have completed an action (after purchase, after reading content, etc.)
2. **Timing**: Consider adding the widget to thank-you pages or confirmation pages
3. **Multiple Pages**: You can add the widget to multiple pages on your site
4. **External Sites**: Works on any website, not just your AfriAgroCore domain

## 🆘 Troubleshooting

### Widget doesn't appear
- Check browser console for errors
- Verify the script URL is correct
- Ensure JavaScript is enabled

### Form submission fails
- Check network tab for API errors
- Verify database connection
- Check SMTP email configuration

### Emails not received
- Check spam/junk folders
- Verify SMTP credentials in environment variables
- Check email logs in admin dashboard

## 📞 Support

For issues or questions:
- View submissions: `/admin/feedback`
- Check email logs: `/admin/email-logs`
- Review server logs for errors

---

**Ready to collect feedback?** Just add the script tag and start receiving valuable insights from your users! 🌱
