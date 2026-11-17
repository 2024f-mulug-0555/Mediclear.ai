export interface Translations {
  appName: string;
  tagline: string;
  sdgGoalBadge: string;
  sdgGoalTitle: string;
  medicalDisclaimerBanner: string;
  uploadTitle: string;
  uploadSubtitle: string;
  dragDropText: string;
  supportedFormats: string;
  orDivider: string;
  trySampleDataBtn: string;
  samplesHeading: string;
  samplesSubheading: string;
  analyzingDocument: string;
  analyzingSubtitle: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  summaryTitle: string;
  keyFindingsTitle: string;
  visualChartsTitle: string;
  questionsTitle: string;
  lifestyleTitle: string;
  chatAssistantTitle: string;
  chatPlaceholder: string;
  sendBtn: string;
  copySheetBtn: string;
  printSheetBtn: string;
  urgentNotice: string;
  allFilter: string;
  attentionFilter: string;
  borderlineFilter: string;
  normalFilter: string;
  apiKeyModalTitle: string;
  saveKeyBtn: string;
}

export const TRANSLATIONS: Record<'en' | 'ur', Translations> = {
  en: {
    appName: 'MediClear AI',
    tagline: 'Bridging Health Literacy with AI Patient Empowerment',
    sdgGoalBadge: 'UN SDG 3: Good Health & Well-Being',
    sdgGoalTitle: 'Target 3.8 & 3.b: Universal Health Literacy & Patient Empowerment',
    medicalDisclaimerBanner:
      'For informational and educational purposes only. Not a substitute for professional medical advice, clinical diagnosis, or treatment. Always discuss these results with your healthcare provider.',
    uploadTitle: 'Upload Your Health Document',
    uploadSubtitle: 'Drag & drop lab reports (PDF), prescriptions (receipt/photo), or X-rays (imaging).',
    dragDropText: 'Drag & Drop medical file here or click to browse',
    supportedFormats: 'Supports PDF reports, JPG, PNG, WEBP medical images & receipts (up to 20MB)',
    orDivider: 'OR EXPLORE INSTANTLY',
    trySampleDataBtn: 'Try with Sample Medical Data (Instant Demo)',
    samplesHeading: 'Click Any Pre-loaded Case for 1-Click Evaluation:',
    samplesSubheading: 'Built-in synthetic clinical scenarios for live judging without manual file uploads',
    analyzingDocument: 'MediClear AI Multimodal Processing...',
    analyzingSubtitle: 'Extracting biomarkers, clinical observations & generating plain-language guidance with Gemini',
    step1: 'Step 1: Ingesting & OCR Scanning Document Layers',
    step2: 'Step 2: Cross-referencing Standard Clinical Reference Ranges',
    step3: 'Step 3: Translating Medical Terminology into Everyday Concepts',
    step4: 'Step 4: Structuring Interactive Visualizations & Doctor Visit Questions',
    summaryTitle: 'Plain-Language Medical Summary',
    keyFindingsTitle: 'Extracted Biomarkers & Clinical Parameters',
    visualChartsTitle: 'Interactive Biomarker Comparison Charts',
    questionsTitle: 'Questions to Ask Your Doctor',
    lifestyleTitle: 'General Wellness & Next Steps',
    chatAssistantTitle: 'MediClear Follow-Up Assistant',
    chatPlaceholder: 'Ask a question about this report (e.g., "What foods should I eat to lower LDL?")...',
    sendBtn: 'Send',
    copySheetBtn: 'Copy Doctor Visit Sheet',
    printSheetBtn: 'Print / Export Visit Sheet',
    urgentNotice: 'Clinical Attention Advised: Out-of-range markers require physician review.',
    allFilter: 'All Markers',
    attentionFilter: 'Needs Attention',
    borderlineFilter: 'Borderline',
    normalFilter: 'Normal Range',
    apiKeyModalTitle: 'Google Gemini API Settings',
    saveKeyBtn: 'Save API Key'
  },
  ur: {
    appName: 'میڈی کلیئر (SehatLens AI)',
    tagline: 'آسان اور شفاف صحت فہمی — مریضوں کی خود مختاری',
    sdgGoalBadge: 'اقوام متحدہ SDG 3: اچھی صحت اور فلاح و بہبود',
    sdgGoalTitle: 'ہدف 3.8: صحت کی مکمل معلومات اور مریض کی آگاہی',
    medicalDisclaimerBanner:
      'یہ معلومات صرف تعلیمی اور آگاہی کے مقاصد کے لیے ہیں۔ یہ کسی بھی صورت میں ڈاکٹر کے معائنے یا تشخیص کا متبادل نہیں ہے۔ کوئی بھی فیصلہ کرنے سے پہلے اپنے ڈاکٹر سے رجوع کریں۔',
    uploadTitle: 'اپنی میڈیکل رپورٹ یا نسخہ اپلوڈ کریں',
    uploadSubtitle: 'لیب ٹیسٹ رپورٹ (PDF)، ڈاکٹر کا نسخہ یا ایکسرے امیج شامل کریں۔',
    dragDropText: 'فائل یہاں ڈریگ کریں یا منتخب کرنے کے لیے کلک کریں',
    supportedFormats: 'PDF رپورٹس، تصاویر (JPG, PNG, WEBP) اور نسخے (20MB تک)',
    orDivider: 'یا فوری ڈیمو دیکھیں',
    trySampleDataBtn: 'تیار شدہ سیمپل ڈیٹا سے ٹیسٹ کریں (1-Click Demo)',
    samplesHeading: 'ایک کلک میں جائزہ لینے کے لیے سیمپل منتخب کریں:',
    samplesSubheading: 'ججز اور صارفین کے لیے بغیر فائل اپلوڈ کیے فوری لائیو ٹیسٹنگ کی سہولت',
    analyzingDocument: 'میڈی کلیئر اے آئی تجزیہ کر رہا ہے...',
    analyzingSubtitle: 'جیمینائی ملٹی موڈل اے آئی کے ذریعے رپورٹ کے اہم نکات کی آسان فہم تیاری',
    step1: 'مرحلہ 1: دستاویز اور متن کا جدید اسکین',
    step2: 'مرحلہ 2: طبی پیمانوں اور نارمل حدود سے موازنہ',
    step3: 'مرحلہ 3: پیچیدہ اصطلاحات کا عام فہم الفاظ میں ترجمہ',
    step4: 'مرحلہ 4: گرافکس اور ڈاکٹر سے پوچھے جانے والے سوالات کی تیاری',
    summaryTitle: 'آسان الفاظ میں خلاصہ',
    keyFindingsTitle: 'رپورٹ کے اہم نتائج اور بائیو مارکرز',
    visualChartsTitle: 'بصری چارٹس اور گرافیکل موازنہ',
    questionsTitle: 'ڈاکٹر سے پوچھنے کے لیے سوالات',
    lifestyleTitle: 'صحت مند طرزِ زندگی اور احتیاطی تدابیر',
    chatAssistantTitle: 'میڈی کلیئر معاون چیٹ',
    chatPlaceholder: 'رپورٹ سے متعلق کوئی بھی سوال پوچھیں...',
    sendBtn: 'ارسال کریں',
    copySheetBtn: 'ڈاکٹر شیٹ کاپی کریں',
    printSheetBtn: 'پرنٹ یا محفوظ کریں',
    urgentNotice: 'توجہ طلب: کچھ نتائج نارمل سے ہٹ کر ہیں، ڈاکٹر سے مشورہ ضروری ہے۔',
    allFilter: 'تمام نتائج',
    attentionFilter: 'توجہ طلب',
    borderlineFilter: 'بارڈر لائن',
    normalFilter: 'نارمل',
    apiKeyModalTitle: 'گوگل جیمینائی API سیٹنگز',
    saveKeyBtn: 'محفوظ کریں'
  }
};
