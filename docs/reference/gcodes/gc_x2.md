## G0, G1 - Linear Movement

#### Descriptions

> The G0 and G1 commands add a linear MOVE to the queue to be performed after all previous moves are completed. A command like G1 F1000 sets the feed rate for all subsequent moves.

!!! note "Usage"
    <mark>**G0 F[**rate**] X[**pos**] Y[**pos**] Z[**pos**] W[**angle**]**</mark><br>
    <mark>**G1 F[**rate**] X[**pos**] Y[**pos**] Z[**pos**] W[**angle**]**</mark>
    ###### Parameters
    **F[rate]**:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.<br>
    **X[pos]**:(mm) A coordinate on the X-axis.<br>
    **Y[pos]**:(mm) A coordinate on the Y-axis.<br>
    **Z[pos]**:(mm) A coordinate on the Z-axis.<br>
    **W[pos]**:(mm) A coordinate on the 4-axis.<br>

##### Example

```
G01 X12                         ;move to 12mm on the X-axis
G01 F200                        ;set the feedrate to 200 mm/s
G01 X90.6 Y13.8                 ;move to 90.6mm on the X-axis and 13.8mm on the Y-axis     
G01 X0 Y0 Z-350                 
G01 W90                         ;rotate to 90 degree on the 4-axis
G01 X100 Y50 Z-400 W90 U45 F200 ;X=100 mm, Y=50 mm, Z=-400 mm, W=90°, U=45°, F=200 mm/s
```

---

# G2, G3 - Controlled Arc Movement

#### Descriptions

> **G2** adds a **clockwise** arc move to the planner; **G3** adds a **counter-clockwise** arc. An arc move starts at the current position and ends at the given XYZ, pivoting around a center-point offset given by I and J.

!!! note "Usage"
    <mark>**G2 F[**rate**] X[**pos**] Y[**pos**] I[**offset**] J[**offset**] W[**angle**]**</mark><br>
    <mark>**G3 F[**rate**] X[**pos**] Y[**pos**] I[**offset**] J[**offset**] W[**angle**]**</mark>
    ###### Parameters
    **F[rate]**:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.<br>
    **I[offset]**:(mm) An offset from the current X position to use as the arc center.<br>
    **J[offset]**:(mm) An offset from the current Y position to use as the arc center.<br>
    **X[pos]**:(mm) A coordinate on the X-axis.<br>
    **Y[pos]**:(mm) A coordinate on the Y-axis.<br>

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

# G5 - Bezier cubic spline

#### Descriptions

> G5 creates a cubic B-spline in the XY plane with the X and Y axes only. P and Q parameters are required. I and J are required for the first G5 command in a series. For subsequent G5commands, either both I and J must be specified, or neither. If I and J are unspecified, the starting direction of the cubic will automatically match the ending direction of the previous cubic (as if I and J are the negation of the previous P and Q).

!!! note "Usage"
    <mark>**G5 F[**rate**] X[**pos**] Y[**pos**] I[**offset**] J[**offset**] P[**offset**] Q[**offset**]**</mark>
    ###### Parameters
    **F[rate]**:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.<br>
    **I[offset]**:(mm) X incremental offset from the start point to the first control point.<br>
    **J[offset]**:(mm) X incremental offset from the start point to the first control point.<br>
    **P[offset]**:(mm) A coordinate on the X-axis.<br>
    **Q[offset]**:(mm) A coordinate on the Y-axis.<br>
    **X[pos]**:(mm) A coordinate on the X-axis.<br>
    **Y[pos]**:(mm) A coordinate on the Y-axis.<br>

##### Example

```
G5 F200 I-40 Y20 P-20 Y-20 X20 Y-20
```
---
# G6 - Theta angle control
#### Descriptions

> Directly control movement angle without endpoint coordinates.

!!! note "Usage"
    <mark>**G6 F[**rate**] X[**angle**] Y[**angle**] Z[**angle**] P[**pos**]**</mark>
    ###### Parameters
    **F[rate]**:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.<br>
    **X[angle]**:(degree) The value of the Theta 1 angle.<br>
    **Y[angle]**:(degree) The value of the Theta 2 angle.<br>
    **Z[angle]**:(degree) The value of the Theta 3 angle.<br>
    **P[pos]**:(mm) Distance traveled.<br>

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

# M03, M04 - Ouput On / Laser On / Vacuum On / Gripper Close
#### Descriptions

> M03 is used to turn on the vacuum pump, laser, and close the gripper.

!!! note "Usage"
    <mark>**M03 S[**value**]**</mark>
    ###### Parameters
    **S[value]**: Vacuum pump (empty), Spindle speed (0 - 255), laser power (0 - 255), angle of gripper (0-100), if value is emtpy then gripper close.
!!! warning "Note:"
    M03 will be equivalent to M03 S255.
##### Example
```
G01 X0 Y0 Z-350
M03                   ;turn on Vacuum pump
G01 Z-300
```
---

# M05 - Ouput Off / Laser Off / Vacuum Off / Gripper Open
#### Descriptions

> M05 is used to turn off the vacuum pump, laser, and close the gripper.

!!! note "Usage"
    <mark>**M05**</mark>
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

# M360 - Select End Effector
#### Descriptions

> Select the end effector for the delta robot.

!!! note "Usage"
    <mark>**M360 E[**value**]**</mark>
    ###### Parameters
    **E[value]**:<br>
    0-Vacuum (default)<br>
    1-Gripper<br>
    2-Pen<br>
    3-Laser<br>
    4-Printer<br>
    5-Custom<br>
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

> Load all saved settings from EEPROM.

!!! note "Usage"
    <mark>**M501**</mark>
---

# M502 - Reset Settings
#### Descriptions

> Reset all configurable settings to their factory defaults.

!!! note "Usage"
    <mark>**M502**</mark>
---