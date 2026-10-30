import '../style.css';

interface ProjectDetails {
    title: string;
    tags: string[];
    summary: string;
    stack?: string[];
    liveUrl?: string;
    githubUrl?: string;
    image: string;
}

interface FormSubmissionResponse {
    success?: boolean;
    message?: string;
    error?: string;
}

// ==================== LOADER ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 2000);
});

// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const themeToggle = document.getElementById('themeToggle');

// Theme preference
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.documentElement.dataset.theme = 'light';

function updateThemeToggle() {
    if (!themeToggle) return;
    const isLight = document.documentElement.dataset.theme === 'light';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.innerHTML = `<i class="fas fa-${isLight ? 'moon' : 'sun'}" aria-hidden="true"></i>`;
}

function updateThemeIcons() {
    const isLight = document.documentElement.dataset.theme === 'light';
    document.querySelectorAll<HTMLImageElement>('img[data-light-src][data-dark-src]').forEach(img => {
        const source = isLight ? img.dataset.lightSrc : img.dataset.darkSrc;
        if (source) img.src = source;
    });
}

updateThemeToggle();
updateThemeIcons();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.documentElement.dataset.theme === 'light';
        document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
        localStorage.setItem('portfolio-theme', isLight ? 'dark' : 'light');
        updateThemeToggle();
        updateThemeIcons();
    });
}

// Scroll effect
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// Mobile menu toggle
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        const isActive = menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isActive));
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '-50px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal, .fade-left, .fade-right, .stagger').forEach(el => {
    revealObserver.observe(el);
});

// ==================== SKILL BARS ====================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (
            entry.isIntersecting
            && entry.target instanceof HTMLElement
            && !entry.target.classList.contains('animated')
        ) {
            entry.target.classList.add('animated');
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll<HTMLElement>('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// ==================== SKILL GROUP TOGGLE ====================
const showMoreSkillsBtn = document.getElementById('showMoreSkills');
const skillGroups = document.querySelectorAll('.skill-group');

if (showMoreSkillsBtn && skillGroups.length > 2) {
    let isExpanded = false;
    const hiddenGroups = Array.from(skillGroups).slice(2);

    const updateSkillsToggle = () => {
        hiddenGroups.forEach(group => {
            group.classList.toggle('is-collapsed', !isExpanded);
        });

        showMoreSkillsBtn.setAttribute('aria-expanded', String(isExpanded));
        const text = showMoreSkillsBtn.querySelector('.show-more-text');
        const icon = showMoreSkillsBtn.querySelector('i');

        if (text) text.textContent = isExpanded ? 'Show Less' : 'Show More';
        if (icon) icon.classList.toggle('fa-chevron-up', isExpanded);
        if (icon) icon.classList.toggle('fa-chevron-down', !isExpanded);
    };

    updateSkillsToggle();
    showMoreSkillsBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        updateSkillsToggle();
    });
}

// ==================== PROJECT MODAL ====================
const projectModalData: Record<string, ProjectDetails> = {
    medtrack: {
        title: 'MedTrack',
        tags: ['Healthcare', 'Patient Care'],
        summary: 'A healthcare dashboard for tracking medications, managing appointments, monitoring health, and keeping medical records organized.',
        liveUrl: 'https://medtrack.azurewebsite.net',
        image: 'project-image-one'
    },
    aireastudio: {
        title: 'Airea Studio',
        tags: ['AI Marketing', 'Brand Content'],
        summary: 'An AI-powered marketing studio that turns your brief into on-brand campaigns, social posts, ad copy, and visuals across channels.',
        liveUrl: 'https://www.aireastudio.ai',
        image: 'project-image-two'
    },
    commerceapi: {
        title: 'Multi-Vendor Commerce API',
        tags: ['Marketplace', 'Payments'],
        summary: 'A marketplace backend for vendor management, inventory control, order orchestration, and secure buyer-seller workflows.',
        stack: ['Python', 'FastAPI', 'AWS'],
        liveUrl: 'https://spreecommerce.org',
        githubUrl: 'https://github.com/jamescarter/marketplace-api',
        image: 'project-image-three'
    },
    datapulse: {
        title: 'DataPulse Analytics',
        tags: ['Analytics', 'Dashboard'],
        summary: 'An insight dashboard for monitoring revenue trends, conversion metrics, and key operational signals through a clear executive interface.',
        stack: ['React', 'Charts', 'Node'],
        liveUrl: 'https://datapulseanalytics.com',
        githubUrl: 'https://github.com/jamescarter/data-pulse',
        image: 'project-image-four'
    },
    engagedai: {
        title: 'EngagedAI',
        tags: ['Automotive AI', 'Sales Agents'],
        summary: 'AI sales agents for automotive dealerships that engage leads, book appointments, and keep customer conversations moving across channels.',
        liveUrl: 'https://engagedai.io/',
        image: 'project-image-five'
    },
    clientflow: {
        title: 'ClientFlow CRM',
        tags: ['CRM', 'Workflow'],
        summary: 'A client operations platform built to centralize deals, workflows, onboarding steps, and communication tracking for service businesses.',
        stack: ['Next.js', 'PostgreSQL', 'Auth'],
        liveUrl: 'https://mybizsuite.com/',
        githubUrl: 'https://github.com/jamescarter/client-flow-crm',
        image: 'project-image-six'
    }
};

