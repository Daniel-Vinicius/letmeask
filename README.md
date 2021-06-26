<p align="center">
  <img alt="Letmeask" src=".github/logo.svg" width="160px">
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=NLW&message=06&color=8257E5&labelColor=000000" alt="NLW Together 06" />
  
  <img src="https://img.shields.io/github/stars/Daniel-Vinicius/letmeask?label=stars&message=MIT&color=8257E5&labelColor=000000" alt="Stars">

  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000" alt="License">   
</p>

<h1 align="center">
    <img alt="Letmeask" src=".github/cover.svg" />
</h1>

<br>

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/Daniel-Vinicius/letmeask
$ cd letmeask
```

Para executar o projeto localmente, siga os passos abaixo:
```bash
# Instalar as dependências
$ yarn

# Acesse o arquivo .env.example e de acordo com ele crie um arquivo .env.local

# Iniciar o projeto
$ yarn start
```
O app estará disponível no seu browser pelo endereço http://localhost:3000.

Lembrando que será necessário criar uma conta no [Firebase](https://firebase.google.com/) e um projeto para disponibilizar um Realtime Database.

## 💻 Projeto

Letmeask é perfeito para criadores de conteúdos poderem criar salas de Q&A com o seu público, de uma forma muito organizada e democrática. 

Este é um projeto desenvolvido durante a **[Next Level Week Together](https://nextlevelweek.com/)**, apresentada dos dias 20 a 27 de Junho de 2021.

## 🎯 A milha extra

### Eu fiz algumas coisas que acabaram ficando como desafio no último Dia da NLW Together



* **PWA e Responsividade** - Transformei o projeto em uma PWA, se quiser testar abra no seu celular agora o [meu Letmeask em produção](https://letmeask-1.vercel.app/) e verá que é possível instalar como um aplicativo, (só testei no Android). O projeto está 100% Responsivo.

* **Dark mode** - Apliquei um Dark mode no projeto.

* **Testes End-to-End com Cypress** - Nunca tinha feito um Testes ponta a ponta até então, aproveitei pra aprender e fiz, o [coverage](https://user-images.githubusercontent.com/66279500/123524439-b5509280-d6a0-11eb-97ec-932b412dd387.png) ficou em 50%, usei o Cypress Studio e fiz o que consegui, tive um pouco de _dificuldade em mockar dados_ como o de login por exemplo.

* **Melhoria de usabilidade** - A aplicação tinha algumas pontas soltas, como por exemplo quando o usuário criava uma sala não era redirecionado para a tela de administrador, ou as perguntas não eram ordenadas por likes e por se já foi respondida, não era possível alternar entre a tela de administrador e a tela de participante, não tinha modal, nem toasts, e algumas outras coisas que podiam ser melhoradas fácilmente, tudo isso que citei aqui e mais um pouco eu implementei.

* **Organização da App** - Os estilos estavam todos na pasta styles, as cores não estavam em variáveis e o projeto não usava nem Eslint nem Prettier, ao invés de fazer deploy no Firebase eu fiz na vercel e como consequência o projeto já fica com o fluxo de CI/CD pronto.


## 🔖 Layout

Você pode visualizar o layout do projeto através do link abaixo:

- [Layout Web](https://www.figma.com/file/u0BQK8rCf2KgzcukdRRCWh/Letmeask/duplicate) 

Lembrando que você precisa ter uma conta no [Figma](http://figma.com/).

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com 💜 por [Daniel Vinícius](https://github.com/Daniel-Vinicius/)
