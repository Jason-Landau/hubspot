/***
 * HubSpot Form Tracking for Google Tag Manager
 * Based on: https://www.kevinleary.net/blog/hubspot-form-tracking-in-google-tag-manager/
 * HubSpot API Docs: https://developers.hubspot.com/docs/guides/api/marketing/forms/global-form-events
 */

(function(window, document) {
  // Serialize form data to array
  function serializeArray(form) {
    var arr = [];
    Array.prototype.slice.call(form.elements).forEach(function(field) {
      if (!field.name || field.disabled || ["file", "reset", "submit", "button"].indexOf(field.type) > -1) return;
      if (field.type === "select-multiple") {
        Array.prototype.slice.call(field.options).forEach(function(option) {
          if (!option.selected) return;
          arr.push({
            name: field.name,
            value: option.value,
          });
        });
        return;
      }

      if (["checkbox", "radio"].indexOf(field.type) > -1 && !field.checked) return;

      arr.push({
        name: field.name,
        value: field.value,
      });
    });
    return arr;
  }

  // Empty object check
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  // Capture <form> data as JSON
  function formdata($form) {
    var array = serializeArray($form);
    var json = {};

    array.forEach(function(field, index) {
      var name = field.name;
      if (name.indexOf("recaptcha") !== -1) return;
      if (name.indexOf("hs_context") !== -1) return;
      if (name.indexOf("/") !== -1) {
        name = name.split("/")[1];
      }
      json[name] = field.value;
    });

    return json;
  }

  // Store form input data
  var formInput = {};

  // Capture form inputs when available
  document.addEventListener("input", function(event) {
    if (event.target.form && event.target.form.getAttribute("id") && event.target.form.getAttribute("id").indexOf("hsForm_") !== -1) {
      formInput = formdata(event.target.form);
    }
  });

  // Listen for form submissions via HubSpot message events
  window.addEventListener("message", function(event) {
    // Important: The field values are available in the onFormSubmit event (NOT onFormSubmitted)
    if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
      // Extract form values from the data array - this contains all submitted fields
      var formValues = {};
      
      // Check if data is available in the event
      if (event.data.data && Array.isArray(event.data.data)) {
        // Process all field values
        event.data.data.forEach(function(field) {
          if (field.name && field.value) {
            // Skip hs_context field
            if (field.name === 'hs_context') return;
            
            // Extract field name (removing any path prefix if present)
            var fieldName = field.name;
            if (fieldName.indexOf("/") !== -1) {
              fieldName = fieldName.split("/")[1];
            }
            formValues[fieldName] = field.value;
          }
        });
      }
      
      // Push to dataLayer with all form values
      window.dataLayer.push({
        'event': 'hubspot-form-success',
        'hs-form-guid': event.data.id,
        'form-values': formValues
      });
    }
  });
})(window, document);
