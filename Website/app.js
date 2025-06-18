// Matrix Rain Animation
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.charArray = this.chars.split('');
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        setTimeout(() => this.animate(), 50);
    }
    
    resize() {
        this.init();
    }
}

// Typewriter Effect
class TypeWriter {
    constructor(element, text, speed = 50, delay = 0) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.delay = delay;
        this.currentIndex = 0;
        
        setTimeout(() => this.type(), this.delay);
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                this.element.style.borderRight = 'none';
            }, 1000);
        }
    }
}

// Smooth Scroll Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        const navButtons = document.querySelectorAll('.nav-cmd');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target.getAttribute('data-target');
                const section = document.getElementById(target);
                
                if (section) {
                    const headerHeight = 80;
                    const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add active state animation
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });
    }
}

// Skills Animation
class SkillsAnimation {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkills(entry.target);
                }
            });
        }, options);
        
        const skillsSection = document.querySelector('.skills-container');
        if (skillsSection) {
            this.observer.observe(skillsSection);
        }
    }
    
    animateSkills(container) {
        const skillBars = container.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, index * 200);
        });
        
        // Unobserve after animation
        this.observer.unobserve(container);
    }
}

// Copy to Clipboard
class ClipboardManager {
    constructor() {
        this.init();
    }
    
    init() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = button.closest('.contact-value');
                const textToCopy = parent.getAttribute('data-copy');
                
                if (textToCopy) {
                    this.copyToClipboard(textToCopy);
                    this.showNotification('Copied to clipboard!');
                }
            });
        });
    }
    
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
    
    showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.copy-notification');
        if (existing) {
            existing.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
}

// Fade In Animation on Scroll
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);
        
        // Add animation classes to elements
        const animatedElements = document.querySelectorAll(
            '.info-card, .project-card, .message-box, .contact-terminal'
        );
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(element);
        });
    }
}

// Project Cards Interaction
class ProjectCards {
    constructor() {
        this.init();
    }
    
    init() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }
    
    addHoverEffect(card) {
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'scale(1.05)';
                tag.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.4)';
            }, index * 50);
        });
    }
    
    removeHoverEffect(card) {
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.style.transform = 'scale(1)';
            tag.style.boxShadow = 'none';
        });
    }
}

// Navigation Active State
class NavigationManager {
    constructor() {
        this.sections = [];
        this.navButtons = [];
        this.init();
    }
    
    init() {
        this.sections = document.querySelectorAll('section[id]');
        this.navButtons = document.querySelectorAll('.nav-cmd');
        
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }
    
    updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.setActiveNavButton(sectionId);
            }
        });
    }
    
    setActiveNavButton(activeId) {
        this.navButtons.forEach(button => {
            const targetId = button.getAttribute('data-target');
            if (targetId === activeId) {
                button.style.color = 'var(--neon-green)';
                button.style.background = 'rgba(0, 255, 65, 0.1)';
                button.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.3)';
            } else {
                button.style.color = 'var(--text-secondary)';
                button.style.background = 'none';
                button.style.boxShadow = 'none';
            }
        });
    }
}

// Terminal Cursor Animation
class TerminalCursor {
    constructor() {
        this.init();
    }
    
    init() {
        const cursor = document.querySelector('.cursor-blink');
        if (cursor) {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 600);
        }
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Reduce animations on slower devices
        if (this.isSlowDevice()) {
            this.optimizeForPerformance();
        }
    }
    
    isSlowDevice() {
        return navigator.hardwareConcurrency < 4 || 
               window.devicePixelRatio < 1.5 ||
               /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    optimizeForPerformance() {
        // Reduce matrix rain density
        const canvas = document.getElementById('matrix-canvas');
        if (canvas) {
            canvas.style.opacity = '0.05';
        }
        
        // Disable some animations
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            * { transition-duration: 0.1s !important; }
            .glitch:before, .glitch:after { display: none !important; }
            @keyframes shimmer { to { left: 100%; } }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Main Application
class Portfolio {
    constructor() {
        this.components = {};
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        try {
            // Initialize Matrix Rain
            const canvas = document.getElementById('matrix-canvas');
            if (canvas) {
                this.components.matrixRain = new MatrixRain(canvas);
            }
            
            // Initialize Typewriter Effects
            this.initTypewriters();
            
            // Initialize other components
            this.components.smoothScroll = new SmoothScroll();
            this.components.skillsAnimation = new SkillsAnimation();
            this.components.clipboardManager = new ClipboardManager();
            this.components.scrollAnimations = new ScrollAnimations();
            this.components.projectCards = new ProjectCards();
            this.components.navigationManager = new NavigationManager();
            this.components.terminalCursor = new TerminalCursor();
            this.components.performanceMonitor = new PerformanceMonitor();
            
            // Handle window resize
            window.addEventListener('resize', () => {
                if (this.components.matrixRain) {
                    this.components.matrixRain.resize();
                }
            });
            
            console.log('Portfolio initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }
    
    initTypewriters() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-text');
            const delay = parseInt(element.getAttribute('data-delay')) || 0;
            
            if (text) {
                element.textContent = '';
                new TypeWriter(element, text, 80, delay);
            }
        });
    }
}

// Easter Eggs and Fun Features
class EasterEggs {
    constructor() {
        this.konamiCode = [];
        this.konamiSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => {
            this.konamiCode.push(e.code);
            
            if (this.konamiCode.length > this.konamiSequence.length) {
                this.konamiCode.shift();
            }
            
            if (this.konamiCode.join(',') === this.konamiSequence.join(',')) {
                this.activateEasterEgg();
            }
        });
        
        // Terminal command easter egg
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
                this.showSecretTerminal();
            }
        });
    }
    
    activateEasterEgg() {
        // Matrix effect intensifies
        const canvas = document.getElementById('matrix-canvas');
        if (canvas) {
            canvas.style.opacity = '0.3';
            canvas.style.filter = 'hue-rotate(120deg)';
        }
        
        // Show secret message
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--terminal-bg);
                border: 2px solid var(--neon-green);
                padding: 20px;
                border-radius: 10px;
                font-family: var(--font-family-mono);
                color: var(--neon-green);
                z-index: 9999;
                box-shadow: 0 0 50px rgba(0, 255, 65, 0.5);
            ">
                <h3>🎉 Konami Code Activated! 🎉</h3>
                <p>You found the secret! Welcome to the Matrix, Neo.</p>
                <button onclick="this.parentNode.parentNode.remove()" style="
                    background: var(--neon-green);
                    color: var(--bg-primary);
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-family: var(--font-family-mono);
                    cursor: pointer;
                    margin-top: 10px;
                ">Close</button>
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
            canvas.style.opacity = '0.1';
            canvas.style.filter = 'none';
        }, 5000);
    }
    
    showSecretTerminal() {
        console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                        SECRET TERMINAL                        ║
    ╠══════════════════════════════════════════════════════════════╣
    ║  > system.author = "Tran Hoang Long"                         ║
    ║  > system.passion = ["Hardware", "IoT", "Innovation"]        ║
    ║  > system.mission = "Building the future, one byte at a time"║
    ║  > system.status = "Ready to innovate"                       ║
    ║                                                              ║
    ║  Thanks for exploring my portfolio! 🚀                       ║
    ╚══════════════════════════════════════════════════════════════╝
        `);
    }
}

// Initialize everything when the script loads
const portfolio = new Portfolio();
const easterEggs = new EasterEggs();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, EasterEggs };
}