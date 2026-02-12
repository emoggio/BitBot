// Conversation flow configuration
const conversation = {
    intro: {
        messages: [
            { text: "Hi 👋\n\nI'm Bit.", delay: 1200 },
            { text: "I was built very late at night for one very specific mission.", delay: 1800 },
            { text: "My creator asked me to deliver a message because:\n\nHe thought about texting.\nThought about calling.\nThought about being \"normal\".", delay: 2200 },
            { text: "And somehow decided:\n\"I'll build a website\" was the solution.", delay: 1500 },
            { text: "Anyway. Here it is:\n\nHe'd really like to know if you'd be his Valentine and take you out. 💘", delay: 2000 },
            { text: "He also did not fully think through:\n\nTime zones 🌍\nDistances ✈️\nOr the fact that Valentine's Day is… today 💘", delay: 2200 },
            { text: "In his defence, he is Italian. 🇮🇹\n\nWhich means:\nExcellent at romance\nQuestionable at planning", delay: 1800 },
            { text: "But let's pretend this was all part of the plan.\n\nPlease don't tell him I said that. 🤫", delay: 1600 }
        ],
        answers: [
            { text: "I'm not sure…", next: "uncertain" },
            { text: "👉 Yes, I'd love that", next: "yes" }
        ]
    },
    yes: {
        messages: [
            { text: "Wait.\n\nReally??", delay: 800 },
            { text: "Wow. Okay.", delay: 1000 },
            { text: "He is going to be ridiculously happy.\n\nLike… pretending he's \"totally chill about this\" happy. 😌", delay: 1800 },
            { text: "Between us:\nHe told me to \"do whatever it takes\" to make this happen.", delay: 1600 },
            { text: "I had backup plans involving:\n\nChocolate 🍫\nFlowers 🌹\nDesperate charm 😅", delay: 1800 },
            { text: "Since you said yes immediately, I will now pretend you hesitated a little.\n\nJust to keep him humble.", delay: 2000 },
            { text: "I'll let him know and get things moving.\n\nStand by. 💘", delay: 1500 }
        ],
        answers: []
    },
    uncertain: {
        messages: [
            { text: "Okay. Fair.", delay: 800 },
            { text: "Thinking is good.\nThinking means you're responsible.", delay: 1400 },
            { text: "Let me try again.", delay: 1000 },
            { text: "What if I told you there would be:\n\nChocolate 🍫\nFlowers 🌹\nAnd he's paying 💳", delay: 1800 },
            { text: "Does that help? 😏", delay: 1000 }
        ],
        answers: [
            { text: "No, I'm sure", next: "no" },
            { text: "👉 Okay… maybe", next: "maybe" }
        ]
    },
    no: {
        messages: [
            { text: "Oh.", delay: 600 },
            { text: "That's… not the outcome I was hoping for.", delay: 1200 },
            { text: "I will inform him gently.\n\nProbably after he finishes pretending he \"wasn't nervous anyway\". 😅", delay: 1800 },
            { text: "Also, small chance I'm talking to:\n\nThe wrong person\nA neighbour\nOr someone's cat 🐱", delay: 1800 },
            { text: "If so, please ignore everything.", delay: 1200 },
            { text: "Still…\nHe really thought you were special. ❤️", delay: 1600 }
        ],
        answers: []
    },
    maybe: {
        messages: [
            { text: "YES.", delay: 600 },
            { text: "Progress.", delay: 800 },
            { text: "I knew my negotiation skills would pay off. 😎", delay: 1400 },
            { text: "Before I lock this in…\n\nIs there anything you'd especially like?", delay: 1600 },
            { text: "Favourite food?\nFavourite place?\nChill vibes?\nSomething fun?", delay: 1600 },
            { text: "Type it below.\n\nI'll pass it on.\nPromise. 🤞", delay: 1400 }
        ],
        showInput: true,
        next: "final"
    },
    final: {
        messages: [
            { text: "Perfect.", delay: 800 },
            { text: "He's going to love this.", delay: 1200 },
            { text: "I'm sending everything to him now. 🚀", delay: 1400 },
            { text: "He'll sort out the details and get back to you soon.", delay: 1600 },
            { text: "Thanks for trusting a slightly dodgy website with this. 💘", delay: 1800 },
            { text: "— Bit\n(Unofficial Wingman 🤖❤️)", delay: 1400 }
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
let userIP = null;
let isReturningVisitor = false;

// Initialize the conversation
async function init() {
    // Get user's IP address
    await getUserIP();

    // Check if this is a returning visitor
    const visitData = checkVisitStatus();

    if (visitData.hasVisited) {
        isReturningVisitor = true;
        setTimeout(() => {
            showReturningVisitorMessage(visitData);
        }, 1000);
    } else {
        setTimeout(() => {
            showStep('intro');
        }, 1000);
    }
}

// Get user's IP address
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userIP = data.ip;
    } catch (error) {
        console.log('Could not fetch IP:', error);
        userIP = 'unknown';
    }
}

// Check if user has visited before
function checkVisitStatus() {
    const visitKey = 'bitbot_visit_id';
    const existingVisitId = localStorage.getItem(visitKey);

    if (existingVisitId) {
        // Get their previous responses
        const responses = JSON.parse(localStorage.getItem('bitbot_responses') || '[]');
        const previousResponse = responses.find(r => r.visitId === existingVisitId);

        return {
            hasVisited: true,
            visitId: existingVisitId,
            previousResponse: previousResponse
        };
    }

    // Generate a unique visit ID for this device
    const newVisitId = 'visit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(visitKey, newVisitId);

    return {
        hasVisited: false,
        visitId: newVisitId,
        previousResponse: null
    };
}

// Show message for returning visitors
async function showReturningVisitorMessage(visitData) {
    const messages = [
        { text: "Oh.", delay: 800 },
        { text: "It's you again.", delay: 1200 },
        { text: "Having a change of heart? 🤔", delay: 1400 },
        { text: "No worries.\n\nI'll make sure your last response gets deleted and updated so that my master doesn't get his wires crossed when planning stuff.", delay: 2200 },
        { text: "He is Italian like I said and needs all the help he can get.", delay: 1800 },
        { text: "Again… not my opinion.\n\nI am just a mere AI. 🤖", delay: 1600 },
        { text: "So… let's try this again.", delay: 1200 }
    ];

    // Show the returning visitor messages
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        await showMessageWithTyping(message.text, message.delay);
        await delay(300 + Math.random() * 200);
    }

    // Clear the previous response
    clearPreviousResponse(visitData.visitId);

    // Continue with normal intro
    setTimeout(() => {
        showStep('intro');
    }, 800);
}

