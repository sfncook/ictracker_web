var sectors_fire = [
    "Interior", "Sector 1", "Alpha Sector", "Salvage", "",
    "Ventilation", "Sector 2", "Bravo Sector", "Overhaul", "",
    "Roof", "Sector 3", "Charlie Sector", "Evacuation", "",
    "On Deck", "Sector 4", "Delta Sector", "Customer Service", "ReHab",
    "Staging", "Sector 5", "", "", "",
    "", "Sector 6", "North Sector", "", "Medical",
    "IRIC", "Sector 7", "East Sector", "Lobby", "Triage",
    "RIC", "Sector 8", "South Sector", "Resource", "Treatment",
    "RESCUE", "Sector 9", "West Sector", "Accountability", "Transportation",
    "Safety", "Sector ####", "", "", "LZ"
];


var actions_fire = [
    {action_type: "Engine",
        actions: [
            "Supply",
            "Take a Line",
            "Search/Rescue",
            "Fire Attack",
            "IRIC",
            "Check Extension",
            "Protect Exposures",
            "Overhaul",
            "Deck Gun",
            "Portable Monitor",
            "Secondary Search"
        ],
        actions_warning: [
            "*Victim Found"
        ]
    },
    {action_type: "Ladder",
        actions: [
            "Secure Utilities",
            "Vert Ventilation",
            "2nd Hole",
            "Trench Cut",
            "Roof Profile",
            "Fan to the Door",
            "Pressurize Exposures",
            "Soften Building",
            "Open Building",
            "Open Rollup",
            "Salvage",
            "Position for Def. Ops",
            "Put Stick Up",
            "Elevated Master"
        ],
        actions_warning: []
    },
    {action_type: "Safety",
        actions: [
            "Agrees With Strategy",
            "360 recon"
        ],
        actions_warning: [
            "*Pool",
            "*Empty Pool",
            "*Powerlines",
            "*Powerlines Down",
            "*Bars on Windows",
            "*Dogs in Yard",
            "*Hoarders House",
            "*Basement",
            "*Flashover",
            "*Backdraft",
            "*Eminent Collapse",
            "*Collapse"
        ]},
    {action_type: "Rescue",
        actions: [
            "Grab RIC Bag",
            "Accountability Update",
            "Throw Ladders",
            "Monitor Ch. 16"
        ],
        actions_warning: []
    },
    {action_type: "Lines",
        actions: [
            "1-3/4",
            "2\"",
            "2-1/2",
            "3\"",
            "Piercing Nozzle",
            "Horizontal Standpipe",
            "Support Sprinklers",
            "Standpipe"
        ],
        actions_warning: []
    }
];
