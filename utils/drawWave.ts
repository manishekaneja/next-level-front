const SCALE = 0.25;
const TWO_PI = 3.14 * 2;
const HALF_PI = 3.14 / 2;

class Blob {
  private wobbleIncrement: number = 0;
  private radius: number = 500;
  private segments: number = 12;
  private step: number = HALF_PI / this.segments;
  private anchors: Array<any> = [];
  private radii: Array<any> = [];
  private thetaOff: Array<any> = [];

  private theta: number = 0;
  private thetaRamp: number = 0;
  private thetaRampDest: number = 12;
  private rampDamp: number = 25;

  constructor() {
    const bumpRadius = 100;
    const halfBumpRadius = bumpRadius / 2;

    for (let i = 0; i < this.segments + 2; i++) {
      this.anchors.push(0, 0);
      this.radii.push(Math.random() * bumpRadius - halfBumpRadius);
      this.thetaOff.push(Math.random() * TWO_PI);
    }
  }
  update(c: CanvasRenderingContext2D) {
    this.thetaRamp += (this.thetaRampDest - this.thetaRamp) / this.rampDamp;
    this.theta += 0.03;

    this.anchors = [0, this.radius];
    for (let i = 0; i <= this.segments + 2; i++) {
      const sine = Math.sin(this.thetaOff[i] + this.theta + this.thetaRamp);
      const rad = this.radius + this.radii[i] * sine;
      const theta = this.step * i;
      const x = rad * Math.sin(theta);
      const y = rad * Math.cos(theta);
      this.anchors.push(x, y);
    }

    c.save();
    c.translate(0, -10);
    c.scale(1, SCALE/2.5);
    c.fillStyle = "#333";
    c.beginPath();
    c.moveTo(0, 0);
    bezierSkin(c, this.anchors, false);
    c.lineTo(0, 0);
    c.fill();
    c.restore();
  }
}

const blob = new Blob();

function drawCanvas(canvas: HTMLCanvasElement) {
  const c = canvas.getContext("2d");
  c.clearRect(0, 0, canvas.width, canvas.height);
  blob.update(c);
  window.requestAnimationFrame(() => drawCanvas(canvas));
}

function bezierSkin(c, bez, closed = true) {
  const avg = calcAvgs(bez);
  const leng = bez.length;

  if (closed) {
    c.moveTo(avg[0], avg[1]);
    for (let i = 2; i < leng; i += 2) {
      let n = i + 1;
      c.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
    }
    c.quadraticCurveTo(bez[0], bez[1], avg[0], avg[1]);
  } else {
    c.moveTo(bez[0], bez[1]);
    c.lineTo(avg[0], avg[1]);
    for (let i = 2; i < leng - 2; i += 2) {
      let n = i + 1;
      c.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
    }
    c.lineTo(bez[leng - 2], bez[leng - 1]);
  }
}

// create anchor points by averaging the control points
function calcAvgs(p) {
  const avg = [];
  const leng = p.length;
  let prev;

  for (let i = 2; i < leng; i++) {
    prev = i - 2;
    avg.push((p[prev] + p[i]) / 2);
  }
  // close
  avg.push((p[0] + p[leng - 2]) / 2, (p[1] + p[leng - 1]) / 2);
  return avg;
}

export default drawCanvas;