const projectModal = document.getElementById('projectModal');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalSummary = document.getElementById('projectModalSummary');
const projectModalImage = document.getElementById('projectModalImage');
const projectModalDemo = document.querySelector<HTMLAnchorElement>('#projectModalDemo');
const projectModalGithub = document.querySelector<HTMLAnchorElement>('#projectModalGithub');

function openProjectModal(projectKey: string) {
    const project = projectModalData[projectKey];
    if (!project || !projectModal || !projectModalTitle || !projectModalSummary || !projectModalImage) return;

    projectModalTitle.textContent = project.title;
    projectModalSummary.textContent = project.summary;
    projectModalImage.className = `project-modal-image ${project.image}`;

    if (projectModalDemo) {
        projectModalDemo.href = project.liveUrl || '#';
        projectModalDemo.style.display = project.liveUrl ? 'inline-flex' : 'none';
    }

    if (projectModalGithub) {
        projectModalGithub.href = project.githubUrl || '#';
        projectModalGithub.style.display = project.githubUrl ? 'inline-flex' : 'none';
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll<HTMLElement>('.portfolio-video-card').forEach(card => {
    const projectKey = card.dataset.project;
    if (!projectKey) return;

    card.addEventListener('click', () => openProjectModal(projectKey));
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProjectModal(projectKey);
        }
    });
});

if (projectModal) {
    projectModal.addEventListener('click', (event) => {
        if (
            event.target instanceof Element
            && (event.target.matches('[data-close-modal="true"]') || event.target === projectModal)
        ) {
            closeProjectModal();
        }
    });

    const modalCloseButton = document.querySelector('.project-modal-close');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeProjectModal);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

// ==================== NUMBER COUNTER ====================
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = Number.parseInt(entry.target.getAttribute('data-count') ?? '0', 10) || 0;
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCount = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeProgress * target);
                
                entry.target.textContent = current + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.textContent = target + '+';
                }
            };
            
            requestAnimationFrame(updateCount);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll<HTMLElement>('[data-count]').forEach(num => {
    countObserver.observe(num);
});

// ==================== FORM SUBMISSION ====================
const form = document.querySelector<HTMLFormElement>('#contactForm');
const submitBtn = document.querySelector<HTMLButtonElement>('#submitBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameField = form.querySelector<HTMLInputElement>('#name');
        const emailField = form.querySelector<HTMLInputElement>('#email');
        const messageField = form.querySelector<HTMLTextAreaElement>('#message');
        if (!nameField || !emailField || !messageField) {
            showToast('The contact form is missing a required field.', true);
            return;
        }

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const message = messageField.value.trim();

        if (!name || !email || !message) {
            showToast('Please fill in all required fields.', true);
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('Please enter a valid email address.', true);
            return;
        }
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(form)
            });

            const data: unknown = await response.json();
            if (!isFormSubmissionResponse(data)) {
                showToast('The message service returned an unexpected response.', true);
                return;
            }

            if (response.ok && data.success) {
                showToast('Message sent successfully! I\'ll get back to you soon.', false);
                form.reset();
            } else {
                const errorMessage = data.message || data.error || 'Something went wrong while sending the message.';
                showToast(errorMessage, true);
            }
        } catch {
            const message = location.protocol === 'file:'
                ? 'Please open this site through a local server or live website before sending.'
                : 'Connection error. Please try WhatsApp instead.';
            showToast(message, true);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
            }
        }
    });
}

function isFormSubmissionResponse(value: unknown): value is FormSubmissionResponse {
    if (typeof value !== 'object' || value === null) return false;
    const response = value as Record<string, unknown>;
    return typeof response.success === 'boolean'
        || typeof response.message === 'string'
        || typeof response.error === 'string';
}

let toastTimeout: number | undefined;

function showToast(message: string, isError = false) {
    if (!toast || !toastMessage) return;
    const icon = toast.querySelector<HTMLElement>('i');
    toastMessage.textContent = message;
    toast.classList.toggle('error', isError);
    if (icon) icon.className = isError ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    toast.classList.add('show');

    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.getElementById(anchor.hash.slice(1));
        if (!target) return;
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    });
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-100px 0px -50%'
});

sections.forEach(section => navObserver.observe(section));

// ==================== PARALLAX FOR HERO ORBS ====================
const heroOrbs = document.querySelectorAll<HTMLElement>('.hero-orb');
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (heroOrbs.length && supportsHover.matches && !prefersReducedMotion.matches) {
    let pointerFrame = 0;

    document.addEventListener('mousemove', (event) => {
        if (pointerFrame) return;
        pointerFrame = window.requestAnimationFrame(() => {
            const x = event.clientX / window.innerWidth;
            const y = event.clientY / window.innerHeight;

            heroOrbs.forEach((orb, index) => {
                const speed = (index + 1) * 15;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });

            pointerFrame = 0;
        });
    }, { passive: true });
}
