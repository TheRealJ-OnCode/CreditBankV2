document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('restore-btn')) {
        const card = e.target.closest('.customer-card');
        const customerId = card.dataset.customerId;
        const customerName = card.querySelector('.customer-name').textContent.replace('👤 ', '').replace('🗑️', '').trim();
        
        showConfirmModal(
            `${customerName} geri qaytarılsın?`,
            async (confirmed) => {
                if (!confirmed) return;
                
                const result = await window.electronAPI.updateCustomer(customerId, {
                    isActive: 1
                });
                
                if (!result.success) {
                    return throwMessage(result.message);
                }
                
                throwMessage('Müştəri geri qaytarıldı', 'success');
                loadCustomers();
            }
        );
    }
});