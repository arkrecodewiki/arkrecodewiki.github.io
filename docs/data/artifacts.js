const artifactDmgType = {
  damage: 'damage',
  penetrate: 'penetrate',
  aftermath: 'aftermath',
  attack: 'attack',
  critDmgBoost: 'crit-dmg-boost',
  fixedDamage: 'fixedDamage',
  flat: 'flat',
  dot: 'dot',
  health_only: 'health_only'
};

const artifacts = {
  sword_of_the_morning: {
    id: 'sword_of_the_morning',
    name: 'A Little Abuse',
    image: 'A Little Abuse',
    type: artifactDmgType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
  },
  frame_of_light: {
    id: 'frame_of_light',
    name: 'Breached Defenses',
    image: 'Breached Defenses',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.mage,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  dux_noctis: {
    id: 'dux_noctis',
    name: 'Breakthrough Attempt',
    image: 'Breakthrough Attempt',
    type: artifactDmgType.attack,
    scale: [0.02, 0.022, 0.024, 0.026, 0.028, 0.03, 0.032, 0.034, 0.036, 0.038, 0.04],
    form: [elements.critical_hit_stack_6],
    exclusive: classType.ranger,
    value: (artiScale) => (artiScale * 3) + (elements.critical_hit_stack_6.value() * artiScale)
  },
  violet_talisman: {
    id: 'violet_talisman',
    name: 'Candid Affection',
    image: 'Candid Affection',
    type: artifactDmgType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    form: [elements.turn_stack_3],
    exclusive: classType.thief,
    value: (artiScale) => elements.turn_stack_3.value() * artiScale
  },
  hell_cutter: {
    id: 'hell_cutter',
    name: 'Counterstroke',
    image: 'Counterstroke',
    type: artifactDmgType.attack,
    scale: [0.02, 0.022, 0.024, 0.026, 0.028, 0.03, 0.032, 0.034, 0.036, 0.038, 0.04],
    form: [elements.turn_stack],
    exclusive: classType.warrior,
    value: (artiScale) => elements.turn_stack.value() * artiScale
  },
  prayer_of_solitude: {
    id: 'prayer_of_solitude',
    name: 'Covert Strategy',
    image: 'Covert Strategy',
    extraAttack: true,
    scale: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1],
    value:(artiScale, skill, isExtra) => (skill.isExtra || isExtra) ? artiScale * 2 : artiScale,
    exclusive: classType.warrior,
    type: artifactDmgType.damage
  },
  fairy_tale_for_a_nightmare: {
    id: 'fairy_tale_for_a_nightmare',
    name: 'Cyber Clash',
    image: 'Cyber Clash',
    type: artifactDmgType.fixedDamage,
    form: [elements.extra_dual_or_counter],
    penetrate: 1,
    scale: [750, 825, 900, 975, 1050, 1125, 1200, 1275, 1350, 1425, 1500],
    exclusive: classType.mage,
    applies: (skill) => skill.isExtra || elements.extra_dual_or_counter.value(),
    value: () => {
      const artiScale = Math.floor(Number(document.getElementById('artifact-lvl')?.value || '30') / 3)
      return artifacts['fairy_tale_for_a_nightmare'].scale[artiScale];
    }
  },
  creation_and_destruction: {
    id: 'creation_and_destruction',
    name: 'Desire for Enhancement',
    image: 'Desire for Enhancement',
    value: 0.08,
    type: artifactDmgType.damage,
    exclusive: classType.warrior,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  reingar_special_drink: {
    id: 'reingar_special_drink',
    name: 'Desperate Desire',
    image: 'Desperate Desire',
    type: artifactDmgType.aftermath,
    atkPercent: 0.45,
    penetrate: 0.7,
    exclusive: classType.ranger,
    applies: (skill) => getSkillType(skill) === skillTypes.aoe
  },
  exorcist_tonfa: {
    id: 'exorcist_tonfa',
    name: 'Fallen Miracle',
    image: 'Fallen Miracle',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage
  },
  time_matter: {
    id: 'time_matter',
    name: 'Ferocity',
    image: 'Ferocity',
    form: [elements.enemy_defeated],
    scale: [0.18, 0.198, 0.216, 0.234, 0.252, 0.27, 0.288, 0.306, 0.324, 0.342, 0.36],
    type: artifactDmgType.damage,
    exclusive: classType.mage,
    value: (input) => {
      return (elements.enemy_defeated.value() ? input : 0);
    }
  },
  pure_white_trust: {
    id: 'pure_white_trust',
    name: 'Fervent Cheer',
    image: 'Fervent Cheer',
    form: [elements.nonattack_used],
    scale: [0.15, 0.165, 0.18, 0.195, 0.21, 0.225, 0.24, 0.255, 0.27, 0.285, 0.3],
    type: artifactDmgType.critDmgBoost,
    exclusive: classType.warrior,
    value: (input) => {
      return (elements.nonattack_used.value() ? input : 0);
    }
  },
  portrait_of_the_saviors: {
    id: 'portrait_of_the_saviors',
    name: 'Hello, Loyal Customer!',
    image: 'Hello Loyal Customer',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: artifactDmgType.damage
  },
  draco_plate: {
    id: 'draco_plate',
    name: 'Lonely Salvation',
    image: 'Lonely Salvation',
    scale: [0.15, 0.165, 0.18, 0.195, 0.21, 0.225, 0.24, 0.255, 0.27, 0.285, 0.3],
    type: artifactDmgType.critDmgBoost,
    exclusive: classType.warrior
  },
  elyha_knife: {
    id: 'elyha_knife',
    name: 'Loving Caress',
    image: 'Loving Caress',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: artifactDmgType.penetrate,
    exclusive: classType.thief
  },
  mighty_yaksha: {
    id: 'mighty_yaksha',
    name: 'Master and Pet',
    image: 'Master and Pet',
    type: artifactDmgType.attack,
    scale: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1],
  },
  kaladra: {
    id: 'kaladra',
    name: 'Pleasure of Anticipation',
    image: 'Pleasure of Anticipation',
    scale: [0.15, 0.17, 0.18, 0.2, 0.21, 0.23, 0.24, 0.26, 0.27, 0.28, 0.3],
    type: artifactDmgType.damage,
    exclusive: classType.mage
  },
  rocket_punch_gauntlet: {
    id: 'rocket_punch_gauntlet',
    name: 'Pristine Sincerity',
    image: 'Pristine Sincerity',
    type: artifactDmgType.aftermath,
    form: [elements.caster_defense, elements.caster_defense_increase],
    defenseScaling: true,
    defPercent: 1.0,
    penetrate: 0.7,
    exclusive: classType.knight,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  torn_sleeve:{
    id: 'torn_sleeve',
    name: 'Queen\'s Pastime',
    image: 'Queens Pastime',
    type: artifactDmgType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    dot: [dot.bleed],
    exclusive: classType.thief
  },
  els_fist: {
    id: 'els_fist',
    name: 'Rage and Desire',
    image: 'Rage and Desire',
    type: artifactDmgType.attack,
    scale: [0.25, 0.275, 0.3, 0.325, 0.35, 0.375, 0.4, 0.425, 0.45, 0.475, 0.5],
    form: [elements.caster_hp_pc],
    exclusive: classType.warrior,
    value: (artiScale) => {
      if (elements.caster_hp_pc.value() < 25) return artiScale;
      if (elements.caster_hp_pc.value() < 50) return artiScale * 2 / 3;
      if (elements.caster_hp_pc.value() < 75) return artiScale / 3;
      return 0.1;
    }
  },
  jack_o_symbol: {
    id: 'jack_o_symbol',
    name: 'Reckless Temptation',
    image: 'Reckless Temptation',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.warrior,
  },
  sword_of_winter_shadow: {
    id: 'sword_of_winter_shadow',
    name: 'Secret Compensation',
    image: 'Secret Compensation',
    scale: [0.12, 0.132, 0.144, 0.156, 0.168, 0.18, 0.192, 0.204, 0.216, 0.228, 0.24],
    type: artifactDmgType.damage,
    exclusive: classType.thief
  },
  an_offer_you_cant_refuse: {
    id: 'an_offer_you_cant_refuse',
    name: 'Succubus Incoming',
    image: 'Succubus Incoming',
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    type: artifactDmgType.penetrate,
    exclusive: classType.ranger,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  daydream_joker: {
    id: 'daydream_joker',
    name: 'Suggestive Tentacles',
    image: 'Suggestive Tentacles',
    scale: [0.01, 0.011, 0.012, 0.013, 0.014, 0.015, 0.016, 0.017, 0.018, 0.019, 0.02],
    type: artifactDmgType.flat,
    form: [elements.caster_max_hp],
    flat: (artiScale) => elements.caster_max_hp.value() * artiScale
  },
  last_teatime: {
    id: 'last_teatime',
    name: 'Sweet Contrast',
    image: 'Sweet Contrast',
    scale: [0.09, 0.099, 0.108, 0.117, 0.126, 0.135, 0.144, 0.153, 0.162, 0.171, 0.18],
    type: artifactDmgType.damage,
    exclusive: classType.mage,
    applies: (skill) => getSkillType(skill) === skillTypes.aoe,
  },
  border_coin: {
    id: 'border_coin',
    name: 'The Jester\'s Invitation',
    image: 'The Jesters Invitation',
    type: artifactDmgType.attack,
    scale: [0.075, 0.0825, 0.09, 0.0975, 0.105, 0.1125, 0.12, 0.1275, 0.135, 0.1425, 0.15],
    form: [elements.non_attack_skill_stack_3],
    exclusive: classType.warrior,
    value: (artiScale) => elements.non_attack_skill_stack_3.value() * artiScale
  },
  otherworldly_machinery: {
    id: 'otherworldly_machinery',
    name: 'The Other Side of Calm',
    image: 'The Other Side of Calm',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.ranger,
    applies: (skill) => getSkillType(skill) === skillTypes.aoe,
  },
  samsara_prayer_beads: {
    id: 'samsara_prayer_beads',
    name: 'The Real Lead',
    image: 'The Real Lead',
    value: 0.1,
    type: artifactDmgType.damage,
    exclusive: classType.warrior,
    applies: (skill) => getSkillType(skill) === skillTypes.single,
  },
  golden_rose: {
    id: 'golden_rose',
    name: 'Therapeutic Night Raid',
    image: 'Therapeutic Night Raid',
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    type: artifactDmgType.damage,
    exclusive: classType.warrior
  },
  sigurd_scythe: {
    id: 'sigurd_scythe',
    name: 'Treacherous Snare',
    image: 'Treacherous Snare',
    type: artifactDmgType.attack,
    exclusive: classType.warrior,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
  },
  ancient_sheath: {
    id: 'ancient_sheath',
    name: 'Unexpected Shyness',
    image: 'Unexpected Shyness',
    type: artifactDmgType.damage,
    scale: [0.08, 0.088, 0.096, 0.104, 0.112, 0.12, 0.128, 0.136, 0.144, 0.152, 0.16],
    applies: (skill, skillId) => skillId === 's1' || skill.s1_benefits,
  },
  wind_rider: {
    id: 'wind_rider',
    name: 'Unforgettable Punishment',
    image: 'Unforgettable Punishment',
    type: artifactDmgType.attack,
    scale: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2],
    additional: [0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4],
    exclusive: classType.thief,
    form: [elements.enemy_defeated],
    value: (input) => {
      return input + (elements.enemy_defeated.value() ? artifacts.wind_rider.additional[artifacts.wind_rider.scale.indexOf(input)] : 0);
    }
  },
};