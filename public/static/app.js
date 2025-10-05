// Rain animation
function createRainEffect() {
  const rainContainer = document.querySelector('.rain-container');
  if (!rainContainer) return;
  
  const numberOfDrops = 50;
  
  for (let i = 0; i < numberOfDrops; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.animationDuration = (Math.random() * 2 + 2) + 's';
    drop.style.animationDelay = Math.random() * 2 + 's';
    drop.style.opacity = Math.random() * 0.3 + 0.3;
    rainContainer.appendChild(drop);
  }
}

// Window effects
function createWindowEffects() {
  // Skip window effects for admin pages
  if (window.location.pathname.includes('/admin')) {
    document.body.classList.add('admin-page');
    return;
  }
  
  // Create curtains
  const curtainLeft = document.createElement('div');
  curtainLeft.className = 'curtain-left';
  document.body.appendChild(curtainLeft);
  
  const curtainRight = document.createElement('div');
  curtainRight.className = 'curtain-right';
  document.body.appendChild(curtainRight);
  
  // Create window frame
  const windowFrame = document.createElement('div');
  windowFrame.className = 'window-frame';
  document.body.appendChild(windowFrame);
  
  // Create glass reflection
  const glassReflection = document.createElement('div');
  glassReflection.className = 'glass-reflection';
  document.body.appendChild(glassReflection);
  
  // Create window fog effect
  const windowFog = document.createElement('div');
  windowFog.className = 'window-fog';
  document.body.appendChild(windowFog);
  
  // Create window drops container
  const windowDrops = document.createElement('div');
  windowDrops.className = 'window-drops';
  document.body.appendChild(windowDrops);
  
  // Add drops sliding on window
  const numberOfWindowDrops = 15;
  for (let i = 0; i < numberOfWindowDrops; i++) {
    setTimeout(() => {
      createWindowDrop(windowDrops);
    }, i * 800);
  }
  
  // Continuously add new drops
  setInterval(() => {
    if (Math.random() > 0.3) {
      createWindowDrop(windowDrops);
    }
  }, 2000);
}

function createWindowDrop(container) {
  const drop = document.createElement('div');
  drop.className = 'window-drop';
  
  // Random starting position
  drop.style.left = Math.random() * 100 + '%';
  drop.style.top = '0';
  
  // Random animation duration for variety
  const duration = Math.random() * 3 + 4;
  drop.style.animationDuration = duration + 's';
  
  // Random size
  const size = Math.random() * 4 + 3;
  drop.style.width = size + 'px';
  drop.style.height = size + 'px';
  
  // Add slight horizontal movement
  drop.style.animationTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
  
  container.appendChild(drop);
  
  // Remove drop after animation
  setTimeout(() => {
    drop.remove();
  }, duration * 1000);
}

// Ripple effect on click/touch
function createRipple(event) {
  // Prevent ripple on certain elements
  const target = event.target;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
    return;
  }
  
  // Get click/touch position
  let x, y;
  if (event.type === 'touchstart' || event.type === 'touchmove' || event.type === 'touchend') {
    const touch = event.touches[0] || event.changedTouches[0];
    x = touch.clientX;
    y = touch.clientY + window.scrollY;
  } else {
    x = event.clientX;
    y = event.clientY + window.scrollY;
  }
  
  // Create multiple ripples for layered effect
  const rippleCount = event.target.tagName === 'BUTTON' || event.target.tagName === 'A' ? 4 : 3;
  
  for (let i = 0; i < rippleCount; i++) {
    const ripple = document.createElement('div');
    ripple.className = i === 0 ? 'ripple' : `ripple ripple-${(i % 3) + 1}`;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // Add random slight offset for organic feel
    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;
    ripple.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    
    document.body.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 2400 + (i * 150));
  }
  
  // Create water drop sound effect (visual feedback)
  if (event.target.tagName === 'BUTTON' || event.target.classList.contains('hover-scale')) {
    createWaterDropEffect(x, y);
  }
  
  // Add subtle haptic feedback for mobile (if supported)
  if ('vibrate' in navigator && event.type.includes('touch')) {
    navigator.vibrate([5, 5]);
  }
}

