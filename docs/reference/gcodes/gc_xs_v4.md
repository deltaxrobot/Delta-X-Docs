## G0, G1 - Linear Movement

#### Descriptions

> The G0 and G1 commands add a linear MOVE to the queue to be performed after all previous moves are completed. A command like G1 F1000 sets the feed rate for all subsequent moves.

!!! note "Usage"
    <mark>**G1 X[**pos**] Y[**pos**] Z[**pos**] W[**angle**] U[**angle**] V[**angle**]**</mark><br>
    <mark>**G1 F[**val**] A[**val**] J[**val**] S[**val**] E[**val**]**</mark>
    ###### Parameters
    **X[pos]**:(mm) A coordinate on the X-axis.
    **Y[pos]**:(mm) A coordinate on the Y-axis.
    **Z[pos]**:(mm) A coordinate on the Z-axis.<br>
    **W[angle]**:(mm) A coordinate on the 4-axis.<br>
    **U[angle]**:(mm) A coordinate on the 5-axis.<br>
    **V[angle]**:(mm) A coordinate on the V-axis.<br>
    **F[val]**:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.<br>
    **A[val]**:(mm/s2) Acceleration of the motion.<br>
    **J[val]**:(mm/s3) Jerk of the motion.<br>
    **S[val]**:(mm/s) Begin velocity.<br>
    **E[val]**:(mm/s) Finish velocity.<br>

##### Example

```
G01 X12                         ;move to 12mm on the X-axis
G01 F200 A5000 J1200000         ;set the feedrate to 200 mm/s
G01 X90.6 Y13.8 S50 E100        ;move to 90.6mm on the X-axis and 13.8mm on the Y-axis   
G01 X0 Y0 Z-750                 
G01 W90                         ;rotate to 90 degree on the 4-axis
G01 X100 Y50 Z-400 W90 U45 F200 ;X=100 mm, Y=50 mm, Z=-400 mm, W=90°, U=45°, F=200 mm/s
```
---

# G2, G3 - Controlled Arc Movement

#### Descriptions

> **G2** adds a **clockwise** arc move to the planner; **G3** adds a **counter-clockwise** arc. An arc move starts at the current position and ends at the given XYZ, pivoting around a center-point offset given by I and J.

!!! note "Usage"
    <mark>**G2 X[**pos**] Y[**pos**] I[**offset**] J[**offset**] W[**angle**]**</mark><br>
    <mark>**G2 F[**val**] A[**val**] J[**val**] S[**val**] E[**val**]**</mark>
    ###### Parameters
    **I[offset]**:(mm) An offset from the current X position to use as the arc center.<br>
    **J[offset]**:(mm) An offset from the current Y position to use as the arc center.<br>
    **X[pos]**:(mm) A coordinate on the X-axis.<br>
    **Y[pos]**:(mm) A coordinate on the Y-axis.<br>
    **F[val]**:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.<br>
    **A[val]**:(mm/s2) Acceleration of the motion.<br>
    **J[val]**:(mm/s3) Jerk of the motion.<br>
    **S[val]**:(mm/s) Begin velocity.<br>
    **E[val]**:(mm/s) Finish velocity.<br>

##### Example

```
G28
G01 Z-350
G01 X50
G02 X-50 Y0 I-50 J0
G03 X50 Y0 I50 J0
```

---
# G4 - Dwell/Delay
#### Descriptions

> Pause the robot for a period of time.

!!! note "Usage"
    <mark>**G2 P[**value**]**</mark>
    ###### Parameters
    **P[value]**: time in milisecons.

##### Example
```
G01 X0 Y0 Z-350
G4 P500          ;delay 500ms
G01 X100
```
---

# G6 - Theta angle control
#### Descriptions

> Directly control movement angle without endpoint coordinates.

!!! note "Usage"
    <mark>**G6 F[**rate**] X[**angle**] Y[**angle**] Z[**angle**] P[**pos**]**</mark>
    <mark>**G6 F[**val**] A[**val**] J[**val**] S[**val**] E[**val**]**</mark>
    ###### Parameters
    **F[rate]**:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.<br>
    **X[angle]**:(degree) The value of the Theta 1 angle.<br>
    **Y[angle]**:(degree) The value of the Theta 2 angle.<br>
    **Z[angle]**:(degree) The value of the Theta 3 angle.<br>
    **P[pos]**:(mm) Distance traveled.<br>
    **F[val]**:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.<br>
    **A[val]**:(mm/s2) Acceleration of the motion.<br>
    **J[val]**:(mm/s3) Jerk of the motion.<br>
    **S[val]**:(mm/s) Begin velocity.<br>
    **E[val]**:(mm/s) Finish velocity.<br>

