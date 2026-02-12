# BitBot - Bit the Bot 💘

A mobile-first Valentine's Day proposal chatbot with a WhatsApp-style interface featuring "Bit" - a charming digital assistant with personality and humor. Built for a special Valentine's Day proposal!

## 🌟 Features

### Core Experience
- 📱 **Mobile-first responsive design** - Optimized for all devices
- 💬 **WhatsApp-style chat interface** - Familiar, comfortable UI with Roboto font
- 🤖 **Natural conversation flow** - Realistic typing indicators with varied delays
- 💘 **Charming Valentine's proposal** - Witty, self-aware bot personality
- 🤌 **Italian charm** - Humorous cultural references

### Visual Design
- 🎨 **Purple/pink Valentine's theme** - Romantic gradient background
- 💕 **Floating hearts animation** - Subtle background hearts
- 🎉 **Easter egg celebration** - 20 animated hearts pop up when saying "yes" immediately!
- ✨ **Screen flash effect** - Pink celebration flash on instant acceptance
- 🫧 **Bubble message stacking** - WhatsApp-like message grouping with smart corner rounding
- 🎯 **Right-aligned buttons** - Auto-width, highly rounded (24px) action buttons

### Smart Tracking
- 🔍 **Visitor tracking** - Unique ID per device/browser
- 🌐 **IP address recording** - Automatic IP capture via ipify API
- 🔄 **Returning visitor detection** - Special message for second visits
- 💾 **Response management** - Only keeps latest response per visitor
- 📊 **Admin dashboard** - Full visibility into all responses

### Admin Features
- 🆔 **Visitor ID reset** - Test returning visitor flow
- 🗑️ **Complete reset** - Clear all data for fresh testing
- 📈 **Live statistics** - Response count, returning visitors, timing
- 🎯 **Visitor status indicator** - See if you're tracked (🔴) or fresh (🟢)

## 📁 Files

- `index.html` - Main HTML structure
- `style.css` - Complete styling (WhatsApp-inspired with Valentine's theme)
- `script.js` - Bot conversation logic, tracking, and interactions
- `admin-secret-view.html` - Private admin dashboard (**keep URL secret!**)
- `chat.txt` - Conversation flow reference
- `WEBHOOK_SETUP.md` - Google Sheets integration instructions
- `INSTRUCTIONS.md` - Detailed project documentation

## 🚀 Live Deployment

**Main Site:** https://emoggio.github.io/BitBot/

**Admin Dashboard:** https://emoggio.github.io/BitBot/admin-secret-view.html

## 🎯 How to Use

### For the Recipient
1. Visit the main URL
2. Chat with Bit the Bot
3. Make your choice!
4. If you said yes, provide special requests

### For the Creator (You!)
1. **Check responses:** Visit admin dashboard
2. **See stats:** Total responses, returning visitors, latest timing
3. **View details:** IP addresses, visit IDs, conversation paths
4. **Test flow:** Use "Reset Visitor ID" to test returning visitor experience
5. **Fresh start:** Use "Clear All" to completely reset for testing

## 🎭 Easter Eggs

### Celebration Animation
When someone clicks **"Yes, I'd love that"** immediately (first question):
- 20 pink gradient hearts pop up from bottom
- Hearts float upward with rotation and scaling
- Pink screen flash effect
- Staggered timing for organic feel
- Only triggers on immediate "yes" (not after uncertainty)

### Returning Visitor Message
If someone visits again (same device):
```
"Oh. It's you again."
"Having a change of heart? 🤔"
"I'll make sure your last response gets deleted..."
"He is Italian like I said and needs all the help he can get."
"Again… not my opinion. I am just a mere AI. 🤖"
```

## 🔐 Visitor Tracking System

### How It Works

**First Visit:**
1. Generates unique visitor ID → stored in localStorage
2. Fetches IP address from ipify.org API
3. Saves response with metadata:
   - Visit ID
   - IP address
   - Conversation path (all choices made)
   - Final text response
   - Timestamp
   - User agent
   - Returning visitor flag (false)

**Return Visit:**
1. Detects existing visitor ID
2. Shows custom "change of heart" message
3. Deletes previous response
4. Saves new response with `isReturningVisitor: true`

### Admin Dashboard Features

Navigate to `admin-secret-view.html` to see:

**Statistics:**
- Total Responses
- Returning Visitors count
- Latest Response timing
- Your Visitor Status (tracked/fresh)

**Response Details:**
- 📅 Timestamp
- 🌐 IP address
- 🆔 Visit ID
- 🗺️ Full conversation path
- 💬 Special requests
- 🔄 Returning visitor badge (if applicable)

**Controls:**
- 🔄 **Refresh** - Reload latest data
- 🆔 **Reset Visitor ID** - Clear your ID to test returning visitor flow
- 🗑️ **Clear All** - Delete all responses AND visitor IDs for fresh start

### Privacy Notes
- All data stored in browser localStorage (client-side only)
- IP addresses fetched from public ipify.org API
- No server-side database by default
- Optional webhook integration to Google Sheets (see WEBHOOK_SETUP.md)

## 🎨 Design Specifications

### Typography
- **Font:** Roboto (Google Fonts)
- **Base size:** 14px
- **Bubble text:** 14px (13px on mobile)
- **Buttons:** 14px
- **Line height:** 1.4

### Colors
```css
/* Background */
Purple/Magenta gradient: #1a0f1f → #2d1233 → #1a0f1f → #251429
Radial glows: rgba(139, 69, 139, 0.3)

/* Bubbles */
Bot: #2a2438 → #1f2c33 gradient
User: #c94b7a → #8e3557 gradient

/* Buttons */
Background: #2a2438 → #1f2c33 gradient
Border: rgba(255, 107, 157, 0.4)
Send button: #ff6b9d → #c94b7a gradient

/* Hearts */
Celebration: #ff6b9d → #ff1493 gradient
Background: rgba(255, 107, 157, 0.6)
```

### Border Radius
- Message bubbles: 20px (with smart stacking)
- Buttons: 24px
- Avatar: 50% (circle)
- Input fields: 16px

### Animations
- Message slide-in: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)
- Button slide-in: 0.4s with staggered delays
- Typing indicator: 1.4s infinite pulse
- Celebration hearts: 3s float with rotation
- Screen flash: 0.6s fade