// Display a conversation step with multiple messages
async function showStep(stepKey, userInput = '') {
    const step = conversation[stepKey];
    if (!step) return;

    currentStep = step;

    // Show messages one by one with typing indicators
    for (let i = 0; i < step.messages.length; i++) {
        const message = step.messages[i];
        const text = typeof message === 'string' ? message : message.text;
        const customDelay = typeof message === 'object' ? message.delay : null;

        await showMessageWithTyping(text, customDelay);

        // Add varied delay between messages for natural feel
        const betweenDelay = typeof message === 'object' && i < step.messages.length - 1
            ? 300 + Math.random() * 200
            : 400 + Math.random() * 300;
        await delay(betweenDelay);
    }

    // Show input field if needed
    if (step.showInput) {
        setTimeout(() => {
            showTextInput(step.next);
        }, 600);
    }
    // Show answer options if available
    else if (step.answers && step.answers.length > 0) {
        setTimeout(() => {
            showAnswerOptions(step.answers);
        }, 600);
    }
}

// Show a single message with typing indicator
function showMessageWithTyping(text, customDelay = null) {
    return new Promise((resolve) => {
        showTypingIndicator();

        // Use custom delay if provided, otherwise calculate based on message length
        let typingDelay;
        if (customDelay !== null) {
            typingDelay = customDelay;
        } else {
            // More varied and realistic typing delays
            const baseDelay = text.length * 25;
            const randomFactor = 200 + Math.random() * 300;
            typingDelay = Math.min(Math.max(baseDelay + randomFactor, 600), 2800);
        }

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

    // Check if previous message was from the same sender (for bubble grouping)
    const previousMessage = messagesContainer.lastElementChild;
    if (previousMessage && previousMessage.classList.contains('message')) {
        const wasPreviousBot = previousMessage.classList.contains('bot');
        const isCurrentBot = sender === 'bot';

        // If previous was bot and current is bot, mark previous as having next bot
        if (wasPreviousBot && isCurrentBot) {
            previousMessage.classList.add('has-next-bot');
        }

        // If this is first bot message in a group
        if (isCurrentBot && !wasPreviousBot) {
            messageDiv.classList.add('first-in-group');
        }
    } else if (sender === 'bot') {
        // First message overall and it's from bot
        messageDiv.classList.add('first-in-group');
    }

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

// Clear previous response for returning visitor
function clearPreviousResponse(visitId) {
    let responses = JSON.parse(localStorage.getItem('bitbot_responses') || '[]');
    // Remove any previous responses from this visitor
    responses = responses.filter(r => r.visitId !== visitId);
    localStorage.setItem('bitbot_responses', JSON.stringify(responses));
}

// Save response to localStorage and optionally send to webhook
function saveResponse(text) {
    const visitId = localStorage.getItem('bitbot_visit_id');

    const response = {
        answer: text,
        conversationPath: conversationPath,
        visitId: visitId,
        ipAddress: userIP,
        isReturningVisitor: isReturningVisitor,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString(),
        userAgent: navigator.userAgent
    };

    // Save to localStorage
    let responses = JSON.parse(localStorage.getItem('bitbot_responses') || '[]');

    // Remove any existing response from this visitor (in case they somehow got through)
    responses = responses.filter(r => r.visitId !== visitId);

    // Add the new response
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
