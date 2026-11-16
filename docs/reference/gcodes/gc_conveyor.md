# GCODES FOR DESKTOP CONVEYOR

## Communication and Responses

- Use **115200 baud** for the serial connection, or a TCP connection to the configured Ethernet IP address and port.
- Send one command per line, terminated by **LF** (`\n`). CRLF is also accepted. Command names and parameter letters are case-sensitive.
- Separate parameters with spaces. Angle brackets in usage descriptions are placeholders; do not send the brackets.
- `M315`, `M317`, `M318`, and `M319` process only the **first option** on a line. Send separate commands to change several settings.
- Most setting commands return `Ok`. Queries return their data without a trailing `Ok`. `M312` returns `Ok` when the position move finishes, rather than immediately.
- Wait for the expected response before sending the next command. The firmware does not queue position moves.
- Serial lines are limited to **128 printable characters**. An oversized line is discarded and returns `Unknown:UART line too long!`.

Examples show commands and responses separately. Values in response examples are illustrative unless identified as the firmware version or date.

## Detect Desktop Conveyor COM Port

Send `IsXConveyor` to identify the conveyor controller.

#### Usage

```text
IsXConveyor
```

#### Response

```text
YesXConveyor
```

The same firmware also recognizes `IsXEncoder` and replies with `YesXEncoder`.

## Firmware Information

#### Usage

```text
FirmwareVersion
Date
```

#### Responses for this firmware

```text
FirmwareVersion:1.1.3
FirmwareDate:27/10/2026
```

## Device Address

Read the stored device address with `Address`, or set it with `Address:<value>`. The address is a 16-bit unsigned value (`0`?`65535`) and is saved to nonvolatile memory. It is a device identifier, not the Ethernet IP address or TCP port; commands do not need an address prefix.

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

## M310 - Set Motion Mode

Select how the motor pins are used.

#### Usage

```text
M310 <mode>
```

| Mode | Function |
| --- | --- |
| `0` | Output-pin mode. Use `M314` to set the motor pin levels directly. |
| `1` | Position mode. Use `M312` to move and `M313` to set the move speed. |
| `2` | Velocity mode. Use `M311` to set the speed and direction. |
| `3` | Potentiometer mode. The onboard potentiometer sets speed and direction. This is not a button-control mode. |

Changing to a **different** mode stops the current motion and resets the motor's position to zero. Sending the mode that is already active leaves the position unchanged. The selected mode is saved to nonvolatile memory.

#### Example

```text
M310 1
```

Response: `Ok`.

---

<span id="m311-set-speed-in-serial-mode"></span>

## M311 - Set Speed In Velocity Mode

Set the target speed in mm/s. Positive and negative values select opposite directions; `0` requests a stop. Speed changes and direction reversals use the configured acceleration.

Use `M310 2` for serial/TCP velocity control. In mode `3`, the firmware also accepts `M311`, but the next potentiometer update replaces the requested speed. In other modes, the speed request is ignored even though the command returns `Ok`.

#### Usage

```text
M311 <speed>
```

#### Example

```text
M311 200
```

Response: `Ok`. This acknowledges the command; it does not mean the target speed has already been reached.

---

## M312 - Set Position

Move to an **absolute motor position** in mm, measured from the origin established at startup or the last change of motion mode. The target is not a relative distance from the current position.

The conveyor must be in position mode (`M310 1`) and have no position move in progress. Set the move speed with `M313` before starting. A request made in another mode or during an active position move is ignored without a completion response.

#### Usage

```text
M312 <position>
```

#### Example

```text
M312 123
```

Response: `Ok` when the move finishes. If the target is already the current position, `Ok` is returned immediately.

Sending `M310 1` again while already in position mode does **not** reset the origin.

---

## M313 - Set Speed In Position Move

Set the speed, in mm/s, for subsequent `M312` moves. The firmware uses the absolute value of the supplied speed; direction comes from the target position.

#### Usage

```text
M313 <speed>
```

#### Example

```text
M313 300
```

Response: `Ok`. This speed setting is not saved to nonvolatile memory.

---

## M314 - Set Motor Pins Level

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

## M315 - Config Conveyor Parameters

Read the conveyor configuration or change **one setting per command**. Additional options on the same line are ignored.

#### Usage

```text
M315
M315 S<pulses_per_mm>
M315 R<reverse>
M315 E<enable>
M315 P
M315 A<acceleration>
```

