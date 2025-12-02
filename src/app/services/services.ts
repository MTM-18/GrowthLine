// src/app/data/services.ts
export type Service = {
    id: string;
    nameEn: string;
    nameAr: string;
    shortEn: string;
    shortAr: string;
    icon?: string;
    category?: string;
};

export const ServicesInfo: Service[] = [
    {
        id: "org-design",
        nameEn: "Organization design",
        nameAr: "تصميم الهيكل التنظيمي",
        shortEn: "Designing structures, roles, and reporting lines that support your strategy.",
        shortAr: "نبني لك هيكل وتنظيم واضح يدعم استراتيجية عملك."
    },
    {
        id: "process-improvement",
        nameEn: "Process optimization",
        nameAr: "تحسين العمليات",
        shortEn: "Streamlining key processes to reduce friction and increase speed.",
        shortAr: "نرتب إجراءاتك حتى تصير أسرع وأسهل وأوضح للفريق."
    },
    {
        id: "people-development",
        nameEn: "People & capability",
        nameAr: "تطوير الفريق والقدرات",
        shortEn: "Capability building programs, leadership development, and coaching.",
        shortAr: "برامج تدريب وتطوير للموظفين والقيادات حتى يكبر الفريق ويا المشروع."
    },
    {
        id: "go-to-market",
        nameEn: "Go-to-market & scaling",
        nameAr: "دخول السوق والتوسع",
        shortEn: "Helping you test, launch, and scale new offerings with confidence.",
        shortAr: "نساعدك تختبر، تطلق، وتوسّع خدماتك أو منتجاتك بشكل مدروس."
    },
];