// Special water drop effect for interactive elements
function createWaterDropEffect(x, y) {
  const drop = document.createElement('div');
  drop.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, rgba(173, 216, 230, 0.8), transparent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 10000;
    animation: water-drop 0.6s ease-out;
  `;
  
  // Add CSS animation dynamically
  if (!document.querySelector('#water-drop-style')) {
    const style = document.createElement('style');
    style.id = 'water-drop-style';
    style.textContent = `
      @keyframes water-drop {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        50% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0.5;
        }
        100% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(drop);
  setTimeout(() => drop.remove(), 600);
}

// Setup ripple effect listeners
function setupRippleEffect() {
  let isScrolling = false;
  let scrollTimeout;
  let lastTouchTime = 0;
  
  // Prevent double ripples on touch devices
  function handleInteraction(event) {
    // Prevent double-firing on touch devices
    if (event.type === 'click') {
      const now = Date.now();
      if (now - lastTouchTime < 500) {
        return; // Skip click if touch was recent
      }
    }
    
    if (event.type === 'touchstart') {
      lastTouchTime = Date.now();
    }
    
    if (!isScrolling) {
      createRipple(event);
    }
  }
  
  // Mouse events
  document.addEventListener('click', handleInteraction);
  
  // Touch events for mobile
  document.addEventListener('touchstart', handleInteraction, { passive: true });
  
  // Long press effect for mobile
  let longPressTimer;
  document.addEventListener('touchstart', (e) => {
    longPressTimer = setTimeout(() => {
      if (!isScrolling) {
        // Create a special stronger ripple for long press
        createRipple(e);
        if ('vibrate' in navigator) {
          navigator.vibrate([10, 10, 10]);
        }
      }
    }, 500);
  }, { passive: true });
  
  document.addEventListener('touchend', () => {
    clearTimeout(longPressTimer);
  }, { passive: true });
  
  document.addEventListener('touchmove', () => {
    clearTimeout(longPressTimer);
  }, { passive: true });
  
  // Prevent ripples on scrolling
  let touchStartY = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  
  document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    if (Math.abs(touchY - touchStartY) > 10) {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    }
  }, { passive: true });
  
  document.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 150);
  }, { passive: true });
}

// Notification system
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Load available date
async function loadAvailableDate() {
  const container = document.getElementById('available-date');
  if (!container) return;
  
  try {
    const response = await fetch('/api/settings/available_date');
    const data = await response.json();
    
    if (data.success && data.value) {
      const date = new Date(data.value);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      container.innerHTML = `<i class="fas fa-calendar-check mr-1"></i> 着手可能日 ${formattedDate}～`;
    }
  } catch (error) {
    console.error('Failed to load available date:', error);
  }
}

// Load recent works
async function loadRecentWorks() {
  const container = document.getElementById('recent-works');
  if (!container) return;
  
  try {
    const response = await fetch('/api/works');
    const data = await response.json();
    
    if (data.success && data.works.length > 0) {
      // Sort by production_date and get recent 6
      const sortedWorks = data.works.sort((a, b) => {
        if (!a.production_date) return 1;
        if (!b.production_date) return -1;
        return new Date(b.production_date) - new Date(a.production_date);
      });
      const recentWorks = sortedWorks.slice(0, 6);
      container.innerHTML = recentWorks.map(work => `
        <div class="bg-white rounded-lg overflow-hidden shadow-md hover-scale">
          <div class="aspect-video bg-gray-200 relative">
            ${work.embed_code ? `
              <iframe 
                src="https://www.youtube.com/embed/${extractYouTubeId(work.embed_code)}" 
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            ` : `
              <div class="flex items-center justify-center h-full">
                <i class="fas fa-video text-4xl text-gray-400"></i>
              </div>
            `}
          </div>
          <div class="p-4">
            <h3 class="font-medium text-gray-800">${work.title}</h3>
            <p class="text-sm text-gray-600 mt-1">${work.category === 'mv' ? 'MV' : 'Lyric Video'}</p>
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = `
        <div class="col-span-full text-center py-8 text-gray-500">
          <p>作品はまだありません</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Failed to load works:', error);
  }
}

// Load portfolio
async function loadPortfolio() {
  const container = document.getElementById('portfolio-grid');
  if (!container) return;
  
  try {
    const response = await fetch('/api/works');
    const data = await response.json();
    
    if (data.success && data.works.length > 0) {
      window.allWorks = data.works;
      displayWorks(data.works);
    } else {
      container.innerHTML = `
        <div class="col-span-full text-center py-8 text-gray-500">
          <p>作品はまだありません</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Failed to load portfolio:', error);
  }
}

function displayWorks(works) {
  const container = document.getElementById('portfolio-grid');
  if (!container) return;
  
  container.innerHTML = works.map(work => `
    <div class="portfolio-item bg-white rounded-lg overflow-hidden shadow-md" data-category="${work.category}">
      <div class="aspect-video bg-gray-200 relative">
        ${work.embed_code ? `
          <iframe 
            src="https://www.youtube.com/embed/${extractYouTubeId(work.embed_code)}" 
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        ` : `
          <div class="flex items-center justify-center h-full">
            <i class="fas fa-video text-4xl text-gray-400"></i>
          </div>
        `}
        <div class="overlay">
          <div class="text-white">
            <h3 class="font-medium text-lg">${work.title}</h3>
            <p class="text-sm opacity-90">${work.description || ''}</p>
          </div>
        </div>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-center">
          <span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            ${work.category === 'mv' ? 'MV' : 'Lyric Video'}
          </span>
          <button onclick="shareOnTwitter('${work.title.replace(/'/g, "\\'")}')"
                  class="text-blue-500 hover:text-blue-600 transition">
            <i class="fab fa-twitter"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Portfolio filter
function setupPortfolioFilter() {
  const buttons = document.querySelectorAll('[data-filter]');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update button states
      buttons.forEach(btn => {
        btn.classList.remove('bg-gray-800', 'text-white');
        btn.classList.add('bg-white', 'text-gray-700');
      });
      button.classList.remove('bg-white', 'text-gray-700');
      button.classList.add('bg-gray-800', 'text-white');
      
      // Filter works
      if (window.allWorks) {
        if (filter === 'all') {
          displayWorks(window.allWorks);
        } else {
          displayWorks(window.allWorks.filter(work => work.category === filter));
        }
      }
    });
  });
}

