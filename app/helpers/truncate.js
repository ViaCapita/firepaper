import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let str = params[0];
  let len = parseInt(params[1]);
  let lenMinus = len - 3;
  if (str) {
    let escaped = Ember.Handlebars.Utils.escapeExpression(str);
        escaped = escaped.replace(/(\r\n|\n|\r)/gm, '<br>');
        escaped = escaped.length > len ? escaped.substring(0, lenMinus)+'...' : escaped;
    return new Ember.String.htmlSafe(escaped);
  }
});
