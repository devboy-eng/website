// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navActions.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after click
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navActions.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const isPlus = finalValue.includes('+');
                
                let numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                let current = 0;
                const increment = numericValue / 30; // 30 frames for smooth animation
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (numericValue >= 1000000) {
                        displayValue = (displayValue / 1000000).toFixed(1) + 'M';
                    } else if (numericValue >= 1000) {
                        displayValue = (displayValue / 1000).toFixed(1) + 'K';
                    }
                    
                    target.textContent = displayValue + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
                }, 50);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Form handling for CTAs
    const ctaButtons = document.querySelectorAll('a[href="#signup"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupModal();
        });
    });

    const loginButtons = document.querySelectorAll('a[href="#login"]');
    loginButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginModal();
        });
    });

    // Demo button handler with Cal.com integration
    const demoButtons = document.querySelectorAll('a[href="#demo"]');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openCalBooking();
        });
    });

    // Contact Us button handler
    const contactButtons = document.querySelectorAll('a[href="#contact"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showContactModal();
        });
    });

    // Phone mockup interaction
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        phoneMockup.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.05)';
        });
        
        phoneMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(5deg) scale(1)';
        });
    }

    // Typing animation for the chat messages
    const igMessages = document.querySelector('.ig-messages');
    if (igMessages) {
        setTimeout(() => {
            animateTyping();
        }, 2000);
    }

    function animateTyping() {
        const messages = igMessages.querySelectorAll('.ig-message');
        messages.forEach((message, index) => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                message.style.transition = 'all 0.4s ease';
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, index * 800);
        });
        
        const badge = igMessages.querySelector('.automation-badge');
        if (badge) {
            setTimeout(() => {
                badge.style.transition = 'all 0.4s ease';
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            }, messages.length * 800);
        }
    }

    // Pricing toggle (if needed for monthly/annual)
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('pricing-featured') ? 
                'scale(1.08) translateY(-8px)' : 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('pricing-featured') ? 
                'scale(1.05) translateY(0)' : 'translateY(0)';
        });
    });
});

// Modal functions
function showSignupModal() {
    const modal = createModal('Sign Up for KuposuBot', `
        <form id="signupForm" class="modal-form">
            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" required>
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" name="terms" required>
                    I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a>
                </label>
            </div>
            <button type="submit" class="btn btn-primary btn-full">Start Free Trial</button>
            <p class="form-note">Already have an account? <a href="#" onclick="closeModal(); showLoginModal();">Sign In</a></p>
        </form>
    `);
    
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest! Signup functionality will be available soon.');
        closeModal();
    });
}


function showLoginModal() {
    const modal = createModal('Sign In to KuposuBot', `
        <form id="loginForm" class="modal-form">
            <div class="form-group">
                <label for="loginEmail">Email Address</label>
                <input type="email" id="loginEmail" name="email" required>
            </div>
            <div class="form-group">
                <label for="loginPassword">Password</label>
                <input type="password" id="loginPassword" name="password" required>
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" name="remember">
                    Remember me
                </label>
            </div>
            <button type="submit" class="btn btn-primary btn-full">Sign In</button>
            <p class="form-note">Don't have an account? <a href="#" onclick="closeModal(); showSignupModal();">Sign Up</a></p>
            <p class="form-note"><a href="#">Forgot your password?</a></p>
        </form>
    `);
    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login functionality will be available soon!');
        closeModal();
    });
}

