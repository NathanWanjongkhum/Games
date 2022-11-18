---Overview---
The main issue with Progress Knight is its hard coded approach.
Adding any new content requires adding it to all dependinces making it a chore to add features.
Thus a heavier usage of dynamic content in this refactor

--Explanations--
function getDaysElapsed() {

# Recalculating every loop is wasteful (differance is +/- 0.002) and PK is day dependent anyways

# const deltaTime = (timestamp - lastUpdate) / 1000;

# An approximated interval also pervents an overrun tick from impacting calculations

const FRAMERATE = 1 / 60;

# Original PK runs at 20/1000 or 1/50 (50fps)

const FRAME_ADJUST = 5 / 6;

# Balances game progression

const BASE_SPEED = 2;

# 0.02777777777777778

return BASE*SPEED * FRAMERATE \_ FRAME_ADJUST;
}
