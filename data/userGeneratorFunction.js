class UserGenerator{

    genRandomString(lenght) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!';
        var charLength = chars.length;
        var result = '';
        for ( var i = 0; i < lenght; i++ ) {
           result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
     }
     
}
module.exports = new UserGenerator();

 
 