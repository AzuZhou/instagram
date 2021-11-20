const getDays = (seconds) => Math.floor(seconds / 86400)

const getHours = (seconds) => Math.floor(seconds / 3600) % 24

export { getDays, getHours }
