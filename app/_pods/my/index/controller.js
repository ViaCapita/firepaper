import Ember from 'ember';
import computed from 'ember-new-computed';

const inject = Ember.inject;
const alias  = computed.alias;
// const sort   = computed.sort;

export default Ember.Controller.extend({
  sessionManager: inject.service(),
  person: alias('sessionManager.person'),
  locale: alias('sessionManager.i18n.locale'),
  personSkills: alias('sessionManager.personSkills'),
  personLanguages: alias('sessionManager.personLanguages'),
  personCountries: alias('sessionManager.personCountries'),
  personSchools: alias('sessionManager.personSchools'),
  employments: alias('sessionManager.employments'),
  competencyLevels: alias('sessionManager.competencyLevels'),
  
  getSkillsByLevel: function(level) {
    return this.get('personSkills').filter(function(ps) {
      const psLevel = ps.get('competencyLevel.id');
      // debugger
      return psLevel === level;
    });
  },
  skillsByLevel: computed('personSkills.@each.competencyLevel.id', 'competencyLevels', function() {
    const skills = this.get('personSkills.length');
    if(skills && this.get('competencyLevels.length')) {
      const zero = this.getSkillsByLevel(undefined);
      const one = this.getSkillsByLevel('1');
      const two = this.getSkillsByLevel('2');
      const three = this.getSkillsByLevel('3');
      const four = this.getSkillsByLevel('4');
      const five = this.getSkillsByLevel('5');
          
      return [
        ['Level', 'Number of Skills'],
        ['New '+ zero.get('length'), zero.get('length')],
        ['Basic', one.get('length')],
        ['Learning', two.get('length')],
        ['Practicing', three.get('length')],
        ['Advanced', four.get('length')],
        ['Expert', five.get('length')],
      ];     
    }
    else {
      return false;
    }
  }),
  skillsOptions: {
    height: 300,
    backgroundColor: '#b9f6ca'
    // ,
    // title: "Skills by Competency"
  },
 // getEmploymentsByLengthOfService: function(level) {
 //    return this.get('personSkills').filter(function(ps) {
 //      const psLevel = ps.get('competencyLevel.id')
 //      // debugger
 //      return psLevel === level;
 //    })
 //  },
 //  skillsByLevel: computed('personSkills.@each.competencyLevel.id', 'competencyLevels', function() {
 //    const skills = this.get('personSkills.length');
 //    if(skills && this.get('competencyLevels.length')) {
 //      const zero = this.getSkillsByLevel(undefined);
 //      const one = this.getSkillsByLevel('1');
 //      const two = this.getSkillsByLevel('2');
 //      const three = this.getSkillsByLevel('3');
 //      const four = this.getSkillsByLevel('4');
 //      const five = this.getSkillsByLevel('5');
          
 //      return [
 //        ['Level', 'Number of Skills'],
 //        ['Less than One'+ zero.get('length'), zero.get('length')],
 //        ['Two to Four', one.get('length')],
 //        ['Five to ', two.get('length')],
 //        ['Practicing', three.get('length')],
 //        ['Advanced', four.get('length')],
 //        ['Expert', five.get('length')],
 //      ];     
 //    }
 //    else {
 //      return false;
 //    }
 //  }),
 //  options: {
 //    height: 325,
 //    backgroundColor: '#b9f6ca'
 //    // ,
 //    // title: "Skills by Competency"
 //  }  
  
});
