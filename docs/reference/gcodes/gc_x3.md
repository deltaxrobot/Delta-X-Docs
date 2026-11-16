# G-CODES FOR DELTA X 3

## G0, G1 - Linear Movement

#### Descriptions

The G0 and G1 commands add a linear MOVE to the queue to be performed after all previous moves are completed.

Run `G28` before the first XYZ move after startup, disabling the motors, or resetting/loading settings. Commands that only set motion parameters or move W/U do not require XYZ homing.

Set `F` (feed rate), `A` (acceleration), `J` (jerk), `S` (start velocity), and `E` (end velocity) once. Subsequent movement commands use these settings until changed; motion parameters omitted from a command keep their current settings.

#### Usage

```
G1 [X<pos>] [Y<pos>] [Z<pos>] [W<angle>] [U<angle>] 
   [F<val>] [A<val>] [J<val>] [S<val>] [E<val>]
```

#### Parameters

* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `Z[pos]`:(mm) A coordinate on the Z-axis.
* `W[angle]`:(degrees) Axis W position, within the limits configured by `M60`.
* `U[angle]`:(degrees) Axis U position, within the limits configured by `M61`.
* `F[val]`:(mm/s) Feed rate, integer from 1 to 20000.
* `A[val]`:(mm/s²) Acceleration, integer from 1 to 50000.
* `J[val]`:(mm/s³) Jerk, integer from 1 to 10000000.
* `S[val]`:(mm/s) Start velocity, integer from 0 to 20000.
* `E[val]`:(mm/s) End velocity, integer from 0 to 20000.

Start and end velocities are limited to `max(F - 2, 0)`. The planner may reduce motion parameters to keep the XYZ step rates within their limits. When this happens, the robot reports `Replace F<value> A<value> J<value> S<value> E<value>` before `Ok`, with three decimal places. These are the effective settings for that move; the stored motion settings remain unchanged.

#### Example

```
G28                              ;home the robot
G90                              ;use absolute positioning
M206 X0 Y0 Z0                     ;use the base coordinate system
G01 F1500 A15000 J550000 S50 E50   ;set F=1500 mm/s, A=15000 mm/s^2, J=550000 mm/s^3, S=E=50 mm/s
G01 X0 Y0 Z-360                   ;move to X0 Y0 Z-360
G01 X50                          ;move to X50, keeping Y0 and Z-360
G01 W90 U45                      ;rotate W to 90 degrees and U to 45 degrees
G00 X0 Y0 Z-360                   ;return to X0 Y0 Z-360
G01 W0 U0                        ;return W and U to 0 degrees
```

---

## G2, G3 - Controlled Arc Movement

#### Descriptions

On Delta X 3, **G2** moves **counter-clockwise** and **G3** moves **clockwise**, viewed from +Z toward the XY plane. The arc starts at the current XY position and ends at the specified XY position, around the center defined by I and J. Z remains unchanged throughout the arc.

Both `I` and `J` are required, including when either offset is zero. `J` specifies the arc center's Y offset; the previously set jerk remains in use. Run `G28` before XYZ motion. Endpoints follow `G90` or `G91`; I/J are always offsets from the arc's starting point.

#### Usage

```
G02 I<offset> J<offset> [X<pos>] [Y<pos>] [W<angle>] [U<angle>]
    [F<val>] [A<val>] [S<val>] [E<val>]
```

#### Parameters

* `I[offset]`:(mm) An offset from the current X position to use as the arc center.
* `J[offset]`:(mm) An offset from the current Y position to use as the arc center.
* `X[pos]`:(mm) A coordinate on the X-axis.
* `Y[pos]`:(mm) A coordinate on the Y-axis.
* `W[angle]`:(degrees) Axis W position, within the limits configured by `M60`.
* `U[angle]`:(degrees) Axis U position, within the limits configured by `M61`.
* `F[val]`:(mm/s) Feed rate, integer from 1 to 20000.
* `A[val]`:(mm/s²) Acceleration, integer from 1 to 50000.
* `S[val]`:(mm/s) Start velocity, integer from 0 to 20000.
* `E[val]`:(mm/s) End velocity, integer from 0 to 20000.

