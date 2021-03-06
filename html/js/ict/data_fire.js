var sectors_fire = [
    "Interior",     "Sector 1",     "Alpha Sector",     "Salvage",          "Triage",
    "Ventilation",  "Sector 2",     "Bravo Sector",     "Overhaul",         "Extrication",
    "Roof",         "Sector 3",     "Charlie Sector",   "Evacuation",       "Treatment",
    "On Deck",      "Sector 4",     "Delta Sector",     "Customer Service", "Transportation",
    "Staging",      "Sector 5",     "",                 "",                 "",
    "",             "Sector 6",     "North Sector",     "ReHab",            "LZ",
    "IRIC",         "Sector 7",     "East Sector",      "Lobby",            "",
    "RIC",          "Sector 8",     "South Sector",     "Resource",         "",
    "RESCUE",       "Sector 9",     "West Sector",      "Accountability",   "",
    "Safety",       "Sector ####",  "",                 "",                 ""
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
            "*Victim Found",
            "*Firefighter Located"
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
            "Forcible Entry",
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
