# G-CODES FOR DELTA XS V4 

## G0, G1 - Linear Movement

#### Descriptions

The G0 and G1 commands add a linear MOVE to the queue to be performed after all previous moves are completed. A command like G1 F1000 sets the feed rate for all subsequent moves.

#### Usage

```
G1 [X<pos>] [Y<pos>] [Z<pos>] [W<angle>] [U<angle>] [V<angle>] 
   [F<val>] [A<val>] [J<val>] [S<val>] [E<val>]
```

#### Parameters

* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `Z[pos]`:(mm) A coordinate on the Z-axis.
* `W[angle]`:(mm) A coordinate on the 4-axis.
* `U[angle]`:(mm) A coordinate on the 5-axis.
* `V[angle]`:(mm) A coordinate on the 6-axis.
* `F[val]`:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `A[val]`:(mm/s2) Acceleration of the motion.
* `J[val]`:(mm/s3) Jerk of the motion.
* `S[val]`:(mm/s) Begin velocity.
* `E[val]`:(mm/s) Finish velocity.

#### Example

```
G01 X12                         ;move to 12mm on the X-axis
G01 F200 A5000 J1200000         ;set the feedrate=200 mm/s, accel=5000mm/s2, jerk=1200000mm/s3
G01 X90.6 Y13.8 S50 E100        ;move to 90.6mm on the X-axis and 13.8mm on the Y-axis with begin vel = 50, end vel = 100 mm/s   
G01 X0 Y0 Z-750                 
G01 W90                         ;rotate to 90° on the 4-axis
G01 X100 Y50 Z-400 W90 U45 F200 ;X=100 mm, Y=50 mm, Z=-400 mm, W=90°, U=45°, F=200 mm/s
```
---

## G2, G3 - Controlled Arc Movement

#### Descriptions

**G2** adds a **clockwise** arc move to the planner; **G3** adds a **counter-clockwise** arc. An arc move starts at the current position and ends at the given XYZ, pivoting around a center-point offset given by I and J.

#### Usage

```
G02 [I<offset>] [J<offset>] [X<pos>] [Y<pos>] [W<angle>] [U<angle>] [V<angle>]
    [F<val>] [A<val>] [J<val>] [S<val>] [E<val>]
```

#### Parameters

* `I[offset]`:(mm) An offset from the current X position to use as the arc center.
* `J[offset]`:(mm) An offset from the current Y position to use as the arc center.
* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `F[val]`:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `A[val]`:(mm/s2) Acceleration of the motion.
* `J[val]`:(mm/s3) Jerk of the motion.
* `S[val]`:(mm/s) Begin velocity.
* `E[val]`:(mm/s) Finish velocity.

#### Example

```
G28
G01 Z-350
G01 X50
G02 X-50 Y0 I-50 J0
G03 X50 Y0 I50 J0
```

---

## G4 - Dwell/Delay

#### Descriptions

Pause the robot for a period of time.

#### Usage

```
G4 P<value>
```

#### Parameters

* `P[value]`: time in milisecons.

#### Example

```
G01 X0 Y0 Z-350
G4 P500          ;delay 500ms
G01 X100
```

---

## G6 - Theta angle control

#### Descriptions

Directly control movement angle without endpoint coordinates.

#### Usage

```
G6 [X<angle>] [Y<angle>] [Z<angle>] [W<angle>] [U<angle>] [V<angle>]
```

#### Parameters

* `X[angle]`:(degree) The value of the Theta 1 angle.
* `Y[angle]`:(degree) The value of the Theta 2 angle.
* `Z[angle]`:(degree) The value of the Theta 3 angle.
* `W[angle]`:(degree) The value of the Axis 4 angle.
* `U[angle]`:(degree) The value of the Axis 5 angle.
* `V[angle]`:(degree) The value of the Axis 6 angle.

#### Example

```
G6 X0 Y0 Z0 W90 U90
```

---

## G28 - Homing
#### Descriptions

Auto-home all axes, moving them towards their endstops until triggered.

#### Usage

```
G28
```

---

## G90 - Absolute Movement Mode
#### Descriptions

