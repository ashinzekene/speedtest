(() => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const speedElement = document.querySelector(".speed-text")
  const speedTypeElement = document.querySelector(".speed-text div")
  const waves = [...document.querySelectorAll(".box")]
  const offline = () => !navigator.onLine
  const supported = !!connection
  
  connection.addEventListener("change", watchNetwork)
  window.addEventListener("offline", watchNetwork)
  window.addEventListener("online", watchNetwork)
  
  const getSpeedText = () => speedElement.childNodes[0].nodeValue;
  const setSpeedText = (v) => speedElement.childNodes[0].nodeValue = v;
  
  function watchNetwork() {
    if (!supported) {
      setSpeedText("Not Supported")
      return
    }

    if (offline()) {
      if (getSpeedText() === "Offline") return
      setSpeedText("Offline")
      speedTypeElement.innerHTML = "0"      
      waves.map(wave => wave.style.bottom = "-410vw")
      return  
    }

    setSpeed(connection.downlink, connection.effectiveType)
  }

  setInterval(watchNetwork, 1000)
  
  function toNumber(text) {
    const match = text.match(/[0-9.]+/)
    return match ? match[0] : 0
  }
  
  function setSpeed(speed, type) {
    const formerSpeed = toNumber(getSpeedText());
    if (Math.abs(formerSpeed - speed) < 0.3 ) return
    waves.map(wave => wave.style.bottom = `${-410 + (3 * speed)}vw`)
    setSpeedText(`${speed}mbps`)
    speedTypeElement.innerHTML = type
  }
})()