# G-CODES FOR DELTA X S V4 

## G0, G1 - Linear Movement

#### Descriptions

The G0 and G1 commands add a linear MOVE to the queue to be performed after all previous moves are completed.

Set `F` (feed rate), `A` (acceleration), `J` (jerk), `S` (start velocity), and `E` (end velocity) once. Subsequent movement commands use these settings until changed; motion parameters omitted from a command keep their current settings.

#### Usage

```
G1 [X<pos>] [Y<pos>] [Z<pos>] [W<angle>] [U<angle>] [V<angle>] 
   [F<val>] [A<val>] [J<val>] [S<val>] [E<val>]
```

#### Parameters

* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `Z[pos]`:(mm) A coordinate on the Z-axis.
* `W[angle]`:(unit) Axis 4 position.
* `U[angle]`:(unit) Axis 5 position.
* `V[angle]`:(unit) Axis 6 position.
* `F[val]`:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `A[val]`:(mm/s2) Acceleration of the motion.
* `J[val]`:(mm/s3) Jerk of the motion.
* `S[val]`:(mm/s) Begin velocity.
* `E[val]`:(mm/s) Finish velocity.

For W/U/V, a unit is a degree for a rotary axis or a millimeter for a linear axis, according to its steps-per-unit configuration.

#### Example

```
G01 F1500 A15000 J550000 S100 E100 ; Set the feed rate to 1500 mm/s, acceleration to 15000 mm/s², jerk to 550000 mm/s³, start velocity to 100 mm/s, and end velocity to 100 mm/s.
G01 X0 Y0 Z-750                 ; Move to the absolute position (X0, Y0, Z-750).
G01 X50    ; Move to X = 50 mm.
G01 W90                         ; Rotate to 90° on the 4-axis
```
---

## G2, G3 - Controlled Arc Movement

#### Descriptions

Add an arc move in the XY plane, keeping Z unchanged. I and J locate the center relative to the arc's starting point. Use `G90` absolute positioning for arc commands.

In this XS V4 implementation, **G2 moves counter-clockwise** and **G3 moves clockwise**, viewed from positive Z toward the XY plane. Use the directions shown here when preparing commands for XS V4.

#### Usage

```
G02 I<offset> J<offset> [X<pos>] [Y<pos>] [W<angle>] [U<angle>] [V<angle>]
    [F<val>] [A<val>] [S<val>] [E<val>]
```

Use `G03` for the opposite direction. Always include both `I` and `J`, even when one offset is zero. Here, `J` is the Y center offset; the previously configured jerk remains in use.

#### Parameters

* `I[offset]`:(mm) Required X offset from the starting point to the arc center.
* `J[offset]`:(mm) Required Y offset from the starting point to the arc center.
* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `W[angle]`, `U[angle]`, `V[angle]`:(unit) Axis 4, 5, and 6 positions, using the configured units for each axis.
* `F[val]`:(mm/s) The maximum movement rate of the move between the start and endpoint. The feedrate set here applies to subsequent moves that omit this parameter.
* `A[val]`:(mm/s2) Acceleration of the motion.
* `S[val]`:(mm/s) Begin velocity.
* `E[val]`:(mm/s) Finish velocity.

#### Example

```
G28                          ; Home all axes.
G90                          ; Use absolute positioning.
G01 X50 Y20 Z-750 F200        ; Move to the arc start at (X50, Y20, Z-750).
G02 X20 Y50 I-30 J0 F200      ; Counter-clockwise 90° arc around (X20, Y20), radius 30 mm.
G03 X50 Y20 I0 J-30 F200      ; Clockwise 90° arc back to (X50, Y20).
```

Both arcs keep Z at -750 mm. The X/Y endpoints are absolute positions; I/J are offsets from each arc's starting point to the center at (X20, Y20). Keep the center's X coordinate nonzero for this implementation.

---

## G4 - Dwell/Delay

#### Descriptions

Pause the robot for a period of time.

#### Usage

```
G4 P<value>
```

#### Parameters

* `P[value]`: delay in milliseconds.

#### Example

```
G01 X0 Y0 Z-750 F1500 A15000 J550000 S100 E100
G4 P500          ;delay 500ms
G01 X50
```

