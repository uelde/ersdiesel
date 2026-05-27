const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu-mobile');
const overlay = document.getElementById('overlay-menu');
const btnClose = menu?.querySelector('.btn-close-menu');

function closeMenu() {
    menu?.classList.remove('open-menu');
    if (overlay) overlay.style.display = 'none';
}

function openMenu() {
    menu?.classList.add('open-menu');
    if (overlay) overlay.style.display = 'block';
}

btnMenu?.addEventListener('click', openMenu);
btnClose?.addEventListener('click', closeMenu);
overlay?.addEventListener('click', closeMenu);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
});
