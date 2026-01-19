export type Language = 'English' | 'Mandarin' | 'SimplifiedChinese';

export const translations: Record<Language, {
    title: string;
    subtitle: string;
    formTitle: string;
    formDescription: string;
    dobLabel: string;
    pickDate: string;
    dynamicStringsLabel: string;
    numericPlaceholder1: string;
    relationPlaceholder1: string;
    numericPlaceholder2: string;
    relationPlaceholder2: string;
    aiOracleLabel: string;
    aiOraclePlaceholder: string;
    submitButton: string;
    submittingButton: string;
    layer1Title: string;
    layer1Subtitle: string;
    masterEssence: string;
    pathPrefix: string;
    reductionSequence: string;
    archetypeIndex: string;
    characterProfile: string;
    coreStrengths: string;
    innateHurdles: string;
    soulNarrative: string;
    socialMask: string;
    layer2Title: string;
    layer2Subtitle: string;
    concealmentRule: string;
    concealmentDesc: string;
    bridgeRule: string;
    bridgeDesc: string;
    stringAnalysis: string;
    noPairs: string;
    layer3Title: string;
    layer3Subtitle: string;
    fieldInteraction: string;
    synthesisDeduction: string;
    yourPathIs: string;
    currentEnvironment: string;
    advanceDetail: string;
    retreatDetail: string;
    balanceDetail: string;
    resetButton: string;
    exportButton: string;
    footerText: string;
}> = {
    English: {
        title: "Digital I Ching",
        subtitle: "Unlocking your numerical DNA through ancient wisdom and precision analysis.",
        formTitle: "Divine Parameters",
        formDescription: "Enter your foundational data to initiate the calculation sequence.",
        dobLabel: "1. Date of Birth (Static Fate)",
        pickDate: "Pick a date",
        dynamicStringsLabel: "2 & 3. Dynamic Strings (Custom Magnetic Fields)",
        numericPlaceholder1: "Numeric String (ID, Plate, etc.)",
        relationPlaceholder1: "Relation (e.g. My Car, House Unit)",
        numericPlaceholder2: "Numeric String (Mobile, Serial, etc.)",
        relationPlaceholder2: "Relation (e.g. Work Phone, Main Contact)",
        aiOracleLabel: "AI Oracle Selection",
        aiOraclePlaceholder: "Select an AI Oracle",
        submitButton: "Initiate Multi-Layer Analysis",
        submittingButton: "Consulting the Oracle...",
        layer1Title: "Layer 1: Static Fate",
        layer1Subtitle: "The Foundation of Being",
        masterEssence: "Master Essence",
        pathPrefix: "Path",
        reductionSequence: "Reduction Sequence",
        archetypeIndex: "Ultimate Archetype Index",
        characterProfile: "Innate Character Profile",
        coreStrengths: "Core Strengths",
        innateHurdles: "Innate Hurdles",
        soulNarrative: "The Soul's Silent Narrative",
        socialMask: "Social Mask",
        layer2Title: "Layer 2: Dynamic DNA",
        layer2Subtitle: "The Flow of Numeric Energy",
        concealmentRule: "Concealment Rule",
        concealmentDesc: "The 0 acts as a \"Mantle of Invisibility,\" concealing the energy of the adjacent digit.",
        bridgeRule: "Bridge Rule (Multiplier)",
        bridgeDesc: "The 5 acts as a \"Bridge,\" strengthening the connection between digits and amplifying the pairing.",
        stringAnalysis: "Numerical Analysis of Dynamic String",
        noPairs: "No Significant Latent Energy Links Detected",
        layer3Title: "Layer 3: Synthesis",
        layer3Subtitle: "The Final Verdict of Shu",
        fieldInteraction: "The Field Interaction",
        synthesisDeduction: "Synthesis Deduction",
        yourPathIs: "Your path is",
        currentEnvironment: "Current environment",
        advanceDetail: "Auspicious Magnetic Alignment",
        retreatDetail: "Volatile Field Conflict",
        balanceDetail: "Dynamic Stasis Detected",
        resetButton: "Reset Sequence",
        exportButton: "Export Detailed Report",
        footerText: "Shuzi Yijing Protocol. Absolute Confidentiality Guaranteed.",
    },
    Mandarin: {
        title: "數位易經",
        subtitle: "以古老智慧與精準分析，解鎖您的數字基因密碼。",
        formTitle: "神聖參數",
        formDescription: "輸入您的基礎數據以啟動計算序列。",
        dobLabel: "1. 出生日期 (靜態命運)",
        pickDate: "選擇日期",
        dynamicStringsLabel: "2 & 3. 動態字串 (自定義磁場)",
        numericPlaceholder1: "數字字串 (身份證、車牌等)",
        relationPlaceholder1: "關係 (例如：我的車、房屋單位)",
        numericPlaceholder2: "數字字串 (手機、序號等)",
        relationPlaceholder2: "關係 (例如：工作電話、主要聯繫人)",
        aiOracleLabel: "AI 神諭選擇",
        aiOraclePlaceholder: "選擇 AI 神諭",
        submitButton: "啟動多層分析",
        submittingButton: "正在諮詢神諭...",
        layer1Title: "第一層：靜態命運",
        layer1Subtitle: "存在的根基",
        masterEssence: "主宰精華",
        pathPrefix: "命盤",
        reductionSequence: "還原序列",
        archetypeIndex: "終極原型指數",
        characterProfile: "先天性格側寫",
        coreStrengths: "核心優勢",
        innateHurdles: "先天障礙",
        soulNarrative: "靈魂的無聲訴說",
        socialMask: "社交面具",
        layer2Title: "第二層：動態 DNA",
        layer2Subtitle: "數字能量的流動",
        concealmentRule: "隱藏規則",
        concealmentDesc: "數字 0 如同「隱形斗篷」，隱藏相鄰數字的能量。",
        bridgeRule: "橋樑規則 (放大器)",
        bridgeDesc: "數字 5 如同「橋樑」，強化數字之間的連結並放大配對能量。",
        stringAnalysis: "動態字串數字分析",
        noPairs: "未檢測到顯著的潛在能量連結",
        layer3Title: "第三層：綜合",
        layer3Subtitle: "數的最終裁決",
        fieldInteraction: "場域互動",
        synthesisDeduction: "綜合推演",
        yourPathIs: "您的命盤是",
        currentEnvironment: "當前環境",
        advanceDetail: "吉祥磁場對齊",
        retreatDetail: "波動場域衝突",
        balanceDetail: "動態平衡狀態",
        resetButton: "重置序列",
        exportButton: "導出完整報告",
        footerText: "數字易經協議。絕對機密保證。",
    },
    SimplifiedChinese: {
        title: "数位易经",
        subtitle: "以古老智慧与精准分析，解锁您的数字基因密码。",
        formTitle: "神圣参数",
        formDescription: "输入您的基础数据以启动计算序列。",
        dobLabel: "1. 出生日期 (静态命运)",
        pickDate: "选择日期",
        dynamicStringsLabel: "2 & 3. 动态字串 (自定义磁场)",
        numericPlaceholder1: "数字字串 (身份证、车牌等)",
        relationPlaceholder1: "关系 (例如：我的车、房屋单位)",
        numericPlaceholder2: "数字字串 (手机、序号等)",
        relationPlaceholder2: "关系 (例如：工作电话、主要联系人)",
        aiOracleLabel: "AI 神谕选择",
        aiOraclePlaceholder: "选择 AI 神谕",
        submitButton: "启动多层分析",
        submittingButton: "正在咨询神谕...",
        layer1Title: "第一层：静态命运",
        layer1Subtitle: "存在的根基",
        masterEssence: "主宰精华",
        pathPrefix: "命盘",
        reductionSequence: "还原序列",
        archetypeIndex: "终极原型指数",
        characterProfile: "先天性格侧写",
        coreStrengths: "核心优势",
        innateHurdles: "先天障碍",
        soulNarrative: "灵魂的无声诉说",
        socialMask: "社交面具",
        layer2Title: "第二层：动态 DNA",
        layer2Subtitle: "数字能量的流动",
        concealmentRule: "隐藏规则",
        concealmentDesc: "数字 0 如同「隐形斗篷」，隐藏相邻数字的能量。",
        bridgeRule: "桥梁规则 (放大器)",
        bridgeDesc: "数字 5 如同「桥梁」，强化数字之间的连结并放大配对能量。",
        stringAnalysis: "动态字串数字分析",
        noPairs: "未检测到显著的潜在能量连结",
        layer3Title: "第三层：综合",
        layer3Subtitle: "数的最终裁决",
        fieldInteraction: "场域互动",
        synthesisDeduction: "综合推演",
        yourPathIs: "您的命盘是",
        currentEnvironment: "当前环境",
        advanceDetail: "吉祥磁场对齐",
        retreatDetail: "波动场域冲突",
        balanceDetail: "动态平衡状态",
        resetButton: "重置序列",
        exportButton: "导出完整报告",
        footerText: "数字易经协议。绝对机密保证。",
    }
};
