import { GoogleGenAI } from '@google/genai';
import type { GeminiReport } from '@/types/gemini';

/**
 * List of available Gemini models for selection.
 */
export const AVAILABLE_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Optimized for speed and structured outputs.' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'The latest fast model with improved reasoning.' },
  { id: 'seed-1-8-251228', name: 'Seed 1.8 (BytePlus)', description: 'High-performance model from BytePlus/Volcengine.' },
  // { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Best for complex reasoning and deep insights.' },
  // { id: 'gemini-3-pro', name: 'Gemini 3 Pro (Experimental)', description: 'Next-generation model for advanced testing.' },
  // { id: 'gemini-3-flash', name: 'Gemini 3 Flash (Experimental)', description: 'High-speed next-gen model for testing.' },
];

/**
 * The master prompt template for Gemini AI.
 * This instructs the AI to act as a Yi-Jing Numerological Expert and
 * generate a structured JSON report.
 */

export const GEMINI_PROMPT_TEMPLATE = `
Act as an expert in Life Path Numerology and I Ching Numerology. Please perform a multi-layered analysis for me using the following inputs:
- Subject Name: {{user_name}}
- Input 1 (Static Fate / Birth Date): [{{dob}}]
- Input 2 ({{label_1}}): [{{number_1}}]
- Input 3 ({{label_2}}): [{{number_2}}]
- Output Language: {{language}}

# ReferenceTable1
## Four Auspicious Numbers (四吉數)
- 生氣 (Sheng Qi) | 貴人 (Nobleman/Mentors): 14, 67, 93, 82, 41, 76, 39, 28
- 天醫 (Tian Yi) | 財富 (Wealth): 13, 68, 49, 72, 31, 86, 94, 27
- 延年 (Yan Nian) | 責任 (Responsibility): 19, 87, 34, 26, 91, 78, 43, 62
- 伏位 (Fu Wei) | 固執 (Perseverance/Stability): 11, 88, 77, 33, 22, 99, 66, 44

## Four Inauspicious Numbers (四凶數)
- 絕命 (Jue Ming) | 波動 (Fluctuation/Risk): 12, 69, 84, 37, 21, 96, 48, 73
- 五鬼 (Wu Gui) | 詭異 (Bizarre/Unpredictable): 18, 79, 42, 36, 81, 97, 24, 63
- 六煞 (Liu Sha) | 矛盾 (Conflict/Relationship): 16, 47, 38, 92, 61, 74, 83, 29
- 禍害 (Huo Hai) | 衝擊 (Impact/Mishap): 17, 89, 46, 23, 71, 98, 64, 32

# Special Rules
- Concealment Rule: The digit '0' acts as a mantle of invisibility, concealing the energy of adjacent digits.
- Bridge Rule: The digit '5' acts as a bridge, strengthening and amplifying the connection between the digits on either side.

# Instructions
1. Life Path & Social Image Analysis
- Step-by-Step Calculation: Calculate the Life Path Number by summing every digit of the birth date until a single digit (1–9) is reached. Show the math clearly.
- Number Type Analysis: Identify the 'Number Person' type (1-9), detailing innate traits, hidden desires, strengths, and weaknesses.
- Fixed Number: Calculate the Fixed Number (Month + Day reduced to a single digit) to describe external behavior patterns and social image.

2. I Ching 'DNA' Analysis of Digital Strings
- Analyze Input 2 and Input 3 for pairing sequences based on #ReferenceTable1.
- Provide a detailed summary of the energy flow for each string, respecting their specific context ({{label_1}} and {{label_2}}).

3. Summary of 'Shu' (Number)
- Explain how the Life Path (Static) and Dynamic Strings (Active Field) interact based on the I Ching principle of 'Shu'.
- Provide a final strategic verdict (ADVANCE, RETREAT, or BALANCE) based on whether the 'Time' and 'Position' are currently auspicious.

# OUTPUT FORMAT
Provide the report EXACTLY in the following JSON structure. 
IMPORTANT: All string values in the JSON (descriptions, analysis, meanings) MUST be written in {{language}}. Keep JSON keys in English.
{
  "report_meta": {
    "subject": "string",
    "generation_date": "YYYY-MM-DD",
    "version": "1.1",
    "note": "string"
  },
  "life_path_analysis": {
    "life_path_number": {
      "value": number,
      "calculation_steps": "string",
      "archetype": "string",
      "traits": ["string"],
      "strengths": ["string"],
      "weaknesses": ["string"],
      "hidden_desire": "string",
      "detailed_analysis": "string"
    },
    "fixed_number": {
      "value": number,
      "calculation_steps": "string",
      "social_image": "string",
      "description": "string",
      "detailed_analysis": "string"
    }
  },
  "iching_dna_analysis": {
    "string_1_analysis": {
      "input": "string",
      "label": "string",
      "detailed_summary": "string",
      "pairs": [
        {
          "pair": "string",
          "name_cn": "string",
          "name_en": "string",
          "attribute": "string",
          "type": "Auspicious | Inauspicious",
          "meaning": "string"
        }
      ]
    },
    "string_2_analysis": {
      "input": "string",
      "label": "string",
      "detailed_summary": "string",
      "pairs": [...]
    }
  },
  "shu_summary": {
    "interaction": "string",
    "verdict": "ADVANCE | RETREAT | BALANCE",
    "guidance": "string"
  }
}
`.trim();

