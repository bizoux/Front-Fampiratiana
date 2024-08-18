<template>


 <center>
  <div style="width: 400px;display: flex;gap: 10px;margin: 5px;">
            <input type="text" placeholder="anarana" class="form-control" v-model="Fikarohana"/>
            <button @click="Karoka()" class="btn btn-secondary">Fikarohana</button>
            <router-link to="/" class="btn btn-primary">Hiverina</router-link>
  </div>
  </center>

  <!-- Valiny t@ fikarohana Hita-->  
<center>
<div style="width: 900px;">
    
  <div class="alert alert-success" v-if="this.Fikarohana && MikarokaAnarana.length == 0">
    <span style="font-size: larger;">Ialana tsiny tsy ao anaty tabilao io anarana io Tompoko!</span>
  </div>
</div>
</center>


<!-- Valiny t@ fikarohana tsy Hita-->  
<center>
  <div style="width: 900px;">
      
    <div class="alert alert-success" v-if="this.Fikarohana && MikarokaAnarana.length > 0">
      <span style="font-size: larger;">Miisa {{MikarokaAnarana.length}} ny anaran'i {{ Fikarohana }}.</span> 
    </div>
  </div>
  </center>




<div class='MitondraMicro'>
<br>
<center>


<div class="aligner">
  <h5>FIANARANTSOA &nbsp;TSARAMANDROSO</h5>
  <span>( Anjara mitondra MICRO )</span>
</div>

  

<table class="table-striped">
    <thead>
        
        <tr>

        <th class="daty table-dark"><center>DATY</center></th>
        <th class="Mpitondra table-dark"><center>MPITONDRA MICRO</center></th>
    
        </tr>
        
    </thead>

    <tbody>
        <tr v-for="Anjara in MikarokaAnarana" v-bind:key="Anjara.idAnjara">
            <td class="toerana">{{formatDate(Anjara.Daty)}}</td>
            <td class="toerana">{{Anjara.Anarana1}} & {{Anjara.Anarana2}} / {{Anjara.Anarana3}} & {{Anjara.Anarana4}}</td>
            
            
        </tr>
    </tbody>


</table>
<p>Mazotoa rahalahy</p>
</center>
</div>


<br>

<center class="MitondraMicro">
  <div>
    <button @click="genererPdf()" class="btn btn-secondary">Générer en pdf</button>
  </div>
  <br>
  <button class="btn btn-danger" @click="Hamafa()">Hamafa azy rehetra</button>
    
</center>
    
    
    <!-- CHARGEMENT -->
        <div class="row">
    
            <div class="col-md-4 chargement">
    
            </div>
            
            
            <div class="col-md-4 chargementImage">
        <!-- Chargement de données -->
        <!-- <div class="spinner-border" v-if="this.loading" id="tailleLoader"></div> -->
        <br><br><img src="../image/loader-unscreen.gif" alt="imageChargement" v-if="this.loading">
            </div>
            
            <div class="col-md-4 chargement">
    
            </div>
    
    
        </div>     
    </template>
    <script>
