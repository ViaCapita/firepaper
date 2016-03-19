import Ember from 'ember';
import computed from 'ember-new-computed';

const inject = Ember.inject;
const alias = computed.alias;

export default Ember.Controller.extend({
  i18n: inject.service(),
  sessionManager: inject.service(),
  person: alias('sessionManager.person'),

  displayTitle: computed('currentRouteName', function() {
    return Ember.$(document).attr('title');
  }),

  actions: {
    toggleOpen(obj) {
      obj.set('open', !obj.get('open'));
    },
    toggle(param) {
      this.set(param, !this.get(param));
    },
    goTo(route) {
      this.transitionToRoute(route);
    },
    signIn(provider) {
      const self = this;
      this.get("session").open("firebase", { provider: provider}).then(function(data) {
        self.store.find('person', { uid: data.uid }).then(function(people) {
          if(!people.get('length')) {
            let newPerson = self.store.createRecord('person');
            newPerson.setFromSession(data);
            newPerson.save().then(function(np) {
              self.set('person', np);
              self.transitionTo('account.details');
            });
          }
          else {
            self.set('person', people.get('firstObject'));
            self.transitionTo('account.details');
          }
        });
      });
    }
  }
});