These motion settings remain in effect for subsequent moves until changed.

#### Example

```
G28                              ;home the robot
G90                              ;use absolute positioning
M206 X0 Y0 Z0                     ;use the base coordinate system
G01 F1500 A15000 J550000 S50 E50   ;set F=1500 mm/s, A=15000 mm/s^2, J=550000 mm/s^3, S=E=50 mm/s
G01 X50 Y0 Z-360                  ;move to the arc's starting point
G02 X0 Y50 I-50 J0                ;move 90 degrees counter-clockwise around X0 Y0
G03 X50 Y0 I0 J-50                ;move 90 degrees clockwise back to X50 Y0
```

Both arcs have a 50 mm radius and a path length of approximately 78.54 mm. Z stays at -360 mm.

---

## G4 - Dwell/Delay

#### Descriptions

Pause the robot for a period of time.

#### Usage

```
G4 P<value>
```

#### Parameters

* `P[value]`: Required delay in milliseconds, integer from 0 to 4294967295.

#### Example

```
G28                              ;home the robot
G90                              ;use absolute positioning
M206 X0 Y0 Z0                     ;use the base coordinate system
G01 F1500 A15000 J550000 S50 E50   ;set F=1500 mm/s, A=15000 mm/s^2, J=550000 mm/s^3, S=E=50 mm/s
G01 X0 Y0 Z-360                   ;move to the starting position
G04 P500                         ;wait 500 ms (0.5 seconds)
G01 X50                          ;move 50 mm along X after the delay
```

---

## G6 - Theta angle control

#### Descriptions

Move the three upper arms to specified Theta angles. Run `G28` first. `G90` selects absolute joint angles; `G91` selects relative angle changes.

Motion settings use Cartesian units and remain in effect for subsequent moves until changed.

#### Usage

```
G6 [X<angle>] [Y<angle>] [Z<angle>] [F<val>] [A<val>] [J<val>] [S<val>] [E<val>]
```

#### Parameters

* `X[angle]`:(degree) The value of the Theta 1 angle.
* `Y[angle]`:(degree) The value of the Theta 2 angle.
* `Z[angle]`:(degree) The value of the Theta 3 angle.
* `F[val]`:(mm/s) Feed rate, integer from 1 to 20000.
* `A[val]`:(mm/s²) Acceleration, integer from 1 to 50000.
* `J[val]`:(mm/s³) Jerk, integer from 1 to 10000000.
* `S[val]`:(mm/s) Start velocity, integer from 0 to 20000.
* `E[val]`:(mm/s) End velocity, integer from 0 to 20000.

#### Example

```
G28                              ;home the robot
G90                              ;use absolute joint angles
G6 X0 Y0 Z0 F1500 A15000 J550000 S50 E50 ;move all three upper arms to 0 degrees
G6 X10 Y10 Z10                    ;move all three upper arms to 10 degrees
G6 X0 Y0 Z0                       ;return all three upper arms to 0 degrees
```

With the standard X3 geometry, equal joint angles of 0 degrees place the tool at approximately X0 Y0 Z-360.46; equal angles of 10 degrees place it at approximately X0 Y0 Z-382.37 in the base coordinate system.

---

## G28 - Homing
#### Descriptions

Home the three XYZ motors using their home sensors and move the W and U servos to their configured home positions. W/U do not seek endstops. Homing establishes the XYZ position reference needed for movement and position queries.

#### Usage

```
G28
```

**Example**

```
G28                              ;home XYZ and move W/U to their configured home angles
```

---

## G90 - Absolute Movement Mode
#### Descriptions

In absolute mode, all coordinates given in G-code are interpreted as positions in the logical coordinate space.

#### Usage

```
G90
```

**Example**

