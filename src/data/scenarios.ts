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
        title: "Civil Logistic",
        subtitle: "Intelligent Three-Dimensional Transportation",
        description:
            "Provides systematic solutions for typical operation scenarios such as trunk logistics, branch logistics and terminal logistics. Innovate the mode of UAVs transportation. Build an intelligent three-dimensional transportation industry system. Provides systematic solutions for typical operation scenarios such as mountain logistics, island transportation, and urban distribution.",
        accent: "#00d2ff",
        heroImg: "/images/scenarios/civil-logistics/hero.png",
        details: [
            {
                title: "Trunk Logistics",
                description:
                    "The application of UAVs trunk logistics scenario is mainly for the needs of long-distance and large-load cargo transportation, and the specific applications include: national central city and regional central node transportation, plateau mountain, jungle island and other geographical environment is limited, and the transportation of goods with high transportation time requirements.",
                img: "/images/scenarios/civil-logistics/hero.png",
            },
            {
                title: "Branch Logistics",
                description:
                    "The UAVs branch logistics scenario is based on the node transportation demand between medium load and regional center, aiming at the level of trunk-branch unmanned transport network, the corresponding fleet of large feeder unmanned transport aircraft series and medium unmanned transport aircraft series are established, and the unmanned digital intelligent three-dimensional transportation system supported by transport service network, low altitude support network and ground airport network is developed.",
                img: "/images/scenarios/civil-logistics/branch.png",
            },
            {
                title: "Terminal Logistics",
                description:
                    "The UAV's terminal logistics scenario uses a short-range, lightweight, small UAS to carry out 'last kilometer' delivery of goods in urban or rural areas. Specific applications include: express delivery, food and beverage takeout, medical supplies transportation, special goods distribution, agricultural products distribution, etc. The application of UAVs terminal distribution scenario can improve the distribution efficiency, reduce the cost, shorten the waiting time, meet the individual needs of consumers, and has broad application prospects.",
                img: "/images/scenarios/civil-logistics/terminal.png",
            },
        ],
    },
    {
        id: "emergency-rescue",
        title: "Emergency Rescue",
        subtitle: "Intelligent Three-Dimensional Rescue System",
        description:
            "Innovate the UAVs emergency rescue mode. Build an intelligent three-dimensional rescue system. Provide systematic solutions for typical disaster scenarios such as earthquake disaster areas, landslides, and forest fires, etc.",
        accent: "#ef4444",
        heroImg: "/images/scenarios/emergency-rescue/hero.png",
        details: [
            {
                title: "Emergency Communication",
                description:
                    "The teaming UAVs (base station + SATCOM) and the charge shelter can build a low-altitude emergency communication support system in the field of emergency communication support in the disaster area, provide dynamic emergency communication support under the condition of network interruption, circuit interruption and power failure, and effectively improve the comprehensive support capability of emergency rescue.",
                img: "/images/scenarios/emergency-rescue/communication.png",
            },
            {
                title: "Disaster Reconnaissance",
                description:
                    "The UAVs is equipped with a high-resolution camera, which can carry out high-altitude large-scale shooting under the disaster reconnaissance scene and collect multi-angle image data of the affected area or buildings.",
                img: "/images/scenarios/emergency-rescue/reconnaissance.png",
            },
            {
                title: "Three-Dimensional Modeling",
                description:
                    "The UAVs's high-altitude monitoring, data acquisition and analysis capabilities, combined with high-precision photoelectric pods and three-dimensional modeling equipment, are used to transmit data in the disaster area in real time, establish three-dimensional models of the disaster area, complete regional situational awareness, help emergency rescue departments grasp first-hand information, visually interpret the details of the disaster area, and provide information support for the follow-up disaster relief work.",
                img: "/images/scenarios/emergency-rescue/modeling.png",
            },
            {
                title: "Personnel Search And Rescue",
                description:
                    "The high-resolution camera and thermal imager on the UAVs can capture the heat and image information of the trapped person, even at night or in complex environments, can clearly show the specific location of the trapped person.",
                img: "/images/scenarios/emergency-rescue/search.png",
            },
            {
                title: "Emergency Delivery",
                description:
                    "The 'far-medium-near' UAVs emergency support system built by the company can deliver fire fighting equipment, medicine, food, medical equipment, first aid kits and other emergency materials to the designated place in a timely and accurate manner.",
                img: "/images/scenarios/emergency-rescue/delivery.png",
            },
            {
                title: "Medical Assistance",
                description:
                    "UAVs medical transport services provide solutions for emergency rescue, medical distribution in remote areas and other scenarios, using UAVs to quickly and efficiently transport medical supplies to their destinations. UAVs can take off in a short time, flexibly plan routes, adapt to complex environments, and deliver without contact, reducing the risk of human contact.",
                img: "/images/scenarios/emergency-rescue/medical.png",
            },
            {
                title: "Fire Fighting",
                description:
                    "The small multi-rotor UAVs is equipped with fire-fighting bombs and aiming devices, builds a fixed-point fire-fighting system, quickly arrives at the target area, and performs tasks such as disaster patrol and fire-fighting bomb delivery in complex urban environments.",
                img: "/images/scenarios/emergency-rescue/firefighting.jpg",
            },
        ],
    },
    {
        id: "industry-service",
        title: "Industry Service",
        subtitle: "Complete Operational System",
        description:
            "A complete operational system for flight carrying. Provide customers with services such as operation, testing, and carrying of various models. Feipeng has established complete flight carrying capabilities such as aircraft platforms, flight test fields, ground testing and debugging, ground telemetry systems, airborne electrical and mechanical support systems, etc. Can providing customers with various types of aircraft operation, testing, and carrying services.",
        accent: "#f59e0b",
        heroImg: "/images/scenarios/industry-service/hero.png",
        details: [
            {
                title: "Mapping Imaging",
                description:
                    "The use of various types of unmanned aerial vehicle systems of Feipeng in the field of mapping mountains and hills, with the help of long-endurance unmanned aerial vehicles can carry tilt cameras, low altitude close-in shooting, quickly build regional three-dimensional maps.",
                img: "/images/scenarios/industry-service/hero.png",
            },
            {
                title: "Meteorological Sounding",
                description:
                    "The UAV platform can choose to be equipped with laser wind radar, cloud radar, airline meteorological instruments, flame bomb, flame bar and other devices to carry out unmanned aerial vehicle measurement of humidity, temperature, air pressure, wind speed, wind direction and meteorological factors, providing first-hand information for important weather processes and weather and climate regional observation, emergency support and meteorological disaster prevention and relief.",
                img: "/images/scenarios/industry-service/meteorological.png",
            },
            {
                title: "Test Loading",
                description:
                    "It provides flight tests such as dynamic accuracy measurement equipment, optical remote sensing and telemetry equipment, radar imaging equipment, meteorological instrument equipment, air delivery equipment, airborne data link system and reliability evaluation test.",
                img: "/images/scenarios/industry-service/test-loading.png",
            },
            {
                title: "Resource Exploration",
                description:
                    "The FP-981CH UAVs is equipped with intelligent sensing obstacle avoidance equipment, magnetic probe and gravimeter, which can carry out low-speed imitation flight and carry out underground mineral exploration.",
                img: "/images/scenarios/industry-service/resource.png",
            },
        ],
    },
    {
        id: "forest-fire-prevention",
        title: "Forest & Grassland Fire Prevention",
        subtitle: "Complete Fire Prevention System",
        description:
            "A complete operational system for forest and grassland fire prevention, providing customers with patrol, monitoring, and reconnaissance services across multiple scenarios. Feipeng has established complete forest fire prevention capabilities including long-endurance aircraft patrol, high-precision fire monitoring, ground command dispatch, and emergency communication systems.",
        accent: "#22c55e",
        heroImg: "/images/scenarios/forest-fire-prevention/hero.png",
        details: [
            {
                title: "Forest Patrol",
                description:
                    "FP-98 UAV equipped with HD electro-optical pods patrols forests and grasslands, using visible light and infrared detection to capture vegetation growth, fire hazards, and terrain information in real-time, providing accurate aerial perspectives for forest patrol, fire early warning, and ecological monitoring.",
                img: "/images/scenarios/forest-fire-prevention/hero.png",
            },
            {
                title: "Fire Monitoring",
                description:
                    "FP-98 UAV with electro-optical pods cruises forest areas, infrared precisely captures hidden fire points and high-temperature hazards, visible light real-time confirms fire locations and spread patterns, with synchronized thermal imaging, coordinates and data transmission for all-weather high-precision aerial fire warning support.",
                img: "/images/scenarios/forest-fire-prevention/hero.png",
            },
            {
                title: "Fire Scene Reconnaissance",
                description:
                    "FP-98 UAV over fire areas, equipped with electro-optical pods penetrating smoke, infrared precisely locks fire points and high-temperature zones, visible light captures fire spread paths in real-time, synchronized thermal imaging, coordinates and live footage transmission providing precise aerial support for fire reconnaissance, situational assessment and rescue deployment.",
                img: "/images/scenarios/forest-fire-prevention/hero.png",
            },
            {
                title: "Emergency Communications",
                description:
                    "FP-98 UAV equipped with emergency communication systems, supporting satellite communication and BeiDou positioning navigation, can rapidly establish aerial communication relays, providing stable communication and precision navigation support for emergency rescue operations.",
                img: "/images/scenarios/forest-fire-prevention/hero.png",
            },
        ],
    },
];

export const getScenarioById = (id: string) => scenarios.find((s) => s.id === id);
