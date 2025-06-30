// Legacy router from main.js - TODO: Remove when fully migrated to React
import { GameFlow_StartNewGame } from '@/flows/GameFlow_StartNewGame';
import { Session_Load } from '@/flows/Session_Load';
import { Session_Save } from '@/flows/Session_Save';

// Elenco squadre disponibili per l'utente
const TEAM_CHOICES = [
  'Aureliana',
  'Brioschese',
  'Cambiaghese',
  'Città di Monza',
  'Fonas',
  'Fusion Multisport',
  'Grezzago',
  'Masate',
  'Monsignor Orsenigo',
  'Novese Gunners',
  'Nuova Frontiera',
  'PanaCalcio',
  'Roncello FC',
  'Sovico Calcio',
  'Virtus ACLI Trecella'
];

/**
 * Enhanced page loading with football atmosphere
 */
function loadPage(key) {
  const pageContainer = document.getElementById("pageContent");
  
  // Add loading animation
  pageContainer.innerHTML = `
    <div class="page-loading">
      <div class="loading-stadium">
        <div class="loading-field"></div>
        <div class="loading-text">Caricamento...</div>
      </div>
    </div>
  `;
  
  // Update active navigation
  updateActiveNavigation(key);
  
  // Load page with delay for smooth transition
  setTimeout(() => {
    pageContainer.innerHTML = "";
    // TODO: Integrate with React router
    console.log(`Loading page: ${key}`);
  }, 200);
}

function updateActiveNavigation(key) {
  // Remove active class from all nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current page
  const activeLink = document.querySelector(`a[href="#${key}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}
  
function loadPageFromHash() {
  const hash = window.location.hash.slice(1) || "dashboard";
  switch (hash) {
    case "new":
      startNewGame();
      break;
    case "load":
      loadGame();
      break;
    case "quickSave":
      saveGame();
      break;
    case "press-center":
    case "press":
      loadPage("press");
      break;
    case "settings":
      loadPage("settings");
      break;
    default:
      loadPage(hash);
 }
}

// Enhanced new game with football atmosphere
function startNewGame() {
  console.log('🎮 Starting new game...');
  // TODO: Integrate with React components
}

// Enhanced load game
async function loadGame() {
  try {
    console.log("📁 Loading game...");
    // TODO: Integrate with React components
  } catch (error) {
    console.error("Error loading game:", error);
  }
}

function saveGame() {
  console.log("💾 Saving game...");
  // TODO: Integrate with React components
}

// Enhanced toast with football atmosphere
function showFootballToast(message, type = 'info') {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '✅' : 
               type === 'error' ? '❌' : 
               type === 'warning' ? '⚠️' : 'ℹ️';
  
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    </div>
  `;
  
  const container = document.getElementById("toastContainer");
  if (container) {
    container.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Export for legacy compatibility
export {
  loadPage,
  loadPageFromHash,
  startNewGame,
  loadGame,
  saveGame,
  showFootballToast,
  TEAM_CHOICES
};