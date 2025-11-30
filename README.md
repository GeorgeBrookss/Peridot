# Peridot
*A nova rede social para compartilhar seus gostos*

<br>

## Descrição do Projeto

**Peridot** é uma rede social completa, desenvolvida com uma API back-end em **Django Rest Framework (DRF)** e um front-end moderno construído com **React** e **Styled-Components**.

O projeto nasceu com o objetivo acadêmico de ser um clone simplificado do Twitter, mas evoluiu com a adição de funcionalidades extras para aprimorar a experiência do usuário. Hoje, a Peridot é uma plataforma funcional onde diversos usuários já interagem entre si.

<br>

## Funcionalidades

A plataforma oferece uma experiência completa de rede social, incluindo:

### Autenticação e Contas
* Sistema seguro de cadastro e login de usuários.

### Gerenciamento de Perfil
* Customização de foto de perfil (incluindo GIFs), nome e senha.
* Visualização da lista de postagens feitas pelo usuário em seu próprio perfil.

### Feed e Socialização
* Sistema para seguir e deixar de seguir outros usuários.
* Visualização da lista de seguidores e de quem o usuário segue.
* Feed de notícias cronológico que exibe apenas as postagens dos usuários seguidos.

### Postagens e Interações
* Criação de postagens com texto, imagens e GIFs.
* Possibilidade de curtir e comentar nas publicações de outros usuários.

### Busca e Descoberta
* Ferramenta de pesquisa para encontrar usuários e postagens específicas.

### Design Responsivo
* Interface totalmente adaptável para uma experiência consistente em desktops, tablets e celulares.

<br>

## Objetivo do Projeto

O desenvolvimento deste projeto teve como finalidade principal aplicar e consolidar os conhecimentos adquiridos durante minha jornada no curso **Desenvolvedor Fullstack Python** da EBAC.

<br>

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias e ferramentas:

### Front-end
* **Linguagem:** TypeScript
* **Biblioteca:** React
* **Estilização:** Styled Components
* **Qualidade de Código:** ESLint e Prettier para padronização e linting.
* **Gerenciador de Pacotes:** npm

### Back-end
* **Framework:** Django e Django Rest Framework (DRF)
* **Banco de Dados:** SQLite

<br>

## Deploy

A aplicação está no ar e pode ser acessada através dos seguintes links:

* **Front-end (Vercel):** https://peridot-smoky.vercel.app/
* **Back-end (PythonAnywhere):** https://georgebks.pythonanywhere.com/api/

<br>

## Guia de Uso (Tutorial)

Siga os passos abaixo para explorar a rede social Peridot:

### 1. Cadastro e Login

* **Ao entrar no site, essa será a primeira página que você irá visualizar:**
  
