export interface ReportMeta {
  subject: string;
  generation_date: string;
  version: string;
  note: string;
}

export interface LifePathDetail {
  value: number;
  calculation_steps: string;
  archetype: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  hidden_desire: string;
  detailed_analysis: string;
}

export interface FixedNumberDetail {
  value: number;
  calculation_steps: string;
  social_image: string;
  description: string;
  detailed_analysis: string;
}

export interface LifePathAnalysis {
  life_path_number: LifePathDetail;
  fixed_number: FixedNumberDetail;
}

export interface ichingPair {
  pair: string;
  name_cn: string;
  name_en: string;
  attribute: string;
  type: 'Auspicious' | 'Inauspicious';
  meaning: string;
}

export interface digitalStringAnalysis {
  input: string;
  label: string;
  detailed_summary: string;
  pairs: ichingPair[];
}

export interface ichingDNAAnalysis {
  string_1_analysis: digitalStringAnalysis;
  string_2_analysis: digitalStringAnalysis;
}

export interface ShuSummary {
  interaction: string;
  verdict: 'ADVANCE' | 'RETREAT' | 'BALANCE';
  guidance: string;
}

export interface GeminiReport {
  report_meta: ReportMeta;
  life_path_analysis: LifePathAnalysis;
  iching_dna_analysis: ichingDNAAnalysis;
  shu_summary: ShuSummary;
}
