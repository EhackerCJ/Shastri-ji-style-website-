document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Typing Animation ---
    const textArray = ["Preserving the Eternal Wisdom of the Vedas.", "Guiding Light of Sanatan Dharma.", "Awakening Spiritual Consciousness."];
    let textIndex = 0;
    let charIndex = 0;
    const typedTextElement = document.getElementById("typed-text");
    
    function typeText() {
        if (charIndex < textArray[textIndex].length) {
            typedTextElement.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(eraseText, 2000);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            typedTextElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, 50);
        } else {
            textIndex++;
            if (textIndex >= textArray.length) textIndex = 0;
            setTimeout(typeText, 500);
        }
    }
    
    if(typedTextElement) typeText();

    // --- 3. Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    function revealSection() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealSection);
    revealSection(); // Trigger once on load

    // --- 4. Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    let counted = false;
    
    function startCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // Trigger counters when experience section is in view
    const experienceSection = document.getElementById('experience');
    window.addEventListener('scroll', () => {
        if(!counted && experienceSection) {
            const top = experienceSection.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                startCounters();
                counted = true;
            }
        }
    });

    // --- 5. Floating Particle Background (Sanskrit/Om motifs) ---
    const particleContainer = document.getElementById('particle-container');
    const motifs = ['ॐ', '॥', '卐', '❊', '✨'];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerText = motifs[Math.floor(Math.random() * motifs.length)];
        
        // Randomize styles
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's'; // 10s to 20s
        particle.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        
        particleContainer.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            particle.remove();
        }, 20000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 800);

    // --- 6. Chatbot Logic ---
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatBox = document.getElementById('chatbot-box');
    const closeChat = document.getElementById('close-chat');
    const chatBody = document.getElementById('chat-body');
    const chatOptionsContainer = document.getElementById('chat-options');
    const chatInput = document.getElementById('chat-input');
    const sendChat = document.getElementById('send-chat');

    const qaDatabase = {
        "Who is Pandit Gaurav Sati?": "Pandit Gaurav Sati is a respected scholar of Vedic scriptures, Puranas, Jyotish Shastra, and Sanatan traditions.",
        "What services are available?": "He offers Jyotish (Astrology) consultation, Bhagwat/Shiv/Ram Kathas, Vastu, Pujas, Rituals, and Spiritual Counseling.",
        "How can I book a consultation?": "You can book by using the Contact Form on this website or by messaging on WhatsApp at +91 9520579767.",
        "What is Jyotish?": "Jyotish is the ancient Vedic science of light (Astrology), used to understand one's karmic path and provide spiritual guidance.",
        "What Kathas are conducted?": "Pandit Ji conducts Bhagwat Katha, Shiv Mahapuran, Devi Bhagwat, Ram Katha, and Satyanarayan Katha.",
        "What rituals are available?": "Rituals include Navagraha Puja, Grah Shanti, Rudrabhishek, Marriage, Griha Pravesh, and Havan/Yagya.",
        "Contact details?": "You can reach Pandit Ji directly via Phone or WhatsApp at +91 9520579767.",
        "Location?": "Please contact Pandit Ji directly for detailed location and physical appointment availability."
    };

    // Toggle Chat
    chatToggle.addEventListener('click', () => chatBox.classList.remove('hidden'));
    closeChat.addEventListener('click', () => chatBox.classList.add('hidden'));

    // Populate Options
    Object.keys(qaDatabase).forEach(question => {
        const btn = document.createElement('button');
        btn.classList.add('chat-option-btn');
        btn.innerText = question;
        btn.addEventListener('click', () => handleQuestionClick(question));
        chatOptionsContainer.appendChild(btn);
    });

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll to bottom
    }

    function handleQuestionClick(question) {
        appendMessage(question, 'user');
        chatOptionsContainer.style.display = 'none'; // hide options after selection
        
        setTimeout(() => {
            appendMessage(qaDatabase[question], 'bot');
            setTimeout(() => {
                chatOptionsContainer.style.display = 'flex'; // show options again
                chatBody.appendChild(chatOptionsContainer); // move to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }, 500);
    }

    // Handle manual custom text input
    function handleManualSubmit() {
        const val = chatInput.value.trim();
        if(!val) return;
        
        appendMessage(val, 'user');
        chatInput.value = '';
        chatOptionsContainer.style.display = 'none';
        
        setTimeout(() => {
            appendMessage("Please contact Pandit Ji directly for detailed guidance. (WhatsApp: +91 9520579767)", 'bot');
            setTimeout(() => {
                chatOptionsContainer.style.display = 'flex';
                chatBody.appendChild(chatOptionsContainer);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }, 600);
    }

    sendChat.addEventListener('click', handleManualSubmit);
    chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleManualSubmit();
    });

});