```
G28                              ;home the robot
G90                              ;use absolute positioning
M206 X0 Y0 Z0                     ;use the base coordinate system
G01 F1500 A15000 J550000 S50 E50   ;set F=1500 mm/s, A=15000 mm/s^2, J=550000 mm/s^3, S=E=50 mm/s
G01 X0 Y0 Z-360                   ;move to the starting position
G01 X50                          ;move to absolute X50
G01 X20                          ;move back to absolute X20, a -30 mm change
```

---

## G91 - Relative Movement Mode
#### Descriptions

Set relative position mode. In this mode, all coordinates are interpreted as relative to the last position.

#### Usage

```
G91
```

**Example**

```
G28                              ;home the robot
G90                              ;use absolute positioning
M206 X0 Y0 Z0                     ;use the base coordinate system
G01 F1500 A15000 J550000 S50 E50   ;set F=1500 mm/s, A=15000 mm/s^2, J=550000 mm/s^3, S=E=50 mm/s
G01 X0 Y0 Z-360                   ;move to the starting position
G91                              ;use relative positioning
G01 X50                          ;move +50 mm along X, ending at X50
G01 X-20 Y30                     ;move -20 mm in X and +30 mm in Y, ending at X30 Y30
G90                              ;restore absolute positioning
G01 X0 Y0 Z-360                   ;return to the starting position
```

---

## G93 - Get Current Position

#### Descriptions

Get the current XYZ position calculated from the motor steps already emitted. The response uses the robot's base G-code coordinates, without the working origin set by `M206`. Use `PositionOffset` for coordinates relative to that origin.

Run `G28` first. If the XYZ reference is unknown, the response is `Error:XYZ position is unknown; home with G28.`

#### Usage

```
G93
```

#### Feedback

* `<xpos>,<ypos>,<zpos>`: Coordinates in mm, with two decimal places.
    * `<xpos>` : Current X position.
    * `<ypos>` : Current Y position.
    * `<zpos>` : Current Z position.

#### Example

```
G28                              ;home the robot
G90                              ;use absolute positioning
M206 X0 Y0 Z0                     ;use the base coordinate system
G01 F1500 A15000 J550000 S50 E50   ;set F=1500 mm/s, A=15000 mm/s^2, J=550000 mm/s^3, S=E=50 mm/s
G01 X0 Y0 Z-360                   ;move to the position to query
G93                              ;read the XYZ position in mm

>>> 0.00,0.00,-360.00
```

The response is an example; the reported position can differ slightly from the target because it is calculated from emitted motor steps.

---

## M03, M04 - Output On / Set PWM / Vacuum On
#### Descriptions

Turn on a Delta X 3 digital output, set a PWM output, or control the end effector selected by `M360`.

#### Usage

```
M03 D<x>
M03 P<x> W<y>
M04 P<x> W<y>
M03 S<value>
```

#### Parameters
* `M03 D[x]` or `M04 D[x]`: Turn on a digital output.
    * `x` = 0, 1, 2, 3 for the external digital outputs.
    * `x` = 4 controls the selected end effector. With vacuum mode (`M360 E0`), it turns the vacuum on.
* `M03 P[x] W[y]`: Set a PWM output.
    * `x` = 0, 1.
    * `y` = integer from 0 to 255; required.
* `M04 P[x] W[y]`: Set a PWM output with a larger value range.
    * `x` = 0, 1.
    * `y` = integer from 0 to 65535; required.
* `M03 S[value]` or `M04 S[value]`: Control the selected end effector, with an integer value from 0 to 100.
    * Vacuum (`M360 E0`): turns the vacuum on.
    * Gripper (`M360 E1`): positions the gripper within the range configured by `M62`; `S0` is fully open and `S100` is fully closed.

Use separate commands for digital (`D`) and PWM (`P`) outputs. `W` is used only with PWM outputs.

#### Example

