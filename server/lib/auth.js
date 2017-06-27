function handleError (err, req, res, next) {
  if (err) {
    return res.status(403).json({
      message: 'Unauthorized.',
      error: err.message
    })
  }
  next()
}
module.exports = {
  handleError
}