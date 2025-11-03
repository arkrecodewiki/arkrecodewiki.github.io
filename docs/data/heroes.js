/*
 * Notes:
 * aftermath damage is only used when it scales with the caster's attack (hwayoung)
 * fixed damage is used for flat extra damage (rimuru)
 * flat damage is used for damage scaling with stats other than attack (alencia)
 */

const dot = {
  bleed: 'bleed',
  burn: 'burn',
  bomb: 'bomb',
};

const classType = {
  knight: 'knight',
  mage: 'mage',
  ranger: 'ranger',
  soul_weaver: 'soul-weaver',
  thief: 'thief',
  warrior: 'warrior',
};

const element = {
  ice: 'ice',
  fire: 'fire',
  earth: 'earth',
  dark: 'dark',
  light: 'light',
};

const heroes = {
  lilibet: {
    name: 'Abyss',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 889,
    baseHP: 5364,
    baseDef: 592,
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.6 : 2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  ae_winter: {
    name: 'Akane',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 907,
    baseHP: 5122,
    baseDef: 532,
    form: [elements.attack_skill_stack_3],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 0.8,
        pow: 0.95,
        fixed: (hitType) => (hitType === hitTypes.crit) ? 5000 * (elements.attack_skill_stack_3.value() + 1)  : 0,
        fixedTip: () => ({fixed: 5000, per_stack: 5000 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
    }
  },

  eligos: {
    name: 'Akaoni',
    element: element.fire,
    classType: classType.ranger,
    form: [elements.caster_speed, elements.caster_perception, elements.target_speed],
    baseAtk: 961,
    baseHP: 4556,
    baseDef: 536,
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.95,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 0.75,
        pow: 1.3,
        mult: () => {
          const spdDiff = (elements.caster_speed.value() - elements.target_speed.value()) * 0.025;
          return 1 + Math.min(Math.max(0, spdDiff), 2);
        },
        multTip: () => ({ caster_target_spd_diff: 2.5 }),
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.5,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  carmainerose: {
    name: 'Altemia',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 934,
    baseHP: 3262,
    baseDef: 666,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  little_queen_charlotte: {
    name: 'Amamiya Sakuya',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 889,
    baseHP: 5364,
    baseDef: 592,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        elemAdv: () => true,
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        mult: () => document.getElementById('elem-adv').checked ? 1.5 : 1,
        multTip: () => ({ elemental_advantage: 50 }),
        penetrate: () => 0.7,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        elemAdv: () => true,
        single: true,
      },
      s3_splash: {
        name: infoLabel('lqc_s3_splash'),
        rate: 0,
        pow: 0,
        afterMath: () => document.getElementById('elem-adv').checked ? { atkPercent: 1.2, penetrate: 0.7 } : null,
        noCrit: true,
        noMiss: true,
      }
    }
  },
  milim: {
    name: 'Anastasia',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1025,
    baseHP: 4475,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1.3,
        aoe: true,
      },
      s3: {
        rate: 1.7,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        single: true,
      },
    }
  },
  zerato: {
    name: 'Anheeun',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 952,
    baseHP: 4313,
    baseDef: 627,
    form: [elements.target_has_debuff],
    skills: {
      s1: {
        rate: 1.05,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1.5,
        pow: 0.95,
        mult: () => elements.target_has_debuff.value() ? 1.3 : 1,
        multTip: () => ({ target_has_debuff: 30 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
 ae_giselle: {
    name: 'Annin Miru',
    element: element.earth,
    classType: classType.mage,
    form: [elements.target_hp_pc],
    baseAtk: 1043,
    baseHP: 4313,
    baseDef: 652,
    skills: {
      s1: {
        mult: () => 1 + elements.target_hp_pc.value() * 0.002,
        multTip: () => ({ target_current_hp: 0.2 }),
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.7 : 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 2,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
        noTrans: true,
      }
    }
  },
  pearlhorizon: {
    name: 'Antiya',
    element: element.earth,
    classType: classType.mage,
    baseAtk: 771,
    baseHP: 4435,
    baseDef: 631,
    form: [elements.target_max_hp, elements.target_has_sleep],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.6,
        pow: 1,
        aoe: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        extraDmg: () => elements.target_has_sleep.value() ? elements.target_max_hp.value() * 0.2 : 0,
        extraDmgTip: () => ({ target_max_hp: elements.target_has_sleep.value() ? 20 : 0 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      },
    }
  },
  abigail: {
    name: 'Aoi Hinamori',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 834,
    baseHP: 5364,
    baseDef: 585,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.8,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({caster_max_hp: 12}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 1.2,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.2,
        flatTip: () => ({caster_max_hp: 20}),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  vildred: {
    name: 'Apathy',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1096,
    baseHP: 4718,
    baseDef: 522,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.1 : 0.85,
        pow: 1,
        mult: (soulburn) => 1 + elements.caster_speed.value()*(soulburn ? 0.0009 : 0.00081),
        multTip: (soulburn) => ({ caster_speed: soulburn ? 0.09 : 0.081 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  celestial_mercedes: {
    name: 'Apostle',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 952,
    baseHP: 4071,
    baseDef: 627,
    form: [elements.target_max_hp],
    skills: {
      s1: {
        rate: 0.8,
        pow: 0.95,
        enhance: [0.05, 0.1, 0, 0, 0.15],
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1 : 0.8,
        pow: 0.9,
        flat: () => elements.target_max_hp.value() * 0.04,
        flatTip: () => ({ target_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.1,
        pow: 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        aoe: true,
      }
    }
  },
  krau: {
    name: 'Ariel',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 689,
    baseHP: 5647,
    baseDef: 690,
    form: [elements.caster_max_hp, elements.caster_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => 0.085 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 8.5 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => 0.13 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 13 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        noCrit: true,
        rate: 0.3,
        pow: 1,
        flat: () => 0.53571 * Math.max(elements.caster_max_hp.value() - elements.caster_hp.value(), 0),
        flatTip: () => ({ caster_lost_hp: 53.571 }),
        penetrate: () => 1.0,
        single: true,
      }
    }
  },
  briar_witch_iseria: {
    name: 'Aubrynn',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 898,
    baseHP: 4879,
    baseDef: 571,
    skills: {
      s1: {
        rate: 0.85,
        pow: 1,
        afterMath: (hitType) => (hitType !== hitTypes.miss) ? { atkPercent: 0.3, penetrate: 0.7 } : null,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 0.95,
        pow: 1.1,
        afterMath: (hitType) => (hitType !== hitTypes.miss) ? { atkPercent: 0.3, penetrate: 0.7 } : null,
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  purrgis: {
    name: 'Bartholo',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 889,
    baseHP: 5203,
    baseDef: 561,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        name: infoLabel('s2_counter'),
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance_from: 's1',
        aoe: true,
      },
      s3: {
        hpScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.05 : 0.8,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  pavel: {
    name: 'Bartoz',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 961,
    baseHP: 4556,
    baseDef: 536,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1.1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0, 0.05, 0, 0.1],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 0.8,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001215,
        multTip: () => ({ caster_speed: 0.1215 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.6,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001605,
        multTip: () => ({ caster_speed: 0.1605 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        noTrans: true,
        single: true,
      }
    }
  },
  carrot: {
    name: 'Belyn',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 816,
    baseHP: 3505,
    baseDef: 606,
    form: [elements.target_burn_detonate],
    dot: [dot.burn],
    barrier: (hero) => hero.getAtk() * 0.6,
    barrierEnhance: 's2',
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        detonate: dot.burn,
        detonation: () => 1.1,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.15, 0.15]
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  ruele_of_light: {
    name: 'Bernice',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 471,
    baseHP: 4637,
    baseDef: 736,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.81,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({caster_max_hp: 7}),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  luluca: {
    name: 'Berrica',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1070,
    baseHP: 4111,
    baseDef: 715,
    form: [elements.target_hp_pc, elements.s3_stack],
    barrier: (hero) => hero.getAtk() * (1 + elements.s3_stack.value() * 0.2) * 0.375,
    barrierEnhance: 's2',
    atkUp: () => 1 + elements.s3_stack.value() * 0.2,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (1 - (elements.target_hp_pc.value() / 100)) * 0.2,
        multTip: () => ({ target_lost_hp_pc: 0.2 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0, 0.05, 0.1]
      },
      s3: {
        rate: 0.9,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  shadow_rose: {
    name: 'Berserk Galornia',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 698,
    baseHP: 5364,
    baseDef: 610,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1.05,
        pow: 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        aoe: true,
      },
    }
  },
  hazel: {
    name: 'Blossom',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 608,
    baseHP: 4030,
    baseDef: 662,
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  enott: {
    name: 'Bonnie',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 798,
    baseHP: 4879,
    baseDef: 539,
    form: [elements.target_hp_pc],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.005,
        multTip: () => ({ target_lost_hp_pc: 0.5 }),
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      }
    }
  },
 ran: {
    name: 'Bunny Girl Erica',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 889,
    baseHP: 4960,
    baseDef: 483,
    form: [elements.caster_speed, elements.target_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        penetrate: () => 0.2,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 0.8,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081 + elements.target_speed.value() * 0.0015,
        multTip: () => ({ caster_speed: 0.081, target_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  maya: {
    name: 'Carolyn',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 671,
    baseDef: 648,
    baseHP: 5850,
    form: [elements.caster_defense, elements.caster_defense_increase],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 0.95,
        flat: () => elements.caster_defense.value() * 0.75,
        flatTip: () => ({ caster_defense: 75 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        defenseScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.8,
        flatTip: () => ({ caster_defense: 80 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  yufine: {
    name: 'Celeste',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 989,
    baseHP: 5364,
    baseDef: 553,
    form: [elements.target_has_buff],
    skills: {
      s1: {
        rate: 1.3,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        aoe: true,
      },
      s3: {
        rate: 2,
        pow: 0.95,
        mult: () => elements.target_has_buff.value() ? 1.5 : 1.0,
        multTip: () => ({target_has_buff: 50}),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  operator_sigret: {
    name: 'Chouko',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 853,
    baseHP: 5082,
    baseDef: 564,
    form: [elements.target_has_barrier, elements.caster_speed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 0.75,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        penetrate: () => elements.target_has_barrier.value() ? 1.0 : 0.7,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 1,
        pow: 1.1,
        mult: () => 1 + elements.caster_speed.value() * 0.001215,
        multTip: () => ({ caster_speed: 0.1215 }),
        enhance: [0.05, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  luna: {
    name: 'Christmas Mirabelle',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 889,
    baseHP: 5364,
    baseDef: 592,
    form: [elements.caster_hp_above_50pc, elements.nb_hits],
    atkUp: () => {
      if (!elements.caster_hp_above_50pc.value()) {
        return 1;
      }

      let mult = 1.3;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        mult += heroes.luna.skills.s2.enhance[i];
      }

      return mult;
    },
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => (soulburn ? 3 : elements.nb_hits.value()) * 0.7,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        elemAdv: () => true,
        single: true,
      },
      s2: {
        enhance: [0.01, 0.02, 0.02, 0.02, 0.03]
      },
      s3: {
        rate: 1.1,
        pow: 1.05,
        penetrate: () => 0.5,
        enhance: [0.05, 0, 0.1, 0, 0.1],
        elemAdv: () => true,
        noTrans: true,
        single: true,
      }
    }
  },
  kiris: {
    name: 'Cindy',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 707,
    baseHP: 4637,
    baseDef: 543,
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.05, 0.05],
        aoe: true,
      }
    }
  },
  judge_kise: {
    name: 'Claire',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 889,
    baseHP: 4920,
    baseDef: 617,
    form: [elements.nb_targets],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.15, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (elements.nb_targets.value() - 1) * 0.1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  silk: {
    name: 'Clara',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 880,
    baseHP: 4273,
    baseDef: 518,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
        single: true,
      },
      s1_bis: {
        s1_benefits: true,
        name: infoLabel('silk_automatic_fire'),
        spdScaling: true,
        rate: 1.25,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05],
        single: true,
      },
      s3: {
        rate: 0.95,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  general_purrgis: {
    name: 'Clone Bartholo',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 753,
    baseHP: 5405,
    baseDef: 578,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 1,
        flat: () => 0.06 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => 0.08 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 8 }),
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  fighter_maya: {
    name: 'Clone Carolyn',
    element: element.light,
    classType: classType.knight,
    baseAtk: 671,
    baseDef: 645,
    baseHP: 5364,
    form: [elements.caster_defense, elements.caster_defense_increase, elements.target_hp_pc],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.75,
        flatTip: () => ({ caster_defense: 75 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 1.7,
        pow: 1,
        flat: () => elements.caster_defense.value() * 1.5,
        flatTip: () => ({ caster_defense: 150 }),
        mult: () => elements.target_hp_pc.value() < 30 ? 4 : 1,
        multTip: () => ({ under_threshold: 400 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  wanderer_silk: {
    name: 'Clone Clara',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 780,
    baseHP: 4960,
    baseDef: 564,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 1,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.8,
        pow: 0.8,
        mult: () => 1 + elements.caster_speed.value() * 0.001215,
        multTip: () => ({ caster_speed: 0.1215 }),
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        single: true,
      }
    }
  },
  blood_blade_karin: {
    name: 'Clone Dildri',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 907,
    baseHP: 5001,
    baseDef: 462,
    form: [elements.caster_hp_pc],
    atkUp: () => {
      let boost = 0.0051;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += 0.0051 * heroes.blood_blade_karin.skills.s2.enhance[i];
      }
      return 1 + (100 - elements.caster_hp_pc.value()) * boost;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.45 : 1.2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      },
    }
  },
  blaze_dingo: {
    name: 'Clone Giselle',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 735,
    baseHP: 3747,
    baseDef: 627,
    skills: {
      s1: {
        rate: 1.5,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1.2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  specimen_sez: {
    name: 'Clone Janis',
    element: element.light,
    classType: classType.thief,
    baseAtk: 989,
    baseHP: 6437,
    baseDef: 473,
    form: [elements.target_is_stunned],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        penetrate: () => elements.target_is_stunned.value() ? 1.0 : 0.5,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  shooting_star_achates: {
    name: 'Clone Joyce',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 426,
    baseHP: 4475,
    baseDef: 701,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.1, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  assassin_cartuja: {
    name: 'Clone Kalici',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 889,
    baseHP: 5203,
    baseDef: 561,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  watcher_schuri: {
    name: 'Clone Matilda',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 753,
    baseHP: 5203,
    baseDef: 557,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 0.8,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        penetrate: () => 1.0,
        single: true,
      }
    }
  },
  cerise: {
    name: 'Cosma',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 753,
    baseHP: 4879,
    baseDef: 603,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        elemAdv: () => true,
        aoe: true,
      },
    }
  },
  tywin: {
    name: 'Darlene',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 671,
    baseHP: 5809,
    baseDef: 648,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.8,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  ambitious_tywin: {
    name: 'Darlene the Radiant',
    element: element.light,
    classType: classType.knight,
    baseAtk: 744,
    baseHP: 5890,
    baseDef: 655,
    form: [elements.caster_max_hp, elements.caster_enrage, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.6,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0, 0.1, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0, 0.05, 0, 0, 0.05, 0.15],
        aoe: true,
      },
    }
  },
  destina: {
    name: 'Dawn',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 471,
    baseHP: 4758,
    baseDef: 732,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        single: true,
      }
    }
  },
  karin: {
    name: 'Dildri',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 880,
    baseHP: 4435,
    baseDef: 508,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.3 : 1.6,
        pow: 0.85,
        critDmgBoost: () => 0.5,
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  bellona: {
    name: 'Delina',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 853,
    baseHP: 5284,
    baseDef: 585,
    form: [elements.target_max_hp, elements.nb_targets],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        flat: () => elements.target_max_hp.value() * 0.04,
        flatTip: () => ({ target_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 0.95,
        mult: () => elements.nb_targets.value() > 1 ? 1 + (elements.nb_targets.value() - 1) * 0.1 : 1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.1,
        pow: 1,
        enhance: [0.15, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  arbiter_vildred: {
    name: 'Divergent Apathy',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 961,
    baseHP: 4718,
    baseDef: 522,
    form: [elements.caster_full_focus],
    skills: {
      s1: {
        rate: 0.975,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1]
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => {
          if (elements.caster_full_focus.value()) {
            return soulburn ? 1.55 : 1.23;
          } else {
            return soulburn ? 1.29 : 1.04;
          }
        },
        pow: 0.85,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  archdemon_shadow: {
    name: 'Divergent Apostle',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1070,
    baseHP: 4111,
    baseDef: 715,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.6,
        pow: 1.3,
        aoe: true,
        isExtra: true
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  dark_corvus: {
    name: 'Divergent Opaeni',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 816,
    baseHP: 5850,
    baseDef: 620,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        noCrit: true,
        soulburn: true,
        rate: 0,
        pow: 0.95,
        flat: (soulburn) => elements.caster_max_hp.value() * (soulburn ? 0.375 : 0.25),
        flatTip: (soulburn) => ({ caster_max_hp: soulburn ? 37.5 : 25 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  clarissa: {
    name: 'Dorin',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 934,
    baseHP: 4799,
    baseDef: 564,
    form: [elements.caster_enrage],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        isExtra: true,
        aoe: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.05 : 0.8,
        pow: 1,
        mult: () => elements.caster_enrage.value() ? 1.3 : 1,
        multTip: () => ({ caster_rage: 30 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  baiken: {
    name: 'Drizella',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 989,
    baseHP: 5364,
    baseDef: 473,
    form: [elements.target_bleed_detonate],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.85 : 1.6,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        detonate: dot.bleed,
        detonation: () => 1.3,
        single: true,
      }
    }
  },
  baal_and_sezan: {
    name: 'Edalia',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 961,
    baseHP: 4152,
    baseDef: 683,
    form: [elements.target_nb_debuff],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (elements.target_nb_debuff.value() * 0.2),
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.15, 0, 0.15]
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.35 : 1.1,
        pow: 0.9,
        mult: () => 1 + (elements.target_nb_debuff.value() * 0.2),
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 0.8,
        pow: 1,
        mult: () => 1 + (elements.target_nb_debuff.value() * 0.2),
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  armin: {
    name: 'Eimi',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 571,
    baseDef: 683,
    baseHP: 5769,
    form: [elements.caster_defense, elements.caster_defense_increase],
    barrier: () => elements.caster_defense.value() * 1,
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.8,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 0.6,
        flatTip: () => ({ caster_defense: 60 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  yuna: {
    name: 'Erica',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 925,
    baseHP: 5122,
    baseDef: 553,
    form: [elements.caster_speed, elements.nb_targets],
    skills: {
      s1: {
        onlyCrit: true,
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 0.85 : 0.6,
        pow: 0.8,
        mult: () => {
          let mult = 1 + elements.caster_speed.value() * 0.00075;
          switch (elements.nb_targets.value()) {
          case 3: mult += 0.2; break;
          case 2: mult += 0.4; break;
          case 1: mult += 0.6; break;
          }
          return mult;
        },
        multTip: () => ({ caster_speed: 0.075, per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        onlyCrit: true,
        rate: 1.5,
        pow: 0.8,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 3: return 1.2;
          case 2: return 1.4;
          case 1: return 1.6;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  crimson_armin: {
    name: 'Ermes',
    element: element.light,
    classType: classType.knight,
    baseAtk: 671,
    baseDef: 645,
    baseHP: 5364,
    form: [elements.caster_defense, elements.caster_defense_increase],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.6,
        flatTip: () => ({ caster_defense: 60 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  montmorancy: {
    name: 'Euphemia',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 390,
    baseHP: 4111,
    baseDef: 669,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  straze: {
    name: 'Eva',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 989,
    baseHP: 5364,
    baseDef: 553,
    form: [elements.nb_targets, elements.target_is_highest_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 1: return 1.6;
          case 2: return 1.4;
          case 3: return 1.2;
          default: return 1;
          }
        },
        multTip: () => ({per_fewer_target: 20}),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 0.95,
        pow: 1,
        penetrate: () => document.getElementById('target-is-highest-max-hp').checked ? 1.0 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  martial_artist_ken: {
    name: 'Felicia',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1025,
    baseHP: 5122,
    baseDef: 585,
    form: [elements.caster_hp_pc],
    skills: {
      s1: {
        rate: (soulburn) => soulburn ? 1.3 : 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
        soulburn: true,
        onlyCrit: (soulburn) => soulburn
      },
      s2: {
        onlyCrit: true,
        rate: 0.95,
        pow: 1,
        mult: () => {
          return (1 + (100 - elements.caster_hp_pc.value()) * 0.004);
        },
        multTip: () => ({ caster_lost_hp_pc: 40 }),
        penetrate: () => 0.4,
        enhance: [0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        onlyCrit: true,
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  ken: {
    name: 'Feliz',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 816,
    baseHP: 5850,
    baseDef: 620,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    dot: [dot.burn],
    skills: {
      s1: {
        hpScaling: true,
        rate: 1,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 1.2,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 1.5,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.3,
        flatTip: () => ({ caster_max_hp: 30 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.15],
        single: true,
      }
    }
  },
  mirsa: {
    name: 'Financier',
    element: element.light,
    classType: classType.thief,
    baseAtk: 735,
    baseHP: 3990,
    baseDef: 501,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.5 : 1.8,
        pow: 0.85,
        mult: () => 1 + elements.caster_speed.value() * 0.0015,
        multTip: () => ({ caster_speed: 0.15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
      }
    }
  },
  charles: {
    name: 'Gaeta',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 762,
    baseHP: 5728,
    baseDef: 634,
    form: [elements.caster_nb_buff, elements.nb_targets],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: () => 1.5 + elements.caster_nb_buff.value() * 0.07,
        pow: 1,
        enhance: [0.1, 0, 0.1, 0, 0.1],
        single: true,
      },
      s3: {
        rate: 1.2,
        pow: 1,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 3: return 1.267;
          case 2: return 1.534;
          case 1: return 1.801;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 26.7 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  closer_charles: {
    name:  'Gail',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 989,
    baseHP: 5364,
    baseDef: 473,
    form: [elements.target_hp_pc, elements.caster_perception],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_alt: {
        rate: 1.4,
        pow: 1,
        name: 'Desperate Sword Dance',
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.004,
        multTip: () => ({ target_lost_hp_pc: 0.4 }),
        enhance_from: 's1',
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.25 : 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  rose: {
    name: 'Galornia',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 671,
    baseDef: 645,
    baseHP: 5364,
    form: [elements.caster_defense, elements.caster_defense_increase],
    barrier: () => elements.caster_defense.value(),
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.7,
        flatTip: () => ({caster_defense: 70}),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  sigret: {
    name: 'Gerrimore',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 989,
    baseHP: 5364,
    baseDef: 553,
    form: [elements.target_nb_debuff],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        canExtra: true,
        single: true,
      },
      s2: {
        rate: 1.25,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.7,
        pow: 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        penetrate: () => Math.min(0.3 + elements.target_nb_debuff.value() * 0.1, 1.0),
        single: true,
      },
    }
  },
  dingo: {
    name: 'Giselle',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 807,
    baseHP: 4637,
    baseDef: 592,
    dot: [dot.bleed, dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  butcher_corps_inquisitor: {
    name: 'Grace',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 689,
    baseHP: 4718,
    baseDef: 606,
    form: [elements.caster_hp_pc],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.5,
        pow: 0.85,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.005,
        multTip: () => ({ caster_lost_hp_pc: 0.5 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
      },
    }
  },
  last_rider_krau: {
    name: 'Guardian Ariel',
    element: element.light,
    classType: classType.knight,
    baseAtk: 689,
    baseHP: 5647,
    baseDef: 690,
    form: [elements.caster_max_hp, elements.attack_skill_stack_3, elements.caster_speed, elements.caster_hp_increase],
    barrier: () => elements.caster_max_hp.value() * 0.1,
    barrierEnhance: 's2',
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => 0.1 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
      },
      s3: {
        hpScaling: true,
        spdScaling: true,
        noCrit: true,
        rate: 0.3,
        pow: 1,
        flat: () => 0.06 * elements.caster_max_hp.value(),
        flatTip: () => ({ caster_max_hp: 6 }),
        mult: () => 1 + (elements.attack_skill_stack_3.value() * 0.2) + (elements.caster_speed.value() * 0.001215),
        multTip: () => ({ per_stack: 20, caster_speed: 0.1215 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  wanda: {
    name: 'Haleth',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 744,
    baseHP: 4273,
    baseDef: 532,
    skills: {
      s1: {
        rate: 0.9,
        pow: 0.95,
        mult: () => elements.target_has_target.value() ? 1.35 : 1,
        multTip: () => ({ target_debuff: 35 }),
        enhance: [0.05, 0, 0, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0, 0.15, 0.15],
        single: true,
      }
    }
  },
  dominiel: {
    name: 'Haluti',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 807,
    baseHP: 4596,
    baseDef: 645,
    barrier: (hero) => hero.getAtk(),
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 0.75,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  cermia: {
    name: 'Heidi',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1025,
    baseHP: 5122,
    baseDef: 585,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        canExtra: true,
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.65 : 1.15,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        penetrate: () => 0.5,
        single: true,
      },
    }
  },
  kawerik: {
    name: 'Heroic',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1061,
    baseHP: 3828,
    baseDef: 652,
    form: [elements.caster_speed, elements.target_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.4,
        pow: 1,
        mult: () => 1 + elements.target_speed.value() * 0.003231,
        multTip: () => ({ target_speed: 0.3231 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 0.8,
        pow: 1.14,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        penetrate: () => 0.3,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  kise: {
    name: 'Hestia',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 961,
    baseHP: 4718,
    baseDef: 522,
    barrier: (hero) => hero.getAtk() * 0.65,
    form: [elements.target_has_buff, elements.caster_stealth, elements.caster_hp_pc],
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.4 : 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        mult: () => elements.target_has_buff.value() ? 1.7 : 1.0,
        multTip: () => ({target_has_buff: 70}),
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        penetrate: () => elements.caster_stealth.value() ? 0.6 : 0.3,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.6,
        pow: 1,
        mult: () => 1 + elements.caster_hp_pc.value() * 0.0035,
        multTip: () => ({ caster_left_hp_pc: 0.35 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  celeste: {
    name: 'Hinorie',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 735,
    baseHP: 4313,
    baseDef: 494,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.25 : 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  rimuru: {
    name: 'HongKongDoll',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 889,
    baseHP: 5364,
    baseDef: 592,
    form: [elements.allies_nb_buff],
    skills: {
      s1: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.65,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        isExtra: true,
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1,
        fixed: (hitType) => (hitType !== hitTypes.miss) ? Math.min(5000 + (elements.allies_nb_buff.value() * 625), 10000) : 0,
        fixedTip: () => ({ allies_buff: 625 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  nemunas: {
    name: 'Ingloroe',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 707,
    baseHP: 4435,
    baseDef: 525,
    form: [elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.7 : 1,
        pow: 0.8,
        flat: (soulburn) => elements.target_max_hp.value() * (soulburn ? 0.085 : 0.05),
        flatTip: (soulburn) => ({ target_max_hp: soulburn ? 8.5 : 5 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
      }
    }
  },
  mercedes: {
    name: 'Ith',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 952,
    baseHP: 4071,
    baseDef: 627,
    form: [elements.nb_targets],
    skills: {
      s1: {
        rate: 0.8,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 0.9 : 0.7,
        pow: 0.9,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 1: return 1.9;
          case 2: return 1.6;
          case 3: return 1.3;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 30 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      },
      s2_bis: {
        name: infoLabel('s2_wave_2'),
        rate: 0.35,
        pow: 0.9,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 1: return 1.9;
          case 2: return 1.6;
          case 3: return 1.3;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 30 }),
        enhance_from: 's2',
        aoe: true,
      },
      s3: {
        rate: 1.15,
        pow: 0.95,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  elson: {
    name: 'Janice',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 390,
    baseHP: 4111,
    baseDef: 669,
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  sez: {
    name: 'Janis',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 989,
    baseHP: 5364,
    baseDef: 473,
    form: [elements.target_hp_pc],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s1_bis: {
        name: infoLabel('sez_encroach'),
        rate: 0.5,
        pow: 1,
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.003,
        multTip: () => ({ target_lost_hp_pc: 0.3 }),
        enhance_from: 's1',
        aoe: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 3.2 : 2.0,
        pow: 0.95,
        mult: (soulburn) => 1 + (100 - elements.target_hp_pc.value()) * (soulburn ? 0.007 : 0.003),
        multTip: (soulburn) => ({ target_lost_hp_pc: soulburn ? 0.7 : 0.3 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      },
      explosion: { // TODO: change this to be aftermath on s3 with an input for enemy killed?
        name: infoLabel('sez_explosion'),
        rate: 0,
        pow: 0,
        afterMath: () => ({ atkPercent: 1.5, penetrate: 0.7 }),
        noCrit: true,
        noMiss: true,
      }
    }
  },
  tieria: {
    name: 'Jen',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 689,
    baseHP: 4677,
    baseDef: 543,
    form: [elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0.15, 0],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 0.9,
        flat: () => elements.target_max_hp.value() * 0.06,
        flatTip: () => ({ target_max_hp: 6 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      },
    }
  },
  silver_blade_aramintha: {
    name: 'Jocelyn',
    element: element.light,
    classType: classType.mage,
    baseAtk: 961,
    baseHP: 4152,
    baseDef: 683,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 0.5,
        pow: 1.3,
        enhance_from: 's1',
        aoe: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  achates: {
    name: 'Joyce',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 453,
    baseHP: 4152,
    baseDef: 662,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
    }
  },
  surin: {
    name: 'Julia',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 789,
    baseHP: 4677,
    baseDef: 497,
    form: [elements.target_nb_bleed],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1.4,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 0.8,
        mult: () => elements.target_nb_bleed.value() > 0 ? 1.25 + (Math.min(elements.target_nb_bleed.value(), 5) - 1) * 0.25 : 1,
        multTip: () => ({ per_bleed: 25 }),
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        single: true,
      },
    }
  },
  lucy: {
    name: 'Kagura',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 408,
    baseHP: 4313,
    baseDef: 624,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },

  cartuja: {
    name: 'Kalici',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 753,
    baseHP: 5405,
    baseDef: 578,
    form: [elements.caster_max_hp, elements.caster_hp_increase, elements.caster_hp_pc],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        soulburn: true,
        rate: (soulburn) => (elements.caster_hp_pc.value() < 75 ? 1 : 0.6) + (soulburn ? 0.2 : 0),
        pow: 1,
        flat: (soulburn) => {
          if (soulburn) {
            return elements.caster_max_hp.value() * (elements.caster_hp_pc.value() < 75 ? 0.1 : 0.08);
          } else {
            return elements.caster_max_hp.value() * (elements.caster_hp_pc.value() < 75 ? 0.0625 : 0.05);
          }
        },
        flatTip: (soulburn) => (elements.caster_hp_pc.value() < 75)
          ? { caster_hp_pc_under_hp_threshold: soulburn ? 10 : 6.25 }
          : { caster_hp_pc_over_hp_threshold: soulburn ? 8 : 5 },
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  arowell: {
    name: 'Katilda',
    element: element.light,
    classType: classType.knight,
    baseAtk: 608,
    baseHP: 4960,
    baseDef: 617,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    barrier: () => elements.caster_max_hp.value() * 0.2,
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({caster_max_hp: 5}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.75,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.15,
        flatTip: () => ({caster_max_hp: 15}),
        enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  coli: {
    name: 'Kothir',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 907,
    baseHP: 5001,
    baseDef: 462,
    barrier: (hero) => hero.getAtk() * 1,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.8,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s1_alt: {
        spdScaling: true,
        rate: 0.8,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 1.2,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.5,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.001215,
        multTip: () => ({ caster_speed: 0.1215 }),
        enhance: [0.05, 0.1, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  faithless_lidica: {
    name: 'Laiisma',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 898,
    baseHP: 4879,
    baseDef: 571,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.4,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      },
    }
  },
  judith: {
    name: 'Lana',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 698,
    baseHP: 3869,
    baseDef: 494,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  lorina: {
    name: 'Layla',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 843,
    baseHP: 4475,
    baseDef: 543,
    form: [elements.target_max_hp, elements.target_hp_pc, elements.attack_skill_stack_5],
    atkUp: () => {
      let boost = 0.1;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.lorina.skills.s2.enhance[i];
      }

      return 1 + elements.attack_skill_stack_5.value() * boost;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        flat: () => elements.target_max_hp.value() * 0.02,
        flatTip: () => ({ target_max_hp: 2 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s2: {
        enhance: [0.005, 0.005, 0.01, 0.01, 0.02]
      },
      s3: {
        rate: 1.5,
        pow: 0.95,
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.005,
        multTip: () => ({ target_lost_hp_pc: 0.5 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  lots: {
    name: 'Lina',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 453,
    baseHP: 4152,
    baseDef: 662,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  rin: {
    name: 'Lottie',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 444,
    baseHP: 4637,
    baseDef: 652,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({caster_max_hp: 7}),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  cidd: {
    name: 'Louis',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 807,
    baseHP: 4677,
    baseDef: 473,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: () => elements.caster_speed_up.value() ? 1.5 : 0.9,
        pow: () => elements.caster_speed_up.value() ? 0.9 : 0.95,
        mult: () => 1 + (elements.caster_speed.value() * elements.caster_speed_up.value() ? 0.00075 : 0.00081),
        multTip: () => ({ caster_speed: elements.caster_speed_up.value() ? 0.075 : 0.081 }),
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.6,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.0021,
        multTip: () => ({ caster_speed: 0.21 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        elemAdv: () => elements.caster_speed_up.value(),
        single: true,
      }
    }
  },
  tenebria: {
    name: 'Lucia',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1025,
    baseHP: 4475,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.35 : 1.1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  specter_tenebria: {
    name: 'Lucima',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 961,
    baseHP: 4152,
    baseDef: 683,
    form: [elements.target_nb_debuff, elements.dead_people, elements.s3_on_cooldown],
    atkUp: () => {
      let buff = 0.07;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        buff += heroes.specter_tenebria.skills.s2.enhance[i];
      }
      return 1 + Math.min(elements.dead_people.value(), 5) * buff;
    },
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.05, 0.15],
        single: () => !elements.s3_on_cooldown.value(),
      },
      s2: {
        enhance: [0.005, 0.01, 0.015],
      },
      s3: {
        rate: 1.8,
        pow: 0.95,
        mult: () => 1 + elements.target_nb_debuff.value() * 0.2,
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  tempest_surin: {
    name: 'Naksha',
    element: element.light,
    classType: classType.thief,
    baseAtk: 862,
    baseHP: 4960,
    baseDef: 511,
    form: [elements.caster_hp_pc],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.0015,
        multTip: () => ({ caster_lost_hp_pc: 15 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.25 : 1,
        pow: 1.05,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.002,
        multTip: () => ({ caster_lost_hp_pc: 20 }),
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
 bask: {
    name: 'Maeve',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 653,
    baseHP: 5122,
    baseDef: 617,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0.1, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  ray: {
    name: 'Mandragora',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 544,
    baseHP: 4435,
    baseDef: 655,
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0.1, 0.15],
        single: true,
      }
    }
  },
  free_spirit_tieria: {
    name: 'Marsha',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 807,
    baseHP: 4637,
    baseDef: 592,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.5 : 1.8,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.05, 0.15],
        single: true,
      }
    }
  },
  schuri: {
    name: 'Matilda',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 843,
    baseHP: 4799,
    baseDef: 536,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  aither: {
    name: 'Mikael',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 562,
    baseHP: 3828,
    baseDef: 634,
    barrier: (hero) => hero.getAtk(),
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  serila: {
    name: 'Milian',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 980,
    baseHP: 3869,
    baseDef: 683,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1.5,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      }
    }
  },
  angelica: {
    name: 'Moira',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 426,
    baseHP: 4475,
    baseDef: 701,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    barrier: () => elements.caster_max_hp.value() * 0.15,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  otillie: {
    name: 'Mulier',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 885,
    baseHP: 4693,
    baseDef: 617,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      }
    }
  },
  tempest_surin: {
    name: 'Naksha',
    element: element.light,
    classType: classType.thief,
    baseAtk: 789,
    baseHP: 4677,
    baseDef: 497,
    form: [elements.caster_hp_pc],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.0015,
        multTip: () => ({ caster_lost_hp_pc: 0.15 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.25 : 1,
        pow: 1.05,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.002,
        multTip: () => ({ caster_lost_hp_pc: 0.2 }),
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  lidica: {
    name: 'Naranthir',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 961,
    baseHP: 4556,
    baseDef: 536,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.6,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  benimaru: {
    name: 'Neko Matsuri',
    element: element.fire,
    classType: classType.warrior,
    form: [elements.caster_has_multilayer_barrier],
    baseAtk: 943,
    baseHP: 5122,
    baseDef: 553,
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.7 : 1,
        pow: 1,
        mult: () => 1 + (elements.caster_has_multilayer_barrier.value() ? 0.3 : 0),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.2,
        pow: 1,
        penetrate: () => elements.caster_has_multilayer_barrier.value() ? 0.6 : 0.3,
        isExtra: true,
        aoe: true,
      },
      s3: {
        rate: 2,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
    }
  },
  violet: {
    name: 'Nenookaasi',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 989,
    baseHP: 5364,
    baseDef: 473,
    form: [elements.caster_nb_focus, elements.caster_perception],
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        mult: () => 1 + elements.caster_nb_focus.value() * 0.15,
        multTip: () => ({ per_focus: 15 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  church_of_ilryos_axe: {
    name: 'Neva',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 843,
    baseHP: 4475,
    baseDef: 543,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    dot: [dot.bleed],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.85,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.75,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        hpScaling: true,
        rate: 1.2,
        pow: 0.9,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0.05, 0.05, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  angel_of_light_angelica: {
    name: 'Noah',
    element: element.light,
    classType: classType.mage,
    baseAtk: 890,
    baseHP: 4879,
    baseDef: 673,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.1, 0, 0.1, 0, 0.1],
        single: true,
      }
    }
  },
  tamarinne: {
    name: 'Noclyn',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 807,
    baseHP: 3950,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1,
        pow: 0.75,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.15]
      }
    }
  },
  designer_lilibet: {
    name: 'Obsidian',
    element: element.dark,
    classType: classType.warrior,
    form: [elements.caster_defense, elements.caster_defense_increase],
    baseAtk: 825,
    baseDef: 599,
    baseHP: 5769,
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.6,
        pow: 1,
        flat: () => elements.caster_defense.value() * 1.0,
        flatTip: () => ({ caster_defense: 100 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 0.6,
        pow: 1,
        flat: () => elements.caster_defense.value() * 1.15,
        flatTip: () => ({ caster_defense: 115 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        penetrate: () => 0.5,
        aoe: true,
      }
    }
  },
  basar: {
    name: 'Odea',
    element: element.earth,
    baseAtk: 1070,
    baseHP: 4111,
    baseDef: 715,
    classType: classType.mage,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        rate: 0.9,
        pow: 0.9,
        enhance: [0.05, 0.1, 0, 0.1, 0.15],
        aoe: true,
      },
    }
  },
  jena: {
    name: 'Olga',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 862,
    form: [elements.target_nb_debuff],
    baseHP: 4071,
    baseDef: 599,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        mult: () => 1 + elements.target_nb_debuff.value()*0.1,
        multTip: () => ({ per_target_debuff: 10 }),
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.1 : 0.85,
        rate: 0.85,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  desert_jewel_basar: {
    name: 'Olive',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 807,
    baseHP: 3950,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  corvus: {
    name: 'Opaeni',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 753,
    baseDef: 578,
    baseHP: 5405,
    form: [elements.caster_defense, elements.caster_defense_increase, elements.caster_enrage],
    skills: {
      s1: {
        defenseScaling: true,
        rate: () => elements.caster_enrage.value() ? 0.9 : 0.7,
        pow: 1,
        flat: () => (elements.caster_enrage.value() ? 1.2 : 0.9) * elements.caster_defense.value(),
        flatTip: () => ({ caster_defense: elements.caster_enrage.value() ? 120 : 90 }),
        enhance: [0.05, 0.05, 0, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        defenseScaling: true,
        rate: 0.3,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  jecht: {
    name: 'Pamela',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 662,
    baseHP: 3505,
    baseDef: 599,
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  gloomyrain: {
    name: 'Pantasia',
    element: element.light,
    classType: classType.mage,
    form: [elements.caster_has_debuff],
    baseAtk: 889,
    baseHP: 4071,
    baseDef: 613,
    atkUp: () => {
      if (!elements.caster_has_debuff.value()) return 1;

      let boost = 0.2;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.gloomyrain.skills.s2.enhance[i];
      }

      return 1 + boost;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.05, 0.1],
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 0.95 : 0.7,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15, 0],
        aoe: true,
      }
    }
  },
  mistychain: {
    name: 'Patea',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 952,
    baseHP: 3505,
    baseDef: 606,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.3,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.2 : 1.5,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  requiemroar: {
    name: 'Pennecus',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 698,
    baseHP: 3626,
    baseDef: 613,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.7 : 1.8,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
    }
  },
  rikoris: {
    name: 'Petit',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 735,
    baseHP: 4677,
    baseDef: 550,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        aoe: true,
      }
    }
  },
  doris: {
    name: 'Petra',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 390,
    baseHP: 4152,
    baseDef: 666,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  iseria: {
    name: 'Preema',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 925,
    baseHP: 5122,
    baseDef: 553,
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 2,
        pow: 0.9,
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  fairytale_tenebria: {
    name: 'Projekt Melody',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 889,
    baseHP: 4879,
    baseDef: 673,
    form: [elements.target_has_provoke, elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        isExtra: true,
        rate: 0.8,
        pow: 1,
        extraDmg: (hitType) => hitType !== hitTypes.miss && elements.target_has_provoke.value() ? elements.target_max_hp.value() * 0.15 : 0,
        extraDmgTip: () => ({ target_max_hp: elements.target_has_provoke.value() ? 15 : 0 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.10],
        aoe: true,
      },
    }
  },
  jack_o: {
    name: 'Pumpkin Pixie Layla',
    element: element.fire,
    classType: classType.warrior,
    form: [elements.target_has_debuff],
    baseAtk: 1228,
    baseHP: 5784,
    baseDef: 553,
    skills: {
      s1: {
        rate: 0.75,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 1.1,
        pow: 1,
        isExtra: true,
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        mult: () => elements.target_has_debuff.value() ? 1.5 : 1,
        multTip: () => ({ target_has_debuff: 50 }),
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  mucacha: {
    name: 'Queenie',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 780,
    baseHP: 4475,
    baseDef: 518,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.5,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  conqueror_lilias: {
    name: 'Radiant Vow Ith',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 735,
    baseHP: 5405,
    baseDef: 613,
    skills: {
      s1: {
        rate: 1.2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  ae_karina: {
    name: 'Radiant Vow Rubi',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 671,
    baseDef: 648,
    baseHP: 5809,
    form: [elements.caster_defense, elements.caster_defense_increase],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () =>  elements.caster_defense.value() * 1.0,
        flatTip: () => ({ caster_defense: 100 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_defense.value() * 0.5,
        flatTip: () => ({ caster_defense: 50 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      explosion: { 
        name: infoLabel('karina_explosion'),
        rate: 0,
        pow: 0,
        afterMath: () => ({ defPercent: 1.4, penetrate: 0.7 }),
        noCrit: true,
        noMiss: true,
      }
    }
  },
  radiant_vow_teddy_ith: {
    name: 'Radiant Vow Teddy Ith',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 608,
    baseHP: 4960,
    baseDef: 617,
    skills: {
      s1: {
        rate: 0.2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  diene: {
    name: 'Rafael',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 499,
    baseHP: 4435,
    baseDef: 694,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0, 0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  lua: {
    name: 'Redeemer Lucia',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 843,
    baseHP: 5122,
    baseDef: 561,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  kayron: {
    name: 'Rosalie',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 889,
    baseHP: 4920,
    baseDef: 483,
    form: [elements.caster_hp_pc],
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.1 : 0.9,
        pow: 1,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.002,
        multTip: () => ({ caster_lost_hp_pc: 0.2 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.7,
        pow: 0.9,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.003,
        multTip: () => ({ caster_lost_hp_pc: 0.3 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  ras: {
    name: 'Rubi',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 608,
    baseHP: 4960,
    baseDef: 617,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.9,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.9,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.04,
        flatTip: () => ({ caster_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
    }
  },
  aramintha: {
    name: 'Runiata',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 961,
    baseHP: 4152,
    baseDef: 683,
    form: [elements.target_burn_detonate],
    dot: [dot.burn],
    barrier: (hero) => hero.getAtk() * 1.2,
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        detonate: [dot.burn],
        detonation: () => 1.1,
        enhance: [0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  emilia: {
    name: 'Saika',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 499,
    baseHP: 4435,
    baseDef: 694,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    barrier: () => elements.caster_max_hp.value() * 0.15,
    skills: {
      s1: {
        rate: 0.95,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0.05, 0, 0.1, 0.1],
        single: true
      }
    }
  },
 azalea: {
    name: 'Scarlett',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 798,
    baseHP: 4879,
    baseDef: 539,
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0, 0.1, 0, 0.15, 0],
        single: true,
      },
      s2: {
        rate: 1.5,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        aoe: true,
      },
    }
  },
seaside_bellona: {
    name: 'Seaside Noclyn',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 1024,
    baseHP: 4879,
    baseDef: 571,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.7,
        pow: 1,
        mult: () => 1.1,
        multTip: () => (1.1),
        enhance: [0.05, 0.1, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  charlotte: {
    name: 'Senica',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 834,
    baseHP: 5405,
    baseDef: 662,
    skills: {
      s1: {
        onlyCrit: true,
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        onlyCrit: true,
        rate: 1.4,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  cecilia: {
    name: 'Shani',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 671,
    baseHP: 5809,
    baseDef: 648,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        hpScaling: true,
        rate: 0.4,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.06,
        flatTip: () => ({ caster_max_hp: 6 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        hpScaling: true,
        rate: 0.6,
        pow: 1.05,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  fallen_cecilia: {
    name: 'Shani in Despair',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 744,
    baseHP: 5890,
    baseDef: 655,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    barrier: () => elements.caster_max_hp.value() * 0.13,
    barrierEnhance: 's2',
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.07,
        flatTip: () => ({ caster_max_hp: 7 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
      },
      s3: {
        hpScaling: true,
        rate: 0.65,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  landy: {
    name: 'Shinonome ft. Fang',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 925,
    baseHP: 5122,
    baseDef: 553,
    form: [elements.caster_full_fighting_spirit, elements.attack_skill_stack_3],
    atkUp: () => {
      let boost = 0.15;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.landy.skills.s2.enhance[i];
      }

      return 1 + elements.attack_skill_stack_3.value() * boost;
    },
    skills: {
      s1: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.005, 0.005, 0.01, 0.01, 0.02]
      },
      s3: {
        aoe: true,
        rate: 0.9,
        pow: 1,
        penetrate: () => elements.caster_full_fighting_spirit.value() ? 0.5 : 0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1]
      }
    }
  },
  alexa: {
    name: 'Silbal',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 789,
    baseHP: 4152,
    baseDef: 494,
    form: [elements.target_nb_debuff],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0.15],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 0.75,
        pow: 1,
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 0.9,
        mult: () => 1 + elements.target_nb_debuff.value() * 0.15,
        multTip: ()=> ({ per_target_debuff: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        single: true,
      }
    }
  },
  taranor_royal_guard: {
    name: 'Silvina',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 653,
    baseHP: 5122,
    baseDef: 617,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.8,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.025,
        flatTip: () => ({ caster_max_hp: 2.5 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        hpScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2.3 : 1.5,
        pow: 0.95,
        flat: () => elements.caster_max_hp.value() * 0.05,
        flatTip: () => ({ caster_max_hp: 5 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  remnant_violet: {
    name: 'Spider Lily Julia',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 961,
    baseHP: 4718,
    baseDef: 522,
    form: [elements.caster_perception],
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        penetrate: () => 0.5,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  holiday_yufine: {
    name: 'Springtime Celeste',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 889,
    baseHP: 5364,
    baseDef: 592,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
      },
      s2: {
        name: 'S1 AoE Version (Self Turn)',
        rate: 0.8,
        pow: 1,
        enhance: [0.1, 0, 0.2, 0, 0.3],
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0.15],
        aoe: true,
      }
    }
  },
  summertime_iseria: {
    name: 'Springtime Mina',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 853,
    baseHP: 5284,
    baseDef: 585,
    form: [elements.target_bomb_detonate],
    dot: [dot.bomb],
    innateAtkUp: () => {
      let boost = 0.35;
      for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
        boost += heroes.summertime_iseria.skills.s2.enhance[i];
      }

      return boost;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
        noCrit: true,
      },
      s2: {
        enhance: [0.02, 0.02, 0.03, 0.03, 0.05],
      },
      s3: {
        rate: 1.2,
        pow: 1,
        detonate: dot.bomb,
        detonation: () => 1.1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
        noCrit: true,
      },
    }
  },
  lethe: {
    name: 'Successor Mikael',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 735,
    baseHP: 5405,
    baseDef: 613,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s2: {
        hpScaling: true,
        name: infoLabel('lethe_call_of_the_abyss'),
        rate: 0.3,
        pow: 1.3,
        flat: () => elements.caster_max_hp.value() * 0.22,
        flatTip: () => ({caster_max_hp: 22}),
        penetrate: () => 1,
        noCrit: true,
        isExtra: true,
        aoe: true,
      },
      s3: {
        rate: 1,
        pow: 1.05,
        enhance: [0.0, 0.1, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  elphelt_valentine: {
    name: 'Summertime Joyce',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 853,
    baseHP: 5284,
    baseDef: 585,
    form: [elements.target_nb_debuff],
    skills: {
      s1: {
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        mult: () => 1 + (elements.target_nb_debuff.value() * 0.2),
        multTip: () => ({ per_target_debuff: 20 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s3: {
        rate: 1.1,
        pow: 1.1,
        enhance: [0.05, 0, 0, 0, 0.15],
        single: true,
      }
    }
  },
  roana: {
    name: 'Summertime Petra',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 471,
    baseHP: 4637,
    baseDef: 736,
    form: [elements.caster_max_hp, elements.caster_hp_increase],
    barrierSkills: ['S1', 'S3'],
    barrier: () => {
      const scale = [0, 0.05, 0, 0.1, 0, 0.1, 0];
      let boost = 1.0;
      for (let i = 0; i < Number(document.getElementById('molagora-s1').value); i++) {
        boost += scale[i];
      }

      return elements.caster_max_hp.value() * 0.1 * boost;
    },
    barrier2: () => {
      return elements.caster_max_hp.value() * 0.15;
    },
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      }
    }
  },
  rem:{
    name: 'Swimsuit Specter Janis',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 971,
    baseHP: 5567,
    baseDef: 582,
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        canExtra: true,
        single: true
      },
      s2: {
        rate: 0.8, 
        pow: 1.3,
        aoe: true
      },
      s3: {
        rate: 1, 
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true
      }
    }
  },
  sven: {
    name: 'Taryn',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 816,
    baseHP: 4677,
    baseDef: 452,
    form: [elements.caster_hp_pc],
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s1_extra: {
        name: infoLabel('s1_extra_attack'),
        rate: 0.7,
        pow: 1,
        enhance_from: 's1',
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.003,
        multTip: () => ({ caster_lost_hp_pc: 0.3 }),
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1 : 0.8,
        pow: 0.8,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.005,
        multTip: () => ({ caster_lost_hp_pc: 0.5 }),
        enhance: [0.05, 0.05, 0.1, 0, 0.1, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  roozid: {
    name: 'Taya',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 608,
    baseHP: 3950,
    baseDef: 462,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.8,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 1.2,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001215,
        multTip: () => ({ caster_speed: 0.1215 }),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  teddy_ith: {
    name: 'Teddy Ith',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 699,
    baseHP: 4712,
    baseDef: 617,
    form: [elements.nb_targets],
    skills: {
      s1: {
        rate: 0.2,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
      },
      s2: {
        rate: 0.18,
        pow: 0.9,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 1: return 1.9;
          case 2: return 1.6;
          case 3: return 1.3;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 30 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s2_bis: {
        name: infoLabel('s2_wave_2'),
        rate: 0.08,
        pow: 0.9,
        mult: () => {
          switch (elements.nb_targets.value()) {
          case 1: return 1.9;
          case 2: return 1.6;
          case 3: return 1.3;
          default: return 1;
          }
        },
        multTip: () => ({ per_fewer_target: 30 }),
        enhance_from: 's2',
        aoe: true,
      },
      s3: {
        rate: 0.25,
        pow: 0.95,
        critDmgBoost: () => 0.2,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  zeno: {
    name: 'Theresa',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 889,
    baseHP: 4879,
    baseDef: 673,
    form: [elements.caster_max_hp, elements.non_attack_skill_stack_5, elements.caster_hp_increase],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        mult: () => {
          let extra = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            extra += heroes.zeno.skills.s2.enhance[i];
          }

          return 1 + elements.non_attack_skill_stack_5.value() * (0.12 + extra);
        },
        multTip: () => {
          let extra = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            extra += heroes.zeno.skills.s2.enhance[i] * 100;
          }

          return { per_stack: 12 + extra };
        },
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.005, 0.005, 0.005, 0.01, 0.015],
      },
      s3: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        mult: () => {
          let extra = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            extra += heroes.zeno.skills.s2.enhance[i];
          }

          return 1 + elements.non_attack_skill_stack_5.value() * (0.12 + extra);
        },
        multTip: () => {
          let extra = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            extra += heroes.zeno.skills.s2.enhance[i] * 100;
          }

          return { per_stack: 12 + extra };
        },
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  helga: {
    name: 'Tina',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 780,
    baseHP: 4475,
    baseDef: 518,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.05, 0, 0.1, 0, 0.1],
        single: true,
      },
      s2: {
        rate: 1.55,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  taranor_guard: {
    name: 'Tracy',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 735,
    baseHP: 4677,
    baseDef: 550,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1.8,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  leo: {
    name: 'Trist',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 780,
    baseHP: 4960,
    baseDef: 564,
    skills: {
      s1: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 1.35,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.8,
        pow: 0.8,
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
 elena: {
    name: 'Urd',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 499,
    baseHP: 4435,
    baseDef: 694,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  rima: {
    name: 'Vanessa',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 617,
    baseHP: 4273,
    baseDef: 561,
    skills: {
      s1: {
        rate: 1,
        pow: 0.8,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
        single: true,
      },
      s2: {
        rate: 1.3,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  assassin_cidd: {
    name: 'Vengeful Louis',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 780,
    baseHP: 4354,
    baseDef: 497,
    form: [elements.caster_speed, elements.target_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1.5,
        pow: 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.001215 + elements.target_speed.value() * 0.003,
        multTip: () => ({ caster_speed: 0.1215, target_speed: 0.3 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  assassin_coli: {
    name: 'Vengeful Kothir',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 744,
    baseHP: 4879,
    baseDef: 469,
    form: [elements.caster_speed, elements.caster_stealth],
    skills: {
      s1: {
        spdScaling: true,
        rate: () => elements.caster_stealth.value() ? 1.2 : 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00081,
        multTip: () => ({ caster_speed: 0.081 }),
        enhance: [0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 3 : 1.5,
        pow: 0.8,
        mult: () => 1 + elements.caster_speed.value() * 0.001215,
        multTip: () => ({ caster_speed: 0.1215 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
      }
    }
  },
  pyllis: {
    name: 'Veritte',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 535,
    baseDef: 645,
    baseHP: 6203,
    form: [elements.caster_defense, elements.caster_defense_increase, elements.caster_attacked_stack_3],
    barrier: () => elements.caster_defense.value() * (1 + elements.caster_attacked_stack_3.value() * 0.1) * 0.6,
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.7,
        pow: 1,
        flat: () => elements.caster_defense.value() * (1 + elements.caster_attacked_stack_3.value() * 0.1) * 0.5,
        flatTip: () => ({ caster_defense: 50, per_stack: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        defenseScaling: true,
        rate: 1.3,
        pow: 0.95,
        flat: () => elements.caster_defense.value() * (1 + elements.caster_attacked_stack_3.value() * 0.1) * 0.7,
        flatTip: () => ({ caster_defense: 70, per_stack: 10 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  adlay: {
    name: 'Yerica',
    element: element.earth,
    classType: classType.mage,
    baseAtk: 816,
    baseHP: 3505,
    baseDef: 606,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  hurado: {
    name: 'Yibee',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 780,
    baseHP: 4152,
    baseDef: 585,
    skills: {
      s1: {
        rate: 1,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s3: {
        rate: 0.9,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  kluri: {
    name: 'Zaphael',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 553,
    baseDef: 596,
    baseHP: 5041,
    form: [elements.caster_defense, elements.caster_defense_increase],
    skills: {
      s1: {
        defenseScaling: true,
        rate: 0.5,
        pow: 0.9,
        flat: () => elements.caster_defense.value() * 0.7,
        flatTip: () => ({ caster_defense: 70 }),
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.15],
        single: true,
      }
    }
  },
};
