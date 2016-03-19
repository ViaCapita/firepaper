import Ember from 'ember';
import computed from 'ember-new-computed';
import autosave from 'ember-autosave';
// import FilepickerMixin from 'cvresume/mixins/cvr-filepicker';

const inject = Ember.inject;
const alias = computed.alias;

export default Ember.Controller.extend({
  sessionManager: inject.service(),
  person: alias('sessionManager.person'),
  details: autosave('person', {
    saveDelay: 3000,
    save: 'savePerson'
  }),

  savePerson: function(person) {
    person.setNameStartsWith();
    person.save().then(function(savedPerson) {
      if(savedPerson.get('country.defaultLocale.id')) {
        moment.locale(savedPerson.get('country.defaultLocale.id'));          
      }
      else {
        moment.locale('en'); 
      }
    });
  },

  selectLabel: function(model) {
    return model.get('name');
  }
  //,
  // actions: {
  //   goTo(route) {
  //     this.transitionToRoute(route);
  //   },
  // }
});
