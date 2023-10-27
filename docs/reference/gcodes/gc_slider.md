# GCODES FOR SLIDER X

## M320 - Homing

#### Description

The Slider X will move back to its original position at the default speed.

#### Usage

```
M320
```

#### Example

```
M320    ;slider homing
```

---

## M321 - Set Moving Speed

#### Description

This command allows you to set the moving speed of Slider X.

#### Usage

```
M321 [<value>]
```

#### Parameter

`[value]`: speed in mm/s.

#### Example

```
M321 60    ;set slider speed is 60 mm/s.
```

---

## M322 - Set Desired Position

#### Description

Slider X will move to a specified point relative to the home point.

#### Usage

```
M322 [<value>]
```

#### Parameter

`[value]`: position in mm.

#### Example

```
M322 150    ;set slider position is 150mm.
```

---

## M323 - Disable Stepper Motor

#### Description

Normally, the stepper motor will hold the position of the slider. After receiving this command, the motor will release, allowing the slider to move freely.

#### Usage

```
M323
```

#### Example

```
M323    ;disable stepper
```

---

## M324 - Set Acceleration

#### Description

This command is used to set the slider's acceleration when it moves.

#### Usage

```
M324 [<value>]
```

#### Parameters

`[value]`: acceleration in mm/m^2.

#### Example

```
M324 500    ;set accel is 500 mm/s2
```

---
