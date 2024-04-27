const colorPicker = document.getElementById("textcolorpicker");
  const canvas = document.getElementById("mycanvas");
  const clearButton = document.getElementById("clearButton");
  const saveButton = document.getElementById("saveButton");
  const retriveButton = document.getElementById("retriveButton")
  const canvascolor = document.getElementById("Background");

  const fontsize = document.getElementById("fontsize");

  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;



  colorPicker.addEventListener("change", (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
  });

  canvascolor.addEventListener("change",(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,400)
  })

  fontsize.addEventListener("change",(e)=>{
    ctx.lineWidth = e.target.value;
  })



  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      lastX = e.offsetX;
      lastY = e.offsetY;
    }
  });

  canvas.addEventListener("mouseup",()=>{
    isDrawing = false;
  })


  clearButton.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
  })

saveButton.addEventListener("click",()=>{
    localStorage.setItem('canvasContents', canvas.toDataURL())

    let link = document.createElement('a')

    link.download = 'my-signature.png'

    link.href = canvas.toDataURL()

    link.click()


})

retriveButton.addEventListener("click",()=>{
    if(localStorage.getItem('canvasContents'))
    {
        let img  = new Image()

        img.src = localStorage.getItem('canvasContents')

        ctx.drawImage(img,0,0)
    }
})