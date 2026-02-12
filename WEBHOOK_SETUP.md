# Setting Up Response Tracking

You have TWO options for tracking responses:

## Option 1: Quick Setup (LocalStorage) ✅ ALREADY WORKING

**Pros:**
- Works immediately, no setup needed
- Free
- Private (only you can see it)

**Cons:**
- Only works on your device/browser
- Data can be lost if you clear browser data

**How to use:**
1. Share your BitBot link: `https://emoggio.github.io/BitBot/`
2. View responses at: `https://emoggio.github.io/BitBot/admin-secret-view.html`
3. Keep the admin URL secret!

---

## Option 2: Google Sheets (Recommended for Important Data)

**Pros:**
- Responses saved forever
- Access from any device
- Can export to Excel/CSV
- More reliable

**Setup Steps:**

### Step 1: Create a Google Sheets Webhook

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet called "BitBot Responses"
3. In the first row, add headers:
   - Column A: `Timestamp`
   - Column B: `Date`
   - Column C: `Conversation Path`
   - Column D: `Special Request`

4. Click **Extensions** → **Apps Script**

5. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Format conversation path
    var pathText = '';
    if (data.conversationPath && data.conversationPath.length > 0) {
      pathText = data.conversationPath.map(function(step, i) {
        return (i + 1) + '. ' + step.choice;
      }).join('\n');
    }

    sheet.appendRow([
      data.timestamp,
      data.date,
      pathText,
      data.answer
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

6. Click **Save** (disk icon)
7. Click **Deploy** → **New deployment**
8. Click the gear icon ⚙️ next to "Select type"
9. Choose **Web app**
10. Set:
    - **Description**: BitBot Webhook
    - **Execute as**: Me
    - **Who has access**: Anyone
11. Click **Deploy**
12. Click **Authorize access** and go through the authorization flow
13. **Copy the Web app URL** - it will look like:
    `https://script.google.com/macros/s/AKfycbz.../exec`

### Step 2: Add Webhook URL to Your Bot

1. Open `script.js` in your BitBot folder
2. Find this line (near the bottom):
   ```javascript
   const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
   ```
3. Replace it with your actual webhook URL:
   ```javascript
   const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
   ```
4. Save the file

### Step 3: Deploy

Push your updated code to GitHub:
```bash
git add script.js
git commit -m "Add Google Sheets webhook"
git push
```

Wait a few minutes for GitHub Pages to update.

### Step 4: Test

1. Visit your BitBot site
2. Go through the conversation and submit a response
3. Check your Google Sheet - the response should appear!

---

## Viewing Responses

### LocalStorage (Works Now):
- Go to: `https://emoggio.github.io/BitBot/admin-secret-view.html`
- **DO NOT share this URL!**
- Auto-refreshes every 30 seconds
- Shows total responses and latest time

### Google Sheets:
- Go to your Google Sheet
- See all responses with timestamps
- Can sort, filter, export to Excel

---

## Privacy & Security

### For LocalStorage:
- Keep `admin-secret-view.html` URL completely private
- Don't add it to any README or public documentation
- Consider renaming the file to something even more obscure like `xyz789admin.html`

### For Google Sheets:
- Only you can access the spreadsheet (unless you share it)
- The webhook URL is public but only accepts POST requests
- No one can read your data through the webhook

---

## Troubleshooting

**Q: I don't see any responses in the admin panel**
- Make sure someone actually submitted the form
- Check your browser console (F12) for errors
- Try refreshing the page

**Q: Google Sheets not receiving data**
- Make sure you deployed as "Anyone" can access
- Check the Apps Script logs: Apps Script editor → Executions
- Try the webhook URL directly in browser (should show an error page, which is normal)

**Q: I want to use both methods**
- You can! LocalStorage works automatically, Google Sheets needs setup
- Responses will be saved to both if you configure the webhook

---

## Which Option Should I Use?

**Use LocalStorage if:**
- You just want to test quickly
- This is a one-time thing
- You'll check responses from the same computer

**Use Google Sheets if:**
- You want permanent records
- You might check from different devices
- This is important (like a real proposal!)
- You want to export/analyze the data later

**My recommendation: Use both!** LocalStorage works now, and you can add Google Sheets later if needed.
