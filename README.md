# GymPass


## RFs (Requisitos funcionais)


- [] Deve ser possível se cadastrar
- [] Deve ser possível autenticar
- [] Deve ser possível obter o perfil de um usuário logado
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [] Deve ser possível o usuário obter seu histórico de check-ins
- [] Deve ser possível o usuário buscar academias próximas
- [] Deve ser possível o usuário buscar academias pelo nome
- [] Deve ser possível o usuário realizar check-in de um usuário
- [] Deve ser possível cadastrar uma academia
- [] Deve ser possível 

# RNs (Regras de negócio)

- O usuário não deve poder se cadastrar com um e-mail duplicado
- O usuário não pode fazer 2 check-ins no mesmo dia
- O usuário não pode fazer check-in se não estiver perto (100m) da academia
- O check-in só pode ser validado até 20 minutos após criado
- O check-in só pode ser cadastrada por administradores

# RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os Dados da aplicação precisam estar persistidas em um banco PostgreSQL
- [ ] Todas listar de dados precisam estar paginadas com 2 itens por página
- [ ] O usuário deve ser identificado por JWT