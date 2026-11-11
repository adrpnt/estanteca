# Escopo do Projeto — Estanteca

> Documento de escopo inicial. Referência principal: [livrista.com.br](https://livrista.com.br/).
> Levantamento: 2026-11-10 · Revisão 6: 2026-11-10 (prioridades validadas, repositório renomeado).

## 1. Visão geral

**Estanteca** é uma plataforma web para **catalogar e gerenciar a biblioteca pessoal** de cada leitor. Ela combina três partes:

1. **Gestão do acervo pessoal**: exemplares, estantes, empréstimos para conhecidos, anotações e relatórios.
2. **Vida de leitor**: status e progresso de leitura, metas, desafios, estatísticas e conquistas.
3. **Camada social**: perfis públicos, seguidores, feed de atividades e clubes de leitura.

Tudo isso se apoia num **catálogo público de livros** compartilhado. Os exemplares cadastrados pelos usuários alimentam o catálogo comum, o que deixa os próximos cadastros mais rápidos e enriquece as páginas públicas.

**Escopo de biblioteca:** cada usuário tem **um único acervo pessoal**. Bibliotecas institucionais ou coletivas estão fora do escopo.

**Visual:** a referência é usada pelas **funcionalidades**, não pela aparência. A interface deve ser moderna, limpa e mais rica visualmente (ver seção 7).

## 2. Origem das funcionalidades

- **Observadas na referência**: páginas públicas do Livrista, a página de [padrões editoriais](https://livrista.com.br/padroes-editoriais) e prints da área logada. Os prints estão em `.specs/references/livrista/`: dashboard, acervo, busca e cadastro de exemplar, estantes, empréstimos, leitores e configurações.
- **Inferidas**: itens que a referência cita sem detalhar. Estão marcados com *(inferido)*.
- **Adicionadas ao produto**: recursos que não existem na referência. Estão marcados com *(novo)*.

### 2.1 Destaques da área logada da referência

| Tela | O que tem |
| --- | --- |
| **Dashboard** | Cards de Exemplares, Lidos (%), Autografados e Investido (R$, com botão para ocultar o valor). Blocos de últimos exemplares, empréstimos em curso, leituras em andamento e resumo do perfil público. |
| **Acervo** | Abas Exemplares, Estantes e Resenhas. Filtro por estante, ordenação e alternância grade/lista. Painel lateral com **Lendo** e **Fila de leitura**, para onde se arrastam exemplares. |
| **Inserir exemplar** | Fluxo em 2 passos. No passo 1, o usuário busca no catálogo por título ou autor (mínimo de 3 letras) e reaproveita a obra existente, "mesmo que a sua edição seja diferente". No passo 2, preenche um formulário dividido em Obra, Exemplar, Catalogação, Capa e Coleção (ver 5.3). |
| **Estantes** | Nome (ex.: romances, arquitetura, escritório, cabeceira) e descrição ("as condições que fazem um livro vir para essa estante"). |
| **Circulação** | Empréstimos em curso e histórico. O empréstimo começa no menu `⋮` do exemplar. A aba Leitores tem uma tabela com nome, e-mail, telefone, livros com a pessoa e total de empréstimos. |
| **Configurações** | Perfil público (`/username`, imagem, "Sobre você", "Sobre a biblioteca"). Formato de exibição dos nomes de autores. **Tema claro ou escuro.** |
| **Monetização** | Anúncios e plano Premium: sem propaganda, vagas de leitor ilimitadas e possibilidade de excluir empréstimos. No plano gratuito, são 3 vagas de leitor por 12 meses. |

## 3. Perfis

| Perfil | Descrição |
| --- | --- |
| **Visitante** | Navega no catálogo público, em perfis públicos e em clubes públicos sem login. |
| **Usuário (leitor)** | Tem conta e gerencia o próprio acervo, as leituras e a vida social na plataforma. |
| **Moderador de clube** | Usuário que criou o clube ou foi promovido nele. Gerencia membros, leituras e discussões do clube. |
| **Administrador da plataforma** | Modera o catálogo comum, as sugestões de correção, os desafios oficiais e as denúncias. |

> **Contato de empréstimo não é um perfil.** A pessoa que pega um livro emprestado é um **contato** cadastrado pelo dono do acervo. Ela não precisa ter conta na plataforma (ver 5.6). Na interface, a referência chama essas pessoas de "Leitores". No código, usamos `Contato` para não confundir com o usuário leitor.

## 4. Entidades do domínio

### 4.1 Catálogo (dados públicos e compartilhados)

| Entidade | Descrição | Principais atributos |
| --- | --- | --- |
| **Obra (Livro)** | Entrada do catálogo comum | título, subtítulo, idioma, sinopse, ano da 1ª publicação, gêneros |
| **Edição** | Publicação específica de uma obra | ISBN-10/13, editora, cidade, edição, ano, nº de páginas, meio, coleção/série, tradutor(es), ilustrador(es), capa |
| **Autor** | Pessoa autora | nome (ordem normal), sobrenome de entrada (para ordenação alfabética), slug, foto, datas, biografia, nacionalidade |
| **Autoria** | Vínculo entre obra e autor | ordem, função (autor, org., coord., adapt., presid.) |
| **Editora** | Casa editorial | nome, slug, site |
| **Classe CDD / CDU** | Classificações decimais | código, descrição, hierarquia |
| **Sugestão de correção** | Pedido de alteração em dado público | campo, valor atual, valor sugerido, autor, status |

### 4.2 Acervo pessoal (dados privados do usuário)

| Entidade | Descrição | Principais atributos |
| --- | --- | --- |
| **Usuário** | Conta na plataforma, dona de um acervo | nome, username, e-mail, senha (opcional para quem entra com Google), avatar, "sobre você", "sobre a biblioteca", privacidade, tema |
| **Conta vinculada** | Login de um provedor externo ligado ao usuário | provedor (google), id no provedor, e-mail, data de vínculo |
| **Exemplar** | Cópia de uma edição no acervo do usuário | **código do exemplar** (único no acervo, definido pelo usuário), CDD, CDU, informação complementar, data, local e valor de aquisição, estado de conservação, autografado, capa própria (opcional) |
| **Estante** | Agrupamento de exemplares definido pelo usuário | nome, descrição, ordem, visibilidade |
| **Contato** | Pessoa cadastrada pelo dono do acervo para receber empréstimos | nome, telefone, e-mail, observações, usuário vinculado (opcional) |
| **Empréstimo** | Saída de um exemplar para um contato | exemplar, contato, data de saída, previsão e data de devolução, status |

### 4.3 Leitura

| Entidade | Descrição | Principais atributos |
| --- | --- | --- |
| **Leitura** | Relação do usuário com uma obra. Pode haver várias por obra (releituras). | obra, edição ou exemplar, status, posição na fila, datas de início e fim, página atual, nota |
| **Registro de progresso** | Atualização pontual de uma leitura | página ou %, data, comentário opcional |
| **Anotação** | Fichamento, nota ou citação ligada a uma obra | tipo, conteúdo, página, visibilidade |
| **Resenha** | Avaliação textual de uma obra | texto, nota, aviso de spoiler, visibilidade |
| **Meta** | Objetivo de leitura em um período | tipo (livros ou páginas), quantidade, período |
| **Desafio** | Conjunto de critérios de leitura com participantes | nome, regras ou itens, período, criador, visibilidade |
| **Participação em desafio** | Inscrição do usuário e progresso no desafio | itens cumpridos, leituras associadas |

### 4.4 Social e gamificação

| Entidade | Descrição | Principais atributos |
| --- | --- | --- |
| **Seguir** | Relação seguidor → seguido | status (ativo ou pendente, para perfis privados) |
| **Atividade** | Evento exibido no feed | tipo, ator, alvo, data |
| **Comentário / Curtida** | Interação em atividades, resenhas e discussões | autor, alvo, texto |
| **Clube** | Grupo de leitura | nome, slug, descrição, capa, visibilidade |
| **Membro do clube** | Vínculo de um usuário com um clube | papel (moderador ou membro) |
| **Leitura do clube** | Livro lido pelo clube em um período | obra, datas, cronograma |
| **Discussão** | Tópico de conversa no clube | título, trecho ou capítulo de referência, aviso de spoiler |
| **Encontro** | Evento do clube | data, local ou link |
| **Conquista (Badge)** | Marco atingido pelo usuário | tipo, critério, data de obtenção |
| **Notificação** | Aviso ao usuário | tipo, referência, lida/não lida |

## 5. Funcionalidades

As prioridades seguem esta legenda:
**P1** = MVP · **P2** = segunda entrega · **P3** = evolução futura.

### Resumo por prioridade

| Módulo | P1 — MVP | P2 — Segunda entrega | P3 — Evolução futura |
| --- | --- | --- | --- |
| **5.1 Conta** | Cadastro com e-mail e senha · Login com Google · Recuperação de senha · Perfil · Privacidade (perfil nasce público) · Tema claro/escuro/auto · Exclusão de conta (LGPD) | — | Login com Apple e outros provedores |
| **5.2 Catálogo** | Busca global (`⌘K`) · Obra e edição · Preenchimento por ISBN (Google Books, Open Library) · Cadastro manual · Padrões editoriais aplicados no formulário (seção 6) · Admin mínimo: editar obras, edições e autores e mesclar duplicados | Sugestão de correção (fila de moderação) | — |
| **5.3 Acervo** | Cadastro de exemplar em etapas · Capa (upload ou reaproveitada) · Listagem com filtros · Grade e lista · Ações por exemplar · Ações em lote · Página do exemplar | — | — |
| **5.4 Estantes** | Criar e organizar · Exemplar em várias estantes · Estante pública ou privada · Visual de prateleira | — | — |
| **5.5 Leitura** | Status (quero ler, lendo, lido, abandonado, pausado) · Fila de leitura e "Lendo agora" · Datas · Nota | Progresso por página ou % · Releituras · Estimativa de término | — |
| **5.6 Empréstimos** | — | Contatos · Emprestar e devolver · Atrasos · Em curso e histórico · Excluir empréstimo | Lembretes (notificação, e-mail, WhatsApp) · Vincular contato a usuário |
| **5.7 Anotações e resenhas** | — | Fichamentos, notas e citações · Resenhas com aviso de spoiler | — |
| **5.8 Dashboard e relatórios** | Dashboard | Relatórios de acervo, investimento, empréstimos e leitura · Exportação em PDF e CSV | Retrospectiva anual |
| **5.9 Metas e desafios** | — | Metas anuais ou mensais | Desafios oficiais e de usuários |
| **5.10 Perfil e social** | Perfil público simples: avatar, bio, "sobre a biblioteca", leitura atual, acervo e estantes públicas | Perfil completo (estatísticas, meta, resenhas) · Seguir · Feed · Curtir e comentar · Bloquear e denunciar | Conquistas no perfil · Sugestão de quem seguir |
| **5.11 Clubes** | — | — | Clubes, cronograma, discussões e encontros |
| **5.12 Gamificação** | — | — | Conquistas · Streak |
| **5.13 Exportação** | — | Exportar dados em CSV | — |
| **5.14 Notificações** | — | Notificações na plataforma | E-mail e push |
| **5.15 Etiquetas** | — | — | Etiquetas com QR code |
| **5.16 Portal público** | — | Página do livro e do autor · SEO | Índice de autores · Editoras · CDD · Rankings · Coleções |
| **5.17 App móvel** | Web responsiva (seção 7) | — | PWA · App nativo com leitor de código de barras |
| **5.18 Monetização e feedback** | Botão de feedback | — | Afiliados · Plano premium |

#### Regra de dependência entre entregas

Telas do P1 que citam funcionalidades de entregas futuras só mostram o bloco ou a ação quando a funcionalidade for entregue. Exemplos: os blocos de empréstimos, meta e progresso no dashboard; a ação "emprestar" no menu do exemplar; "gerar etiquetas" nas ações em lote; o histórico de empréstimos na página do exemplar.

### 5.1 Autenticação e conta — P1

- Cadastro com e-mail e senha, com username único (que vira a URL pública `/u/:username`).
- **Login com Google** (cadastro e login):
  - No primeiro acesso, a conta é criada com nome, e-mail e foto do Google, e o usuário escolhe o username antes de continuar.
  - Se já existir uma conta com o mesmo e-mail (verificado pelo Google), o login com Google é vinculado a ela.
  - Nas configurações, o usuário pode vincular ou desvincular o Google e definir uma senha, desde que mantenha pelo menos uma forma de entrar.
  - No app móvel, o login com Google usa o fluxo nativo da plataforma e é validado pela API.
- Login e logout.
- Recuperação de senha por e-mail.
- Edição de perfil: nome, avatar, "sobre você" e "sobre a biblioteca".
- Privacidade: perfil público ou privado, e visibilidade do acervo, das leituras, das estatísticas e do **valor investido**. **Perfis novos nascem públicos**; o valor investido e os dados de aquisição nunca são públicos por padrão. No cadastro, o usuário é avisado de que o perfil é público e pode mudar isso a qualquer momento.
- **Tema**: claro, escuro ou automático (segue o sistema operacional).
- Nomes de autores são sempre exibidos no formato normal ("Machado de Assis"), sem opção de outro formato.
- **Exclusão de conta**, que remove os dados pessoais, o acervo, as leituras e as anotações, em atendimento à LGPD. A exportação dos dados antes de excluir entra no P2 (ver 5.13).
- Login com outros provedores (Apple, Facebook…) — **P3**. Login com Apple será exigido para publicar o app na App Store se ele oferecer login com Google.

### 5.2 Catálogo comum de livros — P1

- **Busca global** no cabeçalho por título, autor ou ISBN, com atalho de teclado `⌘K`/`Ctrl+K`.
- Separação entre **obra** e **edição**: várias edições ou ISBNs ficam ligados à mesma obra.
- Cadastro manual quando o livro não for encontrado. O registro entra no catálogo comum seguindo os **padrões editoriais** (seção 6).
- **Bloqueio dos dados públicos**: quando outros usuários já têm a obra no acervo, título, subtítulo e autores não podem ser editados diretamente. O usuário envia uma **sugestão de correção** — **P2**.
- **Admin mínimo** (`/admin`): editar obras, edições e autores e mesclar registros duplicados. Na mesclagem, os exemplares e as leituras passam para o registro que permanece.
- Fila de moderação das sugestões de correção — **P2**.

### 5.3 Acervo pessoal e cadastro de exemplares — P1

#### Fluxo de cadastro em etapas

1. **Encontrar a obra.** O usuário busca por título, autor ou ISBN, primeiro no catálogo local e depois em APIs externas (Google Books, Open Library). Os resultados aparecem como cards com capa. A interface incentiva reaproveitar a obra existente, mesmo que a edição seja diferente.
2. **Escolher ou criar a edição.** Se o ISBN já existir, os dados da edição são preenchidos automaticamente.
3. **Dados do exemplar.** O formulário é dividido em seções, e só os campos obrigatórios ficam em destaque:

| Seção | Campos |
| --- | --- |
| **Obra** | título\*, subtítulo, autores (com dica dos padrões editoriais) e idioma\*. São bloqueados quando a obra já é compartilhada. |
| **Edição** | meio\* (impresso, digital, audiolivro), editora, cidade, edição, ano, páginas, ISBN, coleção/série, tradutor, ilustrador |
| **Catalogação** | código do exemplar\* (único no acervo, com sugestão automática do próximo número), estante(s), CDD, CDU, informação complementar |
| **Capa** | upload (JPG, PNG ou WebP, até 10 MB, com arrastar e soltar e recorte), escolha entre as capas de outros exemplares e edições da mesma obra, ou capa da API externa |
| **Aquisição** | data, local e valor pago (R$), estado de conservação |
| **Marcadores** | já li este livro (cria uma leitura com status *lido*), exemplar autografado |

#### Gestão do acervo

- Listagem com busca, filtros (estante, autor, meio, status de leitura, emprestado, autografado) e ordenação.
- Visualização em grade de capas e em lista.
- Menu de ações por exemplar: editar, mover de estante, emprestar, marcar como lendo, remover.
- Ações em lote: mover de estante, gerar etiquetas, excluir.
- **Página do exemplar** com todos os dados, histórico de empréstimos e leituras.

### 5.4 Estantes virtuais — P1

- Criar, renomear, reordenar e excluir estantes, com nome e descrição dos critérios da estante.
- Um exemplar pode estar em uma ou mais estantes.
- Cada estante pode ser pública ou privada.
- Visualização da estante como prateleira de capas.

### 5.5 Status e progresso de leitura — P1/P2 *(novo, expande "Lendo" e "Fila de leitura" da referência)*

- **P1**: status por obra: *quero ler*, *lendo*, *lido*, *abandonado*, *pausado*. A obra não precisa estar no acervo.
- **P1**: **fila de leitura** ordenável e painel **Lendo agora**, com arrastar e soltar de exemplares, como na referência.
- **P1**: datas de início e fim da leitura, e nota de 0,5 a 5 estrelas.
- **P2**: atualizar o progresso por página ou porcentagem, com comentário opcional e histórico.
- **P2**: releituras com histórico preservado.
- **P2**: estimativa de término com base no ritmo médio.

### 5.6 Empréstimos — P2

Os empréstimos são sempre de exemplares do acervo do próprio usuário.

- **Contatos**: o dono do acervo cadastra as pessoas para quem empresta (nome, e-mail, telefone, observações). Elas não precisam ter conta.
- A tabela de contatos mostra quais livros estão com cada pessoa e o total de empréstimos.
- Emprestar pelo menu de ações do exemplar, escolhendo um contato existente ou criando um na hora.
- Registrar a data prevista e a data real de devolução.
- Status do exemplar: disponível, emprestado ou atrasado. O exemplar emprestado fica sinalizado no acervo.
- Ver empréstimos em curso e histórico, com filtro por contato e período.
- Excluir empréstimos registrados por engano.
- Lembrete de devolução por notificação e e-mail para o dono — **P3**.
- Link de lembrete via WhatsApp para o contato — **P3**.
- Vincular um contato a um usuário da plataforma — **P3**.

### 5.7 Anotações, fichamentos e resenhas — P2

- Criar fichamentos, notas e citações ligados a uma obra, com página de referência.
- Definir se cada anotação é privada ou pública.
- Escrever resenha com nota e aviso de spoiler, privada ou pública.
- Ver as resenhas do usuário numa aba própria do acervo, como na referência.

### 5.8 Dashboard, relatórios e estatísticas — P1/P2

- **P1 — Dashboard**: indicadores (exemplares, % lidos, autografados, investido com botão para ocultar), leitura atual com progresso, fila de leitura, últimos exemplares, empréstimos em curso e atrasados, meta do ano e atalho para o perfil público.
- **P2 — Acervo**: distribuição por autor, gênero, CDD, meio e estante.
- **P2 — Investimento**: valor gasto por período e por local de aquisição.
- **P2 — Empréstimos**: em curso, atrasados e histórico.
- **P2 — Leitura** *(novo)*: livros e páginas por mês e por ano, ritmo, gêneros e autores mais lidos, distribuição das notas.
- **P3 — Retrospectiva anual** *(novo)*: resumo visual e compartilhável do ano de leitura.
- Exportação em PDF e CSV.

### 5.9 Metas e desafios — P2/P3 *(novo)*

- **P2 — Metas**: meta anual ou mensal de livros ou páginas, com progresso automático.
- **P3 — Desafios oficiais e de usuários**: inscrição, associação de leituras aos itens e ranking.

### 5.10 Perfil público, seguidores e feed — P1/P2 *(social é novo)*

- **P1 — Perfil público simples** (`/u/:username`): avatar, bio, "sobre a biblioteca", leitura atual, acervo e estantes públicas. Respeita as configurações de privacidade (5.1).
- **P2 — Perfil completo**: inclui estatísticas, meta do ano e resenhas públicas. As conquistas entram no P3, junto com a gamificação.
- **P2** — Seguir e deixar de seguir usuários. Em perfis privados, o pedido precisa ser aprovado.
- **P2** — **Feed** com as atividades de quem o usuário segue.
- **P2** — Curtir e comentar atividades e resenhas.
- **P2** — Bloquear e denunciar usuários e conteúdos.
- Sugestão de pessoas para seguir — **P3**.

### 5.11 Clubes de leitura — P3 *(novo)*

- Criar clube público ou privado, com papéis de moderador e membro.
- Definir a leitura atual do clube, com cronograma.
- Abrir discussões por trecho, com proteção de spoiler.
- Agendar encontros presenciais ou online.
- Manter o histórico de livros lidos pelo clube.

### 5.12 Gamificação — P3 *(novo)*

- Conquistas por marcos de leitura, sequência de dias com progresso (streak) e vitrine no perfil.

### 5.13 Exportação de dados — P2

- Exportar os dados do usuário em CSV (acervo, leituras, anotações).
- Importação de outras plataformas (Skoob, Goodreads) está fora do escopo (ver seção 9).

### 5.14 Notificações — P2 *(novo)*

- Notificações dentro da plataforma: seguidores, curtidas, comentários, clubes, conquistas, devoluções atrasadas.
- Notificações por e-mail e push — **P3**.

### 5.15 Etiquetas — P3

- Etiquetas para impressão com código do exemplar, CDD/CDU, título e QR code.
- Escolha do modelo de folha.
- Seleção em lote dos exemplares.

### 5.16 Portal público de conteúdo — P2/P3

- **P2**: página do livro, página do autor, SEO e Open Graph.
- **P3**: índice de autores, páginas de editoras, navegação por CDD, rankings e coleções curadas.

### 5.17 App móvel — P3 *(novo)*

- Começar com PWA; depois, app nativo consumindo a API.
- Prioridades do app:
  - **Leitura do código de barras (ISBN) pela câmera.**
  - Atualização rápida do progresso.
  - Feed.
  - Notificações push.

### 5.18 Monetização e feedback — P1/P3

- **P3** — Links de afiliado na página do livro.
- **P3** — Plano premium a definir. A referência usa anúncios e limita vagas de leitor no plano gratuito; ver decisões em aberto.
- **P1** — Botão de **feedback** em todas as telas logadas, para sugestões e relato de problemas. As mensagens chegam ao admin da plataforma e incluem a tela de origem.

## 6. Padrões editoriais do catálogo

Baseados nos [padrões editoriais do Livrista](https://livrista.com.br/padroes-editoriais).

### 6.1 Princípio

Cada cadastro tem uma **parte pública**, compartilhada no catálogo, e uma **parte privada**, do exemplar. Os padrões valem só para a parte pública:

- **Obra — públicos, seguem os padrões:** título, subtítulo, nomes dos autores e idioma.
- **Edição — públicos e compartilhados por ISBN:** editora, cidade, edição, ano, páginas, meio, coleção/série, tradutor, ilustrador e capa. Diferente do Livrista, onde esses dados são privados. Os padrões de nomes de pessoas (2.1 a 2.4) também valem para tradutor e ilustrador; regras para editora e coleção ficam a definir.
- **Exemplar — privados, livres:** código do exemplar, estante, CDD/CDU, informação complementar, dados de aquisição e estado de conservação.

A equipe da plataforma pode editar continuamente os registros públicos, inclusive os criados por usuários.

### 6.2 Regras

| # | Campo | Regra | Correto | Errado |
| --- | --- | --- | --- | --- |
| 1.1 | Título e subtítulo | Só a primeira letra em maiúscula | Volta ao mundo em 80 dias | Volta ao Mundo em 80 Dias · VOLTA AO MUNDO EM 80 DIAS |
| 1.2 | Título e subtítulo | Nomes próprios só com as iniciais em maiúscula | Memórias póstumas de Brás Cubas | Memórias Póstumas de Brás Cubas |
| 2.1 | Autores | Iniciais em maiúscula. Preposições e conjunções em minúscula. | Machado de Assis | Machado De Assis · MACHADO DE ASSIS |
| 2.2 | Autores | Vários autores separados por ponto e vírgula | Leandro Karnal; Mário Sergio Cortella | Leandro Karnal e Mário Sergio Cortella |
| 2.3 | Autores | Função entre parênteses e abreviada: (org.), (coord.), (adapt.), (presid.) | Eça de Queiroz; Paulo Neves da Silva (org.) | Paulo Neves da Silva (organizador) |
| 2.4 | Autores | Sem cargos, patentes, títulos ou honrarias | — | Dr., Ph.D., Padre, Coronel, Bispo… |
| — | Autores | Nomes na ordem normal, que é também o único formato de exibição. | J. R. R. Tolkien | TOLKIEN, J. R. R. |

### 6.3 Como aplicar no sistema

Em vez de só exibir um link para os padrões, como faz a referência, o sistema ajuda o usuário a segui-los:

- **Normalização sugerida.** Ao digitar um título em Title Case ou caixa alta, o sistema sugere a versão "Só primeira maiúscula" com um clique. Nomes próprios conhecidos (autores e lugares do catálogo) são preservados.
- **Autores como campo estruturado.** Os autores são cadastrados em um campo de tags com autocomplete do catálogo, não em texto livre. O ponto e vírgula vira separador automaticamente, e a função é escolhida num seletor (autor, org., coord., adapt., presid.). Isso elimina os erros das regras 2.2 e 2.3.
- **Detecção de honoríficos.** O sistema avisa quando o nome começa com Dr., Prof., Padre, Cel. e similares, e sugere a remoção.
- **Sobrenome de entrada.** Cada autor tem um campo de sobrenome de entrada, preenchido automaticamente com a última palavra e editável. Exemplo: "García Márquez". Ele é usado só para a ordenação alfabética (por exemplo, no índice de autores e na ordenação do acervo por autor), nunca para a exibição.
- **Validação no backend.** A mesma normalização roda nos validadores (VineJS) e no preenchimento automático vindo de APIs externas.

## 7. Diretrizes de design

A referência é funcional, mas visualmente datada. O objetivo é uma interface **moderna, limpa, bonita e com layout rico**, mantendo a **troca entre tema claro e escuro**.

### 7.1 O que evitar (observado na referência)

- Botões e títulos em CAIXA ALTA, e cores de destaque concorrendo entre si (dourado, verde e azul).
- Banners de propaganda grandes e chamativos no topo de todas as telas.
- Caixas com bordas pesadas, painéis vazios e pouca hierarquia tipográfica.
- Sidebar estreita só com ícones e rótulos pequenos.
- Formulários longos de uma vez só e campos de upload nativos do navegador.
- Estados vazios pobres, só com texto e um botão.

### 7.2 Princípios

- **Capas em primeiro plano.** Os livros são o conteúdo visual principal: grades de capas, prateleiras horizontais com rolagem, capas com sombra suave e cantos levemente arredondados. Cards de livro podem usar a **cor dominante da capa** em fundos e destaques.
- **Tipografia com personalidade.** Uma serifada elegante para títulos e nomes de livros, como Fraunces, Newsreader ou Literata. Uma sans moderna para a interface, como Inter ou Geist. A escala tipográfica deve deixar a hierarquia clara.
- **Paleta contida.** Neutros quentes, que lembram papel no claro e tinta no escuro, com **uma** cor de destaque. Cores semânticas só para status: emprestado, atrasado, lido.
- **Temas.** Claro, escuro e automático. Todas as cores são tokens (variáveis CSS), o contraste é testado nos dois temas, e a troca é instantânea, sem piscar na carga da página.
- **Layout rico, sem poluição.** Dashboard em grade (bento) com blocos de tamanhos variados: leitura atual em destaque com barra de progresso, meta do ano em anel, gráfico de leitura do mês, carrossel de últimos exemplares e lista de empréstimos.
- **Navegação.** Sidebar recolhível com ícone e rótulo no desktop e barra inferior no mobile. Busca global sempre acessível pelo cabeçalho ou por `⌘K`.
- **Formulários guiados.** Cadastro em etapas com indicador de progresso, seções recolhíveis, preenchimento automático por ISBN e upload de capa com arrastar e soltar e pré-visualização.
- **Microinterações.** Transições suaves, *skeletons* durante o carregamento, toasts de confirmação, arrastar e soltar entre "Fila" e "Lendo", e animação leve ao concluir um livro ou ganhar uma conquista.
- **Estados vazios ilustrados**, com explicação e ação principal clara.
- **Responsivo e mobile-first**, já que o app móvel começa como PWA.
- **Acessibilidade**: contraste WCAG AA nos dois temas, foco visível, navegação por teclado e respeito ao `prefers-reduced-motion`.
- **Anúncios**, se existirem, discretos e fora das áreas de trabalho.

### 7.3 Próximos passos de design

1. Definir a identidade da Estanteca: logo, paleta e tipografia.
2. Montar o design system: tokens de cor (claro e escuro), espaçamento, raios, sombras e componentes base.
3. Fazer protótipos das telas-chave: dashboard, acervo, cadastro de exemplar, página do livro e perfil público.

## 8. Mapa de páginas

**Públicas**

- `/` — home: destaques, rankings e chamada para cadastro
- `/livros`, `/livros/:slug`
- `/autores`, `/autores/:slug`
- `/editoras/:slug`
- `/cdd/:codigo`
- `/u/:username` — perfil público, com abas: acervo, estantes, leituras, resenhas, conquistas
- `/clubes`, `/clubes/:slug`
- `/desafios`, `/desafios/:slug`
- `/padroes-editoriais`, `/sobre`, `/termos`, `/privacidade`, `/contato`
- `/cadastro`, `/login`, `/recuperar-senha`

**Autenticadas**

- `/feed`
- `/app` — dashboard
- `/app/acervo`, `/app/acervo/novo`, `/app/acervo/:codigo`
- `/app/estantes`
- `/app/leituras` — Lendo, Fila, Lidos, histórico de progresso
- `/app/resenhas`, `/app/anotacoes`
- `/app/metas`
- `/app/emprestimos` — em curso e histórico
- `/app/contatos`
- `/app/estatisticas`, `/app/relatorios`
- `/app/exportar`
- `/app/etiquetas`
- `/notificacoes`
- `/configuracoes` — perfil, privacidade, tema e notificações

**Admin da plataforma**

- `/admin` — moderação do catálogo, sugestões de correção, desafios oficiais e denúncias

## 9. Fora do escopo

- Bibliotecas institucionais ou coletivas e acervos compartilhados entre usuários.
- Marketplace de compra, venda ou troca de livros.
- Leitor de e-books integrado.
- Chat privado entre usuários.
- Importação de dados de outras plataformas (Skoob, Goodreads, CSV).

## 10. Arquitetura e stack técnica

### 10.1 Arquitetura

- **Uma única API JSON**, em AdonisJS, consumida pela web e pelo app móvel. Toda regra de negócio fica na API. Os clientes cuidam só da apresentação.
- **Web em Next.js** (React), com renderização no servidor (SSR/SSG) para as páginas públicas, que precisam de SEO (livros, autores, perfis), e interatividade no cliente para a área logada.
- **Monorepo** baseado no starter kit **API Monorepo** do AdonisJS, que usa Turborepo:

```text
estante-virtual/
├── apps/
│   ├── api/        # API AdonisJS v7
│   ├── web/        # Next.js
│   └── mobile/     # app nativo (P3)
├── packages/       # código compartilhado (tipos, tokens de design, utilitários) — se necessário
├── package.json    # workspaces
└── turbo.json
```

- **Tipagem de ponta a ponta**: os tipos da API são compartilhados com os clientes por meio de HTTP Transformers no backend e um cliente tipado (Tuyau) no frontend, já previstos no starter kit.
- **Autenticação entre Next.js e API**: access tokens da API. No web, o token fica num cookie `httpOnly` do domínio do Next.js, que o repassa à API como `Authorization: Bearer` nas chamadas feitas no servidor. O app móvel usa os mesmos tokens direto no header.
- Os detalhes ficam para uma especificação técnica posterior: versionamento da API, deploy e domínios.

### 10.2 Stack

| Camada | Escolha |
| --- | --- |
| Backend | **AdonisJS v7** (TypeScript), API JSON |
| ORM / banco | Lucid + PostgreSQL |
| Autenticação | `@adonisjs/auth` + `@adonisjs/ally` (OAuth com Google). Access tokens para web e app; no web, o token fica num cookie `httpOnly` do Next.js (ver 10.1). |
| Autorização | Bouncer, com policies para dono do acervo, privacidade de perfil e papéis no clube |
| Validação | VineJS, incluindo a normalização dos padrões editoriais |
| Upload de capas e avatares | `@adonisjs/drive` (local em dev; S3 ou R2 em produção), com processamento de imagem (redimensionar, WebP, extrair cor dominante) |
| E-mail | `@adonisjs/mail` |
| Rate limit | `@adonisjs/limiter` |
| Jobs em background | Fila para conquistas, processamento de capas e e-mails (lib a definir) |
| Frontend web | **Next.js** (React) + **Tailwind CSS** com tokens de tema claro/escuro. Componentes acessíveis (ex.: shadcn/ui sobre Radix) — a confirmar. |
| Cliente da API | Cliente tipado (Tuyau) + TanStack Query para cache e estados de carregamento |
| Gráficos | Biblioteca React leve compatível com os dois temas (a definir) |
| App móvel | PWA a partir da web; depois app nativo em React Native/Expo (a confirmar), consumindo a mesma API |
| Fontes externas | Google Books API e Open Library API |
| Relatórios / etiquetas | Geração de PDF no servidor (a definir) |
| Testes | Japa |

## 11. Decisões

### 11.1 Decididas

| # | Tema | Decisão |
| --- | --- | --- |
| 1 | Frontend e API | API única em AdonisJS, web em Next.js, monorepo (ver 10.1). Detalhes técnicos em especificação futura. |
| 2 | Dados da edição | Compartilhados no catálogo, identificados por ISBN. Permitem o preenchimento automático no cadastro (ver 4.1 e 6.1). |
| 3 | Importação | Removida do escopo. Fica só a exportação dos dados do usuário (ver 5.13). |
| 4 | Privacidade padrão | Perfis novos nascem públicos. Valor investido e dados de aquisição continuam privados por padrão (ver 5.1). |
| 5 | Nome do produto | **Estanteca** ("estante" + "-teca", de biblioteca). Substitui "Estante Virtual", que já é marca de um marketplace de livros usados no Brasil. Domínio `estanteca.com.br` livre em 10/11/2026. Repositório renomeado para `adrpnt/estanteca`. |
| 6 | Prioridades | Distribuição entre P1, P2 e P3 validada conforme o resumo no início da seção 5. |
| 7 | Autenticação | Access tokens da API. No web, token num cookie `httpOnly` do Next.js, repassado à API nas chamadas feitas no servidor (ver 10.1). |

### 11.2 Em aberto

1. **Modelo de negócio**: haverá plano premium? Se sim, quais limites terá o plano gratuito? A referência limita vagas de leitor e exibe anúncios.

### 11.3 Pendências do responsável pelo produto

- Pesquisar a marca Estanteca no INPI (classes 9 e 42).
- Registrar o domínio `estanteca.com.br` (e `.app`/`.com`, se disponíveis).
- Reservar os perfis @estanteca nas redes sociais.
