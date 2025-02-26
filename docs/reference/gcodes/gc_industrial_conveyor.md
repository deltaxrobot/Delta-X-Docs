# GCODES FOR X CONVEYOR BOARD

## Detect Conveyor COM Port

To check if the connected COM port is for the `X Conveyor`, send the command `IsXConveyor`. If the COM port is connected to the conveyor, it will respond with `YesXConveyor`.

#### Example

```
IsXConveyor

>>> YesXConveyor
```

## M310 - Set Motion Mode

#### Description

Set the motion mode of the conveyor belt. After selecting the motion mode, the position of the conveyor will be reset to 0.

#### Usage

```
M310 [<value>]
```

#### Parameter

* `[value] = 0`: Output Mode (Stepper output pins will be used as normal digital outputs).
* `[value] = 1`: Position Mode (Position of the conveyor will be controlled by commands sent to the serial port).
* `[value] = 2`: Velocity Mode (Velocity of the conveyor will be controlled by commands sent to the serial port).
* `[value] = 3`: Manual Mode (Velocity of the conveyor will be controlled by buttons).

#### Example

```
M310 1    ;change control mode to Position Mode
```

---

## M311 - Set Speed In Velocity Mode

#### Description

Set the speed of the conveyor belt when it is in velocity mode. The speed will be maintained exactly as set. A positive value moves the conveyor in one direction, and a negative value moves it in the opposite direction.

#### Usage

```
M311 [<value>]
```

#### Parameter

* `[value]`: Conveyor speed in mm/s.

#### Example

```
M311 200    ;set speed to 200 mm/s
M311 -200   ;set speed to 200 mm/s in the opposite direction
```

---

## M312 - Set Position

#### Description

Move the conveyor to a specified position. If you want to reset the position, you can send 'M310 1' again to reset the current position to 0.

#### Usage

```
M312 [<value>]
```

#### Parameter

* `[value]`: Position in mm.

#### Example

```
M312 123    ;move to position 123 mm
```

---

## M313 - Set Speed In Position Move

#### Description

Set the speed of the conveyor belt when moving to the desired position specified by M312.

#### Usage

```
M313 [<value>]
```

#### Parameter

* `[value]`: Speed in mm/s.

#### Example

```
M313 300    ;set speed to 300 mm/s for position move
```

---

## M314 - Set Output Pins Level

#### Description

Set the output pins level in Output Mode.

#### Usage

```
M314 [P<value>] [V<value>]
```

#### Parameter

* `P[value]`: Index of the output pin.
* `V[value]`: Value to set (0 for LOW, 1 for HIGH).

#### Example

```
M314 P1 V1    ;set output pin 1 to HIGH level
```

---

## M315 - Config Conveyor Parameters

#### Description

Configure the conveyor parameters.

#### Usage

```
M315 [S<value>] [R<value>] [E<value>] [P<value>] [A<value>] [B<value>]
```

#### Parameter

* `S[value]`: Pulses per mm of the stepper.
* `R[value]`: Set reverse conveyor (0 for normal, 1 for reverse).
* `E[value]`: Enable/disable encoder (0 for disable, 1 for enable).
* `P[value]`: Set stop position while using encoder.
* `A[value]`: Acceleration of the conveyor in mm/s².
* `B[value]`: Set velocity button.

#### Example

```
M315 S31.83 R0 E0 A5000 ;set conveyor parameters (31.83 pulses/mm, normal direction, encoder disabled, acceleration 5000 mm/s²)
```

!!! note "Note"
    If you send the "M315" command without any parameters, it will return the current values of all the above parameters.

---

## M316 - Set Encoder Mode

#### Description

Configure the Encoder Port Mode:
* 0 - Absolute Mode: Return absolute position value.
* 1 - Relative Mode: Return relative position value.
* 2 - Input Pin Mode: Use encoder port as input pins.
* 3 - Button Mode: Connect to buttons to adjust the conveyor speed.

#### Usage

```
M316 [mode]
```

#### Parameter

* `[mode]`: Mode of the Encoder Port.

#### Example

```
M316 1   ;set encoder port to Relative Mode
```

---

## M317 - Get Position from Encoder

#### Description

Get the current position of the conveyor from the encoder.

#### Usage

```
M317 [T<value>] [R]
```

#### Parameter

* `T[value]`: Set auto-report position period time in milliseconds.
* `R`: Reset the position.
* (no parameter): Report current position once.

#### Example

