/**
 * Blox client behaviour — ports of hb-theme.js (light/dark toggle),
 * hb-nav.js (mobile menu, dropdowns, scroll padding), and the search modal
 * (upstream Alpine + Pagefind replaced with plain JS over Dune's /api/search).
 * window.hbb and the pre-paint theme init are set inline in the layout head.
 */
(function () {
  "use strict";

  // ── Theme toggle (hb-theme.js) ────────────────────────────────────────────
  function initThemeToggle() {
    var defaultTheme = (window.hbb && window.hbb.defaultTheme) || "system";
    var buttons = document.querySelectorAll(".theme-toggle");

    buttons.forEach(function (el) {
      el.dataset.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
      el.addEventListener("click", function () {
        var isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          window.hbb.setLightTheme();
          localStorage.setItem("wc-color-theme", "light");
        } else {
          window.hbb.setDarkTheme();
          localStorage.setItem("wc-color-theme", "dark");
        }
        el.dataset.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        document.dispatchEvent(
          new CustomEvent("hbThemeChange", {
            detail: {
              isDarkTheme: function () {
                return document.documentElement.classList.contains("dark");
              },
            },
          }),
        );
      });
    });

    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
      if (defaultTheme === "system" && !localStorage.getItem("wc-color-theme")) {
        event.matches ? window.hbb.setDarkTheme() : window.hbb.setLightTheme();
        buttons.forEach(function (el) {
          el.dataset.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        });
      }
    });
  }

  // ── Navigation (hb-nav.js) ────────────────────────────────────────────────
  function applyScrollPadding() {
    var header = document.querySelector(".page-header");
    if (!header) return;
    var height = header.getBoundingClientRect().height;
    document.documentElement.style.scrollPaddingTop = height + "px";
    document.documentElement.style.setProperty("--navbar-height", height + "px");
  }

  function initNav() {
    document.querySelectorAll(".nav-dropdown > .nav-link[role='button']").forEach(function (toggler) {
      var toggle = function (el) {
        var parent = el.closest(".nav-dropdown");
        var willActivate = !parent.classList.contains("active");
        parent.classList.toggle("active", willActivate);
        el.setAttribute("aria-expanded", willActivate ? "true" : "false");
      };
      toggler.addEventListener("click", function (e) {
        e.preventDefault();
        toggle(e.currentTarget);
      });
      toggler.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle(e.currentTarget);
        }
        if (e.key === "Escape") {
          var parent = e.currentTarget.closest(".nav-dropdown");
          if (parent) parent.classList.remove("active");
          e.currentTarget.setAttribute("aria-expanded", "false");
        }
      });
    });
    applyScrollPadding();
  }

  // ── Search modal (over /api/search) ───────────────────────────────────────
  function initSearch() {
    var modal = document.getElementById("hb-search-modal");
    if (!modal) return;
    var input = document.getElementById("hb-search-input");
    var resultsEl = document.getElementById("hb-search-results");
    var seq = 0;
    var debounce = null;

    function open() {
      modal.classList.remove("hidden");
      input.value = "";
      resultsEl.innerHTML = "";
      setTimeout(function () {
        input.focus();
      }, 50);
    }
    function close() {
      modal.classList.add("hidden");
    }

    document.querySelectorAll("[data-search-toggle]").forEach(function (btn) {
      btn.addEventListener("click", open);
    });
    modal.querySelectorAll("[data-search-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        modal.classList.contains("hidden") ? open() : close();
      }
    });

    function escapeHtml(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    var basePath = (document.documentElement.dataset.basePath || "").replace(/\/$/, "");
    function join(path) {
      return (basePath + path).replace(/([^:]\/)\/+/g, "$1");
    }

    function render(items) {
      if (!items.length) {
        resultsEl.innerHTML =
          '<div class="p-6 text-center text-gray-500 dark:text-gray-400">' +
          escapeHtml(modal.dataset.noResults || "No results found") +
          "</div>";
        return;
      }
      resultsEl.innerHTML = items
        .map(function (r) {
          var route = r.route || r.url || "#";
          var href = route.charAt(0) === "/" ? join(route) : route;
          return (
            '<a href="' +
            escapeHtml(href) +
            '" class="search-result block border-b border-gray-100 dark:border-gray-800 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50">' +
            '<div class="font-semibold text-gray-900 dark:text-white">' +
            escapeHtml(r.title || r.route) +
            "</div>" +
            '<div class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">' +
            escapeHtml(r.excerpt || "") +
            "</div></a>"
          );
        })
        .join("");
    }

    input.addEventListener("input", function () {
      clearTimeout(debounce);
      var q = input.value.trim();
      if (!q) {
        resultsEl.innerHTML = "";
        return;
      }
      debounce = setTimeout(function () {
        var current = ++seq;
        fetch(join("/api/search?q=" + encodeURIComponent(q)))
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            if (current !== seq) return;
            render(data.items || data.results || []);
          })
          .catch(function () {
            if (current === seq) render([]);
          });
      }, 150);
    });
  }

  // ── FAQ accordion ─────────────────────────────────────────────────────────
  function initFaq() {
    document.querySelectorAll("[data-faq-root]").forEach(function (root) {
      root.querySelectorAll("[data-faq-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var item = btn.closest("[data-faq-item]");
          if (!item) return;
          var wasOpen = item.classList.contains("is-open");
          root.querySelectorAll("[data-faq-item].is-open").forEach(function (open) {
            open.classList.remove("is-open");
            var t = open.querySelector("[data-faq-toggle]");
            if (t) t.setAttribute("aria-expanded", "false");
            var panel = open.querySelector("[data-faq-panel]");
            if (panel) {
              panel.classList.remove("grid-rows-[1fr]", "opacity-100");
              panel.classList.add("grid-rows-[0fr]", "opacity-0");
            }
            var icon = open.querySelector("[data-faq-icon]");
            if (icon) icon.classList.remove("rotate-45");
          });
          if (!wasOpen) {
            item.classList.add("is-open");
            btn.setAttribute("aria-expanded", "true");
            var panel = item.querySelector("[data-faq-panel]");
            if (panel) {
              panel.classList.remove("grid-rows-[0fr]", "opacity-0");
              panel.classList.add("grid-rows-[1fr]", "opacity-100");
            }
            var icon = item.querySelector("[data-faq-icon]");
            if (icon) icon.classList.add("rotate-45");
          }
        });
      });
    });
  }

  // ── Stats counters ────────────────────────────────────────────────────────
  function parseTarget(statistic) {
    if (!statistic) return 0;
    var num = Number(String(statistic).replace(/[^0-9.]/g, ""));
    return Number.isNaN(num) ? 0 : num;
  }
  function extractParts(text) {
    var parts = String(text || "").match(/([^0-9]*)([0-9][0-9,.]*)(.*)/);
    return {
      prefix: parts ? parts[1] : "",
      numberPart: parts ? parts[2] : "",
      suffix: parts ? parts[3] : "",
    };
  }
  function animateCounters(el) {
    el.classList.add("animate");
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.querySelectorAll(".counter").forEach(function (counter) {
      var target = parseTarget(counter.getAttribute("data-target"));
      if (target <= 0) return;
      var parts = extractParts(counter.textContent);
      var decimals = (parts.numberPart.split(".")[1] || "").length;
      var formatter = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      if (prefersReducedMotion) {
        counter.textContent = parts.prefix + formatter.format(target) + parts.suffix;
        return;
      }
      var duration = 2000;
      var start = Date.now();
      function update() {
        var progress = Math.min((Date.now() - start) / duration, 1);
        var easeOut = 1 - Math.pow(1 - progress, 3);
        counter.textContent = parts.prefix + formatter.format(target * easeOut) + parts.suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }
  function initStats() {
    document.querySelectorAll("[data-stats-root]").forEach(function (root) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounters(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
      );
      root.querySelectorAll(".stats-item").forEach(function (item) {
        var rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) animateCounters(item);
        else observer.observe(item);
      });
    });
  }

  // ── Pricing billing toggle ────────────────────────────────────────────────
  function initPricing() {
    document.querySelectorAll("[data-pricing-root]").forEach(function (root) {
      var toggle = root.querySelector("[data-billing-toggle]");
      if (!toggle) return;
      toggle.addEventListener("click", function () {
        var yearly = root.getAttribute("data-billing") !== "yearly";
        root.setAttribute("data-billing", yearly ? "yearly" : "monthly");
        toggle.setAttribute("aria-checked", yearly ? "true" : "false");
        toggle.classList.toggle("bg-primary-600", yearly);
        toggle.classList.toggle("bg-gray-300", !yearly);
        toggle.classList.toggle("dark:bg-gray-600", !yearly);
        var knob = toggle.querySelector("[data-billing-knob]");
        if (knob) {
          knob.classList.toggle("translate-x-5", yearly);
          knob.classList.toggle("translate-x-0", !yearly);
        }
        root.querySelectorAll("[data-price-monthly]").forEach(function (el) {
          el.classList.toggle("hidden", yearly);
        });
        root.querySelectorAll("[data-price-yearly]").forEach(function (el) {
          el.classList.toggle("hidden", !yearly);
        });
        root.querySelectorAll("[data-label-monthly]").forEach(function (el) {
          el.classList.toggle("font-semibold", !yearly);
          el.classList.toggle("text-gray-900", !yearly);
          el.classList.toggle("dark:text-white", !yearly);
          el.classList.toggle("font-normal", yearly);
          el.classList.toggle("text-gray-400", yearly);
        });
        root.querySelectorAll("[data-label-yearly]").forEach(function (el) {
          el.classList.toggle("font-semibold", yearly);
          el.classList.toggle("text-gray-900", yearly);
          el.classList.toggle("dark:text-white", yearly);
          el.classList.toggle("font-normal", !yearly);
          el.classList.toggle("text-gray-400", !yearly);
        });
      });
    });
  }

  // ── Portfolio tag filter ──────────────────────────────────────────────────
  function initPortfolio() {
    document.querySelectorAll("[data-portfolio-root]").forEach(function (root) {
      root.querySelectorAll("[data-portfolio-filter]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var tag = (btn.getAttribute("data-portfolio-filter") || "").toLowerCase();
          root.querySelectorAll("[data-portfolio-filter]").forEach(function (b) {
            b.classList.toggle("active", b === btn);
            b.setAttribute("aria-pressed", b === btn ? "true" : "false");
          });
          root.querySelectorAll("[data-portfolio-item]").forEach(function (item) {
            var tags = (item.getAttribute("data-tags") || "").toLowerCase();
            var show = !tag || tag === "*" || tag === "all" ||
              tags.split(/\s+/).indexOf(tag) !== -1;
            item.classList.toggle("hidden", !show);
          });
        });
      });
    });
  }

  // ── Dev-hero typewriter ───────────────────────────────────────────────────
  function initTypewriter() {
    document.querySelectorAll("[data-typewriter]").forEach(function (el) {
      var raw = el.getAttribute("data-strings") || "[]";
      var strings;
      try {
        strings = JSON.parse(raw);
      } catch {
        strings = [];
      }
      if (!Array.isArray(strings) || !strings.length) return;
      var target = el.querySelector("[data-typewriter-text]") || el;
      var i = 0;
      var char = 0;
      var deleting = false;
      function tick() {
        var word = String(strings[i % strings.length] || "");
        if (!deleting) {
          char += 1;
          target.textContent = word.slice(0, char);
          if (char >= word.length) {
            deleting = true;
            setTimeout(tick, 1400);
            return;
          }
        } else {
          char -= 1;
          target.textContent = word.slice(0, Math.max(0, char));
          if (char <= 0) {
            deleting = false;
            i = (i + 1) % strings.length;
          }
        }
        setTimeout(tick, deleting ? 40 : 70);
      }
      tick();
    });
  }

  // ── MapLibre maps ─────────────────────────────────────────────────────────
  var MAPLIBRE_JS = "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js";
  var MAPLIBRE_CSS = "https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css";
  var OPENFREEMAP_STYLES = {
    streets: "https://tiles.openfreemap.org/styles/liberty",
    light: "https://tiles.openfreemap.org/styles/positron",
    dark: "https://tiles.openfreemap.org/styles/dark",
    bright: "https://tiles.openfreemap.org/styles/bright",
  };

  function loadMapLibre(cb) {
    if (window.maplibregl) {
      cb();
      return;
    }
    if (!document.querySelector('link[data-maplibre-css]')) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = MAPLIBRE_CSS;
      link.setAttribute("data-maplibre-css", "1");
      document.head.appendChild(link);
    }
    if (window.__hbxMapLibreLoading) {
      window.__hbxMapLibreLoading.push(cb);
      return;
    }
    window.__hbxMapLibreLoading = [cb];
    var script = document.createElement("script");
    script.src = MAPLIBRE_JS;
    script.async = true;
    script.onload = function () {
      var queue = window.__hbxMapLibreLoading || [];
      window.__hbxMapLibreLoading = null;
      queue.forEach(function (fn) {
        fn();
      });
    };
    script.onerror = function () {
      console.warn("[blox/map] Failed to load MapLibre GL");
      window.__hbxMapLibreLoading = null;
    };
    document.head.appendChild(script);
  }

  function escapeHtml(text) {
    return String(text == null ? "" : text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initMaps() {
    var canvases = document.querySelectorAll("[data-map-canvas]");
    if (!canvases.length) return;
    loadMapLibre(function () {
      canvases.forEach(function (el) {
        if (el.dataset.mapReady) return;
        var raw = el.getAttribute("data-map-config") || "{}";
        var cfg;
        try {
          cfg = JSON.parse(raw);
        } catch {
          return;
        }
        var lib = window.maplibregl;
        if (!lib) return;
        el.dataset.mapReady = "1";

        var markers = Array.isArray(cfg.markers) ? cfg.markers : [];
        var location = cfg.location || {};
        var pins = markers.filter(function (m) {
          return m.lat != null && m.lng != null;
        });
        if (!pins.length && location.lat != null && location.lng != null) {
          pins = [{ lat: location.lat, lng: location.lng, title: location.address }];
        }
        var center = pins.length
          ? [pins[0].lng, pins[0].lat]
          : location.lat != null && location.lng != null
          ? [location.lng, location.lat]
          : [0, 0];
        var styleUrl = OPENFREEMAP_STYLES[cfg.style] || OPENFREEMAP_STYLES.streets;

        var map = new lib.Map({
          container: el,
          style: styleUrl,
          center: center,
          zoom: cfg.zoom || 14,
          attributionControl: cfg.attribution === false ? false : { compact: true },
          interactive: cfg.interactive !== false,
          cooperativeGestures: cfg.cooperative_gestures === true,
        });
        if (cfg.interactive !== false) {
          map.addControl(new lib.NavigationControl({ showCompass: false }), "top-right");
        }
        if (pins.length > 1) {
          var bounds = new lib.LngLatBounds();
          pins.forEach(function (m) {
            bounds.extend([m.lng, m.lat]);
          });
          map.once("load", function () {
            map.fitBounds(bounds, { padding: 60, maxZoom: 15, duration: 0 });
          });
        }
        pins.forEach(function (m) {
          var marker = new lib.Marker({ color: "var(--map-pin-color, #6366f1)" }).setLngLat([
            m.lng,
            m.lat,
          ]);
          var popupHtml = [
            m.title ? "<strong>" + escapeHtml(m.title) + "</strong>" : "",
            m.description
              ? '<div class="mt-1 text-sm">' + escapeHtml(m.description) + "</div>"
              : "",
            m.url
              ? '<div class="mt-2"><a class="text-primary-600 underline" href="' +
                escapeHtml(m.url) +
                '">View details →</a></div>'
              : "",
          ]
            .filter(Boolean)
            .join("");
          if (popupHtml) {
            marker.setPopup(new lib.Popup({ offset: 24, closeButton: true }).setHTML(popupHtml));
          }
          marker.addTo(map);
        });
        if (typeof ResizeObserver !== "undefined") {
          var ro = new ResizeObserver(function () {
            map.resize();
          });
          ro.observe(el);
        }
      });
    });
  }

  // ── Gallery lightbox + slideshow ──────────────────────────────────────────
  function galleryItems(root) {
    return Array.prototype.slice.call(root.querySelectorAll("[data-gallery-item]")).map(
      function (el) {
        var img = el.querySelector("[data-gallery-src]") || el.querySelector("img");
        return {
          src: (img && (img.getAttribute("data-gallery-src") || img.getAttribute("src"))) || "",
          alt: (img && img.getAttribute("data-gallery-alt")) || "",
          caption: (img && img.getAttribute("data-gallery-caption")) || "",
          credit: (img && img.getAttribute("data-gallery-credit")) || "",
          title: (img && img.getAttribute("data-gallery-title")) || "",
          link: (img && img.getAttribute("data-gallery-link")) || "",
        };
      },
    ).filter(function (i) {
      return !!i.src;
    });
  }

  function openLightbox(items, index) {
    var existing = document.getElementById("hbx-gallery-lightbox");
    if (existing) existing.remove();
    var i = index;
    var overlay = document.createElement("div");
    overlay.id = "hbx-gallery-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Image lightbox");

    function render() {
      var item = items[i];
      if (!item) return;
      var caption = "";
      if (item.title || item.caption || item.credit || item.link) {
        caption =
          '<figcaption class="mt-4 text-center text-white">' +
          (item.title ? '<div class="text-base font-semibold">' + escapeHtml(item.title) + "</div>" : "") +
          (item.caption ? '<div class="text-sm mt-1 text-gray-200">' + escapeHtml(item.caption) + "</div>" : "") +
          (item.credit || item.link
            ? '<div class="text-xs mt-2 text-gray-400">' +
              (item.credit ? escapeHtml(item.credit) : "") +
              (item.credit && item.link ? '<span class="mx-2">·</span>' : "") +
              (item.link
                ? '<a href="' + escapeHtml(item.link) + '" class="underline hover:no-underline">Open page →</a>'
                : "") +
              "</div>"
            : "") +
          "</figcaption>";
      }
      overlay.innerHTML =
        '<button type="button" data-lb-close aria-label="Close">✕</button>' +
        (items.length > 1
          ? '<button type="button" data-lb-prev aria-label="Previous">‹</button>' +
            '<button type="button" data-lb-next aria-label="Next">›</button>'
          : "") +
        '<figure data-lb-figure>' +
        (items.length > 1
          ? '<div class="absolute -top-10 left-0 text-xs text-gray-300 font-mono">' +
            (i + 1) +
            " / " +
            items.length +
            "</div>"
          : "") +
        '<img src="' +
        escapeHtml(item.src) +
        '" alt="' +
        escapeHtml(item.alt) +
        '"/>' +
        caption +
        "</figure>";

      overlay.querySelector("[data-lb-close]").addEventListener("click", function (e) {
        e.stopPropagation();
        close();
      });
      var prev = overlay.querySelector("[data-lb-prev]");
      var next = overlay.querySelector("[data-lb-next]");
      if (prev) {
        prev.addEventListener("click", function (e) {
          e.stopPropagation();
          i = (i - 1 + items.length) % items.length;
          render();
        });
      }
      if (next) {
        next.addEventListener("click", function (e) {
          e.stopPropagation();
          i = (i + 1) % items.length;
          render();
        });
      }
      var fig = overlay.querySelector("[data-lb-figure]");
      if (fig) {
        fig.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      }
    }

    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") {
        i = (i - 1 + items.length) % items.length;
        render();
      } else if (e.key === "ArrowRight") {
        i = (i + 1) % items.length;
        render();
      }
    }
    function close() {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      overlay.remove();
    }

    overlay.addEventListener("click", close);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    document.body.appendChild(overlay);
    render();
  }

  function initGallery() {
    document.querySelectorAll("[data-gallery-root]").forEach(function (root) {
      var lightbox = root.getAttribute("data-gallery-lightbox") !== "false";
      if (lightbox) {
        root.querySelectorAll("[data-gallery-open]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var idx = Number(btn.getAttribute("data-gallery-open") || "0");
            openLightbox(galleryItems(root), idx);
          });
        });
      }

      var slideshow = root.querySelector("[data-gallery-slideshow]");
      if (!slideshow) return;
      var slides = slideshow.querySelectorAll("[data-gallery-slide]");
      var cur = 0;
      function show(n) {
        cur = (n + slides.length) % slides.length;
        slides.forEach(function (slide, i) {
          slide.classList.toggle("hidden", i !== cur);
        });
      }
      var prevBtn = slideshow.querySelector("[data-gallery-slide-prev]");
      var nextBtn = slideshow.querySelector("[data-gallery-slide-next]");
      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          show(cur - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          show(cur + 1);
        });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initNav();
    initSearch();
    initFaq();
    initStats();
    initPricing();
    initPortfolio();
    initTypewriter();
    initMaps();
    initGallery();
  });
})();
