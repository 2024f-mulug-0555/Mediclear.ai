import { DemoSampleScenario } from '../types/medical';

export const SAMPLE_SCENARIOS: DemoSampleScenario[] = [
  {
    id: 'sample-cbc-lipid',
    title: 'Sample CBC & Lipid Panel Lab Report',
    titleUrdu: 'خون اور کولیسٹرول کی ٹیسٹ رپورٹ (CBC & Lipid)',
    subtitle: 'Comprehensive Metabolic, Blood Count & Lipid Profile',
    documentType: 'Lab Report',
    badge: 'Routine Wellness Lab',
    iconName: 'FileSpreadsheet',
    mockFile: {
      name: 'Diagnostic_Lab_Report_CBC_Lipid_Panel.pdf',
      type: 'application/pdf',
      size: '142 KB'
    },
    sampleResult: {
      documentType: 'Lab Report',
      patientContext: 'Routine 45-year-old annual executive health checkup; patient noted occasional fatigue and family history of early cardiovascular disease.',
      plainLanguageSummary: [
        'Your overall blood cell counts (red and white cells) and kidney function numbers are in a healthy, normal range.',
        'Your LDL ("bad") cholesterol (154 mg/dL) and total cholesterol (238 mg/dL) are higher than the standard target, suggesting a need to talk to your doctor about heart health.',
        'Your fasting blood sugar (112 mg/dL) and HbA1c (5.9%) sit in the borderline or "pre-diabetes" range, which can often be improved with targeted nutrition and daily activity.',
        'No emergency indicators are present; this report gives you and your doctor a clear roadmap for preventive lifestyle adjustments.'
      ],
      plainLanguageSummaryUrdu: [
        'آپ کے خون کے خلیات (خون کے سرخ اور سفید ذرات) اور گردوں کی کارکردگی بالکل نارمل ہے۔',
        'آپ کا کولیسٹرول (LDL - 154 mg/dL) مطلوبہ حد سے کچھ زیادہ ہے، جس پر ڈاکٹر سے دل کی صحت کے بارے میں مشورہ کرنا بہتر رہے گا۔',
        'خالی پیٹ شوگر (112 mg/dL) بارڈر لائن پر ہے، جسے بروقت پرہیز اور روزانہ واک سے کنٹرول کیا جا سکتا ہے۔',
        'کوئی فوری خطرہ نہیں ہے؛ یہ رپورٹ بیماری سے بچاؤ اور بہتر طرزِ زندگی کے لیے بہترین رہنمائی فراہم کرتی ہے۔'
      ],
      keyFindings: [
        {
          id: 'k1',
          parameterName: 'LDL Cholesterol ("Bad" Cholesterol)',
          value: 154,
          unit: 'mg/dL',
          normalRangeMin: 50,
          normalRangeMax: 100,
          referenceRangeText: 'Optimal: < 100 mg/dL',
          status: 'Needs Attention',
          simpleExplanation: 'LDL carries cholesterol through your bloodstream. Higher amounts can slowly form plaques inside blood vessels over time.',
          simpleExplanationUrdu: 'ایل ڈی ایل کو نقصان دہ کولیسٹرول کہا جاتا ہے، جو زیادہ ہو تو شریانوں میں تنگی پیدا کر سکتا ہے۔',
          clinicalContext: 'Elevated atherogenic lipoprotein level; merits cardiovascular risk stratification and dietary counseling.',
          category: 'Lipid Profile'
        },
        {
          id: 'k2',
          parameterName: 'Total Cholesterol',
          value: 238,
          unit: 'mg/dL',
          normalRangeMin: 125,
          normalRangeMax: 200,
          referenceRangeText: 'Desirable: < 200 mg/dL',
          status: 'Needs Attention',
          simpleExplanation: 'The total amount of circulating fats in your blood, driven up largely by the higher LDL reading.',
          simpleExplanationUrdu: 'خون میں کولیسٹرول کی کل مقدار، جس کی مطلوبہ حد 200 سے کم ہونی چاہیے۔',
          clinicalContext: 'Hypercholesterolemia requiring discussion of diet and potential statin therapy if indicated.',
          category: 'Lipid Profile'
        },
        {
          id: 'k3',
          parameterName: 'HDL Cholesterol ("Good" Cholesterol)',
          value: 44,
          unit: 'mg/dL',
          normalRangeMin: 40,
          normalRangeMax: 60,
          referenceRangeText: 'Normal: > 40 mg/dL',
          status: 'Normal',
          simpleExplanation: 'HDL acts like a cleanup crew, picking up excess cholesterol and taking it back to your liver.',
          simpleExplanationUrdu: 'ایچ ڈی ایل مفید کولیسٹرول ہے جو شریانوں کو صاف رکھنے میں مدد دیتا ہے۔',
          clinicalContext: 'Protective lipid level is within acceptable threshold, though higher is cardioprotective.',
          category: 'Lipid Profile'
        },
        {
          id: 'k4',
          parameterName: 'Triglycerides',
          value: 210,
          unit: 'mg/dL',
          normalRangeMin: 50,
          normalRangeMax: 150,
          referenceRangeText: 'Normal: < 150 mg/dL',
          status: 'Needs Attention',
          simpleExplanation: 'Triglycerides store unused calories from meals as fat. Elevated levels often respond well to cutting back on refined sugars and simple carbs.',
          simpleExplanationUrdu: 'ٹرائی گلیسرائیڈز خون میں چربی کی ایک قسم ہے جو میٹھے اور تلی ہوئی چیزوں سے بڑھ سکتی ہے۔',
          clinicalContext: 'Moderate hypertriglyceridemia, often associated with insulin resistance or excess caloric intake.',
          category: 'Lipid Profile'
        },
        {
          id: 'k5',
          parameterName: 'Fasting Blood Glucose',
          value: 112,
          unit: 'mg/dL',
          normalRangeMin: 70,
          normalRangeMax: 99,
          referenceRangeText: 'Normal: 70 - 99 mg/dL',
          status: 'Borderline',
          simpleExplanation: 'Your blood sugar after an overnight fast. 112 falls in the "impaired fasting glucose" (pre-diabetes) zone.',
          simpleExplanationUrdu: 'نہار منہ شوگر کا لیول 112 ہے جو کہ ابتدائی وارننگ (پری ذیابیطس) کی نشاندہی کرتا ہے۔',
          clinicalContext: 'Impaired fasting glucose requiring follow-up oral glucose evaluation or HbA1c correlation.',
          category: 'Glycemic Control'
        },
        {
          id: 'k6',
          parameterName: 'Hemoglobin A1c (HbA1c)',
          value: 5.9,
          unit: '%',
          normalRangeMin: 4.0,
          normalRangeMax: 5.6,
          referenceRangeText: 'Normal: < 5.7 %',
          status: 'Borderline',
          simpleExplanation: 'Shows your average blood sugar over the past 90 days. Values between 5.7% and 6.4% indicate pre-diabetes.',
          simpleExplanationUrdu: 'گزشتہ تین ماہ کی اوسط شوگر 5.9 فیصد ہے، جو کہ ہلکی سی زیادہ ہے۔',
          clinicalContext: 'Pre-diabetic glycemic range; prime opportunity for lifestyle intervention.',
          category: 'Glycemic Control'
        },
        {
          id: 'k7',
          parameterName: 'Hemoglobin (Hb)',
          value: 14.8,
          unit: 'g/dL',
          normalRangeMin: 13.5,
          normalRangeMax: 17.5,
          referenceRangeText: 'Normal: 13.5 - 17.5 g/dL',
          status: 'Normal',
          simpleExplanation: 'The protein in red blood cells that carries oxygen from your lungs to the rest of your body.',
          simpleExplanationUrdu: 'خون میں ہیموگلوبن کی مقدار بالکل درست ہے، خون کی کمی کی کوئی علامت نہیں۔',
          clinicalContext: 'Erythrocyte oxygen-carrying capacity is stable.',
          category: 'Hematology (CBC)'
        },
        {
          id: 'k8',
          parameterName: 'Serum Creatinine',
          value: 0.92,
          unit: 'mg/dL',
          normalRangeMin: 0.70,
          normalRangeMax: 1.30,
          referenceRangeText: 'Normal: 0.70 - 1.30 mg/dL',
          status: 'Normal',
          simpleExplanation: 'A natural muscle breakdown byproduct that healthy kidneys filter out efficiently.',
          simpleExplanationUrdu: 'گردوں کے فلٹر کرنے کی صلاحیت (کریٹینائن) بالکل نارمل اور محفوظ ہے۔',
          clinicalContext: 'Renal filtration function intact.',
          category: 'Kidney Function'
        }
      ],
      visualChartData: [
        { name: 'LDL Cholesterol', value: 154, unit: 'mg/dL', normalMin: 50, normalMax: 100, status: 'Needs Attention', scorePercent: 88, category: 'Lipids' },
        { name: 'Total Cholesterol', value: 238, unit: 'mg/dL', normalMin: 125, normalMax: 200, status: 'Needs Attention', scorePercent: 85, category: 'Lipids' },
        { name: 'Triglycerides', value: 210, unit: 'mg/dL', normalMin: 50, normalMax: 150, status: 'Needs Attention', scorePercent: 82, category: 'Lipids' },
        { name: 'Fasting Glucose', value: 112, unit: 'mg/dL', normalMin: 70, normalMax: 99, status: 'Borderline', scorePercent: 68, category: 'Metabolic' },
        { name: 'HbA1c', value: 5.9, unit: '%', normalMin: 4.0, normalMax: 5.6, status: 'Borderline', scorePercent: 62, category: 'Metabolic' },
        { name: 'HDL Cholesterol', value: 44, unit: 'mg/dL', normalMin: 40, normalMax: 60, status: 'Normal', scorePercent: 48, category: 'Lipids' },
        { name: 'Hemoglobin', value: 14.8, unit: 'g/dL', normalMin: 13.5, normalMax: 17.5, status: 'Normal', scorePercent: 50, category: 'Blood' },
        { name: 'Creatinine', value: 0.92, unit: 'mg/dL', normalMin: 0.70, normalMax: 1.30, status: 'Normal', scorePercent: 45, category: 'Kidney' }
      ],
      chartType: 'biomarker_ranges',
      questionsForDoctor: [
        {
          id: 'q1',
          question: 'Given my LDL of 154 mg/dL, do you recommend trying dietary modifications first for 3 months, or is medication advised?',
          questionUrdu: 'میرے LDL کولیسٹرول 154 کو مدنظر رکھتے ہوئے، کیا پہلے 3 ماہ خوراک میں تبدیلی کروں یا دوا ضروری ہے؟',
          reason: 'Helps determine whether lifestyle adjustments alone are sufficient based on your overall cardiovascular risk score.'
        },
        {
          id: 'q2',
          question: 'With a fasting glucose of 112 mg/dL and HbA1c at 5.9%, what specific target should I aim for at my next follow-up?',
          questionUrdu: 'میری شوگر 112 اور HbA1c 5.9 پر ہے، اگلے چیک اپ کے لیے میرا ہدف کیا ہونا چاہیے؟',
          reason: 'Clarifies whether this represents pre-diabetes and establishes clear measurable benchmarks for prevention.'
        },
        {
          id: 'q3',
          question: 'What types of aerobic or strength exercise would be safest and most effective for lowering my triglycerides?',
          questionUrdu: 'ٹرائی گلیسرائیڈز کو کم کرنے کے لیے کون سی ورزش یا چہل قدمی سب سے زیادہ فائدہ مند رہے گی؟',
          reason: 'Physical activity directly activates enzymes that clear circulating blood triglycerides.'
        },
        {
          id: 'q4',
          question: 'Should I repeat this lipid and glucose panel in 90 days or 6 months to monitor my progress?',
          questionUrdu: 'کیا مجھے یہ ٹیسٹ 3 ماہ بعد دوبارہ کروانا چاہیے یا 6 ماہ بعد؟',
          reason: 'Ensures you have a scheduled checkpoint to see if your wellness interventions are working.'
        }
      ],
      nextStepsAndLifestyle: [
        'Heart-Healthy Dietary Fats: Swap saturated fats (butter, ghee, fatty meats) with extra virgin olive oil, avocados, walnuts, and chia seeds.',
        'Soluble Fiber Boost: Aim for 10-15 grams of soluble fiber daily (oatmeal, lentils, beans, apples, psyllium husk) to naturally bind digestive cholesterol.',
        'Refined Sugar Limitation: Replace sugary drinks, sweet teas, and baked goods with water, green tea, or lemon-infused water.',
        'Active Movement: Strive for 150 minutes per week of brisk walking or moderate cycling (e.g., 30 minutes, 5 days per week).'
      ],
      nextStepsAndLifestyleUrdu: [
        'کھانے میں گھی اور تلی ہوئی اشیاء کے بجائے زیتون کا تیل اور میوہ جات (اخروٹ، بادام) ترجیح دیں۔',
        'فائبر کا زیادہ استعمال کریں جیسے دلیہ، دالیں، پھل اور اسپغول کا چھلکا۔',
        'میٹھی چائے، کولڈ ڈرنکس اور بیکری مصنوعات سے حتی الامکان پرہیز کریں۔',
        'روزانہ 30 منٹ تیز چہل قدمی یا ہلکی ورزش کو معمول بنائیں۔'
      ],
      urgentAttentionRequired: false,
      disclaimer: 'For informational and educational purposes only. Not a substitute for professional medical advice or diagnosis. Always discuss these results with your qualified healthcare provider.',
      analyzedAt: 'Just now (Hackathon Live Demo)',
      sourceFileName: 'Diagnostic_Lab_Report_CBC_Lipid_Panel.pdf',
      fileType: 'application/pdf',
      filePreviewUrl: '/samples/sample-cbc-lipid.svg',
      rawTextPreview: `PATIENT DIAGNOSTIC REPORT
ID: PT-84092  AGE: 45  GENDER: MALE
DATE: CURRENT  SPECIMEN: SERUM & WHOLE BLOOD
-----------------------------------------------------------
TEST NAME                   RESULT    UNIT      REFERENCE
-----------------------------------------------------------
Total Cholesterol           238       mg/dL     < 200 Desirable
Triglycerides               210       mg/dL     < 150 Normal
HDL Cholesterol             44        mg/dL     > 40 Normal
LDL Cholesterol             154       mg/dL     < 100 Optimal
Fasting Blood Glucose       112       mg/dL     70 - 99 Normal
Hemoglobin A1c (HbA1c)      5.9       %         < 5.7 Normal
Hemoglobin (Hb)             14.8      g/dL      13.5 - 17.5
Total Leukocyte Count (WBC) 6,800     /uL       4,000 - 11,000
Platelet Count              240,000   /uL       150k - 450k
Serum Creatinine            0.92      mg/dL     0.70 - 1.30
Estimated GFR               >90       mL/min    > 60 Normal
-----------------------------------------------------------`
    }
  },
  {
    id: 'sample-chest-xray',
    title: 'Sample Chest X-Ray Radiograph',
    titleUrdu: 'سینے کا ایکسرے امیج (Chest X-Ray Radiograph)',
    subtitle: 'Posteroanterior (PA) View Chest Radiography Assessment',
    documentType: 'Medical Imaging / X-Ray',
    badge: 'Diagnostic Radiography',
    iconName: 'Activity',
    mockFile: {
      name: 'Chest_XRay_PA_View_Observation.webp',
      type: 'image/webp',
      size: '320 KB'
    },
    sampleResult: {
      documentType: 'Medical Imaging / X-Ray',
      patientContext: 'Adult patient presenting with mild exertional shortness of breath on climbing stairs; PA chest radiograph performed to evaluate heart size and pulmonary fields.',
      plainLanguageSummary: [
        'Lungs are clear: Both lungs show good air aeration with no signs of pneumonia, fluid buildup, or infection.',
        'Heart silhouette: The heart outline appears slightly widened (borderline cardiomegaly, cardiothoracic ratio approximately 54%), which can occur with long-standing blood pressure.',
        'Bones and rib cage: The ribs, collarbones, and thoracic spine demonstrate normal density with no fractures or abnormalities.',
        'Next clinic focus: Sharing this with your doctor allows them to correlate the mild cardiac silhouette finding with your resting blood pressure and physical exam.'
      ],
      plainLanguageSummaryUrdu: [
        'پھیپھڑے بالکل صاف ہیں: نمونیا، انفیکشن یا پانی جمع ہونے کی کوئی علامت نظر نہیں آ رہی۔',
        'دل کا سائز: دل کا خاکہ ہلکا سا بڑا دکھائی دے رہا ہے (کارڈیومیگالی)، جو عموماً بلڈ پریشر کی وجہ سے ہو سکتا ہے۔',
        'پسلیوں اور ہڈیوں کا ڈھانچہ: تمام ہڈیاں اور پسلیاں نارمل ہیں، فریکچر کا کوئی نشان نہیں۔',
        'ڈاکٹر سے مشورہ: اس ایکسرے رپورٹ کو ڈاکٹر کو دکھا کر اپنے بلڈ پریشر کی پیمائش اور تصدیق کروانا مفید ہے۔'
      ],
      keyFindings: [
        {
          id: 'x1',
          parameterName: 'Cardiothoracic Ratio (CTR)',
          value: '0.54 (54%)',
          unit: 'ratio',
          normalRangeMin: 0.35,
          normalRangeMax: 0.50,
          referenceRangeText: 'Normal PA View: < 0.50 (50%)',
          status: 'Borderline',
          simpleExplanation: 'Compares the width of the heart to the widest diameter of the inner chest cage. Above 0.50 suggests mild cardiac enlargement.',
          simpleExplanationUrdu: 'سینے کے مقابلے میں دل کے حجم کا تناسب۔ 50 فیصد سے زیادہ ہلکی سی وسعت ظاہر کرتا ہے۔',
          clinicalContext: 'Borderline transverse cardiac enlargement; correlation with systemic hypertension or chamber dilatation recommended.',
          category: 'Cardiovascular Silhouette'
        },
        {
          id: 'x2',
          parameterName: 'Bilateral Lung Aeration',
          value: 'Clear',
          unit: 'status',
          referenceRangeText: 'Expected: Clear & Well-Expanded',
          status: 'Normal',
          simpleExplanation: 'Both left and right lung zones are completely clear of consolidations, nodules, or shadows.',
          simpleExplanationUrdu: 'دونوں پھیپھڑے صاف اور ہوادار ہیں، کوئی داغ یا رطوبت موجود نہیں۔',
          clinicalContext: 'No focal consolidation, pneumothorax, or acute airspace disease.',
          category: 'Pulmonary Parenchyma'
        },
        {
          id: 'x3',
          parameterName: 'Costophrenic Angles',
          value: 'Sharp & Intact',
          unit: 'status',
          referenceRangeText: 'Expected: Acute / Sharp Angles',
          status: 'Normal',
          simpleExplanation: 'The bottom corners of your lungs where they meet the diaphragm are sharp, proving there is no fluid pool (pleural effusion).',
          simpleExplanationUrdu: 'پھیپھڑوں کے نچلے کونے بالکل واضح ہیں، یعنی پانی یا سیال جمع نہیں ہے۔',
          clinicalContext: 'Costophrenic sulci are clear without pleural blunting.',
          category: 'Pleural Space'
        },
        {
          id: 'x4',
          parameterName: 'Mediastinum & Trachea',
          value: 'Midline & Normal',
          unit: 'status',
          referenceRangeText: 'Expected: Midline alignment',
          status: 'Normal',
          simpleExplanation: 'The central airway (windpipe) is straight and centrally located with no abnormal displacement.',
          simpleExplanationUrdu: 'سانس کی مرکزی نالی درمیان میں درست پوزیشن پر ہے۔',
          clinicalContext: 'Trachea is midline; mediastinal contour is otherwise unremarkable.',
          category: 'Airway & Mediastinum'
        },
        {
          id: 'x5',
          parameterName: 'Thoracic Skeletal Framework',
          value: 'Unremarkable',
          unit: 'status',
          referenceRangeText: 'Expected: Intact cortices',
          status: 'Normal',
          simpleExplanation: 'Ribs, clavicles, and visual spine show normal bone contours with no evidence of focal bone lesions.',
          simpleExplanationUrdu: 'ہڈیوں اور پسلیوں کی بناوٹ مضبوط اور محفوظ ہے۔',
          clinicalContext: 'Visualized osseous structures demonstrate normal integrity.',
          category: 'Bony Thorax'
        }
      ],
      visualChartData: [
        { name: 'Lung Field Clarity', value: 95, unit: '%', normalMin: 90, normalMax: 100, status: 'Normal', scorePercent: 95, category: 'Lungs', notes: 'Clear parenchyma' },
        { name: 'Costophrenic Angles', value: 92, unit: '%', normalMin: 85, normalMax: 100, status: 'Normal', scorePercent: 92, category: 'Pleura', notes: 'Sharp & free of fluid' },
        { name: 'Airway / Trachea Alignment', value: 90, unit: '%', normalMin: 85, normalMax: 100, status: 'Normal', scorePercent: 90, category: 'Airway', notes: 'Centrally positioned' },
        { name: 'Thoracic Bone Density', value: 88, unit: '%', normalMin: 80, normalMax: 100, status: 'Normal', scorePercent: 88, category: 'Osseous', notes: 'Intact contours' },
        { name: 'Heart Size (CTR)', value: 54, unit: '%', normalMin: 35, normalMax: 50, status: 'Borderline', scorePercent: 68, category: 'Heart', notes: 'Mild enlargement (54%)' },
        { name: 'Follow-up Priority Score', value: 65, unit: 'pts', normalMin: 0, normalMax: 50, status: 'Borderline', scorePercent: 65, category: 'Clinical', notes: 'Routine cardio review' }
      ],
      chartType: 'imaging_observations',
      questionsForDoctor: [
        {
          id: 'qx1',
          question: 'The X-ray notes a slightly widened heart shadow (CTR 54%). Does my resting blood pressure explain this?',
          questionUrdu: 'ایکسرے میں دل کا شیڈو کچھ چوڑا ظاہر ہو رہا ہے، کیا اس کی وجہ بلڈ پریشر ہو سکتی ہے؟',
          reason: 'Blood pressure is the most common reversible factor that gradually increases heart muscle thickness.'
        },
        {
          id: 'qx2',
          question: 'Would you recommend a follow-up echocardiogram (ultrasound of the heart) to examine my heart valves and chambers in real time?',
          questionUrdu: 'کیا مجھے دل کی مکمل جانچ کے لیے ایکوکارڈیوگرام (دل کا الٹراساؤنڈ) کروانے کی ضرورت ہے؟',
          reason: 'An echocardiogram provides exact wall thicknesses and ejection fraction measurements.'
        },
        {
          id: 'qx3',
          question: 'Are my lungs completely clear of any fluid or infection?',
          questionUrdu: 'کیا میرے پھیپھڑے ہر قسم کے انفیکشن یا رطوبت سے بالکل صاف ہیں؟',
          reason: 'Confirms that any exertional breathlessness is likely not due to pneumonia or asthma flare-up.'
        },
        {
          id: 'qx4',
          question: 'What target heart rate or intensity is safe for me when I exercise or walk?',
          questionUrdu: 'میرے لیے چہل قدمی یا روزمرہ سرگرمیوں کے دوران کون سی احتیاطیں ضروری ہیں؟',
          reason: 'Provides personalized physical activity guidance tailored to your cardiovascular conditioning.'
        }
      ],
      nextStepsAndLifestyle: [
        'Blood Pressure Log: Measure and record your resting blood pressure twice daily (morning and evening) for 7 consecutive days before your doctor appointment.',
        'Sodium Moderation: Reduce dietary salt intake to under 2,000 mg daily by cooking fresh meals and avoiding high-sodium packaged snacks.',
        'Hydration Awareness: Drink adequate plain water throughout the day; avoid excessive caffeine or energy drinks.',
        'Symptom Monitoring: Seek prompt medical attention if you experience chest tightness, sudden dizziness, or difficulty breathing while lying flat.'
      ],
      nextStepsAndLifestyleUrdu: [
        'اپنا بلڈ پریشر صبح اور شام ناپ کر ایک ڈائری میں 7 دن تک نوٹ کریں تاکہ ڈاکٹر کو دکھا سکیں۔',
        'کھانوں میں نمک کی مقدار کم رکھیں اور نمکین بازاری سنیکس سے گریز کریں۔',
        'دن بھر میں پانی کا متوازن استعمال کریں اور ضرورت سے زیادہ چائے/کافی سے بچیں۔',
        'اگر سینے میں درد، سانس کا اچانک رکنا یا چکر آنے کی شکایت ہو تو فوراً قریبی ایمرجنسی سے رجوع کریں۔'
      ],
      urgentAttentionRequired: false,
      disclaimer: 'For informational and educational purposes only. Not a substitute for professional medical advice or diagnosis. Medical imaging must always be formally reviewed by a certified radiologist or treating physician.',
      analyzedAt: 'Just now (Hackathon Live Demo)',
      sourceFileName: 'Chest_XRay_PA_View_Observation.webp',
      fileType: 'image/svg+xml',
      filePreviewUrl: '/samples/sample-chest-xray.svg'
    }
  },
  {
    id: 'sample-prescription-receipt',
    title: 'Sample Pharmacy Prescription & Medication Receipt',
    titleUrdu: 'ڈاکٹر کا نسخہ اور فارمیسی رسید (Doctor Prescription)',
    subtitle: 'Prescription Itemization, Daily Timing Schedule & Drug Safety Notes',
    documentType: 'Prescription / Receipt',
    badge: 'Clinical Prescription',
    iconName: 'Pill',
    mockFile: {
      name: 'Cardiology_InternalMed_Rx_Prescription.png',
      type: 'image/png',
      size: '215 KB'
    },
    sampleResult: {
      documentType: 'Prescription / Receipt',
      patientContext: 'Follow-up prescription after diagnosis of mild hypertension and dyslipidemia; 3 maintenance medications prescribed with instructions on meal timings.',
      plainLanguageSummary: [
        'You have 3 primary maintenance medicines prescribed for heart, blood pressure, and metabolic health.',
        'Lisinopril (10 mg) is taken once daily in the morning to protect blood vessels and keep blood pressure steady.',
        'Metformin (500 mg) is taken twice daily with meals (breakfast & dinner) to support healthy glucose processing.',
        'Atorvastatin (20 mg) is taken once daily at bedtime, when your liver naturally produces the most cholesterol.'
      ],
      plainLanguageSummaryUrdu: [
        'آپ کے نسخے میں دل، بلڈ پریشر اور شوگر کے تحفظ کے لیے 3 بنیادی ادویات شامل ہیں۔',
        'لیزینوپرل (10 ملی گرام): صبح کے وقت ایک گولی بلڈ پریشر کو متوازن رکھنے کے لیے۔',
        'میٹفارمین (500 ملی گرام): صبح اور شام کھانے کے دوران ایک گولی، تاکہ پیٹ خراب نہ ہو۔',
        'ایٹورواسٹیٹن (20 ملی گرام): رات سوتے وقت ایک گولی، کولیسٹرول کو کم رکھنے کے لیے۔'
      ],
      keyFindings: [
        {
          id: 'rx1',
          parameterName: 'Lisinopril (ACE Inhibitor)',
          value: '10 mg',
          unit: 'Oral Tablet',
          referenceRangeText: '1 tablet once daily (Morning)',
          status: 'Normal',
          simpleExplanation: 'Relaxes blood vessels so blood flows more easily, lowering blood pressure and protecting your kidneys.',
          simpleExplanationUrdu: 'شریانوں کو کشادہ کر کے بلڈ پریشر کو قابو میں رکھتی ہے اور گردوں کی حفاظت کرتی ہے۔',
          clinicalContext: 'Antihypertensive ACE inhibitor. Take with or without food every morning.',
          category: 'Cardiovascular'
        },
        {
          id: 'rx2',
          parameterName: 'Metformin Hydrochloride',
          value: '500 mg',
          unit: 'Oral Tablet',
          referenceRangeText: '1 tablet twice daily (With Meals)',
          status: 'Normal',
          simpleExplanation: 'Helps your body respond better to its own insulin and reduces excess sugar released by your liver.',
          simpleExplanationUrdu: 'انسولین کے اثر کو بہتر بنا کر خون میں شوگر کا توازن برقرار رکھتی ہے۔ کھانے کے دوران لیں۔',
          clinicalContext: 'Biguanide antidiabetic. Crucial to take with meals to minimize stomach upset.',
          category: 'Metabolic & Glycemic'
        },
        {
          id: 'rx3',
          parameterName: 'Atorvastatin Calcium (Statin)',
          value: '20 mg',
          unit: 'Oral Tablet',
          referenceRangeText: '1 tablet once daily (Bedtime)',
          status: 'Normal',
          simpleExplanation: 'Blocks an enzyme in your liver that makes cholesterol, steadily bringing down LDL levels.',
          simpleExplanationUrdu: 'جگر میں غیر ضروری کولیسٹرول بننے سے روکتی ہے۔ رات سوتے وقت لیں۔',
          clinicalContext: 'HMG-CoA reductase inhibitor for cardiovascular primary prevention.',
          category: 'Lipid Management'
        },
        {
          id: 'rx4',
          parameterName: 'Coenzyme Q10 (CoQ10)',
          value: '100 mg',
          unit: 'Nutritional Softgel',
          referenceRangeText: '1 capsule daily with lunch',
          status: 'Normal',
          simpleExplanation: 'An over-the-counter cellular antioxidant often paired with statins to support muscle comfort.',
          simpleExplanationUrdu: 'طاقت بخش سپلیمنٹ جو پٹھوں کے درد اور توانائی کے لیے دیا جاتا ہے۔',
          clinicalContext: 'Dietary supplement adjunct.',
          category: 'Nutritional Support'
        }
      ],
      visualChartData: [
        { name: 'Lisinopril 10mg', value: 1, unit: 'dose', normalMin: 1, normalMax: 1, status: 'Normal', scorePercent: 100, dosageTime: 'Morning (08:00 AM)', category: 'BP' },
        { name: 'Metformin 500mg (AM)', value: 1, unit: 'dose', normalMin: 1, normalMax: 1, status: 'Normal', scorePercent: 100, dosageTime: 'Morning (Breakfast)', category: 'Sugar' },
        { name: 'CoQ10 100mg', value: 1, unit: 'dose', normalMin: 1, normalMax: 1, status: 'Normal', scorePercent: 100, dosageTime: 'Afternoon (Lunch)', category: 'Supplement' },
        { name: 'Metformin 500mg (PM)', value: 1, unit: 'dose', normalMin: 1, normalMax: 1, status: 'Normal', scorePercent: 100, dosageTime: 'Evening (Dinner)', category: 'Sugar' },
        { name: 'Atorvastatin 20mg', value: 1, unit: 'dose', normalMin: 1, normalMax: 1, status: 'Normal', scorePercent: 100, dosageTime: 'Bedtime (10:00 PM)', category: 'Lipids' }
      ],
      chartType: 'medication_schedule',
      medicationSchedule: [
        {
          medicationName: 'Lisinopril 10mg',
          dosage: '10 mg',
          frequency: 'Once daily',
          morning: true,
          afternoon: false,
          evening: false,
          bedtime: false,
          instructions: 'Take every morning around 8:00 AM with a glass of water.',
          purpose: 'Blood Pressure Control & Kidney Vessel Protection'
        },
        {
          medicationName: 'Metformin 500mg',
          dosage: '500 mg',
          frequency: 'Twice daily',
          morning: true,
          afternoon: false,
          evening: true,
          bedtime: false,
          instructions: 'Always take in the middle or immediately after breakfast and dinner to avoid stomach cramps.',
          purpose: 'Blood Sugar Regulation & Insulin Sensitivity'
        },
        {
          medicationName: 'CoQ10 Supplement 100mg',
          dosage: '100 mg',
          frequency: 'Once daily',
          morning: false,
          afternoon: true,
          evening: false,
          bedtime: false,
          instructions: 'Take with midday lunch.',
          purpose: 'Muscle Comfort & Cellular Antioxidant'
        },
        {
          medicationName: 'Atorvastatin 20mg',
          dosage: '20 mg',
          frequency: 'Once daily',
          morning: false,
          afternoon: false,
          evening: false,
          bedtime: true,
          instructions: 'Take at night before bed. Avoid drinking grapefruit juice.',
          purpose: 'Lowering LDL Bad Cholesterol & Plaque Stability'
        }
      ],
      questionsForDoctor: [
        {
          id: 'qrx1',
          question: 'Are there any specific side effects I should watch out for during my first two weeks on Lisinopril (such as a persistent dry cough)?',
          questionUrdu: 'لیزینوپرل شروع کرنے پر کن علامات (جیسے خشک کھانسی) کا خیال رکھنا ضروری ہے؟',
          reason: 'A mild dry cough can occasionally happen with ACE inhibitors; doctors can easily substitute with an ARB if needed.'
        },
        {
          id: 'qrx2',
          question: 'If I experience stomach tenderness with Metformin, should I take it halfway through my meal or ask for the extended-release (ER) version?',
          questionUrdu: 'اگر میٹفارمین سے پیٹ میں بوجھ محسوس ہو، تو کیا کھانے کے درمیان لینا چاہیے یا ایکسٹینڈڈ رلیز فارمولا بہتر ہوگا؟',
          reason: 'Extended-release Metformin is gentler on gastrointestinal tracts.'
        },
        {
          id: 'qrx3',
          question: 'Are there any common over-the-counter medicines (like pain relievers or cold medicines) that I should avoid while taking these?',
          questionUrdu: 'کیا درد کش ادویات (جیسے بروفن) کا ان ادویات کے ساتھ استعمال محفوظ ہے یا پرہیز چاہیے؟',
          reason: 'NSAIDs like Ibuprofen can diminish blood pressure control and interact with kidney blood flow.'
        },
        {
          id: 'qrx4',
          question: 'When should I schedule my first follow-up blood test to check my potassium, kidney function, and cholesterol levels on this regimen?',
          questionUrdu: 'دوا شروع کرنے کے کتنے ہفتے بعد گردوں اور کولیسٹرول کا فالو اپ ٹیسٹ کروانا چاہیے؟',
          reason: 'Standard clinical guidelines suggest checking serum creatinine and electrolytes within 4-8 weeks of starting an ACE inhibitor.'
        }
      ],
      nextStepsAndLifestyle: [
        'Establish a Routine Pill Schedule: Keep your medication organizer near your breakfast table and nightstand to prevent missed doses.',
        'Grapefruit Caution: Avoid large amounts of grapefruit or grapefruit juice, as it can interfere with how your liver processes Atorvastatin.',
        'Avoid Sudden Standing: In the first week of Lisinopril, stand up gradually from sitting or lying down to prevent mild lightheadedness.',
        'Carry a Medication List: Keep a card with your exact medication names and dosages in your wallet or on your phone.'
      ],
      nextStepsAndLifestyleUrdu: [
        'دوائیوں کے اوقات مقرر کریں: صبح اور رات کی گولیاں وقت پر کھانے کی عادت بنائیں۔',
        'چکوترا (Grapefruit) سے پرہیز کریں، کیونکہ یہ ایٹورواسٹیٹن کے عمل پر اثر انداز ہو سکتا ہے۔',
        'بیٹھنے یا لیٹنے سے اچانک تیزی سے نہ اٹھیں تاکہ چکر نہ آئے۔',
        'اپنے تمام نسخوں اور دوائیوں کی ایک لسٹ اپنے موبائل یا بٹوعے میں محفوظ رکھیں۔'
      ],
      urgentAttentionRequired: false,
      disclaimer: 'For informational and educational purposes only. Not a substitute for professional medical advice or diagnosis. Never stop, start, or alter any prescribed medication dosage without directly consulting your prescribing physician or pharmacist.',
      analyzedAt: 'Just now (Hackathon Live Demo)',
      sourceFileName: 'Cardiology_InternalMed_Rx_Prescription.png',
      fileType: 'image/svg+xml',
      filePreviewUrl: '/samples/sample-prescription.svg'
    }
  }
];
