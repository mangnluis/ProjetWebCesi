document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('loginModal');
    const userIcon = document.querySelector('.icone');
    const closeBtn = document.querySelector('.close');

    userIcon.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});