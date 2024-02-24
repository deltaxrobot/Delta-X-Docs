# GCODES FOR X CONVEYOR BOARD

## Detect Conveyor COM Port

If you wanna know that the COM port which connected was `X Conveyor` or not, you can send command `IsXConveyor`. If the COM port is connected to conveyor, it will response `YesXConveyor`.

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

* `[value] = 0`: Output Mode (Stepper output pins will be use as a normal digital output).
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

Conveyor will move to a specified position.

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
M315 S31.83 R0 E0 A5000 ;set up conveyor parameters (31.8 pulse/mm, not reverse dir, disable encoder, accel=5000mm/s^2)
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

## M317 - Get Position from Encoder

#### Description

Get current position of the conveyor from Encoder

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

## M390 - Set Ethernet Port

#### Description

Set the port number of ethernet communication

#### Usage
```
M390 [port]
```
#### Parameter

* `[port]`: ethernet port
#### Example
```
M390 3456; set ethernet port 
```

## M391 - Set Ethernet IP Address

#### Description

You can define Ethernet IP address by yourself.

#### Usage
```
M390 [number] [number] [number] [number]
```
#### Parameter

* `[number]`: number of IP address

#### Example
```
M391 192 168 0 2; set IP as 192.168.0.2
```

## M392 - Set Ethernet DNS Address

#### Description

You can define Ethernet DNS address by yourself.

#### Usage
```
M392 [number] [number] [number] [number]
```
#### Parameter

* `[number]`: number of DNS address

#### Example
```
M392 192 168 0 127; set DNS as 192.168.0.127
```

## M393 - Set Ethernet Gateway Address

#### Description

You can define Ethernet Gateway address by yourself.

#### Usage
```
M393 [number] [number] [number] [number]
```
#### Parameter

* `[number]`: number of gateway address

#### Example
```
M393 192 168 237 81; set gateway as 192.168.237.81
```

## M394 - Set Ethernet Subnet Address

#### Description

You can define Ethernet Subnet address by yourself.

#### Usage
```
M394 [number] [number] [number] [number]
```
#### Parameter

* `[number]`: number of subnet address

#### Example
```
M394 192 168 237 81; set subnet as 192.168.237.89
```

## M395 - Set Ethernet MAC Address

#### Description

You can define Ethernet MAC address by yourself. You need to covert HEX number in address to DEC number before sending to robot.

#### Usage
```
M395 [number] [number] [number] [number]  [number] [number]
```
#### Parameter

* `[number]`: number of MAC address (integer)

#### Example
```
M395 18 52 86 120 171 5; set MAC as 12:34:56:78:AB:05
```

## M396 - Save and Init Ethernet Port

#### Description

After all Ethernet addresses and port are set, use this command to save and initializing the ethernet port.

#### Usage

```
M396
```
#### Example

```
M396 ;init Ethernet port
```
## M397 - Get Ethernet Port Parameters

#### Description
Use this command to check all Ethernet address and port number.

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

## M398 - Get Ethernet Local Port Parameters

#### Description
Use this command to check all Ethernet local address and port number.

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

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
