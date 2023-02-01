import axios from "axios";
import { convertApiCreature, Creature } from "../scripts/creatureDataStructure";
import { getAbilityScoreMod, sortDuplicateArrayItems, sortDuplicateArrayItemsInObjects } from "../scripts/tools/utils";
import { AbilityScore, MinifiedCreature, NameDesc, NameValue, Prof, SpecialAbility } from "../scripts/types";


// === GET routes === //

export const getAllCreatures = async () => {
  try {
    const customCreatures: any = await axios.get('/api/creature');
    const apiCreatures: any = await axios.get('https://www.dnd5eapi.co/api/monsters');
    const res: MinifiedCreature[] = [...customCreatures.data, ...apiCreatures.data.results];
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getCreature = async (index: string | number, custom: boolean) => {
  try {
    if (custom) {
      // Get custom creature data from database
      const customCreature = (await axios.get(`/api/creature/${index}`)).data;

      const languages: string[] = [];
      const speeds: NameValue[] = [];
      const proficiencies: Prof[] = [];
      const vul: string[] = [];
      const res: string[] = [];
      const damageImmunities: string[] = [];
      const conditionImmunities: string[] = [];
      const senses: NameValue[] = [];
      const abilities: SpecialAbility[] = [];
      const actions: NameDesc[] = [];
      const legActions: NameDesc[] = [];
      const abilityScores: AbilityScore[] = [];
      // Sort the combined creature data into arrays
      customCreature.forEach((creature: any) => {
        languages.push(creature.language_name);
        speeds.push({ name: creature.speed_name, value: creature.speed_value });
        proficiencies.push({ type: creature.prof_type, name: creature.prof_name, value: creature.prof_value });
        vul.push(creature.vul_name);
        res.push(creature.res_name);
        if (creature.immune_type === 'damage') damageImmunities.push(creature.immune_name);
        if (creature.immune_type === 'condition') conditionImmunities.push(creature.immune_name);
        senses.push({ name: creature.sense_name, value: creature.sense_value });
        abilities.push({ name: creature.ability_name, desc: creature.ability_desc });
        actions.push({ name: creature.action_name, desc: creature.action_desc });
        legActions.push({ name: creature.leg_action_name, desc: creature.leg_action_desc });
      });

      // Sort ability scores data
      abilityScores.push({ name: 'str', value: customCreature[0].str, mod: getAbilityScoreMod(customCreature[0].str) });
      abilityScores.push({ name: 'dex', value: customCreature[0].dex, mod: getAbilityScoreMod(customCreature[0].dex) });
      abilityScores.push({ name: 'con', value: customCreature[0].con, mod: getAbilityScoreMod(customCreature[0].con) });
      abilityScores.push({ name: 'int', value: customCreature[0].int, mod: getAbilityScoreMod(customCreature[0].int) });
      abilityScores.push({ name: 'wis', value: customCreature[0].wis, mod: getAbilityScoreMod(customCreature[0].wis) });
      abilityScores.push({ name: 'char', value: customCreature[0].char, mod: getAbilityScoreMod(customCreature[0].char) });
      
      // Parse creature data through Creature class
      const { id, name, size, type, alignment, ac, hit_points, hit_dice, cr, xp } = customCreature[0];
      return new Creature(id, name, size, type, alignment, ac, hit_points, hit_dice, abilityScores, cr, xp, sortDuplicateArrayItems(languages), sortDuplicateArrayItemsInObjects(speeds), sortDuplicateArrayItemsInObjects(proficiencies), sortDuplicateArrayItems(vul), sortDuplicateArrayItems(res), sortDuplicateArrayItems(damageImmunities), sortDuplicateArrayItems(conditionImmunities), sortDuplicateArrayItemsInObjects(senses), sortDuplicateArrayItemsInObjects(abilities), sortDuplicateArrayItemsInObjects(actions), sortDuplicateArrayItemsInObjects(legActions));
    } else {
      // Get creature data from api
      const creature = (await axios.get(`https://www.dnd5eapi.co/api/monsters/${index}`)).data;
      return convertApiCreature(creature);
    }
  } catch (err) {
    console.log(err);
  }
};
