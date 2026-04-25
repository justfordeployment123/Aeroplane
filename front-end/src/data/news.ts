const BASE = "https://www.htsdfp.com";

export interface NewsArticle {
    id: string;
    title: string;
    date: string;
    summary: string;
    img: string;
    category: "update" | "award" | "event" | "partnership";
}

export const newsArticles: NewsArticle[] = [
    {
        id: "1",
        title: "Jiangsu Provincial Party Secretary Xin Changxing Visits Company for Investigation",
        date: "07 Aug 2024",
        summary: "Provincial Party Secretary visited Aerospace Times Feipeng for investigation and guidance on low-altitude economy development.",
        img: `${BASE}/UploadFiles/2024-08-07/wacqaymnkj3yhc3e.jpg`,
        category: "event",
    },
    {
        id: "2",
        title: "Company Invited for People's Daily Interview on Low-Altitude Economy",
        date: "31 Jul 2024",
        summary: "Participated in a People's Daily forum discussing low-altitude economy development paths, legal frameworks, and airspace management.",
        img: `${BASE}/UploadFiles/2024-08-07/jtaegmgfaef2dd4u.jpg`,
        category: "event",
    },
    {
        id: "3",
        title: "Company Signs Overseas Cooperation Agreement During State Visit",
        date: "30 Jul 2024",
        summary: "Signed bilateral business cooperation agreements during Timor-Leste President's state visit to China.",
        img: `${BASE}/UploadFiles/2024-08-07/5cgdxhkvp11zft9f.jpg`,
        category: "partnership",
    },
    {
        id: "4",
        title: "Selected for Provincial Engineering Research Center Project",
        date: "24 Jul 2024",
        summary: "Company's unmanned transport aircraft system engineering research center selected as Jiangsu provincial engineering research center.",
        img: `${BASE}/UploadFiles/2024-08-07/lffjspyzejwqzdkj.png`,
        category: "award",
    },
    {
        id: "5",
        title: "Suzhou Low-Altitude Economy UAV Industry Innovation Consortium Established",
        date: "14 Jul 2024",
        summary: "Suzhou low-altitude economy (UAV) industry quality innovation consortium officially established.",
        img: `${BASE}/UploadFiles/2024-08-07/2wdfkw8wybdxwzsx.png`,
        category: "event",
    },
    {
        id: "6",
        title: "Suzhou Municipal Party Secretary Liu Xiaotao Visits Company",
        date: "18 Jun 2024",
        summary: "Visited to learn about industrial park development and low-altitude economy application scenarios.",
        img: `${BASE}/UploadFiles/2024-06-18/vi9nylm28zk9lxzv.png`,
        category: "event",
    },
    {
        id: "7",
        title: "Multiple UAV Systems Showcased at National Safety Production Month",
        date: "03 Jun 2024",
        summary: "Four UAV models exhibited at the 2024 National Safety Production Month launch ceremony in Chongqing.",
        img: `${BASE}/UploadFiles/2024-06-18/9rtfunrm46u1mwda.jpg`,
        category: "event",
    },
    {
        id: "8",
        title: "China National Investment Group Leadership Visits Company",
        date: "02 Jun 2024",
        summary: "China National Investment Group leadership visited the company headquarters in Kunshan.",
        img: `${BASE}/UploadFiles/2024-06-18/vsuxigwchvujy2df.jpg`,
        category: "event",
    },
    {
        id: "9",
        title: "Selected as First-Choice Supplier in China Post UAV Procurement",
        date: "30 May 2024",
        summary: "Company listed as first transaction candidate in China Post's 2024 UAV equipment procurement resource pool.",
        img: `${BASE}/UploadFiles/2024-06-18/8jmvywad3dsnrfez.jpg`,
        category: "award",
    },
    {
        id: "10",
        title: "Company Showcases at 2024 Yangtze Delta Emergency & Rescue Expo",
        date: "16 May 2024",
        summary: "Showcased UAV capabilities at the Third Yangtze River Delta International Emergency and Rescue Expo.",
        img: `${BASE}/UploadFiles/2024-05-16/chue38rvi9ijgdhd.jpg`,
        category: "event",
    },
    {
        id: "11",
        title: "School-Enterprise Partnership for Low-Altitude Economy Talent Development",
        date: "13 May 2024",
        summary: "Signed cooperation agreement with Kunshan Open University for low-altitude economy talent development.",
        img: `${BASE}/UploadFiles/2024-05-15/byeqbjr6xhkn2hyp.jpg`,
        category: "partnership",
    },
    {
        id: "12",
        title: "FP-981C Firefighting UAV Participates in National Flood Prevention Exercise",
        date: "11 May 2024",
        summary: "FP-981C-II firefighting rescue UAV participated in national flood prevention and typhoon exercise.",
        img: `${BASE}/UploadFiles/2024-05-15/13nbxk4k6vkdhpue.png`,
        category: "event",
    },
    {
        id: "13",
        title: "FP-98 Completes First Cross-Sea Logistics Transport After TC Certification",
        date: "24 Apr 2024",
        summary: "FP-98 large UAV completed historic first cross-sea logistics transport mission after obtaining Type Certificate.",
        img: `${BASE}/UploadFiles/2024-04-26/l5fcymfsl6zlrbuv.jpeg`,
        category: "update",
    },
    {
        id: "14",
        title: "FP-98 UAV Receives Type Certificate — Opening New Era of Low-Altitude Economy",
        date: "18 Apr 2024",
        summary: "FP-98 received Type Certificate (TC0085A-HD), the first large fixed-wing UAV to complete full airworthiness certification.",
        img: `${BASE}/UploadFiles/2024-04-18/krdxzxtnsirmpups.jpg`,
        category: "award",
    },
    {
        id: "15",
        title: "FP-981C Sagittarius Wins 2024 Red Dot Design Award",
        date: "03 Apr 2024",
        summary: "FP-981C Sagittarius composite-wing UAV won the prestigious 2024 Red Dot Award for Product Design.",
        img: `${BASE}/UploadFiles/2024-04-07/dvcstpkyaknnard8.png`,
        category: "award",
    },
    {
        id: "16",
        title: "FP-981AX Ship-Borne Tethered UAV Completes Sea Trials",
        date: "23 Mar 2024",
        summary: "FP-981AX ship-borne tethered UAV completed sea trials in level-6 wind conditions.",
        img: `${BASE}/UploadFiles/2024-03-28/5unsjbbaflfz1lwr.jpg`,
        category: "update",
    },
    {
        id: "17",
        title: "UAV Systems Complete Extreme Cold Testing in Heilongjiang",
        date: "16 Mar 2024",
        summary: "FP-981CS and FP-981CH UAV systems tested in extreme cold conditions with satellite communications.",
        img: `${BASE}/UploadFiles/2024-03-28/pjipdkhytr29xhav.jpg`,
        category: "update",
    },
    {
        id: "18",
        title: "Company Participates in Beijing-Saudi Arabia Low-Altitude Economy Dialogue",
        date: "25 Feb 2024",
        summary: "Participated in Beijing-Saudi Arabia low-altitude economy roundtable dialogue.",
        img: `${BASE}/UploadFiles/2024-03-04/gsky75ebuuc4kiy3.png`,
        category: "partnership",
    },
    {
        id: "19",
        title: "Products Featured in Jane's Defence Weekly at Singapore Airshow",
        date: "24 Feb 2024",
        summary: "Jane's Defence Weekly covered the company's products at the Singapore Airshow 2024.",
        img: `${BASE}/UploadFiles/2024-03-04/rzesujb7ur4d3q8q.png`,
        category: "event",
    },
    {
        id: "20",
        title: "Company Shines at Singapore Airshow 2024",
        date: "21 Feb 2024",
        summary: "Appeared at Singapore Airshow, one of the world's three largest airshows, with 1000+ exhibitors from 50+ countries.",
        img: `${BASE}/UploadFiles/2024-02-28/tddx2hnyz9ekwejt.jpg`,
        category: "event",
    },
];

