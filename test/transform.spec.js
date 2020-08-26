const { transform, groupByProperty, wrapAvailabilities, hashToArray } = require("../transform")

test("it do the transform real good like", () => {
  const oldData = {
    users: {
      1: {
        name: "Amelia Bedelia",
      },
      2: {
        name: "Bob Barker",
      }
    },
    availabilities: [{
      date: "2020-09-01",
      startTime: 12,
      duration: 1,
      user_id: 1,
    },{
      date: "2020-09-01",
      startTime: 14,
      duration: 2,
      user_id: 1,
    },{
      date: "2020-09-03",
      startTime: 18,
      duration: 2,
      user_id: 2,
    }],
  }

  const newData = {
    users: [{
      id: 1,
      name: "Amelia Bedelia",
      days: {
        "2020-09-01": [{
          startTime: 12,
          duration: 1,
        },{
          startTime: 14,
          duration: 2,
        }],
      },
    },{
      id: 2,
      name: "Bob Barker",
      days: {
        "2020-09-03": [{
          startTime: 18,
          duration: 2,
        }],
      },
    }],
  }

  expect(transform(oldData)).toEqual(newData)
})

test("#groupByProperty #1", () => {
  const availabilities = [{
    date: "2020-09-01",
    startTime: 12,
    duration: 1,
    user_id: 1,
  },{
    date: "2020-09-01",
    startTime: 14,
    duration: 2,
    user_id: 1,
  },{
    date: "2020-09-03",
    startTime: 18,
    duration: 2,
    user_id: 2,
  }]

  const groupedAvailabilities = {
    1: [{
      date: "2020-09-01",
      startTime: 12,
      duration: 1,
    },{
      date: "2020-09-01",
      startTime: 14,
      duration: 2,
    }],
    2: [{
      date: "2020-09-03",
      startTime: 18,
      duration: 2,
    }]
  }

  expect(groupByProperty("user_id")(availabilities)).toEqual(groupedAvailabilities)
})

test("#groupByProperty #2", () => {
  const availabilities = [{
    date: "2020-09-01",
    startTime: 12,
    duration: 1,
  },{
    date: "2020-09-01",
    startTime: 14,
    duration: 2,
  },{
    date: "2020-09-03",
    startTime: 18,
    duration: 2,
  }]

  const groupedAvailabilities = {
    "2020-09-01": [{
      startTime: 12,
      duration: 1,
    },{
      startTime: 14,
      duration: 2,
    }],
    "2020-09-03": [{
      startTime: 18,
      duration: 2,
    }],
  }

  expect(groupByProperty("date")(availabilities)).toEqual(groupedAvailabilities)
})

test("#wrapAvailabilities", () => {
  const availabilities = {
    1: {
      "2020-09-01": [{
        startTime: 12,
        duration: 1,
      },{
        startTime: 14,
        duration: 2,
      }],
    },
    2: {
      "2020-09-03": [{
        startTime: 14,
        duration: 2,
      }],
    }
  }

  const wrappedAvailabilities = {
    1: {
      days: {
        "2020-09-01": [{
          startTime: 12,
          duration: 1,
        },{
          startTime: 14,
          duration: 2,
        }],
      },
    },
    2: {
      days: {
        "2020-09-03": [{
          startTime: 14,
          duration: 2,
        }],
      },
    },
  }

  expect(wrapAvailabilities(availabilities)).toEqual(wrappedAvailabilities)
})

test("#hashToArray", () => {
  const hash = {
    1: {
      name: "Amelia Bedelia",
      days: {
        "2020-09-01": [{
          startTime: 12,
          duration: 1,
        },{
          startTime: 14,
          duration: 2,
        }],
      },
    },
  }

  const array = [{
    name: "Amelia Bedelia",
    id: 1,
    days: {
      "2020-09-01": [{
        startTime: 12,
        duration: 1,
      },{
        startTime: 14,
        duration: 2,
      }],
    },
  }]

  expect(hashToArray(hash)).toEqual(array)
})
