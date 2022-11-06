function toggleLight () {
    light2 = (light2 + 1) % 2
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    toggleLight()
    sendCommand(light_command, light2)
})
input.onButtonPressed(Button.A, function () {
    shiftGear(1)
    sendCommand(velocity_command, gears[current_gear_index])
})
control.onEvent(EventBusSource.MICROBIT_ID_ACCELEROMETER, EventBusValue.MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE, function () {
    if (is_turning == 1) {
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
function sendCommand (base: number, value: number) {
    radio.sendNumber(base + value)
}
input.onButtonPressed(Button.AB, function () {
    if (is_turning == 0) {
        is_turning = 1
        basic.showString("T")
    } else {
        is_turning = 0
        basic.showString("D")
    }
})
function shiftGear (direction: number) {
    current_gear_index = Math.constrain(current_gear_index + direction, 0, gears.length - 1)
    basic.showNumber(gears[current_gear_index])
}
input.onButtonPressed(Button.B, function () {
    shiftGear(-1)
    sendCommand(velocity_command, gears[current_gear_index])
})
input.onGesture(Gesture.Shake, function () {
    reset()
    sendCommand(control_command, 1)
})
function reset () {
    current_gear_index = gears.length / 2
    light2 = 0
    roll = 0
    is_turning = 0
}
let roll = 0
let is_turning = 0
let current_gear_index = 0
let light2 = 0
let gears: number[] = []
let light_command = 0
let velocity_command = 0
let control_command = 0
radio.setGroup(42)
reset()
control_command = 0
velocity_command = 256
let turn_command = 512
light_command = 768
gears = [
-100,
-50,
0,
50,
100
]
