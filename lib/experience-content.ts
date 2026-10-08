export type Bilingual = readonly [string, string];

// Source: Plus Point's six service pages, read on 8 October 2026.
// Claims about certifications, guaranteed response times and conflicting metrics
// are intentionally not repeated until the business confirms them.
export const serviceStories = [
  {
    slug: "event-crew",
    image: "team.jpeg",
    bannerImage: "event-crew",
    bannerIntro: [
      "Event crew for load-in, venue preparation, live operations and load-out across Saudi Arabia and the UAE.",
      "طواقم لإدخال المعدات وتجهيز المواقع وتشغيل الفعاليات وإخراج المعدات في السعودية والإمارات.",
    ],
    headline: [
      "Event crew. Ready for the real work.",
      "طواقم الفعاليات. جاهزون للعمل الحقيقي.",
    ],
    intro: [
      "Trained, uniformed manpower for concerts, exhibitions, conferences and large-scale productions. From load-in to load-out, the right people keep your schedule moving.",
      "كوادر مدربة بزي موحد للحفلات والمعارض والمؤتمرات والإنتاجات الكبيرة. من إدخال المعدات إلى إخراجها، يحافظ الأشخاص المناسبون على سير جدولك.",
    ],
    body: [
      "Every deployment starts with your run-of-show. We discuss the roles, shifts and supervision needed for setup, show days and breakdown, so the crew brief reflects the schedule you actually have.",
      "يبدأ كل مشروع ببرنامج فعاليتك. نناقش الأدوار والورديات والإشراف المطلوب للتجهيز وأيام العرض والتفكيك، ليعكس ملخص الطاقم جدولك الفعلي.",
    ],
    capabilities: [
      ["Loading & unloading", "التحميل والتفريغ"],
      ["Venue setup & strike", "تجهيز الموقع وتفكيكه"],
      ["Seating deployment", "تركيب المقاعد"],
      ["Backstage support", "دعم الكواليس"],
      ["Event operations", "تشغيل الفعاليات"],
      ["Equipment movement", "نقل المعدات"],
    ],
    steps: [
      ["Define the requirement", "حدد المتطلبات"],
      ["Plan shifts & brief the crew", "خطط للورديات وجهز الطاقم"],
      ["Coordinate on-site execution", "نسق التنفيذ في الموقع"],
      ["Complete the load-out", "أكمل إخراج المعدات"],
    ],
    brief: [
      "Event format, venue, dates, crew roles, headcount and shift schedule.",
      "نوع الفعالية والموقع والمواعيد وأدوار الطاقم وعدده وجدول الورديات.",
    ],
  },
  {
    slug: "overlay-site-crew",
    bannerImage: "site-overlay",
    bannerIntro: [
      "Fencing, flooring, crowd barriers and signage. Practical crew support for the infrastructure behind your event.",
      "أسوار وأرضيات وحواجز وإرشادات. دعم عملي للبنية التحتية وراء فعاليتك.",
    ],
    image: "scaffolding.jpeg",
    headline: [
      "Empty ground. Event-ready space.",
      "من أرض فارغة. إلى موقع جاهز.",
    ],
    intro: [
      "Site overlay and skilled crew execution for the infrastructure behind a live event: fencing, flooring, barriers, wayfinding and branding across Saudi Arabia and the UAE.",
      "تجهيز المواقع وطواقم متخصصة للبنية التحتية خلف الفعاليات: الأسوار والأرضيات والحواجز والإرشادات والعلامات التجارية في السعودية والإمارات.",
    ],
    body: [
      "The infrastructure an audience rarely notices is what makes a venue work. Our site teams coordinate temporary environments and back-of-house facilities with organisers, production teams and venue leads, from first site inspection to the final walkthrough.",
      "البنية التحتية التي نادراً ما يلاحظها الجمهور هي ما يجعل الموقع يعمل. تنسق فرقنا المساحات المؤقتة ومرافق التشغيل مع المنظمين وفرق الإنتاج ومسؤولي الموقع، من المعاينة الأولى إلى الجولة النهائية.",
    ],
    capabilities: [
      ["Perimeter fencing", "الأسوار المحيطية"],
      ["Crowd-control barriers", "حواجز تنظيم الجمهور"],
      ["Flooring systems", "أنظمة الأرضيات"],
      ["Signage & wayfinding", "اللافتات والإرشادات"],
      ["Branded structures", "هياكل العلامة التجارية"],
      ["Back-of-house facilities", "مرافق التشغيل الخلفية"],
    ],
    steps: [
      ["Inspect the site", "عاين الموقع"],
      ["Plan layouts & logistics", "خطط للتوزيع والخدمات اللوجستية"],
      ["Install the infrastructure", "ركب البنية التحتية"],
      ["Walk through the finished venue", "راجع الموقع بعد التجهيز"],
    ],
    brief: [
      "Site layout, ground conditions, installation sequence, access, materials and venue requirements.",
      "توزيع الموقع وحالة الأرض وتسلسل التركيب والدخول والمواد ومتطلبات المكان.",
    ],
  },
  {
    slug: "stage-production-crew",
    bannerImage: "stage-production",
    bannerIntro: [
      "Stage builds, lighting, audio and technical support, coordinated around your production schedule.",
      "بناء المسارح والإضاءة والصوت والدعم التقني، بتنسيق يتوافق مع جدول إنتاجك.",
    ],
    image: "stage.jpeg",
    headline: [
      "Behind the stage. Ahead of the show.",
      "خلف المسرح. قبل بدء العرض.",
    ],
    intro: [
      "Hands-on stage and production support for concert stages, exhibition halls and corporate events. Bring the build, equipment and technical schedule together around your production lead.",
      "دعم عملي للمسارح والإنتاج في الحفلات وقاعات المعارض والفعاليات المؤسسية. ننسق التجهيز والمعدات والجدول التقني مع مسؤول الإنتاج.",
    ],
    body: [
      "From stage construction to the final lighting cue, production relies on a connected team. Discuss truss, lighting, LED screens, audio and assembly requirements with us, and agree the specialist roles and supervision before the build begins.",
      "من بناء المسرح إلى آخر إشارة إضاءة، يعتمد الإنتاج على فريق متكامل. ناقش معنا متطلبات الهياكل والإضاءة وشاشات LED والصوت والتركيب، واتفق على الأدوار المتخصصة والإشراف قبل بدء التجهيز.",
    ],
    capabilities: [
      ["Stage construction", "بناء المسارح"],
      ["Truss installation support", "دعم تركيب الهياكل"],
      ["Lighting systems", "أنظمة الإضاءة"],
      ["LED screens", "شاشات LED"],
      ["Audio support", "دعم الصوت"],
      ["Production assistance", "مساندة الإنتاج"],
    ],
    steps: [
      ["Review the production plan", "راجع خطة الإنتاج"],
      ["Prepare equipment & crew", "جهز المعدات والطاقم"],
      ["Coordinate stage installation", "نسق تركيب المسرح"],
      ["Support the live event", "ادعم الفعالية المباشرة"],
    ],
    brief: [
      "Technical drawings, riders, stage dimensions, equipment list, installation timings and production contacts.",
      "الرسومات الفنية والمتطلبات التقنية وأبعاد المسرح وقائمة المعدات ومواعيد التركيب وجهات اتصال الإنتاج.",
    ],
  },
  {
    slug: "tents-structure",
    bannerImage: "tents-structures",
    bannerIntro: [
      "Temporary structures, VIP tents and exhibition spaces, prepared around your venue and programme.",
      "منشآت مؤقتة وخيام كبار الشخصيات ومساحات للمعارض، وفق موقعك وبرنامجك.",
    ],
    image: "scaffolding.jpeg",
    headline: [
      "Temporary structures. Lasting impressions.",
      "هياكل مؤقتة. أثر يدوم.",
    ],
    intro: [
      "Tent and temporary structure support for receptions, exhibitions, festivals and corporate gatherings. Plan the space around your venue, audience and programme.",
      "دعم الخيام والهياكل المؤقتة لحفلات الاستقبال والمعارض والمهرجانات والتجمعات المؤسسية. خطط للمساحة وفق موقعك وجمهورك وبرنامجك.",
    ],
    body: [
      "From VIP spaces to large outdoor venues, temporary structures need a clear installation plan. Define the structure type, layout, ground conditions, anchoring responsibilities and final inspection arrangements with the team before mobilisation.",
      "من مساحات كبار الشخصيات إلى المواقع الخارجية الكبيرة، تحتاج الهياكل المؤقتة إلى خطة تركيب واضحة. حدد نوع الهيكل والتوزيع وحالة الأرض ومسؤوليات التثبيت وترتيبات الفحص النهائي مع الفريق قبل التحرك.",
    ],
    capabilities: [
      ["Temporary event structures", "هياكل الفعاليات المؤقتة"],
      ["VIP tents", "خيام كبار الشخصيات"],
      ["Exhibition structures", "هياكل المعارض"],
      ["Festival installations", "تجهيزات المهرجانات"],
      ["Corporate event spaces", "مساحات الفعاليات المؤسسية"],
      ["Outdoor venues", "المواقع الخارجية"],
    ],
    steps: [
      ["Discuss the structure brief", "ناقش متطلبات الهيكل"],
      ["Plan the site & layout", "خطط للموقع والتوزيع"],
      ["Coordinate the installation", "نسق التركيب"],
      ["Inspect before handover", "افحص قبل التسليم"],
    ],
    brief: [
      "Structure type, dimensions, site conditions, flooring, access and build / dismantling dates.",
      "نوع الهيكل وأبعاده وظروف الموقع والأرضيات والدخول ومواعيد التركيب والتفكيك.",
    ],
  },
  {
    slug: "scaffolder",
    bannerImage: "scaffolding",
    bannerIntro: [
      "Skilled scaffold crew for event structures, working platforms and temporary access in Saudi Arabia and the UAE.",
      "طواقم سقالات ماهرة لهياكل الفعاليات ومنصات العمل والوصول المؤقت في السعودية والإمارات.",
    ],
    image: "scaffolding.jpeg",
    headline: [
      "A sound structure. A stronger build.",
      "هيكل متين. وتجهيز أقوى.",
    ],
    intro: [
      "Skilled scaffolding manpower for events, construction projects, temporary structures and industrial sites in Saudi Arabia and the UAE.",
      "كوادر ماهرة للسقالات في الفعاليات ومشاريع البناء والهياكل المؤقتة والمواقع الصناعية في السعودية والإمارات.",
    ],
    body: [
      "Our scaffold crews support installation, dismantling, modification and maintenance according to the project specifications and site procedures. Clarify the design, supervision, access requirements and inspection responsibilities before deployment.",
      "تدعم طواقم السقالات التركيب والتفكيك والتعديل والصيانة وفق مواصفات المشروع وإجراءات الموقع. وضح التصميم والإشراف ومتطلبات الدخول ومسؤوليات الفحص قبل بدء العمل.",
    ],
    capabilities: [
      ["Event & concert scaffolding", "سقالات الفعاليات والحفلات"],
      ["Temporary access systems", "أنظمة الوصول المؤقتة"],
      ["Working platforms", "منصات العمل"],
      ["Stage support structures", "هياكل دعم المسارح"],
      ["Modification & maintenance", "التعديل والصيانة"],
      ["Dismantling support", "دعم التفكيك"],
    ],
    steps: [
      ["Assess the working area", "قيم منطقة العمل"],
      ["Agree the scaffold plan", "اتفق على خطة السقالات"],
      ["Install under site supervision", "ركب تحت إشراف الموقع"],
      ["Inspect & hand over", "افحص وسلم"],
    ],
    brief: [
      "Approved design, loading requirements, working heights, access arrangements and the site's inspection process.",
      "التصميم المعتمد ومتطلبات الأحمال وارتفاعات العمل وترتيبات الدخول وإجراءات الفحص في الموقع.",
    ],
  },
  {
    slug: "expert-carpenter",
    bannerImage: "carpentry",
    bannerIntro: [
      "Exhibition stands, stage carpentry and custom timber structures, built around your drawings and deadlines.",
      "أجنحة معارض ونجارة مسارح وهياكل خشبية مخصصة، وفق رسوماتك ومواعيدك.",
    ],
    image: "stage.jpeg",
    headline: [
      "Built to your brief. Finished with care.",
      "نبني وفق رؤيتك. وننجز بعناية.",
    ],
    intro: [
      "Event carpentry for exhibition booths, stage platforms, custom wooden structures and on-site finishing. Practical craftsmanship shaped around your drawings and deadlines.",
      "نجارة الفعاليات لأجنحة المعارض ومنصات المسارح والهياكل الخشبية المخصصة والتشطيب في الموقع. حرفة عملية وفق رسوماتك ومواعيدك.",
    ],
    body: [
      "Live events demand exact specifications and careful finishing. Our carpenter crews support fabrication, fit-out and assembly, working around venue constraints, material requirements and the installation programme.",
      "تتطلب الفعاليات مواصفات دقيقة وتشطيباً متقناً. تدعم طواقم النجارة التصنيع والتجهيز والتركيب وفق قيود الموقع ومتطلبات المواد وبرنامج التنفيذ.",
    ],
    capabilities: [
      ["Exhibition booth fabrication", "تصنيع أجنحة المعارض"],
      ["Stage carpentry", "نجارة المسارح"],
      ["Custom wooden structures", "هياكل خشبية مخصصة"],
      ["Modular displays", "وحدات العرض"],
      ["Event fit-out", "تجهيز الفعاليات"],
      ["Installation & finishing", "التركيب والتشطيب"],
    ],
    steps: [
      ["Review drawings & scope", "راجع الرسومات والنطاق"],
      ["Prepare the materials", "جهز المواد"],
      ["Fabricate & install", "صنع وركب"],
      ["Check the finish & hand over", "راجع التشطيب وسلم"],
    ],
    brief: [
      "Drawings, dimensions, materials, finish requirements, venue access and installation deadlines.",
      "الرسومات والأبعاد والمواد ومتطلبات التشطيب ودخول الموقع ومواعيد التركيب.",
    ],
  },
] as const;

