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

// Handle career tab switcher (in-page)
document.querySelectorAll('.career-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        document.querySelectorAll('.career-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.career-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`panel-${tabId}`).classList.add('active');
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
