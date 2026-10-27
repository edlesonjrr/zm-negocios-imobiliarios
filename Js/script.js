'use strict';

// Nenhum dado pessoal é enviado ou persistido por este script.
(() => {
  const nav = document.querySelector('.navigation');
  const menuButton = document.querySelector('.menu-toggle');
  const menuLinks = [...document.querySelectorAll('#menu a')];
  nav.classList.add('js-menu');
  function closeMenu(restoreFocus = false) {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  menuLinks.forEach(link => link.addEventListener('click', () => {
    closeMenu();
    menuLinks.forEach(item => item.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'location');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) closeMenu();
  });
  const mobile = matchMedia('(max-width: 700px)');
  mobile.addEventListener('change', () => closeMenu());

  // Navegação ativa e retorno ao início; no máximo uma atualização por quadro.
  const topLink = document.querySelector('.back-top');
  const sections = ['top', 'servicos', 'faq', 'footer'].map(id => document.getElementById(id));
  let scrollPending = false;
  function updateScroll() {
    topLink.hidden = window.scrollY < 450;
    let active = 'top';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * .35) active = section.id;
    }
    for (const link of menuLinks) {
      if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  updateScroll();

  // Details/summary permanecem funcionais mesmo com JavaScript desativado.
  const search = document.getElementById('faq-search');
  const questions = [...document.querySelectorAll('.accordion details')];
  const expand = document.getElementById('expand-faq');
  const clear = document.getElementById('clear-search');
  const status = document.getElementById('faq-status');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const searchable = questions.map(item => normalize(item.textContent));
  document.querySelector('.faq-tools').hidden = false;
  function updateExpandLabel() {
    const visible = questions.filter(item => !item.hidden);
    expand.textContent = visible.length && visible.every(item => item.open) ? 'Recolher todas' : 'Expandir todas';
    expand.disabled = visible.length === 0;
  }
  function filterQuestions() {
    const query = normalize(search.value.trim());
    let count = 0;
    questions.forEach((item, index) => {
      item.hidden = !searchable[index].includes(query);
      if (!item.hidden) count++;
    });
    status.hidden = !query;
    status.textContent = count ? `${count} ${count === 1 ? 'pergunta encontrada' : 'perguntas encontradas'}.` : 'Nenhuma pergunta encontrada. Tente outra palavra ou fale com nossa equipe.';
    clear.hidden = !query;
    updateExpandLabel();
  }
  search.addEventListener('input', filterQuestions);
  clear.addEventListener('click', () => { search.value = ''; filterQuestions(); search.focus(); });
  expand.addEventListener('click', () => {
    const visible = questions.filter(item => !item.hidden);
    const shouldOpen = !visible.every(item => item.open);
    visible.forEach(item => { item.open = shouldOpen; });
    updateExpandLabel();
  });
  questions.forEach(item => item.addEventListener('toggle', updateExpandLabel));

  const services = {
    financiamentos: ['Financiamentos', 'Do primeiro imóvel à expansão do seu negócio, encontre orientação para o seu projeto.', ['Financiamento habitacional: imóvel novo ou usado', 'Aquisição de terreno e construção', 'Construção, obra e imóvel comercial']],
    emprestimos: ['Empréstimos', 'Converse com a equipe para conhecer as modalidades de crédito disponíveis para o seu perfil.', ['Empréstimos consignados', 'Crédito Real', 'Atendimento para esclarecer condições e documentação']],
    seguros: ['Seguros', 'Conheça as opções de proteção e tire suas dúvidas antes de escolher.', ['Seguro de vida', 'Seguro habitacional', 'Seguro de veículos e outras modalidades']],
    consorcios: ['Consórcios', 'Planeje sua próxima conquista com orientação sobre as opções de consórcio.', ['Consórcio de imóveis', 'Consórcio de veículos', 'Consulta de planos e condições']],
    cartoes: ['Cartões de Crédito', 'Conheça as opções de cartões de crédito com a ajuda da nossa equipe.', ['Orientação sobre os cartões disponíveis', 'Consulta de condições e benefícios', 'Limites sujeitos à análise de crédito']],
    cdc: ['CDC – Crédito Direto Caixa', 'Saiba mais sobre o Crédito Direto Caixa e consulte as condições disponíveis.', ['Orientação sobre a modalidade', 'Consulta de condições de contratação', 'Atendimento personalizado']],
    contas: ['Abertura de Contas', 'Conte com orientação para a abertura da sua conta.', ['Conta corrente', 'Conta poupança', 'Informações sobre documentos necessários']],
    habitacional: ['Simulação habitacional', 'Solicite uma simulação personalizada para planejar a compra ou construção do seu imóvel.', ['Conte à equipe qual é o seu projeto', 'Receba orientação sobre as informações necessárias', 'Conheça as condições após a análise']],
    consignado: ['Simulação de consignado', 'Fale com nossa equipe para consultar a modalidade de crédito consignado.', ['Verificação de elegibilidade com a equipe', 'Consulta das condições disponíveis', 'Orientação antes da contratação']],
    outros: ['Outras simulações', 'Conte o que você está planejando. A equipe ajuda a encontrar o atendimento adequado.', ['Crédito e financiamento', 'Consórcios e outros serviços', 'Orientação personalizada']]
  };
  const dialog = document.getElementById('service-dialog');
  let dialogTrigger;
  if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const service = services[link.dataset.service];
      if (!service) return;
      event.preventDefault();
      dialogTrigger = link;
      document.getElementById('dialog-title').textContent = service[0];
      document.getElementById('dialog-description').textContent = service[1];
      const options = document.getElementById('dialog-options');
      options.replaceChildren(...service[2].map(text => {
        const item = document.createElement('li'); item.textContent = text; return item;
      }));
      const message = `Olá! Tenho interesse em ${service[0].toLocaleLowerCase('pt-BR')}. Gostaria de mais informações.`;
      document.querySelector('.dialog-whatsapp').href = `https://wa.me/5586994199850?text=${encodeURIComponent(message)}`;
      dialog.showModal();
      document.body.classList.add('modal-open');
    }));
    document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      dialogTrigger?.focus({ preventScroll: true });
    });
  }

  const copy = document.querySelector('.copy-address');
  const toast = document.getElementById('toast');
  let toastTimer;
  function notify(message) {
    clearTimeout(toastTimer); toast.textContent = message; toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
  }
  if (navigator.clipboard && window.isSecureContext) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('Avenida Raul Lopes, 880. Sala 411, Jóquei, Ed. Poty Premier, Teresina – PI');
        notify('Endereço copiado!');
      } catch { notify('Não foi possível copiar. Selecione e copie o endereço exibido acima.'); }
    });
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();