```
M03 D0                           ;turn on digital output D0
M05 D0                           ;turn off digital output D0
M03 P0 W128                      ;set P0 to 128/255, approximately 50.20% PWM
M05 P0                           ;turn off PWM output P0
M04 P1 W32768                    ;set P1 to 32768/65535, approximately 50.00% PWM
M05 P1                           ;turn off PWM output P1

M360 E0                          ;select the vacuum
M03 D4                           ;turn on the vacuum
G04 P500                         ;keep the vacuum on for 0.5 seconds
M05                              ;turn off the vacuum

M360 E1                          ;select the gripper
M03 S50                          ;move halfway between the configured gripper angle limits
G04 P500                         ;wait 0.5 seconds
M05                              ;open the gripper
```

---

## M05 - Output Off / Turn Off PWM / Vacuum Off

#### Descriptions

Turn off a Delta X 3 digital output, set a PWM output to zero, or turn off the selected end effector.

#### Usage

```
M05
M05 D<x>
M05 P<x>
```

#### Parameters
* `M05` or `M05 D4`: Turn off the end effector selected by `M360`. In vacuum mode, turn off the vacuum; in gripper mode, open the gripper.
* `M05 D[x]`: turn off digital output pin
    * `x` = 0, 1, 2, 3.
* `M05 P[x]`: turn off PWM output pin
    * `x` = 0, 1.

#### Example

```
M03 D0                           ;turn on digital output D0
M05 D0                           ;turn off digital output D0
M03 P0 W128                      ;enable PWM output P0
M05 P0                           ;set P0 PWM to zero
M360 E0                          ;select the vacuum
M03 D4                           ;turn on the vacuum
M05                              ;turn off the selected vacuum
M360 E1                          ;select the gripper
M03 S50                          ;move the gripper to the middle of its configured range
M05 D4                           ;open the selected gripper
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
M07 I0 I3                        ;read digital inputs I0 and I3
>>> I0 V1
>>> I3 V0

M07 A1                           ;read analog input A1 on the 0-1023 scale
>>> A1 V512
```

Input values shown are illustrative and depend on the connected signals.

---
## M08 - Read Input Signals Automatically.

#### Descriptions

Report digital input changes automatically, or report analog input values at a configured interval.

#### Usage

```
M08 I<x> B<y>
M08 A<x> C<y>
```

#### Parameters

* `M08 I[x] B[y]` : auto read digital input pins.
    * `I[x]` : Digital Input Pin
        * `x` = 0, 1, 2, 3.
    * `B[y]`: Required digital reporting mode.
        * `y = 1`: Start the auto-reading digital input signal process.
        * `y = 0`: Stop the auto-reading digital input signal process.
* `M08 A[x] C[y]`
    * `A[x]`: Analog Input Pin
        * `x` = 0, 1.
    * `C[y]`: Required nonnegative integer interval setting.
        * `y > 50`: Enable analog reporting, with an interval of `floor(y / 10)` milliseconds. For example, `C200` sets a 20 ms interval and `C5000` sets a 500 ms interval.
        * `y <= 50`: Disable analog reporting.

#### Feedback

* `I[x] V[val]` : return auto read digital input value
    * `x` = pin number
    * `val` = {0,1}
* `A[x] V[val]` : return auto read analog input value
    * `x` = pin number
    * `val` = [0, 1023]

#### Example

```
M08 I3 B1                        ;report each change of digital input I3
M08 A1 C5000                     ;report analog input A1 every 500 ms (5000/10)

>>> I3 V0
>>> A1 V512

M08 I3 B0                        ;stop automatic reports from I3
M08 A1 C0                        ;stop automatic reports from A1
```

