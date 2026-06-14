#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"

AGENDA_DIR = File.expand_path("../_agenda", __dir__)
REQUIRED_FIELDS = %w[id title speaker track date startTime endTime room].freeze
TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/.freeze
DATE_REGEX = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.freeze

front_matter_errors = []
seen_ids = {}

Dir.glob(File.join(AGENDA_DIR, "*.md")).sort.each do |path|
  content = File.read(path, encoding: "utf-8")
  match = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)

  if match.nil?
    front_matter_errors << "#{File.basename(path)}: front matter ausente ou invalido"
    next
  end

  begin
    data = YAML.safe_load(match[1], permitted_classes: [], aliases: false)
  rescue Psych::SyntaxError => e
    front_matter_errors << "#{File.basename(path)}: YAML invalido (#{e.message})"
    next
  end

  unless data.is_a?(Hash)
    front_matter_errors << "#{File.basename(path)}: front matter nao e um mapa YAML"
    next
  end

  REQUIRED_FIELDS.each do |field|
    value = data[field]
    if !value.is_a?(String) || value.strip.empty?
      front_matter_errors << "#{File.basename(path)}: campo obrigatorio '#{field}' ausente ou vazio"
    end
  end

  %w[startTime endTime].each do |field|
    value = data[field]
    next unless value.is_a?(String)

    unless value.match?(TIME_REGEX)
      front_matter_errors << "#{File.basename(path)}: campo '#{field}' deve estar no formato HH:MM"
    end
  end

  event_date = data["date"]
  if event_date.is_a?(String) && !event_date.match?(DATE_REGEX)
    front_matter_errors << "#{File.basename(path)}: campo 'date' deve estar no formato DD/MM/AAAA"
  end

  id = data["id"]
  if id.is_a?(String) && !id.strip.empty?
    if seen_ids[id]
      front_matter_errors << "#{File.basename(path)}: id duplicado '#{id}' (ja usado em #{seen_ids[id]})"
    else
      seen_ids[id] = File.basename(path)
    end
  end
end

if front_matter_errors.any?
  warn "[validate_agenda] Falha na validacao da colecao _agenda:"
  front_matter_errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "[validate_agenda] OK: #{seen_ids.size} sessao(oes) validada(s)."
