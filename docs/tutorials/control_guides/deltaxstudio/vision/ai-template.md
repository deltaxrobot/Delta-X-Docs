---
studio_setup_step: 3
description: Add reference templates to a working DeltaXStudio AI detector, configure refinement, and verify the combined result.
guide_navigation:
  previous:
    title: AI setup
    url: tutorials/control_guides/deltaxstudio/vision/ai/
  next:
    title: Continue to Pick & Place
    url: tutorials/control_guides/deltaxstudio/pick_and_place/
---

# Vision — AI + Template Matching

<div class="guide-context" markdown="1">

<span>Vision · AI + Template Matching</span>

[Change method](../vision.md)

</div>

Use AI to find candidate objects, then compare them with reference templates to refine detections and reject unwanted shapes.

<!-- Keep links to the former shared AI sections reachable at the AI prerequisite below. -->
<span class="legacy-anchor" id="1-capture-and-download-images-in-deltaxstudio"></span>
<span class="legacy-anchor" id="2-create-a-server-project-in-deltaxhub"></span>
<span class="legacy-anchor" id="3-upload-images-and-create-classes"></span>
<span class="legacy-anchor" id="4-label-and-review-every-image"></span>
<span class="legacy-anchor" id="5-configure-and-start-training"></span>
<span class="legacy-anchor" id="6-review-results-and-download-rknn"></span>
<span class="legacy-anchor" id="7-upload-and-enable-the-model-in-deltaxstudio"></span>
<span class="legacy-anchor" id="from-camera-images-to-a-working-model"></span>
<span class="legacy-anchor" id="capture-and-download-images-in-deltaxstudio"></span>
<span class="legacy-anchor" id="create-an-image-project"></span>
<span class="legacy-anchor" id="capture-representative-images"></span>
<span class="legacy-anchor" id="download-and-extract-the-images"></span>
<span class="legacy-anchor" id="create-a-server-project-in-deltaxhub"></span>
<span class="legacy-anchor" id="upload-images-and-create-classes"></span>
<span class="legacy-anchor" id="label-and-review-every-image"></span>
<span class="legacy-anchor" id="configure-and-start-training"></span>
<span class="legacy-anchor" id="review-results-and-download-rknn"></span>
<span class="legacy-anchor" id="upload-and-enable-the-model-in-deltaxstudio"></span>

<div class="guide-requirements" markdown="1">

<span class="doc-accent">Start with a working AI detector.</span> Image capture, labeling, training, model upload, and activation use the shared [AI guide](ai.md).

