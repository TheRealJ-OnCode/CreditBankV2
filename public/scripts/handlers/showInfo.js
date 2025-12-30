document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('info-btn')) {
        const card = e.target.closest('.customer-card');
        const customerId = card.dataset.customerId;
        
        const result = await window.electronAPI.getCustomers();
        
        if (!result.success) {
            return throwMessage(result.message);
        }
        
        const customer = result.data.find(c => c.id == customerId);
        
        if (!customer) {
            return throwMessage('Müştəri tapılmadı');
        }
        
        showInfoModal(customer);
    }
});