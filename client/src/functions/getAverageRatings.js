const getAverageRatings = (p) => {
  if (p && p.ratings && p.ratings.length) {
    let ratingsArray = p.ratings
    let total = []
    let noOfUsers = ratingsArray.length

    ratingsArray.map((r) => total.push(r.star))
    let totalSumOfRatings = total.reduce((prev, next) => next + prev, 0)

    let avgRating = totalSumOfRatings / noOfUsers

    return [avgRating, noOfUsers]
  } else {
    return [0, 0]
  }
}
export default getAverageRatings
