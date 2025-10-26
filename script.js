const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show')
    }else{
      entry.target.classList.remove('show')
    }
  })
})



const homeInformations = document.querySelectorAll('.hidden')

homeInformations.forEach((homeInformation) => myObserver.observe(homeInformation))


// --- NOVO CÓDIGO: Funcionalidade do Modal para Cards de Produtos ---

const productCards = document.querySelectorAll('.gallery-content .card'); // Seleciona todos os cards da galeria
const modalOverlay = document.getElementById('productModal'); // O overlay do modal (VERIFIQUE O ID NO HTML)
const closeButton = document.querySelector('.modal-content .close-button'); // O botão de fechar (X)
const modalImage = document.getElementById('modal-image'); // Elemento <img> dentro do modal
const modalTitle = document.getElementById('modal-title'); // Elemento <h3> do título no modal
const modalDescription = document.getElementById('modal-description'); // Elemento <p> da descrição no modal
const modalLink = document.getElementById('modal-link'); // Elemento <a> do botão "Saiba Mais" no modal

// Para cada card de produto, adiciona um "ouvinte de evento" de clique
productCards.forEach(card => {
    card.addEventListener('click', (event) => {
        // ESSENCIAL: Previne o comportamento padrão do evento de clique,
        // o que impede que links com 'href="#"' causem a rolagem para o topo.
        event.preventDefault(); 

        // Obtém os dados dos atributos `data-*` do card clicado
        const title = card.dataset.title || 'Título Indisponível';
        const description = card.dataset.description || 'Descrição detalhada indisponível.';
        const imageUrl = card.dataset.img || '';
        const link = card.dataset.link || '#'; // Se não houver data-link, usa '#'

        // Preenche os elementos do modal com os dados do card
        modalImage.src = imageUrl;
        modalImage.alt = title;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalLink.href = link;

        // Adiciona a classe 'active' ao overlay do modal para mostrá-lo
        // Primeiro, garanta que o overlay esteja configurado para display: flex
// Isso não vai mostrar o modal ainda por causa do opacity: 0 e visibility: hidden no CSS
modalOverlay.style.display = 'flex';

// Força o navegador a recalcular os estilos (reflow) antes de adicionar a classe 'active'
// Isso é essencial para que a transição de opacity e transform aconteça
void modalOverlay.offsetWidth; // Truque para forçar reflow

// Agora, adicione a classe 'active' para disparar as transições de opacidade e transformação
modalOverlay.classList.add('active');
document.body.style.overflow = 'hidden'; // Evita o scroll da página principal quando o modal está aberto
    });
});

// Event Listener para fechar o modal ao clicar no botão 'X'
closeButton.addEventListener('click', () => {
    modalOverlay.classList.remove('active'); // Remove a classe 'active' para esconder o modal
    document.body.style.overflow = ''; // Restaura o scroll da página
});

// Event Listener para fechar o modal ao clicar no overlay escuro (fora do conteúdo)
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) { // Verifica se o clique foi diretamente no fundo escuro
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Event Listener para fechar o modal ao pressionar a tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});


// --- NOVO CÓDIGO: Funcionalidade de Scroll Suave para Links Internos ---

// Seleciona todos os links de navegação que apontam para IDs na mesma página
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do link (pulo instantâneo)

        // Obtém o ID do destino (ex: "#sobre", "#produtos")
        const targetId = this.getAttribute('href');
        
        // Verifica se o ID do destino é válido e se o elemento existe
        if (targetId && targetId !== '#' && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Rola suavemente até o elemento de destino
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Se for o menu mobile, fechar o menu após o clique (opcional)
                const menuMobile = document.getElementById('menu-mobile');
                if (menuMobile && menuMobile.classList.contains('open-menu')) {
                    menuMobile.classList.remove('open-menu');
                    const overlayMenu = document.getElementById('overlay-menu');
                    if (overlayMenu) {
                        overlayMenu.style.display = 'none'; // Esconde o overlay do menu mobile se ele tiver sido mostrado
                    }
                }
            }
        }
    });
});



