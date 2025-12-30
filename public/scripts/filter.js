document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        loadCustomers();
    });
});

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    const borcluBtn = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.textContent.trim() === 'Borclu');
    if (borcluBtn) borcluBtn.classList.add('active');
});