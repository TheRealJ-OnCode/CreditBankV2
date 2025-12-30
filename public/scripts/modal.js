function showInputModal(title, placeholder, callback) {
    const modalHTML = `
        <div class="modal-overlay" id="inputModal">
            <div class="modal-content">
                <h3>${title}</h3>
                <input type="number" id="modalInput" placeholder="${placeholder}" step="0.01" autofocus>
                <div class="modal-actions">
                    <button class="btn-small btn-success" id="modalConfirm">Təsdiq</button>
                    <button class="btn-small btn-danger" id="modalCancel">Ləğv et</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('inputModal');
    const input = document.getElementById('modalInput');
    const confirmBtn = document.getElementById('modalConfirm');
    const cancelBtn = document.getElementById('modalCancel');
    
    setTimeout(() => input.focus(), 100);
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') confirmBtn.click();
    });
    
    confirmBtn.addEventListener('click', () => {
        const value = input.value.trim();
        modal.remove();
        callback(value);
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.remove();
        callback(null);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            callback(null);
        }
    });
}

function showConfirmModal(message, callback) {
    const modalHTML = `
        <div class="modal-overlay" id="confirmModal">
            <div class="modal-content">
                <h3>⚠️ Təsdiq</h3>
                <p>${message}</p>
                <div class="modal-actions">
                    <button class="btn-small btn-danger" id="confirmYes">Bəli</button>
                    <button class="btn-small" id="confirmNo">Xeyr</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('confirmModal');
    const yesBtn = document.getElementById('confirmYes');
    const noBtn = document.getElementById('confirmNo');
    
    yesBtn.addEventListener('click', () => {
        modal.remove();
        callback(true);
    });
    
    noBtn.addEventListener('click', () => {
        modal.remove();
        callback(false);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            callback(false);
        }
    });
}


function showInfoModal(customer) {
    const modalHTML = `
        <div class="modal-overlay" id="infoModal">
            <div class="modal-content info-modal">
                <h3>📋 Müştəri Məlumatları</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Ad:</span>
                        <span class="info-value">${customer.name}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Telefon:</span>
                        <span class="info-value">${customer.phone || 'Yoxdur'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Qalıq Borc:</span>
                        <span class="info-value debt-value">${customer.credit}₼</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Başlanğıc Borc:</span>
                        <span class="info-value">${customer.initialDebt}₼</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Son Ödəniş:</span>
                        <span class="info-value">${customer.lastPaymentAmount || '0'}₼</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Son Ödəniş Tarixi:</span>
                        <span class="info-value">${formatFullDate(customer.lastPaymentTime)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Başlanğıc Tarixi:</span>
                        <span class="info-value">${formatFullDate(customer.startingDate)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Əlavə Edilmə:</span>
                        <span class="info-value">${formatFullDate(customer.dateAdded)}</span>
                    </div>
                    ${customer.specialInfo ? `
                        <div class="info-item full-width">
                            <span class="info-label">Xüsusi Qeyd:</span>
                            <span class="info-value">${customer.specialInfo}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="modal-actions">
                    <button class="btn-small btn-primary" id="infoClose">Bağla</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('infoModal');
    const closeBtn = document.getElementById('infoClose');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function formatFullDate(dateString) {
    if (!dateString) return 'Məlumat yoxdur';
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}