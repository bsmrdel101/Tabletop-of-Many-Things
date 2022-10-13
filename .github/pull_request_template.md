### Description:


### Spec:

See Story: [FSA22V2_ISSUE](card_link)

### Validation:

* [ ] This PR has code changes, and our linters still pass.
* [ ] This PR has new code, so new tests were added or updated, and they pass.

#### To Validate:

1. Pull down all related branches.
2. Follow installation instructions in `README.md`.
3. Verify that `npm run lint` doesn't show any errors.
4. Go to [localhost:3000/login](http://localhost:3000/login) to login or register an account.
5. Create a new campaign and start it (Might have to refresh page). This will start the game as the "Dungeon Master"(or DM for short).
6. Copy the room code at the top of the screen.
7. In a new tab to go [localhost:3000/game](http://localhost:3000/game) for the second player. It doesn't matter if it uses the same account.
8. Join the room with the room code. This will join the game as a player.
