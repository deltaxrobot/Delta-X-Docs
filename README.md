## Xem giao diện trên máy local

Chạy `./preview.ps1` trong PowerShell, rồi mở http://127.0.0.1:8000.
Script tạo môi trường `.venv` và cài MkDocs nếu chưa có. Có thể đổi cổng bằng `./preview.ps1 -Port 8001`.

Mặc định script mở cả truy cập LAN và in địa chỉ `LAN preview` để mở từ điện thoại hoặc máy khác cùng mạng. Khi cần tạo rule Windows Firewall, chấp nhận yêu cầu quyền quản trị; rule chỉ cho phép Python của dự án nhận kết nối TCP trên cổng preview từ mạng nội bộ. Giữ cửa sổ PowerShell mở trong khi xem. Nếu chỉ muốn truy cập trên máy này, chạy `./preview.ps1 -BindAddress 127.0.0.1`.

Build kiểm tra: `./.venv/Scripts/python.exe -m mkdocs build --strict`.

Giao diện nằm trong `theme/`; nội dung vẫn ở `docs/`. `hooks/docs.py` tạo chỉ mục tìm kiếm theo model/lệnh và chuyển ảnh cùng repository sang đường dẫn local khi build. Không sửa trực tiếp thư mục `site/` vì đây là kết quả build.

Sau khi sửa `hooks/docs.py`, dừng preview bằng `Ctrl+C` rồi chạy lại `./preview.ps1` để nạp mã Python mới. Thay đổi nội dung và giao diện được tự động tải lại.

Giữ nguyên đường dẫn file trong `docs/` và `use_directory_urls: true` để bảo toàn URL đã chia sẻ. Đổi tên hiển thị trong menu hoặc tiêu đề không cần đổi đường dẫn. Trang tạm ẩn như Macro Programming vẫn được build ở URL cũ, nhưng không hiện trong menu/tìm kiếm. Các anchor cũ của hai trang Conveyor được lưu trong `hooks/legacy_anchors.json`; không xóa khi cập nhật nội dung.

X Encoder đã gộp vào X Conveyor. `gc_encoder.md` chỉ giữ trang chuyển tiếp; `redirect_fragments` chuyển từng anchor cũ sang đúng mục của `gc_industrial_conveyor.md`. Giữ trang này trong bản build để các link đã chia sẻ tiếp tục hoạt động. Tìm kiếm bằng tên X Encoder cũng dẫn tới tài liệu X Conveyor.

G-code X3 có dropdown firmware: `docs/reference/gcodes/gc_x3.md` giữ tài liệu cho firmware < 2.0.0 tại URL cũ; `docs/reference/gcodes/gc_x3_v2.md` dành cho firmware > 2.0.0. Khi có nội dung firmware mới, thay mục “Coming soon” bằng các mục lệnh G-code trong file mới; command index và tìm kiếm được tạo tự động. Nhãn phiên bản nằm trong `X3_FIRMWARE_VERSIONS` ở `hooks/docs.py` và menu trong `mkdocs.yml`.

## Hướng dẫn Termite

Nội dung nằm trong `docs/tutorials/control_guides/termite.md`, dùng chung cho X3 và XS. Ảnh nằm trong `docs/images/tutorials/control_guides/Termite/` theo thư mục đã tạo.

Các ảnh đã dùng là `TermiteSoftware.png`, `TermiteSettings.png`, `DeviceManager.png`, `RobotUSB.jpg`, `PCUSB.jpg`, `DetectDelta.png` và `TestMovement.png`.

- `DetectDelta.png`: Termite gửi `IsDelta` và nhận `YesDelta`.
- `TestMovement.png`: homing, kiểm tra vị trí và thử chuyển động với `Z-650`, `X10`, `X0`. Ảnh không hiển thị `G90`; bài hướng dẫn vẫn yêu cầu gửi lệnh này trước chuyển động tuyệt đối.

Hướng dẫn Termite hiện không còn ảnh chờ bổ sung. Các liên kết ảnh được kiểm tra khi build.

## Hướng dẫn DeltaXStudio

DeltaXStudio có trang **Overview** (`docs/tutorials/control_guides/deltaxstudio/overview.md`) để chọn luồng thiết lập lần đầu, lập trình riêng hoặc vận hành hằng ngày. Nhóm **Pick & Place Setup** chứa bốn giai đoạn cho ứng dụng gắp theo camera:

1. **System Setup**: `docs/tutorials/control_guides/deltaxstudio.md` — giữ URL cũ và hướng dẫn Wi-Fi đã có.
2. **Calibration**: `docs/tutorials/control_guides/deltaxstudio/calibration.md` là trang chọn; năm quy trình riêng nằm trong `deltaxstudio/calibration/`.
3. **Vision**: `docs/tutorials/control_guides/deltaxstudio/vision.md` là trang chọn; bốn quy trình riêng nằm trong `deltaxstudio/vision/`.
4. **Pick & Place**: `docs/tutorials/control_guides/deltaxstudio/pick_and_place.md`.

