# BitBot - Bit the Bot 💘

A mobile-first Valentine's Day proposal chatbot with a WhatsApp/iMessage-style interface featuring "Bit" - a charming digital assistant with personality and humor.

## Features

- 📱 Mobile-first responsive design
- 💬 WhatsApp/iMessage-style chat interface
- 🤖 Realistic typing indicators and natural delays
- 💘 Charming Valentine's Day proposal conversation
- ⚡ Smooth animations and transitions
- 🎨 Dark theme with modern styling
- 👆 Tap-to-answer interaction
- ✍️ Text input for custom responses
- 😊 Witty personality and humor

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
