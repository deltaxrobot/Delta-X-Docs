---
command_groups:
  - XConveyor
  - XEncoder
shared_controller_note: >-
  XConveyor and XEncoder use the same controller board. All commands in both
  groups can be used for either XConveyor or XEncoder. The groups organize
  commands by function; follow the mode and pin requirements of each command.
---

# GCODES FOR X CONVEYOR BOARD

## Communication and Responses

- Use **115200 baud, 8N1** for the serial connection, or TCP to the configured Ethernet IP address and port.
- Send one command per line, terminated by **LF** (`\n`). CRLF is also accepted. Command names and parameter letters are case-sensitive.
- Separate parameters with spaces. Angle brackets in usage descriptions are placeholders; do not send the brackets.
- `M315`, `M317`, `M318`, `M319`, and `M331` process only the **first option** on a line. Send separate commands for several settings. `M332` and `M333` accept their pin, function, and value together.
- Most setting commands return `Ok`. Queries return data without a trailing `Ok`. `M312` returns `Ok` when the position move finishes rather than immediately.
- Wait for the expected response before sending the next command. Position moves are not queued. Automatic position or input reports can arrive between command responses.
- Serial lines are limited to **128 printable characters**. An oversized line is discarded and returns `Unknown:UART line too long!`. Unrecognized M-codes return `Unknown:Gcode!`.

Examples show commands and responses separately. Response values are illustrative except for the stated firmware/mainboard versions and date.

## Detect Conveyor COM Port

Send `IsXConveyor` to identify the controller.

#### Usage

```text
IsXConveyor
```

#### Response

```text
YesXConveyor
```

The firmware also accepts `IsXEncoder` and replies with `YesXEncoder`.

## Firmware and Mainboard Information

#### Usage

```text
FirmwareVersion
Date
MainboardVersion
```

#### Responses for this firmware

```text
FirmwareVersion:2.1.1
FirmwareDate:27/10/2026
MainboardVersion:2.1
```

## Device Address

Read the stored device identifier with `Address`, or set it with `Address:<value>`. The value is an unsigned 16-bit number (`0`?`65535`) saved to nonvolatile memory. It is not an IP address or TCP port, and commands do not require an address prefix.

#### Set an address

```text
Address:1
```

Response: `Ok`.

#### Read the address

```text
Address
```

Example response:

```text
Address:1
```

## Reset Controller

Restart the controller with the case-sensitive text command `Reset`. This restarts the firmware; it does not restore factory configuration.

#### Usage

```text
Reset
```

The controller prints `XConveyor Reset` to the **serial connection**, even if the command was sent through TCP, then restarts after about 100 ms. There is no `Ok` response. Reconnect after the controller starts again.

## I/O Pin Numbering

The four dedicated inputs/outputs use **zero-based** command indices. They are separate from the encoder channels and motor pins.

| Command index | Dedicated input | Dedicated output |
| --- | --- | --- |
| `0` | Input 1 | Output 1 |
| `1` | Input 2 | Output 2 |
| `2` | Input 3 | Output 3 |
| `3` | Input 4 | Output 4 |

Use `M330`?`M333` for these dedicated I/O pins. `M319` instead uses `0`/`1` for encoder channels A/B; `M314` uses `0`/`1`/`2` for motor PUL/DIR/EN.

## XConveyor

Motor control, dedicated digital I/O, and Ethernet configuration commands.

### M310 - Set Motion Mode

Select the motor-control mode.

#### Usage

```text
M310 <mode>
```

| Mode | Function |
| --- | --- |
| `0` | Output-pin mode. Control motor PUL/DIR/EN directly with `M314`. |
| `1` | Position mode. Use `M312` to move and `M313` to set the move speed. |
| `2` | Velocity mode. Use `M311` to set speed and direction. |
| `3` | Input-control mode. Functions assigned with `M332` can change speed, move a relative distance, or stop. Encoder-button control with `M316 3` also requires this mode. |