**Blockly**: `docs/tutorials/control_guides/deltaxstudio/blockly.md` — nhập môn theo thứ tự tạo chương trình → ghép khối/nhập giá trị → kiểm tra/lưu → chạy/dừng → chọn ví dụ. Sau đó mới đến AI, tracking và kết hợp Vision. Đây là mục lập trình riêng, không phải bước bắt buộc sau Pick & Place. Hướng dẫn bật AI đầy đủ cùng ảnh nằm trong các ví dụ cần AI; vị trí công tắc dùng chung nằm trong khung mở rộng ở trang nhập môn.

Nhóm **Blockly Programming → Movement examples** chứa gắp cố định, gắp conveyor bằng AI, lọc màu + vòng lặp gắp thả và phân loại hai loại vật bằng AI; gắp cố định đứng đầu để người mới bắt đầu. **Vision-only examples** chứa lọc màu và lọc màu + Template Matching. Sáu trang vẫn nằm trong `docs/tutorials/control_guides/deltaxstudio/blockly/` với URL cũ. Cả sáu dùng ảnh chụp lại ngày 2026-11-14 từ các task `Docs_..._Draft` sau khi người dùng chỉnh sửa, bằng Chrome headless riêng. Ảnh nằm trong `docs/images/tutorials/control_guides/DeltaXStudio/Blockly/`; xem `IMAGE_INDEX.md` để tra nguồn ảnh. Các ví dụ chuyển động đã có vị trí, độ cao và lựa chọn EE/Tracker; hướng dẫn mô tả đúng các giá trị trong ảnh và cách thay theo máy. Conveyor pick & place dùng `Docs_ConveyorPickPlace_Draft`, nhận đối tượng từ Vision AI chạy trước. Trang `ai-pick-and-place-x3.md` và đường dẫn ảnh `PickPlaceByAIX3.png` vẫn được giữ để tương thích liên kết cũ. Không chạy task hoặc lưu thay đổi trên robot trong lần chụp này.

Hướng dẫn Blockly có bảng phân biệt trạng thái Vision AI: bật trước cho Conveyor và ví dụ phân loại bằng AI; tắt khi chạy các pipeline lọc màu, kể cả lọc màu + vòng lặp gắp thả; gắp cố định không cần AI. Hai ví dụ dùng AI có ảnh cài đặt và trình tự chọn model/lớp → bật AI → Save System → kiểm tra phát hiện → chạy task. Hướng dẫn chung có ảnh menu template, nút play và hộp chọn robot, cùng cách điền số, Obj Pos, EE và Tracker cho người mới. Ảnh dùng chung nằm trong cùng thư mục Blockly và được liệt kê trong `IMAGE_INDEX.md`.

Pick & Place bắt đầu bằng chọn Main Task hoặc chương trình Blockly. Hai thẻ lựa chọn dẫn tới cấu hình Main Task hoặc ví dụ chuyển động; phần tham số và chạy Main Task được ghi rõ phạm vi. Các trang ví dụ có thanh ngữ cảnh: ví dụ chỉ xử lý ảnh dẫn tiếp về chọn task Pick & Place, ví dụ chuyển động dẫn tới Daily Operation sau khi thử thành công. Trang AI có lối tắt cho model RKNN sẵn có. AI + Template Matching dùng chung phần chuẩn bị AI qua liên kết tới bài AI, rồi chỉ hướng dẫn bổ sung template, bật refinement và kiểm tra kết quả. Các chế độ Calibration và hai quy trình lọc màu giữ hướng dẫn riêng.

Conveyor, Sort và Color + Pick & Place có thêm ảnh chi tiết phần cấu hình và vòng lặp đặt cạnh phần giải thích; Color + Pick & Place có thêm ảnh pipeline ảnh. Lớp `studio-figure block-detail` dùng hết chiều rộng cột nội dung. Các ảnh tổng thể và anchor cũ vẫn giữ nguyên; chỉ các mục chi tiết của Color + Pick & Place được nâng thành H2 để xuất hiện trong mục lục.

Ví dụ `color-pick-and-place.md` dùng ảnh `ColorPickPlace.png` từ task `Docs_ColorPickPlace_Draft`. Task ghép pipeline HSV → tracking với cấu hình EE/tracker và vòng lặp pick/place, để AI và System Template Matching tắt. Ảnh hiện tại dùng PlacePosition `[100,100,0]`, Z Move `-650`, Z Pick `-700`, Z Place `-690`, EE `0`, pickup tracker `0` và placement tracker `None`. Hướng dẫn yêu cầu home và thiết lập thông số chuyển động trước khi thử, không mô tả các block home hoặc Sleep như thể đã có trong ảnh. Chưa kiểm thử chuyển động trên máy.

