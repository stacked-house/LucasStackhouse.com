// Handle navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const pageId = link.getAttribute('data-page');
        
        // Remove active class from all links and pages
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked link and corresponding page
        link.classList.add('active');
        document.getElementById(pageId).classList.add('active');
        
        // Update URL hash
        window.location.hash = pageId;
    });
});

// Handle page load with hash
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1) || 'home';
    const pageLink = document.querySelector(`[data-page="${hash}"]`);
    if (pageLink) {
        pageLink.click();
    }
});