Changing to a **different** mode stops motion and resets the motor position, input-speed target, and position-reached state. Resending the mode already active does **not** reset the motor position. The mode is saved to nonvolatile memory.

Input mode also accepts `M311`, subject to its motion-state restrictions. It is not potentiometer mode.

#### Example

```text
M310 3
```

Response: `Ok`.

---

### M311 - Set Speed In Velocity Mode

Set the signed target speed in mm/s. Positive and negative values select opposite directions; `0` requests a stop. Acceleration is applied to speed changes, and a direction reversal decelerates to zero before reversing.

The command acts in velocity mode (`M310 2`) or input mode (`M310 3`). It does not interrupt an active position move. Requests in other modes or during a position move are ignored even though `Ok` is returned.

#### Usage

```text
M311 <speed>
```

#### Example

```text
M311 200
```

Response: `Ok`. This acknowledges the request, not that the target speed has been reached.

The requested speed is limited by the motor pulse calibration and the maximum step rate: `20000 / pulses_per_mm` in mm/s. This firmware limit is not the conveyor's mechanical speed rating.

---

### M312 - Set Position

Move to an **absolute motor position** in mm, referenced to startup or the last actual change of motion mode. This is different from the relative-distance input function `M332 F3`.

Use position mode (`M310 1`) before sending this command. A new position target is not queued while a position move is already running.

#### Usage

```text
M312 <position>
```

#### Example

```text
M312 123
```

Response: `Ok` when the move finishes. If the target already equals the current position, `Ok` is returned immediately. A request ignored because of mode or motion state has no completion response.

Set the move speed with `M313`. Resending `M310 1` while already in position mode does **not** reset the origin.

---

### M313 - Set Speed In Position Move

Set the speed in mm/s for subsequent position moves, including relative moves triggered through `M332 F3`. The absolute value is used and is limited to the maximum step rate for the configured motor pulses/mm.

#### Usage

```text
M313 <speed>
```

#### Example

```text
M313 300
```

Response: `Ok`. This setting **is saved** to nonvolatile memory in X Conveyor firmware 2.1.1. If no valid stored position speed is available at startup, the firmware uses 50 mm/s.

---

### M314 - Set Motor Pins Level

An alternate function of the motor pins, available only in output-pin mode (`M310 0`). This command is not used for normal conveyor motion.

#### Usage

```text
M314 P<pin> V<level>
```

| Parameter | Values |
| --- | --- |
| `P<pin>` | `0`: pulse pin (PUL); `1`: direction pin (DIR); `2`: enable pin (EN). |
| `V<level>` | `0`: LOW; `1`: HIGH. |

Keep the parameter order `P` then `V`. Response: `Ok`. In other motion modes, the pins are not changed even though `Ok` is returned.

---

### M315 - Config Conveyor Parameters

Read the conveyor configuration or change **one setting per command**. Additional options on the same line are ignored.

#### Usage

```text
M315
M315 S<pulses_per_mm>
M315 R<reverse>
M315 E<enable>
M315 P
M315 A<acceleration>
M315 B<button_start_speed>
```

| Option | Function |
| --- | --- |
| No option | Read mode, motor pulses/mm, and direction reversal. |
| `S<value>` | Set motor pulses/mm to match the motor and transmission. Use a positive calibrated value. |
| `R<value>` | `0`: normal direction; `1`: reverse direction. Configure this while the conveyor is stopped. |
| `E<value>` | Store the run-with-encoder flag (`0` or `1`). In firmware 2.1.1 it is not used by the motion-control loop and does not enable closed-loop positioning. |
| `P` | Stop an active position move immediately and update the estimated motor position from pulses already sent. It does not take a target position. |
| `A<value>` | Set acceleration in mm/s?. Use a nonnegative value; `0` requests speed changes without an acceleration ramp. |
| `B<value>` | Set the start speed used when holding encoder button A in `M316 3` / `M310 3`. This is not the speed step of the dedicated inputs configured with `M332`. |

