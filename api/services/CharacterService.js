
var gameData = sails.config.gameData;

function Skill(skill) {
  this.ability = skill.ability;
  this.name = skill.name;
  this.career = Boolean(skill.career);
  this.combat = Boolean(skill.combat);
  this.knowledge = Boolean(skill.knowledge);
  this.rank = 0;
}

module.exports = {
  getNewSkillList: function () {
    var skillList = [];

    for (var i = 0, j = gameData.skills.length; i < j; i++) {
      skillList.push(new Skill(gameData.skills[i]));
    }

    return skillList;
  }
};
