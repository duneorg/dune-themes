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

    function render(items) {
      if (!items.length) {
        resultsEl.innerHTML =
          '<div class="p-6 text-center text-gray-500 dark:text-gray-400">No results found</div>';
        return;
      }
      resultsEl.innerHTML = items
        .map(function (r) {
          return (
            '<a href="' +
            r.route +
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

    function escapeHtml(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
        fetch("/api/search?q=" + encodeURIComponent(q))
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

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initNav();
    initSearch();
  });
})();
