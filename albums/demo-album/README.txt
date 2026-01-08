Demo Album - 示範相簿
=====================

此資料夾包含一個完整的相簿，所有檔案都在同一個位置。

資料夾結構：
-----------
albums/demo-album/
├── album.json          ← 相簿設定檔（必要）
├── cover.jpg           ← 封面圖（用於首頁，必要）
├── photo1.jpg          ← 照片大圖
├── photo1_thumb.jpg    ← 照片縮圖（可選）
├── photo2.jpg
├── photo2_thumb.jpg
└── ...

使用說明：
---------

1. 準備照片
   - 將您的照片複製到這個資料夾
   - 檔名可以自訂（例如：sunset.jpg, beach.jpg）

2. 編輯 album.json
   - 修改 title：相簿名稱
   - 修改 photos 陣列：
     * id：照片識別碼
     * src：照片檔名（例如："photo1.jpg"）
     * thumb：縮圖檔名（可選，例如："photo1_thumb.jpg"）
     * caption：照片說明文字（可選）

3. JSON 範例
   {
     "title": "我的相簿名稱",
     "photos": [
       {
         "id": "001",
         "src": "sunset.jpg",
         "thumb": "sunset_thumb.jpg",
         "caption": "美麗的日落"
       },
       {
         "id": "002",
         "src": "beach.jpg",
         "caption": "沙灘美景"
       }
     ]
   }

建議尺寸：
---------
- 封面圖：400×300（或 4:3 比例）
- 大圖：1920×1080 或更高解析度
- 縮圖：300×200（用於縮圖列，可選）

注意事項：
---------
- 所有路徑都是相對於此資料夾
- 如果不提供 thumb，系統會自動使用 src 圖片
- 支援格式：.jpg, .jpeg, .png, .webp
- 建議壓縮照片以加快載入速度
