const pieChart = Vue.component('pie-chart', {
template: '#pie-chart-template',
props: ['background', 'center', 'segments', 'start'],
computed: {
  paths() { // данные
    const res = this.segments.reduce((acc, segment) => {
      acc.segments.push({ ...segment, start: acc.start });
      acc.start += segment.percent;
      return acc;
    }, { segments: [], start: 0 });

    return res.segments;
  } 
},

  methods: {
    
    drawPath(percent) {//рисует диаграмму
      var start = 0;
      const size = '100',
      rad = size / 2,
      unit = Math.PI * 2 / 100,
      end = percent * unit - 0.001,
      x1 = rad + rad * Math.sin(start),
      y1 = rad - rad * Math.cos(start),
      x2 = rad + rad * Math.sin(end),
      y2 = rad - rad * Math.cos(end),
      big = end - start > Math.PI ? 1 : 0;
      return `M ${rad},${rad} L ${x1},${y1} A ${rad},${rad} 0 ${big} 1 ${x2},${y2} Z`;
    },
    
  }
});



const v = new Vue({
  el: '#app',
  data() {
    return {
      mdl: 50,
      number: 50,
      tweenedNumber: 0,
      change: false,
      change2: false,
      str: 40
    }
  },
  methods: {
    anim() { // для анимации Animate
        this.number = setInterval(() => {
          if(this.change == true){
            this.number = Math.floor(Math.random() *100)
          }
        }, 1000);
      console.log(this.change)
    },
  },
  components: 
  { 
    'pie-chart': pieChart ,
  },
  watch: { // для плавного сдвига анимации
    number: function(newValue) {
      if(newValue>100) newValue=100;
      else if(newValue<0) newValue=0;
      TweenLite.to(this.$data, 1, { mdl: newValue });
    }
  }
});