---

## G6 - Theta angle control

#### Descriptions

Specify the target Theta 1, 2, and 3 angles instead of Cartesian endpoint coordinates. Axis 6 is selected with `R` in this command.

#### Usage

```
G6 [X<angle>] [Y<angle>] [Z<angle>] [W<pos>] [U<pos>] [R<pos>]
   [F<val>] [A<val>] [J<val>] [S<val>] [E<val>]
```

#### Parameters

* `X[angle]`:(degree) The value of the Theta 1 angle.
* `Y[angle]`:(degree) The value of the Theta 2 angle.
* `Z[angle]`:(degree) The value of the Theta 3 angle.
* `W[pos]`:(unit) Axis 4 position.
* `U[pos]`:(unit) Axis 5 position.
* `R[pos]`:(unit) Axis 6 position.
* `F[val]`:(mm/s) Cartesian feed rate.
* `A[val]`:(mm/s²) Cartesian acceleration.
* `J[val]`:(mm/s³) Cartesian jerk.
* `S[val]`:(mm/s) Start velocity.
* `E[val]`:(mm/s) End velocity.

W/U/R use the configured units for their axes: degrees for rotary axes or millimeters for linear axes. Omitted F/A/J/S/E values keep their current motion settings, which also apply to subsequent moves until changed.

#### Example

```
G90                  ; Use absolute positioning.
G6 X20 Y0 Z0 F200     ; Move to Theta 1 = 20°, Theta 2 = 0°, Theta 3 = 0° at 200 mm/s.
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

Read the Cartesian position stored by the controller. The response is always sent through USB, including when the command arrives on another port.

#### Usage

```
G93
```

#### Feedback

The response contains `<xpos>,<ypos>,<zpos>` in millimeters, with two decimal places. Auxiliary-axis positions are omitted.

The reported Z includes the robot's configured vertical reference offset. For example, with a 188.5 mm offset and no user coordinate offset, a G-code position of Z-750 is reported as Z-561.50. Use [M100](#m100-set-auto-feedback-position) for automatic position reports in the G-code coordinate frame.

#### Example

```
G93              ; Read the Cartesian position through USB.
```

Example USB response at X0 Y0 Z-750, with a 188.5 mm vertical reference offset:

```text
0.00,0.00,-561.50
```

---

<span class="legacy-anchor" id="m03-m04-turn-ouput-on-set-pwm"></span>

## M03, M04 - Set Digital Output / PWM
#### Descriptions

Set digital output states or PWM values. `M03` uses 8-bit PWM values; `M04` uses 16-bit PWM values. Both commands can set digital outputs with `D`.

#### Usage

```
M03 D<x> W<state>
M04 D<x> W<state>
M03 P<x> W<y>
M04 P<x> W<y>
```

#### Parameters

* `M03 D[x] W[state]`, `M04 D[x] W[state]` : set digital outputs.
    * `x` = 0, 1, 2, ... 15.
    * `state = 1` : turn on; `state = 0` : turn off.
* `M03 P[x] W[y]` : turn on PWM pins
    * `x` = 0, 1, 2, 3, 4, 8, 9, 10, 14, 15.
    * `y` = [0, 255]
* `M04 P[x] W[y]` : turn on PWM pins but with larger pwm range.
    * `x` = 0, 1, 2, 3, 4, 8, 9, 10, 14, 15.
    * `y` = [0, 65535].

Always include `W`, including for digital outputs. Several outputs can be selected on one line, such as `M03 D0 D1 W1`.

#### Example

```
G01 X0 Y0 Z-750
M03 D0 W1             ; Turn on digital output D0.
G01 Z-700
```

---

<span class="legacy-anchor" id="m05-ouput-off-turn-off-pwm"></span>

## M05 - Turn Off Digital Output / PWM

#### Descriptions

Turn off selected digital outputs or set selected PWM outputs to zero.

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

Several outputs can be selected on one line. Specify at least one D or P output; a bare `M05` does not select all outputs.

#### Example

```
G01 X0 Y0 Z-750
M03 D0 W1             ; Turn on digital output D0.
G01 Z-780
G04 P300
G01 Z-750
G01 X50 Y50
M05 D0                ; Turn off digital output D0.
```

---

## M07 - Read Input Signals.

#### Descriptions

Read selected digital input states or raw analog input values. Several channels can be selected on one line.

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
M07 I0 I3 A2           ; Read digital inputs I0 and I3, and analog input A2.
```