export const workProjects = [
  {
    slug: "global-music-festival-dubai",
    title: ["Global Music Festival Dubai", "مهرجان الموسيقى العالمي في دبي"],
    category: "festival",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1600",
    copy: [
      "Site overlay and stage construction for a large-scale music festival.",
      "تجهيز الموقع وبناء المسرح لمهرجان موسيقي كبير.",
    ],
    roles: ["Site overlay / Stage crew", "تجهيز الموقع / طاقم المسرح"],
  },
  {
    slug: "enterprise-tech-summit",
    title: ["Enterprise Tech Summit", "قمة تقنية المؤسسات"],
    category: "corporate",
    image: "/images/concept-event.jpg",
    copy: [
      "Coordinated site and production support for a corporate conference environment.",
      "دعم منسق للموقع والإنتاج في بيئة مؤتمر مؤسسي.",
    ],
    roles: ["Production / Event crew", "الإنتاج / طاقم الفعاليات"],
  },
  {
    slug: "stadium-concert-setup",
    title: ["Stadium Concert Setup", "تجهيز حفل في استاد"],
    category: "concert",
    image: "/images/stage.jpeg",
    copy: [
      "Scaffolding and rigging manpower for an international stadium production.",
      "كوادر للسقالات والتعليق لإنتاج عالمي في استاد.",
    ],
    roles: ["Scaffolding / Stage support", "السقالات / دعم المسرح"],
  },
  {
    slug: "desert-racing-championship",
    title: ["Desert Racing Championship", "بطولة سباقات الصحراء"],
    category: "festival",
    image: "/images/scaffolding.jpeg",
    copy: [
      "VIP tent structures and grandstand seating across an outdoor sporting site.",
      "هياكل خيام كبار الشخصيات ومقاعد المدرجات في موقع رياضي خارجي.",
    ],
    roles: [
      "Structures / Seating / Site crew",
      "الهياكل / المقاعد / طاقم الموقع",
    ],
  },
  {
    slug: "luxury-brand-launch",
    title: ["Luxury Brand Launch", "إطلاق علامة فاخرة"],
    category: "corporate",
    image: "/images/concept-event.jpg",
    copy: [
      "Careful setup and finishing for a high-end fashion brand presentation.",
      "تجهيز وتشطيب دقيق لعرض علامة أزياء راقية.",
    ],
    roles: ["Carpentry / Production crew", "النجارة / طاقم الإنتاج"],
  },
  {
    slug: "nye-mega-concert",
    title: ["NYE Mega Concert", "حفل ليلة رأس السنة"],
    category: "concert",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1600",
    copy: [
      "Coordinated shift work for a large New Year's Eve production.",
      "ورديات منسقة لإنتاج كبير في ليلة رأس السنة.",
    ],
    roles: [
      "Event crew / Stage & production",
      "طاقم الفعاليات / المسرح والإنتاج",
    ],
  },
] as const;

