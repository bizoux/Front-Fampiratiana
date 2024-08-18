<template>
<div class="fond">
    <header class="header">
        <a href="#" class="logo">Mi.Famp</a>
        <nav class="navbar">
           
          <router-link to="/">Fampirantiana</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <!-- <button v-on:click="Hampiseho" class="btn btn-info">Fanampiana</button> -->
           
        </nav>
  
      </header>         



<br>    
 <center>
    <div style="width: 400px;display: flex;gap: 10px;margin: 5px;">
              <input type="text" placeholder="anarana" class="form-control" v-model="fikarohana" style="height: 45px;"/>
              <router-link to="/" class="btn btn-primary">Hiverina</router-link>
    </div>
    </center>
  
    <!-- Valiny t@ fikarohana Hita-->  
<br>  
<center>
  <div style="width: 900px;">
      
    <div class="alert alert-danger" v-if="this.fikarohana && filtreAnarana.length == 0">
      <span style="font-size: larger;">Ialana tsiny tsy ao anaty tabilao io anarana io Tompoko!</span>
    </div>
  </div>
  </center>

  <!-- Valiny t@ fikarohana tsy Hita-->  
  <center>
    <div style="width: 900px;">
        
      <div class="alert alert-success" v-if="this.fikarohana && filtreAnarana.length > 0">
        <span style="font-size: larger;">Miisa {{filtreAnarana.length}} ny anaran'i {{ fikarohana }}.</span> 
      </div>
    </div>
    </center>

    <center><button v-on:click="Hampiseho" class="btn btn-info">Hampiditra</button></center>
    <br>
    <center>
            <table class="table-striped" v-if="Lisitra.length > 0">
                <thead>
                    
                    <tr>
            
                    <th class="daty table-dark">idMpiaramanompo</th>    
                    <th class="Mpitondra table-dark">Anarana</th>
                
                    </tr>
                    
                </thead>
            
                <tbody>
                    <tr v-for="mpiaramanompo in filtreAnarana" :key="mpiaramanompo.idMpiaramanompo">
                        
                        <td class="toerana">{{mpiaramanompo.idMpiaramanompo}}</td>     
                        <td class="toerana">{{mpiaramanompo.anarana}}
                            <center>
                              <button class="btn btn-success" @click="HakaAnarana(mpiaramanompo.idMpiaramanompo)"><font-awesome-icon icon="edit"/></button>
                              <button class="btn btn-danger" @click="HamafaAnarana(mpiaramanompo.idMpiaramanompo,mpiaramanompo.anarana)"><font-awesome-icon icon="trash"/></button>
                            </center>


                        </td>     
                    </tr>
                </tbody>
            
            
            </table>

        </center><br>

        <!-- <footer>
    
            <div class="lienSite">
                <a href="#">Facebook</a>
                <a href="#">Linkedin</a>
                <a href="#">Instagram</a>
            </div>
                    
            
                    <p>&copy; Copyright 2024 Jaffrelot,Tous droits réservés</p>
                    
            </footer> -->
    </div>

    <Hampiditra v-bind:mampisehoFampidirana="mampisehoFampidirana" v-bind:asehoNaTsiaFamp="asehoNaTsiaFamp"></Hampiditra>
    <HanavaoAnarana v-bind:id="id" v-bind:mampisehoFanavaozanaAnarana="mampisehoFanavaozanaAnarana" v-bind:asehoNaTsiaFanavaozanaAnarana="asehoNaTsiaFanavaozanaAnarana"></HanavaoAnarana>

</template>

