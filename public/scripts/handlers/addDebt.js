document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('add-debt-btn')) {
        const card = e.target.closest('.customer-card');
        const customerId = card.dataset.customerId;
        const customerName = card.querySelector('.customer-name').textContent.replace('👤 ', '');
        const currentDebt = parseFloat(card.querySelector('.customer-debt').textContent);
        
        showInputModal(
            `${customerName} üçün əlavə borc`,
            'Məbləğ daxil edin (₼)',
            async (amount) => {
                if (amount === null) return; 
                
                if (!amount || isNaN(amount) || Number(amount) <= 0) {
                    return throwMessage('Düzgün məbləğ daxil edin');
                }
                
                const newCredit = currentDebt + Number(amount);
                
                const result = await window.electronAPI.updateCustomer(customerId, {
                    credit: newCredit,
                    lastPaymentTime: new Date().toISOString()
                });
                
                if (!result.success) {
                    return throwMessage(result.message);
                }
                
                throwMessage('Borc əlavə edildi', 'success');
                loadCustomers();
            }
        );
    }
});