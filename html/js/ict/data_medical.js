var sectors_medical = [
    "On Deck",      "North Sector",         "Evacuation",       "Triage",
    "Staging",      "East Sector",          "ReHab",            "Extrication",
    "RESCUE",       "South Sector",         "Lobby",            "Treatment",
    "Safety",       "West Sector",          "Resource",         "Transportation",
    "",             "",                     "Accountability",   "LZ",
    "Rescue Team",  "Back Up Rescue Team",  "Upstream Lookout", "Fire Control"
];


var actions_medical = [
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
