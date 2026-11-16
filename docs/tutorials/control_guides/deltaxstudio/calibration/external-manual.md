---
studio_setup_step: 2
description: Calibrate a conveyor with external control and manual robot point capture.
guide_navigation:
  previous:
    title: Choose calibration method
    url: tutorials/control_guides/deltaxstudio/calibration/
  next:
    title: Continue to Vision
    url: tutorials/control_guides/deltaxstudio/vision/
---

# Calibration — External conveyor · Manual points

<div class="guide-context" markdown="1">

<span>Calibration · External conveyor · Manual points</span>

[Change method](../calibration.md)

</div>

Use this method when the <span class="doc-accent">operator controls the conveyor externally</span> and <span class="doc-accent">no calibration camera is installed</span>.

An <span class="doc-accent">encoder connected to DeltaXStudio is required</span> to measure conveyor position. Capturing robot points manually does not replace the encoder readings.

<div class="guide-requirements" markdown="1">

Required: <span class="doc-accent">robot + main camera + encoder</span>. The operator starts and stops the belt externally; encoder feedback remains required.

</div>

Screenshots may show an earlier interface; use the field names in the instructions.

<span class="legacy-anchor" id="1-configure-this-setup"></span>

## Configure this setup

Stop running tasks and keep Auto Start disabled. Check the robot and main camera connections. Confirm the encoder counts increase with forward conveyor travel.

Disable <span class="doc-accent">Calibration Camera</span> in Hardware Settings. Select <span class="doc-accent">Camera Fov outside robot area</span> and disable <span class="doc-accent">Use Conveyor</span> in Calibration Settings. Keep the encoder connected.

Check the working heights, save, reset, and wait for reconnection.


<figure class="studio-figure" markdown="1">

![External conveyor calibration mode with Use Conveyor disabled](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/mode-external-conveyor.png)

<figcaption>Use Conveyor is disabled; also disable Calibration Camera for this setup.</figcaption>
</figure>

<figure class="studio-figure" markdown="1">

![Main camera selected with Calibration Camera disabled](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/camera-manual-points.png)

<figcaption>Keep Calibration Camera disabled when capturing robot points manually. The encoder is still required for this conveyor method.</figcaption>
</figure>


<span class="legacy-anchor" id="2-check-the-working-height"></span>

## Check the working height

Open <span class="doc-accent">Settings → Parameters</span> and select the intended robot if more than one is configured.

With the conveyor stopped, use the Dashboard robot controls to approach the belt surface with the installed tool. Reduce the jog increment near the surface and avoid pressing the tool into the belt. Read the robot's Z coordinate at the belt surface and enter it in <span class="doc-accent">Other Parameters → Conveyor Z (mm)</span>. This is the field called Z Conveyor in the reference manual.

Set <span class="doc-accent">Travel Z (mm)</span>, called Z Move in the manual, to a height that clears the carried object, belt, fixtures, and destination throughout the transfer.

Save the settings before calibration. Automatic calibration uses Conveyor Z to calculate approach positions, so check this value for each configured robot.

<figure class="studio-figure" markdown="1">

![Other Parameters with Conveyor Z and Travel Z in robot coordinates](../../../../images/tutorials/control_guides/DeltaXStudio/pick_and_place/working-heights.png)

<figcaption>Enter the measured conveyor-surface Z and a transfer Z with adequate clearance. The pictured values illustrate one installation.</figcaption>
</figure>



<figure class="studio-figure" markdown="1">

![Dashboard robot jogging controls and Z coordinate readout](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/dashboard-z-position.png)

<figcaption>Read the current Z coordinate while positioning the installed tool.</figcaption>
</figure>

Three object heights above the belt can be used as an initial estimate for Travel Z. For example, a belt at `Z = -740 mm` and a `20 mm` object gives `-740 + 3 x 20 = -680 mm`. Verify the actual clearance and robot reach; this estimate does not account for every tool or fixture.

If a jog command is rejected, check the displayed status, homing state, and configured travel limits before continuing.

<span class="legacy-anchor" id="3-place-the-board-and-select-the-crop"></span>

