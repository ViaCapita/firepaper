import Ember from 'ember';
import computed from 'ember-new-computed';
import moment from 'moment';

const sort = computed.sort;
const inject = Ember.inject;

export default Ember.Service.extend({
  i18n:    inject.service(),
  store:   inject.service(),
  applicationDataLoaded: false,
  // userDataLoaded: false,
  // Set in Application Route setupController method
  session: null,
  person: null,

  supportedCountries: computed('countries.[]', function() {
    return this.get('countries').filter(function(country) {
      return country.get('supported');
    });
  }),

  // sequenceSort:     ['sequence'],
  // sequenceDescSort: ['sequence:desc'],
  nameSort:         ['name'], 
 
  countries:        sort('_countries', 'nameSort'), 
  languages:        sort('_languages', 'nameSort'), 

  loadApplicationData() {
    const self = this;
    this.get('store').findAll("country").then(function(countries) {
      self.set('_countries', countries);
    });
    this.get('store').findAll("language").then(function(languages) {
      self.set('_languages', languages);
    });  
    this.set('applicationDataLoaded', true);
  },

  // loadUserData(person) {
  //   const self = this;
  //   const personId = person.get('id');

  //   // this.get('store').query('person', {
  //   //                   orderBy: 'online',
  //   //                   equalTo: true })
  //   // .then(function(people) {
  //   //   self.set('_onlineContacts', people);
  //   // });    
  // },

  changeLocale(country) {
    const countryLocale = country.get('defaultLocale.id');
    if(countryLocale) {
      this.set('i18n.locale', countryLocale);  
      moment.locale(countryLocale);
    }
  },

  signOut() {
    this.get("session").close();
    // this.clearUserData();
  },
  signIn(provider) {
    const self = this;
    this.get("session").open("firebase", { provider: provider}).then(function(data) {
      self.get('store').query('person', { uid: data.uid }).then(function(people) {
        if(!people.get('length')) {
          let newPerson = self.get('store').createRecord('person');
          newPerson.setFromSession(data);
          newPerson.save().then(function(np) {
            self.set('person', np);
            // self.loadUserData(np);
          });
        }
        else {
          self.set('person', people.get('firstObject'));
          // self.loadUserData(people.get('firstObject'));
        }
      });
    });
  }
});