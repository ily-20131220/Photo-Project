import {
  ModelTitel,
  FocalLengthText,
  ISOtext,
  ExposureTimeText,
  FNumberText,
  time,
  inputModel,
  InputFile,
  MakeImage,
  FileThumbnail,
  labelNone,
  inputFocalLength,
  inputISO,
  inputExposureTime,
  inputFNumber,
  inputTime,
  valueLogo,
  changeMark,
  changeLogo,
  downloadBTN,
  downloadContent,
} from "./constant.js";

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
      MakeImage.src = ""; //圖片logo不顯示
      inputModel.value = "";
      inputFocalLength.value = "";
      inputISO.value = "";
      inputExposureTime.value = "";
      inputFNumber.value = "";
      inputTime.value = "";
      valueLogo.innerHTML = "";
      return;
    } else {
      console.log("有數據");
      // 判斷是否能讀取到Make
      if (ExifData.Make) {
        let Make = ExifData.Make.toLowerCase(); //將讀取到的廠牌換成小寫
        //判斷廠牌的型號給予對應的logo
        if (Make == "canon") {
          MakeImage.src = `./logo/${Make}.png`;
          valueLogo.innerHTML = Make;
          valueLogo.value = "1";
        } else if (Make == "sony") {
          MakeImage.src = `./logo/${Make}.png`;
          valueLogo.innerHTML = Make;
          valueLogo.value = "2";
        } else if (Make == "nikon") {
          MakeImage.src = `./logo/${Make}.png`;
          valueLogo.innerHTML = Make;
          valueLogo.value = "3";
        } else if (Make == "fujifilm") {
          MakeImage.src = `./logo/${Make}.png`;
          valueLogo.innerHTML = Make;
          valueLogo.value = "4";
        } else {
          MakeImage.src = "./logo/";
          console.log("不相同");
        }
      } else {
        console.log("讀取不到logo");
      }

      //拿取光圈、快門、ISO、焦段
      //型號---------------------------------------------
      let model = ExifData.Model;
      if (model) {
        ModelTitel.innerHTML = model;
        inputModel.value = model;
      }
      //--------------------------------------------------

      //焦段---------------------------------------------
      let FocalLength = ExifData.FocalLength.numerator;
      if (FocalLength) {
        FocalLengthText.innerHTML = `${FocalLength}mm`;
        inputFocalLength.value = FocalLength;
      }
      //--------------------------------------------------

      //ISO-----------------------------------------------
      let ISO = ExifData.ISOSpeedRatings;
      if (ISO) {
        ISOtext.innerHTML = `ISO ${ISO}`;
        inputISO.value = ISO;
      }
      //--------------------------------------------------

      //快門----------------------------------------------
      let ExposureTime = `${ExifData.ExposureTime.numerator}/${ExifData.ExposureTime.denominator}`; //
      if (ExposureTime) {
        ExposureTimeText.innerHTML = ExposureTime;
        inputExposureTime.value = ExposureTime;
      }
      //--------------------------------------------------
      //光圈----------------------------------------------
      let FNumber = `${ExifData.FNumber}`; //光圈
      if (FNumber) {
        FNumberText.innerHTML = `F/${FNumber}`;
        inputFNumber.value = FNumber;
      }
      //拍攝時間-------------------------------------------
      let dateTime = ExifData.DateTimeOriginal;
      if (dateTime) {
        time.innerHTML = dateTime;
        inputTime.value = dateTime;
      }
    }
  });
});

changeMark.addEventListener("click", function () {
  console.log(changeLogo.value);
  if (changeLogo.value == 1) {
    MakeImage.src = `./logo/canon.png`;
  } else if (changeLogo.value == 2) {
    MakeImage.src = `./logo/sony.png`;
  } else if (changeLogo.value == 3) {
    MakeImage.src = `./logo/nikon.png`;
  } else if (changeLogo.value == 4) {
    MakeImage.src = `./logo/fujifilm.png`;
  } else {
    MakeImage.src = "";
  }

  ModelTitel.innerHTML = inputModel.value;
  if (inputFocalLength.value == "") {
    FocalLengthText.innerHTML = "";
  } else {
    FocalLengthText.innerHTML = `${inputFocalLength.value}mm`;
  }

  if (inputISO.value == "") {
    ISOtext.innerHTML = "";
  } else {
    ISOtext.innerHTML = `ISO ${inputISO.value}`;
  }

  if (inputExposureTime.value == "") {
    ExposureTimeText.innerHTML = "";
  } else {
    ExposureTimeText.innerHTML = `1/${inputExposureTime.value}`;
  }
  if (inputFNumber.value == "") {
    FNumberText.innerHTML = "";
  } else {
    FNumberText.innerHTML = `F/${inputFNumber.value}`;
  }
  time.innerHTML = inputTime.value;
});

const config = {
  quality: 1,
  style: { filter: "grayscale(100%)" },
};

const dataUri = await domtoimage
  .toJpeg(downloadContent, config)
  .then((dataUrl) => dataUrl);
downloadBTN.addEventListener("click", function () {
  const link = document.createElement("a");
  const filename = "Demo.png";
  link.download = filename;
  link.href = dataUri;
  link.click();
});

// downloadBTN.addEventListener("click", function () {
//   domtoimage.toJpeg(downloadContent, config).then(function (dataUrl) {
//     var link = document.createElement("a");
//     link.download = "my-image-name.jpeg";
//     link.href = dataUrl;
//     link.click();
//   });
// });
