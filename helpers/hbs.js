const moment= require('moment');

module.exports = {
    truncate: function(str) {
        
        return str.substr(0,40)+'...';
    },
    stripTags: function(input) {
        return input.replace(/<(?:.|\n )*?>/gm, '');
    },

    formatDate: function(date, format) {
        return moment(date).format(format)
    }
    
}