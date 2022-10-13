### Description:


### Spec:

See Story: [FSA22V2_ISSUE](card_link)

### Validation:

* [ ] This PR has code changes, and our linters still pass.
* [ ] This PR has new code, so new tests were added or updated, and they pass.
* [ ] This PR affects production code, so it was browser tested (see below).

#### To Validate:

1. Pull down all related branches.
2. Follow installation instructions in `README.md`.
3. Verify that `npm run lint` doesn't show any errors.
4. Go to [localhost:3000/login](http://localhost:3000/login) to login or register an account.
5. Create a new campaign and start it (Might have to refresh page). This will start the game as the "Dungeon Master"(or DM for short).
6. Copy the room code at the top of the screen.
7. In a new tab to go [localhost:3000/game](http://localhost:3000/game) for the second player. It doesn't matter if it uses the same account.
8. Join the room with the room code. This will join the game as a player.

---

#### Browser Testing
<!--
The browser list should be tailored to specific engagement and client needs.
Delete if irrelevant to this issue
-->

In these browsers, behavior & design closely match original specifications. A user is able to access all content and functionality, including the usability of required assistive devices, such as keyboard and screenreader.

**macOS**

* [ ] Safari (last 2 major versions)
* [ ] Chrome (last 6 months)
* [ ] Firefox (last 6 months)

**Windows**

* [ ] Chrome (last 6 months)
* [ ] Firefox (last 6 months)
* [ ] Edge (last 6 months)

**Mobile**

* [ ] Safari (last 2 major versions)
* [ ] Chrome on Android (last 6 months)
* [ ] Firefox on Android (last 6 months)
