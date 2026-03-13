(function () {
  const tabSets = document.querySelectorAll('.uofg-tabs[data-tabs]');

  tabSets.forEach(tabsEl => {
    const tabs = Array.from(tabsEl.querySelectorAll('.uofg-tabs__tab[role="tab"]'));
    const panels = Array.from(tabsEl.querySelectorAll('.uofg-tabs__panel[role="tabpanel"]'));

    function activateTab(newTab) {
      const panelId = newTab.getAttribute('aria-controls');
      const newPanel = panelId ? tabsEl.querySelector(`#${panelId}`) : null;

      tabs.forEach(tab => {
        const isActive = tab === newTab;
        tab.classList.toggle('uofg-tabs__tab--active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      panels.forEach(panel => {
        const isActive = newPanel && panel === newPanel;
        panel.hidden = !isActive;
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => activateTab(tab));
    });

    const initial =
      tabs.find(t => t.classList.contains('uofg-tabs__tab--active')) ||
      tabs.find(t => t.getAttribute('aria-selected') === 'true') ||
      tabs[0];

    if (initial) activateTab(initial);
  });
})();


/*
 * Pagination functionality
 * Handles click events on pagination links and navigates between pages
 * Manages visibility of Previous/Next buttons and shows ellipsis for skipped pages
 */

document.addEventListener('DOMContentLoaded', function () {
    const paginationContainer = document.querySelector('.pagination');
    
    if (!paginationContainer) {
        console.warn('Pagination container not found');
        return;
    }

    const paginationLinks = paginationContainer.querySelectorAll('a');
    const prevLink = document.getElementById('prev-link');
    const nextLink = document.getElementById('next-link');
    
    const pageLinks = Array.from(paginationLinks).filter(link => {
        const text = link.textContent.trim();
        return text !== 'Previous' && text !== 'Next';
    });

    const totalPages = pageLinks.length;

    /* Gets the current active page number and returns current page number */
    function getActivePage() {
        const activeLink = paginationContainer.querySelector('a.active');
        if (!activeLink) {
            return 1;
        }
        // Prefer a stored pageNum, fall back to text content
        const value = activeLink.dataset.pageNum || activeLink.textContent.trim();
        const num = parseInt(value, 10);
        return isNaN(num) ? 1 : num;
    }

    /* Navigates to the specified page in pageNum */
    function navigateToPage(pageNum) {
        if (pageNum >= 1 && pageNum <= totalPages) {
            let fileName;
            if (pageNum === 1) {
                fileName = 'index.html';
            } else {
                fileName = `page${pageNum}.html`;
            }
            window.location.href = fileName;
        }
    }

    /* Updates button visibility based on current page */
    function updateButtonVisibility() {
        const currentPage = getActivePage();
        
        // Hide Previous button on first page
        if (prevLink) {
            prevLink.parentElement.style.display = currentPage === 1 ? 'none' : 'li';
        }
        
        // Hide Next button on last page
        if (nextLink) {
            nextLink.parentElement.style.display = currentPage === totalPages ? 'none' : 'li';
        }
    }

    /* Updates page visibility with ellipsis for large page counts - 6 pages at a time shown */
    function updatePageVisibility() {
        const currentPage = getActivePage();
        const pagesPerGroup = 6;
        
        // If 6 or fewer pages, show all
        if (totalPages <= pagesPerGroup) {
            pageLinks.forEach((link, index) => {
                link.parentElement.style.display = 'li';
                link.textContent = index + 1;
                link.style.cursor = 'pointer';
                link.style.pointerEvents = 'auto';
                link.style.opacity = '';
                link.dataset.pageNum = index + 1;
            });
            return;
        }

        /* calculates which group the current page belongs to */
        const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
        const groupStart = currentGroup * pagesPerGroup + 1;
        const groupEnd = Math.min(groupStart + pagesPerGroup - 1, totalPages);

        /* Build list of visible items */
        const visibleItems = [];
        
        /* Add the pages in the current group */
        for (let i = groupStart; i <= groupEnd; i++) {
            visibleItems.push(i);
        }
        
        /* Add ellipsis after if group doesn't end at last page */
        if (groupEnd < totalPages) {
            visibleItems.push('...');
        }

        /* Assign visible items to page link elements */
        pageLinks.forEach((link, index) => {
            if (index < visibleItems.length) {
                const item = visibleItems[index];
                link.parentElement.style.display = 'li';
                link.textContent = item;
                link.dataset.pageNum = item;
                
                if (item === '...') {
                    link.style.cursor = 'default';
                    link.style.pointerEvents = 'none';
                    link.style.opacity = '0.7';
                } else {
                    link.style.cursor = 'pointer';
                    link.style.pointerEvents = 'auto';
                    link.style.opacity = '';
                }
            } else {
                link.parentElement.style.display = 'none';
            }
        });
        
        /* ensure correct active class remains visible */
        pageLinks.forEach(link => link.classList.remove('active'));
        const activeLink = pageLinks.find(l => parseInt(l.dataset.pageNum) === currentPage);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } 

    updateButtonVisibility(); /* used to intiialise the visibility */
    updatePageVisibility();

    /* Add click event listeners to all pagination links */
    paginationLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const linkText = this.textContent.trim();
            
            // Skip ellipsis clicks
            if (linkText === '...') {
                return;
            }

            let targetPageNum = null;

            if (linkText === 'Previous') {
                const currentPage = getActivePage();
                targetPageNum = currentPage - 1;
            } else if (linkText === 'Next') {
                const currentPage = getActivePage();
                targetPageNum = currentPage + 1;
            } else {
                /* Use data attribute or parse text */
                targetPageNum = parseInt(this.dataset.pageNum || linkText);
            }

            /* Navigate to the page if valid */
            if (targetPageNum && targetPageNum >= 1 && targetPageNum <= totalPages) {
                navigateToPage(targetPageNum);
            }
        });
    });

    /* Public API for programmatic pagination */
    window.pagination = {
        /* Navigate to a specific page designated by pageNum */
        goToPage: function (pageNum) {
            navigateToPage(pageNum);
        },

        /* Get the current active page number, returns it */
        getCurrentPage: function () {
            return getActivePage();
        },

        /* Get the total number of pages and returns it */
        getTotalPages: function () {
            return totalPages;
        }
    };
});