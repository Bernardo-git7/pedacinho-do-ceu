# Pedacinho do Céu — Estações Gourmet

Site institucional em HTML5 + CSS3 + JavaScript puro (sem frameworks e sem dependência de build), pronto para publicar em qualquer hospedagem estática.

## Estrutura

```
/assets/img       → fotos, logo e pôster do vídeo
/assets/videos    → vídeo da Estação do Brownie
/css/style.css    → estilos e sistema de identidade visual
/js/main.js       → interatividade (menu, scroll, preços, lightbox, formulário)
index.html
sitemap.xml
robots.txt
```

## Conteúdo já aplicado
- Logo real (círculo "Pedacinho do Céu — Estações Gourmet")
- Capa da Estação do Brownie
- Fotos reais de produtos e de um evento (Palha Italiana, Matilda Cake)
- Vídeo vertical do brownie cake, em um mockup de celular
- Tabela de valores completa extraída do PDF: Brigadeiro na Colher, Brigadeiro no Copo, Carrinho Fini, Estação do Fondue e Estação do Donuts

## O que ainda precisa ser substituído
- **WhatsApp**: todos os links usam o número de exemplo `5500000000000`. Buscar e substituir por `55DDXXXXXXXXX` (com DDD) em `index.html`.
- **Endereço/Mapa**: a seção de contato tem um espaço reservado — falta inserir o endereço real e o embed do Google Maps.
- **Depoimentos**: os três depoimentos são exemplos ilustrativos, prontos para receber avaliações reais de clientes.
- **Estação do Brownie**: como o PDF fornecido não trouxe uma tabela de valores específica para essa estação, ela está com CTA "sob consulta". Assim que houver uma tabela, é só copiar o padrão das outras estações.
- **Formulário de contato**: validação e sanitização básica já implementadas no front-end; falta conectar a um back-end (endpoint próprio, e-mail transacional ou planilha) para receber os envios de fato.
- **Domínio**: `sitemap.xml`, `robots.txt` e as tags Open Graph usam `umpedacinhodoceu.com.br` como exemplo — trocar pelo domínio real ao publicar.

## Acessibilidade e performance
- Contraste testado, foco visível, navegação por teclado, `alt` em todas as imagens, `prefers-reduced-motion` respeitado.
- Imagens comprimidas e com `loading="lazy"`; vídeo com `preload="metadata"`.
