# GCODES FOR INDUSTRIAL CONVEYOR/ENCODER BOARD

## Detect Conveyor COM Port

If you wanna know that the COM port which connected was `Industrial Conveyor` or not, you can send command `IsXConveyor`. If the COM port is connected to conveyor, it will response `YesXConveyor`.

#### Example

```
IsXConveyor

>>> YesXConveyor
```

## M310 - Set Motion Mode

#### Decription

Set the motion mode of the conveyor belt.

#### Usage

```
M310 [<value>]
```

#### Parameter

<!-- `[value] = 0`: Output Mode (Stepper output pins will be use as a normal digital output). -->
* `[value] = 1`: Position Mode (Position of the conveyor will be controlled by the command send to the serial port).
* `[value] = 2`: Velocity Mode (Velocity of the conveyor will be controlled by the command send to the serial port).
* `[value] = 3`: Manual mode (Velocity of the conveyor will be controlled by the buttons).

#### Example

```
M310 1    ;change control mode to Position Mode
```

---


## M311 - Set Speed In Velocity Mode

#### Decription

Set the speed of the conveyor belt when it is in velocity mode. This speed will be kept exactly when running. With a positive value it will move in one direction and with a negative value it will move in the opposite direction.

#### Usage

```
M311 [<value>]
```

#### Parameter

* `[value]`: Conveyor speed in mm/s.

#### Example

```
M311 200    ;set speed is 200 mm/s.

M311 -200    ;set speed is 200 mm/s but in opposite dir.
```

---

## M312 - Set Position

#### Decription

Conveyor will move to a specified position relative to the current position.

#### Usage

```
M312 [<value>]
```

#### Parameter

* `[value]`: Position in mm.

#### Example

```
M312 123    ;move to position 123
```

---

## M313 - Set Speed In Position Move

#### Decription

Set the speed of the conveyor belt when it is running to desired position of M312.

#### Usage

```
M313 [<value>]
```

#### Parameter

* `[value]`: Speed in mm/s.

#### Example

```
M313 300    ;move to position 123
```

## M314 - Set Output Pins Level

#### Decription

Set the output pins level in Output Mode

#### Usage

```
M314 [P<value>] [V<value>]
```

#### Parameter

* `P[value]`: Index of the output pin.
* `V[value]`: value wanna set.

#### Example

```
M314 P1 V1    ;set output pin 1 at HIGH level.
```

## M315 - Config Conveyor Parameters

#### Decription

Config the conveyor parameters.

#### Usage

```
M315 [S<value>] [R<value>] [E<value>] [P<value>] [A<value>] [B<value>]
```

#### Parameter

* `S[value]`: pulse/mm of the stepper.
* `R[value]`: set reverse conveyor.
* `E[value]`: enable/disable encoder.
* `P[value]`: set stop position while using encoder.
* `A[value]`: acceleration of the conveyor.
* `B[value]`: set velocity button.

#### Example

```
M314 P1 V1    ;set output pin 1 at HIGH level.
```

!!! note "Note"
    If you send "M315" command without any parameter, it will send the values of all above parameters.


## M316 - Set Encoder Mode

#### Decription

Config the Encoder Port Mode: 
0 - Absolute Mode -> return absolute position value
1 - Relative Mode -> return relative position value
2 - Input Pin Mode -> use encoder port as input pins
3 - Button Mode -> connect to buttons to adjust the conveyor speed

#### Usage

```
M316 [mode]
```

#### Parameter

* `[mode]`: mode of the Encoder Port

#### Example

```
M316 1   ;set relative mode for encoder port
```

## M317 - Get Position

#### Description

Get current position of the conveyor 

#### Parameter

* `T[value]`: set auto report position period time.
* `R`: reset the position.
* ``: report current position once time.

#### Usage

```
M317 ;get current postion
>> P0:5.32
M317 T500 ;set auto send position after every 500ms
>> P0:8.43
>> P0:16.57
M317 R ;reset the position to 0

```

## M318 - Set encoder parameters

#### Description

Config encoder parameter values: pulse/mm, reverse direction, encoder scale parameter.

#### Parameter

* `S[value]`: pulse/mm of encoder: default is 5.12 with X1 scale parameter.
* `R[value]`: 0 - disable reverse direction, 1 - enable reverse direction
* `C[value]`: scale factor of encoder (1,2,4)
* ``: return all above parameters.

#### Usage

```
M318 S10.24 C2 R1 ;set X2 scale factor, that mean pulse/mm will x2 too, and reverse the direction of the encoder.
```

## M319 - Read Input Pin

#### Description

Get the status of input pin in several mode.

#### Parameter

* `V[pin index]`: get current status at pin index(0, 1).
* `T[pin index]`: set auto feedback when pin status was changed.
* `S[pin index]`: stop auto feedback at pin index.

#### Usage

```
M319 V1 ;get pin 1 status
>> I1 V1
M319 T0 ;set pin 0 auto feedback
>> I0 V0
>> I0 V1
M319 S0 ;stop pin 0 auto feedback
```


