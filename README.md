🎮 RPG Battle – Projeto de Estudos

Esse projeto nasceu com um objetivo bem simples:
me ajudar a voltar a praticar React Native com um backend real.

Apesar de eu já trabalhar com ReactJS, fazia um bom tempo que eu não colocava a mão na massa com React Native, então decidi criar um cenário completo de estudo, simulando um jogo de batalha em turnos, com:

Backend próprio

Banco de dados

Regras de jogo

Integração futura com um app mobile

A ideia nunca foi criar algo comercial ou super complexo, e sim um ambiente de treino real, igual ao que acontece no dia a dia de um desenvolvedor.

💡 Sobre o Projeto

Aqui existe um backend simples de RPG, onde:

Usuários escolhem personagens

Criam batalhas

Entram em batalhas de outros jogadores

Realizam ataques por turno

A batalha termina automaticamente quando o HP de alguém chega a zero

Também implementei um sistema de matchmaking automático, para que, se um jogador criar uma batalha e ninguém entrar, o próprio sistema una jogadores aleatoriamente depois de alguns segundos.
Isso foi feito para simular melhor a experiência de um jogo real.

🎯 Por que eu criei isso?

A principal motivação foi treinar minha programação no mobile com React Native.

Como no dia a dia eu trabalho mais com ReactJS na web, esse backend serve apenas como:

Fonte de dados para o app mobile

Base para testes de telas, requisições e estados

Ambiente de treino com regras reais

Simulação de um jogo simples, mas completo

Ou seja, esse backend é o suporte para o aprendizado no frontend mobile.

🗄️ Banco de Dados e Dados Iniciais

Para facilitar os testes, o sistema já sobe com alguns dados prontos automaticamente:

Dois usuários de exemplo

Quatro personagens (Guerreiro, Mago, Arqueiro e Curandeiro)

Skills básicas para cada personagem

Isso existe apenas para que eu consiga começar a testar o app no React Native rapidamente.
📌 No futuro, a ideia é permitir cadastro dinâmico de tudo isso via tela.

🔐 Sobre configurações e segurança

As configurações de banco de dados não ficam no GitHub.

Elas ficam salvas localmente usando User Secrets, então quem clonar este projeto precisará configurar sua própria conexão com o banco antes de rodar.

Isso foi feito justamente para:

Evitar vazar credenciais

Manter o repositório seguro

Simular um ambiente mais próximo do real

📱 Próximo Passo: React Native

O próximo passo desse projeto é construir um aplicativo mobile em React Native que irá:

Listar batalhas

Criar novas partidas

Exibir personagem e HP

Executar ataques

Mostrar turnos em tempo real

Esse backend já está pronto justamente para servir de base para esse aprendizado.


⚠️ Observação Importante

Esse projeto é exclusivamente para fins de estudo e portfólio.
Ele não foi criado com foco em produção, e sim no aprendizado.
