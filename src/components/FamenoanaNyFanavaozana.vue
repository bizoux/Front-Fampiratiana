<template>
<form>

    <div class="bloc-modale" v-if="mampisehoHafatra">

        <div class="overlay" v-on:click="mampisehoNaTsia()"></div>
        
        <div class="modale card">

            <div class="btn-modale btn btn-danger" v-on:click="mampisehoNaTsia()">X</div>
            <h1 class="styleTexte">Hanova na hameno ny anjara Fampirantiana</h1><br>
            
            <div class="Aucentre">
                <label for="" class="form-label">Anarana voalohany</label>
                <input type="text" class="form-control" v-model="anarana1"><br>
            
                <label for="" class="form-label">Anarana faharoa</label>
                <input type="text" class="form-control" v-model="anarana2"><br>
            </div>
            
            <button class="btn btn-primary" v-on:click="HanavaoAnjara">Hanavao</button>

        </div>
        

    </div>
    
</form>
  
</template>

<script>
import axios from "axios";
import moment from 'moment'; 
export default{
    name:'FamenoanaNyFanavaozana',
    props:['mampisehoHafatra','mampisehoNaTsia'],
    data(){
        return{
        
            anarana1:"",
            anarana2:"",
            DatyAzo:'',
            OraAzo:'',
            formatDate:'',
            
        }
    },
    mounted:function(){
         this.HanavaoDatyOra();
    },
    watch: {

    '$route.query.datyNalaina': 'HanavaoDatyOra',
    '$route.query.oraNalaina': 'HanavaoDatyOra'

//         '$route.query.datyNalaina'(DatyVaovao) {
//     this.DatyAzo = DatyVaovao;
//     this.formatDate = moment(this.DatyAzo).format('YYYY-MM-DD');
//     'this.formatDate':'updateDateTime'
//   },
//   '$route.query.oraNalaina'(OraVaovao) {
//     this.OraAzo = OraVaovao;
//   }
},
    methods:{

    // HAFATRA FANAMARIHANA
    HafatraFanovana:function(){
      this.$swal({
        icon:'success',
        title:"Navaozina soamatsara ny anjaran'i "+this.anarana1+" sy "+this.anarana2,
        text:"Mirary soa amin'ny fampirantiana",
        timer:3500,
        showConfirmButton:false
      })
      },

      // HANAVAO DATY SY ORA
        HanavaoDatyOra() {
      this.DatyAzo = this.$route.query.datyNalaina
      this.OraAzo = this.$route.query.oraNalaina
      this.formatDate = moment(this.DatyAzo).format('YYYY-MM-DD');

      axios.get(`http://localhost:3000/Fanavaozana/${this.formatDate}/${this.OraAzo}`)
        .then(response => {
          this.anarana1 = response.data[0].anarana1;
          this.anarana2 = response.data[0].anarana2;
        });
    },
    


    // HANAVAO NY TABILAO
        HanavaoAnjara:function(){
            this.HafatraFanovana();
            const anarana1 = this.anarana1;
            const anarana2 = this.anarana2;
            const datyMaj = this.formatDate;
            const OraMaj = this.OraAzo
            axios.put("http://localhost:3000/fanovana/"+datyMaj+"/"+OraMaj,{anarana1,anarana2}).then((response)=>{
              console.log(res.data);
              this.$router.push('/FanaovanaFanovana');
 
        })
         
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