```
M317          ;get current position
>> P0:5.32
M317 T500     ;set auto-report position every 500 ms
>> P0:8.43
>> P0:16.57
M317 R        ;reset the position to 0
```

---

## M318 - Set Encoder Parameters

#### Description

Configure encoder parameter values: pulses per mm, reverse direction, and encoder scale parameter.

#### Usage

```
M318 [S<value>] [R<value>] [C<value>]
```

#### Parameter

* `S[value]`: Pulses per mm of the encoder (default is 5.12 with X1 scale parameter).
* `R[value]`: Reverse direction (0 for disable, 1 for enable).
* `C[value]`: Scale factor of the encoder (1, 2, 4).

#### Example

```
M318 S10.24 C2 R1 ;set X2 scale factor, pulses per mm will be doubled, and reverse the direction of the encoder
```

---

## M319 - Read Input Pin

#### Description

Get the status of an input pin in several modes.

#### Usage

```
M319 [V<value>] [T<value>] [S<value>]
```

#### Parameter

* `V[pin index]`: Get current status of the pin at the specified index (0, 1).
* `T[pin index]`: Set auto feedback when pin status changes.
* `S[pin index]`: Stop auto feedback at the specified pin index.

#### Example

```
M319 V1 ;get status of pin 1
>> I1 V1
M319 T0 ;set auto feedback for pin 0
>> I0 V0
>> I0 V1
M319 S0 ;stop auto feedback for pin 0
```

---

## M390 - Set Ethernet Port

#### Description

Set the port number for Ethernet communication.

#### Usage

```
M390 [port]
```

#### Parameter

* `[port]`: Ethernet port number.

#### Example

```
M390 3456 ;set Ethernet port to 3456
```

---

## M391 - Set Ethernet IP Address

#### Description

Define the Ethernet IP address.

#### Usage

```
M391 [number] [number] [number] [number]
```

#### Parameter

* `[number]`: IP address segments.

#### Example

```
M391 192 168 0 2 ;set IP address to 192.168.0.2
```

---

## M392 - Set Ethernet DNS Address

#### Description

Define the Ethernet DNS address.

#### Usage

```
M392 [number] [number] [number] [number]
```

#### Parameter

* `[number]`: DNS address segments.

#### Example

```
M392 192 168 0 127 ;set DNS address to 192.168.0.127
```

---

## M393 - Set Ethernet Gateway Address

#### Description

Define the Ethernet Gateway address.

#### Usage

```
M393 [number] [number] [number] [number]
```

#### Parameter

* `[number]`: Gateway address segments.

#### Example

```
M393 192 168 237 81 ;set Gateway address to 192.168.237.81
```

---

## M394 - Set Ethernet Subnet Address

#### Description

Define the Ethernet Subnet address.

#### Usage

```
M394 [number] [number] [number] [number]
```

#### Parameter

* `[number]`: Subnet address segments.

#### Example

```
M394 192 168 237 89 ;set Subnet address to 192.168.237.89
```

---

## M395 - Set Ethernet MAC Address

#### Description

Define the Ethernet MAC address. Convert HEX numbers in the address to DEC numbers before sending to the robot.

#### Usage

```
M395 [number] [number] [number] [number] [number] [number]
```

#### Parameter

* `[number]`: MAC address segments (integer).

#### Example

```
M395 18 52 86 120 171 5 ;set MAC address to 12:34:56:78:AB:05
```

---

## M396 - Save and Init Ethernet Port

#### Description

After setting all Ethernet addresses and port, use this command to save and initialize the Ethernet port.

#### Usage

```
M396
```

#### Example

```
M396 ;initialize Ethernet port
```

---

## M397 - Get Ethernet Port Parameters

#### Description

Use this command to check all Ethernet address and port numbers.

#### Example

```
>>> M397 ;get all Ethernet setting parameters
<<< E_port:3456
<<< E_ip:192.168.0.2
<<< E_dns:192.168.0.127
<<< E_gateway:192.168.237.81
<<< E_subnet:192.168.237.89
<<< E_mac:12-34-56-78-AB-05
<<< Ok
```

---

## M398 - Get Ethernet Local Port Parameters

#### Description

Use this command to check all Ethernet local address and port numbers.

#### Example

```
>>> M398 ;get all Ethernet setting parameters
<<< E_port:3456
<<< E_ip:192.168.0.2
<<< E_dns:192.168.0.127
<<< E_gateway:192.168.237.81
<<< E_subnet:192.168.237.89
<<< E_mac:12-34-56-78-AB-05
<<< Ok
```

---

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005