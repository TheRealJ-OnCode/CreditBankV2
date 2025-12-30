const searchInput = document.querySelector('.search-box input');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.customer-card');
    
    cards.forEach(card => {
        const name = card.querySelector('.customer-name').textContent.toLowerCase();
        const phone = card.querySelector('.customer-info').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || phone.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});