Example responses; values depend on the connected signals:

```text
I0 V1
I3 V0
A2 V3946
```

---
## M08 - Read Input Signals Automatically.

#### Descriptions

Configure automatic input reports. Digital inputs report state changes; analog inputs report sampled values at the requested interval.

#### Usage

```
M08 I<pin> [B<enable>] [P<port>]
M08 A<pin> [C<period_us>] [P<port>]
```

#### Parameters

| Parameter | Values and function |
| --- | --- |
| `I<pin>` | Digital input index: `0`–`7`. Several inputs can be selected on one line. |
| `B<enable>` | Digital reports: `1` enables reporting; `0` disables it. Default: `1` when omitted. |
| `A<pin>` | Analog input index: `0`–`3`. Several channels can be selected on one line. |
| `C<period_us>` | Requested analog report interval in microseconds. Default: `500000` (500 ms) when omitted. The I/O board determines the supported minimum interval and the value used to disable analog reports. |
| `P<port>` | Report destination: `0` = USB, `1` = RS232, `3` = TTL, `4` = Ethernet (RJ45). |

The startup report destination is USB. Open the selected port before requesting reports on it. RS485 (`P2`) is rejected with `Unknown: This function cannot be used on RS485!`.

#### Feedback

* `I[x] V[val]` : return auto read digital input value
    * `x` = pin number
    * `val` = {0,1}
* `A[x] V[val]` : return auto read analog input value
    * `x` = pin number
    * `val` = [0, 4095]

#### Example

```
M08 I3 B1 P0           ; Report changes on input I3 through USB.
M08 A2 C500000 P0      ; Request analog input A2 reports every 500 ms through USB.
```

Example automatic reports; values depend on the connected signals:

```text
I3 V0
A2 V2478
```

To stop automatic reports for digital input I3:

```
M08 I3 B0
```

---

## M40 - Open RS232 port.

#### Descriptions

Enable/Disable RS232 port and set baudrate.

#### Usage

```
M40 A<x> [B<y>]
```

#### Parameters

* `M40 A[x] B[y]`
    * `A[x]` : Open/Close RS232 port
        * `x = 1` : Open Port
        * `x = 0` : Close port
    * `B[y]` : baud rate.
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
M41 A<x> [B<y>]
```

#### Parameters

* `M41 A[x] B[y]`
    * `A[x]` : Open/Close RS485 port
        * `x = 1` : Open Port
        * `x = 0` : Close Port
    * `B[y]` : baud rate.

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
M42 A<x> [B<y>]
```

#### Parameters

* `M42 A[x] B[y]`
    * `A[x]` : Open/Close TTL port
        * `x = 1` : Open Port
        * `x = 0` : Close Port
    * `B[y]` : baud rate.

#### Example

```
M42 A1 B115200             ;Open TTL port and set baudrate at 115200
```

---

## M49 - Get Ports Config

#### Descriptions

Read the enabled state and configured baud rate of USB, RS232, RS485, and TTL, followed by the Ethernet enabled state and server port number.

#### Usage

```
M49
```

#### Example

```
M49
```

Example response; values depend on the current configuration:

```text
USB:1 BAUD:115200
RS232:0 BAUD:115200
RS485:1 BAUD:115200
TTL:1 BAUD:115200
RJ45:1
Port:8080
Ok
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

Set the robot's MAC address and save it to EEPROM.

#### Usage

Provide all six bytes in A:B:C:D:E:F order, using decimal integers from 0 to 255.

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
M52 A2 B23 C34 D45 E56 F67   ; Set MAC address 02:17:22:2D:38:43 (hex).
```

Response:

```text
Ok
```

---

## M53 - Set Ethernet IP

#### Descriptions

