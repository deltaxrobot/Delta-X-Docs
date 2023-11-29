# G-CODES FOR DELTA X S V5

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
    [F<val>] [A<val>] [S<val>] [E<val>]
```

#### Parameters

* `I[offset]`:(mm) An offset from the current X position to use as the arc center.
* `J[offset]`:(mm) An offset from the current Y position to use as the arc center.
* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `F[val]`:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `A[val]`:(mm/s2) Acceleration of the motion.
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

## G93 - Get Current Position

#### Descriptions

Get current position of end effector.

#### Usage

```
G93
```

#### Feedback

* `<xpos>,<ypos>,<zpos>`
    * `<xpos>` : Current X position.
    * `<ypos>` : Current Y position.
    * `<zpos>` : Current Z position.

#### Example

```
G93              ; get current pos

return:
31,43,-270
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
M08 I<x> B<y> P<i>
M08 A<x> C<y> P<i>
```

#### Parameters

* `M08 I[x] B[y]` : auto read digital input pins.
    * `I[x]` : Digital Input Pin
        * `x` = 0, 1, 2, 3, 4, 5, 6, 7).
    * `B[y]` :
        * `y = 1`: Start the auto-reading digital input signal process.
        * `y = 0`: Stop the auto-reading digital input signal process.
    * `P[i]` : set feedback port
        * `i = 0`: USB0
        * `i = 1`: RS232
        * `i = 2`: RS485
        * `i = 3`: USB1
* `M08 A[x] C[y]`
    * `A[x]`: Analog Input Pin
        * `x` = 0, 1, 2, 3.
    * `C[y]`: Cycle (microseconds) to update values. 
        * `y >= 100`: Start the auto-reading analog input signal process.
        * `y <= 100`: Stop the auto-reading analog input signal process.
    * `P[i]` : set feedback port
        * `i = 0`: USB0
        * `i = 1`: RS232
        * `i = 2`: RS485
        * `i = 3`: USB1

#### Feedback

* `I[x] V[val]` : return auto read digital input value
    * `x` = pin number
    * `val` = {0,1}
* `A[x] V[val]` : return auto read analog input value
    * `x` = pin number
    * `val` = [0, 4095]

#### Example

```
M08 I3 B1 P0           ;start auto read digital pin I3, feedback via USB0 port
M08 A2 C200 P1         ;auto update A2 analog value with cycle=200us via RS232 port

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

## M42 - Open USB1 port.

#### Descriptions

Enable/Disable USB1 port and set baudrate.

#### Usage

```
M41 A<x> B<y>
```

#### Parameters

* `M42 A[x] B[y]`
    * `A[x]` : Open/Close USB1 port
        * `x = 1` : Open Port
        * `x = 0` : Close Port
    * `B[y]` : baudrate.

#### Example

```
M42 A1 B115200             ;Open TTL USB1 and set baudrate at 115200
```

---

## M49 - Get Ports Config

#### Descriptions

Feedback all ports config informations, this command will show you that these ports is enabled or not, and the baudrate of each port.

#### Usage

```
M49
```

#### Example

```
M49

>>>USB:1 BAUD:115200      ;USB port is enabled(default), baudrate is 115200
>>>RS232:0 BAUD:115200    ;RS232 port is disabled, last set baudrate is 115200
>>>RS485:1 BAUD:115200
>>>TTL:1 BAUD:115200
>>>RJ45:1 Port:1921682553
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

Get the IP of Delta Robot

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

## M60 - Set Axis 4 Parameters

#### Descriptions

Config axis 4 parameters.

#### Usage

```
M60 [D<val>] [E<val>] [I<val>] [S<val>] [R<val>] [U<val>] 
    [P<val>] [Q<val>] [H<val>] A[<val>] [J<val>] [F<val>]
