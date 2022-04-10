# keycloak-fastify-demo

```
Updates:

1. Criei uma lib no npm pra encapsular as operações no keycloak (sign, verify e createUser).
2. Adicionei os typings pra ela ser importada tanto em JS quanto em TS
3. Criei exemplos de utilização no front tanto pra JS quanto pra TS
4. Criei exemplos de utilização no back com o Fastify tanto pra JS quanto pra TS
5. Criei um exemplo de fluxo no Postman

Próximos passos

1. Subir o keycloak num POD pra verificar a velocidade de comunicação, as operações com um host de verdade (não só localhost)
```


Keycloak:

1 - servidor de identidades
2 - usuários se autenticam no próprio keycloak
3 - Mantido pela RedHat. JBOSS, Java
4 - Dá pra integrar com o RabbitMQ ou Kafka. VER!
5 - OAuth 2.0 - Padrão de implentação
6 - SSO é como uma procuração - vc dá poderes à terceiros para acessar uma aplicação em seu nome (sempre http)
7 - Client - aplicação (Front) que quer acessar o recurso (Back) em nome do Resource Owner (user1). Ex: FrontEnd quer acessar o Backend em nome do ussuário user1
8 - Open Id Connect - É uma camada de identidade em cima do OAuth 2.0. Permite implementr o SSO.
9 - O Realm é utilizado para gerenciar uma aplicação. Então se cria vários realms, uma para cada aplicação.
10 - /realms/{{realm}}/.well-known/openid-configuration - configurações do Open Id Conenct
11 - verificar o token pela API acaba criando um ponto de falaha, pois a API pode estar fora do ar. Melhor fazer pelo jsonwebtoken