In absolute mode, all coordinates given in G-code are interpreted as positions in the logical coordinate space.

#### Usage

```
G90
```

---

## G91 - Relative Movement Mode
#### Descriptions

Set relative position mode. In this mode, all coordinates are interpreted as relative to the last position.

#### Usage

```
G91
```

---

## M03, M04 - Turn Ouput On / Set PWM
#### Descriptions

This is the command used to turn on the Delta X S robot's output pin.

#### Usage

```
M03 D<x>
M03 P<x> W<y>
M04 P<x> W<y>
```

#### Parameters

* `M03 D[x]` : turn on digital pins
    * `x` = 0, 1, 2, ... 15.
* `M03 P[x] W[y]` : turn on PWM pins
    * `x` = 0, 1, 2, 3, 4, 8, 9, 10, 14, 15.
    * `y` = [0, 255]
* `M04 P[x] W[y]` : turn on PWM pins but with larger pwm range.
    * `x` = 0, 1, 2, 3, 4, 8, 9, 10, 14, 15.
    * `y` = [0, 65535].

#### Example

```
G01 X0 Y0 Z-750
M03 D0                ;turn on relay D0
G01 Z-700
```

---

## M05 - Ouput Off / Turn Off PWM

#### Descriptions

This is the command used to turn off the Delta X S robot's output pin

#### Usage

```
M05 D<x>
M05 P<x>
```

#### Parameters

* `M05 D[x]`: turn off digital output pin
    * `x` = 0, 1, 2, ... 15.
* `M05 P[x]`: turn off PWM output pin
    * `x` = 0, 1, 2, 3, 4, 8, 9, 10, 14, 15.

#### Example

```
G01 X0 Y0 Z-750
M03 D0                ;turn on relay D0
G01 Z-780
G04 P300
G01 Z-750
G01 X50 Y50
M05 D0                ;turn off relay D0
```

---

## M07 - Read Input Signals.

#### Descriptions

Read Digital and Analog input signals.

#### Usage

```
M07 I<x>
M07 A<x>
```

#### Parameters

* `M07 I[x]`: Read Digital Input Pin
    * `x` = 0, 1, 2, 3, 4, 5, 6, 7.
* `M07 A[x]`: Read Analog Input Pin
    * `x` = 0, 1, 2, 3.

#### Feedback

* `I[x] V[val]`:
    * `x` = pin number
    * `val` = {0,1}
* `A[x] V[val]`:
    * `x` = pin number
    * `val` = [0, 4095]

#### Example

```
M07 I0 I3              ;read digital pin I0 and I3
>>> I0 V1
>>> I3 V0
M07 A2                 ;read analog pin A2
>>> A2 V3946
```

---
## M08 - Read Input Signals Automatically.

#### Descriptions

Read Digital and Analog input signals automatically. For the digital signals, the robot will automatic read the value of signal when there is a change from 0 to 1 or from 1 to 0. About the analog signals, the robot will automatic read the value after a certain amount of time.

#### Usage

```
M08 I<x> B<y>
M08 A<x> C<y>
```

#### Parameters

* `M08 I[x] B[y]` : auto read digital input pins.
    * `I[x]` : Digital Input Pin
        * `x` = 0, 1, 2, 3, 4, 5, 6, 7).
    * `B[y]` :
        * `y = 1`: Start the auto-reading digital input signal process.
        * `y = 0`: Stop the auto-reading digital input signal process.
* `M08 A[x] C[y]`
    * `A[x]`: Analog Input Pin
        * `x` = 0, 1, 2, 3.
    * `C[y]`: Cycle (microseconds) to update values. 
        * `y >= 100`: Start the auto-reading analog input signal process.
        * `y <= 100`: Stop the auto-reading analog input signal process.

#### Feedback

* `I[x] V[val]` : return auto read digital input value
    * `x` = pin number
    * `val` = {0,1}
* `A[x] V[val]` : return auto read analog input value
    * `x` = pin number
    * `val` = [0, 4095]

#### Example

```
M08 I3 B1              ;start auto read digital pin I3
M07 A2 C200            ;auto update A2 analog value with cycle=200us

>>> I3 V0
>>> A2 V2478
```

