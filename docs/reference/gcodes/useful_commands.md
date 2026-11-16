# USEFUL COMMANDS

## Identify Delta Robot Command

> To check if a COM port is connected to a Delta Robot, send the command `IsDelta`. If connected, it replies with `YesDelta`. The baudrate should be 115200.

```python
IsDelta
>>> YesDelta
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X 3`, `Delta X S`.

## Disconnect COM Port Command

> Send `Disconnect` when ending a control session.

```
Disconnect
```

On **Delta X 3**, this updates the connection state and indicator. Close the COM port in your host application to release the serial connection.

- Model: `Delta X 1`, `Delta X 2`, `Delta X 3`, `Delta X S`.

## Get Current Position Command

> To retrieve the robot's current end-effector position, use the `Position` command. The response format depends on the model.

**Delta X 1 / Delta X 2 / Delta X S**

```python
Position

>>> X30.4 Y90 Z-800 W50 U90
```

**Delta X 3** returns `X,Y,Z` in mm, with two decimal places, calculated from emitted motor steps. The coordinates use the robot's base frame, without the working origin set by `M206`; W/U are not included. `G93` returns the same position.

```
Position

>>> 31.00,43.00,-291.00
```

Run `G28` before using `Position`, `PositionOffset`, or `Angle` on X3. If the XYZ reference is unknown, these commands return `Error:XYZ position is unknown; home with G28.`

- Model: `Delta X 1`, `Delta X 2`, `Delta X 3`, `Delta X S`.

## Get Position Offset Command

> Use `PositionOffset` to query position information related to the working offset. Its meaning and response format depend on the model.

**Delta X 1 / Delta X 2 / Delta X S**

```python
PositionOffset

>>> X0.5 Y1.2 Z-2.2
```

**Delta X 3** returns the current XYZ position relative to the working origin set by `M206`, in mm with two decimal places. At the working origin, the response is:

```
PositionOffset

>>> 0.00,0.00,0.00
```

With no working origin enabled, X3 returns the same coordinates as `Position`.

- Model: `Delta X 1`, `Delta X 2`, `Delta X 3`, `Delta X S`.

## Get Current Theta Angles

> For the current angles of the three upper arms, use `Angle` (angles in deg).

**Delta X 1 / Delta X 2 / Delta X S**

```
Angle

>>> X2.46 Y2.46 Z2.46
```

**Delta X 3** returns `Theta1,Theta2,Theta3` in degrees, with two decimal places:

```
Angle

>>> 2.46,2.46,2.46
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X 3`, `Delta X S`.

## Get Current Endstop Sensor States

> Read the current states of the three home sensors.

```python
HTs

>>> 111
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X 3`, `Delta X S`.

## Get Robot IMEI

> To find the robot's unique IMEI, use the `IMEI` command.

**Delta X 1 / Delta X 2 / Delta X S**

```python
IMEI

>>> 0004-0000-0000-0012
```

**Delta X 3** includes the `IMEI:` prefix:

```
IMEI

>>> IMEI:0002-0000-0001
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X 3`, `Delta X S`.

## Get Robot Information

> The `Infor` command provides details like the model, mainboard version, and firmware version.

**Delta X S example**

```python
Infor

>>> @IMWI Technology
>>> Main_board_version: V1.0
>>> Firmware_version: V1.0
>>> Model: DELTA_XS_V4_D800
```

**Delta X 3 example**

```
Infor

>>> @Delta X Robotics
>>> Main_board_version: V1.02
>>> Firmware_version: 1.08
>>> Model: DELTA_X_3
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X 3`, `Delta X S`.

## Get Robot Active Status

> To check the robot's current status, use `DeltaState`.

- **Delta X 2:** `Free`, `Running`, `Wait`, `Almostdone`, `Done`.
- **Delta X 3:** `Free`, `Running`, `Wait`, `Executed`, `Done`, `Stop`, `SendConfirm`.

```
DeltaState

>>> Free
```

- Model: `Delta X 2`, `Delta X 3`.

## Set Feedback String

> You can customize the feedback message after a command execution by setting a feedback string.

**Delta X S**

```
Feedback: done

>>> set feedback string to 'done'
```

**Delta X 3** uses uppercase `FEEDBACK:` followed immediately by 1 to 24 printable ASCII characters. Send this while the robot is idle. The setting is saved to EEPROM, and the reply uses the new string:

```
FEEDBACK:done

>>> done
```

- Model: `Delta X 3`, `Delta X S`.
- With `Delta X 2` model, this command will be `FEEDBACK:<custom_string>`.

## Emergency Stop Command

> Send an emergency signal with `Emergency:<state>`. States include Reset, Stop, Pause, or Resume.

```
Emergency:<state>
```

Where `<state>` can be:

- `Reset` - reset robot
- `Stop` - stop robot
- `Pause` - pause robot
- `Resume` - resume robot

On **Delta X 3** and **Delta X S V4/V5**, use the exact forms `Emergency:Stop`, `Emergency:Pause`, `Emergency:Resume`, and `Emergency:Reset`, with no space after the colon. Stop and Pause interrupt the current movement. Resume clears the software stop/pause condition; it does not continue the interrupted path. Check pending commands before resuming, because Stop does not guarantee that the queue is cleared.

For the recovery sequence, queue handling, and controller restart steps, see [Emergency stop and recovery in Termite](../../tutorials/control_guides/termite.md#7-emergency-stop-and-recovery).

> Model: `Delta X 2`, `Delta X 3`, `Delta X S`.

## Get Current Temperature

> To get the hot end's current temperature, use the `TempState` command.

- Model: `Delta X 2`

```
TempState

>>> T:27.3
```

- Model: `Delta X 1`

```
Temp

>>> T:28.2
```

- Model: `Delta X 2`

## Set up WIFI connection

> For models `Delta X 1` and `Delta X 2`, use the `SSID` and `PSWD` commands to connect to Wi-Fi. The robot will return its IP address upon successful connection. Make sure to **switch to WiFi mode**.

```
SSID:<wifi_name>
PSWD:<wifi_password>
IP
```

For Eg:

```
SSID:IMWI wifi
>>> Ok
PSWD:onlyuknow
>>> Ok

>>> IP:192.168.233.1
```
If you forgot your IP:
```
IP

>>> IP:192.168.233.1
```

- Model: `Delta X 1`, `Delta X 2`.

## Contact Us

- Store: [https://deltaxstore.com](https://deltaxstore.com)
- Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
- Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
- Phone: +84 38 875 2005