**Daily Operation**: `docs/tutorials/control_guides/deltaxstudio/daily_operation.md` — mở hệ thống đã cấu hình, kiểm tra trước khi chạy, chọn cách khởi chạy, dừng và tìm hướng dẫn xử lý lỗi. Trang này dành cho ứng dụng đã vượt qua kiểm tra thiết lập, không yêu cầu calib hoặc training lại mỗi ngày.

`studio_setup_step: 1..4` hiển thị thanh giai đoạn trên các trang setup và các nhánh Calibration/Vision. Blockly và Daily Operation không thuộc bốn bước này. URL cũ của System Setup vẫn giữ nguyên; Overview dùng URL mới. Nút cuối Pick & Place dẫn tới Daily Operation với nhãn `AFTER SETUP`; Blockly là liên kết tùy chọn trong nội dung. Trường `guide_navigation.next.label` tùy chỉnh nhãn nút, mặc định vẫn là `NEXT STEP`.

Bốn mục đã có hướng dẫn: kết nối và kiểm tra phần cứng, hiệu chỉnh, Vision, cấu hình và chạy Pick & Place. Vision gồm AI, lọc màu, AI + Template Matching và lọc màu + Template Matching. Luồng AI chụp và tải ảnh bằng DeltaXStudio, đánh nhãn/huấn luyện tại [DeltaXHub](https://deltaxhub.com), sau đó tải RKNN về và upload lên robot. Phần này tham khảo `AIHuB.docx`, `AI_HuB.pdf` và ảnh `AIhub_en`, lưu 10 ảnh minh họa trong `docs/images/tutorials/control_guides/DeltaXStudio/vision/`. Bài AI giữ luồng đầy đủ: + New → chụp thủ công hoặc Auto Save → Download project → giải nén images → upload AI Hub → đánh nhãn → train → tải RKNN → chọn model/type/classes → Save System. AI + Template Matching dẫn tới bài AI cho phần dùng chung; nội dung và ảnh của quy trình AI không lặp lại trong bài kết hợp. Thao tác thu/tải ảnh và ánh xạ RECT → DET được đối chiếu với source DeltaXStudio; SAM vẫn hỗ trợ cả RECT, ORI và SEG. System Setup bắt đầu bằng kết nối AP của robot và mở `http://deltax.com`; sau khi robot kết nối Wi-Fi của người dùng, truy cập bằng Local IP và cổng web (mặc định 3000).

Mỗi chế độ Calibration và lọc màu giữ yêu cầu, cấu hình và kiểm tra riêng. AI + Template Matching là phần bổ sung cho bài AI: chỉ cập nhật nội dung thu ảnh/huấn luyện/upload tại `vision/ai.md`; giữ các liên kết từ bài kết hợp tới đúng mục. Khi sửa chuẩn bị template hoặc độ cao conveyor, cập nhật các hướng dẫn đang dùng nội dung đó. Các anchor cũ của phần AI đã rút gọn trong `ai-template.md` vẫn dẫn về khung điều kiện AI ở đầu bài. `guide_navigation` xác định nút cuối trang: quay lại trang chọn và đi tiếp Vision/Pick & Place, không đi tuần tự qua các chế độ trong sidebar. URL Calibration/Vision ban đầu và các anchor chọn chế độ vẫn được giữ.

Nội dung tham khảo `DeltaXStudio User Manual.docx` và `Calibration Guide.docx`, đối chiếu giao diện `DeltaXSmartStudio/src/`, quy trình `docs/calibration-runtime.md` và bộ điều khiển `deltax_smart_script/` của dự án DeltaXStudio. Trang Calibration có bảng chọn và quy trình riêng cho năm trường hợp: tự động hoàn toàn, conveyor điều khiển bởi phần mềm với điểm robot thủ công, conveyor điều khiển ngoài có/không có camera hiệu chỉnh, và static calibration. Tên nút và các thao tác chọn điểm đặt, tải model, chạy chương trình dùng theo mã nguồn hiện tại. Những từ cần nhấn dùng `<span class="doc-accent">...</span>` để đổi màu, không in đậm. Trang Calibration đã dùng 13 ảnh gốc trích từ `Calibration Guide.docx`, lưu trong `docs/images/tutorials/control_guides/DeltaXStudio/calibration/`; các ảnh giao diện cũ có chú thích phù hợp. Xem `IMAGE_INDEX.md` để tra tên ảnh.

Hai ảnh Wi-Fi `Overview.png` và `IPAddress.png` vẫn nằm trong `docs/images/tutorials/control_guides/DeltaXStudio/`. Đợt bổ sung ngày 2026-11-16 có 26 ảnh thao tác trong `system_setup/`, `calibration/`, `vision/`, `pick_and_place/`, `Blockly/` và `daily_operation/`. Các ảnh hướng dẫn chọn đúng mode/công tắc, thu và tải ảnh, chuẩn bị template, thiết lập độ cao/destination/class, Check program/Update và vận hành. Ảnh board, crop hiệu chỉnh và căn tool từ tài liệu gốc vẫn được giữ. Các ảnh Blockly và hộp chọn robot được dùng lại trong từng quy trình để người mới không phải đổi trang chỉ để tìm nút. Giữ đúng chữ hoa/thường của đường dẫn khi thêm ảnh. Xem [IMAGE_INDEX.md](IMAGE_INDEX.md) để tra nguồn và trạng thái chụp.

## Sắp xếp ảnh

- Ảnh riêng của một trang đặt trong `docs/images/<đường dẫn trang bỏ đuôi .md>/`. Ví dụ, ảnh của `docs/tutorials/assembly_guides/xs_assembly_guide.md` nằm trong `docs/images/tutorials/assembly_guides/xs_assembly_guide/`.
- Ảnh dùng chung cho nhiều trang nằm trong `docs/images/shared/`, chia theo dòng robot hoặc phụ kiện. Chỉ sửa một file ảnh để cập nhật tất cả trang sử dụng nó.
- Ảnh chưa được tham chiếu được giữ trong `docs/images/_unused/` để dùng sau.
- Xem [IMAGE_INDEX.md](IMAGE_INDEX.md) để tìm ảnh của từng trang, kể cả ảnh dùng chung.

Trong Markdown, dùng đường dẫn tương đối tới ảnh, ví dụ `../../images/tutorials/assembly_guides/xs_assembly_guide/part_list.png` trong file `docs/tutorials/assembly_guides/xs_assembly_guide.md`. Tính đường dẫn từ thư mục chứa file Markdown.

`hooks/legacy_images.json` ánh xạ đường dẫn ảnh cũ sang vị trí mới. Khi build, hook tạo bản ảnh tại URL cũ trên website để giữ các liên kết đã chia sẻ; không cần giữ file trùng trong `docs/images/`. Cơ chế này áp dụng cho website docs, không chuyển hướng URL `raw.githubusercontent.com` bên ngoài. Khi đổi vị trí ảnh lần nữa, cập nhật giá trị đích trong bảng ánh xạ.

## Quy trình xuất bản hiện có

### B1: Log in tài khoản github deltaxrobot

### B2: Mở codespaces (nhấn vào avatar → Your codespaces → Delta-X-Docs)

### B3: Thêm, chỉnh sửa nội dung (nếu có ảnh thì thêm vào trước đường link ảnh https://raw.githubusercontent.com/deltaxrobot/Delta-X-Docs/master/)

### B4: Commit All (Menu → View → Command Palette → Nhập từ khóa Commit All → chọn Git: Commit All → Nhập nội dung commit (thêm file nào, sửa file nào) → tick → sync.

### B5: cài đặt mkdocs framework (nếu chưa cài): Menu → Terminal → New Terminal → pip install mkdocs

### B6: build docs bằng command: mkdocs build

### B7: deploy sang website bằng command: mkdocs gh-deploy

### B8: Truy cập link: https://github.com/deltaxrobot/Delta-X-Docs/settings/pages → Nhập lại Custom domain là [docs.deltaxrobot.com](http://docs.deltaxrobot.com) → Save → đợi DNS check xong → Done.


---

# Markdown Language Instructions

# Header 1 `# Header 1`

## Header 2 `## Header 2`

### Header 3 `### Header 3`

#### Header 4 `#### Header 4`

##### Headder 5 `##### Header 5`

###### Header 6 `###### Header 6`

This is a paragraph.  
Don't add tabs or spaces in front of paragraphs.  
Keep lines left-aligned like this.  
Break lines with 2 spaces and a enter `  \n`.

**This is bold text** `**bold text**`.  
*This is italic text* `*italic text*`.  
***Bold and Italic*** `***Bold and Italic***`

Create some quote with:
> Parent quote: 
>> Sub quote here

Create an unordered list: 

- Item 1
- Item 2:
    - Sub Item 1
    - Sub Item 2

Create ordered list:

1. Item 1
2. Item 2
5. Item 3
8. Item 4
    1. Sub item 1
    1. Sub item 2

Write code in markdown: `G01 X0 Y0`  
``Use `code` in your Markdown file.``

Links:
[Duck Duck Go](https://duckduckgo.com).

Image:
![Imag](link_to_image.png)

URLs and Email Addresses:  
To quickly turn a URL or email address into a link, enclose it in angle brackets.

<https://www.markdownguide.org>  
<fake@example.com>







