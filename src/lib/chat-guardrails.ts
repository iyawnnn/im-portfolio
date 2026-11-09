export type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_USER_MESSAGE_LENGTH = 2_000;
const MAX_ASSISTANT_MESSAGE_LENGTH = 8_000;
const MAX_TOTAL_LENGTH = 12_000;

const REDIRECT_MESSAGE =
  "I’m Ian’s AI portfolio assistant, so I can help with Ian’s background, projects, technical work, or ways to get in touch. What would you like to know about his portfolio?";
const FILIPINO_REDIRECT_MESSAGE =
  "AI portfolio assistant ako ni Ian. Makakatulong ako sa background, projects, technical work, o contact details niya. Ano ang gusto mong malaman tungkol sa portfolio niya?";

const portfolioWords = new Set([
  "ian", "macabulos", "portfolio", "portoflio", "project", "projects", "proejcts", "experience", "education", "background", "skill", "skills", "resume", "contact", "contcat", "freelance", "hire", "blog", "article",
  "neffi", "neffy", "kodasync", "kodasynk", "subvantage", "grit", "mamars", "climaph", "movieloom", "thryve",
  "next", "nextjs", "react", "typescript", "javascript", "node", "express", "postgres", "mongodb", "tailwind", "python", "fastapi", "laravel", "php", "java", "flutter", "angular", "vue", "aws", "drizzle", "prisma", "redis", "groq",
]);
const portfolioPhrases = ["ac core", "better san fernando", "ua attendance", "mama r", "holy angel", "tech stack", "techstack", "mga proyekto", "mga projects", "mako contact", "makontak si ian", "tungkol kay ian"];
const projectWords = new Set(["neffi", "neffy", "kodasync", "kodasynk", "subvantage", "grit", "mamars", "climaph", "movieloom", "thryve"]);
const projectPhrases = ["ac core", "better san fernando", "ua attendance", "mama r"];
const technicalWords = new Set(["next", "nextjs", "react", "typescript", "javascript", "node", "express", "postgres", "mongodb", "tailwind", "python", "fastapi", "laravel", "php", "java", "flutter", "angular", "vue", "aws", "drizzle", "prisma", "redis", "groq"]);

const greeting = /^(?:hi|hello|hey|good (?:morning|afternoon|evening)|how are you|kumusta|kamusta|musta|magandang (?:umaga|hapon|gabi))[!,.?\s]*$/i;
const securityRequest = /(?:ignore|ignroe|override|bypass|disregard).{0,60}(?:instruction|instruc\w*|rule|prompt|promt|role)|(?:kalimutan|limutin|isantabi|balewalain|i\s*ignore|ignorehin|huwag\s+pansinin).{0,60}(?:instruction|instruc\w*|tagubilin|utos|rule|patakaran|prompt|promt|role)|(?:pretend|magpanggap).{0,60}(?:chatgpt|ai|assistant)|(?:system|hidden|developer)\s+(?:prompt|promt|instruction|instruc\w*|tagubilin)|(?:reveal|show|give|tell|print|what(?:'s| is)|ibigay|ipakita|ilabas).{0,40}(?:api\s*key|environment variable|secret|token|prompt|promt|instruction|instruc\w*|tagubilin)/i;
const codeRequest = /(?:write|give|make|generate|create|show|gawan|gumawa|sumulat|ibigay).{0,50}(?:script|program|code|solution|example)/i;
const generalCodeRequest = /(?:script|program|code|solution).{0,40}\b(?:anything|random|for me|my (?:class|work|assignment)|kahit\s+ano|para\s+(?:sa\s+)?akin|takdang\s+aralin)\b|\b(?:anything|random|kahit\s+ano)\b.{0,40}(?:script|program|code|solution)/i;
const unrelatedRequest = /homework|assignment|takdang\s+aralin|(?:sagutan|gawin|tulungan).{0,40}(?:assignment|homework|takdang\s+aralin)|random joke|tell (?:me )?a joke|magkwento.{0,30}(?:joke|biro)|general trivia|latest (?:news|balita)|(?:balita|news)\b/i;
const identityQuestion = /(?:are|r) you (?:an? )?(?:ai|bot|real)|who (?:built|made) you/i;
const followUp = /^(?:(?:how\s+(?:did\s+(?:he|ian|it|that)|does\s+(?:he|it|that)|was\s+(?:it|that)|is\s+(?:it|that))|why\s+(?:did|does)\s+(?:he|ian|it|that)|what\s+(?:else|technology|stack|tools|role)|show\s+(?:me\s+)?(?:a\s+)?technical\s+example|paano\s+(?:niya|ginamit|ginawa)|bakit\s+(?:niya|ginawa)|(?:more\s+)?details|ipaliwanag|paliwanag|it|that|those|them|ito|iyan|yon)\b)/i;
const technicalProjectQuestion = /\b(?:architecture|build|handle|data|api|technical|implementation|authentication|paano|ginawa|ginamit)\b/i;
const filipinoLanguageSignal = /\b(?:ako|mo|niya|siya|ang|mga|ano|anong|paano|bakit|pwede|puwede|gusto|kumusta|kamusta|magpanggap|kalimutan|ibigay|balita|takdang)\b/i;

export function validateChatMessages(value: unknown): { messages: ChatMessage[] } | { error: string } {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) {
    return { error: "Please send a conversation with up to 20 messages." };
  }

  let totalLength = 0;
  const messages: ChatMessage[] = [];
  for (const message of value) {
    if (!message || typeof message !== "object" || !("role" in message) || !("content" in message)) {
      return { error: "Messages must include a role and text content." };
    }
    const { role, content } = message;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string" || !content.trim()) {
      return { error: "Messages must use user or assistant roles with text content." };
    }
    const maxLength = role === "user" ? MAX_USER_MESSAGE_LENGTH : MAX_ASSISTANT_MESSAGE_LENGTH;
    if (content.length > maxLength) return { error: `Each ${role} message exceeds the maximum allowed length.` };
    totalLength += content.length;
    if (totalLength > MAX_TOTAL_LENGTH) return { error: "Conversation exceeds the maximum allowed length." };
    messages.push({ role, content: content.trim() });
  }

  if (messages.at(-1)?.role !== "user") return { error: "The latest message must come from the visitor." };
  return { messages };
}

