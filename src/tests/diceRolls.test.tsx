import { rollDice } from '../scripts/diceRolls';


describe('Roll Dice', () => {
  test('Roll random number on type of dice', () => {
    expect(rollDice(1, 20).total <= 20).toBeTruthy();
    expect(rollDice(1, 20).total <= 20).toBeTruthy();
    expect(rollDice(1, 20).total <= 20).toBeTruthy();

    expect(rollDice(1, 12).total <= 12).toBeTruthy();
    expect(rollDice(1, 12).total <= 12).toBeTruthy();
    expect(rollDice(1, 12).total <= 12).toBeTruthy();

    expect(rollDice(1, 10).total <= 10).toBeTruthy();
    expect(rollDice(1, 10).total <= 10).toBeTruthy();
    expect(rollDice(1, 10).total <= 10).toBeTruthy();

    expect(rollDice(1, 8).total <= 8).toBeTruthy();
    expect(rollDice(1, 8).total <= 8).toBeTruthy();
    expect(rollDice(1, 8).total <= 8).toBeTruthy();

    expect(rollDice(1, 6).total <= 6).toBeTruthy();
    expect(rollDice(1, 6).total <= 6).toBeTruthy();
    expect(rollDice(1, 6).total <= 6).toBeTruthy();

    expect(rollDice(1, 4).total <= 4).toBeTruthy();
    expect(rollDice(1, 4).total <= 4).toBeTruthy();
    expect(rollDice(1, 4).total <= 4).toBeTruthy();
  });

  test('Roll multiple dice', () => {
    expect(rollDice(3, 20).total <= 60).toBeTruthy();
    expect(rollDice(3, 20).total <= 60).toBeTruthy();
    expect(rollDice(3, 20).total <= 60).toBeTruthy();
  });

  test('Modifiers can be added to roll', () => {
    const roll1: Roll = rollDice(2, 20, 5);
    const roll2: Roll = rollDice(2, 20, -5);
    expect(roll1.total).toBe(roll1.roll + 5);
    expect(roll2.total).toBe(roll2.roll - 5);
  });
});
