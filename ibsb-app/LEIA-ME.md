# App IBSB: como colocar no ar

O app é um **web app instalável**. Os arquivos ficam no **GitHub Pages**, que é gratuito. Pedidos de oração, devocionais e login ficam no **Firebase**, do Google, que tem plano gratuito. Não é preciso servidor próprio.

Faça os passos num computador, se puder: é mais fácil do que no celular. Leva cerca de 30 minutos.

---

## 1. Firebase (banco de dados e login)

1. Acesse **console.firebase.google.com** com a conta Google que vai administrar o app.
2. **Criar projeto**, com o nome `ibsb`. O Google Analytics pode ficar desligado.
3. Na tela inicial do projeto, clique no ícone **</>** (Web) para registrar um app. Apelido: `IBSB`. Não marque o Firebase Hosting.
4. Vai aparecer um bloco `const firebaseConfig = { ... }`. **Guarde esses dados**: eles vão no passo 3.
5. Menu **Authentication**, depois **Vamos começar**, depois **Método de login**:
   - ative **Google**;
   - ative **E-mail/senha**.
6. Menu **Firestore Database**, depois **Criar banco de dados**:
   - local: **southamerica-east1 (São Paulo)**;
   - modo: **produção**.
7. Ainda no Firestore, abra a aba **Regras**. Apague o que estiver lá, cole todo o conteúdo do arquivo `firestore.rules`, troque `seu-email@gmail.com` pelo seu e-mail e clique em **Publicar**.

## 2. GitHub Pages (hospedagem)

1. Crie uma conta em **github.com**, se ainda não tiver.
2. Clique em **New repository**. Nome: `ibsb`, visibilidade **Public**, e crie.
3. Clique em **uploading an existing file** e arraste **todos os arquivos desta pasta**. Depois clique em **Commit changes**.
4. Abra **Settings**, depois **Pages**. Em *Branch*, escolha **main** e **/(root)** e clique em **Save**.
5. Em 1 ou 2 minutos o endereço do app aparece ali, no formato `https://SEU-USUARIO.github.io/ibsb/`.
6. Volte ao Firebase: **Authentication**, depois **Configurações**, depois **Domínios autorizados**, depois **Adicionar domínio**, e coloque `SEU-USUARIO.github.io`.

## 3. Ligar o app ao Firebase

1. No GitHub, abra o arquivo `firebase-config.js` e clique no lápis (editar).
2. Troque cada `COLE_AQUI` pelo valor correspondente que você guardou no passo 1.4.
3. Troque `seu-email@gmail.com` pelo seu e-mail, o mesmo que você colocou nas regras.
4. Clique em **Commit changes**.

## 4. Primeiro acesso

1. Abra o endereço do app no celular e toque em **Entrar** (canto superior direito), depois em **Entrar com Google**.
2. Em **Minha conta**, toque em **Carregar devocionais iniciais**, que carrega os 28 devocionais aprovados, e em **Carregar liderança**, que carrega os pastores e os missionários já cadastrados com foto.
3. Quando outros irmãos da liderança entrarem no app, marque cada um em **Minha conta**, na seção **Liderança**. Eles passam a poder aprovar devocionais, moderar pedidos e comentários e editar a aba Liderança.
4. Na aba **Liderança** (barra inferior), complete as partes **Liderança** e **Missionários** com o botão **Adicionar**. Na parte Missionários, a liderança também publica os **relatórios missionários**. Todos os membros veem essas informações, e só a liderança edita.
5. Na aba **Louvor**, parte **Liturgia**, a liderança cria os eventos da semana (culto de jovens, homens, mulheres…) e coloca os louvores de cada um, com tom e link para ouvir ou ver a cifra. Todos os membros veem.

## 5. Divulgar para a igreja

Envie o link, ou um QR code com o link. Para instalar:
- **Android (Chrome):** abra o link e toque em **Instalar**, que aparece na tela inicial do app, ou em ⋮ e depois **Instalar app**.
- **iPhone (Safari):** abra o link, toque em **Compartilhar** e depois em **Adicionar à Tela de Início**.

## Como atualizar o app

- **Atualização de conteúdo** (devocionais, pedidos, liderança): é feita pelo próprio app e aparece para todos na hora.
- **Atualização do app** (telas, textos fixos, hinos, documentos): envie os arquivos alterados para o repositório no GitHub, substituindo os antigos, e troque a `VERSAO` no começo do arquivo `sw.js` (por exemplo, `2026-11-24.2`). Todos os celulares recebem a versão nova na próxima vez que abrirem o app, sem precisar reinstalar.
- **Atualização feita pelo Claude:** se você conectar a sua conta do GitHub ao Claude, ele pode publicar as atualizações direto no repositório.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app |
| `firebase-config.js` | Dados de ligação com o Firebase (você preenche) |
| `firestore.rules` | Regras de segurança (cole no Firebase) |
| `sw.js` | Faz o app funcionar sem internet e se atualizar sozinho |
| `manifest.webmanifest`, ícones | Permitem instalar o app com o ícone da IBSB |
| `biblia.json` | Bíblia Livre (BLIVRE), licença livre |
| `hinos.json` | 151 hinos do Cantor Cristão em domínio público |
| `documentos.json` | Confissão de fé e Estatuto |
| `devocionais-iniciais.json` | Os 28 devocionais aprovados (usados no passo 4) |
| `pessoas-iniciais.json`, pasta `fotos` | Pastores e missionários já cadastrados e suas fotos (usados no passo 4) |
