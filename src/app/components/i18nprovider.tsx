// src/app/components/i18nprovider.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "ar";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nCtx = createContext<Ctx>({
  locale: "en",
  setLocale: () => { },
  t: (k) => k,
});

// Central dictionary for app strings
const dict: Record<string, { en: string; ar: string }> = {
  // navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.providers": { en: "Experts", ar: "الخبراء" },
  "nav.contact": { en: "Contact", ar: "تواصل معنا" },
  "nav.services": { en: "Services", ar: "الخدمات" },

  // home / hero
  "home.hero.badge": {
    en: "Business growth & operating systems",
    ar: "تطوير الأعمال وأنظمة التشغيل",
  },
  "home.hero.title": {
    en: "We build competitive organizations and redefine business management in Iraq.",
    ar: "نبني مؤسسات قادرة على المنافسة… ونُعيد تعريف إدارة الأعمال في العراق.",
  },
  "home.hero.subtitle": {
    en: "Since founding Growth Line, we’ve helped traditional businesses in Iraq modernize their operations, build management systems, improve sales, and adopt modern ways of working.",
    ar: "منذ تأسيس خط النمو – Growth Line عملنا على تطوير أعمال الشركات التقليدية في العراق عبر بناء الأنظمة الإدارية، هيكلة العمليات، تطوير المبيعات، وتطبيق أنظمة العمل الحديثة.",
  },
  "home.hero.bullet": {
    en: "We help our clients increase efficiency, profitability, and their ability to scale in a changing market.",
    ar: "نساعد عملاءنا على رفع الكفاءة، زيادة الربحية، وتعزيز القدرة على التوسع في أسواق متغيرة.",
  },
  "home.hero.cta.primary": {
    en: "Book a free consultation",
    ar: "احجز استشارة مجانية",
  },
  "home.hero.cta.secondary": {
    en: "Discover our services",
    ar: "تعرّف على خدماتنا",
  },

  // home / metrics
  "home.metrics.title": {
    en: "Impact in the Iraqi market",
    ar: "أثرنا في السوق العراقي",
  },
  "home.metrics.subtitle": {
    en: "Operational, financial, and human capital results delivered with our clients.",
    ar: "نتائج تشغيلية ومالية وبشرية حققناها مع عملائنا.",
  },
  "home.metrics.1.value": { en: "$30M+", ar: "+30 مليون دولار" },
  "home.metrics.1.label": {
    en: "Value of projects and flows managed and improved",
    ar: "قيمة العمليات والمسارات التي قمنا بإدارتها وتحسينها لصالح العملاء.",
  },
  "home.metrics.2.value": { en: "40+", ar: "+40" },
  "home.metrics.2.label": {
    en: "Projects across trade, services, retail, light industry, and beauty",
    ar: "مشاريع متنوعة في قطاعات التجارة، الخدمات، التجزئة، الصناعات الخفيفة، والتجميل.",
  },
  "home.metrics.3.value": { en: "500+", ar: "+500" },
  "home.metrics.3.label": {
    en: "Employees and trainees developed",
    ar: "موظف ومتدرب تم تطوير قدراتهم ضمن برامجنا التنفيذية.",
  },
  "home.metrics.4.value": { en: "15,000+", ar: "+15,000" },
  "home.metrics.4.label": {
    en: "Job interviews conducted in HR and hiring programs",
    ar: "مقابلة عمل ضمن برامج التوظيف والموارد البشرية.",
  },
  "home.metrics.5.value": { en: "120+", ar: "+120" },
  "home.metrics.5.label": {
    en: "Work systems designed and implemented (admin, finance, operations, sales, POS)",
    ar: "نظام عمل تم تصميمه وتطبيقه (إدارية – مالية – تشغيلية – مبيعات – POS).",
  },
  "home.metrics.6.value": { en: "92%", ar: "92%" },
  "home.metrics.6.label": {
    en: "Client satisfaction in last annual survey",
    ar: "نسبة رضا 92% من العملاء خلال آخر قياس سنوي.",
  },

  // home / services
  "home.services.title": {
    en: "Our services",
    ar: "الخدمات التي نقدمها",
  },
  "home.services.subtitle": {
    en: "Consulting and execution across operations, sales, digital, and investment.",
    ar: "استشارات وتنفيذ في التشغيل، المبيعات، التحول الرقمي، والخدمات الاستثمارية.",
  },
  "home.services.1.title": {
    en: "Operating model & management systems",
    ar: "تطوير البنية الإدارية والتشغيلية",
  },
  "home.services.1.body": {
    en: "We design and build complete operating systems including org structure, policies and procedures, performance management, process optimization, and operational dashboards — turning daily chaos into a structured, data-driven operation.",
    ar: "نصمم ونبني أنظمة تشغيل شاملة تشمل الهيكل التنظيمي، السياسات والإجراءات، إدارة الأداء، تحسين العمليات، وتصميم لوحات التحكم التشغيلية، لنحوّل الإدارة اليومية الفوضوية إلى تشغيل منظم قائم على البيانات.",
  },
  "home.services.2.title": {
    en: "Sales development & marketing experience",
    ar: "تطوير المبيعات وإدارة التجربة التسويقية",
  },
  "home.services.2.body": {
    en: "We build effective sales engines by structuring sales teams, mapping the customer journey, developing marketing strategies, improving digital campaigns, and increasing conversion rates and revenues.",
    ar: "نبني منظومات بيع فعّالة عبر هيكلة فرق المبيعات، بناء مسار العميل، تطوير الاستراتيجيات التسويقية، تحسين الإعلانات الرقمية، ورفع نسب التحويل والإيرادات.",
  },
  "home.services.3.title": {
    en: "POS systems & digital transformation",
    ar: "أنظمة نقاط البيع (POS) والتحول الرقمي",
  },
  "home.services.3.body": {
    en: "We implement integrated digital solutions including POS, branch connectivity, accounting and inventory systems, team training, and data analysis tied to decision-making dashboards.",
    ar: "نقدم حلولاً رقمية متكاملة تشمل أنظمة نقاط البيع، ربط الفروع، أنظمة المحاسبة والمخزون، تدريب الفرق على التشغيل، وتحليل البيانات وربطها بالتقارير لاتخاذ قرارات أسرع وأكثر شفافية.",
  },
  "home.services.4.title": {
    en: "Project Management as a Service (PMaaS)",
    ar: "إدارة المشاريع بالنيابة (PMaaS)",
  },
  "home.services.4.body": {
    en: "We manage projects end-to-end on behalf of the company: planning, execution, monitoring, closure, risk management, and weekly/monthly performance dashboards — ensuring delivery on time and within budget.",
    ar: "نقدم خدمة إدارة المشاريع بالكامل نيابة عن الشركة، من التخطيط إلى التنفيذ والمراقبة والإغلاق، مع إدارة المخاطر وإعداد لوحات أداء أسبوعية وشهرية لضمان إنجاز المشاريع بجودة عالية وفي الوقت والميزانية المحددة.",
  },
  "home.services.5.title": {
    en: "Market research & field studies",
    ar: "دراسات السوق والبحث الميداني",
  },
  "home.services.5.body": {
    en: "We help companies make decisions based on real data: market and competitor analysis, market share measurement, field interviews, and customer experience studies.",
    ar: "نساعد الشركات على اتخاذ قرارات مبنية على بيانات واقعية عبر تحليل السوق والمنافسين، قياس الحصة السوقية، إجراء المقابلات الميدانية، ودراسة تجربة العميل.",
  },
  "home.services.6.title": {
    en: "Investment services",
    ar: "الخدمات الاستثمارية",
  },
  "home.services.6.body": {
    en: "We provide project valuation and feasibility studies, investor matching and fundraising support, and turnkey business creation and launch services tailored to the Iraqi market.",
    ar: "نوفر خدمات تقييم المشاريع ودراسات الجدوى، ربط المشاريع بالمستثمرين والتمويل، وتأسيس المشاريع من الصفر بإطلاق تشغيلي كامل ملائم للسوق العراقي.",
  },

  // home / providers teaser
  "home.providers.section.title": {
    en: "Our provider network",
    ar: "شبكة مزودي الخدمات",
  },
  "home.providers.section.body": {
    en: "Growth Line works with a curated network of trusted providers in technology, marketing, HR, and operations.",
    ar: "تعمل جروث لاين مع شبكة مختارة من مزودي الخدمات الموثوقين في مجالات التقنية، التسويق، الموارد البشرية، والتشغيل.",
  },
  "home.providers.section.cta": {
    en: "View all providers",
    ar: "عرض جميع المزودين",
  },

  // home / programs & experts
  "home.program.sme.title": {
    en: "SME Empowerment Program",
    ar: "برنامج تمكين المشاريع الصغيرة والمتوسطة",
  },
  "home.program.sme.body": {
    en: "A focused program for SMEs that diagnoses the current operating model, analyzes competition and sales, refines the business model, trains sales and customer service teams, and builds 6–12 month growth plans with execution monitoring.",
    ar: "برنامج متخصص لدعم الشركات الصغيرة والمتوسطة عبر تشخيص الوضع الإداري والتشغيلي، تحليل المنافسة والمبيعات، تطوير نموذج العمل، تدريب فرق المبيعات وخدمة العملاء، وبناء خطط نمو لمدة 6–12 شهر مع مراقبة التنفيذ وتحسين الأداء.",
  },
  "home.experts.title": {
    en: "Our experts",
    ar: "شبكة الخبراء",
  },
  "home.experts.body": {
    en: "Growth Line’s expert network includes consultants in management, operations, HR, marketing, and sales — combining strategic thinking with hands-on execution experience.",
    ar: "تضم شبكة الخبراء في خط النمو مستشارين في الإدارة، التشغيل، الموارد البشرية، التسويق، والمبيعات، يجمعون بين التفكير الاستراتيجي والخبرة التنفيذية العملية.",
  },

  // home / newsletter
  "home.newsletter.title": {
    en: "Join our business leaders circle",
    ar: "انضم إلى مجتمع قادة الأعمال في العراق",
  },
  "home.newsletter.body": {
    en: "Receive reports, case studies, and leadership insights directly in your inbox.",
    ar: "احصل على تقارير، دراسات حالة، وأفكار قيادية تصلك مباشرة إلى بريدك.",
  },
  "home.newsletter.placeholder": {
    en: "Your email address",
    ar: "البريد الإلكتروني",
  },
  "home.newsletter.cta": {
    en: "Subscribe",
    ar: "اشترك الآن",
  },

  // home / certification
  "home.cert.title": {
    en: "Certificate verification",
    ar: "التحقق من الشهادات",
  },
  "home.cert.body": {
    en: "Enter the certificate number to verify training and program completion issued by Growth Line.",
    ar: "أدخل رقم الشهادة للتحقق من صحة الشهادات والبرامج الصادرة عن خط النمو.",
  },
  "home.cert.placeholder": {
    en: "Certificate number",
    ar: "رقم الشهادة",
  },
  "home.cert.cta": {
    en: "Verify",
    ar: "تحقّق",
  },

  // home / final contact CTA
  "home.contact.title": {
    en: "Ready to transform your organization?",
    ar: "جاهز لتطوير مؤسستك؟",
  },
  "home.contact.body": {
    en: "Share your goals and challenges, and we’ll propose practical, data-driven next steps within the Iraqi market context.",
    ar: "شاركنا أهدافك وتحدياتك، وسنقترح خطوات عملية قائمة على البيانات ومناسبة لواقع السوق العراقي.",
  },
  "home.contact.cta": {
    en: "Talk to our team",
    ar: "تواصل مع فريقنا",
  },

  // providers index
  "providers.title": {
    en: "Our Experts",
    ar: "خبراؤنا",
  },
  "providers.subtitle": {
    en: "Explore our trusted network of experts and partners.",
    ar: "تعرّف على شبكة الخبراء والخبراء الذين نعمل معهم.",
  },

  // provider details
  "provider.sendEnquiry": {
    en: "Send an enquiry",
    ar: "أرسل استفسارًا",
  },
  // services page
  "services.badge": {
    en: "Our services",
    ar: "خدماتنا",
  },
  "services.title": {
    en: "What we help you build",
    ar: "بماذا نساعدك على البناء والتطوير؟",
  },
  "services.subtitle": {
    en: "From strategy to execution, we connect you with the right tools, experts, and programs to accelerate your growth.",
    ar: "من الاستراتيجية إلى التنفيذ، نربطك بالأدوات والخبراء والبرامج المناسبة لتسريع نمو عملك.",
  },
  "services.chip": {
    en: "Ideal for growing teams & SMEs",
    ar: "مناسب للفرق المتنامية والمشاريع الصغيرة والمتوسطة",
  },

  // footer
  "footer.about": {
    en: "Growth Line is an Iraqi firm specializing in business development and modern operating systems to help organizations compete locally and regionally.",
    ar: "خط النمو هي شركة عراقية متخصصة في تطوير الأعمال وبناء أنظمة تشغيل حديثة لتمكين الشركات من المنافسة محليًا وإقليميًا.",
  },
  "footer.contact": {
    en: "Contact",
    ar: "تواصل",
  },
  "footer.follow": {
    en: "Follow us",
    ar: "تابعنا",
  },
  "footer.instagram": {
    en: "Instagram",
    ar: "إنستغرام",
  },
  "footer.linkedin": {
    en: "LinkedIn",
    ar: "لينكدإن",
  },
  "footer.rights": {
    en: "All rights reserved.",
    ar: "جميع الحقوق محفوظة.",
  },

  // contact & forms
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.form.title": { en: "Send an enquiry", ar: "أرسل استفسارًا" },

  "form.name": { en: "Your name", ar: "اسمك" },
  "form.email": { en: "Your email", ar: "بريدك الإلكتروني" },
  "form.phone": { en: "Phone (optional)", ar: "الهاتف (اختياري)" },
  "form.company": { en: "Company (optional)", ar: "الشركة (اختياري)" },
  "form.subject": { en: "Subject (optional)", ar: "الموضوع (اختياري)" },
  "form.date": {
    en: "Preferred date (optional)",
    ar: "التاريخ المفضل (اختياري)",
  },
  "form.message": { en: "Your message", ar: "رسالتك" },

  "form.name.placeholder": { en: "Name", ar: "الاسم" },
  "form.email.placeholder": {
    en: "name@example.com",
    ar: "name@example.com",
  },
  "form.phone.placeholder": { en: "+964 …", ar: "+964 …" },
  "form.subject.placeholder": {
    en: "Partnership / Consultation / Hiring…",
    ar: "شراكة / استشارة / توظيف…",
  },
  "form.message.placeholder": {
    en: "Tell us briefly what you need",
    ar: "أخبرنا باختصار ما تحتاجه",
  },

  "form.submit": { en: "Send", ar: "إرسال" },
  "form.sending": { en: "Sending…", ar: "جاري الإرسال…" },
  "form.success.title": { en: "Enquiry sent ✅", ar: "تم إرسال الاستفسار ✅" },
  "form.success.body": {
    en: "Thanks! We’ve received your message and will get back to you shortly.",
    ar: "شكرًا لك! استلمنا رسالتك وسنعاود التواصل قريبًا.",
  },
  "form.goHome": { en: "Back to home", ar: "العودة للرئيسية" },
  "form.close": { en: "Close", ar: "إغلاق" },
  "form.error.generic": {
    en: "Something went wrong.",
    ar: "حدث خطأ ما.",
  },
  // home / clients
  "clients.heading.kicker": {
    en: "Our clients",
    ar: "عملاؤنا",
  },
  "clients.heading.title": {
    en: "Partners shaping our impact in the Iraqi market",
    ar: "شركاؤنا الذين يشكلون أثرنا في السوق العراقي",
  },
  "clients.heading.body": {
    en: "From hospitals and medical centers to restaurants and exhibitions, these partners trust Growth Line to turn strategy into measurable operational results.",
    ar: "من المستشفيات والمراكز الطبية إلى المطاعم والمعارض، هذه الجهات اعتمدت على خط النمو لتحويل الاستراتيجيات إلى نتائج تشغيلية واضحة.",
  },
  "clients.heading.live": {
    en: "Live in the Iraqi market",
    ar: "نشط في السوق العراقي",
  },
  "clients.filter.label": {
    en: "Filter by sector",
    ar: "تصفية حسب القطاع",
  },
  "clients.filter.showing": {
    en: "Showing",
    ar: "عدد العملاء",
  },
  "clients.filter.empty": {
    en: "No clients in this category yet.",
    ar: "لا يوجد عملاء في هذا القسم حالياً.",
  },
  "clients.caption": {
    en: "Full client portfolio is available upon request.",
    ar: "القائمة الكاملة بالعملاء متاحة عند الطلب.",
  },
  "clients.noLogo": {
    en: "No logo",
    ar: "لا يوجد شعار",
  },

  "clients.category.all": {
    en: "All sectors",
    ar: "كل القطاعات",
  },
  "clients.category.healthcare": {
    en: "Healthcare",
    ar: "الرعاية الصحية",
  },
  "clients.category.retail": {
    en: "Food & Retail",
    ar: "المطاعم والتجزئة",
  },
  "clients.category.beauty": {
    en: "Beauty & Wellness",
    ar: "الجمال والعناية",
  },
  "clients.category.exhibition": {
    en: "Exhibitions & Halls",
    ar: "المعارض والقاعات",
  },

};

type I18nProviderProps = {
  children: React.ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>("en");

  // load preferred language on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("lang");
    if (stored === "en" || stored === "ar") {
      setLocale(stored);
    } else if (window.navigator?.language?.startsWith("ar")) {
      setLocale("ar");
    }
  }, []);

  // sync <html> attributes
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute(
      "dir",
      locale === "ar" ? "rtl" : "ltr"
    );
    window.localStorage.setItem("lang", locale);
  }, [locale]);

  const t = (key: string) => dict[key]?.[locale] ?? dict[key]?.en ?? key;
  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale]
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