## Place the board and select the crop

Stop the conveyor and place the supplied board flat under the main camera. Align it with the belt and leave enough travel for the capture sequence. Check that the whole board is visible, sharp, and well lit.

Open <span class="doc-accent">Settings → Calibration</span> and click <span class="doc-accent">Start</span>. Follow any board-orientation guidance. Select two opposite corners of the detection area in the corrected image. Cover the useful conveyor area. Exclude blank image padding. Click <span class="doc-accent">Apply</span>. The system is now ready to capture the reference points.

<figure class="studio-figure portrait" markdown="1">

![Calibration board aligned with the conveyor and X offset to its centerline](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/conveyor-board-and-x-offset.png)

<figcaption>Keep the board aligned with the belt. X Offset describes the conveyor centerline relative to the robot.</figcaption>
</figure>

<figure class="studio-figure compact" markdown="1">

![Two opposite corners selected around the camera detection area](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/select-camera-crop.png)

<figcaption>Select the useful detection area, then click Apply.</figcaption>
</figure>

Let the conveyor carry the board between points. Do not lift, slide, or rotate it relative to the belt.

<span class="legacy-anchor" id="4-capture-the-reference-points"></span>

## Capture the reference points

1. Start and stop the belt using its own controls whenever the screen requests it. Use a low speed, approximately <span class="doc-accent">20-30 mm/s</span>, for these positioning steps.
2. At <span class="doc-accent">Find Robot Point 1</span>, follow the prompt to bring the board into reach, then stop the conveyor.
3. Use the Dashboard robot controls to align the tool center directly above the board center without touching it. Wait for motion to finish and click <span class="doc-accent">Get Point</span>.
4. Move the conveyor again only when prompted. At <span class="doc-accent">Find Robot Point 2</span>, stop the belt and align the robot with the board center at its new position.
5. Capture the second point, repeat for any remaining robots, and wait for successful completion before clicking <span class="doc-accent">Done</span>.

Both belt positioning and robot-point alignment are manual in this method. Keep the board fixed relative to the belt and capture each point only after the encoder readings are stable.

<div class="studio-image-pair" markdown="1">

<figure class="studio-figure" markdown="1">

![Front view of the tool centered above the calibration board](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/align-tool-front.jpeg)

<figcaption>Align the tool center with the board center.</figcaption>
</figure>

<figure class="studio-figure" markdown="1">

![Side view of the tool above the calibration board](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/align-tool-side.jpeg)

<figcaption>Keep the tool clear of the board while aligning.</figcaption>
</figure>

</div>

<span class="legacy-anchor" id="5-confirm-calibration"></span>

## Confirm calibration

Wait for successful completion; the system validates and saves the reference points. Click <span class="doc-accent">Done</span>, then check the corrected image and crop.

<figure class="studio-figure" markdown="1">

![Calibration done confirmation and Done button](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/calibration-complete.png)

<figcaption>Wait for successful completion before clicking Done.</figcaption>
</figure>

Continue to [Vision](../vision.md) to verify detection before the first pick. During the first low-speed picking test, check several object positions and conveyor tracking. Repeat calibration after moving the camera, robot, or conveyor relative to one another.

## If this calibration cannot finish

| Symptom | What to check |
| --- | --- |
| Board not detected | Focus, lighting, board orientation, and complete board visibility. |
| Crop rejected | Select a non-empty area inside the valid corrected image. |
| Missing or reversed encoder feedback | Check the connection and counting direction. Encoder feedback is required for this method. |
| Board passes the capture area | Check available travel and camera-to-robot spacing. Reduce belt positioning speed and stop when prompted. |
| Get Point unavailable or rejected | Confirm a manual-point step is active, the robot is connected, and motion has finished with a stationary belt. |
| Browser reconnects | Wait for the current session state to reload before continuing. |

Use <span class="doc-accent">Stop</span> or <span class="doc-accent">Cancel</span> to end the workflow and wait for stopping to finish. Stop an external conveyor using its own controls. Calibration Stop waits for robot motion already in progress; use the physical emergency stop if immediate intervention is needed.
