# EVENT RUNBOOK - Operacao durante o evento

Objetivo: orientar atualizacoes rapidas de conteudo durante os dias do evento.

## Rotina operacional

1. Monitorar painel de problemas e disponibilidade
2. Receber solicitacoes de mudanca da coordenacao
3. Atualizar arquivos em _news e _agenda
4. Executar validacoes antes de publicar

## Comandos operacionais

1. Validar agenda e links externos:

```bash
ruby scripts/validate_agenda.rb
ruby scripts/validate_external_links.rb
```

2. Build local de verificacao:

```bash
npm run build:site
```

3. Readiness completo (pre-publicacao critica):

```bash
bash scripts/release_readiness.sh
```

## SLA operacional recomendado

- Noticias urgentes: publicacao em ate 10 minutos
- Correcao de agenda: publicacao em ate 15 minutos

## Padrao para comunicados urgentes

- Titulo curto e direto
- Data e horario da atualizacao
- Acao clara para o participante

## Escalonamento

1. Incidente de conteudo: responsavel editorial
2. Incidente tecnico: responsavel tecnico
3. Incidente de plataforma externa (inscricao): coordenacao
