import axios from "axios";


// === GET routes === //
export const getAllCreatures = async (gameId: number) => {
  try {
    const res = await axios.get(`/api/creature/all/${gameId}`);
    res.data.forEach((creature: any, i: number) => {
      // Parse creature data
      creature.maxHp = creature.health;
      creature.legActions = creature.legendaryActions;
      creature.conditionImmunities = creature.immunities.map((c: any) => {
        if(c.type === 'condition') {
          return c.name;
        }
      }).filter((c: any) => c);
      creature.damageImmunities = creature.immunities.map((c: any) => {
        if(c.type === 'damage') {
          return c.name;
        }
      }).filter((c: any) => c);

      for (const key in creature) {     
        if (key === 'health' || key === 'legendaryActions' || key === 'immunities') {
          delete creature[key];
        }
      }
      
      res.data[i] = creature;
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCreature = async (id: number) => {
  try {
    const res = await axios.get(`/api/creature/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
