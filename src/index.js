import { TimelineMax, TweenMax } from 'gsap';
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import Snap from 'snapsvg';

class FollowPath {
  constructor (options) {
    this.options = options;
    this.svg = document.querySelector(options.svg);
    this.object = options.object;
    this.path = {}
    this.arrayPath = [];
    this.tween = null;

    this.initPath();
    this.initSegment();
    this.buildScene();
  }

  initPath () {
    this.path.name = this.options.pathSelector;
    this.path.d = this.options.pathString || document.querySelector(this.path.name).getAttribute('d');
    this.path.cubic = Snap.path.toCubic(this.path.d);
  }
  
  initSegment () {
    for (let i = 0; i < this.path.cubic.length; i++) {
      let segment = this.path.cubic[i];
      segment.shift();
      this.setUpPoint(segment);
    }
  }

  addTween () {
    return new TimelineMax()
      .add(TweenMax.to(this.object, 1, {
        bezier: {
          values: this.arrayPath,
          type: 'cubic',
          autoRotate: false
        },
        ease: Linear.easeNone
      }))
  }

  setUpPoint (segment) {
    for (let i = 0; i < segment.length; i += 2) {
      const point = {};
      point.x = segment[i];
      point.y = segment[i + 1];
      this.arrayPath.push(point);
    }
  }

  buildScene () {
    const controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerElement: '#trigger'
        // offset: 1080
      }
    });

    const scene = new ScrollMagic.Scene({
      duration: 3330
    })
      .setTween(this.addTween())
      .addIndicators()
      .addTo(controller);

    if (!this.options.isIndicators) {
      scene.removeIndicators();
    }
  }
}

export default FollowPath;