// X (Twitter) Timeline loader for contact page
function loadContactTwitterTimeline() {
  if (window.location.pathname === '/contact' && window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  }
}

// Admin login handler
function setupAdminLogin() {
  const form = document.getElementById('admin-login-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const password = formData.get('password');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('adminToken', result.token);
        window.location.href = '/admin/dashboard';
      } else {
        showNotification('パスワードが正しくありません。', 'error');
      }
    } catch (error) {
      showNotification('ログインに失敗しました。', 'error');
    }
  });
}

// Admin dashboard functions
function setupAdminDashboard() {
  // Logout handler
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    });
  }
  
  // Add work form
  const addWorkForm = document.getElementById('add-work-form');
  if (addWorkForm) {
    addWorkForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(addWorkForm);
      const data = Object.fromEntries(formData);
      
      try {
        const response = await fetch('/api/works', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          },
          body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (result.success) {
          showNotification('作品を追加しました。');
          addWorkForm.reset();
          loadWorksList();
        } else {
          showNotification('追加に失敗しました。', 'error');
        }
      } catch (error) {
        showNotification('エラーが発生しました。', 'error');
      }
    });
  }
  
  // Load works list
  loadWorksList();
}

async function loadWorksList() {
  const container = document.getElementById('works-list');
  if (!container) return;
  
  try {
    const response = await fetch('/api/works');
    const data = await response.json();
    
    if (data.success && data.works.length > 0) {
      container.innerHTML = data.works.map(work => `
        <div class="border rounded-lg p-4 flex justify-between items-center">
          <div>
            <h4 class="font-medium">${work.title}</h4>
            <div class="flex items-center space-x-3 text-sm text-gray-600">
              <span>${work.category === 'mv' ? 'MV' : 'Lyric Video'}</span>
              ${work.production_date ? `<span><i class="fas fa-calendar text-xs"></i> ${new Date(work.production_date).toLocaleDateString('ja-JP')}</span>` : ''}
            </div>
          </div>
          <button onclick="deleteWork(${work.id})" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            削除
          </button>
        </div>
      `).join('');
    } else {
      container.innerHTML = '<p class="text-gray-500">作品がありません</p>';
    }
  } catch (error) {
    console.error('Failed to load works:', error);
  }
}

