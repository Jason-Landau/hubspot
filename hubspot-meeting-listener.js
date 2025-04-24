/***
 * HubSpot Meeting Booking Tracking for Google Tag Manager
 * Captures meeting booking events and relevant contact information
 */
(function(window, document) {
  // Listen for HubSpot meeting booking events
  window.addEventListener('message', function(event) {
    // Check if this is a meeting booking success event
    if (event.data.meetingBookSucceeded) {
      // Create base data object for GTM
      var meetingData = {
        'event': 'hubspot-meeting-booked',
        'meeting-scheduled': true
      };
      
      // Try to extract contact information from the meeting booking payload
      try {
        // Get the full response payload
        var payload = event.data.meetingsPayload;
        
        // Extract data if available
        if (payload && payload.bookingResponse && payload.bookingResponse.postResponse) {
          var contact = payload.bookingResponse.postResponse.contact;
          
          // Add contact information if available
          if (contact) {
            if (contact.email) meetingData['meeting-email'] = contact.email;
            if (contact.firstName) meetingData['meeting-firstname'] = contact.firstName;
            if (contact.lastName) meetingData['meeting-lastname'] = contact.lastName;
            if (contact.phone) meetingData['meeting-phone'] = contact.phone;
          }
          
          // Add meeting information if available
          var meeting = payload.bookingResponse.postResponse.meeting;
          if (meeting) {
            if (meeting.startTime) meetingData['meeting-starttime'] = meeting.startTime;
            if (meeting.endTime) meetingData['meeting-endtime'] = meeting.endTime;
            if (meeting.meetingTitle) meetingData['meeting-title'] = meeting.meetingTitle;
          }
        }
      } catch (error) {
        console.log('Error extracting meeting data:', error);
      }
      
      // Push the data to GTM dataLayer
      window.dataLayer.push(meetingData);
    }
  });
})(window, document);