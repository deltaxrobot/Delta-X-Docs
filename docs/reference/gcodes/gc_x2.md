# Gcodes for Delta X 2

## G00, G01 - Linear Move

### Descriptions

The **G0** and **G1** commands add a **LINEAR MOVE** to the queue to be performed after all previous moves are completed. A command like **G1 F1000** sets the feed rate for all subsequent moves.

### Usage

```
G00 [F<rate>] [X<pos>] [Y<pos>] [Z<pos>] [W<angle>]
G01 [F<rate>] [X<pos>] [Y<pos>] [Z<pos>] [W<angle>]
```

### Parameters

* `F[rate]`: (mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `X[pos]`: (mm) A coordinate on the X-axis.
* `Y[pos]`: (mm) A coordinate on the Y-axis.
* `Z[pos]`: (mm) A coordinate on the Z-axis.
* `W[angle]`: (mm) A coordinate on the 4-axis.


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
G2 [F<rate>] [I<offset>] [J<offset>] [X<pos>] [Y<pos>] [W<angle>]
G3 [F<rate>] [I<offset>] [J<offset>] [X<pos>] [Y<pos>] [W<angle>]
```

### Parameters

* `F[rate]`: (mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `I[offset]`:(mm) An offset from the current X position to use as the arc center.
* `J[offset]`:(mm) An offset from the current Y position to use as the arc center.
* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `W[angle]`: (mm) A coordinate on the 4-axis.

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
G06 [X<angle>] [Y<angle>] [Z<angle>] [P<pos>]
```

### Parameters

* `F[rate]`:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `X[angle]`:(degree) The value of the Theta 1 angle.
* `Y[angle]`:(degree) The value of the Theta 2 angle.
* `Z[angle]`:(degree) The value of the Theta 3 angle.
* `P[pos]`:(mm) Distance traveled.

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

Get current posiition of end effector.

### Usage

```
G93
```

### Feedback

* `<xpos>,<ypos>,<zpos>`
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

## M03, M04 - Ouput On / Laser On / Vacuum On / Gripper Close

### Descriptions

M03 is used to turn on the vacuum pump, laser, and close the gripper.

### Usage

```
M03 [S<value>]
```

### Parameters

* `S[value]`: Vacuum pump (empty), Spindle speed (0 - 255), laser power (0 - 255), angle of gripper (0-100), if value is emtpy then gripper close.

!!! note "Note:"
    M03 will be equivalent to M03 S255.

### Example

```
G01 X0 Y0 Z-350
M03                   ;turn on Vacuum pump
G01 Z-300
```

---

## M05 - Ouput Off / Laser Off / Vacuum Off / Gripper Open

### Descriptions

M05 is used to turn off the vacuum pump, laser, or close the gripper.

### Usage

```
M05
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

## M104 - Set Hotend Temperature

### Descriptions

Set a new target hot end temperature and continue without waiting. The firmware will continue to try to reach and hold the temperature in the background.

### Usage

```
M104 [S<temp>]
```

### Parameters
* `S[temp]`: (degree Celsius) Target temperature.

### Example

```
M104 S195           ;set hotend at 195 degC
```

---

## M105 - Report Temperature

### Descriptions

Request a temperature report to be sent to the host as soon as possible.

### Usage

```
M105
```

### Example

```
M105           ;set hotend at 95 degC

return
T:195
```

---

## M109 - Wait For Hotend Temperature

### Descriptions

This command optionally sets a new target hot end temperature and waits for the target temperature to be reached before proceeding.

### Usage

```
M109 [S<temp>]
```
### Parameters

* `S[temp]`: (degree Celsius) Target temperature.

### Example

```
M109 S180  ;Set target temperature and wait (if heating up)
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

## M331 - Select Linked Device

### Descriptions

Config device is linked to external UART port.

### Usage

```
M331 R<value>
```

### Parameters

* `R[value]`
    * 0-None (Disable port).
    * 1-Conveyor
    * 2-Sliding Rail

### Example

```
M331 R1  ;select the device which connected with external port is Conveyor,
          now you can control Conveyor via Delta Robot
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

## M361 - Set Interpolated line length

### Descriptions

Set the length of each segment in line interpolation.

### Usage

```
M361 P<len>
```

### Parameters

* `P[len]`: (mm) Length in mm.

### Example

```
M361 P0.3    ;set segment length = 0.3mm 
```

---

## M362 - Set Arc segment length

### Descriptions

Set segment length in arc interpolation.

### Usage

```
M362 P<len>
```

### Parameters

* `P[len]`: (mm) Length in mm.

### Example

```
M362 P0.4    ;set segment length = 0.4mm 
```

---

## M402 - Set Z Max Position

### Descriptions

Set the maximum position of Z axis, the end effector can't move upper than this value.

### Usage

```
M402 Z<pos>
```

### Parameters

* `Z[pos]`: (mm) max z position in mm.

### Example

```
M402 Z-245   ;After this command, end effector cant get higher than -245 mm.
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
