#!/usr/bin/env ruby
# frozen_string_literal: true

FILES_TO_SCAN = [
  File.expand_path("../index.md", __dir__),
  File.expand_path("../_layouts/default.html", __dir__)
].freeze

errors = []

FILES_TO_SCAN.each do |file_path|
  content = File.read(file_path)

  content.scan(/<a\b[^>]*>/i).each do |anchor|
    href_match = anchor.match(/href="([^"]+)"/i)
    next if href_match.nil?

    href = href_match[1]
    next unless href.start_with?("http://", "https://")

    unless anchor.match?(/target="_blank"/i)
      errors << "#{File.basename(file_path)}: link externo '#{href}' sem target=\"_blank\""
    end

    rel_match = anchor.match(/rel="([^"]+)"/i)
    rel_tokens = rel_match ? rel_match[1].downcase.split : []
    %w[noopener noreferrer].each do |token|
      unless rel_tokens.include?(token)
        errors << "#{File.basename(file_path)}: link externo '#{href}' sem rel contendo '#{token}'"
      end
    end
  end
end

if errors.any?
  warn "[validate_external_links] Falhas encontradas:"
  errors.each { |error| warn "- #{error}" }
  exit 1
end

puts "[validate_external_links] OK: links externos com atributos de seguranca validados."
