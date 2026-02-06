
import { GoogleGenAI } from "@google/genai";
import { ChoiceHistory } from "../types";

export const generateFinalReflection = async (history: ChoiceHistory): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const path = `
    节点1(晨): ${history.MORNING === 'A' ? '勤劳除草' : '避暑歇息'}
    节点2(夜): ${history.NIGHT === 'A' ? '通宵绩麻' : '早早睡去'}
    节点3(童): ${history.CHILD === 'B' ? '桑下学瓜' : '哭闹不休'}
  `;

  const prompt = `
    你是一位宋代诗人。根据玩家在《四时田园杂兴》互动游戏中的选择路径，写一段约150字的结局点评。
    玩家的选择路径如下：${path}
    
    要求：
    1. 语言风格要古雅，带有宋词或宋诗的韵味。
    2. 如果玩家全选正确(A, A, B)，赞美其勤劳美德与童真之美，复现“村庄儿女各当家”的盛况。
    3. 如果有错误选择，委婉指出荒废农事的后果。
    4. 结尾需引用或化用诗句“昼出耘田夜绩麻，村庄儿女各当家。童孙未解供耕织，也傍桑阴学种瓜。”
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    return response.text || "田园静谧，岁月悠长。你的每一个选择都刻画了不同的生活画卷。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "虽经风雨，田园依旧。勤劳是乡村最美的底色。";
  }
};
