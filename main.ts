function toggleLight () {
    if (light2 == 0) {
        light2 = 1
    } else {
        light2 = 0
    }
}
input.onButtonPressed(Button.A, function () {
    velocity = Math.min(velocity + 30, 90)
    radio.sendNumber(velocity)
})
input.onButtonPressed(Button.B, function () {
    velocity = Math.max(velocity - 30, -90)
    radio.sendNumber(velocity)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendString("halt")
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    toggleLight()
    radio.sendValue("light", light2)
})
let light2 = 0
let velocity = 0
radio.setGroup(42)
velocity = 0
light2 = 0
