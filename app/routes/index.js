/**
 * Created by LukeDogg on 2017/04/23.
 */
const checkListRoutes = require('./checklist_route');
module.exports = function(app, db) {

    checkListRoutes(app, db);
    // Other route groups could go here, in the future
};