##### Example

```
G6 X0 Y0 Z0
```
---
# G28 - Homing
#### Descriptions

> Auto-home all axes, moving them towards their endstops until triggered.

!!! note "Usage"
    <mark>**G28**</mark>
---

# G90 - Absolute Movement Mode
#### Descriptions

> In absolute mode, all coordinates given in G-code are interpreted as positions in the logical coordinate space.

!!! note "Usage"
    <mark>**G90**</mark>
---

# G91 - Relative Movement Mode
#### Descriptions

> Set relative position mode. In this mode, all coordinates are interpreted as relative to the last position.

!!! note "Usage"
    <mark>**G91**</mark>
---

# M03, M04 - Ouput On / Set PWM
#### Descriptions

> This is the command used to turn on the Delta X S robot's output pin.

!!! note "Usage"
    <mark>**M03 D[**x**]**</mark><br>
    <mark>**M03 P[**x**] W[**y**]**</mark><br>
    <mark>**M04 P[**x**] W[**y**]**</mark>
    ###### Parameters
    **M03 D[x]**: Digital output pin(x: 0, 1, 2, ... 15).<br>
    **M03 P[x] W[y]**: <br>
    *x*:PWM output pin (x = 0, 1, 2, 3, 4, 8, 9, 10, 14, 15).<br>
    *y*: PWM value (y = [0, 255])<br>
    **M04 P[x] W[y]**: <br>
    *x*:PWM output pin (x = 0, 1, 2, 3, 4, 8, 9, 10, 14, 15).<br>
    *y*: PWM value (y = [0, 65535])<br>
##### Example
```
G01 X0 Y0 Z-750
M03 D0                ;turn on relay D0
G01 Z-700
```
---

# M05 - Ouput Off / Turn Off PWM
#### Descriptions

> This is the command used to turn off the Delta X S robot's output pin

!!! note "Usage"
    <mark>**M05 D[x]**</mark><br>
    <mark>**M05 P[x]**</mark>
    ###### Parameters
    **M05 D[x]**: Digital output pin(x: 0, 1, 2, ... 15).<br>
    **M05 P[x]**: PWM output pin (x = 0, 1, 2, 3, 4, 8, 9, 10, 14, 15).<br>
##### Example
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
# M07 - Read Input Signals.
#### Descriptions

> Read Digital and Analog input signals.

!!! note "Usage"
    <mark>**M07 I[x]**</mark><br>
    <mark>**M07 A[x]**</mark>
    ###### Parameters
    **M07 I[x]**: Read Digital Input Pin(x: 0, 1, 2, 3, 4, 5, 6, 7).<br>
    **M07 A[x]**: Read Analog Input pin (x: 0, 1, 2, 3).<br>
    ###### Feedback
    **I[x] V[val]**: x=pin, val={0,1}.<br>
    **A[x] V[val]**: x=pin, val=[0, 4095].<br>
##### Example
```
M07 I0 I3              ;read digital pin I0 and I3
M07 A2                 ;read analog pin A2
```
---
# M08 - Read Input Signals Automatically.
#### Descriptions

> Read Digital and Analog input signals automatically. For the digital signals, the robot will automatic read the value of signal when there is a change from 0 to 1 or from 1 to 0. About the analog signals, the robot will automatic read the value after a certain amount of time.

!!! note "Usage"
    <mark>**M08 I[x] B[y]**</mark><br>
    <mark>**M08 A[x] C[y]**</mark>
    ###### Parameters
    **M08 I[x] B[y]**<br>
    I[x]: Digital Input Pin (x = 0, 1, 2, 3, 4, 5, 6, 7).<br>
    B[y]:<br>
    y = 1: Start the auto-reading digital input signal process.<br>
    y = 0: Stop the auto-reading digital input signal process.
    **M08 A[x] C[y]**<br>
    A[x]: Analog Input Pin (x = 0, 1, 2, 3).<br>
    C[y]: Cycle (microseconds) to update values.<br> 
    y >= 100: Start the auto-reading analog input signal process.<br>
    y <= 100: Stop the auto-reading analog input signal process.
    ###### Feedback
    **I[x] V[val]**: x=pin, val={0,1}.<br>
    **A[x] V[val]**: x=pin, val=[0, 4095].<br>
