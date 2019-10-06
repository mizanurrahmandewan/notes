function dropDown(id, clases, fas, rotate, reset) {
  const x = document.querySelector(clases);
  const y = document.querySelector(fas);
  const z = document.querySelector(id);

  if (x.style.animation === "") {
    y.style.animation = `${rotate} .3s ease-in-out`;
    y.style.animationFillMode = "forwards";
    z.style.animation = "firstOpen .3s ease-in-out";
    z.style.animationFillMode = "forwards";
    x.style.animation = "moveDown .3s ease-in-out";
    x.style.animationFillMode = "forwards";
  } else if (x.style.animation != "") {
    z.style.animation = "fastClose .3s ease-in-out";
    y.style.animation = `${reset} .3s ease-in-out`;
    x.style.animation = "moveUp .3s ease-in-out";
    setTimeout(function() {
      x.style.animation = "";
    }, 500);
  }
}

document.addEventListener("click", e => {
  for (let i = 0; i < myArray.length; i++) {
    if (e.target.closest("#name" + i)) {
      dropDown("#name" + i, ".id" + i, "#fas" + i, "Rotate" + i, "Reset" + i);
    }
  }
});

(async function gapis() {
  const spreadsheetsId = `1tL7FWqrT3tNCtgeta1Me3iu4RqqJcL7OyA7ZvlFEDhg`;
  const keys = `AIzaSyCM_ILSdIvU11WjurXZWSGPcf6skuKXT5s`;
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetsId}?includeGridData=true&key=${keys}`
    );
    let data = await response.json();

    window.myArray = data.sheets;
    window.dataTitle = data.properties.title;
  } catch (error) {
    alert(error + " !!!" + " Please Reload Again !");
  }
})();

setTimeout(function() {
  //console.log(myArray);

  let markets = document.createElement("div");
  markets.className = "markets";
  document.body.append(markets);

  let markets_box = document.createElement("div");
  markets_box.className = "markets_box";
  markets.appendChild(markets_box);

  let box_content = document.createElement("div");
  box_content.className = "box_content";
  markets_box.appendChild(box_content);

  let markets_font = document.createElement("div");
  markets_font.className = "markets_font";
  markets_font.textContent = dataTitle;
  box_content.appendChild(markets_font);
  let upper = document.createElement("div");
  upper.className = "upper";
  box_content.appendChild(upper);

  function box(nameId, title, fasId, id, q, res, resMin) {
    function inv(i) {
      let invisible = document.createElement("div");
      invisible.className = "invisible";
      invisible.id = i;
      box_content.appendChild(invisible);
    }
    inv(q);
    let totalFirst = document.createElement("div");
    totalFirst.className = "total first";
    totalFirst.id = nameId;
    totalFirst.textContent = myArray[title].properties.title;
    let fas = document.createElement("i");
    fas.className = "fas fa-chevron-circle-down";
    fas.id = fasId;
    totalFirst.appendChild(fas);
    box_content.appendChild(totalFirst);
    inv(q);
    (function func() {
      let upDown = document.createElement("div");
      upDown.className = `${id} common`;

      function inn() {
        let innerDiv = document.createElement("div");
        innerDiv.className = "inner";
        let p = document.createElement("p");
        p.className = " ";
        p.textContent = " ";
        innerDiv.appendChild(p);
        let numberDiv = document.createElement("a");

        numberDiv.className = "number";

        numberDiv.textContent = "Details";

        innerDiv.appendChild(numberDiv);

        upDown.appendChild(innerDiv);
        box_content.appendChild(upDown);
      }
      function popUp(id, res) {
        let allBody = document.createElement("div");
        allBody.className = "allBody";

        let main = document.createElement("div");
        main.className = "main";

        let middle = document.createElement("div");
        middle.className = "middle";
        let mainSub = document.createElement("div");
        mainSub.className = `${res}`;
        mainSub.textContent = " ";
        let left = document.createElement("div");
        left.className = "left";

        let leftBox = document.createElement("div");
        leftBox.className = `${resMin}`;
        leftBox.textContent = " ";
        left.appendChild(leftBox);
        middle.appendChild(mainSub);
        main.appendChild(left);
        main.appendChild(middle);

        allBody.appendChild(main);
        document.body.appendChild(allBody);
      }

      function len(ID, host, currPath, currLength, marTop) {
        if (
          id === `${ID}` &&
          myArray[currPath].data[0].hasOwnProperty("rowData")
        ) {
          host = myArray[currPath].data[0].rowData.length;

          for (let i = 0; i < host; i++) {
            inn();
            popUp(id, res);
            if (host <= 3) {
              if (host > currLength) {
                let extra = host - currLength;

                document.querySelector(`.${ID}`).style.marginTop =
                  marTop - 67 * `${extra}` + "px";
              } else if (host < currLength) {
                extra = currLength - host;

                document.querySelector(`.${ID}`).style.marginTop =
                  marTop + 67 * `${extra}` + "px";
              }
            } else {
              document.querySelector(`.${ID}`).style.marginTop = -285 + "px";
            }
          }
        }
      }

      for (let i = 0; i < myArray.length; i++) {
        len("id" + i, "idLen" + i, i, 1, -85);
      }
    })(id);
    inv(q);
  }

  for (let i = 0; i < myArray.length; i++) {
    box(
      "name" + i,
      i,
      "fas" + i,
      "id" + i,
      "zInd" + i,
      "res" + i,
      "resMin" + i
    );
  }

  let buttons = document.getElementsByClassName("number");

  let close = document.querySelectorAll(".allBody");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", e => {
      if (e.target === buttons[i]) {
        document.querySelectorAll(".allBody")[i].style.display = "block";
      }
    });

    window.addEventListener("click", l => {
      if (l.target === close[i]) {
        close[i].style.display = "none";
      }
    });
  }

  function createAccordion(arrayOfData) {
    arrayOfData.map(function(elem, ind, arr) {
      function resRender(
        id,
        crrPath,
        name,
        nameRes,
        resClass,
        resMin,
        nameMin
      ) {
        if (arr[crrPath].data[0].hasOwnProperty("rowData")) {
          name = document.querySelector(`.${id}`).querySelectorAll("p");
          let first = arr[crrPath].data[0].rowData.map(
            (element, index, array) => {
              if (
                arr[crrPath].data[0].rowData[index].hasOwnProperty("values") &&
                arr[crrPath].data[0].rowData[index].values[0]
              ) {
                name[index].textContent =
                  arr[crrPath].data[0].rowData[index].values[0].formattedValue;
              }
            }
          );

          nameMin = document.querySelectorAll(`.${resMin}`);

          let third = arr[crrPath].data[0].rowData.map(
            (element, index, array) => {
              if (
                arr[crrPath].data[0].rowData[index].hasOwnProperty("values") &&
                arr[crrPath].data[0].rowData[index].values[1]
              ) {
                nameMin[index].textContent =
                  arr[crrPath].data[0].rowData[index].values[1].formattedValue;
              }

              nameRes = document.querySelectorAll(`.${resClass}`);

              let second = arr[crrPath].data[0].rowData.map(
                (element, index, array) => {
                  if (
                    arr[crrPath].data[0].rowData[index].hasOwnProperty(
                      "values"
                    ) &&
                    arr[crrPath].data[0].rowData[index].values[2]
                  ) {
                    nameRes[index].textContent =
                      arr[crrPath].data[0].rowData[
                        index
                      ].values[2].formattedValue;
                  }
                }
              );
            }
          );
        }
      }
      for (let i = 0; i < myArray.length; i++) {
        resRender(
          "id" + i,
          i,
          "jo" + i,
          "joRes" + i,
          "res" + i,
          "resMin" + i,
          "joMin" + i
        );
      }
    });
  }

  createAccordion(myArray);
}, 3000);
