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

        // Update URL without triggering scroll
        history.pushState(null, null, '#' + pageId);
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
    });
});

// Prevent browser from restoring scroll position on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Handle page load with hash
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1) || 'home';
    const target = document.querySelector(`.nav-link[data-page="${hash}"]`) ||
                   document.querySelector(`.nav-dropdown-item[data-page="${hash}"]`);
    if (target) target.click();

    // Double rAF ensures we scroll after the browser's own hash-scroll fires
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    });
});
