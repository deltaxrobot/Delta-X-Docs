---
studio_setup_step: 3
description: Capture and download images in DeltaXStudio, label and train in DeltaXHub AI Hub, then upload and test the RKNN model.
guide_navigation:
  previous:
    title: Choose vision method
    url: tutorials/control_guides/deltaxstudio/vision/
  next:
    title: Continue to Pick & Place
    url: tutorials/control_guides/deltaxstudio/pick_and_place/
---

# Vision — AI

<div class="guide-context" markdown="1">

<span>Vision · AI</span>

[Change method](../vision.md)

</div>

Capture images in DeltaXStudio → label and train in [DeltaXHub](https://deltaxhub.com) → upload RKNN → verify detection.

<div class="guide-requirements" markdown="1">

Before starting: complete [Calibration](../calibration.md), check the live camera and lighting, and keep robot movement stopped.

- <span class="doc-accent">Already have an RKNN model?</span> Go to [Upload and enable the model](#upload-and-enable-the-model-in-deltaxstudio), then verify detection.
- <span class="doc-accent">Need to train a model?</span> Start with [Capture and download images](#capture-and-download-images-in-deltaxstudio) below. Labeling and training require a DeltaXHub account and Internet access.

</div>

## From camera images to a working model

Use <span class="doc-accent">DeltaXStudio</span> for image capture and robot-side detection. Use <span class="doc-accent">AI Hub</span> on [deltaxhub.com](https://deltaxhub.com) for labeling and training.

| Stage | What you should have before continuing |
| --- | --- |
| [Capture and download](#capture-and-download-images-in-deltaxstudio)<br>DeltaXStudio | A downloaded project ZIP, extracted to an `images` folder on your computer. |
| [Upload and label](#upload-images-and-create-classes)<br>AI Hub | Images uploaded, classes defined, and every target object labeled and reviewed. |
| [Train](#configure-and-start-training)<br>AI Hub | A completed training run for that server project. |
| [Download the model](#review-results-and-download-rknn)<br>AI Hub | The trained `.rknn` file and its class names in model order. |
| [Upload and activate](#upload-and-enable-the-model-in-deltaxstudio)<br>DeltaXStudio | The uploaded model selected, matching model type and classes entered, and settings saved. |

Keep the robot's DeltaXStudio address available. Your computer needs Internet access for DeltaXHub and a connection to the robot's network when you return to upload the model. See [System Setup](../../deltaxstudio.md) if the robot is still only accessible through its hotspot.

<span class="legacy-anchor" id="1-capture-and-download-images-in-deltaxstudio"></span>

## Capture and download images in DeltaXStudio

### Create an image project

Open the robot's DeltaXStudio interface and select <span class="doc-accent">Vision</span> in the sidebar. Set <span class="doc-accent">Mode</span> to <span class="doc-accent">Vision AI</span>.

Beside the <span class="doc-accent">Project</span> selector, click <span class="doc-accent">+ New</span>. Enter a descriptive name, such as `sorting-parts`, then click the check mark or press Enter. Confirm that the new name is selected. To add images to an existing collection, select that project instead.

Open the <span class="doc-accent">Images</span> tab. These images are stored on the robot controller; download them to your computer before uploading them to AI Hub.

<figure class="studio-figure" style="max-width:420px" markdown="1">

![New image-project name field with check-mark and cancel buttons](../../../../images/tutorials/control_guides/DeltaXStudio/vision/create-image-project.png)

<figcaption>Click + New, enter a project name, and confirm with the check mark. This example enters sorting-parts.</figcaption>
</figure>


### Capture representative images

In the right-hand <span class="doc-accent">Camera Controls</span> panel, check that the camera is connected. Set <span class="doc-accent">Image Type</span> to <span class="doc-accent">Cropped</span>, then click <span class="doc-accent">Open Live Camera</span>. Check that the preview shows the calibrated detection area used during operation.

Place objects in the detection area and click <span class="doc-accent">Save Current Image</span>. Confirm that a new image appears in the list. Change the objects' positions, rotations, and spacing before capturing the next frame. Include every class and the lighting, backgrounds, and object arrangements expected during operation.

<figure class="studio-figure block-detail" markdown="1">

![A real Cropped live-camera frame beside Camera Controls and Save Current Image](../../../../images/tutorials/control_guides/DeltaXStudio/vision/capture-live-camera.png)

<figcaption>Select Cropped and open the live camera, then use Save Current Image to collect each frame. The object shown is an example.</figcaption>
</figure>


Review the saved images. Remove blurred captures, accidental duplicates, and unusable frames; check that one class or one pose does not dominate the dataset. Around 100 varied images can be a starting collection, rather than a fixed requirement. Keep some fresh captures for testing the finished model.

<details class="guide-details" markdown="1">
<summary>Optional: capture a series with Auto Save</summary>

With the live camera open, set <span class="doc-accent">Max images</span> to the number of frames to collect and <span class="doc-accent">Min time (s)</span> to the interval between saves. Enable <span class="doc-accent">Enable Auto Save</span> while changing the scene between captures.

<figure class="studio-figure portrait" markdown="1">

![Camera Controls with Cropped selected, Save Current Image, Auto Save, maximum count and minimum interval](../../../../images/tutorials/control_guides/DeltaXStudio/vision/capture-controls.png)

<figcaption>Set the capture limits before enabling Auto Save. Leave automatic AIX annotation off for the first dataset.</figcaption>
</figure>


Leave <span class="doc-accent">Auto annotation with AIX</span> off when preparing the first dataset. This guide labels the images in AI Hub. Turn Auto Save off when finished and review the collection before downloading it.

</details>

### Download and extract the images

Close the live camera when capture is complete. Check the selected project, then click the download icon beside it, labeled <span class="doc-accent">Download project</span>. Save the downloaded ZIP to your computer.

<figure class="studio-figure" style="max-width:360px" markdown="1">

![Image-project selector with the download icon immediately before + New](../../../../images/tutorials/control_guides/DeltaXStudio/vision/download-image-project.png)

<figcaption>Download the selected project with the icon immediately before + New, then extract its ZIP on your computer.</figcaption>
</figure>


In Windows, right-click the ZIP and choose <span class="doc-accent">Extract All</span>. Open the extracted folder, then its <span class="doc-accent">images</span> folder, and check that your captured images are present and readable.

In the AI Hub steps below, upload the <span class="doc-accent">image files inside this folder</span>. The project ZIP may also contain a `labels` folder; the image-upload button expects the images, not the ZIP or that labels folder.

<span class="legacy-anchor" id="2-create-a-server-project-in-deltaxhub"></span>

## Create a server project in DeltaXHub

Open [deltaxhub.com](https://deltaxhub.com) and sign in. Select <span class="doc-accent">AI Hub → Projects → Create Project</span>.

Enter a descriptive project name and select <span class="doc-accent">Storage: Server</span>. Server storage is required for the training workflow below. Local storage is for labeling and exporting data to train elsewhere.

Choose the project's label type using the table below. Leave <span class="doc-accent">Public</span> off unless you intend to share the project. Click <span class="doc-accent">Create</span>, then <span class="doc-accent">Open</span> on the new project card.

This is a separate project in DeltaXHub. Using the same name as the DeltaXStudio image project makes it easier to identify, but the images are transferred by the upload below.

<figure class="studio-figure" markdown="1">

![AI Hub Projects page and Create Project button](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-projects.jpg)

<figcaption>Open AI Hub and create a project.</figcaption>
</figure>

<figure class="studio-figure portrait" markdown="1">

![Create New Project with Server storage and SEG label type](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-create-server-project.jpg)

<figcaption>Select Server storage and the label type required by your application.</figcaption>
</figure>

| DeltaXHub label type | Meaning | DeltaXStudio model type |
| --- | --- | --- |
| RECT | A rectangular bounding box for locating an object without orientation. Suitable for simple position-based picking, such as round fruit. | DET |
| ORI | An oriented bounding box for an object whose rotation matters. Label its direction consistently. | ORI |
| SEG | A polygon or mask describing the object boundary, useful when the outline is important. | SEG |

The project label type describes the annotation format. Classes describe the object categories, such as `class_A` and `class_B`; create one class for each category the robot must distinguish.

<figure class="studio-figure" markdown="1">

![New server project card with Open button](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-open-project.jpg)

<figcaption>Open the newly created project to upload images and add labels.</figcaption>
</figure>

<span class="legacy-anchor" id="3-upload-images-and-create-classes"></span>

## Upload images and create classes

In the open AI Hub project, click the plus button in the left <span class="doc-accent">Images</span> panel. Browse to the extracted <span class="doc-accent">images</span> folder, select the captured image files, then click <span class="doc-accent">Open</span>. Wait for the upload to finish and confirm the images appear in the list. Select one to check that the correct camera images were uploaded.

In the right <span class="doc-accent">Classes</span> panel, click plus to add the classes you need. Give them clear, consistent names. Check the class list and order before labeling. Keep a record of that order for the Objects setting on the robot.

<figure class="studio-figure" markdown="1">

![Project editor with Images upload button and Classes panel](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-upload-images.jpg)

<figcaption>Upload captured images on the left and define object classes on the right.</figcaption>
</figure>

<span class="legacy-anchor" id="4-label-and-review-every-image"></span>

## Label and review every image

With an image and its intended class selected, draw a rectangle, oriented box, or segmentation outline around each target object according to the project’s label type. Check the <span class="doc-accent">Objects</span> list. Correct the class of any mislabeled object and remove unwanted annotations.

<span class="doc-accent">SAM</span> can assist with every project label type: <span class="doc-accent">RECT, ORI, or SEG</span>. It starts disabled. After selecting an image, enable SAM near the top of the editor and wait for it to become ready. First use on a new computer may take longer while the required files download. SAM needs a supported, sufficiently capable GPU; if it is unavailable, continue labeling manually.

Review and correct every assisted annotation, including its box or outline, orientation where applicable, and assigned class. SAM assistance does not replace this review.

Repeat for the remaining images. Review all visible target objects, including rotated or difficult examples, before starting training. Confirm the annotations are retained when you revisit an image, then click <span class="doc-accent">Back</span> to leave the editor.

<figure class="studio-figure" markdown="1">

![Segmentation annotations for class A and class B with SAM enabled](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-annotate-classes.jpg)

<figcaption>Annotation in progress: review each outline and class, then label the remaining target objects.</figcaption>
</figure>

For ORI, keep the object's reference direction consistent across images. For SEG, follow the actual boundary instead of including large areas of background. Assisted labeling still needs review; a plausible-looking outline can belong to the wrong class or miss part of the object.

<span class="legacy-anchor" id="5-configure-and-start-training"></span>

## Configure and start training

Find your server project in AI Hub’s <span class="doc-accent">Workspace</span> tab and check its image and class counts. Click <span class="doc-accent">Train</span>, or <span class="doc-accent">Retrain</span> for a project with previous training runs.

In the training dialog, select <span class="doc-accent">AIX New</span>. Review Auto Configuration, or open <span class="doc-accent">Customize Settings</span> to adjust the parameters.

Review the displayed cost information and available credits, then click <span class="doc-accent">Start Training</span>. Wait for the queued job to run and reach <span class="doc-accent">Completed</span>. A queued job has not yet finished training.

<figure class="studio-figure" markdown="1">

![Workspace listing server projects with Train and Retrain buttons](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-workspace.jpg)

<figcaption>Start training from the project's Workspace card.</figcaption>
</figure>

<figure class="studio-figure portrait" markdown="1">

![Start Training dialog with AIX New and Auto Configuration](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-start-training.jpg)

<figcaption>Review the dataset, training configuration, and current cost information.</figcaption>
</figure>

<details class="guide-details" markdown="1">
<summary>Optional: custom training parameters</summary>

| Parameter | What it controls |
| --- | --- |
| Epochs | The maximum number of passes through the training dataset. More epochs take longer and do not automatically improve results. The supplied example uses 100. |
| Batch Size | Images processed together in each training step. Choose a value that fits the dataset and training server memory; a larger batch is not inherently more accurate. |
| Image Size | Input resolution for training. The example uses 640 px. Higher resolution can retain small details but requires more resources. |
| Learning Rate | The size of the model's update steps. Start with the offered default unless you have a reason to change it. |
| Early Stopping Patience | The number of epochs without sufficient improvement before training stops early. |

<figure class="studio-figure portrait" markdown="1">

![Custom epochs, batch size, image size, learning rate, and early stopping settings](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-training-settings.jpg)

<figcaption>Example custom settings. Training time and credit estimates depend on the selected job.</figcaption>
</figure>

</details>

Improve dataset coverage and annotation quality before simply increasing epochs or image count. Inspect performance on fresh images as well as the reported training results.

<span class="legacy-anchor" id="6-review-results-and-download-rknn"></span>

## Review results and download RKNN

Open the project's training details and select the completed run in <span class="doc-accent">Training History</span>. Inspect the training curves, class results, and confusion matrix. Check both missed objects and false detections; a high summary score alone does not verify the robot's working conditions.

Scroll to the downloads for that completed run. Click <span class="doc-accent">RKNN (best.rknn)</span> and save the `.rknn` file on your computer. Keep it with the project name, label type, class names in model order, and training run. You will need this file and class order in DeltaXStudio.

<figure class="studio-figure" markdown="1">

![Project details and completed training run in Training History](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-training-history.jpg)

<figcaption>Select a completed run to inspect its results.</figcaption>
</figure>

<figure class="studio-figure" markdown="1">

![Training curves, confusion matrix, and RKNN download button](../../../../images/tutorials/control_guides/DeltaXStudio/vision/aihub-download-rknn.jpg)

<figcaption>Download the RKNN model for upload to DeltaXStudio.</figcaption>
</figure>

The <span class="doc-accent">Model (best.pt)</span> download is a different format. For DeltaXStudio's New RKNN Model upload, use the `.rknn` file.

<span class="legacy-anchor" id="7-upload-and-enable-the-model-in-deltaxstudio"></span>

## Upload and enable the model in DeltaXStudio

Reconnect your computer to the robot's network and open DeltaXStudio at its current IP address and web port, normally `http://<robot-ip>:3000`. Keep movement tasks stopped while uploading and checking the model.

1. Open <span class="doc-accent">Settings → System → Vision AI Settings</span>. At <span class="doc-accent">New RKNN Model</span>, click <span class="doc-accent">Choose File</span>, select the downloaded `.rknn` file, and click <span class="doc-accent">Upload</span>. Wait for the upload-success message.
2. Select the uploaded model in <span class="doc-accent">Vision AI Model</span>. Select its matching type in the adjacent dropdown: <span class="doc-accent">RECT → DET</span>, <span class="doc-accent">ORI → ORI</span>, or <span class="doc-accent">SEG → SEG</span>.
3. In <span class="doc-accent">Objects</span>, enter all class names in the trained model's order, separated by commas. For example, enter `class_A,class_B` for a model whose classes are class_A at index 0 and class_B at index 1. Do not add a trailing comma.
4. Set the switch beside the <span class="doc-accent">Vision AI Settings</span> heading to <span class="doc-accent">Enabled</span>. For AI-only operation, leave <span class="doc-accent">Template Matching</span> disabled. Click <span class="doc-accent">Save System</span> at the top right and wait for confirmation. Uploading the file alone does not select or activate it.
5. Return to <span class="doc-accent">Dashboard</span>, open the camera view, and place a test object in the detection area. Check its class, center, and orientation before starting a movement task. If the new configuration has not taken effect after saving, use <span class="doc-accent">System Control → Reset</span>, wait for reconnection, and check again.

<figure class="studio-figure" markdown="1">

![Vision AI enabled with the model, class list, confidence thresholds and upload controls; Template Matching is disabled](../../../../images/tutorials/control_guides/DeltaXStudio/vision/vision-ai-enabled.png)

<figcaption>Vision AI is Enabled and Template Matching is Disabled. Select your model, type, and classes, then click Save System. The pictured model and good,bad class names are examples.</figcaption>
</figure>

Class index `0` corresponds to the first Objects entry, index `1` to the second, and so on. Keep every model class in this list even when a class should not be picked. Configure that selection under [Pick Objects Index](../pick_and_place.md#2-assign-object-types-to-place-destinations).

<span class="doc-accent">Conf</span> and <span class="doc-accent">IOU</span> use values from `0` to `1`. Start with the provided IOU default. Increasing Conf removes lower-confidence predictions, which can also remove valid objects; it does not improve the model itself. Change one setting at a time and inspect the live result.

<span class="legacy-anchor" id="8-verify-detection-before-picking"></span>

## Verify detection before picking

Keep movement tasks stopped while checking the camera preview:

- Each class is detected at the positions, rotations, spacing, and partial occlusion expected during operation.
- Each object has one stable detection with the correct center, orientation, and class index.
- The empty background produces no false detections.

Once detection is reliable, continue to [Pick & Place](../pick_and_place.md#4-choose-how-to-run-the-system) and start with one object at a low test speed.

To refine AI detections with reference images, continue with [AI + Template Matching](ai-template.md#prepare-the-reference-templates) before testing picking.

## If detection does not work

| Problem | What to check |
| --- | --- |
| Save Current Image is unavailable | Camera connection, Open Live Camera, and a live frame in the preview. |
| Captures are missing from the download | Selected DeltaXStudio project and the extracted ZIP's `images` folder. |
| Project is missing from training | Server storage, completed image uploads, and the correct project in AI Hub Workspace. |
| Wrong model file selected | Download RKNN from the completed run and upload the `.rknn` file. |
| Uploaded model is not active | Vision AI Model selection, matching type, main enable switch, and Save System confirmation. |
| No AI detections | Model upload, enabled state, model type, camera crop, and Conf threshold. |
| Swapped classes | Trained class order and the Objects list. |
| Training results look good but real objects fail | Fresh operating images, lighting, and annotation quality. |