export const journey = [
  {
    year: "2012",
    title: ["The first call.", "البداية."],
    copy: [
      "Founded in Saudi Arabia with a focus on professional event crew, manpower and production support.",
      "تأسست في المملكة العربية السعودية للتركيز على طواقم الفعاليات والكوادر المهنية ودعم الإنتاج.",
    ],
  },
  {
    year: "2015",
    title: ["A wider stage.", "مساحة أوسع."],
    copy: [
      "Operations expanded across Riyadh, Jeddah and Dammam, supporting events and projects around the Kingdom.",
      "توسعت العمليات في الرياض وجدة والدمام، لدعم الفعاليات والمشاريع في أنحاء المملكة.",
    ],
  },
  {
    year: "2018",
    title: ["Across the Gulf.", "عبر الخليج."],
    copy: [
      "Dubai and Abu Dhabi became part of the story as operations extended into the United Arab Emirates.",
      "أصبحت دبي وأبوظبي جزءاً من القصة مع امتداد العمليات إلى الإمارات العربية المتحدة.",
    ],
  },
  {
    year: "2021",
    title: ["Built on experience.", "خبرة متراكمة."],
    copy: [
      "The work grew across exhibitions, concerts and corporate events, with more people and disciplines behind each production.",
      "نما العمل في المعارض والحفلات والفعاليات المؤسسية، مع مزيد من الأشخاص والتخصصات خلف كل إنتاج.",
    ],
  },
  {
    year: "2024",
    title: ["The next chapter.", "الفصل التالي."],
    copy: [
      "Continued regional operations, built around dependable crew support and lasting working relationships.",
      "عمليات إقليمية مستمرة، مبنية على دعم موثوق للطواقم وعلاقات عمل طويلة الأمد.",
    ],
  },
] as const;

