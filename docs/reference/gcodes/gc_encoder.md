# GCODES FOR X ENCODER

## Identity X Encoder

To identify whether the COM port is associated with the `X Encoder`, send the command IsXEncoder. If it is indeed linked to the `X Encoder`, it will respond with YesXEncoder.

For Eg:

```
IsXEncoder

>>> YesXEncoder
```

## M316 - Select Response Mode

#### Description

There are 2 types of response modes: Absolute Mode and Relative Mode. In ABSOLUTE MODE, all responsed positions relative to the origin location. With RELATIVE MODE, reponsed positions relative to the previous position.

#### Usage

```
M316 [<mode>]
```

#### Parameter

`[mode]`: mode index

* 0: Absolute Mode (default)
* 1: Relative Mode

#### Example

```
M316 1   ;relative mode
```

---


## M317 - Get Current Position

#### Description

Get current position (mm) in current mode. You can also set a feedback cycle time to auto response current position.

#### Usage

```
M317
M317 [T<period>]
```

#### Parameter

* `M317` : return current position
* `M317 T[period]`: auto feedback position in every `period` miliseconds.

#### Example 

```
M317   ;get current position
>>> P:13.2    ;current pos is 13.2 mm

M317 T200    ;set auto feedback position every 200ms
>>> P:14.5
>>> P:21.2
>>> P:27.5

```

---

## M318 - Set Pulse/MM value

#### Description

When you need to calibrate the encoder, you can change the pul/mm parameter to exactly what you have checked. Default is 5.12 pulse/mm.

#### Usage

```
M318 [S<value>]
```

#### Parameter

`S[value]` : pulse per mm value

#### Example

```
M318 S1.0    ;now you can get the origin pulse by M317
```

---

## M319 - Read Proximity Sensor

#### Description

X Encoder have a 3-pin GX jack to plug proximity in. This command help you read the sensor status right away or auto response status when it have changed.

#### Usage

```
M319 V
M319 T
```

#### Parameter

* `M319 V` : get current sensor value
* `M319 T` : set auto feedback when the sensor value changed

## Contact Us

* Store: [https://deltaxstore.com](https://deltaxstore.com)
* Website: [https://www.deltaxrobot.com](https://www.deltaxrobot.com)
* Email: [deltaxrobot@gmail.com](mailto:deltaxrobot@gmail.com)
* Phone: +84 38 875 2005