## 🧪 Testing Workflow

### Test First-Time Visitor
1. Go to admin dashboard
2. Click "Clear All"
3. Visit main site
4. Complete conversation flow

### Test Returning Visitor
1. Complete conversation once
2. Go to admin dashboard
3. Click "Reset Visitor ID" (keeps responses, clears ID)
4. Visit main site again
5. See "change of heart" message

### Test Easter Egg
1. Visit main site
2. Click "Yes, I'd love that" immediately on first question
3. Watch hearts celebration! 💕

## 🛠️ Customization

### Change Conversation
Edit `script.js` conversation object:
```javascript
intro: {
    messages: [
        { text: "Your message here", delay: 1200 }
    ],
    answers: [
        { text: "Option text", next: "nextStep" }
    ]
}
```

### Change Colors
Edit `style.css`:
```css
body { background: /* your gradient */ }
.message.bot .message-bubble { background: /* your color */ }
.message.user .message-bubble { background: /* your color */ }
```

### Change Bot Name
1. `index.html`: `<h1>Bit</h1>` → Your name
2. `index.html`: `<div class="avatar">B</div>` → Your initial
3. `index.html`: `<title>Bit the Bot</title>` → Your title

## 📱 Browser Support

Fully tested and working on:
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & iOS)
- ✅ Android Chrome
- ✅ Samsung Internet

## 🚢 Deployment

Already deployed to GitHub Pages!

**If you need to redeploy:**
```bash
git add .
git commit -m "Your message"
git push origin main
```

Changes go live automatically at:
- Main: https://emoggio.github.io/BitBot/
- Admin: https://emoggio.github.io/BitBot/admin-secret-view.html

## 📝 Technical Details

### Dependencies
- Google Fonts (Roboto)
- ipify.org API (for IP detection)
- No npm packages or build process needed!

### Browser APIs Used
- localStorage (visitor tracking & responses)
- Fetch API (IP detection, optional webhooks)
- Intersection Observer (scroll behavior)
- CSS Animations & Transitions

### Performance
- Lightweight: ~15KB total (HTML + CSS + JS)
- No external dependencies loaded at runtime
- Fast load times on all devices
- Smooth 60fps animations

## 💝 Perfect For
- Valentine's Day proposals
- Anniversary surprises
- Creative date requests
- Long-distance relationships
- Tech-savvy romantics

## 🎬 Created With
- ❤️ Love and humor
- 🌙 Late night coding sessions
- ☕ Probably too much coffee
- 🤖 Claude Sonnet 4.5 assistance
- 🇮🇹 Italian charm (questionable planning)

## 📜 License

Free to use and modify!

---

**Made with 💘 for a special Valentine's Day**

Good luck! 🍀✨
