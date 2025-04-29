# Documentation

## How it works
For each category (Subway, or Commuter Rail) we query all of the active alerts for every line. Then we loop over the list of alerts, each type corresponds to a given `score` value. After every alert has been looped over we can convert this to a fuckedness value. Some helpful tables are located below

### Alert type to score
| Type      | Score   |
| ----------|-------- |
| DELAY     | 3       |
| SUSPENSION| 4       |
| STOP_CLOSURE     | 4    |
| SHUTTLE | 4 |
| DETOUR | 3 |
| CANCELLATION | 5 |
| SERVICE_CHANGE | 4 |

### Score to fuckedness
| Score | Fuckedness |
|-------|------------|
| 0     | Not fucked |
| >= 3  | A little fucked |
| >= 6  | Fucked |
| >= 15  | Turbo Fucked |