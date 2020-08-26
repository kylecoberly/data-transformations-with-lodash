const { groupBy, omit, mapValues, map, flow, merge } = require("lodash/fp")
const mapWithKey = map.convert({ cap: false })

function transform({ users, availabilities }){
  const transformedUsers = flow([
    groupByProperty("user_id"),
    mapValues(groupByProperty("date")),
    wrapAvailabilities,
    merge(users),
    hashToArray,
  ])(availabilities)

  return { users: transformedUsers }
}


function groupByProperty(property){
  return data => {
    const groupByProperty = groupBy(property)
    const omitProperty = omit(property)
    const omitAllProperties = map(omitProperty)

    return flow([
      groupByProperty,
      mapValues(omitAllProperties),
    ])(data)
  }
}

function wrapAvailabilities(availabilities){
  return mapValues(days => ({ days }))(availabilities)
}

function hashToArray(hash){
  return mapWithKey((value, id) => ({
    ...value,
    id: +id,
  }))(hash)
}

module.exports = {
  transform,
  groupByProperty,
  wrapAvailabilities,
  hashToArray,
}