`S`, `R`, `E`, and `A` save the configuration to nonvolatile memory. `B` updates the button-start speed in RAM but does not itself save it. Setting commands return `Ok`.

#### Example: send settings separately

```text
M315 S31.83
M315 R0
M315 A1000
```

These numbers are examples, not factory calibration values.

#### Example response to `M315`

```text
M:1 S:31.83 R:0
```

The query returns only `M`, `S`, and `R`; acceleration, the encoder flag, and button-start speed are not included.

Use `M315 P` during a position move. This firmware clears the move counter after the stop, so a subsequent `M312` can start without changing mode or resetting the position origin.

---

### M330 - Set Output Pin

Set one of the four dedicated outputs. The output must have function `F0` selected with `M333` before it can be controlled manually.

#### Usage

```text
M330 P<pin> V<state>
```

| Parameter | Values |
| --- | --- |
| `P<pin>` | Output index `0`?`3`, corresponding to Output 1?4. |
| `V<state>` | `0`: off; `1`: on. |

Keep the parameter order `P` then `V`.

#### Example: manually activate Output 1

```text
M333 P0 F0
M330 P0 V1
```

Each command returns `Ok`. If the output has an automatic function (`F1` or `F2`), `M330` returns `Unknown:Output has function!` and leaves it under automatic control.

---

### M331 - Read Input Pin

Read one of the four dedicated inputs, or enable/disable reports when its logic state changes. Send one option per command.

#### Usage

```text
M331 V<pin>
M331 T<pin>
M331 S<pin>
```

| Option | Function |
| --- | --- |
| `V<pin>` | Read the current input state. |
| `T<pin>` | Enable reports when the state changes. |
| `S<pin>` | Disable change reports. |

Use pin indices `0`?`3` for Input 1?4. `V` returns data without `Ok`; `T` and `S` return `Ok`. Automatic reporting is separate from the input's assigned motion function and is not saved across restarts.

#### Example: read Input 1

```text
M331 V0
```

Example response:

```text
I0 V1
```

`M331 T0` enables further `I0 V<state>` reports. `M331 S0` stops them. These are raw logic-state changes, not the debounced motion triggers used by `M332`.

---

### M332 - Configure Input Pin

Assign a motion function to a dedicated input. These functions are active only in **input-control mode (`M310 3`)**. Pin indices are `0`?`3`.

#### Usage

```text
M332
M332 I<pin>
M332 I<pin> F<function> V<value>
```

- No options: return the configuration of all four inputs.
- `I<pin>` alone: return that input's configuration.
- `I<pin> F<function>`: set the function.
- Add `V<value>` to set the function value. Parameter order is flexible.

| Function | Behavior | Value |
| --- | --- | --- |
| `F0` | No motion function. Reading/reporting through `M331` remains available. | Ignored. |
| `F1` | Increase the input controller's speed target. | Step in mm/s. |
| `F2` | Decrease the input controller's speed target. | Step in mm/s. |
| `F3` | Move by a relative distance from the current motor position. | Signed distance in mm. |
| `F4` | Stop an active position move immediately, or request zero velocity for a speed run. | Ignored. |

A function triggers when the input logic becomes `1` after remaining stable for more than **25 ms**. Holding `F1`/`F2` for more than **1.5 seconds** repeats the speed step at approximately **100 ms** intervals.

`F1`/`F2` are ignored during a position move. `F3` is accepted only when the conveyor is stopped with no pending reversal or position move, and uses the speed set by `M313`. `F4` handles both motion types in input mode.

The input-speed target starts at zero when the motion mode changes.

#### Example: assign speed-up to Input 1 and stop to Input 2

```text
M332 I0 F1 V50
M332 I1 F4 V0
M310 3
```

