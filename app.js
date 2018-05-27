new Vue({
  el: '#app',
  data: {
    gameRun: false,
    nameIsSet: false,
    chapter: 1,
    displayText: true,
    textCounter: 0,
    mCount: 1,
    csatk1: "Super Punch",
    csatk2: null,
    items: [],
    bDiag: [],
    battleReady: false,
    nextBattle: false,
    nextChapter: false,
    text: [
      [
        "Hello *! It is a pleasure to finally meet you.",
        "My name is Dante, I am the chief of this land.",
        "The Big B has swarmed the land with his minions and the only one who can stop him is you, *.",
        "You must defeat each of his generals and thier pawns if you have any hope of being strong enough to face The Big B.",
        "Kill the pawns and each of the 4 Generals to build your strenght up.",
        "You have a normal attack and defense that will get stronger with each level you increase.",
        "You will also gain a new special attack for defeating each General...",
        "*...the first General awaits you, please press next when you are ready, and God speed."
      ],
      [
        "*, that was amazing! I was fearful there for a minuet, but had full confidence in you.",
        "We are not out of the water yet though, there are still three Generals left and Big B himself!",
        "It looks like you picked up a new skill, you can set skills to your special attack options below.",
        "Choose the set skill button to change out your skills, but be warned you will only be able to do this while we are talking.",
        "When you start the battle with the next General and his minions you will be stuck with the skills you set now.",
        "Take a min to set the skills you want to use, when you are done click next to start chapter 2. Good luck *!"
      ],
      [
        "Test C3, T1",
        "Test C3, T2",
        "Test C3, T3"
      ],
      [
        "Test C4, T1",
        "Test C4, T2",
        "Test C4, T3"
      ],
      [
        "Test C5, T1",
        "Test C5, T2",
        "Test C5, T3"
      ]
    ],
    hName: '',
    hLvl: 1,
    hExp: 0,
    hLife: 3,
    hatk: 20,
    hdef: 10,
    hsatk: 30,
    hsdef: 20,
    hHmax: 100,
    hHcur: 100,
    hMmax: 100,
    hMcur: 100,
    bigB: false,
    boss: false,
    mName: null,
    matk: 0,
    mdef: 0,
    msatk: 0,
    msdef: 0,
    mHmax: 0,
    mHcur: 0,
    mMmax: 0,
    mMcur: 0,
    mExpGiven: 0
  },
  methods: {
    startGame: function() {
      this.nameIsSet = false;
      this.gameRun = true;
      this.displayText = true;
      return;
    },
    setHeroName: function() {
      this.nameIsSet = true;
      return;
    },
    displayNextText: function() {
      switch (this.chapter) {
        case 1:
          if(this.textCounter != 7){
            this.textCounter++;
          } else {
            this.textCounter = 0;
            this.displayText = false;
            this.battle();
          }
          break;
        case 2:
          if(this.textCounter != 5){
            this.textCounter++;
          } else {
            this.textCounter = 0;
            this.displayText = false;
            this.battle();
          }
          break;
        case 3:
          if(this.textCounter != 2){
            this.textCounter++;
          } else {
            this.textCounter = 0;
            this.displayText = false;
            this.battle();
          }
          break;
        case 4:
          if(this.textCounter != 2){
            this.textCounter++;
          } else {
            this.textCounter = 0;
            this.displayText = false;
            this.battle();
          }
          break;
        default:
          if(this.textCounter != 2){
            this.textCounter++;
          } else {
            this.textCounter = 0;
            this.displayText = false;
            this.battle();
          }
      }
    },
    displayPrevText: function() {
      if(this.textCounter != 0 ){
        this.textCounter--;
      }
      return;
    },
    assembleText: function() {
      var oldText = this.text[this.chapter - 1][this.textCounter];
      return oldText.replace("*", this.hName);
    },
    setStat: function(cur, max) {
      var calculatedStat = cur / max;
      return calculatedStat * 100 + '%';
    },
    setMonsterStats() {
      if(this.boss){
        if(this.bigB){
          // Big B battle stats
          this.matk = 80;
          this.mdef = 70;
          this.msatk = 110;
          this.msdef = 90;

          // Big B health and magic stats
          this.mHmax = 900;
          this.mHcur = 900;
          this.mMmax = 700;
          this.mMcur = 700;

        } else {
          // General battle stats
          this.matk = this.chapter * 25;
          this.mdef = this.chapter * 13;
          this.msatk = this.chapter * 35;
          this.msdef = this.chapter * 15;

          // Boss health and magic stats
          this.mHmax = this.chapter * 80;
          this.mHcur = this.mHmax;
          this.mMmax = this.chapter * 80;
          this.mMcur = this.mMmax;


        }
      } else {
        // Monster battle stats
        this.matk = (this.chapter * 10) + (this.chapter * this.mCount);
        this.mdef = (this.chapter * 5) + (this.chapter * this.mCount);
        this.msatk = (this.chapter * 12) + (this.chapter * this.mCount);
        this.msdef = (this.chapter * 8) + (this.chapter * this.mCount);

        // Monster health and magic stats
        this.mHmax = (this.chapter * 35) + ((this.chapter * this.mCount) * 2);
        this.mHcur = this.mHmax;
        this.mMmax = (this.chapter * 15) + (this.chapter * this.mCount);
        this.mMcur = this.mMmax;

        // Monster Exp given
        this.mExpGiven = (this.chapter + this.mCount) * 30;
      }
    },
    checkChapterProgress: function() {
      if(this.chapter != 5 ){
        if(this.mCount == 6){
          this.boss = true;
        }
      } else {
        if(this.mCount == 6){
          this.boss = true;
          this.bigB = true;
        }
      }
    },
    battle: function() {
      this.checkChapterProgress();
      console.log(this.mCount);
      this.setMonsterStats();
      if(this.boss){
        if(this.bigB){
          this.bDiag.push("The Big B appears at last!");
        } else {
          this.bDiag.push("A General appears.");
        }
      } else {
        this.bDiag.push("A monster appears.");
      }
      this.battleReady = true;
    },
    toNextBattle: function() {
      this.nextBattle = false;
      this.bDiag = [];
      this.battle();
      return;
    },
    toNextChapter: function() {
      this.nextChapter = false;
      this.bDiag = [];
      this.displayText = true;
      return;
    },
    normAtk: function() {
      if(this.battleReady){
        var damageDoneToMonster = 0;
        var damageDoneToHero = 0;
        var criticalChance = Math.floor(Math.random() * 5) + 1;
        var attacker = "Monster";

        if(this.boss){
          if(this.bigB){
            attacker = "Big B";
          } else {
            attacker = "General";
          }
        }

        if(criticalChance == 5){
          damageDoneToMonster = (this.hatk - this.mdef) * (Math.floor(Math.random() * 2) + 2);
        } else {
          damageDoneToMonster = this.hatk - this.mdef;
        }

        this.mHcur -= damageDoneToMonster;

        if(this.checkBattleWin(damageDoneToMonster, attacker)){
          return;
        }

        damageDoneToHero = this.matk - this.hdef;
        this.hHcur -= damageDoneToHero;

        if(this.checkBattleWin(damageDoneToHero, attacker)){
          return;
        }

        this.bDiag.push("Your attack does " + damageDoneToMonster + " damage to the " + attacker +".");
        this.bDiag.push("The " + attacker + " does " + damageDoneToHero + " damage to you.");
        return;
      }
    },
    specAtk: function(type) {
      console.log(type);
    },
    checkBattleWin: function(damage, attacker) {
      if(this.mHcur <= 0 ){
        this.hExp += this.mExpGiven;
        this.checkLevelUp();
        this.battleReady = false;
        if(this.boss){
          this.mCount = 1;
          this.nextChapter = true;
          this.chapter++;
          this.boss = false;
        } else {
          this.mCount++;
          this.nextBattle = true;
        }
        this.bDiag.push("Your attack does " + damage + " damage to the " + attacker +".");
        this.bDiag.push("You have killed the " + attacker + "!");
        this.bDiag.push("You have earned " + this.mExpGiven + " experience points!");
        return true;
      } else if(this.hHcur <= 0) {
        this.bDiag.push("The monster does " + damage + " damage to you.");
        this.bDiag.push("You have been killed");
        this.battleReady = false;
        return true;
      }
      return false;
    },
    checkLevelUp: function() {
      var requiredExp = (this.hLvl * 140);
      if(this.hExp >= requiredExp){
        this.hatk += (this.hLvl * 3);
        this.hdef += (this.hLvl * 2);
        this.hsatk += (this.hLvl * 3);
        this.hsdef += (this.hLvl * 2);
        this.hHcur += (this.hLvl * 10);
        this.hHmax += (this.hLvl * 10);
        this.hMcur += (this.hLvl * 8);
        this.hMmax += (this.hLvl * 8);
        this.hLvl++;
        this.hExp -= requiredExp;
      }
      return;
    },
    setSpecAttk: function() {

    },
    addItem: function() {

    },
    useItem: function() {

    }
  }
});