<script>
import axios from "axios";
import Hampiditra from "./HampiditraMpiaraManompo.vue";
import HanavaoAnarana from "./FanavaozanaMpiaraManompo.vue";
export default{
        name:'MpiaraManompo',
        components:{
            Hampiditra,HanavaoAnarana
        },
        data() {
            return {
                id:this.$route.query.mpiaramanompo,
                Lisitra:[],
                fikarohana:"",
                mampisehoFampidirana:false,
                mampisehoFanavaozanaAnarana:false,


            }
        },
        mounted:function(){
            this.lisitraMpiaramanompo();
        },
        computed:{
            filtreAnarana(){
                return this.Lisitra.filter(mpiaramanompo =>
                    mpiaramanompo.anarana.toLowerCase().includes(this.fikarohana.toLowerCase())
            )
            }
        },
        methods: {
          AnararaFafana(idMpiaramanompo){
      axios.delete("http://localhost:3000/fafanaAnarana/"+idMpiaramanompo).then(function(){
        return window.location.reload();
      });
    },
          HamafaAnarana(idMpiaramanompo,anarana){
      this.$swal({
        title:"Tena vonona hamafa ny anaran'i "+anarana+" ve ianao?",
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Oui',
        cancelButtonText:'Non'
      }).then((result)=> {
        if(result.isConfirmed){
          this.$swal(
            {
              icon:'success',
              title:"Voafafa soamatsara ny anaran'i "+anarana,
              text:'Mirary soa',
              timer:2500,
              showConfirmButton:false
            }
          )
          this.AnararaFafana(idMpiaramanompo);

        }
        else
        {
          
          this.$swal({
            icon:'error',
        title:"Tsy tontosa ny famafana ny anaran'i "+anarana,
        text:"echec",
        timer:2500,
        showConfirmButton:false
      }
          )
        }
      })
    },



          HakaAnarana:function(idMpiaramanompo){
            this.$router.push({ query:{ mpiaramanompo: idMpiaramanompo}});
            this.mampisehoFanavaozanaAnarana=true;
          },
            // MAMPISEHO
    asehoNaTsiaFamp:function(){
            this.mampisehoFampidirana = !this.mampisehoFampidirana;
        },

        // MAMPISEHO
    asehoNaTsiaFanavaozanaAnarana:function(){
            this.mampisehoFanavaozanaAnarana = !this.mampisehoFanavaozanaAnarana;
        },


        // hampiseho fanamarihana
    Hampiseho:function(){
      this.mampisehoFampidirana=true;
    },
            lisitraMpiaramanompo:function(){
            axios.get("http://localhost:3000/LisitraMpiaraManompo").then((response)=>{
                this.Lisitra=response.data;
                
            })
            
        },
    }

}
</script>


<style scoped>

.btn.btn-info{
    font-family: Arial, Helvetica, sans-serif;
    color:white;
    background: #0c8696;
  }
  .btn.btn-info:hover{
    color:white;
    background: #0c8696af;
  }

  /* fond arriere plan */
  .fond{
    /* background: linear-gradient(235deg,#00d9ff,#010645a2,#00bcd4);
    height: auto; */
    background: white;
  }

  /* Menu */
  .navbar a{
 text-decoration: none;
 font-weight: 700;
 margin-left: 35px;
 transition: .3s;
 font-size: 24px;
}
.navbar a:hover{
 color: #ffffff;
 opacity: 0.8;
 border-bottom: 1px solid white;
}

.header{
 position: static;
 top:0;
 left:0;
 width: 100%;
 padding: 20px 10%;
 display: flex;
 justify-content: space-between;
 align-items: center;
 background: rgba(6, 170, 170, 0.486);
 /* border: 1px solid black; */

}

/* Logo */
.logo{
 position: relative;
 text-decoration: none;
 font-size: 30px;
 /* color: #0b3041; */
 color: #b91a9f;
 font-weight: 700;
 letter-spacing: 3px;
 background-image: url("../image/fondTexte2.png");
 background-size: auto;
 background-clip: text;
 color: transparent;
}


/* Menu actif */
.active{
        color: #ffffff;
        border-bottom: 1px solid #ffffff;
        font-family: 'Times New Roman', Times, serif;
        letter-spacing: 4px;
}



.table-dark{
  background-color: rgba(40,127,186);
  color:white;
}      
.table-striped tbody tr:nth-of-type(odd){  
  background-color: rgb(255, 254, 255);
}

.table-striped tbody tr:nth-of-type(even){
  background-color: rgb(244,244,244);
  color: rgb(0, 0, 0);
}
table{
  border:1px solid rgb(244,244,244);
  border-collapse:collapse;
  width:1000px;
}


td{
      border-right:1px solid rgb(246,246,246);
      border-left:1px solid rgb(246,246,246);
      font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
      font-size: 30px;
      font-weight: 600;
}

th{
        padding:20px;
        text-align: center;
}
.table-dark{
      padding:6px;
}
.toerana{
      text-align:center;
      font-size: 18px;
}
footer{
     background-color: rgba(3, 3, 29, 0.945);
     height: 100vh;
     border: 3px solid transparent;    
 }
 .lienSite{
     display: flex;
     justify-content: center;
     /* border: 1px solid black; */
     padding: 15px;
 }
 footer p{
     color: white;
     text-align: center;
      
 }
 
 .lienSite a{
     margin: 10px;
 }
 
 footer li{
     
     list-style-type: none;
     
 }
 footer ul{
     text-align: center;
 }

 
 footer {
     text-decoration: none;
     
 }
</style>
