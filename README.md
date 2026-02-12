# BitBot - Bit the Bot 💘

A mobile-first Valentine's Day proposal chatbot with a WhatsApp/iMessage-style interface featuring "Bit" - a charming digital assistant with personality and humor.

## Features

- 📱 Mobile-first responsive design
- 💬 WhatsApp/iMessage-style chat interface
- 🤖 Realistic typing indicators and natural delays
- 💘 Charming Valentine's Day proposal conversation
- ⚡ Smooth animations and transitions
- 🎨 Pink/purple Valentine's Day theme with floating hearts
- 👆 Tap-to-answer interaction
- ✍️ Text input for custom responses
- 😊 Witty personality and humor
- 🔍 **Visitor tracking** - Detects returning visitors and prevents duplicate responses
- 🌐 **IP tracking** - Records visitor IP addresses for identification
- 🔄 **Smart handling** - Custom message for users who change their mind

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling (WhatsApp/iMessage-inspired dark theme)
- `script.js` - Bot conversation logic and interactions
- `admin-secret-view.html` - Private admin dashboard (keep URL secret!)
- `WEBHOOK_SETUP.md` - Instructions for response tracking setup

## How to Deploy to GitHub Pages

1. **Initialize git in this directory**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Bit the Bot Valentine's chatbot"
   ```

2. **Connect to GitHub and push**
   ```bash
   git branch -M main
   git remote add origin https://github.com/emoggio/BitBot.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings: https://github.com/emoggio/BitBot/settings/pages
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: `https://emoggio.github.io/BitBot/`

## Customization

### Modifying the Conversation

Edit `script.js` and modify the conversation steps:

```javascript
stepName: {
    messages: [
        "First message",
        "Second message",
        "Third message"
    ],
    answers: [
        { text: "Option 1", next: "nextStepName" },
        { text: "Option 2", next: "anotherStepName" }
    ]
}
```

For text input steps, add `showInput: true` and specify the next step.

### Changing Colors

Edit `style.css`:
- Bot messages: `.message.bot .message-bubble { background: #1f2c33; }`
- User messages: `.message.user .message-bubble { background: #005c4b; }`
- Background: `body { background: #0d1418; }`

### Changing Bot Name

1. In `index.html`: Change `<h1>Bit</h1>` to your desired name
2. In `index.html`: Change `<title>Chat with Bit</title>`
3. Update the avatar letter in `<div class="avatar">B</div>`

## Visitor Tracking System

BitBot includes a smart visitor tracking system that:

### How It Works

1. **First Visit**: When someone visits for the first time:
   - Generates a unique visitor ID stored in browser localStorage
   - Records their IP address (via ipify API)
   - Saves their response with all metadata

2. **Return Visit**: If the same person visits again from the same device:
   - Detects they've been here before
   - Shows a custom "changing your mind?" message from Bit
   - Deletes their previous response
   - Saves only their newest response

3. **Data Collected**:
   - Visit ID (unique per device/browser)
   - IP address
   - Conversation path (choices made)
   - Final response text
   - Timestamp
   - User agent
   - Returning visitor flag

### Admin Dashboard

View all responses at `admin-secret-view.html` (keep this URL secret!):
- Total response count
- Returning visitor count
- Latest response time
- Full conversation paths
- IP addresses
- Visit IDs
- Returning visitor badges

### Privacy Notes

- Data is stored in browser localStorage (client-side)
- IP addresses are fetched from ipify.org
- No server-side database by default
- Set up webhook (see WEBHOOK_SETUP.md) to send data to Google Sheets

## Testing Locally

Simply open `index.html` in your web browser. No server needed!

## Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## License

Free to use and modify!
