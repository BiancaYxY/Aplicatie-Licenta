const authRankMiddleware = (...allowedRanks) => {
    return(req, res, next) => {
        if(!req.user || !allowedRanks.includes(req.user.rank)) {
            return res.status(403).json({message:"Access denied!"});
        }
        next();
    };
};

module.exports = authRankMiddleware;