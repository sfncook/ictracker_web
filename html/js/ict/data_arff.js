var sectors_arff = [
    "Interior", "Exterior", "Wing", "Tail Section", "",
    "Safety",   "ReHab",    "RESCUE"
];


var actions_arff = [
    {action_type: "Critical Fire Ground Factors",
        actions: [
            "Aircraft",
            "Fire",
            "Occupancy",
            "Life Hazard",
            "Arrangement",
            "Resources",
            "Action Effect",
            "Special"
        ],
        actions_warning: []
    },
    {action_type: "Rescue",
        actions: [
            "Egress Protection",
            "Primary Search"
        ],
        actions_warning: []
    },
    {action_type: "Fire Control",
        actions: [
            "Water/Foam Resources",
            "ARRF Truck Attack",
            "Interior",
            "Exterior",
            "Vent"
        ],
        actions_warning: []
    },
    {action_type: "Property / People",
        actions: [
            "Tx Location?",
            "Transportation?",
            "Evacuation Location"
        ],
        actions_warning: []
    },
    {action_type: "Firefighter Safety",
        actions: [
            "Rescue",
            "Acctability Locations",
            "Safety",
            "ReHab + Unit"
        ],
        actions_warning: []
    }
];