---

## M40 - Open RS232 port.

#### Descriptions

Enable/Disable RS232 port and set baudrate.

#### Usage

```
M40 A<x> B<y>
```

#### Parameters

* `M40 A[x] B[y]`
    * `A[x]` : Open/Close RS232 port
        * `x = 1` : Open Port
        * `x = 0` : Close port
    * B[y]: baudrate.
#### Example
```
M40 A1 B115200             ;Open RS232 port and set baudrate at 115200
```
---

## M41 - Open RS485 port
#### Descriptions

Enable/Disable RS485 port and set baudrate.

#### Usage

```
M41 A<x> B<y>
```

#### Parameters

* `M41 A[x] B[y]`
    * `A[x]` : Open/Close RS485 port
        * `x = 1` : Open Port
        * `x = 0` : Close Port
    * `B[y]` : baudrate.

!!! warning "Note:"
  When control Delta X S via RS485, after each time sending a G-code command to the robot, you must wait for a response from the robot before sending the next G-code command. Otherwise, the communication will not be successful.

#### Example

```
M41 A1 B115200             ;Open RS485 port and set baudrate at 115200
```

---

## M42 - Open TTL port.

#### Descriptions

Enable/Disable TTL port and set baudrate.

#### Usage

```
M41 A<x> B<y>
```

#### Parameters

* `M42 A[x] B[y]`
    * `A[x]` : Open/Close TTL port
        * `x = 1` : Open Port
        * `x = 0` : Close Port
    * `B[y]` : baudrate.

#### Example

```
M42 A1 B115200             ;Open TTL port and set baudrate at 115200
```

---

## M50 - Enable RJ45

#### Descriptions

This command can be used to enable or disable RJ45 port.

#### Usage

```
M50 A<x>
```

### Parameter

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

### Parameter

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

### Parameter

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

### Parameter

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

### Parameter

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

## M55 - Set Ethernet Port

#### Descriptions

Set ethernet port number

#### Usage

```
M51 B<x>
```

### Parameter

* `B[x]` : port number

#### Example

```
M51 B8080         ; set ethernet port
```

---

## M6 - Set Ethernet Port

#### Descriptions

Set ethernet port number

#### Usage

```
M51 B<x>
```

### Parameter

* `B[x]` : port number

#### Example

```
M51 B8080         ; set ethernet port
```

---

## M84 - Disable Steppers

#### Descriptions

This command can be used to disable steppers.

#### Usage

```
M84
```

---

## M203 - Set Max Feedrate

#### Descriptions

Set movement max feedrate.

#### Usage

```
M203 [S<value>]
```

#### Parameters

* `S[value]`: (mm/s) max feedrate.

---

## M204 - Set Max Feedrate

#### Descriptions

Set movement acceleration. 

#### Usage

```
M204 [A<value>]
```

#### Parameters

* `A[value]`: (mm/s2) end effector acceleration.

---

## M206 - Set Axis Offset

#### Descriptions

Set home offset for one or all axis.

#### Usage

```
M206 [X<value>] [Y<value>] [Z<value>] [W<value>] [U<value>] [V<value>] 
```

#### Parameters

* `X[value]`: (mm) X offset value.
* `Y[value]`: (mm) Y offset value.
* `Z[value]`: (mm) Z offset value.
* `W[value]`: (mm) W offset value.
* `U[value]`: (mm) U offset value.
* `V[value]`: (mm) V offset value.

#### Example

```
M206 X20 Y-10 Z30  ;Set home offsets
```

---

## M500 - Save Settings

#### Descriptions

Save all configurable settings to EEPROM.

#### Usage

```
M500
```

#### Example

```
M500    ;Save settings
```

---

## M501 - Restore Settings

#### Descriptions

Load all saved settings from EEPROM.

#### Usage

```
M501
```

#### Example

```
M501    ;Restore all settings.
```

---

## M502 - Reset Settings

#### Descriptions

Reset all configurable settings to their factory defaults.

#### Usage

```
M502
```

#### Example

```
M502    ;reset
```

---