export type NumberType = 'Auspicious' | 'Inauspicious';

export interface NumberCombination {
  name: string;
  attribute: string;
  meaning: string;
  combinations: string[];
  type: NumberType;
}

export const REFERENCE_TABLE: NumberCombination[] = [
  { 
    name: '生氣 (Sheng Qi)', 
    attribute: '貴人 (Nobleman/Mentors)', 
    meaning: 'The star of mentors and helpful people. Represents high success, fame, and vitality. It brings smooth progress and support from influential figures.',
    combinations: ['14', '67', '93', '82', '41', '76', '39', '28'], 
    type: 'Auspicious' 
  },
  { 
    name: '天醫 (Tian Yi)', 
    attribute: '財富 (Wealth)', 
    meaning: 'The star of wealth and health. Represents wisdom, intelligence, and major financial returns. It suggests money comes naturally or through high-level skill.',
    combinations: ['13', '68', '49', '72', '31', '86', '94', '27'], 
    type: 'Auspicious' 
  },
  { 
    name: '延年 (Yan Nian)', 
    attribute: '責任 (Responsibility)', 
    meaning: 'The star of longevity and leadership. Represents career stability, authority, and strong professional competence. Indicates taking on heavy responsibilities and holding positions of power.',
    combinations: ['19', '87', '34', '26', '91', '78', '43', '62'], 
    type: 'Auspicious' 
  },
  { 
    name: '伏位 (Fu Wei)', 
    attribute: '固執 (Perseverance/Stability)', 
    meaning: 'The star of waiting and persistence. Represents stability, caution, and endurance. It suggests a patient approach but can also imply missed opportunities due to over-caution.',
    combinations: ['11', '88', '77', '33', '22', '99', '66', '44'], 
    type: 'Auspicious' 
  },
  { 
    name: '絕命 (Jue Ming)', 
    attribute: '波動 (Fluctuation/Risk)', 
    meaning: 'High-risk and impulsive energy. Represents sudden financial gains or losses, extreme emotions, and risk-taking behavior. Suggests a straightforward but harsh personality.',
    combinations: ['12', '69', '84', '37', '21', '96', '48', '73'], 
    type: 'Inauspicious' 
  },
  { 
    name: '五鬼 (Wu Gui)', 
    attribute: '詭異 (Bizarre/Unpredictable)', 
    meaning: 'Brilliant but restless mind. Represents unconventional ideas, sudden changes, and suspicion. Suggests a non-traditional career path or specialized technical skill.',
    combinations: ['18', '79', '42', '36', '81', '97', '24', '63'], 
    type: 'Inauspicious' 
  },
  { 
    name: '六煞 (Liu Sha)', 
    attribute: '矛盾 (Conflict/Relationship)', 
    meaning: 'Energy of relationships and aesthetics. Represents emotional fluctuations, hidden secrets, and interpersonal conflicts. Suggests attractiveness but also complications in love or family.',
    combinations: ['16', '47', '38', '92', '61', '74', '83', '29'], 
    type: 'Inauspicious' 
  },
  { 
    name: '禍害 (Huo Hai)', 
    attribute: '衝擊 (Impact/Mishap)', 
    meaning: 'Energy of speech and minor accidents. Represents eloquence and persuasiveness but also disputes and verbal conflicts. Suggests a "harsh tongue" that can hurt others.',
    combinations: ['17', '89', '46', '23', '71', '98', '64', '32'], 
    type: 'Inauspicious' 
  },
];