Each setting returns `Ok`. Functions and values are saved to nonvolatile memory.

#### Example response to `M332 I0`

```text
I0 F1 V50.00
```

`M332` without options returns one line per input, `I0` through `I3`, with no trailing `Ok`.

---

### M333 - Configure Output Pin

Assign an automatic function to a dedicated output, or return it to manual control. These functions follow the firmware's motor-motion state for both command-driven and input-triggered moves. They are not measurements of encoder-confirmed belt motion.

#### Usage

```text
M333
M333 P<pin>
M333 P<pin> F<function> V<value>
```

Use output indices `0`?`3`. Without options, read all outputs; with `P<pin>` alone, read one. Parameter order is flexible.

| Function | Activation condition |
| --- | --- |
| `F0` | Manual output controlled with `M330`. |
| `F1` | The controller's position-reached flag is set after a completed position move or an already-reached `M312` target. This is a maintained state, not a timed pulse. |
| `F2 V0` | The nonzero requested velocity is reached during a velocity run. Does not activate for position moves or a zero-speed target. |
| `F2 V>0` | Signed motor speed is greater than or equal to the positive forward threshold in mm/s. |
| `F2 V<0` | Signed motor speed is less than or equal to the negative reverse threshold in mm/s. |

Signed threshold functions can operate during either velocity or position moves. A new move or a change of motion mode clears the position-reached flag.

#### Example

```text
M333 P0 F1 V0
M333 P1 F2 V50
M333 P2 F2 V-50
```

Each setting returns `Ok` and is saved to nonvolatile memory. Assigning a function initially turns the output off; the next control update applies its activation condition. While `F1`/`F2` is assigned, manual `M330` requests are rejected. Use `M333 P0 F0` to return Output 1 to manual control.

#### Example response to `M333 P1`

```text
O1 F2 V50.00
```

Queries use the prefix **`O`** in their responses, even though the command selects the pin with `P`. The all-output query returns `O0` through `O3`, with no trailing `Ok`.

---

### M389 - Enable Ethernet

Set the Ethernet startup-enable flag and **save the current Ethernet configuration immediately**.

#### Usage

```text
M389 <enable>
```

- `1`: enable Ethernet at startup and initialize it immediately with the current configuration.
- `0`: disable Ethernet at the next startup. In firmware 2.1.1, this does not close an already running server or TCP client connection.

Response: `Ok`. Initialization status and the assigned IP address are also printed on the serial connection when enabling Ethernet.

---

### M390 - Set Ethernet Port

Set the TCP server port in the current configuration. Save and apply with `M396`.

#### Usage

```text
M390 <port>
```

#### Example

```text
M390 8844
```

Response: `Ok`. Startup uses the stored port; `M397` shows the current configured value. `M399` restores the port to `8844`.

---

### M391 - Set Ethernet IP Address

Set the configured IPv4 address using four decimal octets. `0 0 0 0` selects DHCP when Ethernet is next initialized. Save and apply with `M396`.

#### Usage

```text
M391 <octet1> <octet2> <octet3> <octet4>
```

#### Static-IP example

```text
M391 192 168 0 2
```

#### DHCP

```text
M391 0 0 0 0
```

Each command returns `Ok`.

---

### M392 - Set Ethernet DNS Address

Set the configured DNS address using four decimal octets. Save and apply with `M396`.

#### Usage

```text
M392 <octet1> <octet2> <octet3> <octet4>
```

#### Example

```text
M392 192 168 0 1
```

Response: `Ok`.

---

### M393 - Set Ethernet Gateway Address

Set the configured gateway using four decimal octets. Save and apply with `M396`.

#### Usage

```text
M393 <octet1> <octet2> <octet3> <octet4>
```

#### Example

```text
M393 192 168 0 1
```

Response: `Ok`.

---

### M394 - Set Ethernet Subnet Address

Set the configured subnet mask using four decimal octets. Save and apply with `M396`.

