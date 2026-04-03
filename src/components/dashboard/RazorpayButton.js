import React, { useEffect, useRef } from 'react';

export default function RazorpayButton({ buttonId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', buttonId);
    script.async = true;

    // Use a unique ID to avoid duplicates if component re-renders
    const form = document.createElement('form');
    form.appendChild(script);

    containerRef.current.appendChild(form);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [buttonId]);

  return <div ref={containerRef} className="razorpay-btn-container" />;
}
