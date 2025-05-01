/**
 * How we measure how fucked your commute is
 */
const Fuckedness = Object.freeze({
    NotFucked: ("not fucked"),
    ALittleFucked: ("a little fucked"),
    Fucked: ("fucked"),
    ReallyFucked: ("really fucked"),
    TurboFucked: ("turbo fucked")
});

function scoreToFuckedness(score) {
    if (score == 0) {
        return Fuckedness.NotFucked;
    } else if (score > 20) {
        return Fuckedness.TurboFucked;
    } else if (score > 12) {
        return Fuckedness.ReallyFucked;
    } else if (score > 6) {
        return Fuckedness.Fucked;
    } else if (score > 3) {
        return Fuckedness.ALittleFucked;
    } else {
        return Fuckedness.ALittleFucked;
    }
}