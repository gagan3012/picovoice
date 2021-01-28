function start_func(){
 navigator.getUserMedia = navigator.getUserMedia ||
 navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 if (navigator.getUserMedia) {
  navigator.getUserMedia({audio: true} ,
  function(stream) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      mic = audioContext.createMediaStreamSource(stream);
      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

			mic.connect(analyser);
		  analyser.connect(javascriptNode);
		  javascriptNode.connect(audioContext.destination);

		  myCanvas = $("#myCanvas")[0].getContext("2d");
      cells = $('.cell');

		 javascriptNode.onaudioprocess = function() {
				 var arr = new Uint8Array(analyser.frequencyBinCount);
				 analyser.getByteFrequencyData(arr);

				 var data = 0;
				 for (var i = 0; i < arr.length; i++) {
					 data += (arr[i]);
				 }
				 var vol = data / arr.length;
         var roundVol = Math.round(vol)

         // print the volume number
         myCanvas.clearRect(0, 0, 40, 20);
         myCanvas.font = "22px impact"
         myCanvas.fillText(roundVol, 0, 18);

         // color the volume cells
         subCells = cells.slice(0, Math.round(vol/10))
         for (var i = 0; i < Math.round(vol/10); i++) {
           subCells[i].style.backgroundColor="#ed4e24";
         }
         subCells = cells.slice(Math.round(vol/10), 10)
         for (var i = Math.round(vol/10); i < 10 ; i++) {
           subCells[i].style.backgroundColor="#c4b5b1";
         }

      }
    },
    function(err) {
      console.log("Error: " + err.name)
    });
} else {
  console.log("Error encountered!");
 }
}