- Need a model? Follow [Capture, label, and train](ai.md#capture-and-download-images-in-deltaxstudio).
- Already have an RKNN file? [Upload and enable it](ai.md#upload-and-enable-the-model-in-deltaxstudio), then [verify AI detection](ai.md#verify-detection-before-picking).
- AI detection already works? Continue with the template steps below. Keep movement tasks stopped while configuring and checking detection.

</div>

<span class="legacy-anchor" id="8-prepare-the-reference-templates"></span>

## Prepare the reference templates

Capture templates with the same camera, detection crop, lighting, and object height used during operation.

In DeltaXStudio, open <span class="doc-accent">Vision</span> and select <span class="doc-accent">Template Matching</span> mode. Create or select a template folder. In <span class="doc-accent">Images</span>, select <span class="doc-accent">Cropped</span>, open the live camera, place a representative object, and click <span class="doc-accent">Save Current Image</span>.

<figure class="studio-figure" style="max-width:500px" markdown="1">

![Template folder selector with an example guide-reference-parts folder and + New](../../../../images/tutorials/control_guides/DeltaXStudio/vision/template-toolbar.png)

<figcaption>Choose or create a reference-image folder in Template Matching mode. The pictured folder name is an example.</figcaption>
</figure>


Open <span class="doc-accent">Crop</span> and select the saved image. Draw a tight rectangle containing the complete object, with minimal surrounding background. Click <span class="doc-accent">Crop & Save</span>. This replaces that saved image with the cropped template; keep training images in their separate AI project.

<!-- Add the user-provided Crop selection screenshot here: images/tutorials/control_guides/DeltaXStudio/vision/template-crop.png. -->


Repeat for the required reference objects. Inspect the folder contents and remove unsuitable captures before using it. Save/apply the configuration and restart the relevant vision task after changing templates. Reset the system if it is still using a previously loaded template set.

Check the resulting object index whenever templates supply the type. Template indices follow the loaded filename order, starting at `0`; they are not automatically matched to AI class names. Keep a clear mapping from each index to its pick filter and place destination, and recheck it after adding or renaming templates.

An empty template folder cannot validate candidates. Confirm the saved cropped images are present before testing this workflow.

<figure class="studio-figure" style="max-width:240px" markdown="1">

![The resulting cropped reference image with a small margin around the object](../../../../images/tutorials/control_guides/DeltaXStudio/vision/template-reference-result.png)

<figcaption>Example cropped template: keep the full outline and minimize surrounding background.</figcaption>
</figure>


<span class="legacy-anchor" id="9-enable-template-refinement"></span>

## Enable template refinement

Use AI to find candidate objects, then match reference images around those candidates. Template Matching can update the center, size, angle, or type and reject candidates without an acceptable match.

Open <span class="doc-accent">Settings → System → Vision AI Settings</span>. Keep Vision AI enabled, then enable <span class="doc-accent">Template Matching</span>. Select the folder under <span class="doc-accent">Templates</span>. Click <span class="doc-accent">Open</span> to check its images.

Adjust <span class="doc-accent">Threshold</span>, <span class="doc-accent">Scale</span>, and <span class="doc-accent">Find options</span> for the result you need.

Save and apply the settings, then inspect the final detections in Dashboard. Compare object center, angle, and class with AI-only results.

<figure class="studio-figure" markdown="1">

![Vision AI and Template Matching both enabled, with template folder, threshold, scale and refinement options](../../../../images/tutorials/control_guides/DeltaXStudio/vision/vision-ai-template-enabled.png)

<figcaption>For AI + Template Matching, enable both switches. Select your reference-template folder and refinement options, then click Save System. The values shown are examples.</figcaption>
</figure>

| Setting | Effect |
| --- | --- |
| Threshold | Minimum accepted template-match score. A stricter value can reject incorrect matches but can also remove valid candidates. |
| Scale | Image reduction used during matching. For example, `0.25` means matching at one-quarter image dimensions. It does not mean the physical object is one-quarter size. |
| Type | Replace the AI class with the matched template index. Leave this off when you want to preserve AI classes. |
| Center | Use the matched template center as the object position. |
| Size | Use the matched template dimensions. |
| Angle | Use the matched template direction. |

For rotating parts, use an AI label type that provides a useful candidate orientation, such as ORI. The current refinement checks the candidate direction and its opposite; verify the expected angle range instead of assuming an unoriented AI box can provide every rotation.

If enabling Template Matching makes valid detections disappear, check the selected folder, crop, object scale, and threshold. Verify that the final object indices still correspond to the intended destinations, especially with Type enabled.

<span class="legacy-anchor" id="10-verify-detection-before-picking"></span>

## Verify detection before picking

Keep movement tasks stopped and compare the combined result with the AI-only preview:

- Intended objects remain detected, while unwanted shapes fail the template check.
- Each accepted object has one stable detection with the expected center and orientation.
- Final object indices match the pick filters and destinations, especially when <span class="doc-accent">Type</span> refinement is enabled.

Test the positions and rotations expected during operation. Once the refined detections are reliable, continue to [Pick & Place](../pick_and_place.md#4-choose-how-to-run-the-system) and test one object at low speed.

## If detection does not work

| Problem | What to check |
| --- | --- |
| All candidates disappear after matching | Selected template folder, saved images, object scale, candidate direction, and threshold. |
| Good objects are rejected | Template crop and lighting; reduce the threshold gradually while checking unwanted matches. |
| Incorrect center or angle | Template alignment, AI candidate orientation, and the enabled Center/Angle options. |
| Unexpected final type | Type refinement and template filename order; recheck the destination mapping. |

For missing or incorrect AI detections before template refinement, use [AI troubleshooting](ai.md#if-detection-does-not-work).
