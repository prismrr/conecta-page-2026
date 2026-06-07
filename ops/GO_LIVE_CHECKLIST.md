# GO-LIVE CHECKLIST - PRISM Conecta Hub

Objetivo: garantir liberacao segura para producao com rollback preparado.

## Pre-deploy

1. Branch protegida e PR aprovado
2. Build readiness executado com sucesso
3. UAT aprovado e assinado
4. Conteudo congelado para release (agenda/noticias)
5. Tag de release criada

## Deploy

1. Executar build estatico final
2. Publicar artefatos em CDN/static host
3. Confirmar publicacao de _headers no provider
4. Validar HTTPS ativo
5. Validar redirecionamento externo de inscricao

## Pos-deploy imediato (smoke)

1. Abrir homepage
2. Validar busca da agenda
3. Validar localizacao geo e mapa web
4. Validar CTA de inscricao
5. Validar status HTTP 200 para assets principais

## Gate de sucesso

- Sem erro critico
- Tempo de resposta aceitavel
- Fluxo principal funcional

## Janela de rollback

- Primeiros 30 minutos apos deploy
- Rollback imediato se houver bloqueio no fluxo principal