#### Usage

```text
M394 <octet1> <octet2> <octet3> <octet4>
```

#### Example

```text
M394 255 255 255 0
```

Response: `Ok`.

---

### M395 - Set Ethernet MAC Address

Set the MAC address using six **decimal** byte values from `0` to `255`, separated by spaces. Convert a hexadecimal MAC address to decimal before sending it. Save and apply with `M396`.

#### Usage

```text
M395 <byte1> <byte2> <byte3> <byte4> <byte5> <byte6>
```

#### Example

```text
M395 18 52 86 120 171 5
```

This represents `12:34:56:78:AB:05`. Response: `Ok`.

---

### M396 - Save and Init Ethernet Port

Save the current Ethernet settings and enable flag to nonvolatile memory, then initialize the server with those settings.

#### Usage

```text
M396
```

Configure network settings through serial, since applying them can interrupt the TCP connection. This command initializes Ethernet even if its startup-enable flag is `0`; it does not change that flag. Use `M389 1` when Ethernet should also start automatically after a restart.

Response: `Ok`. Initialization status and the assigned IP address are also printed on the serial connection.

---

### M397 - Get Ethernet Port Parameters

Read the **configured values** held by the firmware. These may include changes that have not yet been saved or applied.

#### Usage

```text
M397
```

#### Example response

```text
E_port:8844
E_ip:192.168.0.2
E_dns:192.168.0.1
E_gateway:192.168.0.1
E_subnet:255.255.255.0
E_mac:18.52.86.120.171.5
```

The MAC address is reported as decimal bytes separated by dots. There is no trailing `Ok`.

---

### M398 - Get Ethernet Local Port Parameters

Read the network stack's **active IP, DNS, gateway, and subnet**. The port and MAC fields come from the firmware's current configured values.

#### Usage

```text
M398
```

The response uses the same fields as `M397`, without a trailing `Ok`. After DHCP initialization, `M397` can show the configured IP as `0.0.0.0`, while `M398` shows the assigned IP.

The text command `IP` returns the same information over both serial and TCP, without an extra echo line.

---

### M399 - Reset Ethernet Parameters

Restore the following network configuration, save it to nonvolatile memory, and immediately reinitialize Ethernet:

| Setting | Reset value |
| --- | --- |
| TCP port | `8844` |
| Configured IP | `0.0.0.0` (DHCP) |
| Configured DNS, gateway, subnet | `0.0.0.0` |
| MAC address | `DE:AD:BE:EF:FE:32` (decimal bytes `222.173.190.239.254.50`) |

This command leaves the Ethernet startup-enable flag unchanged. It resets network settings only, not motor, encoder, or I/O configuration. Use the serial connection because the active TCP connection can be interrupted.

#### Usage

```text
M399
```

#### Configuration response

```text
E_port:8844
E_ip:0.0.0.0
E_dns:0.0.0.0
E_gateway:0.0.0.0
E_subnet:0.0.0.0
E_mac:222.173.190.239.254.50
```

There is no trailing `Ok`. Initialization status is also printed on serial. Use `M398` or `IP` afterward to read the active address assigned by DHCP.

---

<span class="legacy-anchor" id="encoder-commands"></span>

## XEncoder

Encoder position, pulse calibration, and channel input commands.

When updating an earlier X Encoder integration:

- Position reports use `P0:<position>`, rather than the `P:<position>` examples in the old reference.
- Read or set encoder calibration with `M318`; do not assume the old reference's `5.12` pulses/mm value applies to the current controller.
- For `M319`, select `M316 2` and specify channel `0` (A) or `1` (B), such as `M319 V0` or `M319 T1`. These channels replace encoder pulse decoding while used as inputs. The controller's separate digital inputs use `M331`.

### M316 - Set Encoder Mode

Select how encoder channels A and B are used. Setting a mode clears the encoder position counters and saves the configuration.

