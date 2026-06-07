#!/usr/bin/env ruby
# frozen_string_literal: true

signoff_path = File.expand_path("../ops/UAT_SIGNOFF.md", __dir__)

unless File.exist?(signoff_path)
  warn "[validate_uat_signoff] Arquivo nao encontrado: ops/UAT_SIGNOFF.md"
  exit 1
end

content = File.read(signoff_path)

errors = []

unless content.match?(/^Release:\s*.+$/)
  errors << "Release nao preenchido"
end

unless content.match?(/^Ambiente:\s*.+$/)
  errors << "Ambiente nao preenchido"
end

unless content.match?(/^Data:\s*\d{4}-\d{2}-\d{2}$/)
  errors << "Data invalida (use YYYY-MM-DD)"
end

unless content.match?(/## Decisao\n\n- APROVADO PARA GO-LIVE/i)
  errors << "Decisao final deve ser 'APROVADO PARA GO-LIVE'"
end

product_line = content.lines.find { |line| line.start_with?("- Produto/Coordenacao:") }
engineering_line = content.lines.find { |line| line.start_with?("- Engenharia:") }

if product_line.nil? || product_line.match?(/PENDENTE/i)
  errors << "Assinatura de Produto/Coordenacao pendente"
end

if engineering_line.nil? || engineering_line.match?(/PENDENTE/i)
  errors << "Assinatura de Engenharia pendente"
end

if errors.any?
  warn "[validate_uat_signoff] Falha no aceite formal de UAT:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "[validate_uat_signoff] OK: aceite formal de UAT aprovado para go-live."
