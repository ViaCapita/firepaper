/* global moment */
import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let date = params[0];
  let format = params[1] ? params[1] : 'L';
  return date ? moment.utc(date).format(format) : "N/A";
});


// Ember.Handlebars.helper('humanize', function(str) {
//   return str.replace(new RegExp('_','g'), ' ');
// });

// Ember.Handlebars.helper('format-date', function(date, format) {
//   return moment.utc(date).format(format);
// });

// Ember.Handlebars.helper('format-date-fromNow', function(date) {
//   return moment.utc(date).fromNow();
// });

// Ember.Handlebars.helper('format-basic-date', function(date) {
//   return date ? moment.utc(date).format('L') : "N/A";
// });

// // Ember.Handlebars.helper('format-dollars', function(number) {
// //   return accounting.formatMoney(number, '$', 0);
// // });

// // Ember.Handlebars.helper('format-calculated-dollars', function(number, numberToo) {
// //   const calculatedReturn = numberToo ? number / numberToo : 0;
// //   return accounting.formatMoney(calculatedReturn);
// // });

// // Ember.Handlebars.helper('format-basic-currency', function(number) {
// //   return accounting.formatMoney(number);
// // });

// // Ember.Handlebars.helper('format-cent-currency', function(number) {
// //   return accounting.formatMoney(number/100);
// // });

// // Ember.Handlebars.helper('format-m-cent-currency', function(number) {
// //   return accounting.formatMoney(number/100000000);
// // });

// // Ember.Handlebars.helper('format-round-currency', function(number){
// //  return accounting.formatMoney(number,0);
// // });

// Ember.Handlebars.helper('format-perc', function(number, precision){
//  return (number * 100).toFixed(precision || 0) + '%';
// });

// Ember.Handlebars.helper('format-percent', function(number, precision){
//  return (number * 1).toFixed(precision || 0) + '%';
// });

// Ember.Handlebars.helper('format-basic-number', function(number) {
//   return number;
// });

// Ember.Handlebars.helper('format-n', function(number) {
//   return (number || 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
// });

// Ember.Handlebars.helper('is-contained-in', function(item, items) {
//   if (items.contains(item)){
//     return new Ember.Handlebars.SafeString('<div class="fa fa-check button tiny success disabled"> Yes</div>');
//   } else{
//     return '';
//   }
// });

// Ember.Handlebars.helper('threshold', function(score, thresholdArray) {
//   score = parseInt(score, 10);
//   var val = thresholdArray.find(function(thresholds){
//     return Ember.A(thresholds[1]).find(function(num){
//       return score === num;
//     });
//   });
//   return val ? val[0] + '%' : '-';
// });

// Ember.Handlebars.helper('format-empty', function(property){
//   return property ? property : 'N/A';
// });