Set the robot's Ethernet IP address for the current session. A/B/C/D are the four address octets, each a decimal integer from 0 to 255; all four are required.

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
M53 A192 B168 C1 D5   ; Set the robot IP address to 192.168.1.5.
```

Response:

```text
Ok
```

---

## M54 - Set Ethernet DNS

#### Descriptions

Set the Ethernet DNS server address for the current session. A/B/C/D are the four address octets, each a decimal integer from 0 to 255; all four are required.

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
M54 A192 B168 C1 D1   ; Set the DNS server to 192.168.1.1.
```

Response:

```text
Ok
```

---

## M55 - Set Ethernet Gateway

#### Descriptions

Set the Ethernet gateway address for the current session. A/B/C/D are the four address octets, each a decimal integer from 0 to 255; all four are required.

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
; set ethernet gateway address 192.168.1.1
M55 A192 B168 C1 D1
```

---

## M56 - Set Ethernet Subnet

#### Descriptions

Set the Ethernet subnet mask for the current session. A/B/C/D are the four mask octets, each a decimal integer from 0 to 255; all four are required.

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
M56 A255 B255 C255 D0   ; Set the subnet mask to 255.255.255.0.
```

---

## M57 - Get Robot IP

#### Descriptions

Read the active Ethernet IP address and server port number. Enable Ethernet with `M50 A1` and connect the Ethernet cable before sending this command.

The response has the form `IP:<address>:<port>`. If Ethernet is unavailable, the response indicates that RJ45 is disabled, the Ethernet hardware is missing, or the cable is disconnected.

#### Usage

```
M57
```

#### Example

```
M57
```

Example response with IP address 192.168.1.5 and server port 8080:

```text
IP:192.168.1.5:8080
```

---

## M60 - Set Axis 4 Parameters

#### Descriptions

Configure axis 4. Units are degrees for a rotary axis or millimeters for a linear axis, according to the steps-per-unit setting. Use `M500` to store the configuration in EEPROM.

#### Usage

```
M60 [D<val>] [E<val>] [I<val>] [S<val>] [R<val>] [U<val>] 
    [P<val>] [Q<val>] [H<val>] [A<val>] [J<val>] [F<val>]
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
* `R[val]` : (unit) distance to back away from the endstop during homing
* `U[val]` : (step/unit) set step/unit parameter
* `P[val]` : (unit) set max position
* `Q[val]` : (unit) set min position
* `H[val]` : (unit) set home position
* `A[val]` : (unit/s²) maximum acceleration
* `J[val]` : (unit/s³) maximum jerk
* `F[val]` : (unit/s) maximum velocity

#### Example

```
M60 D1 E1 I0 S30 R20 U8.333330 P180 Q-179 H2 A150000 J5000000 F2000
```

---

## M61 - Set Axis 5 Parameters

#### Descriptions

Configure axis 5. Units are degrees for a rotary axis or millimeters for a linear axis, according to the steps-per-unit setting. Use `M500` to store the configuration in EEPROM.

#### Usage

```
M61 [D<val>] [E<val>] [I<val>] [S<val>] [R<val>] [U<val>] 
    [P<val>] [Q<val>] [H<val>] [A<val>] [J<val>] [F<val>]
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
* `R[val]` : (unit) distance to back away from the endstop during homing
* `U[val]` : (step/unit) set step/unit parameter
* `P[val]` : (unit) set max position
* `Q[val]` : (unit) set min position
* `H[val]` : (unit) set home position
* `A[val]` : (unit/s²) maximum acceleration
* `J[val]` : (unit/s³) maximum jerk
* `F[val]` : (unit/s) maximum velocity

#### Example

```
M61 D1 E1 I0 S30 R20 U8.888888 P95 Q-100 H2 A20000 J2000000 F2000
```

---

## M62 - Set Axis 6 Parameters

#### Descriptions

Configure axis 6. Units are degrees for a rotary axis or millimeters for a linear axis, according to the steps-per-unit setting. Use `M500` to store the configuration in EEPROM.

#### Usage

