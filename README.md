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
* **Banco de Dados:** MySQL

<br>

## Deploy

A aplicação está no ar e pode ser acessada através dos seguintes links:

* **Front-end (Vercel):**  [https://peridot-smoky.vercel.app/]
* **Back-end (PythonAnywhere):** [https://georgebks.pythonanywhere.com/api/]

<br>


## Tutorial
* **Ao entrar no site essa vai ser a primeira página que irá visualizar:**
  
![Tela inicial](assets/Tela-inicial.png)

* **Clique em 'Cadastrar' e será redirecionado para a página de cadastro. Preencha os dados seguindo o formulário corretamente:**
  
![Página de cadastro](assets/Tela-Cadastro.png)

* **Após realizar o cadastro com sucesso, será redirecionado para a página de login novamente (caso não consiga realizar o login atualize a página atual e tente logar novamente).**

  <br>
  
* **Com o login realizado, irá ser redirecionado para o seu feed inicial.**
  
![Feed inicial](assets/Tela-Feed-Inicial.png)

* **Como sua conta é nova e não segue nenhum usuário, os unicos posts disponiveis são os de sugestão (últimos posts enviados por usuários diversos).**

  
![Feed inicial](assets/Sugestao.png)

  <br>

* **Clicando no input central ao topo da tela você pode digitar seus Posts:**
  
![Feed inicial](assets/Digitando-Postagem.png)

* **Caso deseje, é possivel atribuir uma imagem ou gif na sua postagem:**
  
![Feed inicial](assets/Adicionando-Imagem.png)


* **Clicando em "Postar" você realiza sua postagem, irá aparecer em tempo real no seu feed**
* (ao atualizar sua página é possivel ver sua postagem nas novidades sugeridas, onde aparece para todos os usuários, incluindo os que não te seguem)
  
  
![Feed inicial](assets/Postando.png)


* **Clicando no Input de pesquisa, é possivel procurar por usuários e posts, ao clicar em um usuário é redirecionado para o perfil do mesmo**
* a pesquisa ativa a partir do segundo caractere automaticamente, os resultados são listados permitindo scroll.

  
* Resultado de usuários:
  
![Feed inicial](assets/Pesquisa-Usuarios.png)

<br>
* Resultado de postagens:

![Feed inicial](assets/Pesquisa-Postagem.png)

<br>

* **Ao entrar no perfil de um usuário, você verá a opção de segui-lo (ou deixar de seguir caso já esteja seguindo):**


* normal:
![Feed inicial](assets/Perfil-de-Terceiros.png)


* seguindo:
![Feed inicial](assets/Seguindo.png)


<br>

* **É possivel ver a lista de seguidores e seguindo no perfil do usuário:**
* Também é possivel entrar no perfil dos usuários listados 

* Lista de seguidores:
![Feed inicial](assets/Lista-Seguidores.png)

* Lista de seguindo:
![Feed inicial](assets/Lista-Seguindo.png)

* o perfil de cada usuário contém um feed com todos os posts feitos por ele:
* é possivel interagir com os posts de dentro do pefil do usuário e no feed

* as formas de interagir são dando like:
![Feed inicial](assets/Like.png)

* e comentando:
![Feed inicial](assets/Espaco-Comentario.png)


* **O Peridot permite que você veja e edite o seu perfil desde o nome de exibição até senha**
** no lugar de 'seguir'/'deixar de seguir', quando é o seu próprio perfil irá aparecer a opção 'Editar Perfil' no mesmo local
  
* editando nome de perfil:
![Feed inicial](assets/Editar-Perfil.png)

* nome editado:
![Feed inicial](assets/Nome-Editado.png)

*(Após edição, quando atualizar sua página verá que seu nome já está editado em todos os campos disponiveis no site)


* ** Editando foto de perfil **
  
* lembrando que sua imagem de perfil pode ser um gif para ficar mais estilizado!

* para mudar a imagem de perfil clique na foto atual que abrirá o seletor de imagens do seu dispositivo.

*seja criativo e deixe com um estilo que você goste!

*antes de mudar a foto de perfil (placeholder):
![Feed inicial](assets/Perfil-Usuario.png)

*após edição:

![Feed inicial](assets/Perfil-Usuario-Atualizado.png)
