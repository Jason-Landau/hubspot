# HubSpot Tracking for Google Tag Manager

A lightweight JavaScript utility collection that captures HubSpot form submissions and meeting bookings, pushing the field values to the Google Tag Manager dataLayer.

## Overview

This repository contains two tracking scripts:

1. **Form Submit Listener**: Captures form submission events and form field values
2. **Meeting Booking Listener**: Captures meeting booking events and contact information

Both scripts make HubSpot interaction data available in Google Tag Manager for advanced tracking, conversion optimization, and marketing attribution.

## Features

### Form Submit Listener
- Captures all form field values submitted by users
- Filters out the lengthy `hs_context` system data
- Works with all HubSpot forms (embedded, pop-up, inline)
- Compatible with multi-step forms

### Meeting Booking Listener
- Captures when users successfully book a meeting
- Extracts email address and contact information
- Includes meeting details (time, title) when available
- Works with all HubSpot scheduling pages

## Installation

### Google Tag Manager Setup

#### For Form Tracking
1. Log in to your Google Tag Manager account
2. Create a new Custom HTML tag
3. Name it "HubSpot Form Submit Listener"
4. Copy and paste the contents of `hubspot-form-submit-listener.js` into the HTML field
5. Set the trigger to fire on "All Pages" where your HubSpot forms appear
6. Save and publish your GTM container

#### For Meeting Tracking
1. Create another new Custom HTML tag
2. Name it "HubSpot Meeting Listener"
3. Copy and paste the contents of `hubspot-meeting-listener.js` into the HTML field
4. Set the trigger to fire on "All Pages" where your HubSpot meeting links/booking widgets appear
5. Save and publish your GTM container

### Advanced: Direct Website Integration

If you prefer to load the scripts directly on your website:

1. Copy the script files to your website
2. Add the following code before the closing `</body>` tag:
   ```html
   <script src="path/to/hubspot-form-submit-listener.js"></script>
   <script src="path/to/hubspot-meeting-listener.js"></script>
   ```

## How It Works

### Form Submit Listener
1. Listens for the HubSpot form `onFormSubmit` event via the browser's `message` event
2. Extracts all field values from the submission data
3. Removes the lengthy `hs_context` metadata
4. Pushes the data to the Google Tag Manager dataLayer with the event name `hubspot-form-success`

### Meeting Booking Listener
1. Listens for the HubSpot meeting `meetingBookSucceeded` event via the browser's `message` event
2. Extracts contact information (email, name, etc.) when available
3. Adds meeting details such as start time when available
4. Pushes the data to the Google Tag Manager dataLayer with the event name `hubspot-meeting-booked`

## DataLayer Structure

### Form Submissions
```javascript
window.dataLayer.push({
  'event': 'hubspot-form-success',
  'hs-form-guid': '[FORM_ID]',
  'form-values': {
    'firstname': 'John',
    'lastname': 'Doe',
    'email': 'john.doe@example.com',
    // All other form fields
  }
});
```

### Meeting Bookings
```javascript
window.dataLayer.push({
  'event': 'hubspot-meeting-booked',
  'meeting-scheduled': true,
  'meeting-email': 'john.doe@example.com',
  'meeting-firstname': 'John',
  'meeting-lastname': 'Doe',
  'meeting-starttime': '2023-09-15T14:00:00Z',
  'meeting-endtime': '2023-09-15T14:30:00Z',
  'meeting-title': 'Discovery Call'
});
```

## Google Tag Manager Usage

### Creating Variables

#### For Form Data
1. In GTM, go to Variables > New > Data Layer Variable
2. Name it something descriptive like "Form Email"
3. Set the Data Layer Variable Name to `form-values.email`
4. Save the variable

#### For Meeting Data
1. In GTM, go to Variables > New > Data Layer Variable
2. Name it something descriptive like "Meeting Email"
3. Set the Data Layer Variable Name to `meeting-email`
4. Save the variable

### Creating Triggers

#### For Form Submissions
1. Go to Triggers > New > Custom Event
2. Name it "HubSpot Form Success"
3. Set the Event Name to `hubspot-form-success`
4. Save the trigger

#### For Meeting Bookings
1. Go to Triggers > New > Custom Event
2. Name it "HubSpot Meeting Booked"
3. Set the Event Name to `hubspot-meeting-booked`
4. Save the trigger

## Using with Google Analytics 4

### For Form Submissions
1. Create a new GA4 Event Tag
2. Configure it to send an event when the "HubSpot Form Success" trigger fires
3. Add parameters using the form variables (email, name, etc.)

### For Meeting Bookings
1. Create a new GA4 Event Tag
2. Configure it to send an event when the "HubSpot Meeting Booked" trigger fires
3. Add parameters using the meeting variables (email, start time, etc.)

## Troubleshooting

If you're not seeing data in your dataLayer:

1. Ensure the scripts load before any HubSpot elements
2. Check the browser console for any JavaScript errors
3. Use GTM Preview mode to debug the data flow
4. Test the events on pages where the functionality is actually used

## Credits

Form tracking based on Kevin Leary's [HubSpot Form Tracking in Google Tag Manager](https://www.kevinleary.net/blog/hubspot-form-tracking-in-google-tag-manager/) methodology with improvements for the latest HubSpot API.

## License

MIT License - Use freely in your projects 