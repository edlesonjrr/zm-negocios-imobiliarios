# Verificação visual e funcional — ZM

Data: 27/10/2026. Implementação: http://127.0.0.1:4173/. Referência: https://zmnegociosimobiliarios.com.br/.

**final result: passed**

## Evidências

- Verdade visual: `referencias/original-desktop-top.jpg`, `referencias/original-desktop.jpg`, `referencias/original-mobile.jpg` e observação no navegador das seções e da pergunta expandida.
- Implementação: `referencias/implementacao-desktop-top.jpg`, `referencias/implementacao-servicos.jpg`, `referencias/implementacao-mobile-top.jpg`, `referencias/implementacao-mobile.jpg`, `referencias/implementacao-mobile-faq.jpg`, `referencias/implementacao-mobile-dialog.jpg`.
- Código-fonte consultado: `referencias/original.html`, `referencias/layout2-original.css`, `referencias/framework-original.css`, `referencias/fontawesome-original.css`.
- Desktop final: viewport CSS 1254 × 884, largura útil de 1239, DPR 1; capturas de topo de referência e implementação com 1239 × 873 pixels, apresentadas juntas para comparação.
- Mobile: viewport CSS 390 × 844, DPR 1. Capturas completas com largura de 375 pixels: referência 375 × 6438 e implementação 375 × 5854. Alturas diferentes refletem a compactação móvel e as alterações de conteúdo autorizadas. Comparação conjunta, sem redimensionamento externo dos arquivos.
- A ferramenta de captura completa altera temporariamente a largura útil e pode deslocar controles fixos na imagem composta. A posição real de controles fixos e do link de salto foi conferida em capturas de viewport e pelo DOM; artefatos da captura completa não foram tratados como defeitos da página.
- Estado da comparação principal: início, menu fechado, perguntas recolhidas, sem modal. Detalhes também conferidos em estados próprios: serviços, perguntas e modal móvel.

## Comparação visual

Sem diferenças P0/P1/P2 pendentes dentro do escopo: reprodução visual com melhorias de interação e responsividade.

| Superfície | Resultado |
| --- | --- |
| Fontes e tipografia | Georgia nos títulos e Verdana no corpo, iguais ao original. Título principal de 56 px no desktop. Títulos de seção de 22 px. Hierarquia e legibilidade preservadas. |
| Espaçamento e layout | Conteúdo central de 1140 px, barra azul, cabeçalho branco, navegação laranja sobre a foto, círculos de valores, três colunas de serviços e último serviço centralizado. Mobile intencionalmente mais compacto. |
| Cores | Azul #1c7cbc, laranja #f4742c, azul claro #4fb5f5, fundo #f4f4f4 e sobreposição escura na fotografia preservados. Novos estados de foco/hover coerentes com a paleta. |
| Imagens e ícones | Logotipos e foto WebP locais preexistentes usados; sem imagens remotas. Ícones Font Awesome do próprio site. Sem substituições por emojis ou desenhos aproximados. |
| Conteúdo | Serviços e sequência de seções mantidos. Telefone fixo, WhatsApp, horário e contato atualizados pelo pedido. Perguntas revisadas para não prometer condições financeiras específicas; solicitações de simulação direcionam ao WhatsApp. |

Comparação de visão geral: capturas completas móveis mostradas juntas. Comparação de regiões: topos desktop mostrados juntos, além de inspeção dos serviços, FAQ e rodapé originais e locais. Logo, recorte da fotografia, alinhamento do título, cores, cartões e quebras de texto foram conferidos nessas regiões legíveis.

## Histórico

1. Inspeção do site original no navegador, desktop e celular; leitura do HTML e dos dois CSS originais e identificação das fontes e ícones.
2. Primeira comparação revelou viewports distintos entre abas. Corrigida a configuração de captura para comparar o mesmo viewport; isso foi um ajuste de evidência, sem alegar correção de layout.
3. Comparação final na mesma escala confirmou a composição desktop. Mobile foi confrontado com a referência completa e com capturas de regiões. Nenhuma alteração visual P0/P1/P2 foi necessária após a comparação normalizada.

## Testes executados

- Sete serviços e três solicitações de simulação: cada cartão abriu o título correto, três tópicos e o link WhatsApp com assunto codificado; fechamento pelo botão funcionou.
- Modal no celular: conteúdo legível, botão de fechamento disponível, Escape fecha e restaura o foco no cartão de origem.
- Menu móvel: abre, informa `aria-expanded`, mostra os quatro links e fecha após navegar.
- Navegação para Serviços e retorno ao início: destinos e rolagem conferidos.
- FAQ: expansão das sete perguntas, recolhimento, abertura e fechamento por Enter.
- Busca `imovel` encontrou duas perguntas sem exigir acento. Busca sem correspondência mostrou mensagem apropriada e desabilitou expansão; limpar restaurou todas.
- Copiar endereço: confirmação “Endereço copiado!” observada.
- Larguras de 320, 390, 768, 1024 e 1440 px: `scrollWidth` igual à largura útil; nenhuma imagem quebrada.
- Console: nenhum erro ou aviso nas verificações da implementação.
- IDs únicos, âncoras válidas, imagens, fontes e arquivos locais existentes; links externos protegidos com `noopener noreferrer`.
- Sintaxe JavaScript aprovada por `npm run check`.
- Servidor local: HTML, CSS, JS e fontes responderam 200; referências, README, tentativa de acesso a package.json e URL malformada responderam 404; POST respondeu 405. CSP com `frame-ancestors 'none'` presente.
- Recursos utilizados na página: aproximadamente 270 KB em disco, incluindo HTML, CSS, JS, imagens usadas e fontes. Isso é tamanho de recursos, não uma medição Lighthouse ou uma promessa de tempo em rede móvel.

## Limites e refinamentos opcionais

- Testes feitos no navegador integrado com emulação de largura, não em aparelhos físicos ou em todos os navegadores. Não foi executado Lighthouse, auditoria WCAG completa ou pentest.
- Destinos de WhatsApp, telefone, e-mail, Instagram e mapa foram conferidos nos links; não foram enviadas mensagens, realizadas ligações ou submetidos dados.
- Fallback sem JavaScript revisado na estrutura HTML; não foi feita sessão de navegador com JavaScript desativado.
- A CSP via meta não substitui os cabeçalhos HTTP. Configurações de hospedagem de produção ainda precisam ser aplicadas e verificadas quando houver publicação.
- [P3] Ícone de relógio sólido em lugar do contorno do original e pequenas diferenças de alinhamento no cabeçalho. Não prejudicam uso ou identidade visual.
- A altura móvel foi reduzida intencionalmente, mantendo seções, identidade e ordem. Busca, setas, detalhes de serviços e contatos adicionais são melhorias solicitadas, não reprodução literal dos estados antigos.

## Checklist final

- [x] HTML na raiz; CSS, JavaScript, imagens e fontes separados.
- [x] Visual comparado com a referência real.
- [x] Fluxos locais e breakpoints verificados.
- [x] Segurança básica e limites documentados.
- [x] README e créditos presentes.
- [x] Site original preservado; nenhuma publicação realizada.
