/**
 * Shinobi Intelligence Archive — Archival Query Protocol
 * Sage of Six Paths CTF // Challenge 03
 */

(function () {
  'use strict';

  // Secure token validation hash for archived record routing
  const TARGET_SIG = "U0VDVE9SLUs5"; // Base64 encoding of archive identifier

  document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('archive-search-form');
    const searchInput = document.getElementById('archive-query-input');
    const feedbackEl = document.getElementById('search-feedback-msg');

    if (!searchForm || !searchInput) {
      return;
    }

    // Clear feedback when typing
    searchInput.addEventListener('input', function () {
      if (feedbackEl) {
        feedbackEl.innerHTML = '';
        feedbackEl.className = 'search-feedback';
      }
    });

    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      executeSearch();
    });

    function executeSearch() {
      const rawValue = searchInput.value || '';
      const query = rawValue.trim().toUpperCase();

      if (!query) {
        showFeedback('Please enter an archive identifier.', 'warning');
        return;
      }

      // Check against encoded target signature and direct normalized match
      const encoded = btoa(query);

      if (encoded === TARGET_SIG || query === 'SECTOR-K9') {
        showFeedback('Clearance verified. Archival observation record retrieved...', 'success');
        
        // Small atmospheric delay before redirection
        setTimeout(function () {
          window.location.href = 'record-k9.html';
        }, 400);
      } else {
        showFeedback('No matching intelligence record found.', 'error');
      }
    }

    function showFeedback(message, type) {
      if (!feedbackEl) return;

      feedbackEl.className = 'search-feedback';
      
      if (type === 'error') {
        feedbackEl.classList.add('search-error');
        feedbackEl.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>${escapeHtml(message)}</span>
        `;
      } else if (type === 'success') {
        feedbackEl.classList.add('search-success');
        feedbackEl.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>${escapeHtml(message)}</span>
        `;
      } else {
        feedbackEl.innerHTML = `<span>${escapeHtml(message)}</span>`;
      }
    }

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  });
})();
