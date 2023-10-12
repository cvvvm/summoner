export const mobFunctions = {
  // roll atk
  // -----------------------------------------------------------
  rollDice: function (numDice, diceVal, rollMod) {
    const hitResult = []
    const hitMath = []

    hitMath.push('(')
    for (let i = 0; i < numDice; ++i) {
      const roll = Math.floor(Math.random() * (diceVal - 1 + 1) + 1)
      hitResult.push(roll)
      hitMath.push(roll)
    }
    hitMath.push(')')

    // add mod if value
    if (rollMod > 0) hitResult.push(rollMod)
    if (rollMod > 0) hitMath.push(rollMod)

    // format math string
    const hitMathStr = hitMath
      .toString()
      .replace(/\),/gm, ') + ')
      .replace(/\(,/gm, '(')
      .replace(/,\)/gm, ')')
      .replace(/,/gm, ' + ')

    return [hitResult.reduce((p, c) => p + c, 0), hitMathStr]
  },

  // get roll dmg
  // -----------------------------------------------------------
  sumDmg: function (diceArray, numDmgs, dmgMod) {
    const rolls = []
    const dmgResult = []
    const dmgMath = []

    for (let i = 0; i < numDmgs; i++) {
      const numDice = parseInt(diceArray[i].split('d')[0])
      const diceVal = parseInt(diceArray[i].split('d')[1].split('+')[0])
      rolls.push(this.eachDmg(numDice, diceVal))
    }
    // sum total dmg + mods
    for (let x = 0; x < numDmgs; x++) {
      dmgResult.push(rolls[x][0])

      // dmg math to array
      dmgMath.push('(')
      dmgMath.push(rolls[x][1])
      dmgMath.push(')')
    }

    // add mod if value
    if (dmgMod > 0) dmgResult.push(dmgMod)
    if (dmgMod > 0) dmgMath.push(dmgMod)

    // format math string
    const dmgMathStr = dmgMath
      .toString()
      .replace(/\),/gm, ') + ')
      .replace(/\(,/gm, '(')
      .replace(/,\)/gm, ')')
      .replace(/,/gm, '+')

    return [dmgResult.reduce((p, c) => p + c, 0), dmgMathStr] //
  },

  // roll for each dmg
  // -----------------------------------------------------------
  eachDmg: function (numDice, diceVal, dmgMod, dmgType) {
    let rollDmgResult = 0
    const dmgArray = []
    // loop for number of dice in roll
    for (let i = 0; i < numDice; ++i) {
      const roll = Math.floor(Math.random() * (diceVal - 1 + 1) + 1)
      dmgArray.push(roll)
    }

    rollDmgResult = dmgArray.reduce((p, c) => p + c, 0)
    return [rollDmgResult, dmgArray]
  }
}