export const NUMBER_PERSONS: Record<number, { name: string; archetype: string; traits: string; desires: string; strengths: string; weaknesses: string }> = {
  1: { 
    name: 'Founding Number (Leader)', 
    archetype: 'The Visionary Pioneer',
    traits: 'Independent, creative, and pioneering. You are a natural-born leader who prefers to forge your own path rather than following the crowd. Your energy is assertive and focused.', 
    desires: 'To achieve unique success and be recognized as a pioneer in your field.', 
    strengths: 'Unyielding willpower, strong initiative, self-confidence, and originality.', 
    weaknesses: 'Stubbornness, impatience, may appear self-centered or overly aggressive.' 
  },
  2: { 
    name: 'Balance Number (Partner)', 
    archetype: 'The Diplomatic Peacemaker',
    traits: 'Cooperative, diplomatic, and highly intuitive. You value harmony and excel at building bridges between people. You see multiple sides of every situation.', 
    desires: 'Deep emotional connection and a peaceful, harmonious environment.', 
    strengths: 'Empathy, patience, detail-oriented, and excellent mediation skills.', 
    weaknesses: 'Indecisiveness, over-sensitivity, and a tendency to avoid conflict at any cost.' 
  },
  3: { 
    name: 'Expressive Number (Creative)', 
    archetype: 'The Communicator',
    traits: 'Communicative, optimistic, and highly artistic. You possess a quick mind and a vibrant personality that naturally inspires and draws people toward you.', 
    desires: 'To express your unique inner world through art, speech, or performance and to be heard and seen.', 
    strengths: 'Imagination, high verbal expression, infectious enthusiasm, and social charm.', 
    weaknesses: 'Scattering energy on too many projects, superficiality, and mood swings.' 
  },
  4: { 
    name: 'Stable Number (Builder)', 
    archetype: 'The Practical Organizer',
    traits: 'Methodical, practical, and incredibly reliable. You are the "anchor" of any system, value order, and believe in the power of hard work and structure.', 
    desires: 'Total security, stability, and a sense of belonging within a clear framework.', 
    strengths: 'Exceptional discipline, organizational skills, persistence, and logic.', 
    weaknesses: 'Rigidity, resistance to change, and may appear overly cautious or dull to others.' 
  },
  5: { 
    name: 'Freedom Number (Explorer)', 
    archetype: 'The Versatile Adventurer',
    traits: 'Versatile, adventurous, and progressive. You thrive on variety and freedom, always seeking new experiences and pushing the boundaries of the status quo.', 
    desires: 'The freedom to explore life without restrictions and to experience variety.', 
    strengths: 'Adaptability, courage, strong curiosity, and magnetic charisma.', 
    weaknesses: 'Impulsiveness, restlessness, and a struggle with long-term commitments.' 
  },
  6: { 
    name: 'Nurturing Number (Caretaker)', 
    archetype: 'The Compassionate Guardian',
    traits: 'Responsible, compassionate, and deeply protective. You have a natural urge to serve others and provide comfort, often putting family and community needs first.', 
    desires: 'To create a warm, loving atmosphere and to be needed by those around you.', 
    strengths: 'Loyalty, kindness, unconditional love, and a strong sense of duty.', 
    weaknesses: 'Intrusiveness, sacrificial complex, and tendency to worry excessively.' 
  },
  7: { 
    name: 'Introspective Number (Thinker)', 
    archetype: 'The Spiritual Analyst',
    traits: 'Analytical, spiritual, and often reclusive. You seek ultimate truth and understanding, preferring deep internal exploration over superficial social interactions.', 
    desires: 'Inner peace through knowledge and uncovering the hidden mysteries of life.', 
    strengths: 'Profound intellect, sharp intuition, technical expertise, and quiet dignity.', 
    weaknesses: 'Skepticism, emotional detachment, and potential for social isolation.' 
  },
  8: { 
    name: 'Success Number (Executive)', 
    archetype: 'The Material Master',
    traits: 'Ambitious, powerful, and highly practical. You are geared toward material success, authority, and efficient management of resources and people.', 
    desires: 'Status, control, and the ability to manifest abundance in the physical world.', 
    strengths: 'Executive leadership, efficiency, sound judgment, and manifestation power.', 
    weaknesses: 'Workaholism, over-controlling nature, and measuring worth by material results.' 
  },
  9: { 
    name: 'Universal Number (Humanitarian)', 
    archetype: 'The Compassionate Visionary',
    traits: 'Compassionate, idealistic, and creative. You have a global perspective and a deep desire to help humanity, often seeing the world through a spiritual lens.', 
    desires: 'To leave a legacy of kindness and to help elevate human consciousness.', 
    strengths: 'Universal tolerance, selfless service, wisdom, and creative breadth.', 
    weaknesses: 'Emotional exhaustion, impracticality, and disconnectedness from reality.' 
  },
};