/**
 * Hydrates the prompt template with user data.
 */
export function generateGeminiPrompt(data: {
  userName: string;
  dob: string;
  string1: { value: string; label: string };
  string2: { value: string; label: string };
  language: string;
}): string {
  return GEMINI_PROMPT_TEMPLATE
    .replace('{{user_name}}', data.userName)
    .replace('{{dob}}', data.dob)
    .replace('{{label_1}}', data.string1.label)
    .replace('{{number_1}}', data.string1.value)
    .replace('{{label_2}}', data.string2.label)
    .replace('{{number_2}}', data.string2.value)
    .replaceAll('{{language}}', data.language);
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const SEED_API_KEY = import.meta.env.VITE_SEED_API_KEY;

const geminiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * Fetches a structured report from BytePlus (Seed Models).
 */
async function getBytePlusReport(prompt: string, modelName: string): Promise<GeminiReport> {
  if (!SEED_API_KEY) {
    throw new Error('VITE_SEED_API_KEY is not defined in environments.');
  }

  const response = await fetch('https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SEED_API_KEY}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            }
          ]
        }
      ],
      response_format: { type: "json_object" } // Seed supports generic JSON mode
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('BytePlus API Error:', errorText);
    throw new Error(`BytePlus API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No content received from BytePlus AI.');
  }

  try {
    console.log('BytePlus response:', JSON.parse(content));
    return JSON.parse(content) as GeminiReport;
  } catch (error) {
    console.error('Failed to parse BytePlus response as JSON:', content);
    throw new Error('Invalid response format from AI.');
  }
}

/**
 * Fetches a structured Yi-Jing report from the selected Provider.
 */
export async function getGeminiReport(
  data: Parameters<typeof generateGeminiPrompt>[0],
  modelName: string = 'gemini-1.5-flash'
): Promise<GeminiReport> {
  const prompt = generateGeminiPrompt(data);

  // Dispatch based on Model ID prefix
  if (modelName.startsWith('seed-')) {
    return getBytePlusReport(prompt, modelName);
  }

  // Default to Gemini (Google)
  if (!GEMINI_API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY is not defined in environments.');
  }

  const result = await geminiClient.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    },
  });

  const text = result.text;
  if (!text) {
    throw new Error('No response text received from AI.');
  }

  try {
    console.log('Gemini response:', JSON.parse(text))
    return JSON.parse(text) as GeminiReport;
  } catch (error) {
    console.error('Failed to parse Gemini response as JSON:', text);
    throw new Error('Invalid response format from AI.');
  }
}
