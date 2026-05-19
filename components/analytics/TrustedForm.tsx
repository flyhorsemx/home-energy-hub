"use client"

import Script from "next/script"

/**
 * TrustedForm — required by most lead buyers (eLocal, Modernize, QuinStreet)
 * for TCPA compliance. Injects a hidden cert URL into the form so the
 * lead submission can include proof of consent.
 *
 * Activate by setting NEXT_PUBLIC_TRUSTED_FORM=true in your env.
 * The cert URL is captured via the hidden input #xxTrustedFormCertUrl.
 */
export default function TrustedForm() {
  if (process.env.NEXT_PUBLIC_TRUSTED_FORM !== "true") return null

  return (
    <Script id="trusted-form" strategy="afterInteractive">
      {`
        (function() {
          var field = 'xxTrustedFormCertUrl';
          var provideReferrer = false;
          var invertFieldSensitivity = false;
          var tf = document.createElement('script');
          tf.type = 'text/javascript';
          tf.async = true;
          tf.src = 'http' + ('https:' === document.location.protocol ? 's' : '') +
            '://api.trustedform.com/trustedform.js?provide_referrer=' +
            escape(provideReferrer) + '&field=' + escape(field) +
            '&l=' + new Date().getTime() + Math.random() +
            '&invert_field_sensitivity=' + invertFieldSensitivity;
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(tf, s);
        })();
      `}
    </Script>
  )
}