```
M62 [D<val>] [E<val>] [I<val>] [S<val>] [R<val>] [U<val>] 
    [P<val>] [Q<val>] [H<val>] [A<val>] [J<val>] [F<val>]
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
* `R[val]` : (unit) distance to back away from the endstop during homing
* `U[val]` : (step/unit) set step/unit parameter
* `P[val]` : (unit) set max position
* `Q[val]` : (unit) set min position
* `H[val]` : (unit) set home position
* `A[val]` : (unit/s²) maximum acceleration
* `J[val]` : (unit/s³) maximum jerk
* `F[val]` : (unit/s) maximum velocity

#### Example

```
M62 D1 E1 I0 S30 R20 U8.333333 P20 Q-100 H1 A15000 J500000 F4000
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

Configure automatic position reports and their destination port.

#### Usage

```
M100 [A<mode>] [B<time>] [C<port>]
```

#### Parameter

* `A[mode]` : reporting mode.
    * `0` : disable reports.
    * `1` : report periodically during movement.
    * `2` : report periodically during movement and while idle.
* `B[time]` : report interval in milliseconds. Use at least `10`; a value below `10` disables reporting.
* `C[port]` : destination port.
    * `0` : USB.
    * `1` : RS232.
    * `3` : TTL.
    * `4` : Ethernet (RJ45).

RS485 (`C2`) is rejected with `Unknown: This function cannot be used on RS485!`. Open the selected port before requesting reports on it.

Each report starts with `Position:`, followed by X/Y/Z and the positions of enabled W/U/V axes in that order. Values have two decimal places.

#### Example

```
M100 A1 B200 C0   ; Report position on USB every 200 ms during movement.
```

Example report with auxiliary axes disabled:

```text
Position:0.00,0.00,-750.00
```

To report every 200 ms even while idle:

```
M100 A2 B200 C0
```

To stop automatic position reports:

```
M100 A0 C0
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
M203 J<value>
```

#### Parameters

