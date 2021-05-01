const hbs = require('express-handlebars');

hbs.registerHelper('test', function(conditional, options) {
    return false;
});