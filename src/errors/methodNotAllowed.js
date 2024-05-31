function methodNotAllowed(res,req,next){
    next({
        status: 405, message:`Method not allowed for this path`,
    });
};

module.exports = methodNotAllowed;