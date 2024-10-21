# Gcodes for Delta X 2

## G00, G01 - Linear Move

### Descriptions

The **G0** and **G1** commands add a **LINEAR MOVE** to the queue to be performed after all previous moves are completed. A command like **G1 F1000** sets the feed rate for all subsequent moves.

### Usage

```
G00 [F<rate>] [X<pos>] [Y<pos>] [Z<pos>] [W<angle>] [U<angle>]
G01 [F<rate>] [A<rate>] [J<rate>] [S<rate>] [E<rate>] [X<pos>] [Y<pos>] [Z<pos>] [W<angle>] [U<angle>]
```

### Parameters

* `F[rate]`: (mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `A[rate]`: (mm/s^2) The maximum acceleration of the movement.
* `J[rate]`: (mm/s^3) The jerk of the movement.
* `S[rate]`: (mm/s) The start velocity of the movement.
* `E[rate]`: (mm/s) The end velocity of the movement.
* `X[pos]`: (mm) A coordinate on the X-axis.
* `Y[pos]`: (mm) A coordinate on the Y-axis.
* `Z[pos]`: (mm) A coordinate on the Z-axis.
* `W[angle]`: (mm) A coordinate on the 4-axis.
* `U[angle]`: (mm) A coordinate on the 5-axis.

### Example

```
G01 X12                         ;move to 12mm on the X-axis
G01 F200                        ;set the feedrate to 200 mm/s
G01 X90.6 Y13.8                 ;move to 90.6mm on the X-axis and 13.8mm on the Y-axis     
G01 X0 Y0 Z-350                 
G01 W90                         ;rotate to 90 degree on the 4-axis
G01 X100 Y50 Z-400 W90 U45 F200 ;X=100 mm, Y=50 mm, Z=-400 mm, W=90°, U=45°, F=200 mm/s
```

---

## G02, G03 - Arc or Circle Move

### Descriptions

**G2** adds a **clockwise** arc move to the planner; **G3** adds a **counter-clockwise** arc. An arc move starts at the current position and ends at the given XYZ, pivoting around a center-point offset given by I and J.

### Usage

```
G2 [F<rate>] [I<offset>] [J<offset>] [X<pos>] [Y<pos>] [W<angle>] [U<angle>]
G3 [F<rate>] [I<offset>] [J<offset>] [X<pos>] [Y<pos>] [W<angle>] [U<angle>]
```

### Parameters

* `F[rate]`: (mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `I[offset]`:(mm) An offset from the current X position to use as the arc center.
* `J[offset]`:(mm) An offset from the current Y position to use as the arc center.
* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `W[angle]`: (mm) A coordinate on the 4-axis.
* `U[angle]`: (mm) A coordinate on the 5-axis.

### Example

```
G28
G01 Z-350
G01 X50
G02 X-50 Y0 I-50 J0
G03 X50 Y0 I50 J0
```

---

## G04 - Dwell/Delay

### Descriptions

Dwell **pauses the command queue** and waits for a period of time.

### Usage

```
G04 [P<time>]
```

### Parameters

* P[time]: delay time in miliseconds.

### Example

```
G01 X0 Y0 Z-350
G4 P500          ;delay 500ms
G01 X100
```

---

## G05 - Bézier cubic spline

### Descriptions

**G5** creates a cubic B-spline in the XY plane with the X and Y axes only. **P** and **Q** parameters are **required**. **I** and **J** are **required** for the **first G5 command in a series**. For subsequent G5 commands, either both **I and J must be specified**, or neither. If I and J are unspecified, the starting direction of the cubic will automatically match the ending direction of the previous cubic (as if I and J are the negation of the previous P and Q).

### Usage

```
G5 [F<rate>] I<pos> J<pos> P<pos> Q<pos> X<pos> Y<pos>
```

### Parameters

* `F[rate]`:(mm/s) The maximum feedrate of the move between the start and end point. This value applies to all subsequent moves.
* `I[offset]`:(mm) Offset from the X start point to first control point.
* `J[offset]`:(mm) Offset from the Y start point to first control point.
* `P[offset]`:(mm) Offset from the X end point to second control point.
* `Q[offset]`:(mm) Offset from the Y end point to the second control point.
* `X[pos]`:(mm) A destination coordinate on the X axis.
* `Y[pos]`:(mm) A destination coordinate on the Y axis.

### Example

```
;program a curvy “N” shape
G0 X0 Y0
G5 I0 J3 P0 Q-3 X1 Y1
```

---

## G06 - Theta angle control

### Descriptions

Directly control movement angle without endpoint coordinates.

### Usage

```
G06 [X<angle>] [Y<angle>] [Z<angle>]
```

### Parameters

* `X[angle]`:(degree) The value of the Theta 1 angle.
* `Y[angle]`:(degree) The value of the Theta 2 angle.
* `Z[angle]`:(degree) The value of the Theta 3 angle.

### Example

```
G6 X0 Y0 Z0      ;set theta 1, theta 2, theta 3 angle at 0 deg
```

---

## G28 - Homing

### Descriptions

Auto-home all axes, moving them towards their endstops until triggered.

### Usage

```
G28
```

---

## G90 - Absolute Movement Mode

### Descriptions

In absolute mode, all coordinates given in G-code are interpreted as positions in the logical coordinate space.

### Usage

```
G90
```

!!! note "Note"
    Absolute positioning is the default.

---

## G91 - Relative Movement Mode

### Descriptions

Set relative position mode. In this mode, all coordinates are interpreted as relative to the last position.

### Usage

```
G91
```

### Example

```
G91              ; Set all axes to relative
```
---

## G93 - Get Current Position

### Descriptions

Get current position of end effector.

### Usage

```
G93
```

### Feedback

* `<xpos>, <ypos>, <zpos>`
    * `<xpos>` : Current X position.
    * `<ypos>` : Current Y position.
    * `<zpos>` : Current Z position.

### Example

```
G93              ; get current pos

return:
31, 43, -270
```

---

## M03 - Vacuum On / Gripper Close

### Descriptions

M03 is used to turn on the vacuum pump or close the gripper.

### Usage

```
M03
```

### Example

```
G01 X0 Y0 Z-350
M03                   ;turn on Vacuum pump
G01 Z-300
```

---

## M04 - Turn on digital output pins

### Descriptions

M04 is used to turn on and set PWM value for digital output pin (D0 - D3).

### Usage

```
M04 [D<pin>] [P<value>]
```

### Parameters

* `D[pin]`:(0 ~ 3) The index of output pin
* `P[value]`:(0 - 255) The value of the pwm

### Example

```
M04 D1 P128 ;set pin D1 pwm at 50% 
```

---

## M05 - Vacuum Off / Gripper Open

### Descriptions

M05 is used to turn off the vacuum pump or close the gripper.

### Usage

```
M05  ;turn off vacuum
```

---

## M06 - Turn off digital output pins

### Descriptions

M06 is used to turn off digital output pin (D0 - D3).

### Usage

```
M06 [D<pin>]
```

### Parameters

* `D[pin]`:(0 ~ 3) The index of output pin

### Example

```
M06 D1 ;turn off pin D1
```

---

## M07 - Read Input Signals

### Descriptions

M07 is used to read the input signal from the input pins.

### Usage

```
M07 [I<pin>] [A<pin>]
```

### Parameters

* `I[pin]`:(0 ~ 3) The index of digital input pin
* `A[pin]`:(0 ~ 1) The index of analog input pin

### Feedback

* `I[pin] V[value]`:
    * `I[pin]` : The index of digital input pin
    * `V[value]` : {0,1} The value of the digital input signal

* `A[pin] V[value]`:
    * `A[pin]` : The index of analog input pin
    * `V[value]` : [0 ~ 4095] The value of the analog input signal

### Example

```
M07 I0 I3              ;read digital pin I0 and I3
>>> I0 V1
>>> I3 V0
M07 A1                 ;read analog pin A1
>>> A1 V3946
```

---

## M08 - Read Input Signals Automatically

### Descriptions

M08 is used to read the input signal from the input pins automatically.

### Usage

```
M08 [I<pin>]
M08 [A<pin>] [P<time>]
```

### Parameters

* `I[pin]`:(0 ~ 3) The index of digital input pin
* `A[pin]`:(0 ~ 1) The index of analog input pin
* `P[time]`:(ms) The time to read the analog input signal

### Feedback

* `I[pin] V[value]`:
    * `I[pin]` : The index of digital input pin
    * `V[value]` : {0,1} The value of the digital input signal

* `A[pin] V[value]`:
    * `A[pin]` : The index of analog input pin
    * `V[value]` : [0 ~ 4095] The value of the analog input signal

### Example
    
```
M08 I0   ;read digital pin I0 automatically
M08 A1 P1000  ;read analog pin A1 every 1000ms
```

---

## M09 - Disable Automatic Reading Analog Input Signal

### Descriptions

M09 is used to disable automatic reading the analog input signal.

### Usage

```
M09 [A<pin>]
```

### Parameters

* `A[pin]`:(0 ~ 1) The index of analog input pin

### Example

```
M09 A1  ;disable automatic reading analog pin A1
```

## M50 - Enable RJ45

#### Descriptions

This command can be used to enable or disable RJ45 port.

#### Usage

```
M50 A<x>
```

#### Parameter

* `A[x]`
    * `x = 1` : enable RJ45
    * `x = 0` : disable RJ45

#### Example

```
M50 A1           ; enable RJ45
```

---

## M51 - Set Ethernet Port

#### Descriptions

Set ethernet port number

#### Usage

```
M51 B<x>
```

#### Parameter

* `B[x]` : port number

#### Example

```
M51 B8080         ; set ethernet port
```

---

## M52 - Set MAC Device

#### Descriptions

Set MAC address of the robot

#### Usage

Address form: A:B:C:D:E:F

```
M52 A<x> B<y> C<z> D<t> E<u> F<v>
```

#### Parameter

* `A[x]` : number
* `B[y]` : number
* `C[z]` : number
* `D[t]` : number
* `E[u]` : number
* `F[v]` : number

#### Example

```
M52 A12 B23 C34 D45 E56 F67

>>> MAC add: 12-23-34-45-56-67 
```

---

## M53 - Set Ethernet IP

#### Descriptions

Set ethernet IP of robot

#### Usage

```
M53 A<x> B<y> C<z> D<t>
```

#### Parameter

* `A[x]` : number
* `B[y]` : number
* `C[z]` : number
* `D[t]` : number

#### Example

```
M53 A192 B168 C1 D1

>>> IP: 192.168.1.1
```

---

## M54 - Set Ethernet DNS

#### Descriptions

Set ethernet DNS address

#### Usage

```
M54 A<x> B<y> C<z> D<t>
```

#### Parameter

* `A[x]` : number
* `B[y]` : number
* `C[z]` : number
* `D[t]` : number

#### Example

```
M53 A192 B168 C1 D3

>>> DNS IP: 192.168.1.3
```

---

## M55 - Set Ethernet Gateway

#### Descriptions

Set ethernet gateway address

#### Usage

```
M55 A<x> B<y> C<z> D<t>
```

#### Parameter

* `A[x]` : number
* `B[y]` : number
* `C[z]` : number
* `D[t]` : number

#### Example

```
; set ethernet gateway address 192.168.3.1
M55 A192 B168 C3 D1
```

---

## M56 - Set Ethernet Subnet

#### Descriptions

Set ethernet gateway address

#### Usage

```
M56 A<x> B<y> C<z> D<t>
```

#### Parameter

* `A[x]` : number
* `B[y]` : number
* `C[z]` : number
* `D[t]` : number

#### Example

```
; set ethernet subnet address 192.168.3.1
M56 A192 B168 C3 D1
```

---

## M57 - Get Robot IP

#### Descriptions

Get the IP of Delta X 2 Plus Robot

#### Usage

```
M57
```

#### Example

```
M57

>>> 192.168.2.2
```

---

## M84 - Disable Steppers

### Descriptions

This command can be used to disable steppers.

### Usage

```
M84
```
---


## M203 - Set Feedrate

### Descriptions

Set movement feedrate.

### Usage

```
M203 S<value>
```

### Parameters
* `S[value]`: (mm/s) max feedrate.

### Example

```
M203 S500  ;Set max feedrate
```

---

## M204 - Set Acceleration

### Descriptions

Set movement acceleration.

### Usage

```
M204 A<value>
```

### Parameters

* `A[value]`: (mm/s2) end effector acceleration.

### Example

```
M204 A5000  ;Set movement acceleration.
```

---

## M205 - Set Begin/End Velocity

### Descriptions

Set segment begin/end velocity.

### Usage

```
M205 S<value>
```

### Parameters

* `S[value]`: (mm/s2) end effector begin/end velocity.

### Example

```
M205 S40  ;Set begin speed at 40 mm/s
```

---

## M206 - Set Axis Offset

### Descriptions

Set home offset for one or all axis.

### Usage

```
M206 [X<value>] [Y<value>] [Z<value>]
```

### Parameters

* `X[value]`: (mm) X offset value.
* `Y[value]`: (mm) Y offset value.
* `Z[value]`: (mm) Z offset value.

### Example

```
M206 X20 Y-10 Z30  ;Set home offsets
```

---

## M207 - Set Z Safe 

#### Descriptions

Set the lowest Z level that the robot cannot exceed.

#### Usage

```
M207 [Z<value>]
```

#### Parameters

* `Z[value]`: (mm) Z safe value.

#### Example

```
M207 Z-870  ;Set Z safe value
```

---

## M210 - Set Theta Movement Parameter

#### Descriptions

Config theta movement para like speed, accel, jerk, start velocity and end velocity.

#### Usage

```
M210 [F<value>] [A<value>] [J<value>] [S<value>] [E<value>]
```

#### Parameters

* `F[value]`: (unit/s) speed.
* `A[value]`: (unit/s^2) accel.
* `J[value]`: (unit/s^3) jerk.
* `S[value]`: (unit/s) start velocity.
* `E[value]`: (unit/s) end velocity.

#### Example

```
M210 F2000 A4000 J800000 S30 E30  ;set all theta movement para
```

---


## M360 - Select End Effector

### Descriptions

Select the end effector for the robot. You can change the end effector to one of these : Vacuum, gripper, pen, laser, printer or use your custom end effector.

### Usage

```
M360 E<value>
```

### Parameters

* `E[value]`
    * 0-Vacuum (default).
    * 1-Gripper
    * 2-Pen
    * 3-Laser
    * 4-Printer
    * 5-Custom

### Example

```
M360 E2  ;select the end effector is Pen
```
---

## M361 - Set minimum moving distance

### Descriptions

Set the length of minimum moving distance.

### Usage

```
M361 P<len>
```

### Parameters

* `P[len]`: (mm) Length in mm.

### Example

```
M361 P0.1    ;set minium moving distance = 0.1mm
```

---

## M500 - Save Settings

### Descriptions

Save all configurable settings to EEPROM.

### Usage

```
M500
```

### Example

```
M500    ;Save settings
```

---

## M501 - Restore Settings

### Descriptions

Load all saved settings from EEPROM.

### Usage

```
M501
```

### Example

```
M501    ;Restore all settings.
```

---

## M502 - Reset Settings

### Descriptions

Reset all configurable settings to their factory defaults.

### Usage

```
M502
```

### Example

```
M502    ;reset
```

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
