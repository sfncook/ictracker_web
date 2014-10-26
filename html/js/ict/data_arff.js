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
        actions_warning: [
            "*Aircraft"
        ]
    },
    {action_type: "Rescue",
        actions: [
            "Primary Search"
        ],
        actions_warning: [
            "*Egress Protection"
        ]
    },
    {action_type: "Fire Control",
        actions: [
            "Vent"
        ],
        actions_warning: [
            "Water/Foam Resources",
            "ARRF Truck Attack",
            "Interior",
            "Exterior"
        ]
    },
    {action_type: "Property / People",
        actions: [
            "Evacuation Location"
        ],
        actions_warning: [
            "Tx Location?",
            "Transportation?"
        ]
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
