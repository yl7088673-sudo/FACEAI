document.getElementById('start-button').addEventListener('click', async () => {
  const modelURL = 'model/model.json';
  const metadataURL = 'model/metadata.json';

  const model = await tmImage.load(modelURL, metadataURL);

  const webcam = new tmImage.Webcam(300, 300, true);
  await webcam.setup(); // 여기서 카메라 권한 요청
  await webcam.play();
  document.getElementById('webcam-container').appendChild(webcam.canvas);

  window.requestAnimationFrame(loop);

  async function loop() {
    webcam.update();
    const prediction = await model.predict(webcam.canvas);
    document.getElementById('prediction-container').innerHTML = prediction
      .map(p => `${p.className}: ${(p.probability * 100).toFixed(1)}%`)
      .join('<br>');
    window.requestAnimationFrame(loop);
  }
});
