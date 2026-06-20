# G-CODES FOR DELTA X 3

## G0, G1 - Linear Movement

#### Descriptions

The G0 and G1 commands add a linear MOVE to the queue to be performed after all previous moves are completed. A command like G1 F1000 sets the feed rate for all subsequent moves.

#### Usage

```
G1 [X<pos>] [Y<pos>] [Z<pos>] [W<angle>] [U<angle>] 
   [F<val>] [A<val>] [J<val>] [S<val>] [E<val>]
```

#### Parameters

* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `Z[pos]`:(mm) A coordinate on the Z-axis.
* `W[angle]`:(mm) A coordinate on the 4-axis.
* `U[angle]`:(mm) A coordinate on the 5-axis.
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
G01 X0 Y0 Z-360                 
G01 W90                         ;rotate to 90° on the 4-axis
G01 X100 Y50 Z-400 W90 U45 F200 ;X=100 mm, Y=50 mm, Z=-400 mm, W=90°, U=45°, F=200 mm/s
```
---

## G2, G3 - Controlled Arc Movement

#### Descriptions

**G2** adds a **clockwise** arc move to the planner; **G3** adds a **counter-clockwise** arc. An arc move starts at the current position and ends at the given XYZ, pivoting around a center-point offset given by I and J.

#### Usage

```
G02 [I<offset>] [J<offset>] [X<pos>] [Y<pos>] [W<angle>] [U<angle>] 
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

* `P[value]`: time in milliseconds.

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
G6 [X<angle>] [Y<angle>] [Z<angle>] [W<angle>] [U<angle>]
```

#### Parameters

* `X[angle]`:(degree) The value of the Theta 1 angle.
* `Y[angle]`:(degree) The value of the Theta 2 angle.
* `Z[angle]`:(degree) The value of the Theta 3 angle.
* `W[angle]`:(degree) The value of the Axis 4 angle.
* `U[angle]`:(degree) The value of the Axis 5 angle.

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
31,43,-291
```

---

## M03, M04 - Output On / Set PWM / Vacuum On
#### Descriptions

This is the command used to turn on the Delta X S robot's output pin.

#### Usage

```
M03
M03 D<x>
M03 P<x> W<y>
M04 P<x> W<y>
```

#### Parameters
* `M03` or `M03 D4` : turn on vacuum
* `M03 D[x]` : turn on digital pins
    * `x` = 0, 1, 2, 3.
* `M03 P[x] W[y]` : turn on PWM pins
    * `x` = 0, 1.
    * `y` = [0, 255].
* `M04 P[x] W[y]` : turn on PWM pins but with larger pwm range.
    * `x` = 0, 1.
    * `y` = [0, 65535].

#### Example

```
G01 X0 Y0 Z-400
M03 D0                ;turn on relay D0
G01 Z-350
```

---

## M05 - Output Off / Turn Off PWM / Vacuum Off

#### Descriptions

This is the command used to turn off the Delta X S robot's output pin

#### Usage

```
M05
M05 D<x>
M05 P<x>
```

#### Parameters
* `M05` or `M05 D4`: turn off vacuum
* `M05 D[x]`: turn off digital output pin
    * `x` = 0, 1, 2, 3.
* `M05 P[x]`: turn off PWM output pin
    * `x` = 0, 1.

#### Example

```
G01 X0 Y0 Z-350
M03 D0                ;turn on relay D0
G01 Z-380
G04 P300
G01 Z-350
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
    * `x` = 0, 1, 2, 3.
* `M07 A[x]`: Read Analog Input Pin
    * `x` = 0, 1.

#### Feedback

* `I[x] V[val]`:
    * `x` = pin number
    * `val` = {0,1}
* `A[x] V[val]`:
    * `x` = pin number
    * `val` = [0, 1023]

#### Example

```
M07 I0 I3              ;read digital pin I0 and I3
>>> I0 V1
>>> I3 V0
M07 A1                 ;read analog pin A1
>>> A1 V762
```

---
## M08 - Read Input Signals Automatically.

#### Descriptions

Read Digital and Analog input signals automatically. For the digital signals, the robot will automatic read the value of signal when there is a change from 0 to 1 or from 1 to 0. About the analog signals, the robot will automatic read the value after a certain amount of time.

#### Usage

```
M08 I<x> B<y>
M08 A<x> P<y>
```

#### Parameters

* `M08 I[x] B[y]` : auto read digital input pins.
    * `I[x]` : Digital Input Pin
        * `x` = 0, 1, 2, 3.
    * `B[y]` :
        * `y = 1`: Start the auto-reading digital input signal process.
        * `y = 0`: Stop the auto-reading digital input signal process.
* `M08 A[x] C[y]`
    * `A[x]`: Analog Input Pin
        * `x` = 0, 1.
    * `C[y]`: Cycle (microseconds) to update values. 
        * `y >= 50`: Start the auto-reading analog input signal process.
        * `y <= 50`: Stop the auto-reading analog input signal process.

#### Feedback

* `I[x] V[val]` : return auto read digital input value
    * `x` = pin number
    * `val` = {0,1}
* `A[x] V[val]` : return auto read analog input value
    * `x` = pin number
    * `val` = [0, 1023]

#### Example

```
M08 I3 B1           ;start auto read digital pin I3
M08 A1 C200         ;auto update A1 analog value with cycle=200us

