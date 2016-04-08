
module.exports.taskDice = {
  resultTypes: [
    'success',
    'advantage',
    'triumph',
    'failure',
    'threat',
    'despair',
    'light',
    'dark'
  ],
  dieTypes: [
    'boost',
    'ability',
    'proficiency',
    'setback',
    'difficulty',
    'challenge',
    'force'
  ],
  dieResults: {
    boost: [ // d6
      {},                           // 1
      {},                           // 2
      { success: 1 },               // 3
      { success: 1, advantage: 1 }, // 4
      { advantage: 2 },             // 5
      { advantage: 1 }              // 6
    ],
    ability: [ // d8
      {},                           // 1
      { success: 1 },               // 2
      { success: 1 },               // 3
      { success: 2 },               // 4
      { advantage: 1 },             // 5
      { advantage: 1 },             // 6
      { success: 1, advantage: 1 }, // 7
      { advantage: 2 }              // 8
    ],
    proficiency: [ // d12
      {},                           // 1
      { success: 1 },               // 2
      { success: 1 },               // 3
      { success: 2 },               // 4
      { success: 2 },               // 5
      { advantage: 1 },             // 6
      { success: 1, advantage: 1 }, // 7
      { success: 1, advantage: 1 }, // 8
      { success: 1, advantage: 1 }, // 9
      { advantage: 2 },             // 10
      { advantage: 2 },             // 11
      { triumph: 1 },               // 12
    ],
    setback: [ // d6
      {},             // 1
      {},             // 2
      { failure: 1 }, // 3
      { failure: 1 }, // 4
      { threat: 1 },  // 5
      { threat: 1 }   // 6
    ],
    difficulty: [ // d8
      {},                       // 1
      { failure: 1 },           // 2
      { failure: 2 },           // 3
      { threat: 1 },            // 4
      { threat: 1 },            // 5
      { threat: 1 },            // 6
      { threat: 2 },            // 7
      { failure: 1, threat: 1 } // 8
    ],
    challenge: [ // d12
      {},                        // 1
      { failure: 1 },            // 2
      { failure: 1 },            // 3
      { failure: 2 },            // 4
      { failure: 2 },            // 5
      { threat: 1 },             // 6
      { threat: 1 },             // 7
      { failure: 1, threat: 1 }, // 8
      { failure: 1, threat: 1 }, // 9
      { threat: 2 },             // 10
      { threat: 2 },             // 11
      { despair: 1 }             // 12
    ],
    force: [ // d12
      { dark: 1 },  // 1
      { dark: 1 },  // 2
      { dark: 1 },  // 3
      { dark: 1 },  // 4
      { dark: 1 },  // 5
      { dark: 1 },  // 6
      { dark: 2 },  // 7
      { light: 1 }, // 8
      { light: 1 }, // 9
      { light: 2 }, // 10
      { light: 2 }, // 11
      { light: 2 }, // 12
    ]
  }
};
