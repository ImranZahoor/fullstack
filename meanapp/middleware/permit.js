
module.exports = {
    permit(req, res, next){
        console.log("permission granted: ",req.user);
        next();
    }
}