```

#### Parameter

* `D[val]` : enable axis 4
    * `val = 1` : enable axis 4
    * `val = 0` : disable axis 4
* `E[val]` : enable endstop
    * `val = 1` : enable axis 4 endstop
    * `val = 0` : disable axis 4 endstop
* `I[val]` : set invert endstop logic level
    * `val = 1` : axis 4 endstop invert
    * `val = 0` : axis 4 endstop non-invert
* `S[val]` : (unit/s) homing speed
* `R[val]` : (unit/s) homing revert speed
* `U[val]` : (step/unit) set step/unit parameter
* `P[val]` : (unit) set max position
* `Q[val]` : (unit) set min position
* `H[val]` : (unit) set home position
* `A[val]` : (unit) set max acceleration
* `J[val]` : (unit) set max jerk
* `F[val]` : (unit) set max velocity

#### Example

```
M60 D1 E1 I0 S15 R5 U8.333 P178 Q0 H45 A4000 J900000 F2000
```

---

## M61 - Set Axis 5 Parameters

#### Descriptions

Config axis 5 parameters.

#### Usage

```
M61 [D<val>] [E<val>] [I<val>] [S<val>] [R<val>] [U<val>] 
    [P<val>] [Q<val>] [H<val>] A[<val>] [J<val>] [F<val>]
```

#### Parameter

* `D[val]` : enable axis 5
    * `val = 1` : enable
    * `val = 0` : disable
* `E[val]` : enable endstop
    * `val = 1` : enable axis 5 endstop
    * `val = 0` : disable axis 5 endstop
* `I[val]` : set invert endstop logic level
    * `val = 1` : axis 5 endstop invert
    * `val = 0` : axis 5 endstop non-invert
* `S[val]` : (unit/s) homing speed
* `R[val]` : (unit/s) homing revert speed
* `U[val]` : (step/unit) set step/unit parameter
* `P[val]` : (unit) set max position
* `Q[val]` : (unit) set min position
* `H[val]` : (unit) set home position
* `A[val]` : (unit) set max acceleration
* `J[val]` : (unit) set max jerk
* `F[val]` : (unit) set max velocity

#### Example

```
M61 D1 E1 I0 S15 R5 U8.333 P178 Q0 H45 A4000 J900000 F2000
```

---

## M62 - Set Axis 6 Parameters

#### Descriptions

Config axis 6 parameters.

#### Usage

```
M62 [D<val>] [E<val>] [I<val>] [S<val>] [R<val>] [U<val>] 
    [P<val>] [Q<val>] [H<val>] A[<val>] [J<val>] [F<val>]
```

#### Parameter

* `D[val]` : enable axis 6
    * `val = 1` : enable
    * `val = 0` : disable
* `E[val]` : enable endstop
    * `val = 1` : enable axis 6 endstop
    * `val = 0` : disable axis 6 endstop
* `I[val]` : set invert endstop logic level
    * `val = 1` : axis 6 endstop invert
    * `val = 0` : axis 6 endstop non-invert
* `S[val]` : (unit/s) homing speed
* `R[val]` : (unit/s) homing revert speed
* `U[val]` : (step/unit) set step/unit parameter
* `P[val]` : (unit) set max position
* `Q[val]` : (unit) set min position
* `H[val]` : (unit) set home position
* `A[val]` : (unit) set max acceleration
* `J[val]` : (unit) set max jerk
* `F[val]` : (unit) set max velocity

#### Example

```
M62 D1 E1 I0 S15 R5 U8.333 P178 Q0 H45 A4000 J900000 F2000
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

## M100 - Set Auto Feedback Position

#### Descriptions

Auto feedback positon in a period of time by the specified port.

#### Usage

```
M100 A<ena> B<time> C<port>
```

#### Parameter

* `A[ena]` Enable/Disable auto feedback position
    * `ena = 1` : enable
    * `ena = 0` : disable
* `B[time]` : (miliseconds) period to send feedback
* `C[port]` : set feedback port
    * `port = 0` : USB
    * `port = 1` : RS232
    * `port = 2` : RS485
    * `port = 3` : TTL
    * `port = 4` : RJ45

#### Example

```
M100 A0 B200 C1   ;set USB port feedback position at cycle 200 ms
```

---

<!-- ## M200 - Set Early Feedback Time

#### Descriptions

