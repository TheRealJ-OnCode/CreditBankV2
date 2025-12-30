async function loadCustomers() {
    const result = await window.electronAPI.getCustomers();

    if (!result.success) {
        return throwMessage(result.message);
    }

    const customerList = document.querySelector('.customer-list');
    customerList.innerHTML = '';

    const activeFilter = document.querySelector('.filter-btn.active');
    const filterType = activeFilter ? activeFilter.textContent.trim() : 'Borclu';

    let filteredCustomers = result.data;

    switch (filterType) {
        case 'Hamısı':
            filteredCustomers = result.data.filter(c => c.isActive === 1);
            break;
        case 'Borclu':
            filteredCustomers = result.data.filter(c => c.isActive === 1 && c.credit > 0);
            break;
        case 'Borcsuz':
            filteredCustomers = result.data.filter(c => c.isActive === 1 && c.credit === 0);
            break;
        case 'Silinənlər':
            filteredCustomers = result.data.filter(c => c.isActive === 0);
            break;
    }

    if (filteredCustomers.length === 0) {
        customerList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <h3>Müştəri tapılmadı</h3>
            </div>
        `;
        updateStats(result.data);
        return;
    }

    filteredCustomers.forEach(customer => {
        const card = createCustomerCard(customer);
        customerList.appendChild(card);
    });

    updateStats(result.data);
}

function createCustomerCard(customer) {
    const card = document.createElement('div');
    card.className = 'customer-card';
    card.dataset.customerId = customer.id;
    card.dataset.isActive = customer.isActive;

    if (customer.isActive === 0) {
        card.style.opacity = '0.6';
        card.style.borderLeftColor = '#dc3545';
    }

    card.innerHTML = `
      <div class="customer-header">
        <div class="customer-name">👤 ${customer.name} ${customer.isActive === 0 ? '🗑️' : ''}</div>
        <div class="customer-debt">${Number(customer.credit).toFixed(2)}₼</div>
    </div>
        <div class="customer-info">
            ${customer.phone ? `📞 ${customer.phone} • ` : ''}
            Son əməliyyat: ${formatDate(customer.lastPaymentTime)}
        </div>
        ${customer.specialInfo ? `<div class="customer-info">📝 ${customer.specialInfo}</div>` : ''}
        <div class="customer-actions">
            ${customer.isActive === 1 ? `
                <button class="btn-small btn-info info-btn">ℹ️ Məlumat</button>
                <button class="btn-small btn-success payment-btn">✅ Ödəniş</button>
                <button class="btn-small btn-info add-debt-btn">➕ Borc Əlavə Et</button>
                <button class="btn-small btn-danger delete-btn">🗑️ Sil</button>
            ` : `
                <button class="btn-small btn-success restore-btn">♻️ Geri Qaytart</button>
            `}
        </div>
    `;

    return card;
}
function formatDate(dateString) {
    if (!dateString) return 'Heç vaxt';
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Bu gün';
    if (diffDays === 1) return '1 gün əvvəl';
    return `${diffDays} gün əvvəl`;
}

function updateStats(customers) {
    const activeCustomers = customers.filter(c => c.isActive === 1);

    const totalCustomers = activeCustomers.length;
    const totalDebt = activeCustomers.reduce((sum, c) => sum + Number(c.credit), 0);
    const thisMonth = activeCustomers.filter(c => {
        const date = new Date(c.dateAdded);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    document.querySelector('.stats .stat-card:nth-child(1) .stat-value').textContent = totalCustomers;
    document.querySelector('.stats .stat-card:nth-child(2) .stat-value').textContent = `${totalDebt.toFixed(2)}₼`;
    document.querySelector('.stats .stat-card:nth-child(3) .stat-value').textContent = thisMonth;
}

window.addEventListener('DOMContentLoaded', loadCustomers);