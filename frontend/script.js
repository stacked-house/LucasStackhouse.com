// Handle navigation for any element with a data-page attribute
document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();

        const pageId = el.getAttribute('data-page');
        const tabId = el.getAttribute('data-tab');

        // Close any open dropdowns
        document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('open'));

        // Remove active from all nav links and pages
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

        // Activate the matching nav link or dropdown trigger
        const navLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        const dropdownTrigger = document.querySelector(`.nav-dropdown-trigger[data-nav-page="${pageId}"]`);
        if (navLink) navLink.classList.add('active');
        if (dropdownTrigger) dropdownTrigger.classList.add('active');

        // Show the target page
        document.getElementById(pageId).classList.add('active');

        // Switch career panel if specified
        if (tabId) {
            document.querySelectorAll('.career-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.career-panel').forEach(p => p.classList.remove('active'));
            const matchingTab = document.querySelector(`.career-tab[data-tab="${tabId}"]`);
            if (matchingTab) matchingTab.classList.add('active');
            document.getElementById(`panel-${tabId}`).classList.add('active');
            if (tabId === 'resume-pdf') renderResumePDF();
        }

        // Update URL without triggering scroll — encode tab if present
        history.pushState(null, null, '#' + (tabId ? `${pageId}/${tabId}` : pageId));
    });
});

// Handle dropdown toggle
document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = trigger.closest('.nav-item-dropdown');
        const isOpen = parent.classList.contains('open');
        document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('open'));
        if (!isOpen) parent.classList.add('open');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.nav-item-dropdown').forEach(d => d.classList.remove('open'));
});

// PDF.js resume renderer
let pdfRendered = false;

async function renderResumePDF() {
    if (pdfRendered) return;

    if (!window.pdfjsLib) {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    const canvas = document.getElementById('resume-canvas');
    const loading = document.getElementById('resume-loading');
    if (!canvas) return;

    try {
        const pdf = await pdfjsLib.getDocument('Resume/Lucas_Resume.pdf').promise;
        const page = await pdf.getPage(1);

        const containerWidth = canvas.parentElement.clientWidth;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await page.render({ canvasContext: canvas.getContext('2d'), viewport: scaledViewport }).promise;

        if (loading) loading.style.display = 'none';
        pdfRendered = true;
    } catch (err) {
        if (loading) loading.textContent = 'Could not load resume. Use the links above to open or download.';
    }
}

// Handle career tab switcher (in-page)
document.querySelectorAll('.career-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        document.querySelectorAll('.career-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.career-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`panel-${tabId}`).classList.add('active');
        if (tabId === 'resume-pdf') renderResumePDF();
        if (tabId === 'timeline') requestAnimationFrame(scrollTimelineToEnd);
        // Persist tab in URL so refresh restores it
        history.pushState(null, null, '#resume/' + tabId);
    });
});

// ── Horizontal Timeline ───────────────────────────────────────────

const TL_JOBS = [
    {
        role: 'Personal Trainer',
        co: 'CU Boulder Recreation Center',
        date: 'January 2018 – November 2019',
        color: 'early',
        bullets: [
            'Designed individualized training programs for student athletes and general population clients',
            'Led group fitness classes, building strong communication and motivational coaching skills',
            'Developed a client focused mindset and resilience working in a demanding service environment',
        ]
    },
    {
        role: 'Landscaper',
        co: 'Native Edge Landscapes',
        date: 'August 2019 – May 2020',
        color: 'early',
        bullets: [
            'Designed and installed residential and commercial landscape projects',
            'Operated equipment and managed physically demanding worksite conditions under tight deadlines',
            'Developed strong attention to detail and project efficiency working in a demanding environment',
        ]
    },
    {
        role: 'Carpenter',
        co: 'Next Generation Construction',
        date: 'November 2020 – August 2023',
        color: 'early',
        bullets: [
            'Constructed residential projects including framing, finish carpentry, and custom installations',
            'Interpreted technical blueprints and executed detailed construction plans with precision',
            'Managed tools, materials, and timelines across multiple concurrent projects',
            'Developed problem solving and spatial reasoning skills that later translated directly to software engineering',
        ]
    },
    {
        role: 'Apple Lab Administrator',
        co: 'University of Colorado Boulder, Office of Information Technology',
        date: 'August 2023 – August 2025',
        color: 'teal',
        bullets: [
            'Designed JAMF Pro workflows to automate software packaging & deployment across CU Boulder\'s Apple ecosystem',
            'Scripted Bash and Python automation for system administration tasks and performance analysis',
            'Troubleshot complex issues via data analysis; collaborated with IT teams to improve fleet reliability',
            'Earned JAMF Certified Associate credential in macOS management',
        ]
    },
    {
        role: 'Tax Intern, Software Development',
        co: 'Frontier Airlines',
        date: 'June 2025 – August 2025',
        color: 'amber',
        bullets: [
            'Automated processes and applied data science to enhance indirect tax operations',
            'Tools utilized: Alteryx, Python, VS Code, Databricks, Microsoft Excel, Power BI',
        ]
    },
    {
        role: 'Contract Software Engineer',
        co: 'Frontier Airlines',
        date: 'August 2025 – December 2025',
        color: 'primary',
        bullets: [
            'Designed and deployed a web app automating tax forms and invoices across multiple countries, reducing quarterly manual effort from 125+ hours to ~6 hours',
            'Built React frontend, Flask backend, and PostgreSQL database hosted on AWS',
            'Integrated Azure AD SSO, ReportLab PDF generation, dynamic tax logic, and automated backups with email alerts',
            'Independently delivered production system in ~850 hours, reducing invoicing time and cost by over 94% via full automation',
            'Enabled accounting team to reallocate 480+ hours annually to strategic initiatives',
        ]
    },
    {
        role: 'Associate Consultant',
        co: 'Planisware',
        date: 'January 2026 – Present',
        color: 'primary',
        bullets: [
            'Contributing to enterprise portfolio and project management (PPM) solutions for global clients',
            'Delivering consulting services and technical expertise to help organizations optimize their processes',
        ]
    },
];