Input values shown are illustrative and depend on the connected signals.

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
M08 A1 C5000                     ;enable A1 reports at a 500 ms interval
G04 P1000                        ;wait 1 second
M9 A1                            ;stop A1 analog reports
```

---

## M43 - Set UART2 / Serial2

#### Descriptions

Configure UART2 / Serial2. Use `A1` to enable, `A0` to disable, and `B` to set the baudrate. Both parameters are required, including when disabling the port. Settings are saved to EEPROM and applied after the reply.

#### Usage

```
M43 A<x> B<y>
```

#### Parameters

* `A[x]`
    * `x = 1`: enable UART2 / Serial2.
    * `x = 0`: disable UART2 / Serial2.
* `B[y]`: Baudrate, integer from 1200 to 3000000.

#### Example

```
M43 A1 B115200                   ;enable UART2 / Serial2 at 115200 baud
M43 A0 B115200                   ;disable UART2 / Serial2
```

Send these configuration commands through USB so disabling UART2 does not interrupt your control connection.

---

## M44 - Set UART3 / Serial3

#### Descriptions

Configure UART3 / Serial3. Use `A1` to enable, `A0` to disable, and `B` to set the baudrate. Both parameters are required, including when disabling the port. Settings are saved to EEPROM and applied after the reply.

#### Usage

```
M44 A<x> B<y>
```

#### Parameters

* `A[x]`
    * `x = 1`: enable UART3 / Serial3.
    * `x = 0`: disable UART3 / Serial3.
* `B[y]`: Baudrate, integer from 1200 to 3000000.

#### Example

```
M44 A1 B115200                   ;enable UART3 / Serial3 at 115200 baud
M44 A0 B115200                   ;disable UART3 / Serial3
```

Send these configuration commands through USB so disabling UART3 does not interrupt your control connection.

---

## M50 - Enable RJ45

#### Descriptions

Enable or disable the RJ45 Ethernet port. The setting is saved to EEPROM and applied automatically.

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
M50 A1                           ;enable the RJ45 Ethernet port
>>> Ok
```

The Ethernet examples use robot IP `192.168.1.100`, DNS/gateway `192.168.1.1`, subnet mask `255.255.255.0`, and TCP port `8844`. Configure the robot through USB; a computer on this subnet can use an unused address such as `192.168.1.10`.

---

## M51 - Set Ethernet Port

#### Descriptions

Set the Ethernet server port. The setting is saved to EEPROM and the server restarts with the new port.

#### Usage

```
M51 B<x>
```

#### Parameter

* `B[x]`: Port number, integer from 1 to 65535.

#### Example

```
M51 B8844                        ;set the Ethernet TCP port to 8844
>>> Ok
```

---

## M52 - Set MAC Device

#### Descriptions

Set the robot's MAC address. All six decimal bytes are required, each from 0 to 255. The address is saved to EEPROM and applied automatically.

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
M52 A2 B23 C34 D45 E56 F67        ;set MAC bytes to 2-23-34-45-56-67 (decimal)
>>> Ok
```

---

## M53 - Set Ethernet IP

#### Descriptions

Set the robot's Ethernet IP address. All four decimal octets are required, each from 0 to 255. The address is saved to EEPROM and applied automatically.

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
M53 A192 B168 C1 D100            ;set the robot IP to 192.168.1.100
>>> Ok
```

---

## M54 - Set Ethernet DNS

#### Descriptions

Set the Ethernet DNS address. All four decimal octets are required, each from 0 to 255. The address is saved to EEPROM and applied automatically.

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
M54 A192 B168 C1 D1              ;set the DNS server to 192.168.1.1
>>> Ok
```

---

## M55 - Set Ethernet Gateway

#### Descriptions

Set the Ethernet gateway address. All four decimal octets are required, each from 0 to 255. The address is saved to EEPROM and applied automatically.

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
M55 A192 B168 C1 D1              ;set the gateway to 192.168.1.1
>>> Ok
```

---

## M56 - Set Ethernet Subnet

#### Descriptions

