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
                        <span class="info-value debt-value">${Number(customer.credit).toFixed(2)}₼</span>

                    </div>
                    <div class="info-item">
                        <span class="info-label">Başlanğıc Borc:</span>
<span class="info-value">${Number(customer.initialDebt).toFixed(2)}₼</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Son Ödəniş:</span>
<span class="info-value">${Number(customer.lastPaymentAmount || 0).toFixed(2)}₼</span>
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
                    <button class="btn-small btn-info" id="showHistory">📜 Keçmiş</button>
                    <button class="btn-small btn-primary" id="infoClose">Bağla</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('infoModal');
    const closeBtn = document.getElementById('infoClose');
    const historyBtn = document.getElementById('showHistory');

    closeBtn.addEventListener('click', () => modal.remove());

    historyBtn.addEventListener('click', async () => {
        modal.remove();
        await showHistoryModal(customer.id, customer.name);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

async function showHistoryModal(customerId, customerName) {
    const result = await window.electronAPI.getLogs(customerId);

    if (!result.success) {
        return throwMessage(result.message);
    }

    const logs = result.data;

    const logsHTML = logs.length === 0 ? '<p style="text-align: center; color: #6c757d;">Hələ heç bir əməliyyat yoxdur</p>' : logs.map(log => {
        let icon = '📝';
        let color = '#667eea';

        switch (log.operation) {
            case 'ELAVE_EDILDI':
                icon = '➕';
                color = '#28a745';
                break;
            case 'ODENIS':
                icon = '✅';
                color = '#28a745';
                break;
            case 'BORC_ELAVE':
                icon = '📈';
                color = '#dc3545';
                break;
            case 'SILINDI':
                icon = '🗑️';
                color = '#dc3545';
                break;
            case 'GERI_QAYTARILDI':
                icon = '♻️';
                color = '#17a2b8';
                break;
        }

        return `
            <div class="log-item" style="border-left-color: ${color}">
                <div class="log-header">
                    <span class="log-icon">${icon}</span>
                    <span class="log-operation">${log.details}</span>
                    ${log.amount ? `<span class="log-amount">${log.amount}₼</span>` : ''}
                </div>
                <div class="log-time">${formatFullDate(log.timestamp)}</div>
            </div>
        `;
    }).join('');

    const modalHTML = `
        <div class="modal-overlay" id="historyModal">
            <div class="modal-content history-modal">
                <h3>📜 ${customerName} - Keçmiş</h3>
                <div class="logs-container">
                    ${logsHTML}
                </div>
                <div class="modal-actions">
                    <button class="btn-small btn-primary" id="historyClose">Bağla</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('historyModal');
    const closeBtn = document.getElementById('historyClose');

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
