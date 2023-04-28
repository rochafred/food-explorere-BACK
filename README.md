# food-explorere-BACK
LINK DEPLOY
https://rocketbackend-11-4641.onrender.com

O programa possui duas personas distintas: o administrador e os usuários.
O administrador é o responsável pelo gerenciamento do restaurante e tem permissão para criar, visualizar, editar e excluir qualquer prato do cardápio a qualquer momento. Cada prato cadastrado deve conter uma imagem, um nome, uma categoria, uma breve descrição, os ingredientes e o preço. Ao clicar no botão "adicionar prato", o administrador receberá uma mensagem de confirmação e será redirecionado para a página principal do sistema.

Já os usuários têm acesso à lista completa de pratos cadastrados e podem visualizar todas as informações básicas de cada um deles. Caso queiram obter mais informações sobre um prato específico, é possível clicar nele e ser redirecionado para uma nova página com informações mais detalhadas.

## Tecnologia utilizado para construir o projeto:
javascript
axios
context
css
disk storage
html
hooks
jwt token
knex
local storage
middlewares
react
router
sqlite
state
tmp file img upload
user token
authentication flow and routes

## Para utilizar essas tecnologias, é necessário seguir alguns passos:

Faça o download (ou clone) deste repositório para sua máquina.
Abra o terminal na pasta raiz do projeto e execute o comando npm install para instalar as dependências necessárias.
Verifique o arquivo package.json para visualizar as dependências do projeto e, caso alguma esteja faltando, execute o comando npm install <nome da dependência> para instalá-la.
Execute as migrações de banco de dados com o comando npx knex migration:latest.
Agora você está pronto para executar o aplicativo. Basta rodar o comando npm run build no terminal.
