const statisticsСonvertFunc = (obj) => {
  return {
    id: obj._id,
    howOffen: obj.howOffen,
    knew: obj.knew,
    didntKnow: obj.didntKnow,
  }
}

module.exports = statisticsСonvertFunc
