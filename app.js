const InputFile = document.querySelector("#UpFile"); //input
const MakeImage = document.querySelector("#Make"); //圖片log
const FileThumbnail = document.querySelector("#FileThumbnail"); //
const labelNone = document.querySelector("#label-none"); //

//預覽圖片
InputFile.addEventListener("input", (e) => {
  let InputData = e.target.files[0];
  document.querySelector("#FileThumbnail").src = URL.createObjectURL(InputData);
  labelNone.classList = "d-none";
});

//點擊圖片重新上傳圖片
FileThumbnail.addEventListener("click", (e) => {
  InputFile.click();
});

// 讀取相片參數
InputFile.addEventListener("input", (e) => {
  let ExifFile = e.target.files[0];
  const Image = document.querySelector("#FileThumbnail");
  //拿取Model參數
  const ModelTitel = document.querySelector("#Model");
  const FocalLengthText = document.querySelector("#FocalLength"); //焦段
  const ISOtext = document.querySelector("#ISO"); //ISO
  const ExposureTimeText = document.querySelector("#ExposureTime"); //快門
  const FNumberText = document.querySelector("#FNumber"); //光圈
  const time = document.querySelector("#time"); //拍攝時間
  EXIF.getData(ExifFile, function () {
    let ExifData = EXIF.getAllTags(this);
    console.log(ExifData);
    if (Object.keys(ExifData).length === 0) {
      console.log("無法讀取數據");
      ModelTitel.innerHTML = ""; //型號顯示空白
      FocalLengthText.innerHTML = ""; //交段顯示空白
      ISOtext.innerHTML = ""; //ISO顯示空白
      ExposureTimeText.innerHTML = ""; //快門顯示空白
      FNumberText.innerHTML = ""; //光圈顯示空白
      time.innerHTML = ""; //拍攝時間顯示空白

      return;
    } else {
      console.log("有數據");
      // 判斷是否能讀取到Make
      if (ExifData.Make) {
        Make = ExifData.Make.toLowerCase(); //將讀取到的廠牌換成小寫
      } else {
        console.log("讀取不到logo");
      }
      //判斷廠牌的型號給予對應的logo
      if (Make == "canon") {
        MakeImage.src = `./logo/${Make}.png`;
      } else if (Make == "sony") {
        MakeImage.src = `./logo/${Make}.png`;
      } else {
        MakeImage.src = "";
        console.log("不相同");
      }
      //拿取光圈、快門、ISO、焦段
      //型號---------------------------------------------
      let model = ExifData.Model;
      ModelTitel.innerHTML = model;
      //--------------------------------------------------

      //焦段---------------------------------------------
      let FocalLength = ExifData.FocalLength.numerator;
      if (FocalLength) FocalLengthText.innerHTML = `${FocalLength}mm`;
      //--------------------------------------------------

      //ISO-----------------------------------------------
      let ISO = ExifData.ISOSpeedRatings;
      if (ISO) ISOtext.innerHTML = `ISO ${ISO}`;
      //--------------------------------------------------

      //快門----------------------------------------------
      let ExposureTime = `${ExifData.ExposureTime.numerator}/${ExifData.ExposureTime.denominator}`; //
      if (ExposureTime) ExposureTimeText.innerHTML = ExposureTime;
      //--------------------------------------------------
      //光圈----------------------------------------------
      let FNumber = `${ExifData.FNumber}`; //光圈
      if (FNumber) FNumberText.innerHTML = `F/${FNumber}`;
      //拍攝時間-------------------------------------------
      let dateTime = ExifData.DateTimeOriginal;
      if (dateTime) time.innerHTML = dateTime;
    }
  });
});
