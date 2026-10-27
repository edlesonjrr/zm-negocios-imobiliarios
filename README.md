# ZM Negócios Imobiliários

Reprodução do site https://zmnegociosimobiliarios.com.br/ para estudos, feita com **HTML, CSS e JavaScript puro**. Sem framework, jQuery, bibliotecas JavaScript externas, instalação de pacotes ou etapa de build. O site de produção não foi alterado.

## Abrir o projeto

Com Node.js instalado, na pasta do projeto:

```sh
npm start
```

Acesse **http://127.0.0.1:4173**. Encerre com `Ctrl+C`. `npm install` não é necessário. O servidor aceita conexões apenas deste computador; não é um servidor de produção.

Também é possível abrir `index.html` diretamente. Para testar todos os recursos de forma consistente, incluindo fontes locais, política de segurança e copiar endereço, prefira o servidor local. Outra opção é o Live Server do editor.

## Organização

```text
index.html                 Conteúdo e estrutura semântica
Css/
  estilos.css              Layout, responsividade, hover e animações
  icones.css               Seletores dos ícones Font Awesome usados
Js/
  script.js                Menu, busca, perguntas, detalhes e contatos
images/                    Imagens locais WebP e materiais preexistentes
fonts/                     Fontes locais dos ícones
ferramentas/servidor.mjs    Prévia local sem dependências
referencias/               HTML/CSS originais e capturas de comparação
README.md                  Documentação
design-qa.md               Registro de verificação visual e funcional
LICENSES.md                Origem dos materiais e créditos
_headers                   Exemplo para hospedagens compatíveis
.htaccess                  Cabeçalhos e proteção de listagem no Apache
```

## O que foi preservado e aprimorado

- Identidade azul `#1c7cbc` e laranja `#f4742c`, gradiente, fonte Georgia nos títulos e Verdana no texto.
- Logotipo, fotografia, seções, serviços, perguntas, marca CAIXA e composição do rodapé derivados do original.
- CSS reescrito com Grid e Flexbox; removidos estilos inline, floats antigos, scripts jQuery e regras de componentes não utilizados.
- Menu móvel com botão, indicação de seção ativa, fechamento ao navegar, clicar fora ou pressionar Escape.
- Serviços e solicitações de simulação abrem uma janela com detalhes e mensagem de WhatsApp específica para o assunto.
- Perguntas com `details/summary`, busca tolerante a acentos, estado sem resultados, limpeza e expansão/recolhimento.
- Telefone, e-mail, WhatsApp, Instagram e mapa com destinos reais. Cópia de endereço com confirmação e tratamento de falha.
- Hover, foco visível, retorno ao topo, suporte a teclado, preferência por movimento reduzido e estilos de impressão.
- Perguntas, navegação e links continuam utilizáveis sem JavaScript; recursos dependentes de JS só aparecem quando disponíveis.

O telefone fixo é **(86) 3303-2012**; o WhatsApp é **(86) 9 9419-9850**. Horário: segunda a sexta, 9h às 17h. Os demais dados de contato seguem o pedido.

No celular, o cabeçalho foi compactado e o antigo seletor de navegação foi substituído por um menu expansível. São aprimoramentos intencionais, mantendo a identidade original.

## Simulações e conteúdo

Os cartões de “Simuladores” **solicitam atendimento pelo WhatsApp**; não calculam juros, não aprovam crédito e não simulam uma integração bancária. O link sem função do consignado no original recebeu um destino funcional. Nenhuma mensagem é enviada automaticamente: o visitante revisa e envia no WhatsApp.

As perguntas foram revisadas para evitar reproduzir promessas de taxas, limites ou prazos desatualizados. A equipe deve confirmar as condições de cada produto. Não foram criados formulários para coletar CPF, comprovantes ou documentos financeiros.

## Desempenho

Imagens WebP locais já presentes no projeto; foto principal priorizada e imagem da CAIXA carregada sob demanda. Tamanhos de imagem declarados, fontes de sistema para textos, apenas dois arquivos de ícones WOFF2, JavaScript com `defer`, sem CDN, rastreadores ou requisições a APIs. Atualização de rolagem limitada por `requestAnimationFrame`; animações focadas em transformações e opacidade. O arquivo `zm_image1.jpeg` foi preservado, mas não é carregado pela página.

## Segurança

- Política CSP restringe scripts, estilos, imagens e fontes à própria origem. Sem `eval`, scripts inline, HTML criado a partir de entrada do visitante ou requisições de dados.
- Textos dinâmicos são inseridos com `textContent`; parâmetros de mensagem usam `encodeURIComponent`.
- Links externos usam `noopener noreferrer`.
- Não há contas, banco de dados, cookies, armazenamento de dados pessoais, chaves ou painel administrativo nesta versão.
- O servidor local bloqueia listagem, arquivos fora da lista permitida, caminhos externos e métodos de escrita. Não serve a pasta `referencias`.
- `_headers` e `.htaccess` fornecem CSP com `frame-ancestors`, proteção contra incorporação, bloqueio de detecção de MIME e restrições de permissões. **Eles só funcionam em hospedagens compatíveis**. A CSP em meta HTML não substitui todos os cabeçalhos.

Nenhum site é invulnerável. Estas medidas reduzem a superfície de ataque do frontend; não protegem por si só a conta de hospedagem, domínio ou servidor. Em uma publicação, habilite HTTPS, mantenha hospedagem e credenciais protegidas, valide os cabeçalhos e publique somente os arquivos necessários. Um backend futuro exigirá validação no servidor, autorização, limitação de requisições e tratamento seguro de dados.

## Publicação futura

### Vercel

O projeto inclui `vercel.json` com publicação estática, geração em `dist/` e os cabeçalhos de segurança. Execute `npm run build` para conferir o pacote de publicação: somente os nove arquivos usados pelo site são copiados. Nenhuma dependência precisa ser instalada. No projeto Vercel, use a branch `main` como produção e conecte o repositório GitHub para publicar novos commits automaticamente.

Capturas e fontes de referência em `referencias/` permanecem locais e não são versionadas. O relatório `design-qa.md` registra a verificação realizada antes da publicação; suas capturas estão na pasta local. `.env`, `.vercel`, arquivos de log e materiais não usados também ficam fora do Git.

### Outras hospedagens

Envie somente `index.html`, `Css/`, `Js/`, `images/` e `fonts/`, além da configuração de cabeçalhos apropriada ao provedor. Não envie `referencias/`, ferramentas, relatórios de QA ou arquivos de estudo. Use os mesmos nomes e maiúsculas das pastas: hospedagens Linux diferenciam `Css` de `css`.

## Como editar

Textos e contatos: `index.html`. Cores: variáveis em `:root` de `Css/estilos.css`. Conteúdo dos detalhes de serviço e mensagens: objeto `services` em `Js/script.js`. Substitua imagens mantendo as proporções e atualize as dimensões no HTML quando necessário.

Se trocar o WhatsApp, atualize tanto os links HTML (fallback sem JavaScript) quanto o endereço gerado no JavaScript. Não coloque senhas ou chaves de API nos arquivos públicos.

## Verificação

```sh
npm run check
```

O comando confere a sintaxe JavaScript. O registro de testes no navegador e de comparação visual está em `design-qa.md`.
