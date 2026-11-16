---
description: Choose a DeltaXStudio guide for first-time Pick & Place setup, Blockly programming, or daily operation.
guide_navigation:
  next:
    label: START SETUP
    title: System Setup
    url: tutorials/control_guides/deltaxstudio/
---

# DeltaXStudio — Overview

Choose a guide for the work you need to do. The four-step setup takes a new camera-based Pick & Place installation through its first successful pick. Blockly programming and daily operation have their own guides.

## Where to start

<div class="guide-card-grid" markdown="1">

<div class="guide-card" markdown="1">

### Set up Pick & Place

Connect the hardware, calibrate the camera and robot, configure detection, and test picking. Follow this path when commissioning a new camera-based application.

[Start with System Setup →](../deltaxstudio.md)

</div>

<div class="guide-card" markdown="1">

### Write a Blockly program

Build a custom movement sequence or detection task. Connect and check the hardware first; add Calibration and Vision when your program uses camera-based picking.

[Open Blockly Programming →](blockly.md)

</div>

<div class="guide-card" markdown="1">

### Operate an existing setup

Open the interface, check the system, and run or stop the application that has already been tested. You do not need to repeat calibration or training every day.

[Open Daily Operation →](daily_operation.md)

</div>

</div>

## The Pick & Place setup path

| Stage | What you configure | Ready to continue when… |
| --- | --- | --- |
| [1. System Setup](../deltaxstudio.md) | Network access and installed hardware. | The intended robot, camera, and any required conveyor/encoder respond correctly. |
| [2. Calibration](calibration.md) | The relationship between camera, robot, and conveyor coordinates. | Calibration completes successfully and the corrected image and crop are correct. |
| [3. Vision](vision.md) | AI or color detection, with optional Template Matching. | Each object has a stable detection with the intended center, orientation, and class. |
| [4. Pick & Place](pick_and_place.md) | Working heights, destinations, motion settings, and the selected task. | Low-speed tests reliably pick, transfer, and release objects at several positions. |

In Calibration and Vision, <span class="doc-accent">choose one method that fits your application</span>. The methods are alternatives, not additional steps to complete in order. Each method guide leads back to the next setup stage.

Blockly is available whenever you need it. Color filtering uses Blockly during Vision setup; custom picking logic uses it during Pick & Place setup. Built-in AI picking does not require learning Blockly first.

## When the application changes

Return to the part affected by the change rather than repeating the whole setup.

| Change | Revisit |
| --- | --- |
| Network or installed hardware | [System Setup](../deltaxstudio.md) |
| Camera, robot, or conveyor moved relative to one another | [Calibration](calibration.md), then verify detection and picking |
| Object appearance, lighting, classes, or detection method | [Vision](vision.md), then verify class-to-destination mapping and picking |
| Tool, object height, destination, or motion settings | [Pick & Place](pick_and_place.md) and any affected working-height settings |
| Program sequence or branching logic | [Blockly Programming](blockly.md), then test the updated task |

After the application has passed its setup tests, use [Daily Operation](daily_operation.md) for routine checks and operation.
