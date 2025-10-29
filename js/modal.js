let modalCreated = false;

function createModal() {
  if (modalCreated) return;
  
  const modalHTML = `
    <div id="customModalOverlay" class="modal-overlay">
      <div class="modal-content" id="modalContent">
        <div class="modal-icon" id="modalIcon">
          <i class="bx bx-error-circle"></i>
        </div>
        <div class="modal-message" id="modalMessage"></div>
        <div class="modal-buttons" id="modalButtons" style="display: none;">
          <button class="modal-btn modal-btn-yes" id="modalYesBtn">Yes</button>
          <button class="modal-btn modal-btn-no" id="modalNoBtn">No</button>
        </div>
        <button class="modal-close" onclick="hideModal()">×</button>
        <div class="modal-progress" id="modalProgress"></div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  modalCreated = true;
}

function showErrorAlert(message, callback) {
  createModal();
  
  const overlay = document.getElementById('customModalOverlay');
  const content = document.getElementById('modalContent');
  const icon = document.getElementById('modalIcon');
  const progressBar = document.getElementById('modalProgress');
  
  // Set error styling
  content.className = 'modal-content error';
  icon.className = 'modal-icon error';
  icon.innerHTML = '<i class="bx bx-error-circle"></i>';
  
  document.getElementById('modalMessage').textContent = message;
  progressBar.classList.remove('active');
  overlay.classList.add('active');
  setTimeout(() => progressBar.classList.add('active'), 100);
  
  if (overlay._timer) {
    clearTimeout(overlay._timer);
  }
  overlay._timer = setTimeout(() => {
    hideModal();
    if (callback) callback();
  }, 2000);
}

function showSuccessAlert(message, callback) {
  createModal();
  
  const overlay = document.getElementById('customModalOverlay');
  const content = document.getElementById('modalContent');
  const icon = document.getElementById('modalIcon');
  const progressBar = document.getElementById('modalProgress');
  const buttons = document.getElementById('modalButtons');
  
  // Hide buttons for auto-close alerts
  buttons.style.display = 'none';
  
  // Set success styling
  content.className = 'modal-content success';
  icon.className = 'modal-icon success';
  icon.innerHTML = '<i class="bx bx-check-circle"></i>';
  
  document.getElementById('modalMessage').textContent = message;
  progressBar.classList.remove('active');
  overlay.classList.add('active');
  setTimeout(() => progressBar.classList.add('active'), 100);
  
  if (overlay._timer) {
    clearTimeout(overlay._timer);
  }
  overlay._timer = setTimeout(() => {
    hideModal();
    if (callback) callback();
  }, 2000);
}

function showWarningConfirm(message, onConfirm, onCancel) {
  createModal();
  
  const overlay = document.getElementById('customModalOverlay');
  const content = document.getElementById('modalContent');
  const icon = document.getElementById('modalIcon');
  const progressBar = document.getElementById('modalProgress');
  const buttons = document.getElementById('modalButtons');
  const yesBtn = document.getElementById('modalYesBtn');
  const noBtn = document.getElementById('modalNoBtn');
  
  // Show buttons for confirmation
  buttons.style.display = 'flex';
  progressBar.style.display = 'none';
  
  // Set warning styling
  content.className = 'modal-content warning';
  icon.className = 'modal-icon warning';
  icon.innerHTML = '<i class="bx bx-error-circle"></i>';
  
  document.getElementById('modalMessage').textContent = message;
  overlay.classList.add('active');
  
  // Remove any existing event listeners
  const newYesBtn = yesBtn.cloneNode(true);
  const newNoBtn = noBtn.cloneNode(true);
  yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);
  noBtn.parentNode.replaceChild(newNoBtn, noBtn);
  
  // Add new event listeners
  document.getElementById('modalYesBtn').onclick = () => {
    hideModal();
    if (onConfirm) onConfirm();
  };
  
  document.getElementById('modalNoBtn').onclick = () => {
    hideModal();
    if (onCancel) onCancel();
  };
}

function hideModal() {
  const overlay = document.getElementById('customModalOverlay');
  const progressBar = document.getElementById('modalProgress');
  const buttons = document.getElementById('modalButtons');
  
  if (overlay) {
    overlay.classList.remove('active');
    progressBar.classList.remove('active');
    progressBar.style.display = 'block';
    if (buttons) buttons.style.display = 'none';
    
    if (overlay._timer) {
      clearTimeout(overlay._timer);
      overlay._timer = null;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createModal);
} else {
  createModal();
}