Set the Ethernet subnet mask. All four decimal octets are required, each from 0 to 255. The mask is saved to EEPROM and applied automatically.

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
M56 A255 B255 C255 D0            ;use the 192.168.1.0/24 subnet
>>> Ok
```

---

## M57 - Get Robot IP

#### Descriptions

Get the robot's configured IP address. Ethernet must be enabled with `M50 A1`.

#### Usage

```
M57
```

#### Example

```
M53 A192 B168 C1 D100            ;set the robot IP to 192.168.1.100
M50 A1                           ;enable Ethernet
M57                              ;read the configured robot IP
>>> IP:192.168.1.100
```

---

## M58 - Get Ethernet Info

#### Descriptions

Get the Ethernet enable state, configured IP address, port, MAC address, DNS, gateway, and subnet mask. MAC bytes are reported in decimal.

#### Usage

```
M58
```

#### Example

```
M51 B8844                        ;set the TCP port
M52 A2 B23 C34 D45 E56 F67        ;set the MAC address in decimal
M53 A192 B168 C1 D100            ;set the robot IP
M54 A192 B168 C1 D1              ;set the DNS server
M55 A192 B168 C1 D1              ;set the gateway
M56 A255 B255 C255 D0            ;set the subnet mask
M50 A1                           ;enable Ethernet
M58                              ;read the Ethernet configuration

>>> Ethernet:On;Ip:192.168.1.100;Port:8844;Mac:2-23-34-45-56-67;Dns:192.168.1.1;Gateway:192.168.1.1;Subnet:255.255.255.0
```

---

## M60 - Set Axis W

#### Descriptions

Configure the angle limits, home position, and servo pulse widths for axis W. Settings are saved to EEPROM and applied automatically.

#### Usage

```
M60 [P<x>] [Q<y>] [H<z>] [A<t>] [B<u>]
```

#### Parameters

* `P[x]`: Maximum angle in degrees.
* `Q[y]`: Minimum angle in degrees. The limits must satisfy `0 <= Q < P <= 360`.
* `H[z]`: Home angle in degrees, within `Q <= H <= P`.
* `A[t]`: Minimum pulse width, integer from 36 to 1056 µs.
* `B[u]`: Maximum pulse width, integer from 1892 to 2912 µs.

#### Example

```
M60 P180 Q0 H90 A500 B2500        ;set W limits to 0-180 degrees, home 90, pulses 500-2500 us
G90                              ;use absolute positioning
G01 W90                          ;move W to 90 degrees, corresponding to a 1500 us pulse
```

---

## M61 - Set Axis U

#### Descriptions

Configure the angle limits, home position, and servo pulse widths for axis U. Settings are saved to EEPROM and applied automatically.

#### Usage

```
M61 [P<x>] [Q<y>] [H<z>] [A<t>] [B<u>]
```

#### Parameters

* `P[x]`: Maximum angle in degrees.
* `Q[y]`: Minimum angle in degrees. The limits must satisfy `0 <= Q < P <= 360`.
* `H[z]`: Home angle in degrees, within `Q <= H <= P`.
* `A[t]`: Minimum pulse width, integer from 36 to 1056 µs.
* `B[u]`: Maximum pulse width, integer from 1892 to 2912 µs.

#### Example

```
M61 P180 Q0 H90 A500 B2500        ;set U limits to 0-180 degrees, home 90, pulses 500-2500 us
G90                              ;use absolute positioning
G01 U90                          ;move U to 90 degrees, corresponding to a 1500 us pulse
```

---

## M62 - Set Gripper

#### Descriptions

Configure the gripper's angle limits and home position. Settings are saved to EEPROM and applied automatically. These angles define the range used by `M03 S0` through `M03 S100` when gripper mode is selected.

#### Usage

```
M62 [P<x>] [Q<y>] [H<z>]
```

#### Parameters

* `P[x]`: Maximum angle in degrees.
* `Q[y]`: Minimum angle in degrees. The limits must satisfy `0 <= Q < P <= 360`.
* `H[z]`: Home angle in degrees, within `Q <= H <= P`.

#### Example

```
M62 P100 Q0 H50                  ;set gripper limits to 0-100 degrees and home to 50 degrees
M360 E1                          ;select the gripper
M03 S50                          ;move to 50% of the 0-100 degree range: 50 degrees
G04 P500                         ;wait 0.5 seconds
M05                              ;open the gripper to 0 degrees
```

---

## M84 - Disable Steppers

#### Descriptions

Disable the stepper motors. The XYZ position reference is cleared; run `G28` before the next XYZ move.

#### Usage

```
M84
```

**Example**

```
M84                              ;disable the stepper motors and clear the XYZ reference
```

---

## M85 - Enable Steppers

#### Descriptions

Enable the stepper motors. After `M84`, run `G28` to restore the XYZ position reference before moving.

#### Usage

```
M85
```

**Example**

```
M85                              ;enable the stepper motors
G28                              ;establish the XYZ reference before moving
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

