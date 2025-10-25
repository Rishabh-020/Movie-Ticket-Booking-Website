let modalCreated = false;

function createModal() {
  if (modalCreated) return;
  
  const modalHTML = `
    <div id="customModalOverlay" class="modal-overlay">
      <div class="modal-content error">
        <div class="modal-icon error">
          <i class="bx bx-error-circle"></i>
        </div>
        <div class="modal-message" id="modalMessage"></div>
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
  const progressBar = document.getElementById('modalProgress');
  
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
function hideModal() {
  const overlay = document.getElementById('customModalOverlay');
  const progressBar = document.getElementById('modalProgress');
  if (overlay) {
    overlay.classList.remove('active');
    progressBar.classList.remove('active');
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
