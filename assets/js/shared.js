/**
 * How we measure how fucked your commute is
 */
const Fuckedness = Object.freeze({
    NotFucked: ("not fucked"),
    ALittleFucked: ("a little fucked"),
    Fucked: ("fucked"),
    TurboFucked: ("turbo fucked")
});

function scoreToFuckedness(score) {
    if (score == 0) {
        return Fuckedness.NotFucked;
    } else if (score >= 9) {
        return Fuckedness.TurboFucked;
    } else if (score >= 8) {
        return Fuckedness.Fucked;
    } else if (score >= 3) {
        return Fuckedness.ALittleFucked;
    }
    // if (score == 0) {
    //     return Fuckedness.NotFucked;
    // } else if (score > 8) {
    //     return Fuckedness.Fucked;
    // } else if (score >= 3) {
    //     return Fuckedness.ALittleFucked;
    // } else {
    //     return Fuckedness.TurboFucked;
    // }
}