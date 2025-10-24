# reCAPTCHA v3 Token Generator Demo

A simple frontend demo to generate reCAPTCHA v3 tokens that can be verified using the Google reCAPTCHA API.

## What is reCAPTCHA v3?

reCAPTCHA v3 is Google's invisible CAPTCHA solution that returns a score (0.0-1.0) for each request without user interaction. It helps you detect abusive traffic on your website without friction.

- **Score 1.0**: Very likely a good interaction
- **Score 0.0**: Very likely a bot

Unlike reCAPTCHA v2, v3 runs in the background and doesn't interrupt users with challenges.

## Features

- **Simple Interface**: Clean, modern UI with gradient background
- **Custom Actions**: Specify different action names for different user interactions
- **Token Generation**: Generate reCAPTCHA v3 tokens with a single click
- **Copy to Clipboard**: Easy copy functionality for tokens and cURL commands
- **cURL Command Template**: Pre-filled verification command with your generated token
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Clear error messages and validation
- **Auto-Deploy**: Automatic deployment to GitHub Pages via GitHub Actions

## Prerequisites

To use this demo, you'll need:

- A Google account
- A registered site with reCAPTCHA v3 credentials

Get your reCAPTCHA keys at: https://www.google.com/recaptcha/admin

## Setup

### 1. Register Your Site with reCAPTCHA v3

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click the **+** button to register a new site
3. Fill in the registration form:
   - **Label**: Give your site a name (e.g., "reCAPTCHA v3 Demo")
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add both (without `http://` or `https://` prefix):
     - `localhost` - for local testing
     - `<your-username>.github.io` - for GitHub Pages deployment
   - **Accept the terms** and click **Submit**
4. You'll receive two keys:
   - **Site Key** (public) - Used in the frontend
   - **Secret Key** (private) - Used for verification API calls

### 2. Configure the Site Key

1. Open `index.html` in a text editor
2. Find this line near the bottom:
   ```html
   <script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
   ```
3. Replace `YOUR_SITE_KEY` with your actual site key from step 1
4. Save the file

### 3. Local Testing

You can run this demo locally in several ways:

**Option A: Direct File Access**
- Simply open `index.html` in your web browser
- Note: Some browsers may restrict reCAPTCHA on `file://` protocol

**Option B: Local HTTP Server (Recommended)**

Using Node.js:
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run server
http-server -p 8000

# Then visit: http://localhost:8000
```

Using Python:
```bash
# Python 3
python -m http.server 8001

# Then visit: http://localhost:8001
```

## Usage

### Generating Tokens

1. Open the web page in your browser
2. Enter an **Action Name** (or use the default "submit")
   - Action names help you track different user interactions
   - Examples: `login`, `checkout`, `contact`, `vote`
   - Must contain only letters, numbers, underscores, and slashes
3. Click **Generate Token**
4. The reCAPTCHA v3 token will appear in the text area
5. Use the **Copy Token** button to copy it to your clipboard

### Verifying Tokens with cURL

Once you have a token, verify it with Google's API using your **secret key**:

```bash
curl -X POST https://www.google.com/recaptcha/api/siteverify \
  -d "secret=YOUR_SECRET_KEY" \
  -d "response=YOUR_GENERATED_TOKEN"
```

**Example Response:**
```json
{
  "success": true,
  "challenge_ts": "2024-01-15T10:30:00Z",
  "hostname": "localhost",
  "score": 0.9,
  "action": "submit"
}
```

### Understanding the Response

| Field | Description |
|-------|-------------|
| `success` | Whether the token is valid (`true` or `false`) |
| `score` | A score between 0.0 (bot) and 1.0 (human) |
| `action` | The action name you specified when generating the token |
| `challenge_ts` | Timestamp of the challenge |
| `hostname` | The hostname where the token was generated |
| `error-codes` | Array of error codes (if `success` is `false`) |

### Interpreting reCAPTCHA v3 Scores

reCAPTCHA v3 returns a score based on interactions with your site:

| Score Range | Interpretation | Recommended Action |
|-------------|----------------|-------------------|
| 0.9 - 1.0 | Very likely human | Allow without friction |
| 0.7 - 0.8 | Likely human | Allow, maybe add minor verification |
| 0.5 - 0.6 | Uncertain | Add additional verification (email, 2FA) |
| 0.0 - 0.4 | Likely bot | Block or require strong verification |

**Important Notes:**
- There's no "passing" score - you decide the threshold for your use case
- Scores can vary based on user behavior patterns
- Google recommends using 0.5 as a starting threshold
- Different actions can have different threshold requirements
- Monitor your scores over time to adjust thresholds

## Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on every push to the `main` branch

### Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
- Trigger on every push to `main` branch
- Deploy the static files to GitHub Pages
- Make your demo available at: `https://<your-username>.github.io/recaptcha-demo`

### Manual Deployment

You can also trigger a deployment manually:
1. Go to **Actions** tab in your GitHub repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### Live Demo

Once deployed, your site will be available at:
```
https://<your-username>.github.io/recaptcha-demo
```

**Note**: Make sure you've added your GitHub Pages domain to the reCAPTCHA allowed domains list (see Setup step 1.3).
