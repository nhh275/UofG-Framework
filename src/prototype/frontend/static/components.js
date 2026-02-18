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