#### Usage

```text
M316 <mode>
```

| Mode | Function |
| --- | --- |
| `0` | Absolute encoder position since the last reset. |
| `1` | Relative position change since the previous position report. |
| `2` | Digital input mode for channels A/B, queried with `M319`. |
| `3` | Button mode on channels A/B. Motion control also requires `M310 3`. |

#### Encoder-button behavior in mode `3`

The firmware treats a channel's HIGH logic state as pressed:

- Channel A active for more than 150 ms increases the button-speed target by 5 mm/s. Held for more than 2 seconds, it sets the target to the start speed configured by `M315 B`.
- Channel B active for more than 150 ms decreases the button-speed target by 5 mm/s. Held for more than 2 seconds, it requests zero speed.

These button actions request velocity changes and do not interrupt an active position move. Use a dedicated input with `M332 F4` to stop either type of motion in input mode.

Button mode replaces encoder pulse decoding. It is separate from the four dedicated input functions configured with `M332`.

#### Example

```text
M316 1
```

Response: `Ok`.

---

### M317 - Get Position from Encoder

Read the position once, configure periodic position reports, or reset the encoder position. Use one option per command.

#### Usage

```text
M317
M317 T<period_ms>
M317 R
```

| Option | Function |
| --- | --- |
| No option | Return one position report. |
| `T<value>` | Set the report period in milliseconds. Values from `50` to `65535` enable reporting; values below `50`, including `0`, stop it. |
| `R` | Reset the encoder position to zero. This does not reset the motor position used by `M312`. |

Position values use the absolute or relative mode selected by `M316` and have two decimal places.

#### Query

```text
M317
```

Example response:

```text
P0:5.32
```

#### Enable periodic reports

```text
M317 T500
```

The command returns `Ok`, followed by `P0:<position>` reports every 500 ms. Send `M317 T0` to stop reporting.

#### Reset

```text
M317 R
```

Response: `Ok`.

---

### M318 - Set Encoder Parameters

Read the encoder configuration or change **one setting per command**. Additional options on the same line are ignored.

#### Usage

```text
M318
M318 S<pulses_per_mm>
M318 R<reverse>
M318 C<scale>
```

| Option | Function |
| --- | --- |
| No option | Read encoder mode, scale, pulses/mm, reversal, and report period. |
| `S<value>` | Set the calibrated pulses/mm for the selected scale. Use a positive value. |
| `R<value>` | `0`: normal direction; `1`: reverse direction. |
| `C<value>` | Select pulse-counting scale: `1`, `2`, or `4`. |

Each valid setting clears the encoder position counters and saves the configuration. Changing `C` does not automatically adjust `S`; set both in separate commands. Calibration is loaded from nonvolatile memory, so this reference does not assume a fixed factory pulses/mm value.

#### Example

```text
M318 C2
M318 S10.24
M318 R1
```

Each setting returns `Ok`. The pulses/mm value above is an example calibration for scale `2`.

#### Example response to `M318`

```text
M:1 C:2 S:10.24 R:1 T:500
```

---

### M319 - Read Encoder Pin

Read channels A/B as digital inputs, or report changes to their states. Select input-pin mode with `M316 2` first; these functions replace normal encoder pulse decoding.

#### Usage

```text
M319 V<pin>
M319 T<pin>
M319 S<pin>
```

| Option | Function |
| --- | --- |
| `V<pin>` | Read the current input state. |
| `T<pin>` | Enable reports when the input state changes. |
| `S<pin>` | Disable reports when the input state changes. |

Pin `0` is encoder channel A; pin `1` is channel B. Send one option per command. `T` and `S` return `Ok`; `V` returns the pin state without a trailing `Ok`.

#### Example

```text
M319 V1
```

Example response:

```text
I1 V1
```

Reports use `I0 V<state>` or `I1 V<state>`, where state is `0` or `1`.

---

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
