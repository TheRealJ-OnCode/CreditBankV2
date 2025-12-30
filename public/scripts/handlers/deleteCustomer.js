document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const card = e.target.closest('.customer-card');
        const customerId = card.dataset.customerId;
        const customerName = card.querySelector('.customer-name').textContent.replace('👤 ', '');
        
        showConfirmModal(
            `${customerName} silinsin?`,
            async (confirmed) => {
                if (!confirmed) return;
                
                const result = await window.electronAPI.deleteCustomer(customerId);
                
                if (!result.success) {
                    return throwMessage(result.message);
                }
                
                throwMessage(result.message, 'success');
                loadCustomers();
            }
        );
    }
});