# GCODES FOR SHORT CONVEYOR

## Communication and Responses

- Connect at **115200 baud**, with **8 data bits, no parity, and 1 stop bit**.
- Send one command per line, ending with a **newline (`\n`)**. CRLF is also accepted for the numeric commands below.
- Use uppercase command names, starting at the beginning of the line, followed by a space and a numeric value: `M311 50`.
- Values are positional: use `M311 50`, not `M311 S50`. These commands are setters, not queries; always provide a value. Missing or nonnumeric values can be parsed as zero.
- The controller prints `Begin:` at startup and starts in **potentiometer mode**. The knob can therefore start the belt after power-on or reset.
- `M310`, `M311`, and `M313` reply with `Ok` immediately. A nonzero `M312` normally replies with `Ok` when its move completes.
- Settings are held in RAM and return to startup defaults after a reset. There is no save-to-memory command.

This firmware implements **M310, M311, M312, and M313 only**. It does not implement `IsXConveyor`, encoder feedback, general-purpose input/output commands, or Ethernet commands. Unsupported commands do not produce an error reply.

## Quick Start

Send each line separately and wait for its `Ok` reply before continuing.

1. Select serial control:

    ```text
    M310 1
    ```

2. Run continuously at 50 mm/s:

    ```text
    M311 50
    ```

3. Stop continuous motion:

    ```text
    M311 0
    ```

For a relative position move, set the position speed with `M313`, then send `M312` and wait for its completion reply.

## M310 - Select Control Mode

Select whether the potentiometer or serial commands control the conveyor.

#### Usage

```text
M310 <mode>
```

#### Parameters

| Parameter | Description |
| --- | --- |
| `0` | Potentiometer mode, the startup default. The knob controls speed from 0 to 200 mm/s in one direction. |
| `1` | Serial mode. Use `M311` for continuous motion and `M312` for relative moves. |

The potentiometer is ignored in serial mode. Selecting serial mode sets the continuous speed request to zero; it does not clear an active position move.

Select `M310 1` **before** sending serial movement commands. In potentiometer mode, those commands do not immediately drive the motor, even when a command returns `Ok`.

#### Example

```text
M310 1
```

Response: `Ok`.

Switch modes only after a position move has completed. Returning to `M310 0` lets the current knob setting control the belt again.

## M311 - Set Continuous Speed

Run continuously at a signed speed, or stop continuous motion. Requires serial mode (`M310 1`).

#### Usage

```text
M311 <speed>
```

#### Parameters

| Parameter | Description |
| --- | --- |
| `<speed>` | Speed in mm/s. Positive and negative values select opposite directions. `0` stops continuous motion. |

The firmware limits the speed magnitude to **200 mm/s**. A magnitude below **0.01 mm/s** is treated as zero. It changes the step timing directly, without an acceleration ramp.

#### Examples

Run at 50 mm/s:

```text
M311 50
```

Run in the opposite direction:

```text
M311 -50
```

Stop continuous motion:

```text
M311 0
```

Each command replies with `Ok`. This acknowledges the command; it is not measured speed feedback.

`M311 0` does **not** cancel an active `M312` position move. Wait for that move to finish before using continuous-speed commands.

## M312 - Move Relative Distance

Move a signed distance from the current belt position, then stop. Requires serial mode (`M310 1`). Set the movement speed with `M313`.

#### Usage

```text
M312 <distance>
```

#### Parameters

| Parameter | Description |
| --- | --- |
| `<distance>` | Relative distance in mm. Positive and negative values select opposite directions. This is not an absolute position or a homing command. |

The firmware converts distance to steps using **84 steps/mm**, rounded to the nearest whole step. Position is calculated from commanded motor steps; there is no encoder verification.

!!! note "Direction convention"
    In this firmware, positive `M312` moves in the **opposite direction** to positive `M311`. Negative values also have opposite direction conventions between the two commands.

#### Example

From a stopped conveyor in serial mode, set a position speed of 30 mm/s and wait for `Ok`:

```text
M313 30
```

Move 100 mm and wait for the completion `Ok`:

```text
M312 100
```

Move 100 mm in the opposite direction:

```text
M312 -100
```

#### Completion and Sequencing

- For a nonzero move, `Ok` is sent when the requested step count completes. The firmware then stops the step timer and disables the motor driver.
- `M312 0` returns `Ok` immediately, but does not cancel a move that is already running.
- There is no motion queue or position-move cancellation command. Wait for completion before sending another motion, mode, or position-speed command; commands sent during a move can modify its active step count, direction, or speed.
- Very small nonzero distances can round to zero steps and produce **no completion reply**. One step is approximately **0.0119 mm**; use distances of at least one step for normal positioning.

## M313 - Set Position Move Speed

Set the speed used by `M312`. The startup default is **30 mm/s**. Configure this while the conveyor is stopped, before starting a position move.

#### Usage

```text
M313 <speed>
```

#### Parameters

| Parameter | Description |
| --- | --- |
| `<speed>` | Positive position-move speed in mm/s. Use a value no greater than 200 mm/s. Direction is selected by the sign of `M312`, not by this value. |

The firmware assigns this value directly: it does **not** validate or clamp `M313` like it does `M311`. Do not use zero or negative values. This setting is lost after reset.

#### Example

```text
M313 40
```

Response: `Ok`.

Subsequent `M312` moves use 40 mm/s. `M313` does not specify a distance and does not start a move from idle.

## Related Documentation

- [Short Conveyor specifications](../specifications/accessories/delta_x2_accessories/conveyor_x.md)
- [Firmware source: command parser and motor control](https://github.com/deltaxrobot/Conveyor-X-Firmware/blob/e15006cef1c51ca141a2ca4d2dd4efa8df5c57dd/Conveyor-X-Firmware.ino)
