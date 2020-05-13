window.onload=main;
class textTexture{
  constructor(){
    this.ctx=document.createElement('canvas').getContext('2d');
    this.ctx.canvas.width = 1024;
    this.ctx.canvas.height = 256;
    this.fontsize=20;
    this.font="Arial, meiryo, sans-serif";
    this.format="bold";
    this.ctx.font=this.format+" "+this.fontsize+"px "+this.font;
    this.x=10;
    this.y=20;
    this.limit=0.98;
    this.height=1.1;
  }
  update(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    let i=0;
    this.ctx.beginPath();
    this.text.split("\n").forEach(t=>{
      if(this.ctx.measureText(t).width<=this.ctx.canvas.width){
        this.ctx.fillText(t, this.x,this.y+i*this.fontsize*this.height);
        ++i;
      }else{
        let tmp="";
        let length=0;
        t.split("").forEach(t2=>{
          let t2_length=this.ctx.measureText(t2).width;
          if(length+t2_length>this.ctx.canvas.width*this.limit){
            this.ctx.fillText(tmp, this.x,this.y+i*this.fontsize*this.height);
            ++i;
            tmp=t2;
            length=t2_length;
          }else{
            tmp=tmp+t2;
            length+=t2_length;
          }
        });
        if(length){
          this.ctx.fillText(tmp, this.x,this.y+i*this.fontsize*this.height);
          ++i;
        }
      }
    });
  }
  set_text(txt){
    this.text=txt;
    this.update();
  }
}

function main() {
  let texture= new textTexture();
  let text="ゆく河の流れは絶えずして、しかももとの水にあらず。淀みに浮かぶうたかたは、かつ消えかつ結びて、久しくとどまりたるためしなし。世の中にある人とすみかと、またかくのごとし。\nたましきの都のうちに、棟を並べ、甍を争へる、高き、卑しき、人のすまひは、世々を経て尽きせぬものなれど、これをまことかと尋ぬれば、昔ありし家はまれなり。あるいは去年焼けて今年作れり。あるいは大家滅びて小家となる。\n住む人もこれに同じ。所も変はらず、人も多かれど、いにしへ見し人は、二、三十人が中に、わづかにひとりふたりなり。朝に死に、夕べに生まるるならひ、ただ水のあわにぞ似たりける。知らず、生まれ死ぬる人、いづかたより来たりて、いづかたへか去る。\nまた知らず、仮の宿り、たがためにか心を悩まし、何によりてか目を喜ばしむる。その、あるじとすみかと、無常を争ふさま、いはば朝顔の露に異ならず。あるいは露落ちて花残れり。残るといへども朝日に枯れぬ。あるいは花しぼみて露なほ消えず。消えずといへども夕べを待つことなし。";
  texture.set_text(text);
  document.body.appendChild(texture.ctx.canvas);
}