* `J[value]`: (mm/s³) required jerk value. Omitting J returns `Unknown:Gcode wrong!`.

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
M204 A<value>
```

#### Parameters

* `A[value]`: (mm/s²) required end-effector acceleration. Omitting A returns `Unknown:Gcode wrong!`.

#### Example

```
M204 A15000    ;set accel = 15000 mm/s^2
```

---

## M205 - Set Begin/End Velocity

#### Descriptions

Set both the start and end velocity of a movement segment to the same value.

#### Usage

```
M205 S<value>
```

#### Parameters

* `S[value]`: (mm/s) required start and end velocity. Omitting S returns `Unknown:Gcode wrong!`.

#### Example

```
M205 S40    ; Set both start and end velocity to 40 mm/s.
```

---

## M206 - Set Axis Offset

#### Descriptions

Set the origin offset used by absolute movement commands. The specified origin must be within the robot's configured workspace and axis limits.

#### Usage

```
M206 [X<value>] [Y<value>] [Z<value>] [W<value>] [U<value>] [V<value>] 
```

#### Parameters

* `X[value]`: (mm) X offset value.
* `Y[value]`: (mm) Y offset value.
* `Z[value]`: (mm) Z offset value.
* `W[value]`: (unit) W offset value, in the configured axis units.
* `U[value]`: (unit) U offset value, in the configured axis units.
* `V[value]`: (unit) V offset value, in the configured axis units.

#### Example

```
M206 X20 Y-10 Z-750 W0 U0   ; Set the XYZ origin to (20, -10, -750) and W/U offsets to zero.
```

---

## M207 - Set Z Safe 

#### Descriptions

Set the lowest permitted Z coordinate and save it to EEPROM. A value below the workspace limit is rejected. A value above the home Z coordinate disables the additional Z limit.

#### Usage

```
M207 Z<value>
```

#### Parameters

* `Z[value]`: (mm) lowest permitted Z coordinate. Always specify Z; sending `M207` without it disables the limit.

#### Example

```
M207 Z-870  ; Set the lowest permitted Z coordinate to -870 mm.
```

The example requires -870 mm to be within the configured workspace and at or below the home Z coordinate.

---

## M210 - Set Theta Movement Parameter

#### Descriptions

Configure Cartesian movement speed, acceleration, jerk, start velocity, and end velocity for the Theta group.

Set these motion parameters once; they apply to subsequent moves for this group until changed. Omitted motion parameters keep their current values.

#### Usage

```
M210 [F<value>] [A<value>] [J<value>] [S<value>] [E<value>]
```

#### Parameters

* `F[value]`: (mm/s) speed.
* `A[value]`: (mm/s²) acceleration.
* `J[value]`: (mm/s³) jerk.
* `S[value]`: (mm/s) start velocity.
* `E[value]`: (mm/s) end velocity.

#### Example

```
M210 F2000 A4000 J800000 S30 E30  ;set all theta movement para
```

---

## M211 - Set Axis 4 Movement Parameter

#### Descriptions

Configure axis 4 speed, acceleration, jerk, start velocity, and end velocity. Enable the axis with M60 first and keep the requested values within its configured limits.

Set these motion parameters once; they apply to subsequent moves for this group until changed. Omitted motion parameters keep their current values.

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

Configure axis 5 speed, acceleration, jerk, start velocity, and end velocity. Enable the axis with M61 first and keep the requested values within its configured limits.

Set these motion parameters once; they apply to subsequent moves for this group until changed. Omitted motion parameters keep their current values.

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

Axis 6 movement parameters: speed, acceleration, jerk, start velocity, and end velocity.

#### Usage

```
M213 [F<value>] [A<value>] [J<value>] [S<value>] [E<value>]
```

#### Parameters

* `F[value]`: (unit/s) speed.
* `A[value]`: (unit/s^2) acceleration.
* `J[value]`: (unit/s^3) jerk.
* `S[value]`: (unit/s) start velocity.
* `E[value]`: (unit/s) end velocity.

#### Example

```
M213 F2000 A4000 J500000 S30 E30  ; Set movement speed, acceleration, jerk, start velocity, and end velocity.
```

---

## M220 - Get Current Axis Parameter

#### Descriptions

Read the current movement parameters of one axis group. Omitting I selects the Theta group (`I0`).

#### Usage

```
M220 [I<val>]
```

#### Parameter

* `I[val]` : axis index
    * `val = 0` : get theta parameter
    * `val = 1` : get axis 4 parameter
    * `val = 2` : get axis 5 parameter
    * `val = 3` : get axis 6 parameter

The Theta group uses response labels F, A, J, S, and E. Axis 4 uses WF, WA, WJ, WS, and WE; axes 5 and 6 use the corresponding U and V prefixes. The selected auxiliary axis must be enabled.

#### Example

```
M220 I1   ; Read axis 4 movement parameters.
```

Example response for an enabled W axis configured with these values:

```text
WF:2000.00 WA:4000.00 WJ:800000.00 WS:30.00 WE:30.00
```

---

## M500 - Save Settings

#### Descriptions

Save the current motion parameters and supported configuration settings to EEPROM. IP, DNS, gateway, and subnet values set by M53–M56 are session settings and are not stored by M500 on XS V4.

#### Usage

```
M500
```

#### Example

```
M500    ;Save settings
```

---

<span class="legacy-anchor" id="m501-restore-settings"></span>

## M501 - Reset Settings

#### Descriptions

Reset settings to the firmware defaults and immediately save them to EEPROM. This overwrites the previously saved settings; an additional M500 is unnecessary.

#### Usage

```
M501
```

#### Example

```
M501    ; Reset settings to firmware defaults and save them to EEPROM.
```

---

<span class="legacy-anchor" id="m502-reset-settings"></span>

## M502 - Load Settings

#### Descriptions

Reload the saved motion parameters and supported configuration settings from EEPROM.

#### Usage

```
M502
```

#### Example

```
M502    ; Reload the settings saved in EEPROM.
```

---

## M600 - Enable Emergency Stop Button

#### Descriptions

Enable emergency-stop monitoring using the standard XS V4 E-stop inputs **I8 and I9**, and save the selection to EEPROM.

#### Usage

```
M600 A8 B9
```

#### Example

```
M600 A8 B9    ; Enable emergency-stop monitoring on the standard inputs I8 and I9.
```

## M601 - Disable Emergency Stop Button

#### Descriptions

Disable E_STOP button.

#### Usage

```
M601
```

#### Example

```
M601       ;disable E_STOP button
```

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
