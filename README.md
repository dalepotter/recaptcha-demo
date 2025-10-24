# reCAPTCHA v3 Token Generator Demo

A simple frontend demo to generate reCAPTCHA v3 tokens that can be verified using the Google reCAPTCHA API.

## What is reCAPTCHA v3?

reCAPTCHA v3 is Google's invisible CAPTCHA solution that returns a score (0.0-1.0) for each request without user interaction. It helps you detect abusive traffic on your website without friction.

- **Score 1.0**: Very likely a good interaction
- **Score 0.0**: Very likely a bot

Unlike reCAPTCHA v2, v3 runs in the background and doesn't interrupt users with challenges.

## Prerequisites

To use this demo, you'll need:

- A Google account
- A registered site with reCAPTCHA v3 credentials

Get your reCAPTCHA keys at: https://www.google.com/recaptcha/admin
