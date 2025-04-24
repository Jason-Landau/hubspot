# HubSpot Form Submit Listener for Google Tag Manager

A lightweight JavaScript utility that captures HubSpot form submissions and pushes the field values to the Google Tag Manager dataLayer.

## Overview

This script listens for HubSpot form submission events and captures all submitted field values, making them available in Google Tag Manager for advanced tracking, conversion optimization, and marketing attribution.

## Features

- Captures all form field values submitted by users
- Filters out the lengthy `hs_context` system data
- Works with all HubSpot forms (embedded, pop-up, inline)
- Compatible with multi-step forms
- Lightweight with no dependencies
- No need to modify your existing HubSpot forms

## Installation

### Google Tag Manager Setup

1. Log in to your Google Tag Manager account
2. Create a new Custom HTML tag
3. Name it "HubSpot Form Submit Listener"
4. Copy and paste the contents of `hubspot-form-submit-listener.js` into the HTML field
5. Set the trigger to fire on "All Pages" where your HubSpot forms appear
6. Save and publish your GTM container

### Advanced: Direct Website Integration

If you prefer to load the script directly on your website:

1. Copy the `hubspot-form-submit-listener.js` file to your website
2. Add the following code before the closing `</body>` tag:
   ```html
   <script src="path/to/hubspot-form-submit-listener.js"></script>
   ```

## How It Works

The script:

1. Listens for the HubSpot form `onFormSubmit` event via the browser's `message` event
2. Extracts all field values from the submission data
3. Removes the lengthy `hs_context` metadata
4. Pushes the data to the Google Tag Manager dataLayer with the event name `hubspot-form-success`

## DataLayer Structure

When a form is submitted, the following data is pushed to the dataLayer:

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

## Google Tag Manager Usage

### Accessing Form Values

You can access submitted form values in your GTM tags using the following variable format:

- Form email: `{{form-values.email}}`
- First name: `{{form-values.firstname}}`
- Last name: `{{form-values.lastname}}`
- Any other field: `{{form-values.FIELD_NAME}}`

### Creating Variables

1. In GTM, go to Variables > New > Data Layer Variable
2. Name it something descriptive like "Form Email"
3. Set the Data Layer Variable Name to `form-values.email`
4. Save the variable

### Creating Triggers

1. Go to Triggers > New > Custom Event
2. Name it "HubSpot Form Success"
3. Set the Event Name to `hubspot-form-success`
4. Save the trigger

## Using with Google Analytics 4

You can use this script to send form submission data to GA4:

1. Create a new GA4 Event Tag
2. Configure it to send an event when the "HubSpot Form Success" trigger fires
3. Add parameters using the variables you created (email, name, etc.)

## Advanced Configuration

The script is designed to work out-of-the-box with minimal configuration. However, you can modify it to:

- Change the event name from `hubspot-form-success` to something else
- Filter specific fields beyond just `hs_context`
- Add additional dataLayer information

## Troubleshooting

If you're not seeing form data in your dataLayer:

1. Ensure the script loads before any HubSpot forms
2. Check the browser console for any JavaScript errors
3. Verify the HubSpot form is using the current version of the HubSpot form API
4. Test in GTM Preview mode to see if the event fires correctly

## Credits

Based on Kevin Leary's [HubSpot Form Tracking in Google Tag Manager](https://www.kevinleary.net/blog/hubspot-form-tracking-in-google-tag-manager/) methodology with improvements for the latest HubSpot API.

## License

MIT License - Use freely in your projects 