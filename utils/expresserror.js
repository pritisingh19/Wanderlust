class ExpressError extends Error{
    cunstructor(statusCode, message){
        Super();
        this.statusCode = this.statusCode;
        this.message=message;
    }
}
module.exports= ExpressError;