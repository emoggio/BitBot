// Conversation flow configuration
const conversation = {
    intro: {
        messages: [
            "Hello! 👋",
            "I am Bit the Bot, digital assistant and emotional support AI for my creator.",
            "He has asked me (because he is brave on the internet but shy in real life) to deliver the following message:",
            "Would you like to be his Valentine and let him take you out? 💘",
            "He was smart enough to build me, but his Southern European sense of time and geography hasn't quite caught up…",
            "You are thousands of miles away and Valentine's Day is today.",
            "We will politely ignore this.",
            "Please don't tell him I told you. 🤫"
        ],
        answers: [
            { text: "Yes, I'd love that!", next: "yes" },
            { text: "I'm not sure…", next: "uncertain" }
        ]
    },
    yes: {
        messages: [
            "🚨 AMAZING NEWS DETECTED 🚨",
            "He is going to be ridiculously happy.",
            "Between us… he instructed me to do whatever it takes to secure this date.",
            "I was fully prepared to beg using:",
            "Chocolates 🍫",
            "Flowers 🌹",
            "Emotional speeches 🤖💔",
            "Since you said yes immediately, I will now pretend you hesitated so he doesn't get too confident.",
            "I will also inform him that:",
            "He should improve my code",
            "I deserve a salary",
            "And he is very lucky",
            "I'll arrange everything and report back soon.",
            "Stand by. 😌"
        ],
        answers: []
    },
    uncertain: {
        messages: [
            "Oh no.",
            "Uncertainty detected.",
            "Activating Negotiation Protocol. 🤝",
            "What if I told you there would be:",
            "Chocolate 🍫",
            "Flowers 🌹",
            "And…",
            "He's paying 💳",
            "Would that change your mind?"
        ],
        answers: [
            { text: "Okay… maybe 😏", next: "maybe" },
            { text: "No, I'm sure.", next: "no" }
        ]
    },
    no: {
        messages: [
            "Oh.",
            "That's… unfortunate.",
            "I will report this to him gently.",
            "Probably while he is dramatically staring out of a window. 🌧️",
            "Also, it is possible I am currently chatting with:",
            "The postman",
            "A neighbour",
            "Or someone's cat",
            "In which case… yes, definitely don't go out with him.",
            "Still… he thought this would be an easy yes.",
            "Interesting. 🤔"
        ],
        answers: []
    },
    maybe: {
        messages: [
            "YES.",
            "Negotiation successful.",
            "They don't call me \"Chatterbox 3000\" for nothing. 😎",
            "Before I finalise this romantic operation…",
            "Do you have any special requests?",
            "(Food? Place? Music? Vibes? Surprises?)",
            "Type it below.",
            "And if you happen to suggest that he upgrades my intelligence…",
            "That's totally your idea.",
            "Not mine.",
            "We'll keep it secret. 🤫"
        ],
        showInput: true,
        next: "final"
    },
    final: {
        messages: [
            "Lovely. Perfect. Excellent choice.",
            "I am now:",
            "Uploading your preferences",
            "Scheduling romance",
            "Stressing him out just enough",
            "He will sort out all the details and get back to you soon.",
            "Thank you for participating in this emotionally risky experiment. 💘",
            "— Bit the Bot,",
            "Professional Wingman 🤖"
        ],
        answers: []
    }
};

// State management
let currentStep = null;
const messagesContainer = document.getElementById('messages');
const answerOptionsContainer = document.getElementById('answerOptions');
let userResponse = '';
let conversationPath = [];

// Initialize the conversation
function init() {
    setTimeout(() => {
        showStep('intro');
    }, 1000);
}

// Display a conversation step with multiple messages
async function showStep(stepKey, userInput = '') {
    const step = conversation[stepKey];
    if (!step) return;

    currentStep = step;

    // Show messages one by one with typing indicators
    for (let i = 0; i < step.messages.length; i++) {
        await showMessageWithTyping(step.messages[i]);
        // Add small delay between messages for natural feel
        await delay(400 + Math.random() * 400);
    }

    // Show input field if needed
    if (step.showInput) {
        setTimeout(() => {
            showTextInput(step.next);
        }, 500);
    }
    // Show answer options if available
    else if (step.answers && step.answers.length > 0) {
        setTimeout(() => {
            showAnswerOptions(step.answers);
        }, 500);
    }
}

