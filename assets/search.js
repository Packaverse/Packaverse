document.addEventListener('DOMContentLoaded', async () => {
    const resultsContainer = document.getElementById('results-container');
    const status = document.getElementById('search-status');
    const searchInput = document.getElementById('search-input');

    // List of all pages to include in the search
    const pagesToSearch = [
        '/pages/reference/json_ui.html',
        '/pages/reference/animations.html',
        '/pages/dev_tools/bedrock_cli.html',
        '/pages/project_templates/complete_base_pack.html',
        // ADD EVERY SINGLE HTML PAGE YOU CREATE HERE
    ];

    let searchIndex = [];

    async function buildIndex() {
        try {
            const fetchPromises = pagesToSearch.map(async (url) => {
                const response = await fetch(url);
                if (!response.ok) return null;

                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                const title = doc.querySelector('h1')?.textContent || 'Untitled';
                const content = doc.querySelector('main')?.innerText || '';
                
                return { url, title, content };
            });

            const results = await Promise.all(fetchPromises);
            searchIndex = results.filter(p => p); // Filter out any failed fetches
            status.textContent = `Ready to search ${searchIndex.length} documents.`;

            // Perform initial search based on URL query parameter
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
            if (query) {
                searchInput.value = query;
                performSearch(query);
            }

        } catch (error) {
            status.textContent = 'Failed to build search index.';
            console.error('Search Index Error:', error);
        }
    }

    function performSearch(query) {
        if (!query || query.length < 2) {
            resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const matches = searchIndex.filter(page =>
            page.title.toLowerCase().includes(lowerCaseQuery) ||
            page.content.toLowerCase().includes(lowerCaseQuery)
        );

        if (matches.length === 0) {
            resultsContainer.innerHTML = `<p>No results found for "<strong>${query}</strong>".</p>`;
            return;
        }

        let resultsHtml = '';
        matches.forEach(page => {
            resultsHtml += `
                <div class="result-item">
                    <a href="${page.url}">${page.title}</a>
                    <span class="path">${page.url}</span>
                    <p>${page.content.substring(0, 150)}...</p>
                </div>
            `;
        });
        resultsContainer.innerHTML = resultsHtml;
    }

    // Event listener for the search input on the search page
    searchInput.addEventListener('input', (e) => performSearch(e.target.value));

    // Build the index when the page loads
    buildIndex();
});