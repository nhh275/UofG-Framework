document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.pagination').forEach(paginationContainer => {
        // const paginationContainer = document.querySelector('.pagination');

        if (!paginationContainer) {
            console.warn('Pagination container not found');
            return;
        }

        const paginationLinks = paginationContainer.querySelectorAll('a');
        const prevLink = paginationContainer.querySelector('#prev-link');
        const nextLink = paginationContainer.querySelector('#next-link');

        const pageLinks = Array.from(paginationLinks).filter(link => {
            const text = link.textContent.trim();
            return text !== 'Previous' && text !== 'Next';
        });

        const totalPages = pageLinks.length;

        /* Store each link's real page number once so it is never lost */
        pageLinks.forEach((link, index) => {
            link.dataset.targetPage = String(index + 1);
        });

        /* Get current page by matching the current URL against the page links */
        function getCurrentPageFromUrl() {
            const currentPath = window.location.pathname.split('/').pop();

            const matchedLink = pageLinks.find(link => {
                const linkPath = new URL(link.href, window.location.href).pathname.split('/').pop();
                return linkPath === currentPath;
            });

            if (!matchedLink) {
                return 1;
            }

            const num = parseInt(matchedLink.dataset.targetPage, 10);
            return isNaN(num) ? 1 : num;
        }

        /* Navigates to the specified page */
        function navigateToPage(pageNum) {
            const targetLink = pageLinks.find(link => {
                return parseInt(link.dataset.targetPage, 10) === pageNum;
            });

            if (targetLink && targetLink.href) {
                window.location.href = targetLink.href;
            }
        }

        /* Updates button visibility based on current page */
        function updateButtonVisibility(currentPage) {
            if (prevLink) {
                prevLink.parentElement.style.display = currentPage === 1 ? 'none' : '';
            }

            if (nextLink) {
                nextLink.parentElement.style.display = currentPage === totalPages ? 'none' : '';
            }
        }

        /* Updates page visibility with ellipsis for large page counts */
        function updatePageVisibility(currentPage) {
            const pagesPerGroup = 6;

            if (totalPages <= pagesPerGroup) {
                pageLinks.forEach((link, index) => {
                    link.parentElement.style.display = '';
                    link.textContent = String(index + 1);
                    link.dataset.pageNum = String(index + 1);
                    link.style.cursor = 'pointer';
                    link.style.pointerEvents = 'auto';
                    link.style.opacity = '';
                    link.classList.remove('active');

                    if (index + 1 === currentPage) {
                        link.classList.add('active');
                    }
                });
                return;
            }

            const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
            const groupStart = currentGroup * pagesPerGroup + 1;
            const groupEnd = Math.min(groupStart + pagesPerGroup - 1, totalPages);

            const visibleItems = [];

            visibleItems.push(1);

            if (groupStart > 2) {
                visibleItems.push('...')
            }

            for (let i = groupStart; i <= groupEnd; i++) {
                if (i !== 1 && i <= totalPages) {
                    visibleItems.push(i);
                }
                
            }

            if (groupEnd < totalPages) {
                visibleItems.push('...');
            }

            pageLinks.forEach((link, index) => {
                link.classList.remove('active');

                if (index < visibleItems.length) {
                    const item = visibleItems[index];
                    link.parentElement.style.display = '';
                    link.textContent = String(item);
                    link.dataset.pageNum = String(item);

                    if (item === '...') {
                        link.style.cursor = 'default';
                        link.style.pointerEvents = 'none';
                        link.style.opacity = '0.7';
                    } else {
                        link.style.cursor = 'pointer';
                        link.style.pointerEvents = 'auto';
                        link.style.opacity = '';

                        if (item === currentPage) {
                            link.classList.add('active');
                        }
                    }
                } else {
                    link.parentElement.style.display = 'none';
                }
            });
        }

        const currentPage = getCurrentPageFromUrl();
        updatePageVisibility(currentPage);
        updateButtonVisibility(currentPage);

        /* Add click event listeners to all pagination links */
        paginationLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const linkText = this.textContent.trim();

                if (linkText === '...') {
                    return;
                }

                let targetPageNum = null;
                const currentPage = getCurrentPageFromUrl();

                if (linkText === 'Previous') {
                    targetPageNum = currentPage - 1;
                } else if (linkText === 'Next') {
                    targetPageNum = currentPage + 1;
                } else {
                    targetPageNum = parseInt(this.dataset.pageNum || linkText, 10);
                }

                if (targetPageNum && targetPageNum >= 1 && targetPageNum <= totalPages) {
                    navigateToPage(targetPageNum);
                }
            });
        });

        /* Public API for programmatic pagination */
        window.pagination = {
            goToPage: function (pageNum) {
                navigateToPage(pageNum);
            },

            getCurrentPage: function () {
                return getCurrentPageFromUrl();
            },

            getTotalPages: function () {
                return totalPages;
            }
        };
    });
});