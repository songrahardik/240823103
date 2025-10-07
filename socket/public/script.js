const socket = io();

const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messages');
const typingIndicator = document.getElementById('typingIndicator');
const onlineCount = document.getElementById('onlineCount');

let username = prompt('Enter your name:') || 'Anonymous';
let typingTimer;
let isTyping = false;

// Send username to server
socket.emit('new user', username);

// Handle message form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    
    if (message) {
        socket.emit('chat message', message);
        messageInput.value = '';
        socket.emit('stop typing');
        isTyping = false;
    }
});

// Handle typing indicator
messageInput.addEventListener('input', () => {
    if (!isTyping) {
        socket.emit('typing');
        isTyping = true;
    }
    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        socket.emit('stop typing');
        isTyping = false;
    }, 1000);
});

// Receive messages
socket.on('chat message', (data) => {
    addMessage(data.message, data.username, data.id === socket.id);
});

// Handle user joined
socket.on('user joined', (data) => {
    addSystemMessage(`${data.username} joined the chat`);
});

// Handle user left
socket.on('user left', (data) => {
    addSystemMessage(`${data.username} left the chat`);
});

// Handle typing indicator
socket.on('typing', (data) => {
    showTypingIndicator(data.username);
});

socket.on('stop typing', () => {
    hideTypingIndicator();
});

// Update online count
socket.on('online count', (count) => {
    onlineCount.textContent = `${count} online`;
});

// Add message to chat
function addMessage(message, username, isOwn) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    if (isOwn) messageDiv.classList.add('own');
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    
    if (!isOwn) {
        const usernameSpan = document.createElement('strong');
        usernameSpan.textContent = username + ': ';
        usernameSpan.style.display = 'block';
        usernameSpan.style.marginBottom = '4px';
        usernameSpan.style.fontSize = '13px';
        usernameSpan.style.opacity = '0.9';
        messageContent.appendChild(usernameSpan);
    }
    
    const messageText = document.createElement('span');
    messageText.textContent = message;
    messageContent.appendChild(messageText);
    
    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);
    
    // Trigger animation
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 10);
    
    scrollToBottom();
}

// Add system message
function addSystemMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'system');
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;
    
    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 10);
    
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator(username) {
    const typingText = document.querySelector('.typing-text');
    typingText.textContent = `${username} is typing...`;
    typingIndicator.classList.add('active');
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    typingIndicator.classList.remove('active');
}

// Scroll to bottom smoothly
function scrollToBottom() {
    const chatBody = document.querySelector('.chat-body');
    chatBody.scrollTo({
        top: chatBody.scrollHeight,
        behavior: 'smooth'
    });
}

// Add enter key listener
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        messageForm.dispatchEvent(new Event('submit'));
    }
});