// Cal.com integration function
function openCalBooking() {
    // Create Cal.com booking modal
    const modal = createModal('Book a Demo - KuposuBot', `
        <div class="cal-booking-content">
            <div class="booking-header">
                <h3>Schedule Your Personal Demo</h3>
                <p>Get a personalized walkthrough of KuposuBot's Instagram automation features and see how it can grow your business.</p>
            </div>
            <div class="cal-embed-container">
                <iframe 
                    src="https://cal.com/kuposubot/demo?embed=true&theme=light" 
                    width="100%" 
                    height="600" 
                    frameborder="0"
                    style="border-radius: 8px;">
                </iframe>
            </div>
            <div class="booking-footer">
                <p><i class="fas fa-clock"></i> 30-minute session</p>
                <p><i class="fas fa-video"></i> Live demonstration</p>
                <p><i class="fas fa-question-circle"></i> Q&A session included</p>
            </div>
        </div>
    `);
    
    // Add Cal.com embed script if not already loaded
    if (!window.Cal) {
        loadCalScript();
    }
}

// Load Cal.com embed script
function loadCalScript() {
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = function() {
        // Initialize Cal embed
        if (window.Cal) {
            window.Cal('init', {
                origin: 'https://app.cal.com'
            });
        }
    };
}

// Alternative function for direct Cal.com popup (if you prefer popup instead of modal)
function openCalPopup() {
    // Open Cal.com booking page in a new window/tab
    window.open('https://cal.com/kuposubot/demo', '_blank', 'width=800,height=700,scrollbars=yes,resizable=yes');
}

// Contact Us form modal
function showContactModal() {
    const modal = createModal('Contact Us - KuposuBot', `
        <form id="contactForm" class="contact-form">
            <div class="contact-form-header">
                <p>Get in touch with our team. We'd love to hear from you!</p>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone">
            </div>
            
            <div class="form-group">
                <label for="company">Company/Business Name</label>
                <input type="text" id="company" name="company">
            </div>
            
            <div class="form-group">
                <label for="subject">Subject *</label>
                <select id="subject" name="subject" required>
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="demo">Request Demo</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="message">Message *</label>
                <textarea id="message" name="message" rows="4" placeholder="Tell us how we can help you..." required></textarea>
            </div>
            
            <div class="form-group checkbox-group">
                <label>
                    <input type="checkbox" name="newsletter" id="newsletter">
                    I'd like to receive updates about KuposuBot features and news
                </label>
            </div>
            
            <button type="submit" class="btn btn-primary btn-full contact-submit-btn">
                <span class="btn-text">Send Message</span>
                <span class="btn-loading" style="display: none;">
                    <i class="fas fa-spinner fa-spin"></i> Sending...
                </span>
            </button>
            
            <p class="form-note">We'll get back to you within 24 hours.</p>
        </form>
    `);
    
    // Add form submission handler
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmission(this);
    });
}

