/* Starlight for Dune — client behaviour. Ports of the <script> blocks in the
 * upstream .astro components (withastro/starlight, MIT): menu button, theme
 * select, language select, sidebar state persistence, ToC scroll spy, tabs.
 * The search modal talks to Dune's /api/search instead of Pagefind. */
(() => {
	const PAGE_TITLE_ID = '_top';

	/* === MobileMenuToggle.astro === */
	class StarlightMenuButton extends HTMLElement {
		constructor() {
			super();
			this.btn = this.querySelector('button');
			this.btn.addEventListener('click', () => this.toggleExpanded());
			const parentNav = this.closest('nav');
			if (parentNav) parentNav.addEventListener('keyup', (e) => this.closeOnEscape(e));
			matchMedia('(min-width: 50em)').addEventListener('change', () => this.setExpanded(false));
		}
		setExpanded(expanded) {
			this.setAttribute('aria-expanded', String(expanded));
			document.body.toggleAttribute('data-mobile-menu-expanded', expanded);
			document.querySelectorAll('.main-frame, .sl-skip-link').forEach((el) => {
				el.toggleAttribute('inert', expanded);
			});
		}
		toggleExpanded() {
			this.setExpanded(this.getAttribute('aria-expanded') !== 'true');
		}
		closeOnEscape(e) {
			if (e.code === 'Escape') {
				this.setExpanded(false);
				this.btn.focus();
			}
		}
	}
	customElements.define('starlight-menu-button', StarlightMenuButton);

	/* === ThemeSelect.astro === */
	const storageKey = 'starlight-theme';
	const parseTheme = (theme) =>
		theme === 'auto' || theme === 'dark' || theme === 'light' ? theme : 'auto';
	const loadTheme = () =>
		parseTheme(typeof localStorage !== 'undefined' && localStorage.getItem(storageKey));
	function storeTheme(theme) {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(storageKey, theme === 'light' || theme === 'dark' ? theme : '');
		}
	}
	const getPreferredColorScheme = () =>
		matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
	function onThemeChange(theme) {
		StarlightThemeProvider.updatePickers(theme);
		document.documentElement.dataset.theme = theme === 'auto' ? getPreferredColorScheme() : theme;
		storeTheme(theme);
	}
	matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
		if (loadTheme() === 'auto') onThemeChange('auto');
	});
	class StarlightThemeSelect extends HTMLElement {
		constructor() {
			super();
			onThemeChange(loadTheme());
			this.querySelector('select')?.addEventListener('change', (e) => {
				if (e.currentTarget instanceof HTMLSelectElement) {
					onThemeChange(parseTheme(e.currentTarget.value));
				}
			});
		}
	}
	customElements.define('starlight-theme-select', StarlightThemeSelect);

	/* === LanguageSelect.astro === */
	class StarlightLanguageSelect extends HTMLElement {
		constructor() {
			super();
			const select = this.querySelector('select');
			if (select) {
				select.addEventListener('change', (e) => {
					if (e.currentTarget instanceof HTMLSelectElement) {
						window.location.pathname = e.currentTarget.value;
					}
				});
				window.addEventListener('pageshow', (event) => {
					if (!event.persisted) return;
					const markupSelectedIndex = select.querySelector('option[selected]')?.index;
					if (markupSelectedIndex !== select.selectedIndex) {
						select.selectedIndex = markupSelectedIndex ?? 0;
					}
				});
			}
		}
	}
	customElements.define('starlight-lang-select', StarlightLanguageSelect);

	/* === components-internals/SidebarPersistState (save on unload) === */
	const persister = document.querySelector('sl-sidebar-state-persist');
	if (persister) {
		const scroller = document.getElementById('starlight__sidebar');
		const saveState = () => {
			try {
				const details = [...persister.querySelectorAll('sl-sidebar-restore')].map((el) => {
					const d = el.closest('details');
					return d ? d.open : true;
				});
				sessionStorage.setItem(
					'sl-sidebar-state',
					JSON.stringify({ hash: persister.dataset.hash, open: details, scroll: scroller ? scroller.scrollTop : 0 })
				);
			} catch {}
		};
		addEventListener('beforeunload', saveState);
		document.addEventListener('click', (e) => {
			if (e.target instanceof Element && e.target.closest('#starlight__sidebar a')) saveState();
		});
	}

	/* === components-internals/TableOfContents/starlight-toc.ts === */
	class StarlightTOC extends HTMLElement {
		constructor() {
			super();
			this._current = this.querySelector('a[aria-current="true"]');
			this.minH = parseInt(this.dataset.minH || '2', 10);
			this.maxH = parseInt(this.dataset.maxH || '3', 10);
			this.tocHeadingSelector =
				`h1#${PAGE_TITLE_ID},` +
				`:where(${[...Array.from({ length: 1 + this.maxH - this.minH }).map((_, index) => `h${this.minH + index}`)].join()})[id]`;
			this.onIdle(() => this.init());
		}
		set current(link) {
			if (link === this._current) return;
			if (this._current) this._current.removeAttribute('aria-current');
			link.setAttribute('aria-current', 'true');
			this._current = link;
		}
		onIdle(cb) {
			(window.requestIdleCallback || ((cb) => setTimeout(cb, 1)))(cb);
		}
		init() {
			const links = [...this.querySelectorAll('a')];
			const isHeading = (el) => el.matches(this.tocHeadingSelector);
			const getElementHeading = (el) => {
				if (!el) return null;
				const origin = el;
				while (el) {
					if (el.matches('.sl-markdown-content, main > *')) {
						return document.getElementById(PAGE_TITLE_ID);
					}
					if (isHeading(el)) return el;
					const childHeading = el.querySelector(this.tocHeadingSelector);
					if (childHeading) return childHeading;
					el = el.previousElementSibling;
					while (el?.lastElementChild) {
						el = el.lastElementChild;
					}
					const h = getElementHeading(el);
					if (h) return h;
				}
				return getElementHeading(origin.parentElement);
			};
			const setCurrent = (entries) => {
				for (const { isIntersecting, target } of entries) {
					if (!isIntersecting) continue;
					const heading = getElementHeading(target);
					if (!heading) continue;
					const link = links.find((link) => link.hash === '#' + encodeURIComponent(heading.id));
					if (link) {
						this.current = link;
						break;
					}
				}
			};
			const toObserve = document.querySelectorAll(
				[
					`main :where(${this.tocHeadingSelector})`,
					`main :where(${this.tocHeadingSelector}, .sl-heading-wrapper) ~ *:not(:has(${this.tocHeadingSelector}))`,
					`main .sl-markdown-content > *:not(:has(${this.tocHeadingSelector}))`,
					`main > *:not(:has(${this.tocHeadingSelector}))`,
				].join()
			);
			let observer;
			const observe = () => {
				if (observer) return;
				observer = new IntersectionObserver(setCurrent, { rootMargin: this.getRootMargin() });
				toObserve.forEach((h) => observer.observe(h));
			};
			observe();
			let timeout;
			window.addEventListener('resize', () => {
				if (observer) {
					observer.disconnect();
					observer = undefined;
				}
				clearTimeout(timeout);
				timeout = setTimeout(() => this.onIdle(observe), 200);
			});
		}
		getRootMargin() {
			const navBarHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
			const mobileTocHeight = this.querySelector('summary')?.getBoundingClientRect().height || 0;
			const top = navBarHeight + mobileTocHeight + 32;
			const bottom = top + 53;
			const height = document.documentElement.clientHeight;
			return `-${top}px 0% ${bottom - height}px`;
		}
	}
	customElements.define('starlight-toc', StarlightTOC);

	/* === MobileTableOfContents.astro === */
	class MobileStarlightTOC extends StarlightTOC {
		set current(link) {
			super.current = link;
			const display = this.querySelector('.display-current');
			if (display) display.textContent = link.textContent;
		}
		constructor() {
			super();
			const details = this.querySelector('details');
			if (!details) return;
			const closeToC = () => {
				details.open = false;
			};
			details.querySelectorAll('a').forEach((a) => {
				a.addEventListener('click', closeToC);
			});
			window.addEventListener('click', (e) => {
				if (!details.contains(e.target)) closeToC();
			});
			window.addEventListener('keydown', (e) => {
				if (e.key === 'Escape' && details.open) {
					const hasFocus = details.contains(document.activeElement);
					closeToC();
					if (hasFocus) {
						const summary = details.querySelector('summary');
						if (summary) summary.focus();
					}
				}
			});
		}
	}
	customElements.define('mobile-starlight-toc', MobileStarlightTOC);

	/* === user-components/Tabs.astro === */
	class StarlightTabsRestore extends HTMLElement {
		connectedCallback() {
			const starlightTabs = this.closest('starlight-tabs');
			if (!(starlightTabs instanceof HTMLElement) || typeof localStorage === 'undefined') return;
			const syncKey = starlightTabs.dataset.syncKey;
			if (!syncKey) return;
			const label = localStorage.getItem(`starlight-synced-tabs__${syncKey}`);
			if (!label) return;
			const tabs = [...starlightTabs.querySelectorAll('[role="tab"]')];
			const tabIndexToRestore = tabs.findIndex(
				(tab) => tab instanceof HTMLAnchorElement && tab.textContent?.trim() === label
			);
			const panels = starlightTabs.querySelectorAll(':scope > [role="tabpanel"]');
			const newTab = tabs[tabIndexToRestore];
			const newPanel = panels[tabIndexToRestore];
			if (tabIndexToRestore < 1 || !newTab || !newPanel) return;
			tabs[0]?.setAttribute('aria-selected', 'false');
			tabs[0]?.setAttribute('tabindex', '-1');
			panels?.[0]?.setAttribute('hidden', 'true');
			newTab.removeAttribute('tabindex');
			newTab.setAttribute('aria-selected', 'true');
			newPanel.removeAttribute('hidden');
		}
	}
	customElements.define('starlight-tabs-restore', StarlightTabsRestore);

	const syncedTabs = new Map();
	class StarlightTabs extends HTMLElement {
		constructor() {
			super();
			const tablist = this.querySelector('[role="tablist"]');
			if (!tablist) return;
			this.tabs = [...tablist.querySelectorAll('[role="tab"]')];
			this.panels = [...this.querySelectorAll(':scope > [role="tabpanel"]')];
			this.syncKey = this.dataset.syncKey;
			this.storageKeyPrefix = 'starlight-synced-tabs__';
			if (this.syncKey) {
				const list = syncedTabs.get(this.syncKey) ?? [];
				list.push(this);
				syncedTabs.set(this.syncKey, list);
			}
			this.tabs.forEach((tab, i) => {
				tab.addEventListener('click', (e) => {
					e.preventDefault();
					const currentTab = tablist.querySelector('[aria-selected="true"]');
					if (e.currentTarget !== currentTab) {
						this.switchTab(e.currentTarget, i);
					}
				});
				tab.addEventListener('keydown', (e) => {
					const index = this.tabs.indexOf(e.currentTarget);
					const nextIndex =
						e.key === 'ArrowLeft'
							? index - 1
							: e.key === 'ArrowRight'
								? index + 1
								: e.key === 'Home'
									? 0
									: e.key === 'End'
										? this.tabs.length - 1
										: null;
					if (nextIndex === null) return;
					if (this.tabs[nextIndex]) {
						e.preventDefault();
						this.switchTab(this.tabs[nextIndex], nextIndex);
					}
				});
			});
		}
		switchTab(newTab, index, shouldSync = true) {
			if (!newTab) return;
			const previousTabsOffset = shouldSync ? this.getBoundingClientRect().top : 0;
			this.tabs.forEach((tab) => {
				tab.setAttribute('aria-selected', 'false');
				tab.setAttribute('tabindex', '-1');
			});
			this.panels.forEach((oldPanel) => {
				oldPanel.hidden = true;
			});
			const newPanel = this.panels[index];
			if (newPanel) newPanel.hidden = false;
			newTab.removeAttribute('tabindex');
			newTab.setAttribute('aria-selected', 'true');
			if (shouldSync) {
				newTab.focus();
				StarlightTabs.syncTabs(this, newTab);
				window.scrollTo({
					top: window.scrollY + (this.getBoundingClientRect().top - previousTabsOffset),
					behavior: 'instant',
				});
			}
		}
		persistSyncedTabs(label) {
			if (!this.syncKey || typeof localStorage === 'undefined') return;
			localStorage.setItem(this.storageKeyPrefix + this.syncKey, label);
		}
		static getTabLabel(tab) {
			return tab.textContent?.trim();
		}
		static syncTabs(emitter, newTab) {
			const syncKey = emitter.syncKey;
			const label = StarlightTabs.getTabLabel(newTab);
			if (!syncKey || !label) return;
			const list = syncedTabs.get(syncKey);
			if (!list) return;
			for (const receiver of list) {
				if (receiver === emitter) continue;
				const labelIndex = receiver.tabs.findIndex((tab) => StarlightTabs.getTabLabel(tab) === label);
				if (labelIndex === -1) continue;
				receiver.switchTab(receiver.tabs[labelIndex], labelIndex, false);
			}
			emitter.persistSyncedTabs(label);
		}
	}
	customElements.define('starlight-tabs', StarlightTabs);

	/* === Search.astro (modal shell; results via Dune /api/search) === */
	class SiteSearch extends HTMLElement {
		constructor() {
			super();
			const openBtn = this.querySelector('button[data-open-modal]');
			const closeBtn = this.querySelector('button[data-close-modal]');
			const dialog = this.querySelector('dialog');
			const dialogFrame = this.querySelector('.dialog-frame');
			if (!openBtn || !dialog || !dialogFrame) return;

			const onClick = (event) => {
				const isLink = 'href' in (event.target || {});
				if (
					isLink ||
					(document.body.contains(event.target) && !dialogFrame.contains(event.target))
				) {
					closeModal();
				}
			};
			const openModal = (event) => {
				dialog.showModal();
				document.body.toggleAttribute('data-search-modal-open', true);
				this.querySelector('input')?.focus();
				event?.stopPropagation();
				window.addEventListener('click', onClick);
			};
			const closeModal = () => dialog.close();
			openBtn.addEventListener('click', openModal);
			openBtn.disabled = false;
			closeBtn?.addEventListener('click', closeModal);
			dialog.addEventListener('close', () => {
				document.body.toggleAttribute('data-search-modal-open', false);
				window.removeEventListener('click', onClick);
			});
			window.addEventListener('keydown', (e) => {
				if ((e.metaKey === true || e.ctrlKey === true) && e.key === 'k') {
					dialog.open ? closeModal() : openModal();
					e.preventDefault();
				}
			});

			// Dune deviation: query /api/search instead of Pagefind.
			// basePath comes from data-base-path on <site-search> (or <html>)
			// so the modal works under themes.getdune.org/{slug}/ path-prefix hosting.
			const basePath = (this.dataset.basePath || document.documentElement.dataset.basePath || '').replace(/\/$/, '');
			const join = (path) => (basePath + path).replace(/([^:]\/)\/+/g, '$1');
			const input = this.querySelector('input[type="search"]');
			const results = this.querySelector('.search-results');
			const message = this.querySelector('.search-message');
			if (input && results && message) {
				let timer;
				let seq = 0;
				const render = (items) => {
					results.innerHTML = '';
					for (const item of items) {
						const li = document.createElement('li');
						const a = document.createElement('a');
						const route = item.url ?? item.route ?? '#';
						a.href = route.startsWith('/') ? join(route) : route;
						a.textContent = item.title ?? a.href;
						if (item.excerpt) {
							const span = document.createElement('span');
							span.className = 'excerpt';
							span.textContent = item.excerpt;
							a.appendChild(span);
						}
						li.appendChild(a);
						results.appendChild(li);
					}
				};
				input.addEventListener('input', () => {
					clearTimeout(timer);
					const q = input.value.trim();
					if (!q) {
						render([]);
						message.textContent = '';
						return;
					}
					timer = setTimeout(async () => {
						const current = ++seq;
						try {
							const res = await fetch(join(`/api/search?q=${encodeURIComponent(q)}`));
							const data = await res.json();
							if (current !== seq) return;
							const items = data.items ?? data.results ?? [];
							render(items);
							message.textContent = items.length ? '' : this.dataset.noResults || 'No results';
						} catch {
							if (current === seq) {
								message.textContent = this.dataset.searchFailed || 'Search failed';
							}
						}
					}, 150);
				});
			}
		}
	}
	customElements.define('site-search', SiteSearch);

	// Search.astro inline platform-key script
	(() => {
		const openBtn = document.querySelector('button[data-open-modal]');
		const shortcut = openBtn?.querySelector('kbd');
		if (!openBtn || !(shortcut instanceof HTMLElement)) return;
		const platformKey = shortcut.querySelector('kbd');
		if (platformKey && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
			platformKey.textContent = '⌘';
			openBtn.setAttribute('aria-keyshortcuts', 'Meta+K');
		}
		shortcut.style.display = '';
	})();
})();
