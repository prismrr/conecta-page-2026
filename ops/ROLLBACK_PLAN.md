# ROLLBACK PLAN - PRISM Conecta Hub

Objetivo: restaurar rapidamente uma versao estavel em caso de incidente pos-deploy.

## Triggers de rollback

1. Indisponibilidade total da pagina
2. Quebra da agenda/busca em producao
3. Falha de CTA de inscricao
4. Erro critico de conteudo operacional

## Estrategia

- Manter ultima release estavel identificada por tag
- Reapontar deploy para commit anterior estavel
- Revalidar smoke tests apos rollback

## Procedimento

1. Identificar commit/tag estavel anterior
2. Reexecutar pipeline de deploy com referencia estavel
3. Publicar artefatos estaticos da versao anterior
4. Rodar smoke test minimo
5. Comunicar status ao time

## Smoke test pos-rollback

1. Home carrega
2. Agenda e busca funcionam
3. Localizacao abre corretamente
4. CTA de inscricao abre link externo

## Comunicacao

- Canal principal:
- Responsavel tecnico:
- Horario do incidente:
- Horario de normalizacao:
- Post-mortem agendado para:
