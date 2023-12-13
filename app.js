const InputFile = document.querySelector("#UpFile");

//預覽圖片
InputFile.addEventListener("change", (e) => {
  let InputData = e.target.files[0];
  document.querySelector("#FileThumbnail").src = URL.createObjectURL(InputData);
});


// 讀取相片參數
InputFile.addEventListener("change", (e) => {
  let ExifFile = e.target.files[0];
  const Image = document.querySelector("#FileThumbnail");

  EXIF.getData(ExifFile, function () {
    let ExifData = EXIF.getAllTags(this);
    console.log(ExifData);
    FNumber = ExifData.FNumber;
    setTimeout(() => {
      let figure = document.querySelector("figure");
      let ImageWidth = Image.scrollWidth;
      let ImageHeight = Image.scrollHeight;
      console.log(Image);
      console.log("寬度", ImageWidth);
      console.log("高度", ImageHeight);
    }, 100);
  });
});