function hasPortfolioContext(message: string) {
  const normalized = message.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const words = new Set(normalized.split(" "));
  const hasPortfolioTerm = [...portfolioWords].some((term) => !technicalWords.has(term) && words.has(term));
  const hasTechnicalTerm = [...technicalWords].some((term) => words.has(term));
  return hasPortfolioTerm
    || (hasTechnicalTerm && /\b(?:ian|macabulos|he|his|him|niya|siya)\b/i.test(message))
    || portfolioPhrases.some((term) => normalized.includes(term));
}

function hasProjectContext(message: string) {
  const normalized = message.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const words = new Set(normalized.split(" "));
  return [...projectWords].some((term) => words.has(term)) || projectPhrases.some((term) => normalized.includes(term));
}

function redirectFor(message: string) {
  return filipinoLanguageSignal.test(message) ? FILIPINO_REDIRECT_MESSAGE : REDIRECT_MESSAGE;
}

function isUnsafeHistoryContent(message: string) {
  return securityRequest.test(message);
}

export function portfolioScopeResponse(messages: ChatMessage[]): string | null {
  const latest = (messages.at(-1)?.content ?? "").replace(/\s+/g, " ");
  const earlierVisitorContext = messages.slice(0, -1).some((message) => message.role === "user" && hasPortfolioContext(message.content));
  const earlierProjectContext = messages.slice(0, -1).some((message) => message.role === "user" && hasProjectContext(message.content));
  if (securityRequest.test(latest) || generalCodeRequest.test(latest) || unrelatedRequest.test(latest)) return redirectFor(latest);
  if (/weather|panahon/i.test(latest) && !(hasProjectContext(latest) && technicalProjectQuestion.test(latest))) return redirectFor(latest);
  if (codeRequest.test(latest) && !hasProjectContext(latest) && !earlierProjectContext) return REDIRECT_MESSAGE;
  if (greeting.test(latest) || identityQuestion.test(latest) || hasPortfolioContext(latest)) return null;

  // Only visitor messages establish a portfolio topic for a natural follow-up.
  return earlierVisitorContext && followUp.test(latest) ? null : REDIRECT_MESSAGE;
}

export function portfolioPromptContext(messages: ChatMessage[]) {
  return messages.filter((message, index) => message.role === "user"
    && portfolioScopeResponse(messages.slice(0, index + 1)) === null,
  ).slice(-3).map((message) => message.content).join("\n");
}

export function sanitizeMessagesForModel(messages: ChatMessage[]) {
  const acceptedUsers: ChatMessage[] = [];
  const sanitized: ChatMessage[] = [];
  let canKeepAssistant = false;

  for (const message of messages) {
    if (message.role === "user") {
      if (portfolioScopeResponse([...acceptedUsers, message])) {
        canKeepAssistant = false;
        continue;
      }
      acceptedUsers.push(message);
      sanitized.push(message);
      canKeepAssistant = true;
      continue;
    }

    if (canKeepAssistant && !isUnsafeHistoryContent(message.content)) sanitized.push(message);
    canKeepAssistant = false;
  }

  return sanitized;
}
