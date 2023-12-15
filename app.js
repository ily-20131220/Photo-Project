const InputFile = document.querySelector("#UpFile"); //input
const MakeImage = document.querySelector("#Make"); //圖片log

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

    //判斷是否能讀取到Make
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
      console.log("不相同");
    }
    //拿取Model參數
    const ModelTitel = document.querySelector("#Model");
    let model = ExifData.Model;
    ModelTitel.innerHTML = model;

    //拿取光圈、快門、ISO、焦段
    const FocalLengthText = document.querySelector("#FocalLength"); //焦段
    let FocalLength = ExifData.FocalLength.numerator; //焦段
    const ISOtext = document.querySelector("#ISO");
    let ISO = ExifData.ISOSpeedRatings; //ISO
    const ExposureTimeText = document.querySelector("#ExposureTime");
    let ExposureTime = `${ExifData.ExposureTime.numerator}/${ExifData.ExposureTime.denominator}`; //快門
    const FNumberText = document.querySelector("#FNumber");
    let FNumber = `${ExifData.FNumber}`; //光圈
    const time = document.querySelector("#time");
    let dateTime = ExifData.DateTimeOriginal;
    // console.log(FocalLength, ISO, ExposureTime, FNumber);
    // console.log(FocalLengthText, ISOtext, ExposureTimeText, FNumberText);
    if (FocalLength) FocalLengthText.innerText = `${FocalLength}mm`;
    if (ISO) ISOtext.innerText = `ISO ${ISO}`;
    if (ExposureTime) ExposureTimeText.innerText = ExposureTime;
    if (FNumber) FNumberText.innerText = `F/${FNumber}`;
    if (dateTime) time.innerText = dateTime;
  });
});