export const mediaHighlights = [
    {
        date: "20 Feb 2024",
        source: "Singapore 8world",
        title: "Chinese unmanned drone firm may establish local training centre",
        img: `${BASE}/UploadFiles/2024-02-28/nbapzzat5tfavyn7.png`,
    },
    {
        date: "21 Dec 2023",
        source: "Malaysia National News",
        title: "Feipeng products attract extensive attention in Malaysia",
        img: `${BASE}/UploadFiles/2024-02-28/3bnbezsx2t18ybqc.jpg`,
    },
    {
        date: "28 Nov 2023",
        source: "Jiangsu Broadcasting",
        title: "Strategic emerging industries 'taking flight' with forward momentum",
        img: `${BASE}/UploadFiles/2024-02-28/fzw2vgb9xgvg9pxp.jpg`,
    },
    {
        date: "21 Oct 2023",
        source: "CCTV Finance",
        title: "Experience 'linked' Kunshan, explore high-tech zone 'super factory'",
        img: `${BASE}/UploadFiles/2024-02-28/av7htdsazzsehtrv.jpg`,
    },
    {
        date: "21 Jun 2023",
        source: "CCTV News",
        title: "Large unmanned aircraft FH-98 completes first domestic night flight",
        img: `${BASE}/UploadFiles/2024-02-28/bz9pcuusfdk5yvbs.jpg`,
    },
];
