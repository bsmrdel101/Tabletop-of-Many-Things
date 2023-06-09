import axios from "axios";
import { convertAtSpecificLevelTypeFormat, convertDamageTypeFormat, convertDCTypeFormat, removeNullValues } from "../tools/utils";
import { Spell } from "../types";

export const getApiSpell = async (url: string) => {
  try {
    const res = await axios.get(`https://www.dnd5eapi.co${url}`);
    const { name, desc, level, range, components, material, ritual, duration, concentration, casting_time, higher_level, area_of_effect, dc, damage, heal_at_slot_level, school, classes, subclasses } = res.data;
    const spell: Spell = {
      name: name,
      desc: desc.map((string: string) => string).join('\n'),
      level: level,
      range: range,
      components: components,
      material: material,
      ritual: ritual,
      duration: duration,
      concentration: concentration,
      castingTime: casting_time,
      higherLevel: higher_level.map((string: string) => string).join('\n'),
      areaOfEffect: area_of_effect && area_of_effect,
      dc: dc && { type: dc.dc_type.index, successType: dc.dc_success },
      damage: damage && { type: damage.damage_type.index, damageAtSpellLevel: convertAtSpecificLevelTypeFormat(damage.damage_at_character_level) },
      healAtSlotLevel: heal_at_slot_level && heal_at_slot_level,
      school: school.index,
      classes: classes.map((_class: any) => _class.index),
      subclasses: subclasses.map((subclass: any) => subclass.index)
    };
    console.log(removeNullValues([spell])[0]);
    return removeNullValues([spell])[0];
  } catch (err) {
    console.log(err);
  }
};