Always have a delay time during send "Ok" feedback after execute gcode until the controller response. If you need the robot run as fast as possible and smoother, you may need the robot response "Ok" before it finish segment. It's call early time feedback.

#### Usage

```
M200 
```

--- -->

## M203 - Set Jerk

#### Descriptions

Set movement jerk of end effector.

#### Usage

```
M203 [J<value>]
```

#### Parameters

* `J[value]`: (mm/s^3) jerk.

#### Example

```
M203 J1200000     ;set jerk = 1.200.000 mm/s^3
```

---

## M204 - Set Max Acceleration

#### Descriptions

Set movement acceleration. 

#### Usage

```
M204 [A<value>]
```

#### Parameters

* `A[value]`: (mm/s2) end effector acceleration.

#### Example

```
M204 A15000    ;set accel = 15000 mm/s^2
```

---

## M205 - Set Begin/End Velocity

#### Descriptions

Set segment begin/end velocity.

#### Usage

```
M205 [S<value>]
```

#### Parameters

* `S[value]`: (mm/s2) end effector begin/end velocity.

#### Example

```
M205 S40    ;Set begin speed at 40 mm/s
```

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

## M211 - Set Axis 4 Movement Parameter

#### Descriptions

Config axis 4 movement para like speed, accel, jerk, start velocity and end velocity.

#### Usage

```
M211 [F<value>] [A<value>] [J<value>] [S<value>] [E<value>]
```

#### Parameters

* `F[value]`: (unit/s) axis 4 speed.
* `A[value]`: (unit/s^2) axis 4 accel.
* `J[value]`: (unit/s^3) axis 4 jerk.
* `S[value]`: (unit/s) start velocity.
* `E[value]`: (unit/s) end velocity.

#### Example

```
M211 F2000 A4000 J800000 S30 E30  ;config axis 4 move para
```

---

## M212 - Set Axis 5 Movement Parameter

#### Descriptions

Config axis 5 movement para like speed, accel, jerk, start velocity and end velocity.

#### Usage

```
M212 [F<value>] [A<value>] [J<value>] [S<value>] [E<value>]
```

#### Parameters

* `F[value]`: (unit/s) axis 5 speed.
* `A[value]`: (unit/s^2) axis 5 accel.
* `J[value]`: (unit/s^3) axis 5 jerk.
* `S[value]`: (unit/s) start velocity.
* `E[value]`: (unit/s) end velocity.

#### Example

```
M212 F2000 A4000 J800000 S30 E30  ;config axis 5 move para
```

---

## M213 - Set Axis 6 Movement Parameter

#### Descriptions

Config axis 6 movement para like speed, accel, jerk, start velocity and end velocity.

#### Usage

```
M213 [F<value>] [A<value>] [J<value>] [S<value>] [E<value>]
```

#### Parameters

* `F[value]`: (unit/s) axis 6 speed.
* `A[value]`: (unit/s^2) axis 6 accel.
* `J[value]`: (unit/s^3) axis 6 jerk.
* `S[value]`: (unit/s) start velocity.
* `E[value]`: (unit/s) end velocity.

#### Example

```
M213 F2000 A4000 J800000 S30 E30  ;config axis 6 move para
```

---

## M220 - Get Current Axis Parameter

#### Descriptions

This command can be used to check current movement parameter of all axis.

#### Usage

```
M220 I<val>
```

#### Parameter

* `I[val]` : axis index
    * `val = 0` : get theta parameter
    * `val = 1` : get axis 4 parameter
    * `val = 2` : get axis 5 parameter
    * `val = 3` : get axis 6 parameter

#### Example

```
M220 I1   ;get axis 4 movement para

>>>F:2000 A:4000 J:800000 S:30 E:30
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

## M600 - Enable Emergency Stop Button

#### Descriptions

This command is used to enable EMERGENCY STOP BUTTON.

#### Usage

```
M600 A8 B9
```

#### Example

```
M600 A8 B9    ;enable E_STOP button
```

## M601 - Disable Emergency Stop Button

#### Descriptions

Disable E_STOP button.

#### Usage

```
M601          ;disable E_STOP button
```

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