export const companyValues = [
  [
    "Integrity",
    "النزاهة",
    "Clear communication and honest working relationships.",
    "تواصل واضح وعلاقات عمل صادقة.",
  ],
  [
    "Safety",
    "السلامة",
    "Care for the people on site, at every event phase.",
    "الاهتمام بالأشخاص في الموقع في كل مرحلة.",
  ],
  [
    "Professionalism",
    "الاحترافية",
    "Prepared people who understand the standards of your production.",
    "أشخاص مستعدون يفهمون معايير إنتاجك.",
  ],
  [
    "Reliability",
    "الموثوقية",
    "Defined roles, agreed schedules and coordinated delivery.",
    "أدوار محددة وجداول متفق عليها وتنفيذ منسق.",
  ],
  [
    "Teamwork",
    "العمل الجماعي",
    "A crew that works with your team, not around it.",
    "طاقم يعمل مع فريقك بتكامل.",
  ],
  [
    "Excellence",
    "الإتقان",
    "Attention to detail, learning and continuous improvement.",
    "الاهتمام بالتفاصيل والتعلم والتحسين المستمر.",
  ],
] as const;

export const team = [
  ["Amir Saleem", "أمير سليم", "Managing Director", "المدير العام"],
  ["M. Nadeem", "م. نديم", "Operations Manager", "مدير العمليات"],
  ["Sohail Ahmed", "سهيل أحمد", "Operations Specialist", "أخصائي العمليات"],
  ["M. Arshad", "م. أرشد", "Site Lead", "مسؤول الموقع"],
  ["M. Zain", "م. زين", "Technical Supervisor", "المشرف الفني"],
  ["M. Naeem", "م. نعيم", "Safety Officer", "مسؤول السلامة"],
  ["Zain Anwar", "زين أنور", "Project Coordinator", "منسق المشاريع"],
  ["Talal SDQ", "طلال صديق", "Logistics Manager", "مدير الخدمات اللوجستية"],
  ["Waqar Ahmed", "وقار أحمد", "Crew Lead", "قائد الطاقم"],
  ["Ali Luqman", "علي لقمان", "Site Operations", "عمليات الموقع"],
] as const;
