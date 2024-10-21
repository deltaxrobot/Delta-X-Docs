# USEFUL COMMANDS

## Identify Delta Robot Command

> To check if a COM port is connected to a Delta Robot, send the command `IsDelta`. If connected, it replies with `YesDelta`. The baudrate should be 115200.

```python
IsDelta
>>> YesDelta
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Disconnect COM Port Command

> To disconnect the robot from the current COM port, use this command.

```
Disconnect
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Current Position Command

> To retrieve the robot's current end-effector position, use the `Position` command. This returns the positions of all axes.

```python
Position

>>> X30.4 Y90 Z-800 W50 U90
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Position Offset Command

>  To get the position offset for each axis, use the `PositionOffset` command.

```python
PositionOffset

>>> X0.5 Y1.2 Z-2.2
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Current Theta Angles

> For the current angles of the three upper arms, use `Angle` (angles in deg).

```
Angle

>>> X2.46 Y2.46 Z2.46
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Current Endstop Sensor States

> This command will return current states of endstops(on Delta X 1, Delta X 2) or proximity sensors(on Delta X S).

```python
HTs

>>> 111
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Robot IMEI

> To find the robot's unique IMEI, use the `IMEI` command.

```python
IMEI

>>> 0004-0000-0000-0012
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Robot Information

> The `Infor` command provides details like the model, mainboard version, and firmware version.

```python
Infor

>>> @IMWI Technology
>>> Main_board_version: V1.0
>>> Firmware_version: V1.0
>>> Model: DELTA_XS_V4_D800
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Robot Active Status

> To check the robot's current status, use `DeltaState`. The status are `Free, Running,  Wait, Almostdone, Done`.

```
DeltaState

>>> Free
```

- Model: `Delta X 2`.

## Set Feedback String

> You can customize the feedback message after a command execution by setting a feedback string.
```
Feedback: done

>>> set feedback string to 'done'
```

- Model: `Delta X S`.
- With `Delta X 2` model, this command will be `FEEDBACK:<custom_string>`.

## Emergency Stop Command

> Send an emergency signal with Emergency: <state>. States include Reset, Stop, Pause, or Resume.

```
Emergency: <state>
```

Where `<state>` can be:

- `Reset` - reset robot
- `Stop` - stop robot
- `Pause` - pause robot
- `Resume` - resume robot

> Model: `Delta X 2, Delta X S`.

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
