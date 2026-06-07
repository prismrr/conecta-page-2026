# UAT CHECKLIST - PRISM Conecta Hub

Objetivo: validar com stakeholders que o MVP atende o fluxo critico do evento antes do go-live.

## Participantes

- Produto/Coordenacao do evento
- Responsavel tecnico
- Responsavel por conteudo (agenda/noticias)

## Ambiente de homologacao

- URL:
- Commit/Tag:
- Data da sessao:
- Responsavel por conduzir:

## Casos de teste UAT (obrigatorios)

1. Fluxo principal do usuario
- Abrir landing
- Navegar para agenda
- Buscar uma sessao por termo com acento
- Abrir localizacao no app de mapas
- Abrir inscricao externa
- Resultado esperado: fluxo completo sem bloqueio

2. Conteudo editorial
- Conferir noticias exibidas
- Conferir ordem cronologica
- Resultado esperado: noticias corretas e legiveis

3. Agenda
- Conferir horarios, trilhas, salas e palestrantes
- Buscar por termo inexistente
- Resultado esperado: dados corretos e estado de sem resultado funcional

4. Fallback de agenda
- Simular indisponibilidade de assets/data/agenda.json
- Resultado esperado: mensagem de fallback e busca local funcionando

5. Responsividade
- Validar em viewport mobile (360x740) e desktop
- Resultado esperado: layout sem quebra de usabilidade

6. Acessibilidade
- Navegar por teclado no menu, busca e CTAs
- Validar foco visivel e contraste
- Resultado esperado: navegacao acessivel sem bloqueio

7. Seguranca funcional
- Validar links externos com target e rel seguros
- Resultado esperado: abrir nova aba com noopener noreferrer

## Registro de achados

- Severidade Alta:
- Severidade Media:
- Severidade Baixa:

## Criterio de aceite

- Sem defeitos de severidade alta
- Sem bloqueio no fluxo principal
- Agenda e conteudo aprovados pela coordenacao

## Assinatura de aceite

- Nome:
- Papel:
- Data:
- Status: APROVADO / REPROVADO
