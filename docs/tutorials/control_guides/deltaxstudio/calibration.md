---
studio_setup_step: 2
description: Choose the calibration procedure for your application and hardware.
guide_navigation:
  previous:
    title: System Setup
    url: tutorials/control_guides/deltaxstudio/
  next:
    title: Vision
    url: tutorials/control_guides/deltaxstudio/vision/
---

# DeltaXStudio — Calibration

Choose the setup that matches your installation. Each guide includes its own preparation, settings, capture steps, and checks. Follow only the guide you need.

<span class="legacy-anchor" id="1-choose-a-calibration-method"></span>

## Stationary objects

Use this when the objects stay still inside both the camera view and robot reach.

<div class="guide-card" id="e-static-calibration" markdown="1">

### [Static calibration](calibration/static.md)

Capture two reference points on a fixed board. The conveyor, if present, stays stopped.

<p class="guide-card-tags"><span>No encoder required</span><span>No calibration camera</span></p>

[Open guide →](calibration/static.md)

</div>

## Moving objects on a conveyor

All conveyor methods require <span class="doc-accent">encoder feedback connected to DeltaXStudio</span>. First choose who controls the conveyor, then whether a calibration camera is installed.

### DeltaXStudio controls the conveyor

<div class="guide-card-grid" markdown="1">

<div class="guide-card" id="a-fully-automatic-calibration" markdown="1">

### [Fully automatic](calibration/automatic.md)

The software controls belt movement and uses the calibration camera to align robot points.

<p class="guide-card-tags"><span>Encoder required</span><span>Calibration camera</span></p>

[Open guide →](calibration/automatic.md)

</div>

<div class="guide-card" id="b-controlled-conveyor-with-manual-robot-points" markdown="1">

### [Manual robot points](calibration/controlled-conveyor.md)

The software controls the belt. You align the tool and capture each robot point.

<p class="guide-card-tags"><span>Encoder required</span><span>No calibration camera</span></p>

[Open guide →](calibration/controlled-conveyor.md)

</div>

</div>

### Operator controls the conveyor externally

<div class="guide-card-grid" markdown="1">

<div class="guide-card" id="c-external-conveyor-with-a-calibration-camera" markdown="1">

### [With calibration camera](calibration/external-camera.md)

You start and stop the belt when prompted. The camera handles robot-point alignment.

<p class="guide-card-tags"><span>Encoder required</span><span>Calibration camera</span></p>

[Open guide →](calibration/external-camera.md)

</div>

<div class="guide-card" id="d-external-conveyor-with-manual-robot-points" markdown="1">

### [With manual robot points](calibration/external-manual.md)

You control the belt and align the tool to capture the reference points.

<p class="guide-card-tags"><span>Encoder required</span><span>No calibration camera</span></p>

[Open guide →](calibration/external-manual.md)

</div>

</div>

<span class="legacy-anchor" id="2-prepare-the-system-and-working-heights"></span>
<span class="legacy-anchor" id="3-prepare-the-board-and-crop"></span>

The selected guide contains the working-height and crop instructions for that setup. There is no need to read the other methods.

<span class="legacy-anchor" id="4-finish-and-verify"></span>
<span class="legacy-anchor" id="if-calibration-cannot-finish"></span>

## After calibration

Check the completion message and camera crop, then continue to [Vision](vision.md). If calibration stops or fails, use the troubleshooting section at the end of your selected guide.