| Option | Function |
| --- | --- |
| No option | Read mode, motor pulses/mm, and direction reversal. |
| `S<value>` | Set motor pulses/mm to match the motor and transmission. Use a positive calibrated value. |
| `R<value>` | `0`: normal direction; `1`: reverse direction. |
| `E<value>` | Store the run-with-encoder flag (`0` or `1`). In firmware 1.1.3 this flag is not used by the motion-control loop; it does not enable closed-loop positioning. |
| `P` | Stop an active position move immediately and update the estimated motor position from the pulses sent so far. It does not take a target position. |
| `A<value>` | Set acceleration in mm/s?. The firmware uses the absolute value. |

`S`, `R`, `E`, and `A` are saved to nonvolatile memory. Setting commands return `Ok`. The `B` parameter from X Conveyor is not implemented here.

#### Example: change settings separately

```text
M315 S31.83
M315 R0
M315 A5000
```

The numbers above are examples, not factory calibration values.

#### Example response to `M315`

```text
M:1 S:31.83 R:0
```

The query returns only `M`, `S`, and `R`; it does not report acceleration or the encoder flag.

!!! note "After stopping a position move"
    Use `M315 P` only during an active position move. Firmware 1.1.3 leaves the move counter set after this stop, so change to another mode and back before issuing a new `M312`. Changing mode resets the motor position origin.

---

## M316 - Set Encoder Mode

Select the encoder reporting mode. Changing the setting clears the encoder position counters and saves the mode to nonvolatile memory.

#### Usage

```text
M316 <mode>
```

| Mode | Function |
| --- | --- |
| `0` | Absolute position since the last encoder reset. |
| `1` | Relative position change since the previous position report. |
| `2` | Use encoder channels A and B as input pins with `M319`, instead of decoding encoder pulses. |

Button mode (`3`) is not implemented.

#### Example

```text
M316 1
```

Response: `Ok`.

---

## M317 - Get Position from Encoder

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

## M318 - Set Encoder Parameters

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

## M319 - Read Encoder Pin

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

## M389 - Enable Ethernet

Set the Ethernet startup-enable flag. `M389 1` also initializes Ethernet immediately with the current configuration.

#### Usage

```text
M389 <enable>
```

- `1`: set the enable flag and initialize Ethernet.
- `0`: clear the enable flag. In firmware 1.1.3, this does **not** close an already running Ethernet server or client connection.

The flag is saved with `M396`. That command also initializes Ethernet, even when the flag is `0`; the disabled startup state takes effect after restarting the controller.

Response: `Ok`. Ethernet initialization also sends status messages to the serial connection.

---

## M390 - Set Ethernet Port

Set the TCP server port in the current configuration. Save and apply the setting with `M396`.

#### Usage

```text
M390 <port>
```

#### Example

```text
M390 8844
```

Response: `Ok`. The source defines `8844` as the initial port, but startup loads the stored configuration. Use `M397` to check the configured port.

---

## M391 - Set Ethernet IP Address

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

## M392 - Set Ethernet DNS Address

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

## M393 - Set Ethernet Gateway Address

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

## M394 - Set Ethernet Subnet Address

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

## M395 - Set Ethernet MAC Address

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

## M396 - Save and Init Ethernet Port

Save the current Ethernet settings and enable flag to nonvolatile memory, then initialize the Ethernet server with those settings.

#### Usage

```text
M396
```

Configure network settings through the serial connection, since applying a new configuration can interrupt the TCP connection. `M396` initializes Ethernet regardless of the enable flag; set `M389 1` before saving if Ethernet should start automatically after a restart.

Response: `Ok`. Initialization status is also printed on the serial connection.

---

## M397 - Get Ethernet Port Parameters

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

## M398 - Get Ethernet Local Port Parameters

Read the network stack's **active IP, DNS, gateway, and subnet**. The reported port and MAC fields come from the firmware's configured values. Use this command after Ethernet initialization to check the assigned IP address, especially when using DHCP.

#### Usage

```text
M398
```

The response uses the same fields as `M397`, without a trailing `Ok`. With DHCP, the configured IP in `M397` can be `0.0.0.0` while `M398` shows the assigned IP address.

The text command `IP` returns the same network information. When sent through TCP, `IP` also echoes a line containing `IP` before the fields; the serial response has no echo line.

---

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
