// Aguarda o carregamento completo da árvore DOM antes de executar o código
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. GERENCIAMENTO DE TEMA (DARK MODE)
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Verifica se o usuário já possuía uma preferência salva anteriormente
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggleBtn.innerHTML = '<span class="icon">☀️</span> Light Mode';
        }
    }

    // Evento de clique para alternar o tema da aplicação
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<span class="icon">🌙</span> Dark Mode';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<span class="icon">☀️</span> Light Mode';
        }
    });

    /* ==========================================
       2. MENSAGENS DINÂMICAS NOS CARDS
       ========================================== */
    const cardButtons = document.querySelectorAll('.btn-card');
    const infoBox = document.getElementById('dynamic-info-box');
    const infoBoxText = document.getElementById('info-box-text');
    const closeInfoBtn = document.getElementById('close-info-btn');

    // Atribui evento a todos os botões "Saber Mais" dos cards informativos
    cardButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Captura o dado contido no atributo customizado 'data-info' do HTML
            const extraInfo = e.target.getAttribute('data-info');
            infoBoxText.textContent = extraInfo;
            
            // Remove a classe hidden disparando a animação CSS
            infoBox.classList.remove('hidden');
            
            // Rola suavemente até a caixa de informações visível
            infoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    // Fecha a caixa de mensagem dinâmica
    closeInfoBtn.addEventListener('click', () => {
        infoBox.classList.add('hidden');
    });

    /* ==========================================
       3. INTERATIVIDADE: SIMULADOR DE IMPACTO
       ========================================== */
    const praticaSelect = document.getElementById('pratica-select');
    const simuladorResult = document.getElementById('simulador-result');

    // Mapeamento de dados estruturados para renderização dinâmica no simulador
    const dadosImpacto = {
        solar: "☀️ <strong>Energia Fotovoltaica:</strong> Reduz em até 95% os custos com energia elétrica convencional e elimina toneladas de emissões de CO2 anuais utilizando telhados de galpões.",
        direto: "🌱 <strong>Plantio Direto:</strong> Retém até 60% mais umidade no solo, diminui drasticamente a erosão e armazena carbono de forma orgânica na terra.",
        reuso: "💧 <strong>Captação de Água:</strong> Economiza até 40% do consumo de fontes limpas/potáveis ao reutilizar água pluvial em lavagens de maquinários e aspersão secundária."
    };

    // Evento que detecta a alteração (change) no select do simulador
    praticaSelect.addEventListener('change', (e) => {
        const escolha = e.target.value;

        if (choiseText = dadosImpacto[escolha]) {
            simuladorResult.innerHTML = choiseText;
            simuladorResult.style.borderLeftColor = "#27ae60"; 
        } else {
            simuladorResult.innerHTML = "<p>Selecione uma opção acima para calcular o impacto teórico.</p>";
            simuladorResult.style.borderLeftColor = "var(--border-color)";
        }
    });

    /* ==========================================
       4. VALIDAÇÃO DE FORMULÁRIO COMPLETA
       ========================================== */
    const form = document.getElementById('agro-contact-form');
    const inputName = document.getElementById('username');
    const inputEmail = document.getElementById('useremail');
    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const successMsg = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
        // Bloqueia o envio padrão do formulário (recarregamento da página)
        e.preventDefault(); 
        
        let isValid = true;

        // Validação simples do campo Nome (Mínimo de 3 caracteres)
        if (inputName.value.trim().length < 3) {
            errorName.style.display = 'block';
            inputName.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            errorName.style.display = 'none';
            inputName.style.borderColor = 'var(--border-color)';
        }

        // Validação simples do campo Email através de Expressão Regular (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail.value.trim())) {
            errorEmail.style.display = 'block';
            inputEmail.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            errorEmail.style.display = 'none';
            inputEmail.style.borderColor = 'var(--border-color)';
        }

        // Se ambos os campos passarem na validação
        if (isValid) {
            successMsg.classList.remove('hidden');
            form.reset(); // Limpa os campos preenchidos

            // Oculta a mensagem de sucesso automaticamente após 5 segundos
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        }
    });
});