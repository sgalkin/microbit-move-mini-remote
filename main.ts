function toggleLight () {
    if (light2 == 0) {
        light2 = 1
    } else {
        light2 = 0
    }
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    toggleLight()
    radio.sendValue("light", light2)
})
input.onButtonPressed(Button.A, function () {
    velocity = Math.min(velocity + 15, 90)
    radio.sendNumber(velocity)
    basic.showNumber(velocity)
})
control.onEvent(EventBusSource.MICROBIT_ID_ACCELEROMETER, EventBusValue.MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE, function () {
    if (isDriving == 1) {
        if (Math.abs(roll - input.rotation(Rotation.Roll)) >= 5) {
            roll = input.rotation(Rotation.Roll)
        }
        if (roll < 0) {
            images.arrowImage(ArrowNames.West).showImage(0)
        } else if (roll > 0) {
            images.arrowImage(ArrowNames.East).showImage(0)
        } else {
            basic.showIcon(IconNames.SmallDiamond)
        }
        radio.sendValue("roll", roll)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (isDriving == 0) {
        isDriving = 1
        basic.showIcon(IconNames.Tortoise)
    } else {
        isDriving = 0
        basic.showIcon(IconNames.Happy)
    }
})
input.onButtonPressed(Button.B, function () {
    velocity = Math.max(velocity - 15, -90)
    radio.sendNumber(velocity)
    basic.showNumber(velocity)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendString("halt")
    reset()
})
function reset () {
    velocity = 0
    light2 = 0
    roll = 0
    isDriving = 0
}
let roll = 0
let isDriving = 0
let velocity = 0
let light2 = 0
radio.setGroup(42)
reset()
