const _ = require("lodash");

console.log(_.filter(["A","B","C","D"],function(c){
    console.log(c!=="A")
    return c!=="A";
}))