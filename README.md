# Rpg-App

## Estrutura

Esse projeto utiliza das seguintes tecnologias:

- **Next.js**; implementação da interface e API
- **MySQL**; banco de dados
- **Prisma**; ORM, homem do meio entre banco de dados e API

Outras tecnologias também usadas neste projeto, mas sem foco neste README:

- **React**; interface
- **TypeScript**; tipagem para JavaScript

---

### Next.js

O projeto utiliza o Next.js como tecnologia de interface e API ao mesmo tempo

#### Interface

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador e tudo deve estar funcionando.
Você pode encontrar os arquivos que compoem as paginas no diretório `pages`.

#### API

O Next dispoe de [API routes](https://nextjs.org/docs/api-routes/introduction). É uma solução fácil para implementar a API diretamente no projeto do Next. Qualquer API pode ser acessada por [http://localhost:3000/api/[nome do arquivo]](http://localhost:3000/api/exemplo). Esse endpoint pode ser alterado no arquivo que implementa essa função.

Qualquer arquivo dentro das páginas da pasta `pages/api` é mapeado para `api/*` e será tratado como um endpoint em vez de uma página. Eles são apenas componentes do lado do servidor e não aumentarão o tamanho do pacote do lado do cliente.

---

### MySQL

O projeto utiliza o banco de dados relacional MySQL. Em produção, utilizamos a plataforma PlanetScale para manejar a escalabilidade. Para desenvolvimento, podemos executar um servidor local.

#### Docker

O Hub disponibiliza uma [imagem Docker oficial](https://hub.docker.com/_/mysql) do MySQL.
Para puxarmos a imagem podemos executar:

```docker
docker pull mysql
```

Para rodar a instancia:

```docker
docker run -d -p 3306:3306 --name rpg-ddb -e MYSQL_ROOT_PASSWORD=dev -e MYSQL_DATABASE=db mysql:latest
```

Se tudo ocorreu como esperado, você deve ter iniciado uma instancia Docker com o nome `rpg-ddb` na porta 3306 - ele vai ser usado como nosso servidor MySQL local.

#### Instalação local

Esse README ainda não dispoe de instruções para rodar um servidor local sem Docker.

#### Finalização

Após completar qualquer uma das duas intalações, mude o arquivo `.env` para incluir os dados do arquivo `.env-local` - ele inclui todas as variaveis necessarias para funcionar em um ambiente local de desenvolvimento com o Prisma.

---

### Prisma

O projeto utiliza o Prisma para manejar os modelos de dados; migração desses modelos para o banco ou gerando tipos TypeScript dos modelos.

#### Esquema

O arquivo de schema é o arquivo de configuração principal para a configuração do Prisma. Ele é normalmente chamado de schema.prisma e consiste das seguintes partes:

- **Fontes de dados**: Tipo do banco (MySQL, por exemplo) e URL
- **Geradores**: Quais clientes devem ser gerados com base no modelo de dados (por exemplo, Prisma Client)
- **Definição do modelo de dados**: Especifica seus modelos de aplicação (a estrutura dos dados) e suas relações

#### Gerar

O comando `generate` lê todas as informações acima mencionadas do esquema para gerar o código fonte de dados do cliente (Prisma Client).

```bash
npx prisma generate
```

#### Migrações

`migrate` é um comando de migração de esquemas para o banco de dados. Ele faz duas coisas:

- Ele cria um novo arquivo SQL para esta migração
- Executa o arquivo de migração SQL no banco de dados

`migrate` gera um histórico de arquivos de migração `.sql`, e desempenha um papel tanto no desenvolvimento quanto na implementação:

- Manter o esquema do banco de dados em sincronia com o esquema Prisma à medida que ele evolui e
- Manter os dados existentes no banco de dados

O comando `generate` é chamado silenciosamente por padrão depois de executar `migrate`.

##### Desenvolvimento

Para criar uma migração, faça uma mudança em seu esquema e execute o seguinte comando para criar e aplicar migrações:

```bash
npx prisma migrate dev
```

Em um ambiente de desenvolvimento, o `migrate` às vezes solicita que você redefina o banco de dados. A reinicialização reseta os dados e recria o banco de dados, o que resulta em perda de dados. O banco de dados é reinicializado quando:

- Você chama explicitamente `migrate reset`
- Você chama `migrate dev` e o Prisma detecta mudanças no banco de dados ou um conflito no histórico migratório

Os comandos de migração `dev` e `reset` são projetados para serem usados somente no ambiente de desenvolvimento, e não devem afetar os dados de produção.

### Variaveis de ambiente

Variaveis de ambiente destinadas para o uso em ambiente de desenvolvimento estão localizadas no arquivo `.env-local`
Certifique-se de mudar o arquivo `.env` para conter o conteudo do `.env-local` para ter um ambiente de desenvolvimento correto.