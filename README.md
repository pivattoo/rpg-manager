# RPG Manager

## Sobre
O RPG Manager é um projeto amador desenvolvido com o propósito de estudar tecnologias, o projeto visa criar um sistema genérico para o gerenciamento de sessões de RPG, com funcionalidades basicas como rolagem de dados, sistema de PVP e PVE, gerenciamento completo de personagens, entre outras funções.

---

### Recursos
- ✅ Criação de personagens
- ✅ Rolagem de dados
- ☑️ Sistema de batalha
- ☑️ Painel do mestre para manipular o sistema
- ☑️ Gerenciamento de mundo

---

### Tecnologias utilizadas
- **Next.JS** para implementação de interfaces e API
- **Prisma** como tecnologia ORM
- **MySQL** para banco de dados relacional
- **AWS** para upload de imagens

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