# BitBot - Complete Instructions & Reference Guide

## 📋 Quick Reference

### Live URLs:
- **Main Site (Share This):** https://emoggio.github.io/BitBot/
- **Admin Dashboard (Keep Secret!):** https://emoggio.github.io/BitBot/admin-secret-view.html
- **GitHub Repository:** https://github.com/emoggio/BitBot

### Files in This Project:
- `index.html` - Main chatbot page
- `style.css` - WhatsApp/iMessage-style dark theme
- `script.js` - Conversation logic and response tracking
- `admin-secret-view.html` - Secret dashboard to view responses
- `README.md` - Project documentation
- `WEBHOOK_SETUP.md` - Google Sheets integration guide
- `chat.txt` - Original conversation script (reference only)

---

## 🎯 What This Is

A mobile-first Valentine's Day proposal chatbot with:
- WhatsApp/iMessage-style interface
- "Bit the Bot" character with personality and humor
- Multiple conversation paths based on user choices:
  - **Direct Yes:** "Yes, I'd love that!"
  - **Negotiated Yes:** "I'm not sure…" → offers gifts → "Okay… maybe 😏"
  - **Declined:** "I'm not sure…" → "No, I'm sure."
- Text input for special requests (food, place, vibes, etc.)
- Response tracking with admin dashboard

---

## 🚀 How to Use

### Sharing the Link:
1. Share: `https://emoggio.github.io/BitBot/`
2. She'll see the chat interface with Bit the Bot
3. Messages appear one-by-one with typing indicators (realistic feel)
4. She can tap answer buttons to respond
5. At the end, she can type her special request

### Viewing Responses:
1. Go to: `https://emoggio.github.io/BitBot/admin-secret-view.html`
2. **Keep this URL completely secret!**
3. You'll see:
   - Total number of responses
   - Time of latest response
   - Full conversation path (which buttons she clicked)
   - Her typed special request
4. Auto-refreshes every 30 seconds
5. Can clear all responses with "Clear All" button

---

## 🛠️ Making Changes

### To Modify the Conversation:

1. Open `script.js`
2. Find the `conversation` object (starts around line 1)
3. Each step has this format:
```javascript
stepName: {
    messages: [
        "First message bubble",
        "Second message bubble",
        "Third message bubble"
    ],
    answers: [
        { text: "Button text 1", next: "nextStepName" },
        { text: "Button text 2", next: "anotherStep" }
    ]
}
```

4. To add text input, use:
```javascript
stepName: {
    messages: ["Your messages here"],
    showInput: true,
    next: "nextStep"
}
```

### To Change Colors:

Open `style.css`:
- **Bot messages:** Line 122 - `.message.bot .message-bubble { background: #1f2c33; }`
- **User messages:** Line 127 - `.message.user .message-bubble { background: #005c4b; }`
- **Background:** Line 7 - `body { background: #0d1418; }`
- **Bot avatar gradient:** Line 36 - `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`

### To Change Bot Name:

1. **index.html** line 18: `<h1>Bit</h1>` → Change to new name
2. **index.html** line 14: `<div class="avatar">B</div>` → Change initial
3. **index.html** line 8: `<title>Bit the Bot</title>` → Update title

---

## 📤 Deploying Changes to GitHub

After making any changes:

```bash
# 1. See what changed
git status

# 2. Stage all changes
git add .

# 3. Commit with a message
git commit -m "Description of what you changed"

# 4. Push to GitHub
git push

# 5. Wait 2-5 minutes for GitHub Pages to rebuild
```

### Check Deployment Status:
Go to: https://github.com/emoggio/BitBot/actions

You'll see the deployment progress. Green checkmark = live!

---

## 📊 Response Tracking

### Method 1: LocalStorage (Currently Active)

**How it works:**
- Saves responses to browser storage automatically
- View at: `admin-secret-view.html`
- Only accessible from your browser on your device
- Data persists unless you clear browser data

**What gets saved:**
```json
{
  "answer": "Her typed special request",
  "conversationPath": [
    { "choice": "Yes, I'd love that!", "destination": "yes" }
  ],
  "timestamp": "2026-02-12T10:30:00.000Z",
  "date": "2/12/2026, 10:30:00 AM"
}
```

**Pros:**
- Works immediately, no setup
- Free and private
- Shows full conversation path

**Cons:**
- Only works on one device/browser
- Can be lost if browser data is cleared

### Method 2: Google Sheets (Optional)

For permanent, cross-device storage, see `WEBHOOK_SETUP.md` for complete setup instructions.

**Summary:**
1. Create a Google Sheet
2. Add Apps Script webhook
3. Get webhook URL
4. Add URL to `script.js` (line ~190)
5. Push changes to GitHub

Then responses save to both LocalStorage AND Google Sheets!

---

## 🐛 Troubleshooting

### Site Shows 404 Error:
1. Check GitHub Pages is enabled: https://github.com/emoggio/BitBot/settings/pages
2. Make sure "Source" is set to "main" branch
3. Wait 5 minutes after pushing code
4. Check deployment status: https://github.com/emoggio/BitBot/actions
5. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Admin Dashboard Shows No Responses:
1. Make sure someone actually submitted the form (went through full conversation)
2. Open browser console (F12) to check for errors
3. Try on the same browser/device where the response was submitted (LocalStorage is per-browser)
4. Click "Refresh" button on admin dashboard

### Typing Indicators Too Fast/Slow:
In `script.js`, find this line (~line 50):
```javascript
const typingDelay = Math.min(Math.max(text.length * 30, 800), 2500);
```
- Change `30` to higher number for slower typing (more delay per character)
- Change `800` for minimum delay (milliseconds)
- Change `2500` for maximum delay (milliseconds)

