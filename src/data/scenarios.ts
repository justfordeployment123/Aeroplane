const BASE = "https://www.htsdfp.com";

export interface ScenarioDetail {
    title: string;
    description: string;
    img: string;
}

export interface Scenario {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    accent: string;
    heroImg: string;
    details: ScenarioDetail[];
}

export const scenarios: Scenario[] = [
    {
        id: "civil-logistics",
        title: "Civil Logistics",
        subtitle: "Intelligent Three-Dimensional Transportation",
        description:
            "Provides systematic solutions for typical operation scenarios such as trunk logistics, branch logistics and terminal logistics. Innovate the mode of UAV transportation and build an intelligent three-dimensional transportation industry system.",
        accent: "#00d2ff",
        heroImg: `${BASE}/UploadFiles/2024-02-22/fd75icbsdmhsnket.png`,
        details: [
            {
                title: "Trunk Logistics",
                description:
                    "The application of UAV trunk logistics scenario is mainly for the needs of long-distance and large-load cargo transportation, including national central city and regional central node transportation, plateau mountains, jungle islands and other geographically limited environments, and the transportation of goods with high time requirements.",
                img: `${BASE}/UploadFiles/2024-02-22/fd75icbsdmhsnket.png`,
            },
            {
                title: "Branch Logistics",
                description:
                    "The UAV branch logistics scenario is based on the node transportation demand between medium load and regional center. The corresponding fleet of large feeder unmanned transport aircraft and medium unmanned transport aircraft series are established, building an unmanned digital intelligent three-dimensional transportation system supported by transport service network, low altitude support network and ground airport network.",
                img: `${BASE}/UploadFiles/2024-02-22/n3jbvkywjwr5iml8.png`,
            },
            {
                title: "Terminal Logistics",
                description:
                    "The UAV terminal logistics scenario uses short-range, lightweight, small UAS to carry out 'last kilometer' delivery of goods in urban or rural areas. Applications include express delivery, food and beverage takeout, medical supplies transportation, special goods distribution, and agricultural products distribution. This improves distribution efficiency, reduces cost, and shortens waiting time.",
                img: `${BASE}/UploadFiles/2024-02-22/k9ymzwusmtwjwkvg.png`,
            },
        ],
    },
    {
        id: "emergency-rescue",
        title: "Emergency Rescue",
        subtitle: "Intelligent Three-Dimensional Rescue System",
        description:
            "Innovate the UAV emergency rescue mode. Build an intelligent three-dimensional rescue system. Provide systematic solutions for different disaster scenarios.",
        accent: "#ef4444",
        heroImg: `${BASE}/UploadFiles/2024-05-15/mcip4tjmlsmh5jjm.png`,
        details: [
            {
                title: "Emergency Communication",
                description:
                    "UAVs teamed with base stations and satellite communication to build low-altitude emergency communication support during network and power failures, ensuring critical connectivity in disaster zones.",
                img: `${BASE}/UploadFiles/2024-05-15/gi5mlb4wwevypfaf.png`,
            },
            {
                title: "Disaster Reconnaissance",
                description:
                    "High-resolution camera equipped UAVs for large-scale shooting and multi-angle image data collection of affected areas, providing real-time situational awareness to command centers.",
                img: `${BASE}/UploadFiles/2024-10-30/wbzztjlt9wxg1ij9.png`,
            },
            {
                title: "Three-Dimensional Modeling",
                description:
                    "Real-time data transmission capabilities combined with photoelectric pods to establish 3D disaster models for comprehensive situational awareness and rescue planning.",
                img: `${BASE}/UploadFiles/2024-05-15/ynsz8lwva4nrr8km.png`,
            },
            {
                title: "Personnel Search & Rescue",
                description:
                    "High-resolution cameras and thermal imaging to locate trapped persons, even in nighttime or complex environments, significantly improving rescue response times.",
                img: `${BASE}/UploadFiles/2024-05-15/alyaexdbgfqztrsm.png`,
            },
            {
                title: "Emergency Delivery",
                description:
                    "'Far-medium-near' UAV system for timely delivery of fire fighting equipment, medicine, food, and medical supplies to disaster-affected areas.",
                img: `${BASE}/UploadFiles/2024-10-10/uy3adzpqmmfq4pp9.png`,
            },
            {
                title: "Medical Assistance",
                description:
                    "UAV medical transport for emergency rescue and remote area medical distribution with contactless delivery, ensuring rapid response for critical medical needs.",
                img: `${BASE}/UploadFiles/2024-02-22/6tgtcixvm1ng8vja.png`,
            },
            {
                title: "Fire Fighting",
                description:
                    "Multi-rotor UAVs equipped with fire-fighting bombs for disaster patrol and delivery in urban environments, providing rapid fire response capabilities.",
                img: `${BASE}/UploadFiles/2024-02-22/hlhwcgssrg8dgbgd.jpg`,
            },
        ],
    },
    {
        id: "industry-service",
        title: "Industry Service",
        subtitle: "Complete Operational System",
        description:
            "A complete operational system for flight carrying. Provide customers with services such as operation, testing, and carrying of various models. Established complete flight carrying capabilities including aircraft platforms, flight test fields, ground testing, and airborne support systems.",
        accent: "#f59e0b",
        heroImg: `${BASE}/UploadFiles/2023-10-16/vqhhidxflkbugbff.png`,
        details: [
            {
                title: "Mapping & Imaging",
                description:
                    "Using various types of UAV systems in the field of mapping mountains and hills. Long-endurance UAVs carry tilt cameras for low altitude close-in shooting, quickly building regional three-dimensional maps.",
                img: `${BASE}/UploadFiles/2023-10-16/vqhhidxflkbugbff.png`,
            },
            {
                title: "Meteorological Sounding",
                description:
                    "The UAV platform equipped with laser wind radar, cloud radar, airline meteorological instruments, and other devices to carry out measurement of humidity, temperature, air pressure, wind speed, wind direction and meteorological factors, providing first-hand information for weather observation and disaster prevention.",
                img: `${BASE}/UploadFiles/2023-10-16/dpere4iaa5bz56tm.png`,
            },
            {
                title: "Test Loading",
                description:
                    "Provides flight tests for dynamic accuracy measurement equipment, optical remote sensing and telemetry equipment, radar imaging equipment, meteorological instrument equipment, air delivery equipment, airborne data link system and reliability evaluation test.",
                img: `${BASE}/UploadFiles/2024-05-15/eygmesxzh3jk27yw.png`,
            },
            {
                title: "Resource Exploration",
                description:
                    "The FP-981CH UAV equipped with intelligent sensing obstacle avoidance equipment, magnetic probe and gravimeter, carrying out low-speed imitation flight for underground mineral exploration.",
                img: `${BASE}/UploadFiles/2024-05-15/magycjhpavjveary.png`,
            },
        ],
    },
];

export const getScenarioById = (id: string) => scenarios.find((s) => s.id === id);
