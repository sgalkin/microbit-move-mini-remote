input.onButtonPressed(Button.A, function () {
    velocity = Math.min(velocity + 10, 90)
    radio.sendNumber(velocity)
})
input.onButtonPressed(Button.B, function () {
    velocity = Math.max(velocity - 10, -90)
    radio.sendNumber(velocity)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendString("halt")
})
let velocity = 0
radio.setGroup(42)
velocity = 0
