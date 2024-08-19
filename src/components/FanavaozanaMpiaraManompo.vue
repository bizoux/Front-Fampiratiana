<template>

    <div class="bloc-modale" v-if="mampisehoFanavaozanaAnarana">

        <div class="overlay" v-on:click="asehoNaTsiaFanavaozanaAnarana()"></div>
        
        <div class="modale card">

            <div class="btn-modale btn btn-danger" v-on:click="asehoNaTsiaFanavaozanaAnarana()">X</div>
            <h1 class="styleTexte">Hanova ny anarana</h1><br>
            <div class="Aucentre">

                <label for="" class="form-label">Anarana</label>
                <input type="text" class="form-control" v-model="anaranaFenoina"><br>

            </div>
            
            <button class="btn btn-primary" v-on:click="HanavaoAnarana">Hanavao</button>

        </div>
        

    </div>
    
  
</template>

<script>
import axios from "axios";
export default{
    name:'FanavaozanaMpiaraManompo',
    props:["id","mampisehoFanavaozanaAnarana","asehoNaTsiaFanavaozanaAnarana"],
    data(){
        return{
            
            anaranaFenoina:'',
            
        }
    },
    mounted:function(){
         this.AnaranaTandrifyId();
        // this.azo=this.identifiantmp;
        // console.log(this.$route);
        // this.HakaAnarana();
        // this.testa();
    },
    watch: {

'$route.query.mpiaramanompo': 'AnaranaTandrifyId',
// '$route.query.datyNalaina': 'HanavaoDatyOra',
// '$route.query.oraNalaina': 'HanavaoDatyOra'

//         '$route.query.datyNalaina'(DatyVaovao) {
//     this.DatyAzo = DatyVaovao;
//     this.formatDate = moment(this.DatyAzo).format('YYYY-MM-DD');
//     'this.formatDate':'updateDateTime'
//   },
//   '$route.query.oraNalaina'(OraVaovao) {
//     this.OraAzo = OraVaovao;
//   }

// '$route.query.mpiaramanompo'(OraVaovao) {
// this.test = OraVaovao;
// }
},
    methods:{


        // testa:function(){
        //     this.test = "id"
        // },

    // HAFATRA FANAMARIHANA
    HafatraFanovana:function(){
      this.$swal({
        icon:'success',
        title:"Navaozina soamatsara ny anarana ary novana "+this.anaranaFenoina,
        text:"Mirary soa!",
        timer:3900,
        showConfirmButton:false
      })
      },
    
      // HAMPISEHO NY ANARANA TANDRIFY AMIN'NY ID
      AnaranaTandrifyId() {
        // this.anaranaFenoina=this.$route.query.mpiaramanompo;
        const id=this.$route.query.mpiaramanompo;
        // console.log(this.anaranaFenoina);
    //   this.idMpiaramanompo = this.$route.query.idMp;
      axios.get("https://projet-fampirantiana.vercel.app/MakaId/"+id).then(response => {
        //   this.idMpiaramanompo = response.data[0].anarana;
        this.anaranaFenoina=response.data[0].anarana;
        //   console.log(response.data[0].anarana);
        }).catch(erreur=>{
            console.log(erreur);
        })
    },

    // HANAVAO NY ANARANA
        HanavaoAnarana:function(){
            const AnaranaVaovao = this.anaranaFenoina;
            const idMpiaramanompo = this.$route.query.mpiaramanompo;
            axios.put("https://projet-fampirantiana.vercel.app/fanovanaAnarana/"+idMpiaramanompo,{AnaranaVaovao}).then(response=>{
              this.HafatraFanovana();
              this.$router.push('https://projet-fampirantiana.vercel.app/MpiaraManompo');
            //   return window.location.reload();
              console.log(res.data);
 
        }).catch(erreur=>{
            console.log(erreur);
        });
         
        }
    }
};
</script>

<style scoped>
.form-label{
            
            font-weight: bold;
            background: linear-gradient(90deg, #c08678, #feb47b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
}
.form-control{
    font-size: 20px;
    font-weight: 400;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    
}
.Aucentre{
    /* border: 1px solid black; */
}

.bloc-modale{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}
.overlay{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.modale{
    background: linear-gradient(200deg,#237979,#557497,#00bcd4);
    color: #333;
    padding: 50px;
    position: fixed;
    bottom: 30%;
}
.btn-modale{
    position: absolute;
    top: 10px;
    right: 10px;
}
.styleTexte{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        color:white;
        /* border: 1px solid black; */
    }
.form-label{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: white;
        font-size: 20px;
}
.btn-primary{
    font-size: 20px;
}
</style>