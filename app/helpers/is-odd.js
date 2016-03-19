import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  const index = params[0];
  return index % 2 === 0;
});
