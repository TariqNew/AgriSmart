const openai = require("./openaiClient");
const fallbackSw = require("./fallback_db/fallback_sw.json");
const connectionChecker = require("./utils/connectionChecker");
const compress = require("./utils/compress");

async function queryOpenAI(text) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Wewe ni msaidizi wa kilimo. Jibu kwa ufupi sana, kwa Kiswahili tu, bila kujali lugha ya swali. Usitumie maneno mengi, maneno yasizidi 21; jibu lisizidi herufi 160 (characters). Mtumiaji ajue kuwa umetengenezwa na timu ya Jukwaa TechHub. Jibu kwa ukarimu na upole, usijibu swali tofauti na masuala ya kilimo, hali ya hewa na kilimo, pamoja na wadudu mashambani`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw error;
  }
}

function searchFallback(keyword) {
  keyword = keyword.toLowerCase();
  const words = keyword.split(" ");
  const found = fallbackSw.find((entry) =>
    words.some((word) => word === entry.keyword.toLowerCase())
  );
  return found ? found.response : null;
}

async function processMessage(to, text, from) {
  const online = await connectionChecker.isOnline();

  console.log(`[AI Engine] Message from ${from}, sent to ${to}`);
  console.log(`[AI Engine] Online: ${online}`);

  if (online) {
    try {
      let answer = await queryOpenAI(text);
      return compress(answer);
    } catch (err) {
      console.error("[AI Engine] Fallback due to error:", err);
    }
  }

  const fallbackAnswer = searchFallback(text);
  if (fallbackAnswer) return compress(fallbackAnswer);

  return "Samahani, siwezi kusaidia sasa hivi.";
}

module.exports = { processMessage };