>>> I3 V0
>>> A1 V762
```

---

## M9 - Stop Analog Input Auto Feedback

#### Descriptions

Turn off auto feedback for an analog input pin.

#### Usage

```
M9 A<n>
```

#### Parameters

* `A[n]`: Analog Input Pin
    * `n` = 0, 1.

#### Example

```
M9 A1           ;turn off auto feedback for analog pin A1
```

---

## M43 - Set UART2 / Serial2

#### Descriptions

Configure UART2 / Serial2. Use `A1` to enable, `A0` to disable, and `B` to set the baudrate.

#### Usage

```
M43 A<x> B<y>
```

#### Parameters

* `A[x]`
    * `x = 1`: enable UART2 / Serial2.
    * `x = 0`: disable UART2 / Serial2.
* `B[y]`: baudrate.

#### Example

```
M43 A1 B115200    ;enable UART2 / Serial2 with baudrate 115200
M43 A0            ;disable UART2 / Serial2
```

---

## M44 - Set UART3 / Serial3

#### Descriptions

Configure UART3 / Serial3. Use `A1` to enable, `A0` to disable, and `B` to set the baudrate.

#### Usage

```
M44 A<x> B<y>
```

#### Parameters

* `A[x]`
    * `x = 1`: enable UART3 / Serial3.
    * `x = 0`: disable UART3 / Serial3.
* `B[y]`: baudrate.

#### Example

```
M44 A1 B115200    ;enable UART3 / Serial3 with baudrate 115200
M44 A0            ;disable UART3 / Serial3
```

---

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

## M58 - Get Ethernet Info

#### Descriptions

Get the ethernet info 

#### Usage

```
M58
```

#### Example

```
M58

>>> Ethernet:On;Ip:192.168.1.54;Port:12345;Mac:12-23-34-45-56-67;Dns:192.168.1.1;Gateway:192.168.1.1;Subnet:255.255.255.0
```

---

## M60 - Set Axis W

#### Descriptions

Configure axis W parameters: max, min, home, min pulse, and max pulse.

#### Usage

```
M60 P<x> Q<y> H<z> A<t> B<u>
```

#### Parameters

* `P[x]`: max value.
* `Q[y]`: min value.
* `H[z]`: home value.
* `A[t]`: min pulse.
* `B[u]`: max pulse.

#### Example

```
M60 P180 Q0 H90 A500 B2500    ;set axis W parameters
```

---

## M61 - Set Axis U

#### Descriptions

Configure axis U parameters: max, min, home, min pulse, and max pulse.

#### Usage

```
M61 P<x> Q<y> H<z> A<t> B<u>
```

#### Parameters

* `P[x]`: max value.
* `Q[y]`: min value.
* `H[z]`: home value.
* `A[t]`: min pulse.
* `B[u]`: max pulse.

#### Example

```
M61 P180 Q0 H90 A500 B2500    ;set axis U parameters
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

## M85 - Enable Steppers

#### Descriptions

This command can be used to enable steppers.

#### Usage

```
M85
```

---
<!-- 
## M96 - Save Sub Program

#### Descriptions

...

#### Usage

```
M96
```

---

## M98 - Load Sub Program

#### Descriptions

...

#### Usage

```
M98
```
---

## M99 - Stop Sub Program

#### Descriptions

...

#### Usage

```
M99
```
--- -->

<!--
---

## M200 - Set Early Feedback Time

#### Descriptions

Always have a delay time during send "Ok" feedback after execute gcode until the controller response. If you need the robot run as fast as possible and smoother, you may need the robot response "Ok" before it finish segment. It's call early time feedback.

#### Usage

```
M200 
```

--- -->

## M203 - Set Max Velocity

#### Descriptions

Set movement velocity of end effector.

#### Usage

```
M203 [S<value>]
```

#### Parameters

* `S[value]`: (mm/s).

#### Example

```
M203 S2000     ;set max velocity = 2000 mm/s
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
M204 A6000    ;set accel = 6000 mm/s^2
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
M206 [X<value>] [Y<value>] [Z<value>]
```

#### Parameters

* `X[value]`: (mm) X offset value.
* `Y[value]`: (mm) Y offset value.
* `Z[value]`: (mm) Z offset value.

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
M207 Z-420  ;Set Z safe value
```
---

## M210 - Set theta move parameter 

#### Descriptions

Set the lowest Z level that the robot cannot exceed.

#### Usage

```
M210 [F<val>] [A<val>] [J<val>] [S<val>] [E<val>]
```

#### Parameters

* `F[val]`:(mm/s) Speed.
* `A[val]`:(mm/s2) Accel.
* `J[val]`:(mm/s3) Jerk.
* `S[val]`:(mm/s) Start velocity.
* `E[val]`:(mm/s) End velocity.

#### Example

```
M210 F2000 A15000 J900000 S50 E50  ;set all theta movement para
```
---

## M220 - Read Parameters

#### Descriptions

Read robot parameters.

#### Usage

```
M220 I<n>
```

#### Parameters

* `I[n]`
    * `n = 0`: read move parameters.
    * `n = 1`: read axis W parameters.
    * `n = 2`: read axis U parameters.

#### Example

```
M220 I0    ;read move parameters
M220 I1    ;read axis W parameters
M220 I2    ;read axis U parameters
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
### Example

```
M360 E2  ;select the end effector is Pen
```
---
## M361 - Set minimum movement

### Descriptions

Set the minimum movement distance. Default distance = 0.2 mm

### Usage

```
M361 P<len>
```

### Parameters

* `P[len]`: (mm) Length in mm.

### Example

```
M361 P0.2    ;set min length = 0.2mm 
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

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