// Handle contact form submission
async function handleContactFormSubmission(form) {
    const submitBtn = form.querySelector('.contact-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        company: formData.get('company') || 'Not provided',
        subject: formData.get('subject'),
        message: formData.get('message'),
        newsletter: formData.get('newsletter') ? 'Yes' : 'No',
        timestamp: new Date().toLocaleString()
    };
    
    try {
        // Send email using EmailJS (you'll need to set this up)
        await sendContactEmail(contactData);
        
        // Show success message
        showContactSuccessMessage();
        closeModal();
    } catch (error) {
        console.error('Error sending contact form:', error);
        
        // Show error message
        showContactErrorMessage();
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Send contact email using EmailJS
async function sendContactEmail(contactData) {
    // Using EmailJS service - you'll need to set up an account and get these IDs
    const serviceID = 'service_kuposubot'; // Replace with your EmailJS service ID
    const templateID = 'template_contact'; // Replace with your EmailJS template ID
    const publicKey = 'your_public_key'; // Replace with your EmailJS public key
    
    const emailParams = {
        to_email: 'naga.nagarjun@gmail.com',
        from_name: `${contactData.firstName} ${contactData.lastName}`,
        from_email: contactData.email,
        phone: contactData.phone,
        company: contactData.company,
        subject: contactData.subject,
        message: contactData.message,
        newsletter: contactData.newsletter,
        timestamp: contactData.timestamp
    };
    
    // For now, we'll simulate sending email with a simple alert
    // In production, you would integrate with EmailJS, FormSpree, or your own backend
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demonstration, we'll use mailto as fallback
    const mailtoLink = `mailto:naga.nagarjun@gmail.com?subject=KuposuBot Contact Form - ${contactData.subject}&body=Name: ${contactData.firstName} ${contactData.lastName}%0AEmail: ${contactData.email}%0APhone: ${contactData.phone}%0ACompany: ${contactData.company}%0ASubject: ${contactData.subject}%0A%0AMessage:%0A${contactData.message}%0A%0ANewsletter Subscription: ${contactData.newsletter}%0ASubmitted: ${contactData.timestamp}`;
    
    // Open mailto link in new window (will open user's email client)
    window.open(mailtoLink);
    
    console.log('Contact form data:', contactData);
}

// Show success message
function showContactSuccessMessage() {
    const successModal = createModal('Message Sent Successfully!', `
        <div class="success-message">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. Our team will get back to you within 24 hours.</p>
            <p>We appreciate your interest in KuposuBot!</p>
            <button class="btn btn-primary" onclick="closeModal()">Close</button>
        </div>
    `);
}

// Show error message
function showContactErrorMessage() {
    const errorModal = createModal('Message Not Sent', `
        <div class="error-message">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Oops! Something went wrong</h3>
            <p>We couldn't send your message right now. Please try again or contact us directly at:</p>
            <p><strong>naga.nagarjun@gmail.com</strong></p>
            <div class="error-actions">
                <button class="btn btn-outline" onclick="closeModal()">Close</button>
                <button class="btn btn-primary" onclick="closeModal(); showContactModal();">Try Again</button>
            </div>
        </div>
    `);
}

function showDemoModal() {
    const modal = createModal('Watch KuposuBot Demo', `
        <div class="demo-content">
            <div class="video-placeholder">
                <i class="fas fa-play-circle" style="font-size: 4rem; color: #3b82f6;"></i>
                <h3>Demo Video Coming Soon</h3>
                <p>Watch how KuposuBot automates your Instagram engagement in just a few clicks.</p>
                <div class="demo-features">
                    <div class="demo-feature">
                        <i class="fas fa-check"></i>
                        <span>Set up automations in 2 minutes</span>
                    </div>
                    <div class="demo-feature">
                        <i class="fas fa-check"></i>
                        <span>Respond to comments automatically</span>
                    </div>
                    <div class="demo-feature">
                        <i class="fas fa-check"></i>
                        <span>Convert followers to customers</span>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="closeModal(); openCalBooking();">Book Live Demo</button>
            </div>
        </div>
    `);
}

function createModal(title, content) {
    // Remove existing modal if any
    closeModal();
    
    const modalHTML = `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Close modal on overlay click
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    return document.getElementById('modalOverlay');
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Add modal styles dynamically
const modalStyles = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(8px);
    }
    
    .modal-container {
        background: white;
        border-radius: 16px;
        max-width: 600px;
        width: 95%;
        max-height: 95vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        animation: modalSlideIn 0.3s ease;
        margin: 2vh auto;
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .modal-header {
        padding: 1.5rem 1.5rem 1rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #1f2937;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        padding: 4px;
        border-radius: 4px;
        transition: color 0.2s ease;
    }
    
    .modal-close:hover {
        color: #3b82f6;
    }
    
    .modal-content {
        padding: 1rem 1.5rem 1.5rem;
    }
    
    .modal-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-group label {
        font-weight: 500;
        color: #374151;
        font-size: 14px;
    }
    
    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group input[type="password"] {
        padding: 12px 16px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.2s ease;
    }
    
    .form-group input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .form-group label input[type="checkbox"] {
        margin-right: 8px;
    }
    
    .form-note {
        text-align: center;
        font-size: 14px;
        color: #6b7280;
        margin: 0;
    }
    
    .form-note a {
        color: #3b82f6;
        text-decoration: none;
    }
    
    .form-note a:hover {
        text-decoration: underline;
    }
    
    .demo-content {
        text-align: center;
    }
    
    .video-placeholder {
        padding: 2rem;
        background: #f8fafc;
        border-radius: 12px;
        margin-bottom: 1.5rem;
    }
    
    .video-placeholder h3 {
        margin: 1rem 0 0.5rem;
        color: #1f2937;
    }
    
    .video-placeholder p {
        color: #6b7280;
        margin-bottom: 1.5rem;
    }
    
    .demo-features {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
        text-align: left;
    }
    
    .demo-feature {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: #374151;
    }
    
    .demo-feature i {
        color: #10b981;
        width: 16px;
    }
`;

// Cal.com booking specific styles
const calBookingStyles = `
    /* Cal.com booking styles */
    .cal-booking-content {
        max-width: 100%;
    }
    
    .booking-header {
        text-align: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .booking-header h3 {
        color: #1f2937;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
    }
    
    .booking-header p {
        color: #6b7280;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
    }
    
    .cal-embed-container {
        margin: 1rem 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .cal-embed-container iframe {
        width: 100%;
        height: 600px;
        border: none;
        background: white;
    }
    
    .booking-footer {
        display: flex;
        justify-content: space-around;
        padding: 1rem;
        background: #f9fafb;
        border-radius: 8px;
        margin-top: 1rem;
    }
    
    .booking-footer p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #4b5563;
        font-size: 0.875rem;
        margin: 0;
    }
    
    .booking-footer i {
        color: #3b82f6;
    }
    
    @media (max-width: 768px) {
        .booking-footer {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
        }
        
        .cal-embed-container iframe {
            height: 500px;
        }
        
        .modal-container {
            max-width: 95%;
            margin: 2rem auto;
        }
    }
`;

// Contact form specific styles
const contactFormStyles = `
    /* Contact Form Styles */
    .contact-form {
        max-width: 100%;
    }
    
    .contact-form-header {
        text-align: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .contact-form-header p {
        color: #6b7280;
        font-size: 0.95rem;
        margin: 0;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .contact-form .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        margin-bottom: 0.8rem;
    }
    
    .contact-form .form-group label {
        font-weight: 500;
        color: #374151;
        font-size: 14px;
    }
    
    .contact-form input[type="text"],
    .contact-form input[type="email"],
    .contact-form input[type="tel"],
    .contact-form select,
    .contact-form textarea {
        padding: 10px 14px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        background: white;
    }
    
    .contact-form input:focus,
    .contact-form select:focus,
    .contact-form textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .contact-form select {
        cursor: pointer;
    }
    
    .contact-form textarea {
        resize: vertical;
        min-height: 80px;
    }
    
    .checkbox-group {
        margin: 1rem 0 !important;
    }
    
    .checkbox-group label {
        display: flex !important;
        align-items: flex-start;
        gap: 0.75rem;
        font-size: 14px !important;
        line-height: 1.5;
        cursor: pointer;
    }
    
    .checkbox-group input[type="checkbox"] {
        margin: 0;
        margin-top: 2px;
        width: auto;
        height: auto;
    }
    
    .contact-submit-btn {
        position: relative;
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .btn-loading {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .contact-submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    /* Success and Error Messages */
    .success-message,
    .error-message {
        text-align: center;
        padding: 2rem;
    }
    
    .success-icon,
    .error-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .success-icon {
        color: #10b981;
    }
    
    .error-icon {
        color: #ef4444;
    }
    
    .success-message h3,
    .error-message h3 {
        color: #1f2937;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .success-message p,
    .error-message p {
        color: #6b7280;
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    .error-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
            gap: 0;
        }
        
        .error-actions {
            flex-direction: column;
            align-items: center;
        }
        
        .error-actions .btn {
            width: 200px;
        }
    }
`;


// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles + calBookingStyles + contactFormStyles;
document.head.appendChild(styleSheet);