### Messages Appear Too Quickly:
In `script.js`, find this line (~line 40):
```javascript
await delay(400 + Math.random() * 400);
```
- Change `400` values to higher numbers for longer pauses between messages

### Site Not Updating After Push:
1. Check GitHub Actions completed: https://github.com/emoggio/BitBot/actions
2. Wait full 5 minutes
3. Hard refresh browser (Ctrl+Shift+R)
4. Try incognito/private browsing window
5. Clear browser cache

### Google Sheets Not Receiving Data:
1. Verify webhook URL is correct in `script.js`
2. Make sure webhook is deployed as "Anyone" can access
3. Check Apps Script execution logs for errors
4. Test webhook URL directly (will show error page, but that's normal)

---

## 🔒 Security & Privacy

### Admin Dashboard:
- **Never share the admin URL publicly**
- Don't mention it in README or public docs
- Consider bookmarking instead of writing it down
- Can rename `admin-secret-view.html` to something obscure like `xyz789.html`

### Response Data:
- LocalStorage: Only accessible from your browser
- Google Sheets: Only accessible to you (unless you share the sheet)
- Webhook URL: Public but read-only (can only write data, not read it)

### Sensitive Information:
- Don't commit sensitive data to GitHub
- Don't hardcode passwords or API keys
- The current setup is safe for personal use

---

## 🎨 Customization Ideas

### Make it Your Own:
1. **Change the proposal message** - Edit conversation in `script.js`
2. **Add more conversation branches** - Add new steps to conversation object
3. **Change theme to light mode** - Update colors in `style.css`
4. **Add emojis to buttons** - Add emoji to answer text
5. **Rename the bot** - Change "Bit" to another name
6. **Add images/GIFs** - Add `<img>` tags to message bubbles
7. **Custom domain** - Set up custom domain in GitHub Pages settings

### Advanced:
- Add sound effects when messages arrive
- Add confetti animation when she says yes
- Send email notifications when response received
- Add more personality quirks to Bit's responses
- Create multiple language versions

---

## 📱 Testing

### Before Sharing:

1. **Test on your phone:**
   - Open site on mobile browser
   - Go through full conversation
   - Check if layout looks good
   - Test answer buttons work
   - Test text input works

2. **Test response tracking:**
   - Complete the conversation
   - Submit a test response
   - Check admin dashboard shows it
   - Verify conversation path is correct

3. **Test on different devices:**
   - iPhone Safari
   - Android Chrome
   - Desktop browsers (Chrome, Firefox, Safari, Edge)

4. **Test different paths:**
   - Try "Yes, I'd love that!" path
   - Try "I'm not sure" → "Okay… maybe" path
   - Try "I'm not sure" → "No, I'm sure" path

### Clear Test Data:

Before sharing with the real person:
1. Go to admin dashboard
2. Click "Clear All" button
3. Confirm deletion
4. Now all test responses are gone

---

## 📞 Next Steps & Ideas

### Immediate:
- [ ] Test the site thoroughly
- [ ] Test on mobile device
- [ ] Clear test responses from admin dashboard
- [ ] (Optional) Set up Google Sheets webhook
- [ ] Share the link!

### After She Responds:
- [ ] Check admin dashboard for her response
- [ ] Note which conversation path she took
- [ ] Read her special request
- [ ] Plan the actual date based on her preferences
- [ ] Follow up with her directly

### Future Enhancements:
- [ ] Add more conversation topics
- [ ] Create version 2.0 with different conversation
- [ ] Add photo of yourself to header
- [ ] Add countdown timer to Valentine's Day
- [ ] Create "accept calendar invite" feature

---

## 🤝 Getting Help

### Common Commands:

```bash
# See current status
git status

# View recent commits
git log --oneline -5

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Pull latest changes from GitHub
git pull

# Create a new branch
git checkout -b new-feature

# Switch back to main
git checkout main

# View remote URL
git remote -v
```

### Useful Links:
- GitHub Pages Docs: https://docs.github.com/en/pages
- Git Basics: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- HTML/CSS Reference: https://developer.mozilla.org/en-US/docs/Web
- JavaScript Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

## 📝 Notes for Later

### Current Configuration:
- Repository: https://github.com/emoggio/BitBot
- Branch: main
- GitHub Pages: Enabled, deploying from main branch
- Response Tracking: LocalStorage (active), Google Sheets (optional, not configured)
- Theme: Dark theme (WhatsApp-style)

### Files You Can Safely Edit:
- `script.js` - Conversation logic
- `style.css` - Visual styling
- `index.html` - Page structure (rarely needs changes)
- `README.md` - Public documentation

### Files to Keep Private:
- `admin-secret-view.html` - Don't share this file's URL
- `WEBHOOK_SETUP.md` - Contains setup instructions (safe to keep)
- `chat.txt` - Original script reference

### Files Git Ignores:
- `.gitignore` lists files not tracked by git
- Currently ignoring: chat.txt and local settings

---

## 🎉 Quick Start for Next Session

When you come back to this project:

```bash
# Navigate to project folder
cd C:\Users\eu.moggio\Desktop\BitBot

# Pull any changes from GitHub
git pull

# Make your changes to files...

# See what changed
git status

# Deploy changes
git add .
git commit -m "Your change description"
git push

# Wait 2-5 minutes, then check:
# https://emoggio.github.io/BitBot/
```

---

## ✨ Final Checklist Before Sharing

- [ ] Site loads without errors
- [ ] All conversation paths work
- [ ] Text input works
- [ ] Looks good on mobile
- [ ] Test responses appear in admin dashboard
- [ ] Cleared all test data
- [ ] Admin URL is saved somewhere private
- [ ] Ready to share: https://emoggio.github.io/BitBot/

---

**Good luck! 💘**

*Built with HTML, CSS, JavaScript, and a lot of Southern European charm.*
