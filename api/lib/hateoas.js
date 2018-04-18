'use strict';

module.exports = function(req, res, next){

    // save a pointer to the original res.json() so we can replace it if we don't have a links param
    var originalJson = res.json;

    // override default express res.json method to intercept second param
    res.json = function(object, links){

        // grab the object and avoid updating reference.
        var jsonObject = JSON.parse(JSON.stringify(object));
          
        // set the json function back to its original value (we need to do this so the app instance is correct)
        res.json1 = originalJson;

        if (!links || links.length<=0){

            // no links provided, therefore process this as normal
            res.json1(jsonObject);
        }
        else{

            // either add to existing links collection or add new collection
            jsonObject.links = (jsonObject.links) ? jsonObject.links.concat(links) : jsonObject.links = links;
           
            // send modified object to browser
            res.json1(jsonObject);
        }
    }

    next();
};