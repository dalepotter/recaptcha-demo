// Extract site key from the reCAPTCHA script tag
function getSiteKey() {
  const scripts = document.querySelectorAll('script');
  for (let script of scripts) {
    const src = script.src;
    if (src.includes('recaptcha/api.js')) {
      const match = src.match(/render=([^&]+)/);
      if (match) {
        return match[1];
      }
    }
  }
  return null;
}

// Wait for reCAPTCHA to be ready
grecaptcha.ready(function () {
  console.log('reCAPTCHA is ready');
});

// Get DOM elements
const generateBtn = document.getElementById('generate-btn');
const actionInput = document.getElementById('action-name');
const loadingDiv = document.getElementById('loading');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const tokenDisplay = document.getElementById('token-display');
const tokenPlaceholder = document.getElementById('token-placeholder');
const copyBtn = document.getElementById('copy-btn');
const copyCurlBtn = document.getElementById('copy-curl-btn');

// Generate token on button click
generateBtn.addEventListener('click', async function () {
  const action = actionInput.value.trim() || 'submit';

  // Validate action name (alphanumeric and slashes only)
  if (!/^[a-zA-Z0-9_/]+$/.test(action)) {
    showError('Action name can only contain letters, numbers, underscores, and slashes');
    return;
  }

  // Hide previous results/errors
  hideAll();
  loadingDiv.classList.remove('hidden');

  try {
    // Get site key from script tag
    const siteKey = getSiteKey();
    if (!siteKey || siteKey === 'YOUR_SITE_KEY') {
      throw new Error('Please configure your reCAPTCHA site key in index.html');
    }

    // Execute reCAPTCHA
    const token = await grecaptcha.execute(siteKey, { action: action });

    // Display the token
    tokenDisplay.value = token;
    tokenPlaceholder.textContent = token;

    // Show result
    loadingDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');

    console.log('Token generated successfully:', token);
  } catch (error) {
    loadingDiv.classList.add('hidden');
    showError('Failed to generate token: ' + error.message);
    console.error('reCAPTCHA error:', error);
  }
});

// Copy token to clipboard
copyBtn.addEventListener('click', function () {
  tokenDisplay.select();
  navigator.clipboard.writeText(tokenDisplay.value)
    .then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy:', err);
      showError('Failed to copy to clipboard');
    });
});

// Copy cURL command to clipboard
copyCurlBtn.addEventListener('click', function () {
  const token = tokenDisplay.value;
  const curlCommand = `curl -X POST https://www.google.com/recaptcha/api/siteverify \\
  -d "secret=YOUR_SECRET_KEY" \\
  -d "response=${token}"`;

  navigator.clipboard.writeText(curlCommand)
    .then(() => {
      const originalText = copyCurlBtn.textContent;
      copyCurlBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyCurlBtn.textContent = originalText;
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy:', err);
      showError('Failed to copy to clipboard');
    });
});

// Helper function to show error
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

// Helper function to hide all status divs
function hideAll() {
  loadingDiv.classList.add('hidden');
  resultDiv.classList.add('hidden');
  errorDiv.classList.add('hidden');
}