async function deleteWork(id) {
  if (!confirm('この作品を削除しますか？')) return;
  
  try {
    const response = await fetch(`/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    
    const result = await response.json();
    
    if (result.success) {
      showNotification('作品を削除しました。');
      loadWorksList();
    } else {
      showNotification('削除に失敗しました。', 'error');
    }
  } catch (error) {
    showNotification('エラーが発生しました。', 'error');
  }
}

// YouTube ID extraction
function extractYouTubeId(embedCode) {
  if (!embedCode) return '';
  
  // If it's already just an ID
  if (embedCode.length === 11 && !embedCode.includes('/')) {
    return embedCode;
  }
  
  // Extract from URL
  const match = embedCode.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : embedCode;
}

// Share on Twitter function
function shareOnTwitter(title) {
  const text = `DVけむしさんの作品「${title}」をチェック！`;
  const url = window.location.href;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=DVけむし,映像制作,MV`;
  window.open(twitterUrl, '_blank', 'width=600,height=400');
}

// Load Twitter Timeline
function loadTwitterTimeline() {
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  }
}

// Update available date (admin function)
async function updateAvailableDate() {
  const input = document.getElementById('available-date-input');
  if (!input || !input.value) return;
  
  try {
    const response = await fetch('/api/settings/available_date', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify({ value: input.value }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      showNotification('着手可能日を更新しました');
      loadCurrentAvailableDate();
    } else {
      showNotification('更新に失敗しました', 'error');
    }
  } catch (error) {
    showNotification('エラーが発生しました', 'error');
  }
}

// Load current available date in admin
async function loadCurrentAvailableDate() {
  const container = document.getElementById('current-available-date');
  if (!container) return;
  
  try {
    const response = await fetch('/api/settings/available_date');
    const data = await response.json();
    
    if (data.success && data.value) {
      const date = new Date(data.value);
      container.innerHTML = `
        <div class="text-xs text-gray-500">現在の設定</div>
        <div class="font-medium">${date.toLocaleDateString('ja-JP')}</div>
      `;
      
      // Set input value
      const input = document.getElementById('available-date-input');
      if (input) {
        input.value = data.value;
      }
    }
  } catch (error) {
    console.error('Failed to load current available date:', error);
  }
}

// Service cards interaction
function setupServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  if (!serviceCards.length) return;
  
  serviceCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Check if this card is already expanded
      const isExpanded = this.classList.contains('expanded');
      
      // Close all cards
      serviceCards.forEach(c => {
        c.classList.remove('expanded');
      });
      
      // If it wasn't expanded, expand it
      if (!isExpanded) {
        this.classList.add('expanded');
      }
    });
  });
  
  // Click outside to close
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.service-card')) {
      serviceCards.forEach(card => {
        card.classList.remove('expanded');
      });
    }
  });
}

// Navigation scroll indicator
function setupNavScrollIndicator() {
  const navContainers = document.querySelectorAll('.nav-links-container');
  
  navContainers.forEach(container => {
    // Check scroll position and add/remove indicator classes
    function updateScrollIndicators() {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      
      // If content is scrollable
      if (scrollWidth > clientWidth) {
        // Show left indicator if scrolled right
        if (scrollLeft > 5) {
          container.classList.add('scroll-left');
        } else {
          container.classList.remove('scroll-left');
        }
        
        // Show right indicator if not at the end
        if (scrollLeft < scrollWidth - clientWidth - 5) {
          container.classList.add('scroll-right');
        } else {
          container.classList.remove('scroll-right');
        }
      } else {
        // Remove all indicators if content fits
        container.classList.remove('scroll-left', 'scroll-right');
      }
    }
    
    // Update on scroll
    container.addEventListener('scroll', updateScrollIndicators, { passive: true });
    
    // Update on resize
    window.addEventListener('resize', updateScrollIndicators, { passive: true });
    
    // Initial check
    setTimeout(updateScrollIndicators, 100);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createRainEffect();
  createWindowEffects();
  setupRippleEffect();
  setupServiceCards();
  setupNavScrollIndicator(); // Add navigation scroll indicator setup
  loadAvailableDate();
  loadRecentWorks();
  loadPortfolio();
  setupPortfolioFilter();
  loadContactTwitterTimeline();
  setupAdminLogin();
  setupAdminDashboard();
  loadCurrentAvailableDate();
  
  // Load Twitter timeline after page load
  setTimeout(loadTwitterTimeline, 1000);
});

// Make functions globally available
window.updateAvailableDate = updateAvailableDate;

// Make shareOnTwitter globally available
window.shareOnTwitter = shareOnTwitter;