function scrollTimelineToEnd() {
    const scroll = document.getElementById('tl-scroll');
    if (scroll) scroll.scrollLeft = scroll.scrollWidth;
}

// Card click → open / swap detail drawer
document.querySelectorAll('.tl-card-inner').forEach(card => {
    card.addEventListener('click', () => {
        const item    = card.closest('.tl-item');
        const jobIdx  = parseInt(item.getAttribute('data-job'));
        const job     = TL_JOBS[jobIdx];
        const detail  = document.getElementById('tl-detail');
        const prevActive = document.querySelector('.tl-item.tl-active');

        // Click same card → close
        if (prevActive === item) {
            item.classList.remove('tl-active');
            detail.classList.remove('open');
            return;
        }

        if (prevActive) prevActive.classList.remove('tl-active');
        item.classList.add('tl-active');

        document.getElementById('tl-detail-role').textContent  = job.role;
        document.getElementById('tl-detail-co').textContent    = job.co;
        document.getElementById('tl-detail-date').textContent  = job.date;
        document.getElementById('tl-detail-bullets').innerHTML =
            job.bullets.map(b => `<li>${b}</li>`).join('');
        detail.setAttribute('data-color', job.color);
        detail.classList.add('open');
    });
});

// Close button
document.getElementById('tl-detail-close').addEventListener('click', () => {
    document.querySelector('.tl-item.tl-active')?.classList.remove('tl-active');
    document.getElementById('tl-detail').classList.remove('open');
});

// Arrow navigation
const SCROLL_STEP = 300;
document.getElementById('tl-prev').addEventListener('click', () => {
    document.getElementById('tl-scroll').scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
});
document.getElementById('tl-next').addEventListener('click', () => {
    document.getElementById('tl-scroll').scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
});

// Contact form — compose mailto on submit
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name    = document.getElementById('contact-name').value;
        const email   = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value || 'Portfolio Contact';
        const message = document.getElementById('contact-message').value;
        const body    = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        window.location.href = `mailto:lucas.stackhouse@colorado.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Prevent browser from restoring scroll position on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Handle page load with hash
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1) || 'home';
    const [pageId, tabId] = hash.split('/');

    let target;
    if (tabId) {
        // Restore page + tab (e.g. #resume/resume-pdf)
        target = document.querySelector(`.nav-dropdown-item[data-page="${pageId}"][data-tab="${tabId}"]`) ||
                 document.querySelector(`[data-page="${pageId}"][data-tab="${tabId}"]`);
    } else {
        target = document.querySelector(`.nav-link[data-page="${pageId}"]`) ||
                 document.querySelector(`.nav-dropdown-item[data-page="${pageId}"]`);
    }
    if (target) target.click();

    // If landing on the timeline tab, scroll it to the most recent entry
    if (!tabId || tabId === 'timeline') {
        requestAnimationFrame(scrollTimelineToEnd);
    }

    // Double rAF ensures we scroll after the browser's own hash-scroll fires
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    });
});
