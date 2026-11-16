---
studio_setup_step: 2
description: Calibrate stationary objects inside camera view and robot reach.
guide_navigation:
  previous:
    title: Choose calibration method
    url: tutorials/control_guides/deltaxstudio/calibration/
  next:
    title: Continue to Vision
    url: tutorials/control_guides/deltaxstudio/vision/
---

# Calibration — Stationary objects

<div class="guide-context" markdown="1">

<span>Calibration · Stationary objects</span>

[Change method](../calibration.md)

</div>

Use this method for <span class="doc-accent">stationary objects within both the main camera view and the robot workspace</span>. The belt, if present, remains stopped.

<div class="guide-requirements" markdown="1">

Required: <span class="doc-accent">robot + main camera</span>. Keep the object and working surface stationary.

</div>

Screenshots may show an earlier interface; use the field names in the instructions.

<span class="legacy-anchor" id="1-configure-this-setup"></span>

## Configure this setup

Stop running tasks and keep Auto Start disabled. Check the robot and main camera connections.

Select <span class="doc-accent">Camera Fov in robot area</span> in Calibration Settings. Disable <span class="doc-accent">Use Conveyor</span> and <span class="doc-accent">Calibration Camera</span>.

Save, reset the system, and wait for the main camera and robot to reconnect.


<figure class="studio-figure compact" markdown="1">

![Camera Fov in robot area with Use Conveyor disabled](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/mode-static.png)

<figcaption>Static calibration: also disable Calibration Camera.</figcaption>
</figure>

<figure class="studio-figure" markdown="1">

![Main camera selected and Calibration Camera disabled for static calibration](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/camera-manual-points.png)

<figcaption>Use the main camera and keep Calibration Camera disabled for the stationary-board workflow.</figcaption>
</figure>




<span class="legacy-anchor" id="2-check-the-working-height"></span>

## Check the working height

Fit the intended tool and confirm both reference points are within robot reach. Use small jog increments near the working surface. Keep the tool above the board during point alignment; it does not need to touch it.

<figure class="studio-figure" markdown="1">

![Robot jogging controls and the current coordinate readout](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/dashboard-z-position.png)

<figcaption>Use the coordinate readout while aligning the tool. Keep the board stationary and the tool clear of its surface.</figcaption>
</figure>


The board must stay fixed throughout both point captures. Establish the later Pick Z and Place Z separately when setting up Pick & Place.

<span class="legacy-anchor" id="3-place-the-board-and-select-the-crop"></span>

## Place the board and select the crop

Place the board flat in the common camera and robot working area. Both reference points must be reachable. Check that the whole board is visible, sharp, and well lit.

Open <span class="doc-accent">Settings → Calibration</span> and click <span class="doc-accent">Start</span>. Follow any board-orientation guidance. Select two opposite corners of the detection area in the corrected image. Keep this area within robot reach. Exclude blank image padding. Click <span class="doc-accent">Apply</span>. The system is now ready to capture the reference points.

<figure class="studio-figure compact" markdown="1">

![Static calibration board inside the camera view and robot workspace](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/static-board-placement.png)

<figcaption>Place the board within camera view and robot reach. Capture the P1 and P2 markers selected in the current interface.</figcaption>
</figure>

<figure class="studio-figure compact" markdown="1">

![Two opposite corners selected around the camera detection area](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/select-camera-crop.png)

<figcaption>Select the useful detection area, then click Apply.</figcaption>
</figure>

Keep the board completely stationary.

<span class="legacy-anchor" id="4-capture-the-reference-points"></span>

## Capture the reference points

1. When marker selection appears, select <span class="doc-accent">P1</span> using the displayed board image. The interface calculates the paired <span class="doc-accent">P2</span>. Check the two marker locations and click <span class="doc-accent">Submit</span>.
2. At <span class="doc-accent">Find Robot Point 1</span>, jog the tool center above the highlighted P1 marker. Use small increments for final alignment and keep the tool clear of the board. Wait for robot motion to finish, then click <span class="doc-accent">Get Point</span>.
3. At <span class="doc-accent">Find Robot Point 2</span>, move the tool to the highlighted P2 marker on the same stationary board and capture the second point.
4. Repeat for additional robots if prompted. Wait for completion and click <span class="doc-accent">Done</span>.

P1 and P2 are two different markers on a stationary board. Do not move the board or conveyor between captures. If P2 is rejected, check that the tool is aligned with the selected marker and retry. Restart calibration if the board moved or P1 was captured incorrectly.

<span class="legacy-anchor" id="5-confirm-calibration"></span>

## Confirm calibration

Wait for successful completion; the system validates and saves the reference points. Click <span class="doc-accent">Done</span>, then check the corrected image and crop.

<figure class="studio-figure" markdown="1">

![Calibration done confirmation and Done button](../../../../images/tutorials/control_guides/DeltaXStudio/calibration/calibration-complete.png)

<figcaption>Wait for successful completion before clicking Done.</figcaption>
</figure>

Continue to [Vision](../vision.md) to verify detection before the first pick. During the first low-speed picking test, check several object positions. Repeat calibration after moving the camera, robot, or conveyor relative to one another.

## If this calibration cannot finish

| Symptom | What to check |
| --- | --- |
| Board not detected | Focus, lighting, board orientation, and complete board visibility. |
| Crop rejected | Select a non-empty area inside the valid corrected image. |
| Get Point unavailable or rejected | Confirm a manual-point step is active, the robot is connected, and motion has finished. |
| P2 rejected | Check marker selection and alignment. Restart if P1 was incorrect or the board moved. |
| Browser reconnects | Wait for the current session state to reload before continuing. |

Use <span class="doc-accent">Stop</span> or <span class="doc-accent">Cancel</span> to end the workflow and wait for stopping to finish. Calibration Stop waits for robot motion already in progress; use the physical emergency stop if immediate intervention is needed.
