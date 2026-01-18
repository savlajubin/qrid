export function validatePreset(preset, form) {
  switch (preset) {
    case "url":
      if (!form.url.trim()) {
        return "Website URL is required";
      }
      if (!/^https?:\/\//i.test(form.url)) {
        return "URL must start with http:// or https://";
      }
      return "";

    case "text":
      if (!form.text.trim()) {
        return "Text cannot be empty";
      }
      return "";

    case "upi":
      if (!form.upi.pa.trim()) {
        return "UPI ID is required";
      }
      if (!form.upi.pa.includes("@")) {
        return "Invalid UPI ID (missing @)";
      }
      return "";

    case "wifi":
      if (!form.wifi.ssid.trim()) {
        return "WiFi SSID is required";
      }
      return "";

    case "vcard":
      if (!form.vcard.name.trim()) {
        return "Name is required for vCard";
      }
      return "";

    default:
      return "";
  }
}
