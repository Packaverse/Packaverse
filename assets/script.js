document.addEventListener('DOMContentLoaded', () => {
    // Navigation structure
    const navStructure = {
        "Reference": {
            "JSON UI": "json_ui.html",
            "Animations": "animations.html",
            "Molang": "molang.html"
        },
        "Development Tools": {
            "Bedrock CLI": "bedrock_cli.html"
        }
    };

    const navDrawer = document.getElementById('nav-drawer');
    const contentArea = document.getElementById('content');
    
    // 1. Build the Navigation Drawer Dynamically
    if (navDrawer) {
        let navHtml = `<a href="index.html" class="logo-link"><div class="logo">Packaverse</div></a>`;
        for (const category in navStructure) {
            navHtml += `<div class="nav-drawer-header">${category}</div><ul>`;
            for (const pageName in navStructure[category]) {
                const pageUrl = navStructure[category][pageName];
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const isActive = currentPage === pageUrl;
                navHtml += `<li><a href="${pageUrl}" class="${isActive ? 'active' : ''}">${pageName}</a></li>`;
            }
            navHtml += `</ul>`;
        }
        navDrawer.innerHTML = navHtml;
    }

    // 2. Dynamic Markdown Rendering with better error handling
    if (contentArea && contentArea.dataset.mdSrc) {
        const mdPath = contentArea.dataset.mdSrc;
        contentArea.classList.add('loading');
        
        // Check if marked is available
        if (typeof marked === 'undefined') {
            console.error('Marked library is not loaded');
            contentArea.innerHTML = `<div class="error-box">
                <h3>Markdown Parser Error</h3>
                <p>The marked.js library failed to load. Please check your internet connection.</p>
            </div>`;
            contentArea.classList.remove('loading');
            return;
        }
        
        fetch(mdPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(markdown => {
                try {
                    // Parse the markdown and render it
                    const htmlContent = marked.parse(markdown);
                    contentArea.innerHTML = htmlContent;
                    
                    // Add syntax highlighting classes if needed
                    const codeBlocks = contentArea.querySelectorAll('pre code');
                    codeBlocks.forEach(block => {
                        block.classList.add('hljs');
                    });
                    
                } catch (parseError) {
                    console.error('Markdown parsing error:', parseError);
                    contentArea.innerHTML = `<div class="error-box">
                        <h3>Markdown Parsing Error</h3>
                        <p>Failed to parse the markdown content.</p>
                        <details>
                            <summary>Error Details</summary>
                            <pre>${parseError.message}</pre>
                        </details>
                    </div>`;
                }
            })
            .catch(error => {
                console.error('Markdown Loading Error:', error);
                
                let errorMessage = 'Unknown error occurred';
                if (error.message.includes('HTTP 404') || error.message.includes('Not Found')) {
                    errorMessage = `File not found: <code>${mdPath}</code>`;
                } else if (error.message.includes('Failed to fetch')) {
                    errorMessage = 'Network error - are you running this on a local server?';
                } else {
                    errorMessage = error.message;
                }
                
                contentArea.innerHTML = `<div class="error-box">
                    <h3>Failed to load content</h3>
                    <p>${errorMessage}</p>
                    <div class="troubleshooting">
                        <h4>Troubleshooting:</h4>
                        <ol>
                            <li>Check if the markdown file exists at: <code>${mdPath}</code></li>
                            <li>Ensure you're running this on a local web server (not file://)</li>
                            <li>Verify the file path is correct in the HTML data-md-src attribute</li>
                            <li>Check browser console for additional errors</li>
                        </ol>
                    </div>
                </div>`;
            })
            .finally(() => {
                contentArea.classList.remove('loading');
            });
    }

    // 3. Drawer Toggle Functionality
    const menuBtn = document.getElementById('menu-btn');
    const backdrop = document.getElementById('backdrop');

    const toggleDrawer = () => {
        if (window.innerWidth <= 960) {
            navDrawer.classList.toggle('open');
            backdrop.classList.toggle('visible');
            // Prevent body scroll when drawer is open
            document.body.style.overflow = navDrawer.classList.contains('open') ? 'hidden' : '';
        }
    };

    const closeDrawer = () => {
        if (window.innerWidth <= 960) {
            navDrawer.classList.remove('open');
            backdrop.classList.remove('visible');
            document.body.style.overflow = '';
        }
    };

    if (menuBtn) menuBtn.addEventListener('click', toggleDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    
    // Close drawer when clicking on navigation links on mobile
    navDrawer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && window.innerWidth <= 960) {
            closeDrawer();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 960) {
            navDrawer.classList.remove('open');
            backdrop.classList.remove('visible');
            document.body.style.overflow = '';
        }
    });

    // 4. Search functionality enhancement
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            const query = searchInput.value.trim();
            if (!query) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to close drawer
        if (e.key === 'Escape') {
            closeDrawer();
        }
    });
});