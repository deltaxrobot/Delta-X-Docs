# GCODES FOR DESKTOP CONVEYOR

## Detect Desktop Conveyor COM Port

To determine if the COM port is connected to the `Desktop Conveyor`, you can send the command `IsXConveyor`. If the COM port is linked to the conveyor, it will respond with `YesXConveyor`.

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

`[value] = 0`: Auto Mode (Conveyor will run continously and its speed is adjusted by the potentiometer).
`[value] = 1`: Serial Mode (Conveyor will be controlled by the signal send to the serial port).

#### Example

```
M310 1    ;change control mode to Serial Mode
```

---


## M311 - Set Speed In Serial Mode

#### Decription

Set the speed of the conveyor belt when it is in Serial Mode. This speed will be kept exactly when running. With a positive value it will move in one direction and with a negative value it will move in the opposite direction.

#### Usage

```
M311 [<value>]
```

#### Parameter

`[value]`: Conveyor speed in mm/s.

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

`[value]`: Position in mm.

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

`[value]`: Speed in mm/s.

#### Example

```
M313 300    ;move to position 123
```

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
