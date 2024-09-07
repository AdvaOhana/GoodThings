export default function delay(timeInMs) {
    return new Promise(res => setTimeout(res, timeInMs))
}