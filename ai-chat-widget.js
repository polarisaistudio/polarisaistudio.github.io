/* AI Chat Widget for Polaris AI Studio */
/* This widget provides: FAQ answers, booking, and lead capture */

(function() {
    // FAQ Knowledge Base
    const faqDatabase = {
        'pricing|cost|price|how much': {
            answer: "Our AI solutions start at $800/month for small businesses. This includes setup, training, unlimited conversations, and ongoing support. Want to see a detailed breakdown?",
            actions: [{text: "View Pricing", url: "/pricing.html"}, {text: "Book Free Demo", action: "book"}]
        },
        'chatbot|chat bot|ai assistant': {
            answer: "Our AI chatbots handle 80% of customer inquiries 24/7, reduce support costs by 70%, and respond in under 1 second. Perfect for salons, clinics, real estate, and more!",
            actions: [{text: "Learn More", url: "/services/ai-chatbot.html"}, {text: "See Demo", action: "demo"}]
        },
        'email|sms|marketing|lead': {
            answer: "We offer automated lead capture with instant email and SMS follow-up. Build your list, segment audiences, and nurture leads on autopilot. 5x higher engagement than email alone!",
            actions: [{text: "Learn More", url: "/services/lead-capture-email-sms.html"}, {text: "Get Started", action: "book"}]
        },
        'appointment|booking|schedule|demo': {
            answer: "I'd love to schedule a free 30-minute consultation for you! We'll show you exactly how AI can help your business. No commitment required.",
            actions: [{text: "Book Now", action: "book"}]
        },
        'how|work|process|setup': {
            answer: "Getting started is simple: 1) Free consultation (30 min), 2) We design your custom solution, 3) We build & test (1-2 weeks), 4) Go live! We handle everything.",
            actions: [{text: "Book Consultation", action: "book"}, {text: "View Process", url: "/about.html"}]
        },
        'industry|business|salon|clinic|real estate|restaurant': {
            answer: "We work with salons, medical clinics, real estate agents, restaurants, e-commerce, and professional services. Each solution is customized for your industry!",
            actions: [{text: "View Industries", url: "/solutions.html"}, {text: "Case Studies", url: "/case-studies.html"}]
        },
        'help|support|contact': {
            answer: "I'm here to help! You can email us at info@polarisaistudio.com or book a call. What would you like to know?",
            actions: [{text: "Contact Us", url: "/contact.html"}, {text: "Book Call", action: "book"}]
        }
    };

    // Create Chat Widget HTML
    const widgetHTML = `
        <style>
            #ai-chat-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }

            #ai-chat-button {
                width: 60px;
                height: 60px;
                border-radius: 30px;
                background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
                border: none;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s, box-shadow 0.2s;
                position: relative;
            }

            #ai-chat-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
            }

            #ai-chat-button svg {
                width: 28px;
                height: 28px;
                color: white;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            #ai-chat-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                width: 20px;
                height: 20px;
                background: #ef4444;
                border-radius: 10px;
                display: none;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 11px;
                font-weight: bold;
                border: 2px solid white;
            }

            #ai-chat-container {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                max-width: calc(100vw - 40px);
                height: 600px;
                max-height: calc(100vh - 120px);
                background: white;
                border-radius: 16px;
                box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
            }

            #ai-chat-container.open {
                display: flex;
                animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            #ai-chat-header {
                background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
                color: white;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            #ai-chat-header-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            #ai-chat-avatar {
                width: 40px;
                height: 40px;
                background: white;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            #ai-chat-avatar svg {
                width: 24px;
                height: 24px;
                color: #6366f1;
            }

            #ai-chat-status {
                display: flex;
                flex-direction: column;
            }

            #ai-chat-title {
                font-weight: 600;
                font-size: 16px;
            }

            #ai-chat-subtitle {
                font-size: 13px;
                opacity: 0.9;
            }

            #ai-chat-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 4px;
                opacity: 0.8;
                transition: opacity 0.2s;
            }

            #ai-chat-close:hover {
                opacity: 1;
            }

            #ai-chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                background: #f9fafb;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .ai-message {
                display: flex;
                gap: 8px;
                align-items: flex-start;
                animation: messageSlide 0.3s ease-out;
            }

            @keyframes messageSlide {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .ai-message.user {
                flex-direction: row-reverse;
            }

            .ai-message-bubble {
                max-width: 75%;
                padding: 12px 16px;
                border-radius: 16px;
                font-size: 14px;
                line-height: 1.5;
            }

            .ai-message.bot .ai-message-bubble {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 16px 16px 16px 4px;
            }

            .ai-message.user .ai-message-bubble {
                background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
                color: white;
                border-radius: 16px 16px 4px 16px;
            }

            .ai-message-actions {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-top: 8px;
            }

            .ai-message-action-btn {
                background: white;
                border: 2px solid #6366f1;
                color: #6366f1;
                padding: 10px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 600;
                transition: all 0.2s;
                text-align: center;
            }

            .ai-message-action-btn:hover {
                background: #6366f1;
                color: white;
            }

            #ai-chat-input-area {
                padding: 16px;
                background: white;
                border-top: 1px solid #e5e7eb;
            }

            #ai-chat-input-form {
                display: flex;
                gap: 8px;
            }

            #ai-chat-input {
                flex: 1;
                padding: 12px 16px;
                border: 1px solid #d1d5db;
                border-radius: 24px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }

            #ai-chat-input:focus {
                border-color: #6366f1;
            }

            #ai-chat-send {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
                border: none;
                border-radius: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s;
            }

            #ai-chat-send:hover {
                transform: scale(1.1);
            }

            #ai-chat-send svg {
                width: 18px;
                height: 18px;
                color: white;
            }

            .ai-typing {
                display: flex;
                gap: 4px;
                padding: 12px 16px;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 16px 16px 16px 4px;
                width: fit-content;
            }

            .ai-typing-dot {
                width: 8px;
                height: 8px;
                background: #9ca3af;
                border-radius: 4px;
                animation: typingDot 1.4s infinite;
            }

            .ai-typing-dot:nth-child(2) {
                animation-delay: 0.2s;
            }

            .ai-typing-dot:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typingDot {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-8px);
                }
            }

            .ai-quick-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 8px;
            }

            .ai-quick-action {
                background: #f3f4f6;
                border: 1px solid #d1d5db;
                padding: 8px 12px;
                border-radius: 16px;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .ai-quick-action:hover {
                background: #e5e7eb;
                border-color: #6366f1;
            }

            @media (max-width: 640px) {
                #ai-chat-container {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 120px);
                }
            }
        </style>

        <div id="ai-chat-widget">
            <button id="ai-chat-button" aria-label="Open AI Chat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
                <div id="ai-chat-badge">1</div>
            </button>

            <div id="ai-chat-container">
                <div id="ai-chat-header">
                    <div id="ai-chat-header-info">
                        <div id="ai-chat-avatar">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                        </div>
                        <div id="ai-chat-status">
                            <div id="ai-chat-title">Polaris AI Assistant</div>
                            <div id="ai-chat-subtitle">● Online • Responds instantly</div>
                        </div>
                    </div>
                    <button id="ai-chat-close" aria-label="Close chat">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div id="ai-chat-messages">
                    <div class="ai-message bot">
                        <div class="ai-message-bubble">
                            <div>👋 Hi! I'm your AI assistant. I can help you with:</div>
                            <div class="ai-quick-actions" style="margin-top: 12px;">
                                <div class="ai-quick-action" data-message="What are your pricing options?">💰 Pricing</div>
                                <div class="ai-quick-action" data-message="Tell me about your AI chatbot">🤖 AI Chatbot</div>
                                <div class="ai-quick-action" data-message="I want to book a demo">📅 Book Demo</div>
                                <div class="ai-quick-action" data-message="How does email and SMS marketing work?">📧 Email/SMS</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="ai-chat-input-area">
                    <form id="ai-chat-input-form">
                        <input
                            type="text"
                            id="ai-chat-input"
                            placeholder="Ask me anything..."
                            autocomplete="off"
                        />
                        <button type="submit" id="ai-chat-send" aria-label="Send message">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Insert widget into page
    document.addEventListener('DOMContentLoaded', function() {
        document.body.insertAdjacentHTML('beforeend', widgetHTML);

        // Widget elements
        const chatButton = document.getElementById('ai-chat-button');
        const chatContainer = document.getElementById('ai-chat-container');
        const chatClose = document.getElementById('ai-chat-close');
        const chatMessages = document.getElementById('ai-chat-messages');
        const chatInput = document.getElementById('ai-chat-input');
        const chatForm = document.getElementById('ai-chat-input-form');
        const chatBadge = document.getElementById('ai-chat-badge');

        let isOpen = false;
        let hasInteracted = false;

        // Show badge after 3 seconds if not interacted
        setTimeout(() => {
            if (!hasInteracted) {
                chatBadge.style.display = 'flex';
            }
        }, 3000);

        // Toggle chat
        chatButton.addEventListener('click', function() {
            isOpen = !isOpen;
            hasInteracted = true;
            chatBadge.style.display = 'none';

            if (isOpen) {
                chatContainer.classList.add('open');
                chatInput.focus();
            } else {
                chatContainer.classList.remove('open');
            }
        });

        chatClose.addEventListener('click', function() {
            isOpen = false;
            chatContainer.classList.remove('open');
        });

        // Add message to chat
        function addMessage(text, isUser = false, actions = null) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `ai-message ${isUser ? 'user' : 'bot'}`;

            let messageHTML = `<div class="ai-message-bubble">${text}`;

            if (actions && actions.length > 0) {
                messageHTML += '<div class="ai-message-actions">';
                actions.forEach(action => {
                    if (action.url) {
                        messageHTML += `<a href="${action.url}" class="ai-message-action-btn" target="_blank">${action.text}</a>`;
                    } else if (action.action === 'book') {
                        messageHTML += `<a href="https://calendly.com/polarisaistudio/introduction-call" class="ai-message-action-btn" target="_blank">${action.text}</a>`;
                    } else if (action.action === 'lead') {
                        messageHTML += `<button class="ai-message-action-btn" onclick="aiChatWidget.showLeadForm()">${action.text}</button>`;
                    }
                });
                messageHTML += '</div>';
            }

            messageHTML += '</div>';
            messageDiv.innerHTML = messageHTML;

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Show typing indicator
        function showTyping() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'ai-message bot';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="ai-typing">
                    <div class="ai-typing-dot"></div>
                    <div class="ai-typing-dot"></div>
                    <div class="ai-typing-dot"></div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTyping() {
            const typing = document.getElementById('typing-indicator');
            if (typing) typing.remove();
        }

        // Process user message
        function processMessage(message) {
            const lowerMessage = message.toLowerCase();

            // Check FAQ database
            for (const [keywords, response] of Object.entries(faqDatabase)) {
                const keywordList = keywords.split('|');
                if (keywordList.some(keyword => lowerMessage.includes(keyword))) {
                    return response;
                }
            }

            // Default response with lead capture
            return {
                answer: "Great question! I'd love to give you a personalized answer. Can I get your contact info and have our team reach out within 1 hour?",
                actions: [
                    {text: "Share My Info", action: "lead"},
                    {text: "Book a Call Instead", action: "book"}
                ]
            };
        }

        // Handle message submission
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, true);
            chatInput.value = '';

            // Show typing
            showTyping();

            // Simulate AI thinking
            setTimeout(() => {
                hideTyping();
                const response = processMessage(message);
                addMessage(response.answer, false, response.actions);
            }, 800 + Math.random() * 400);
        });

        // Quick action clicks
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('ai-quick-action')) {
                const message = e.target.getAttribute('data-message');
                chatInput.value = message;
                chatForm.dispatchEvent(new Event('submit'));
            }
        });

        // Lead form function (exposed globally)
        window.aiChatWidget = {
            showLeadForm: function() {
                addMessage("Perfect! Please share your info:", false);

                const leadForm = `
                    <form id="ai-lead-form" style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
                        <input type="text" placeholder="Your Name *" required style="padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                        <input type="email" placeholder="Email *" required style="padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                        <input type="tel" placeholder="Phone (optional)" style="padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                        <button type="submit" class="ai-message-action-btn" style="margin: 0;">Submit</button>
                    </form>
                `;

                const formDiv = document.createElement('div');
                formDiv.className = 'ai-message bot';
                formDiv.innerHTML = `<div class="ai-message-bubble">${leadForm}</div>`;
                chatMessages.appendChild(formDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                document.getElementById('ai-lead-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(e.target);

                    // Here you would send to your backend/CRM
                    console.log('Lead captured:', Object.fromEntries(formData));

                    addMessage("Thanks! Our team will reach out within 1 hour. In the meantime, want to book a quick call?", false, [
                        {text: "Book Now", action: "book"}
                    ]);

                    e.target.remove();
                });
            }
        };
    });
})();