<span class="legacy-anchor" id="m203-set-max-velocity"></span>

## M203 - Set Jerk

#### Descriptions

Set the jerk used for subsequent movements until changed.

#### Usage

```
M203 S<value>
```

#### Parameters

* `S[value]`: Required jerk in mm/s³, integer from 1 to 10000000.

#### Example

```
M203 S550000                     ;set jerk to 550000 mm/s^3
```

---

## M204 - Set Max Acceleration

#### Descriptions

Set the acceleration used for subsequent movements until changed.

#### Usage

```
M204 A<value>
```

#### Parameters

* `A[value]`: Required acceleration in mm/s², integer from 1 to 50000.

#### Example

```
M204 A15000                      ;set acceleration to 15000 mm/s^2
```

---

## M205 - Set Begin/End Velocity

#### Descriptions

Set both the start and end velocities for subsequent movements until changed.

#### Usage

```
M205 S<value>
```

#### Parameters

* `S[value]`: Required start/end velocity in mm/s, integer from 0 to 20000. Motion planning limits these velocities to `max(F - 2, 0)`.

#### Example

```
M205 S50                         ;set both start and end velocities to 50 mm/s
```

---

## M206 - Set Axis Offset

#### Descriptions

Set the working coordinate origin within the robot's workspace. Subsequent absolute XYZ targets are relative to this origin. Use `PositionOffset` to read the current position in the working coordinates.

Use `M206 X0 Y0 Z0` to return to the base coordinate system. The working origin is not saved by `M500`; resetting or loading settings clears it.

#### Usage

```
M206 [X<value>] [Y<value>] [Z<value>]
```

#### Parameters

* `X[value]`: (mm) Working origin X coordinate in the base coordinate system.
* `Y[value]`: (mm) Working origin Y coordinate in the base coordinate system.
* `Z[value]`: (mm) Working origin Z coordinate in the base coordinate system.

#### Example

```
G28                              ;home the robot
G90                              ;use absolute positioning
M206 X0 Y0 Z0                     ;use the base coordinate system
G01 F1500 A15000 J550000 S50 E50   ;set F=1500 mm/s, A=15000 mm/s^2, J=550000 mm/s^3, S=E=50 mm/s
G01 X20 Y-10 Z-360                ;move to the intended working origin
M206 X20 Y-10 Z-360               ;make this point X0 Y0 Z0 in working coordinates
G01 X20 Y0 Z0                    ;move to base coordinates X40 Y-10 Z-360
G01 X0 Y0 Z0                     ;return to the working origin
M206 X0 Y0 Z0                     ;restore the base coordinate system
```

---

## M207 - Set Z Safe 

#### Descriptions

Set the lowest Z level that the robot cannot exceed.

#### Usage

```
M207 Z<value>
```

#### Parameters

* `Z[value]`: (mm) Z safe value.

#### Example

```
M207 Z-420                       ;set the lowest permitted base Z coordinate to -420 mm
```

---

<span class="legacy-anchor" id="m210-set-theta-move-parameter"></span>

## M210 - Set Motion Parameters

#### Descriptions

Set the Cartesian motion parameters used for subsequent movements. Set these values once; they remain in effect until changed.

#### Usage

```
M210 [F<val>] [A<val>] [J<val>] [S<val>] [E<val>]
```

#### Parameters

* `F[val]`:(mm/s) Feed rate, integer from 1 to 20000.
* `A[val]`:(mm/s²) Acceleration, integer from 1 to 50000.
* `J[val]`:(mm/s³) Jerk, integer from 1 to 10000000.
* `S[val]`:(mm/s) Start velocity, integer from 0 to 20000.
* `E[val]`:(mm/s) End velocity, integer from 0 to 20000.

