---
studio_setup_step: 3
description: Choose AI, color filtering, or a combined Template Matching workflow.
guide_navigation:
  previous:
    title: Calibration
    url: tutorials/control_guides/deltaxstudio/calibration/
  next:
    title: Pick & Place
    url: tutorials/control_guides/deltaxstudio/pick_and_place/
---

# DeltaXStudio — Vision

Choose one detection method below. Each guide contains the complete workflow for that choice, from image preparation to a live detection check.

<span class="legacy-anchor" id="2-prepare-the-camera"></span>

Complete [Calibration](calibration.md) first. Keep the camera position, crop, focus, and lighting consistent with operation, and leave robot movement stopped during detection tests.

<span class="legacy-anchor" id="1-choose-a-detection-method"></span>

## Choose your detection method

<div class="guide-card-grid" markdown="1">

<div class="guide-card" id="a-ai" markdown="1">

### [AI](vision/ai.md)

Recognize object categories from a trained model. Capture and download images in DeltaXStudio, upload them to DeltaXHub AI Hub for labeling and training, then download RKNN and activate it in DeltaXStudio.

<p class="guide-card-tags"><span>Model training</span><span>Object classes</span></p>

[Capture images, train, and deploy →](vision/ai.md)

</div>

<div class="guide-card" id="b-color-filtering" markdown="1">

### [Color filtering](vision/color.md)

Detect objects whose color stands out from the background. Build an HSV and contour pipeline in Blockly.

<p class="guide-card-tags"><span>No training</span><span>Blockly</span></p>

[Open guide →](vision/color.md)

</div>

<div class="guide-card" id="c-ai-template-matching" markdown="1">

### [AI + Template Matching](vision/ai-template.md)

Use the shared AI setup, then add saved reference templates to refine or filter its detections.

<p class="guide-card-tags"><span>Model training</span><span>Reference images</span></p>

[Open guide →](vision/ai-template.md)

</div>

<div class="guide-card" id="d-color-filtering-template-matching" markdown="1">

### [Color + Template Matching](vision/color-template.md)

Find objects by color, then use reference images to refine or reject candidates before tracking.

<p class="guide-card-tags"><span>No training</span><span>Blockly + reference images</span></p>

[Open guide →](vision/color-template.md)

</div>

</div>

<span class="legacy-anchor" id="prepare-template-images"></span>

Template preparation is included in both combined guides. Choose the complete workflow you intend to use.

<span class="legacy-anchor" id="verify-detection-before-picking"></span>

## After detection works

Check one detection per object, the class index, center, and orientation. Then continue to [Pick & Place](pick_and_place.md) to configure destinations and test one object.
