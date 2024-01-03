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







