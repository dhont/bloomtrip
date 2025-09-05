# FAQ (Early)

**Q: Is the API stable?**  
A: Not yet—endpoints may change; formal versioning to follow.

**Q: Which LLMs are supported?**  
A: Primary: OpenAI GPT-4o. Planned: Local models via vLLM, Azure OpenAI.

**Q: How is data cached?**  
A: Layered: in-memory (query window) + vector index + optional Redis (planned). Details pending architecture section finalization.