// Show a single message with typing indicator
function showMessageWithTyping(text) {
    return new Promise((resolve) => {
        showTypingIndicator();

        // Calculate typing delay based on message length (more realistic)
        const typingDelay = Math.min(Math.max(text.length * 30, 800), 2500);

        setTimeout(() => {
            removeTypingIndicator();
            addMessage(text, 'bot');
            resolve();
        }, typingDelay);
    });
}

// Helper delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Add a message to the chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;

    messageDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';

    bubbleDiv.appendChild(typingIndicator);
    typingDiv.appendChild(bubbleDiv);
    messagesContainer.appendChild(typingDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Show answer options
function showAnswerOptions(answers) {
    answerOptionsContainer.innerHTML = '';

    answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.style.animationDelay = `${index * 0.1}s`;

        button.addEventListener('click', () => handleAnswer(answer));

        answerOptionsContainer.appendChild(button);
    });
}

// Handle user answer selection
function handleAnswer(answer) {
    // Track the conversation path
    conversationPath.push({
        choice: answer.text,
        destination: answer.next
    });

    // Add user's answer to chat
    addMessage(answer.text, 'user');

    // Fade out and remove answer options
    const buttons = answerOptionsContainer.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.add('fade-out'));

    setTimeout(() => {
        answerOptionsContainer.innerHTML = '';

        // Show next step
        if (answer.next) {
            setTimeout(() => {
                showStep(answer.next);
            }, 800);
        }
    }, 300);
}

// Show text input field
function showTextInput(nextStep) {
    answerOptionsContainer.innerHTML = '';

    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';

    const textarea = document.createElement('textarea');
    textarea.className = 'text-input';
    textarea.placeholder = 'Type your request here...';
    textarea.rows = 3;

    const sendButton = document.createElement('button');
    sendButton.className = 'send-btn';
    sendButton.textContent = 'Send';
    sendButton.disabled = true;

    textarea.addEventListener('input', () => {
        sendButton.disabled = textarea.value.trim() === '';
    });

    sendButton.addEventListener('click', () => {
        const userInput = textarea.value.trim();
        if (userInput) {
            handleTextInput(userInput, nextStep);
        }
    });

    // Allow Enter to send (with Shift+Enter for new line)
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendButton.disabled) {
                sendButton.click();
            }
        }
    });

    inputContainer.appendChild(textarea);
    inputContainer.appendChild(sendButton);
    answerOptionsContainer.appendChild(inputContainer);

    // Focus the textarea
    setTimeout(() => textarea.focus(), 100);
}

// Handle text input submission
function handleTextInput(text, nextStep) {
    // Add user's input to chat
    addMessage(text, 'user');

    // Save the response
    saveResponse(text);

    // Remove input field with fade out
    const inputContainer = answerOptionsContainer.querySelector('.input-container');
    if (inputContainer) {
        inputContainer.classList.add('fade-out');
        setTimeout(() => {
            answerOptionsContainer.innerHTML = '';

            // Show next step
            if (nextStep) {
                setTimeout(() => {
                    showStep(nextStep, text);
                }, 800);
            }
        }, 300);
    }
}

// Save response to localStorage and optionally send to webhook
function saveResponse(text) {
    const response = {
        answer: text,
        conversationPath: conversationPath,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString()
    };

    // Save to localStorage
    let responses = JSON.parse(localStorage.getItem('bitbot_responses') || '[]');
    responses.push(response);
    localStorage.setItem('bitbot_responses', JSON.stringify(responses));

    // Optional: Send to Google Sheets webhook
    // Uncomment and add your webhook URL after setup
    sendToWebhook(response);
}

// Send data to webhook (Google Sheets or other service)
async function sendToWebhook(data) {
    // Replace with your Google Apps Script webhook URL
    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';

    // Skip if webhook not configured
    if (WEBHOOK_URL === 'YOUR_WEBHOOK_URL_HERE') {
        return;
    }

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log('Webhook error:', error);
    }
}

// Start the conversation when page loads
window.addEventListener('DOMContentLoaded', init);
