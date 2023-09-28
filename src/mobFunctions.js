export const mobFunctions = {
  // roll atk
  // -----------------------------------------------------------
  rollDice: function (numDice, diceVal, rollMod) {
    let rollAtkResult = 0
    // const rollAtkMath = ''
    const rollArray = []
    for (let i = 0; i < numDice; ++i) {
      const roll = Math.floor(Math.random() * (diceVal - 1 + 1) + 1)
      // rollAtkMath += numDice > 1 ? roll + ' + ' : roll
      // rollAtkResult += roll
      rollArray.push(roll)
    }
    rollAtkResult = rollArray.reduce((p, c) => p + c, 0)

    if (rollMod) {
      rollAtkResult += rollMod
    }

    return rollAtkResult
  },

  // get roll dmg
  // -----------------------------------------------------------
  sumDmg: function (obj, numDmgs) {
    // let rollDmgMath = ''
    const rolls = []
    const dmgsSum = []
    const rollsMath = []
    // const rollsMathResult = ''
    for (let i = 0; i < numDmgs; i++) {
      const numDice = parseInt(obj[i].damage_dice.split('d')[0])
      const diceVal = parseInt(obj[i].damage_dice.split('d')[1].split('+')[0])
      const dmgMod = obj[i].damage_dice.split('d')[1].split('+')[1]
      rolls.push(this.eachDmg(numDice, diceVal, dmgMod))
    }

    // sum total dmg + mods
    for (let x = 0; x < numDmgs; x++) {
      dmgsSum.push(rolls[x][0])
      const dmgType = '(' + obj[x].damage_type.name.toLowerCase() + ':'

      // dmg math to array
      rollsMath.push(dmgType)
      rollsMath.push(rolls[x][1])
      rollsMath.push(')')
    }

    return [dmgsSum.reduce((p, c) => p + c, 0), rollsMath] //
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

    if (dmgMod) {
      dmgMod = parseInt(dmgMod)
      dmgArray.push(dmgMod)
    }

    rollDmgResult = dmgArray.reduce((p, c) => p + c, 0)
    return [rollDmgResult, dmgArray]
  }
}
