// función para no repetir try catch en todas las routes.
const catchAsync = function (fn) {
    return function(req,res,next) {
        fn(req,res,next).catch(err => next(err))
    }
}

module.exports = catchAsync