/**
 * Reduce a number to a single digit (1-9)
 */
export function reduceToSingleDigit(num: number): { value: number; steps: string[] } {
  const steps: string[] = [];
  let current = num;
  
  while (current > 9) {
    const digits = current.toString().split('').map(Number);
    steps.push(digits.join(' + ') + ' = ' + digits.reduce((a, b) => a + b, 0));
    current = digits.reduce((a, b) => a + b, 0);
  }
  
  return { value: current, steps };
}

/**
 * Calculate Life Path Number from DOB (YYYY-MM-DD)
 */
export function calculateLifePath(dob: string) {
  const parts = dob.replace(/\D/g, '');
  if (parts.length < 8) return null;
  
  const yearStr = parts.substring(0, 4);
  const monthStr = parts.substring(4, 6);
  const dayStr = parts.substring(6, 8);
  
  const yearSum = yearStr.split('').map(Number).reduce((a, b) => a + b, 0);
  const monthSum = monthStr.split('').map(Number).reduce((a, b) => a + b, 0);
  const daySum = dayStr.split('').map(Number).reduce((a, b) => a + b, 0);
  
  const totalSum = yearSum + monthSum + daySum;
  
  const step1 = `${yearStr.split('').join('+')} (Year) + ${monthStr.split('').join('+')} (Month) + ${dayStr.split('').join('+')} (Day)`;
  const step2 = `${yearSum} + ${monthSum} + ${daySum} = ${totalSum}`;
  
  const reduction = reduceToSingleDigit(totalSum);
  
  return {
    value: reduction.value,
    steps: [step1, step2, ...reduction.steps],
    personType: NUMBER_PERSONS[reduction.value]
  };
}

/**
 * Calculate Fixed Number (Month + Day reduced to single digit)
 */
export function calculateFixedNumber(dob: string) {
  const parts = dob.split(/[/-]/);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  const sum = month + day;
  const reduction = reduceToSingleDigit(sum);
  
  return {
    value: reduction.value,
    steps: [`${month} (Month) + ${day} (Day) = ${sum}`, ...reduction.steps],
    description: NUMBER_PERSONS[reduction.value].traits
  };
}

/**
 * Analyze a string for I Ching pairings with expert rules (0 and 5)
 */
export function analyzeString(input: string) {
  const rawClean = input.replace(/\D/g, '');
  const pairs: { pair: string; analysis: NumberCombination; notes?: string }[] = [];
  
  // Rule mapping
  // 0: Concealment - wait for next digit
  // 5: Bridge - strengthens the pair it sits between
  
  const cleanInput: string[] = [];
  for (const char of rawClean) {
    cleanInput.push(char);
  }

  for (let i = 0; i < cleanInput.length - 1; i++) {
    const first = cleanInput[i];
    const second = cleanInput[i+1];
    
    // Skip if current is 0 or 5 for normal pair start, 
    // but they can be part of special pairings.
    
    if (second === '5') {
       // Bridge Rule: 752 -> 72
       const third = cleanInput[i+2];
       if (third) {
         const bridgePair = first + third;
         const found = REFERENCE_TABLE.find(rt => rt.combinations.includes(bridgePair));
         if (found) {
           pairs.push({ 
             pair: first + '5' + third, 
             analysis: found, 
             notes: 'The 5 bridges the ' + first + ' and ' + third + ', strengthening the ' + found.name + ' energy.' 
           });
         }
       }
       continue;
    }

    if (first === '0' || first === '5') continue;
    if (second === '0') {
      // 0 Rule: Concealment. For now we treat it as skipped for pairings unless user specifies a more complex rule.
      // Usually 0 hides the energy.
      continue;
    }

    const pair = first + second;
    const found = REFERENCE_TABLE.find(rt => rt.combinations.includes(pair));
    if (found) {
      pairs.push({ pair, analysis: found });
    }
  }
  
  return pairs;
}
