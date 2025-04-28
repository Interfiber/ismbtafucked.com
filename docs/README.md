# Documentation

## Subway alerts to fucked level
Since the subway is so unpredictable we can't really estimate if trains are running late since some trains are added into the schedule in order to make up for service loss due to a broken train, etc. Instead we get the number of active service alerts for each line. Planned service alerts such as shutdowns, or station closures contribute `+1` to the fucked counter. Unplanned distruptions such as disabled trains, signal failures, etc contribute `+2`

## Commuter rail fucked level
Unlike the subway commuter rail trains ALWAYS have a schedule. We calculate the fuckedness by querying the schedules, and predictions for each line. For each active vehicle we can determine how far behind schedule it is.
| Schedule Range    | +/- fuckedness |
| -------- | ------- |
| 0-5      | +0      |
| 5-10     | +2      |
| 10-20    | +3      |
| >20      | +5      |

## Fucked level to text