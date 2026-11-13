| # | Decision | Chosen value | Why |
|---|---|---|---|
| D1 | Court in the initial corpus | **Supreme Court of India only** | One court means one hierarchy and one open dataset. High Courts come later. |
| D2 | Legal domain | **Employment / service law: wrongful dismissal, misconduct, domestic enquiry, natural justice** | It matches your running example. It has plenty of case law with real disagreement, so supporting and adverse cases both exist. |
| D3 | Corpus size | **About 300–600 judgments** after filtering | Enough for meaningful retrieval experiments, small enough to inspect, label, and run on a laptop. |
| D4 | Primary data source | **AWS Open Data: "Indian Supreme Court Judgments"** | Bulk download is permitted, CC-BY-4.0 licensed, and includes PDFs plus metadata (verified in Stage 1). |
| D5 | Team size | **1 student** | The plan has "if you fall behind" boxes in every Stage. |
| D6 | Hardware | **Ordinary laptop, no GPU required**, 8 GB RAM minimum, 16 GB recommended | Small embedding models and a small reranker run on CPU. |
| D7 | Where retrieval code lives | **Python `ml-service`** | The evaluation scripts and the live app must run the *same* retrieval code (see Section 1.1). |
| D8 | LLM | **Pluggable provider**: a free-tier API *or* a local open-weight model (Ollama) | Never hard-wire one provider. Free-tier limits change, so check them at build time. |
| D9 | Authentication | **Simple login added in Stage 9 only if time remains**; the prototype may run single-user | Authentication is production work, not research work. Plan the hooks, do not build all of it. |