Start and end velocities are limited to `max(F - 2, 0)`.

#### Example

```
M210 F1500 A15000 J550000 S50 E50 ;set F=1500 mm/s, A=15000 mm/s^2, J=550000 mm/s^3, S=E=50 mm/s
```

---

## M220 - Read Parameters

#### Descriptions

Read robot parameters.

#### Usage

```
M220 [I<n>]
```

#### Parameters

* `I[n]`: Parameter group; defaults to 0.
    * `n = 0`: read move parameters.
    * `n = 1`: read axis W parameters.
    * `n = 2`: read axis U parameters.
    * `n = 3`: read gripper parameters.

#### Example

```
M210 F1500 A15000 J550000 S50 E50 ;configure the motion settings used below
M60 P180 Q0 H90 A500 B2500        ;configure W
M61 P180 Q0 H90 A500 B2500        ;configure U
M62 P100 Q0 H50                  ;configure the gripper

M220 I0                          ;read motion settings
>>> F:1500 A:15000 J:550000 S:50 E:50

M220 I1                          ;read W settings
>>> WP:180.00 WQ:0.00 WH:90.00 WA:500 WB:2500

M220 I2                          ;read U settings
>>> UP:180.00 UQ:0.00 UH:90.00 UA:500 UB:2500

M220 I3                          ;read gripper settings
>>> GP:100.00 GQ:0.00 GH:50.00
```

---

## M360 - Select End Effector

### Descriptions

Select vacuum, gripper, or pen mode for the robot's end effector.

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
M360 E0                          ;select vacuum mode
M03 D4                           ;turn on the vacuum
G04 P500                         ;wait 0.5 seconds
M05                              ;turn off the vacuum

M360 E1                          ;select gripper mode
M03 S50                          ;move to the middle of the configured gripper range
G04 P500                         ;wait 0.5 seconds
M05                              ;open the gripper

M360 E2                          ;select pen mode
```

---
## M361 - Set minimum movement

### Descriptions

Set the minimum movement distance. The default and smallest allowed value are 0.1 mm.

### Usage

```
M361 P<len>
```

### Parameters

* `P[len]`: (mm) Minimum movement distance, from 0.1 to 1000000 mm.

### Example

```
M361 P0.1                        ;set the minimum movement distance to 0.1 mm
```

---

## M500 - Save Settings

#### Descriptions

Save persistent settings to EEPROM, including motion parameters, axis/gripper calibration, robot geometry, and communication settings. The working origin set by `M206` is not saved.

#### Usage

```
M500
```

#### Example

```
M210 F1500 A15000 J550000 S50 E50 ;set the motion parameters
M500                             ;save the current persistent settings to EEPROM
>>> Ok
```

---

<span class="legacy-anchor" id="m501-restore-settings"></span>

## M501 - Reset Settings

#### Descriptions

Reset settings to their defaults and save them to EEPROM. This also clears the working origin and XYZ position reference. Run `G28` before the next XYZ move.

#### Usage

```
M501
```

#### Example

```
M501                             ;reset settings to defaults and save them to EEPROM
G28                              ;home again before XYZ movement
```

---

<span class="legacy-anchor" id="m502-reset-settings"></span>

## M502 - Load Settings

#### Descriptions

Load saved settings from EEPROM. This also clears the working origin and XYZ position reference. Run `G28` before the next XYZ move.

#### Usage

```
M502
```

#### Example

```
M210 F1500 A15000 J550000 S50 E50 ;set the motion parameters
M500                             ;save these settings to EEPROM
M210 F1000                       ;temporarily change the feed rate to 1000 mm/s
M502                             ;reload the saved settings, restoring F1500
M220 I0                          ;verify the restored motion parameters
>>> F:1500 A:15000 J:550000 S:50 E:50

G28                              ;home again before XYZ movement
```

---

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