![Tela inicial](https://georgebrookss.github.io/Peridot/assets/Tela-inicial.png)

* **Clique em 'Cadastrar' e será redirecionado para a página de cadastro. Preencha os dados no formulário corretamente:**
  
![Página de cadastro](https://georgebrookss.github.io/Peridot/assets/Tela-Cadastro.png)

* **Após realizar o cadastro com sucesso, você será redirecionado para a página de login novamente (caso não consiga fazer o login, atualize a página e tente novamente).**

<br>

  
* **Com o login realizado, você será redirecionado para o seu feed inicial.**


  
![Feed inicial](https://georgebrookss.github.io/Peridot/assets/Tela-Feed-Inicial.png)

* **Como sua conta é nova e não segue nenhum usuário, os únicos posts disponíveis são os de sugestão (últimos posts enviados por usuários diversos).**

  
![Sugestão de Posts](https://georgebrookss.github.io/Peridot/assets/Sugestao.png)

<br>

### 2. Criação e Edição de Postagens

* **Clicando no campo de texto central, no topo da tela, você pode digitar seu post:**
  
![Digitando um novo Post](https://georgebrookss.github.io/Peridot/assets/Digitando-Postagem.png)

* **Caso deseje, é possível anexar uma imagem ou GIF à sua postagem:**
  
![Adicionando imagem ao Post](https://georgebrookss.github.io/Peridot/assets/Adicionando-Imagem.png)

* **Clicando em "Postar", você realiza sua postagem. Ela aparecerá em tempo real no seu feed.**
* (Ao atualizar sua página, é possível ver sua postagem nas novidades sugeridas, onde aparece para todos os usuários, incluindo aqueles que não te seguem.)
  
![Postagem enviada](https://georgebrookss.github.io/Peridot/assets/Postando.png)

* **Você pode editar ou excluir suas próprias postagens. Clique no botão 'Editar' (verde) para modificar o texto.**
* (Não é possível editar a imagem da postagem. Caso queira remover a postagem, clique no botão 'Excluir' (vermelho) para apagá-la.)

*Postagem durante a edição:*
![Postagem em edição](https://georgebrookss.github.io/Peridot/assets/Durante-Edicao.png)

* Quando estiver satisfeito com a edição, clique em **Salvar Edição**. Se quiser cancelar a ação, clique em **Cancelar**.
<br>

### 3. Interagindo com Posts

* **As formas de interagir com os posts (tanto no feed principal quanto nos perfis) são:**
  
* Dando 'Like':    
![Botão de Like](https://georgebrookss.github.io/Peridot/assets/Like.png)
    
* E comentando:    
![Espaço para Comentário](https://georgebrookss.github.io/Peridot/assets/Espaco-Comentario.png)

* **Você também pode ver os detalhes da postagem, incluindo a seção de comentários.**

<br>

### 4. Busca e Descoberta de Usuários

* **Clicando no campo de pesquisa, é possível procurar por usuários e posts. A pesquisa é ativada automaticamente a partir do segundo caractere, e os resultados são listados, permitindo scroll.**
* Ao clicar em um usuário, você é redirecionado para o perfil dele.

* Resultado de usuários:
  
![Pesquisa por Usuários](https://georgebrookss.github.io/Peridot/assets/Pesquisa-Usuarios.png)

* Resultado de postagens:

![Pesquisa por Postagens](https://georgebrookss.github.io/Peridot/assets/Pesquisa-Postagem.png)

<br>

### 5. Perfis de Terceiros e Acompanhamento

* **Ao entrar no perfil de outro usuário, você verá a opção de segui-lo (ou deixar de seguir, caso já esteja acompanhando):**

* Perfil de terceiro (opção Seguir):
![Perfil de Terceiros](https://georgebrookss.github.io/Peridot/assets/Perfil-de-Terceiros.png)

* Perfil de terceiro (opção Deixar de Seguir):
![Perfil com usuário já Seguido](https://georgebrookss.github.io/Peridot/assets/Seguindo.png)

* **O perfil de cada usuário contém um feed com todos os posts feitos por ele. É possível interagir com os posts (curtir e comentar) de dentro do perfil.**

* **Após seguir um usuário, as postagens dele aparecerão no seu feed (tela principal), como mostrado abaixo:**
![Feed Atualizado com Posts de Seguidores](https://georgebrookss.github.io/Peridot/assets/Tela-Feed-Atualizada.png)

* **É possível ver a lista de seguidores e de quem o usuário está seguindo no perfil dele. Também é possível entrar no perfil dos usuários listados.**

* Lista de seguidores:
![Lista de Seguidores](https://georgebrookss.github.io/Peridot/assets/Lista-Seguidores.png)

* Lista de 'Seguindo':
![Lista de quem está Seguindo](https://georgebrookss.github.io/Peridot/assets/Lista-Seguindo.png)

<br>

### 6. Editando Seu Próprio Perfil

* **O Peridot permite que você veja e edite o seu perfil, alterando desde o nome de exibição até a senha.**
* No lugar de 'Seguir'/'Deixar de Seguir', quando é o seu próprio perfil, irá aparecer a opção **'Editar Perfil'** no mesmo local.
  
* Editando nome de perfil:
![Tela de Edição de Perfil](https://georgebrookss.github.io/Peridot/assets/Editar-Perfil.png)

* Nome editado:
![Nome de Perfil Editado](https://georgebrookss.github.io/Peridot/assets/Nome-Editado.png)

*(Após a edição, ao atualizar sua página, você verá que seu nome já estará atualizado em todos os campos disponíveis no site.)*

* **Editando Foto de Perfil**
* Lembre-se: sua imagem de perfil pode ser um GIF para ficar mais estilizada!
* Para mudar a imagem de perfil, clique na foto atual. Isso abrirá o seletor de imagens do seu dispositivo.
* Seja criativo e use um estilo que você goste!

* Antes de mudar a foto de perfil (placeholder):
![Foto de Perfil Padrão](https://georgebrookss.github.io/Peridot/assets/Perfil-Usuario.png)

* Após a edição:
![Foto de Perfil Atualizada](https://georgebrookss.github.io/Peridot/assets/Perfil-Usuario-Atualizado.png)

<br>

### 7. Aproveite!

* **Crie o seu perfil e se conecte com outros usuários.**
* Compartilhe seus gostos.
* Personalize seu perfil.
* Curta postagens que se interessar.
* Lembre-se sempre de ser respeitoso e amigável com todos os usuários.

* **Teste em diferentes dispositivos e aproveite a responsividade!**

![Mockup do Peridot em diferentes dispositivos](https://georgebrookss.github.io/Peridot/assets/Mockup-Peridot.png)