import html2canvas from "html2canvas";    
import moment from 'moment';   
import jsPdf from "jspdf";
import axios from "axios";
    export default{
        name:"HavoakaPdf",
        data(){
            return{
                DatyAnjara:'',
                Fikarohana:'',
                listaRahalahyRehetra:[],

            }
        },
        computed:{
      //     formattedList(){
      //       return this.listaRahalahyRehetra.map(item => {
      //   return {
      //     ...item,
      //     Anarana1: item.Anarana1 === 'Honorer' ? 'Honoré' : item.Anarana1,
      //     Anarana2: item.Anarana2 === 'Honorer' ? 'Honoré' : item.Anarana2,
      //     Anarana3: item.Anarana3 === 'Honorer' ? 'Honoré' : item.Anarana3,
      //     Anarana4: item.Anarana4 === 'Honorer' ? 'Honoré' : item.Anarana4
      //   };
      // });
      //     }


      formattedList() {
      return this.listaRahalahyRehetra.map(item => ({
        ...item,
        Anarana1: item.Anarana1 === 'Honorer' ? 'Honoré' : item.Anarana1,
        Anarana2: item.Anarana2 === 'Honorer' ? 'Honoré' : item.Anarana2,
        Anarana3: item.Anarana3 === 'Honorer' ? 'Honoré' : item.Anarana3,
        Anarana4: item.Anarana4 === 'Honorer' ? 'Honoré' : item.Anarana4
      }));
    },
    MikarokaAnarana() {
      return this.formattedList.filter(KarokaAnjara => {
        return (
          KarokaAnjara.Anarana1.toLowerCase().includes(this.Fikarohana.toLowerCase()) ||
          KarokaAnjara.Anarana2.toLowerCase().includes(this.Fikarohana.toLowerCase()) ||
          KarokaAnjara.Anarana3.toLowerCase().includes(this.Fikarohana.toLowerCase()) ||
          KarokaAnjara.Anarana4.toLowerCase().includes(this.Fikarohana.toLowerCase())
        );
      });
    },






        },

        
        methods:{

          // DATY

          formatDate(date){
          // Tableaux de traduction pour les jours et les mois en malgache
    const jours = ['Alahady', 'Alatsinainy', 'Talata', 'Alarobia', 'Alakamisy', 'Zoma', 'Sabotsy'];
    const mois = ['Janoary', 'Febroary', 'Martsa', 'Aprily', 'Mey', 'Jona', 'Jolay', 'Aogositra', 'Septambra', 'Oktobra', 'Novambra', 'Desambra'];

    // Convertir la date en objet Date
    const dateObj = new Date(date);

    // Extraire le jour de la semaine, le jour du mois, le mois et l'année
    const jourSemaine = jours[dateObj.getDay()];
    const jourMois = dateObj.getDate();
    const moisAnnee = mois[dateObj.getMonth()];
    const annee = dateObj.getFullYear();

    // Construire la date formatée en malgache
    return `${jourSemaine} ${jourMois} ${moisAnnee} ${annee}`;
        },



        // HAMOAKA NY TARATASY HATAO PIRINTY

          genererPdf(){
            var doc= new jsPdf("l","pt","a3");
    doc.html(document.querySelector(".MitondraMicro"),{
    callback: function(pdf){
    pdf.save("Lisitra_Mpitondra_MICRO.pdf");
},
})
         },

        // LISITRA IREO MANANA ANJARA 

            IreoMananaAnjara:function(){
            axios.get("http://localhost:3000/Anjara").then((response)=>{
                this.listaRahalahyRehetra=response.data;
                
            })
        },

        // HAMAFA NY LISITRA REHETRA

        HamafaAzyRehetra(){
      axios.delete("http://localhost:3000/HamafaAnjara").then(function(){
        return window.location.reload();
      });
    },
    Hamafa(){
      this.$swal({
        title:"Tena hamafa an'ireo lisitran'ny anjara ve ianao?",
        icon:'warning',
        showCancelButton:true,
        confirmButtonText:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eny',
        cancelButtonText:'Tsia'
      }).then((result)=> {
        if(result.isConfirmed){
          var mdpAdmin="Jaffrelot";
          var mdpEntrer=prompt("Saisissez votre mot de passe");
          if(mdpEntrer == mdpAdmin){

              this.$swal(
            {
              icon:'success',
              title:'Voafafa soamatsara',
              text:'ireo lisitra ny anjara',
              timer:2500,
              showConfirmButton:false
            }
          ),
          this.HamafaAzyRehetra();

          }
          else
          {
            
            this.$swal(
            {
              icon:'error',
              title:'Tsy tontosa ny famafana',
              text:"an'ireo lisitra ny anjara",
              timer:2500,
              showConfirmButton:false
            }
          )
            
          }
          
        
        }
        else
        {
          
          this.$swal({
            icon:'error',
        title:'Tsy tontosa ny famafana',
        text:"an'ireo lisitran'ny anjara",
        timer:2500,
        showConfirmButton:false
      }
          )
        }
      })
    },



        },
         mounted:function(){
            this.IreoMananaAnjara();
        },
        
    }
    </script>
    <style scoped>
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
.MitondraMicro{
  padding-right: 25px;
}
h5{
  font-weight:bold;
}
.aligner{
  display:flex;
  justify-content:center;
  gap:12px;
  padding-left:150px;
  border:1px solid rgb(245,245,245);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width:1000px;
}
table{
  border:1px solid rgb(244,244,244);
}


    td{
      border-right:1px solid rgb(246,246,246);
      border-left:1px solid rgb(246,246,246);
      font-family:normal;
      padding: 7px;
    }
    .table-dark{
      padding:6px;
    }
    .toerana{
      text-align:center;
      font-size: 18px;
    }
.daty,.Mpitondra{
    width:750px;
}
span{
  font-style:italic;
}
p{
  color:red;
  font-style:italic;
}


  .ligne1Col2{
    height:45px;
  }

#BaseImposable{
  background:rgb(97, 97, 97);
  color:white;
}
#td7{
  
  width:300px;
  background:rgb(97, 97, 97);
  color:white;
}
#td1{ 
  width:245px;
  background:rgb(53, 53, 53);
  color:white;
}
    .retour{
  text-align:right;
}
    .stylePdf{
      display:flex;
      justify-content: space-evenly;

    }
  
    .ligne1Col2{
      display:flex;
      justify-content: right;
      padding: 5px;
    
    }
    .ligne1{
      background:#3a3f51e7;
    
    }
    #styleTitre{
        font-size:12px;
    }
    #largeur{
        width:300px;
        text-align: center;
    }
    .message{
    
        display:flex;
        justify-content: center;
        
    }
    
    th{
        padding:20px;
    }
    table{
        border-collapse:collapse;
        width:1000px;
    }
   
    </style>