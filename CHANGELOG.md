# Changelog

## [1.1.0](https://github.com/prismrr/conecta-page-2026/compare/v1.0.0...v1.1.0) (2026-08-10)


### Features

* **agenda:** add date field required and text update ([35ac858](https://github.com/prismrr/conecta-page-2026/commit/35ac858efd670dd48358e9fb0c00f9a38a0ec144))
* **agenda:** adds optional LinkedIn link to speaker cards ([8a4bc2f](https://github.com/prismrr/conecta-page-2026/commit/8a4bc2fc2631140f18ba201ebd1fc303d450c7e6))
* **analytics:** enable GA4 telemetry with Consent Mode v2 ([9354975](https://github.com/prismrr/conecta-page-2026/commit/93549755c938ccc250d4f7bc586e247eb49430ce))
* **arch:** Establish definitive system prompt with Agent.md ([19e26f2](https://github.com/prismrr/conecta-page-2026/commit/19e26f232b9a67acaa09982d1199ce73dc3300d4))
* **ci:** add automated release workflow with release-please and changelog ([d187520](https://github.com/prismrr/conecta-page-2026/commit/d187520db372c87cd0be1a7b41cd0a518a1fbd2d))
* **deploy:** migrate hosting from GitHub Pages to Vercel ([c0fc585](https://github.com/prismrr/conecta-page-2026/commit/c0fc5854b638df8ea784667e779183d80e373904))
* Implements cookie consent manager (LGPD) ([3b6ed7c](https://github.com/prismrr/conecta-page-2026/commit/3b6ed7c7c46fd8a85773b0295429da9d425c872f))
* **lgpd:** add LGPD-compliant Privacy Policy page (pt-BR) ([ae5cdd0](https://github.com/prismrr/conecta-page-2026/commit/ae5cdd0869f80cfe747cb5a45b5ff19c88f37abc))
* **lgpd:** add privacy and terms links to site footer ([0f05898](https://github.com/prismrr/conecta-page-2026/commit/0f0589857af8d9ab87851521e995daf0b67d7cd5))
* **lgpd:** add Terms of Use page (pt-BR) ([347ca44](https://github.com/prismrr/conecta-page-2026/commit/347ca449c098685f98d2a19d3d36a13a83f5a096))
* **location:** add map for CIT with fallback of the links ([063bac5](https://github.com/prismrr/conecta-page-2026/commit/063bac5b6556ff6b21a9675192a4bf5f3626a58e))
* **observability:** add client-side checking and healthcheck in production ([186c668](https://github.com/prismrr/conecta-page-2026/commit/186c66885212c2f51d0af3d6a89c8f93970659ff))
* **privacy:** convert consent banner to modal with floating gear trigger ([2e1e63d](https://github.com/prismrr/conecta-page-2026/commit/2e1e63db23cfc89b7c3a4de5927aa288b4aca6f1))
* **release:** Sprint 6 with UAT, readiness and go-live operacional ([3c625a0](https://github.com/prismrr/conecta-page-2026/commit/3c625a0ea1d87c94369681d7e0797a51d1edfa53))
* **security:** Sprint 5 hardening and baseline DevSecOps ([16cfdce](https://github.com/prismrr/conecta-page-2026/commit/16cfdce12109748766d783c774381824d54aafbc))
* **telemetry:** add GA4 with local fallback and update CSP ([7bb41d9](https://github.com/prismrr/conecta-page-2026/commit/7bb41d9abd7fb5b784dd8ba7f9ac7c60d0165894))
* **ui:** add favicon and reference in the layout ([81e76f6](https://github.com/prismrr/conecta-page-2026/commit/81e76f6ebcbe1aa445217c9a469c2a3a8941bd73))


### Bug Fixes

* **agenda:** data format pt-BR ([f3c35af](https://github.com/prismrr/conecta-page-2026/commit/f3c35afedd8bd68bf7736f05e1679a3d7280c5eb))
* **ci:** add linux to the Gemfile.lock for ruby-audit ([52a0423](https://github.com/prismrr/conecta-page-2026/commit/52a04236b872f9ccb558b7b33b3738218969fd77))
* **ci:** correct TruffleHog base/head refs for push events and allow GitHub Actions to create PRs ([c0ff5dc](https://github.com/prismrr/conecta-page-2026/commit/c0ff5dc8336e1eddb3f73c9e5b37993b8f006a4c))
* **ci:** replace Docker-based Jekyll build with native Ruby in CI environment ([7d761c9](https://github.com/prismrr/conecta-page-2026/commit/7d761c9301af84c3a037377e4da815a7df472809))
* **ci:** suppress TruffleHog false positives from vendored gems and git internals ([ec76f93](https://github.com/prismrr/conecta-page-2026/commit/ec76f93c4bc91fffa00c08ce428760bcb8cf7d7c))
* **e2e:** pre-grant LGPD consent in journey test to restore Maps iframe assertion ([5224feb](https://github.com/prismrr/conecta-page-2026/commit/5224feb10d91b2fa1f966012f4bf115bca9ade5b))
* **lgpd:** clarify GA4 Consent Mode v2, fix retention text, remove emojis, add policy link in consent modal ([28942d9](https://github.com/prismrr/conecta-page-2026/commit/28942d954739d0a2548c39a0e350cc1aef767959))
* **lgpd:** gate Google Maps iframe behind functional consent (LGPD-001) ([359cc0f](https://github.com/prismrr/conecta-page-2026/commit/359cc0f116f306b11b128333451f4eeca4aef4fe))
* **lgpd:** remove blocking window.confirm from checkbox listener (LGPD-002) ([fbf7728](https://github.com/prismrr/conecta-page-2026/commit/fbf7728e7b2e1eae4b54fabdfe993894512d2a19))
* **release:** add full security in the gate de readiness (secret scan + ruby audit) ([7fe6592](https://github.com/prismrr/conecta-page-2026/commit/7fe659239224a5a74dd0b434aac15a3d39b2c4fa))
* **security:** scope secret scan to verified secrets and exclude vendored gems ([990a606](https://github.com/prismrr/conecta-page-2026/commit/990a606dd191008d5d17f3d3b0d8dac26127b33b))