##### Example
```
M08 I3 B1              ;start auto read digital pin I3
M07 A2 C200            ;auto update A2 analog value with cycle=200us
```
---
# M40 - Open RS232 port.
#### Descriptions

> Enable/Disable RS232 port and set baudrate.

!!! note "Usage"
    <mark>**M40 A[x] B[y]**</mark><br>
    ###### Parameters
    **M40 A[x] B[y]**<br>
    A[x]: (x = 1: Open Port; x = 0: Close port)<br>
    B[y]: baudrate.<br>
##### Example
```
M40 A1 B115200             ;Open RS232 port and set baudrate at 115200
```
---

# M41 - Open RS485 port.
#### Descriptions

> Enable/Disable RS485 port and set baudrate.

!!! note "Usage"
    <mark>**M41 A[x] B[y]**</mark><br>
    ###### Parameters
    **M41 A[x] B[y]**<br>
    A[x]: (x = 1: Open Port; x = 0: Close port)<br>
    B[y]: baudrate.<br>
!!! warning "Note:"
  > When control Delta X S via RS485, after each time sending a G-code command to the robot, you must wait for a response from the robot before sending the next G-code command. Otherwise, the communication will not be successful.
##### Example
```
M41 A1 B115200             ;Open RS485 port and set baudrate at 115200
```
---

# M42 - Open TTL port.
#### Descriptions

> Enable/Disable TTL port and set baudrate.

!!! note "Usage"
    <mark>**M42 A[x] B[y]**</mark><br>
    ###### Parameters
    **M42 A[x] B[y]**<br>
    A[x]: (x = 1: Open Port; x = 0: Close port)<br>
    B[y]: baudrate.<br>
##### Example
```
M42 A1 B115200             ;Open TTL port and set baudrate at 115200
```
---

# M84 - Disable Steppers
#### Descriptions

> This command can be used to disable steppers.

!!! note "Usage"
    <mark>**M84**</mark>
---

# M104 - Set Hotend Temperature
#### Descriptions

> Set a new target hot end temperature and continue without waiting. The firmware will continue to try to reach and hold the temperature in the background.

!!! note "Usage"
    <mark>**M104 S[**temp**]**</mark>
    ###### Parameters
    **S[temp]**: (degree Celsius) Target temperature.
##### Example
```
M104 S295           ;set hotend at 295 degC
```
---

# M109 - Wait For Hotend Temperature
#### Descriptions

> This command optionally sets a new target hot end temperature and waits for the target temperature to be reached before proceeding.

!!! note "Usage"
    <mark>**M109 S[**temp**]**</mark>
    ###### Parameters
    **S[temp]**: (degree Celsius) Target temperature.
---

# M203 - Set Max Feedrate
#### Descriptions

> Set movement max feedrate.

!!! note "Usage"
    <mark>**M203 S[**value**]**</mark>
    ###### Parameters
    **S[value]**: (mm/s) max feedrate.
---

# M204 - Set Max Feedrate
#### Descriptions

> Set movement acceleration. 

!!! note "Usage"
    <mark>**M204 A[**value**]**</mark>
    ###### Parameters
    **A[value]**: (mm/s2) end effector acceleration.
---


# M361 - Set Interpolated line length
#### Descriptions

> Set the length of each segment in line interpolation.

!!! note "Usage"
    <mark>**M361 P[**unit**]**</mark>
    ###### Parameters
    **P[unit]**: (mm) Length in mm.
---

# M362 - Set Arc segment length
#### Descriptions

> Set segment length in arc interpolation.

!!! note "Usage"
    <mark>**M362 P[**unit**]**</mark>
    ###### Parameters
    **P[unit]**: (mm) Length in mm.
---

# M500 - Save Settings
#### Descriptions

> Save all configurable settings to EEPROM.

!!! note "Usage"
    <mark>**M500**</mark>
---

# M501 - Load Settings
#### Descriptions

> Restore settings from EEPROM.
#### Usage
!!! note "M501"
---

# M502 - Reset Settings
#### Descriptions

Reset all configurable settings to their factory defaults.
#### Usage
```
M502
```
---