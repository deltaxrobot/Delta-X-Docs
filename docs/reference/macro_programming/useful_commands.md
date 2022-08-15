# USEFUL COMMANDS

## Identify Delta Robot Command

> When you need to identity a COM port was connected to Delta Robot or not, you can send a command like `IsDelta` to that port, if it is *Delta Robot*, it will feedback `YesDelta`. Note that the baudrate must be 115200.

```
IsDelta

>>> YesDelta
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Disconnect COM Port Command

> This command will disconnect *Delta Robot* with the COM port which was connected before.

```
Disconnect
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Current Position Command

> This commnad will return current end effector position. If robot have any axis, the robot will return all current axis position.

```
Position

>>> X30.4 Y90 Z-800 W50 U90
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Position Offset Command

> This command return positon offset of all axis.

```
PositionOffset

>>> X0.5 Y1.2 Z-2.2
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Current Theta Angles

> This command return current theta angles of 3 upper arm (degree).

```
Angle

>>> X2.46 Y2.46 Z2.46
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Current Endstop Sensor States

> This command will return current states of endstops(on Delta X 1, Delta X 2) or proximity sensors(on Delta X S).

```
HTs

>>> 111
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Robot IMEI

> This command will return robot IMEI.

```
IMEI

>>> 0004-0000-0000-0012
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Robot Infor

> This command will return robot informations, such as model, version of mainboard,..

```
Infor

>>> @IMWI Technology
>>> Main_board_version: V1.0
>>> Firmware_version: V1.0
>>> Model: DELTA_XS_V4_D800
```

- Model: `Delta X 1`, `Delta X 2`, `Delta X S`.

## Get Robot Actiive Status

> Return current robot active status. The status are `Free, Running,  Wait, Almostdone, Done`.

```
DeltaState

>>> Free
```

- Model: `Delta X 2`.

## Set Feedback String

> When the robot executed a gcode, it will feedback `Ok`. You can change `Ok` to another string like `ok`, `done` or whatever you want.

```
Feedback: done

>>> set feedback string to 'done'
```

- Model: `Delta X S`.
- With `Delta X 2` model, this command will be `FEEDBACK:<custom_string>`.

## Emergency Stop Command

> You can send a emergency signal by command 

```
Emergency: <state>
```

Where `<state>` can be:

- `Reset` - reset robot
- `Stop` - stop robot
- `Pause` - pause robot
- `Resume` - resume robot

> Model: `Delta X S`.

## Get Current Temperature

> Return current temperature(in degree celsius).

```
TempState

>>> 27.3
```

- Model: `Delta X 2`.

## Set up WIFI connection

> To use WIFI connection on `Delta X 1` or `Delta X 2` model, just use these commands. Once connection successful, the robot will auto return IP address. Take note to **switch to WiFi mode**.

```
SSID:<wifi_name>
PSWD:<wifi_password>
```

For Eg:

```
SSID:IMWI wifi
>>> Ok
PSWD:onlyuknow
>>> Ok

>>> IP:192.168.233
```

- Model: `Delta X 1`, `Delta X 2`.

