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
  abigail: {
    name: 'Aoi Hinamori',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 834,
    baseHP: 5364,
    baseDef: 585,
    form: [elements.caster_max_hp],
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
  ambitious_tywin: {
    name: 'Dailian the Seraph',
    element: element.light,
    classType: classType.knight,
    baseAtk: 744,
    baseHP: 5890,
    baseDef: 655,
    form: [elements.caster_max_hp, elements.caster_enrage],
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
  angelica: {
    name: 'Moira',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 426,
    baseHP: 4475,
    baseDef: 701,
    form: [elements.caster_max_hp],
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
  armin: {
    name: 'Eimi',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 571,
    baseDef: 683,
    baseHP: 5769,
    form: [elements.caster_defense],
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
  arowell: {
    name: 'Katilda',
    element: element.light,
    classType: classType.knight,
    baseAtk: 608,
    baseHP: 4960,
    baseDef: 617,
    form: [elements.caster_max_hp],
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
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.05, 0, 0.1, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 2 : 1.5,
        pow: 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.001 + elements.target_speed.value() * 0.003,
        multTip: () => ({ caster_speed: 0.1, target_speed: 0.3 }),
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
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s3: {
        spdScaling: true,
        soulburn: true,
        rate: (soulburn) => soulburn ? 3 : 1.5,
        pow: 0.8,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.1, 0.1, 0.15],
        single: true,
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
        enhance: [0.15, 0, 0.15]
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.35 : 1.1,
        pow: 0.9,
        mult: () => 1 + (elements.target_nb_debuff.value() * 0.15),
        multTip: () => ({ per_target_debuff: 15 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0, 0, 0, 0.1, 0.15],
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
 bask: {
    name: 'Maeve',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 653,
    baseHP: 5122,
    baseDef: 617,
    form: [elements.caster_max_hp],
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
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.2 : 0.95,
        pow: 1,
        enhance: [0.15, 0, 0, 0, 0.15],
        aoe: true,
      }
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
  briar_witch_iseria: {
    name: 'Obriens',
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
  cartuja: {
    name: 'Cartuja',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 903,
    baseHP: 6635,
    baseDef: 630,
    form: [elements.caster_max_hp, elements.caster_hp_pc],
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
  cecilia: {
    name: 'Cecilia',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 821,
    baseHP: 6751,
    baseDef: 648,
    form: [elements.caster_max_hp],
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
  celeste: {
    name: 'Celeste',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 929,
    baseHP: 4733,
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
  celestial_mercedes: {
    name: 'Celestial Mercedes',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1187,
    baseHP: 4491,
    baseDef: 627,
    form: [elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 0.9,
        pow: 0.9,
        flat: () => elements.target_max_hp.value() * 0.04,
        flatTip: () => ({ target_max_hp: 4 }),
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.2,
        pow: 0.8,
        enhance: [0.1, 0.1, 0, 0.15, 0.15],
        aoe: true,
      }
    }
  },
  cerise: {
    name: 'Cerise',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 970,
    baseHP: 5299,
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
  cermia: {
    name: 'Cermia',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1359,
    baseHP: 5542,
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
  charles: {
    name: 'Charles',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 957,
    baseHP: 6148,
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
  charlotte: {
    name: 'Charlotte',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 1134,
    baseHP: 5825,
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
  church_of_ilryos_axe: {
    name: 'Church of Ilryos Axe',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1144,
    baseHP: 4895,
    baseDef: 543,
    form: [elements.caster_max_hp],
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
  cidd: {
    name: 'Cidd',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1029,
    baseHP: 5097,
    baseDef: 473,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: () => elements.caster_speed_up.value() ? 1.5 : 0.9,
        pow: () => elements.caster_speed_up.value() ? 0.9 : 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
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
  clarissa: {
    name: 'Clarissa',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1252,
    baseHP: 5219,
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
  closer_charles: {
    name:  'Closer Charles',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
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
        rate: 1.2,
        pow: 1,
        name: 'S1 Demolition',
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
  coli: {
    name: 'Coli',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1138,
    baseHP: 5871,
    baseDef: 462,
    form: [elements.target_bleed_detonate, elements.target_bomb_detonate],
    dot: [dot.bleed, dot.bomb],
    skills: {
      s1: {
        rate: 0.8,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
        single: true,
      },
      s2: {
        rate: 0.8,
        pow: 0.9,
        detonate: [dot.bleed, dot.bomb],
        detonation: () => 1,
        enhance: [0.05, 0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 0.3,
        pow: 0.9,
        enhance: [0.05, 0.1, 0, 0.1, 0.15],
        single: true,
      }
    }
  },
  corvus: {
    name: 'Corvus',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 903,
    baseDef: 630,
    baseHP: 6635,
    form: [elements.caster_defense, elements.caster_enrage],
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
  crimson_armin: {
    name: 'Crimson Armin',
    element: element.light,
    classType: classType.knight,
    baseAtk: 821,
    baseDef: 703,
    baseHP: 6266,
    form: [elements.caster_defense],
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
  dark_corvus: {
    name: 'Dark Corvus',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 966,
    baseHP: 7323,
    baseDef: 657,
    form: [elements.caster_max_hp],
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
  desert_jewel_basar: {
    name: 'Desert Jewel Basar',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 948,
    baseHP: 4370,
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
  destina: {
    name: 'Destina',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 621,
    baseHP: 6034,
    baseDef: 775,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
        single: true,
      }
    }
  },
  diene: {
    name: 'Diene',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 649,
    baseHP: 5254,
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
  dingo: {
    name: 'Dingo',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 957,
    baseHP: 5057,
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
  dominiel: {
    name: 'Dominiel',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 957,
    baseHP: 5016,
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
  doris: {
    name: 'Doris',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 540,
    baseHP: 5319,
    baseDef: 705,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  eligos: {
    name: 'Eligos',
    element: element.fire,
    classType: classType.ranger,
    form: [elements.caster_speed, elements.caster_perception, elements.target_speed],
    baseAtk: 1283,
    baseHP: 4976,
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
        multTip: () => ({ caster_target_spd_diff: 0.25 }),
        single: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  // eligos_old: {
  //   name: 'Eligos (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.ranger,
  //   form: [elements.caster_speed, elements.caster_perception, elements.target_speed],
  //   baseAtk: 1283,
  //   baseHP: 4976,
  //   baseDef: 536,
  //   skills: {
  //     s1: {
  //       spdScaling: true,
  //       rate: 0.95,
  //       pow: 0.9,
  //       mult: () => 1 + elements.caster_speed.value() * 0.00075,
  //       multTip: () => ({ caster_speed: 0.075 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       spdScaling: true,
  //       rate: 0.7,
  //       pow: 1.3,
  //       mult: () => {
  //         const spdDiff = (elements.caster_speed.value() - elements.target_speed.value()) * 0.025;
  //         return 1 + Math.min(Math.max(0, spdDiff), 2);
  //       },
  //       multTip: () => ({ caster_target_spd_diff: 0.25 }),
  //       single: true,
  //     },
  //     s3: {
  //       rate: 1.5,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  elson: {
    name: 'Elson',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 540,
    baseHP: 4900,
    baseDef: 729,
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
  enott: {
    name: 'Enott',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1019,
    baseHP: 5738,
    baseDef: 571,
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
  faithless_lidica: {
    name: 'Faithless Lidica',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 1182,
    baseHP: 5299,
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
  fallen_cecilia: {
    name: 'Fallen Cecilia',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 894,
    baseHP: 6840,
    baseDef: 694,
    form: [elements.caster_max_hp],
    barrier: () => elements.caster_max_hp.value() * 0.1,
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
  fighter_maya: {
    name: 'Fighter Maya',
    element: element.light,
    classType: classType.knight,
    baseAtk: 821,
    baseDef: 703,
    baseHP: 6266,
    form: [elements.caster_defense, elements.target_hp_pc],
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
  free_spirit_tieria: {
    name: 'Free Spirit Tieria',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 957,
    baseHP: 5057,
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
  general_purrgis: {
    name: 'General Purrgis',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 903,
    baseHP: 6635,
    baseDef: 630,
    form: [elements.caster_max_hp],
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
  gloomyrain: {
    name: 'Gloomyrain',
    element: element.light,
    classType: classType.mage,
    form: [elements.caster_has_debuff],
    baseAtk: 1199,
    baseHP: 4491,
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
  hazel: {
    name: 'Hazel',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 762,
    baseHP: 4450,
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
  helga: {
    name: 'Helga',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1000,
    baseHP: 4895,
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
  holiday_yufine: {
    name: 'Holiday Yufine',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6266,
    baseDef: 627,
    dot: [dot.burn],
    skills: {
      s1: {
        rate: 0.8,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
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
  hurado: {
    name: 'Hurado',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 930,
    baseHP: 4572,
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
  iseria: {
    name: 'Iseria',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 1158,
    baseHP: 6002,
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
  jecht: {
    name: 'Jecht',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 804,
    baseHP: 3925,
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
  jena: {
    name: 'Jena',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1063,
    baseHP: 4491,
    baseDef: 599,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.05, 0.1, 0.15],
        single: true,
      },
      s3: {
        rate: 0.85,
        pow: 0.95,
        enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  // jena_old: {
  //   name: 'Jena (Pre-Balance)',
  //   element: element.ice,
  //   classType: classType.mage,
  //   baseAtk: 1063,
  //   form: [elements.target_nb_debuff],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 0.95,
  //       mult: () => 1 + elements.target_nb_debuff.value()*0.1,
  //       multTip: () => ({ per_target_debuff: 10 }),
  //       enhance: [0.05, 0.05, 0.1, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.1 : 0.85,
  //       pow: 0.95,
  //       enhance: [0.05, 0.05, 0, 0, 0.1, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  judge_kise: {
    name: 'Judge Kise',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 1039,
    baseHP: 5340,
    baseDef: 617,
    form: [elements.nb_targets],
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1],
        penetrate: () => 0.2,
        single: true,
      },
      s2: {
        rate: 1,
        pow: 1,
        enhance: [0.15, 0, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.1,
        pow: 0.95,
        mult: () => 1 + (elements.nb_targets.value() - 1) * 0.1,
        multTip: () => ({ per_target: 10 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.05, 0.1],
        aoe: true,
      }
    }
  },
  judge_kise_old: {
    name: 'Judge Kise (Pre-Balance)',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 1039,
    baseHP: 5340,
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
        rate: 1,
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
  judith: {
    name: 'Judith',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 848,
    baseHP: 4289,
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
  karin: {
    name: 'Karin',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1188,
    baseHP: 4855,
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
  kayron: {
    name: 'Kayron',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 1119,
    baseHP: 5340,
    baseDef: 483,
    form: [elements.caster_hp_pc],
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.35 : 0.85,
        pow: 1,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.0015,
        multTip: () => ({ caster_lost_hp_pc: 0.15 }),
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
  ken: {
    name: 'Ken',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 966,
    baseHP: 7323,
    baseDef: 657,
    form: [elements.caster_max_hp],
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
  kiris: {
    name: 'Kiris',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 857,
    baseHP: 5057,
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
  kise: {
    name: 'Kise',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1283,
    baseHP: 5138,
    baseDef: 522,
    barrier: (hero) => hero.getAtk() * 0.65,
    form: [elements.target_has_buff, elements.caster_stealth, elements.caster_hp_pc],
    skills: {
      s1: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.4 : 1.1,
        pow: 1,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        mult: (soulburn) => {
          if (!elements.target_has_buff.value()) return 1;

          return soulburn ? 2 : 1.7;
        },
        multTip: (soulburn) => ({ target_debuff: soulburn ? 100 : 70 }),
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
  // kise_old: {
  //   name: 'Kise (Pre-Balance)',
  //   element: element.ice,
  //   classType: classType.thief,
  //   baseAtk: 1283,
  //   barrier: (hero) => hero.getAtk() * 0.5,
  //   form: [elements.target_has_buff, elements.caster_stealth, elements.caster_hp_pc],
  //   skills: {
  //     s1: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.4 : 1.1,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
  //       mult: (soulburn) => {
  //         if (!elements.target_has_buff.value()) return 1;

  //         return soulburn ? 2 : 1.7;
  //       },
  //       multTip: (soulburn) => ({ target_debuff: soulburn ? 100 : 70 }),
  //       single: true,
  //     },
  //     s2: {
  //       rate: 0.8,
  //       pow: 1,
  //       penetrate: () => elements.caster_stealth.value() ? 0.6 : 0.3,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     },
  //     s3: {
  //       rate: 1.6,
  //       pow: 1,
  //       mult: () => 1 + elements.caster_hp_pc.value()*0.0035,
  //       multTip: () => ({ caster_left_hp_pc: 0.35 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  kluri: {
    name: 'Kluri',
    element: element.earth,
    classType: classType.knight,
    baseAtk: 703,
    baseDef: 596,
    baseHP: 5914,
    form: [elements.caster_defense],
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
  krau: {
    name: 'Krau',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 839,
    baseHP: 6405,
    baseDef: 752,
    form: [elements.caster_max_hp, elements.caster_hp],
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
  last_rider_krau: {
    name: 'Last Rider Krau',
    element: element.light,
    classType: classType.knight,
    baseAtk: 839,
    baseHP: 6405,
    baseDef: 752,
    form: [elements.caster_max_hp, elements.attack_skill_stack_3, elements.caster_speed],
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
        mult: () => 1 + (elements.attack_skill_stack_3.value() * 0.2) + (elements.caster_speed.value() * 0.001125),
        multTip: () => ({ per_stack: 20, caster_speed: 0.1125 }),
        penetrate: () => 1.0,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  // last_rider_krau_old: {
  //   name: 'Last Rider Krau (Pre-Balance)',
  //   element: element.light,
  //   classType: classType.knight,
  //   baseAtk: 839,
  //   form: [elements.caster_max_hp, elements.attack_skill_stack_3],
  //   barrier: () => elements.caster_max_hp.value()*0.07,
  //   barrierEnhance: 's2',
  //   skills: {
  //     s1: {
  //       rate: 0.7,
  //       pow: 1,
  //       flat: () => 0.1*elements.caster_max_hp.value(),
  //       flatTip: () => ({ caster_max_hp: 10 }),
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       enhance: [0.05, 0.1, 0.1, 0.1, 0.15]
  //     },
  //     s3: {
  //       noCrit: true,
  //       rate: 0.3,
  //       pow: 1,
  //       flat: () => 0.06*elements.caster_max_hp.value(),
  //       flatTip: () => ({ caster_max_hp: 6 }),
  //       mult: () => 1 + elements.attack_skill_stack_3.value()*0.2,
  //       multTip: () => ({ per_stack: 20 }),
  //       penetrate: () => 1.0,
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  leo: {
    name: 'Leo',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 930,
    baseHP: 5380,
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
  lidica: {
    name: 'Lidica',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 1283,
    baseHP: 4976,
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
  lilibet: {
    name: 'Lilibet',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6266,
    baseDef: 627,
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
  lorina: {
    name: 'Lorina',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1144,
    baseHP: 4895,
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
    name: 'Lots',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 603,
    baseHP: 4945,
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
  lua: {
    name: 'Lua',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 993,
    baseHP: 6002,
    baseDef: 611,
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
  martial_artist_ken: {
    name: 'Martial Artist Ken',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1359,
    baseHP: 5542,
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
        rate: 1.1,
        pow: 1,
        enhance: [0.05, 0, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  // martial_artist_ken_old: {
  //   name: 'Martial Artist Ken (Pre-Balance)',
  //   element: element.dark,
  //   classType: classType.warrior,
  //   baseAtk: 1359,
  //   baseHP: 5542,
  //   baseDef: 585,
  //   form: [elements.caster_hp_pc],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 0.95,
  //       enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
  //       single: true,
  //     },
  //     s2: {
  //       onlyCrit: true,
  //       rate: 1.2,
  //       pow: 0.95,
  //       mult: () => {
  //         let extra = 0;
  //         for (let i = 0; i < Number(document.getElementById('molagora-s1').value); i++) {
  //           extra += heroes.martial_artist_ken.skills.s1.enhance[i];
  //         }
  //         return (1 + (100 - elements.caster_hp_pc.value()) * 0.004 + extra);
  //       },
  //       multTip: () => ({ caster_lost_hp_pc: 40 }),
  //       enhance: [0.05, 0.1, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.1 : 0.9,
  //       pow: 1,
  //       enhance: [0.05, 0, 0, 0.1, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  maya: {
    name: 'Maya',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 821,
    baseDef: 648,
    baseHP: 6796,
    form: [elements.caster_defense],
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
  mercedes: {
    name: 'Mercedes',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1187,
    baseHP: 4491,
    baseDef: 627,
    form: [elements.nb_targets, elements.target_hp_pc, elements.caster_immense_power],
    atkUp: () => elements.caster_immense_power.value() ? 1.15 : 1,
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
        mult: () => 1 + (100 - elements.target_hp_pc.value()) * 0.003,
        multTip: () => ({ caster_lost_hp_pc: 0.3 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.15],
        aoe: true,
      }
    }
  },
  milim: {
    name: 'Milim',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1359,
    baseHP: 4895,
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
  mirsa: {
    name: 'Mirsa',
    element: element.light,
    classType: classType.thief,
    baseAtk: 885,
    baseHP: 4410,
    baseDef: 501,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
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
  mistychain: {
    name: 'Mistychain',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1244,
    baseHP: 3925,
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
  montmorancy: {
    name: 'Montmorancy',
    element: element.ice,
    classType: classType.soul_weaver,
    baseAtk: 540,
    baseHP: 4900,
    baseDef: 729,
    skills: {
      s1: {
        rate: 1,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  mucacha: {
    name: 'Mucacha',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1000,
    baseHP: 4895,
    baseDef: 518,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s3: {
        spdScaling: true,
        rate: 1.5,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      }
    }
  },
  nemunas: {
    name: 'Nemunas',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 920,
    baseHP: 4855,
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
  otillie: {
    name: 'Otillie',
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
  pearlhorizon: {
    name: 'Pearlhorizon',
    element: element.earth,
    classType: classType.mage,
    baseAtk: 921,
    baseHP: 4855,
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
  purrgis: {
    name: 'Purrgis',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1119,
    baseHP: 6091,
    baseDef: 594,
    form: [elements.caster_max_hp],
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
  pyllis: {
    name: 'Pyllis',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 685,
    baseDef: 703,
    baseHP: 6403,
    form: [elements.caster_defense, elements.caster_attacked_stack_3],
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
  ras: {
    name: 'Ras',
    element: element.fire,
    classType: classType.knight,
    baseAtk: 758,
    baseHP: 5826,
    baseDef: 672,
    form: [elements.caster_max_hp],
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
  requiemroar: {
    name: 'Requiemroar',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 842,
    baseHP: 4046,
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
    name: 'Rikoris',
    element: element.light,
    classType: classType.warrior,
    baseAtk: 951,
    baseHP: 5517,
    baseDef: 583,
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
  rima: {
    name: 'Rima',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 822,
    baseHP: 4693,
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
  rin: {
    name: 'Rin',
    element: element.earth,
    classType: classType.soul_weaver,
    baseAtk: 594,
    baseHP: 5057,
    baseDef: 691,
    form: [elements.caster_max_hp],
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
  roozid: {
    name: 'Roozid',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 812,
    baseHP: 4370,
    baseDef: 462,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.8,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        spdScaling: true,
        rate: 1.2,
        pow: 1,
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      }
    }
  },
  rose: {
    name: 'Rose',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 821,
    baseDef: 703,
    baseHP: 6266,
    form: [elements.caster_defense],
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
  ruele_of_light: {
    name: 'Ruele of Light',
    element: element.light,
    classType: classType.soul_weaver,
    baseAtk: 621,
    baseHP: 5474,
    baseDef: 802,
    form: [elements.caster_max_hp],
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
  schuri: {
    name: 'Schuri',
    element: element.fire,
    classType: classType.ranger,
    baseAtk: 1068,
    baseHP: 5650,
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
  shooting_star_achates: {
    name: 'Shooting Star Achates',
    element: element.dark,
    classType: classType.soul_weaver,
    baseAtk: 576,
    baseHP: 5700,
    baseDef: 743,
    skills: {
      s1: {
        rate: 1,
        pow: 0.95,
        enhance: [0.05, 0.1, 0, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  serila: {
    name: 'Serila',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1218,
    baseHP: 4521,
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
        rate: (soulburn) => soulburn ? 2.2 : 1.7,
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
  // serila_old: {
  //   name: 'Serila (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.mage,
  //   baseAtk: 1218,
  //   baseHP: 4521,
  //   baseDef: 683,
  //   dot: [dot.burn],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       single: true,
  //     },
  //     s2: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 2 : 1.5,
  //       pow: 1.05,
  //       enhance: [0.1, 0, 0, 0, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 1.8,
  //       pow: 1.05,
  //       enhance: [0.1, 0, 0, 0, 0.15],
  //       single: true,
  //     }
  //   }
  // },
  sez: {
    name: 'Sez',
    element: element.ice,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
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
  // sez_old: {
  //   name: 'Sez (Pre-Balance)',
  //   element: element.ice,
  //   classType: classType.thief,
  //   baseAtk: 1228,
  //   form: [elements.target_hp_pc],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 0.95,
  //       mult: () => 1 + (100-elements.target_hp_pc.value())*0.002,
  //       multTip: () => ({ target_lost_hp_pc: 0.2 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 0.5,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 3.2 : 1.8,
  //       pow: 0.95,
  //       mult: (soulburn) => 1 + (100-elements.target_hp_pc.value())*(soulburn ? 0.007 : 0.003),
  //       multTip: (soulburn) => ({ target_lost_hp_pc: soulburn ? 0.7 : 0.3 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.15],
  //       single: true,
  //     },
  //     explosion: {
  //       name: infoLabel('sez_explosion'),
  //       rate: 0,
  //       pow: 0,
  //       afterMath: () => ({ atkPercent: 1.5, penetrate: 0.7 }),
  //       noCrit: true,
  //       noMiss: true,
  //     }
  //   }
  // },
  shadow_rose: {
    name: 'Shadow Rose',
    element: element.dark,
    classType: classType.knight,
    baseAtk: 889,
    baseHP: 5784,
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
  sigret: {
    name: 'Sigret',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 1228,
    baseHP: 5784,
    baseDef: 553,
    form: [elements.target_nb_debuff],
    dot: [dot.bleed],
    skills: {
      s1: {
        rate: 1,
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
  silk: {
    name: 'Silk',
    element: element.earth,
    classType: classType.ranger,
    baseAtk: 1188,
    baseHP: 4693,
    baseDef: 518,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 0.9,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      },
      s1_bis: {
        s1_benefits: true,
        name: infoLabel('silk_automatic_fire'),
        spdScaling: true,
        rate: 1.2,
        pow: 0.9,
        penetrate: () =>  0.2,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
        enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
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
  // silk_old: {
  //   name: 'Silk (Pre-Balance)',
  //   element: element.earth,
  //   classType: classType.ranger,
  //   baseAtk: 1188,
  //   baseHP: 4693,
  //   baseDef: 518,
  //   form: [elements.caster_speed, elements.caster_nb_focus],
  //   skills: {
  //     s1: {
  //       spdScaling: true,
  //       rate: 0.9,
  //       pow: 0.9,
  //       mult: () => 1 + elements.caster_speed.value() * 0.00075,
  //       multTip: () => ({ caster_speed: 0.075 }),
  //       enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
  //       single: true,
  //     },
  //     s1_bis: {
  //       s1_benefits: true,
  //       name: infoLabel('silk_automatic_fire'),
  //       spdScaling: true,
  //       rate: 1.25,
  //       pow: 0.9,
  //       penetrate: () => 0.2,
  //       mult: () => 1 + elements.caster_speed.value() * 0.00075,
  //       multTip: () => ({ caster_speed: 0.075 }),
  //       enhance: [0.05, 0.05, 0, 0.05, 0, 0.1, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 0.95,
  //       pow: 1.05,
  //       enhance: [0.1, 0, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  silver_blade_aramintha: {
    name: 'Silver Blade Aramintha',
    element: element.light,
    classType: classType.mage,
    baseAtk: 1197,
    baseHP: 4572,
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
  specimen_sez: {
    name: 'Specimen Sez',
    element: element.light,
    classType: classType.thief,
    baseAtk: 1228,
    baseHP: 6266,
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
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.15 : 0.9,
        pow: 1,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        aoe: true,
      },
      s3: {
        rate: 1.5,
        pow: 1,
        penetrate: () => elements.target_is_stunned.value() ? 1.0 : 0.3,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
        single: true,
      }
    }
  },
  specter_tenebria: {
    name: 'Specter Tenebria',
    element: element.dark,
    classType: classType.mage,
    baseAtk: 1197,
    baseHP: 4572,
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
  straze: {
    name: 'Straze',
    element: element.dark,
    classType: classType.warrior,
    baseAtk: 1228,
    baseHP: 5784,
    baseDef: 553,
    form: [elements.nb_targets, elements.target_is_highest_max_hp, elements.target_attack],
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
        penetrate: () => {
          if (!elements.target_is_highest_max_hp.value()) return 0;

          const targetAtk = elements.target_attack.value();
          const casterAtk = currentHero.getAtk('s3');

          const penDiff = (casterAtk - targetAtk) * 0.00035;

          return Math.min(Math.max(0, penDiff) + 0.3, 1);
        },
        penetrateTip: () => ({caster_target_atk_diff: 0.035}),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      },
    }
  },
  surin: {
    name: 'Surin',
    element: element.fire,
    classType: classType.thief,
    baseAtk: 1010,
    baseHP: 5097,
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
  sven: {
    name: 'Sven',
    element: element.dark,
    classType: classType.thief,
    baseAtk: 1039,
    baseHP: 5517,
    baseDef: 452,
    form: [elements.caster_hp_pc, elements.target_hp_pc],
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
        multTip: () => ({ caster_speed: 0.3 }),
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1 : 0.8,
        pow: 0.8,
        mult: () => 1 + (100 - elements.caster_hp_pc.value()) * 0.005 + (100 - elements.target_hp_pc.value()) * 0.0015,
        multTip: () => ({caster_lost_hp_pc: 50, target_lost_hp_pc: 15}),
        enhance: [0.05, 0.05, 0.1, 0, 0.1, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  tamarinne: {
    name: 'Tamarinne',
    element: element.fire,
    classType: classType.soul_weaver,
    baseAtk: 948,
    baseHP: 4370,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1,
        pow: 0.75,
        enhance: [0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.15]
      }
    }
  },
  taranor_guard: {
    name: 'Taranor Guard',
    element: element.ice,
    classType: classType.warrior,
    baseAtk: 951,
    baseHP: 5517,
    baseDef: 583,
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
  taranor_royal_guard: {
    name: 'Taranor Royal Guard',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 842,
    baseHP: 6463,
    baseDef: 617,
    form: [elements.caster_max_hp],
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
  tempest_surin: {
    name: 'Tempest Surin',
    element: element.light,
    classType: classType.thief,
    baseAtk: 1010,
    baseHP: 5097,
    baseDef: 497,
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
  tenebria: {
    name: 'Tenebria',
    element: element.fire,
    classType: classType.mage,
    baseAtk: 1359,
    baseHP: 4895,
    baseDef: 652,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.05 : 0.8,
        pow: 1,
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      },
      s3: {
        rate: 1.1,
        pow: 1.05,
        enhance: [0.1, 0, 0, 0, 0.15],
        aoe: true,
      }
    }
  },
  // tenebria_old: {
  //   name: 'Tenebria (Pre-Balance)',
  //   element: element.fire,
  //   classType: classType.mage,
  //   baseAtk: 1359,
  //   baseHP: 4895,
  //   baseDef: 652,
  //   skills: {
  //     s1: {
  //       rate: 1.2,
  //       pow: 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 0.8,
  //       pow: 1,
  //       enhance: [0.05, 0, 0.1, 0, 0.15],
  //       aoe: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.35 : 1.1,
  //       pow: 1.05,
  //       enhance: [0.1, 0, 0, 0, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  tieria: {
    name: 'Tieria',
    element: element.fire,
    classType: classType.warrior,
    baseAtk: 839,
    baseHP: 5517,
    baseDef: 591,
    form: [elements.target_max_hp],
    skills: {
      s1: {
        rate: 1,
        pow: 1.05,
        enhance: [0.1, 0, 0.15, 0],
        single: true,
      },
      s3: {
        soulburn: true,
        rate: (soulburn) => soulburn ? 1.8 : 1.2,
        pow: 0.9,
        flat: (soulburn) => elements.target_max_hp.value() * (soulburn ? 0.06 : 0.04),
        flatTip: (soulburn) => ({ target_max_hp: soulburn ? 6 : 4 }),
        enhance: [0.05, 0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      },
    }
  },
  tywin: {
    name: 'Tywin',
    element: element.ice,
    classType: classType.knight,
    baseAtk: 821,
    baseHP: 6751,
    baseDef: 648,
    form: [elements.caster_max_hp],
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
  // tywin_old: {
  //   name: 'Tywin (Pre-Balance)',
  //   element: element.ice,
  //   classType: classType.knight,
  //   baseAtk: 821,
  //   form: [elements.caster_max_hp],
  //   skills: {
  //     s1: {
  //       rate: 0.8,
  //       pow: 0.95,
  //       flat: () => elements.caster_max_hp.value()*0.04,
  //       flatTip: () => ({ caster_max_hp: 4 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0, 0.15],
  //       single: true,
  //     },
  //     s3: {
  //       rate: 0.5,
  //       pow: 0.95,
  //       flat: () => elements.caster_max_hp.value()*0.1,
  //       flatTip: () => ({ caster_max_hp: 10 }),
  //       enhance: [0.05, 0.05, 0, 0, 0, 0.1, 0.15],
  //       aoe: true,
  //     }
  //   }
  // },
  vildred: {
    name: 'Vildred',
    element: element.earth,
    classType: classType.thief,
    baseAtk: 1283,
    baseHP: 5138,
    baseDef: 522,
    form: [elements.caster_speed],
    skills: {
      s1: {
        spdScaling: true,
        rate: 0.9,
        pow: 0.95,
        mult: () => 1 + elements.caster_speed.value() * 0.00075,
        multTip: () => ({ caster_speed: 0.075 }),
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
        mult: () => 1 + elements.caster_speed.value() * 0.001125,
        multTip: () => ({ caster_speed: 0.1125 }),
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        aoe: true,
      }
    }
  },
  // vildred_old: {
  //   name: 'Vildred (Pre-Balance)',
  //   element: element.earth,
  //   classType: classType.thief,
  //   baseAtk: 1283,
  //   form: [elements.caster_speed],
  //   skills: {
  //     s1: {
  //       rate: 0.85,
  //       pow: 0.95,
  //       mult: () => 1 + elements.caster_speed.value()*0.00075,
  //       multTip: () => ({ caster_speed: 0.075 }),
  //       enhance: [0.05, 0.05, 0.05, 0.1, 0.1]
  //     },
  //     s2: {
  //       rate: 0.5,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0.05, 0.05, 0.1],
  //       aoe: true,
  //     },
  //     s3: {
  //       soulburn: true,
  //       rate: (soulburn) => soulburn ? 1.1 : 0.85,
  //       pow: 1,
  //       mult: (soulburn) => 1 + elements.caster_speed.value()*(soulburn ? 0.0009 : 0.00075),
  //       multTip: (soulburn) => ({ caster_speed: soulburn ? 0.09 : 0.075 }),
  //       enhance: [0.05, 0.05, 0, 0.1, 0.1],
  //       aoe: true,
  //     }
  //   }
  // },
  wanda: {
    name: 'Wanda',
    element: element.dark,
    classType: classType.ranger,
    baseAtk: 1005,
    baseHP: 4693,
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
  wanderer_silk: {
    name: 'Wanderer Silk',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 930,
    baseHP: 5380,
    baseDef: 564,
    skills: {
      s1: {
        rate: 1.2,
        pow: 1,
        enhance: [0.05, 0.1, 0, 0, 0.15],
        single: true,
      },
      s2: {
        rate: 1.3,
        pow: 0.9,
        enhance: [0.05, 0.05, 0.1, 0.1, 0.1],
        single: true,
      },
      s3: {
        rate: 2,
        pow: 0.8,
        enhance: [0.05, 0.05, 0, 0.1, 0.1],
        single: true,
      }
    }
  },
  watcher_schuri: {
    name: 'Watcher Schuri',
    element: element.light,
    classType: classType.ranger,
    baseAtk: 970,
    baseHP: 5935,
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
  yufine: {
    name: 'Yufine',
    element: element.earth,
    classType: classType.warrior,
    baseAtk: 1228,
    baseHP: 5784,
    baseDef: 553,
    form: [elements.target_silenced],
    skills: {
      s1: {
        rate: 1,
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
        penetrate: () => document.getElementById('target-silenced').checked ? 0.7 : 0,
        enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
        single: true,
      }
    }
  },
  // yufine_old: {
  //   name: 'Yufine (Pre-Balance)',
  //   element: element.earth,
  //   classType: classType.warrior,
  //   baseAtk: 1228,
  //   form: [elements.target_has_buff],
  //   skills: {
  //     s1: {
  //       rate: 1,
  //       pow: 1,
  //       enhance: [0.05, 0.05, 0, 0.05, 0, 0.15],
  //       single: true,
  //     },
  //     s2: {
  //       rate: 0.9,
  //       pow: 1,
  //       aoe: true,
  //     },
  //     s3: {
  //       rate: 2,
  //       pow: 0.95,
  //       mult: () => elements.target_has_buff.value() ? 1.5 : 1.0,
  //       multTip: () => ({target_has_buff: 50}),
  //       enhance: [0.05, 0.05, 0, 0.05, 0.1, 0.1],
  //       single: true,
  //     }
  //   }
  // },
  yuna: {
    name: 'Yuna',
    element: element.ice,
    classType: classType.ranger,
    baseAtk: 1158,
    baseHP: 6002,
    baseDef: 553,
    form: [elements.caster_speed, elements.nb_targets],
    skills: {
      s1: {
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
  zeno: {
    name: 'Zeno',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1039,
    baseHP: 5299,
    baseDef: 673,
    form: [elements.caster_max_hp, elements.non_attack_skill_stack_8],
    skills: {
      s1: {
        hpScaling: true,
        rate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.1,
        flatTip: () => ({ caster_max_hp: 10 }),
        enhance: [0.05, 0, 0.1, 0, 0.15],
        single: true,
      },
      s2: {
        enhance: [0.005, 0.005, 0.005, 0.005, 0.01],
      },
      s3: {
        hpScaling: true,
        ate: 0.5,
        pow: 1,
        flat: () => elements.caster_max_hp.value() * 0.12,
        flatTip: () => ({ caster_max_hp: 12 }),
        mult: () => {
          let extra = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            extra += heroes.zeno.skills.s2.enhance[i];
          }

          return 1 + elements.non_attack_skill_stack_8.value() * (0.07 + extra);
        },
        multTip: () => {
          let extra = 0;
          for (let i = 0; i < Number(document.getElementById('molagora-s2').value); i++) {
            extra += heroes.zeno.skills.s2.enhance[i] * 100;
          }

          return { per_stack: 7 + extra };
        },
        enhance: [0.05, 0, 0.1, 0, 0.15],
        aoe: true,
      }
    }
  },
  zerato: {
    name: 'Zerato',
    element: element.ice,
    classType: classType.mage,
    baseAtk: 1159,
    baseHP: 4733,
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
};
