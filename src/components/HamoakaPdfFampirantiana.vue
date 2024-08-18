<template>
    <!-- Affichage des semaines -->

      <div id="pdf-content">
        <center><h2>FANDAHARANA FAMPIRANTIANA <br><span class="datyDebFin">{{ startDateFormatted }} - {{ endDateFormatted }}</span></h2>
        <p><span class="fanamarihana">Fanamarihana :</span> Ireo <span class="gras">mpitory efa neken'ny Komitin'ny Fanompoana</span> handray anjara amin'ny Fitoriana eny amin'ny toerana Be Olona ihany no tokony hanoratra ny anarany eo ambany.Aza misalasala miresaka amin'ny <span class="gras">mpiandraikitra ny fanompoana</span> na <span class="gras">anti-panahy</span> hafa raha te handray anjara amin'io endri-panompoana io ianao.</p>
      </center><!-- Render table sections for all weeks -->
      <div v-for="(weekDates, index) in weeks" :key="index">
        <!-- <h2>Semaine {{ index + 1 }}</h2> -->
<table class="table-striped">
        
          <thead>
            <tr>
              <th><center style="font-size: 20px;">Ora</center></th>
              <th v-for="date in weekDates" :key="date" style="font-size: 20px;">
                <center>{{ formatDate(date) }}</center>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="horaire in horaires" :key="horaire.ora">
              <td style="font-weight: 500;width: 100px;font-size: 20px;">{{ horaire.ora }}</td>
              <td v-for="date in weekDates" :key="date" style="width: 150px;">
                <div v-for="Anjara in horaire.anjara[date]" :key="Anjara.idAnjara" style="font-size: 21px;">
                  <div v-if="!Anjara.anarana1 && !Anjara.anarana2" class="center-hr">
                    <hr>
                  </div>
                  <div v-else>
                    {{ Anjara.anarana1 }}<hr>{{ Anjara.anarana2 }}<br>
                  </div>
                  <button v-if="btnFanavaozana" class="btn btn-success" v-on:click="MakaAnjara(Anjara.daty, Anjara.ora)">havaozina</button>
                </div>
              </td>
            </tr>
          </tbody>
</table>
      </div>
    </div>
    <center class="misitaka">
      <button @click="generatePdf" class="btn btn-secondary">Hamoaka PDF</button>&nbsp;
      <button @click="FampisehoanaBtnFanavaozana" class="btn btn-warning">Hampiseho fanavaozana</button>&nbsp;
      <router-link to="/" class="btn btn-primary">Hiverina</router-link>
    </center>

    <!-- MODALE AN'ILAY FANAOVANA FANOVANA ANJARA -->
    <modale v-bind:mampisehoHafatra="mampisehoHafatra" v-bind:mampisehoNaTsia="mampisehoNaTsia" v-bind:Daty="Daty" v-bind:Ora="Ora"></modale>
    
    </template>


    <script>
import html2canvas from "html2canvas";    
import moment from 'moment';   
import jsPDF from "jspdf";
import axios from "axios";
import modale from "./FamenoanaNyFanavaozana.vue";
    export default{
        name:"HamoakaPdfFampirantiana",
        components:{
          modale
        },
        data(){
            return{
                
                listaFampirantiana:[],
                Daty:this.$route.query.datyNalaina,
                Ora:this.$route.query.oraNalaina,
                mampisehoHafatra:false,
                btnFanavaozana:false
      

            }
        },
        methods:{

          // FAMPISEHOANA FANAVAOZANA
          FampisehoanaBtnFanavaozana:function(){
            this.btnFanavaozana =! this.btnFanavaozana;
          } ,

          // MAKA ANJARA
          MakaAnjara(daty,ora){
            this.$router.push({ query:{ datyNalaina: daty,oraNalaina: ora}});
            this.mampisehoHafatra=true;
            this.btnFanavaozana=false;
          },





          // DATY

          formatDate(date){
          // Tableaux de traduction pour les jours et les mois en malgache
    const jours = ['Alahady', 'Alatsinainy', 'Talata', 'Alarobia', 'Alakamisy', 'Zoma', 'Sabotsy'];
    const mois = ['Jan', 'Febr', 'Mar', 'Apr', 'Mey', 'Jon', 'Jol', 'Aog', 'Sept', 'Okt', 'Nov', 'Des'];

    // Convertir la date en objet Date
    const dateObj = new Date(date);

    // Extraire le jour de la semaine, le jour du mois, le mois et l'année
    const jourSemaine = jours[dateObj.getDay()];
    const jourMois = dateObj.getDate();
    const moisAnnee = mois[dateObj.getMonth()];
    const annee = dateObj.getFullYear();

    // Construire la date formatée en malgache
    return `${jourSemaine} ${jourMois} ${moisAnnee}`;
        },


                                // DATY FAMPIRATIANA NAVAOZINA
        formatDatyFamp(date){
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



        HafatraFamoakanaPdf:function(){
      this.$swal({
        icon:'success',
        title:"Mankasitraka",
        text:'Mirary soa eh!',
        timer:2500,
        showConfirmButton:false
      })
      },

      // MAMPISEHO
      mampisehoNaTsia:function(){
            this.mampisehoHafatra = !this.mampisehoHafatra;
            this.$router.push('/LisitraFampirantiana');
        },
        // HAMOAKA NY TARATASY HATAO PIRINTY


        generatePdf() {
          this.HafatraFamoakanaPdf();
  const element = document.getElementById("pdf-content");

  // Adjust scale to fit the content on one page
  html2canvas(element, { scale: 3 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "pt", "a4");

    // Calculate the image dimensions to fit into the PDF page
    const pdfWidth = pdf.internal.pageSize.width;
    const pdfHeight = pdf.internal.pageSize.height;

    // Calculate the necessary scale to fit the content within the PDF dimensions
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // If the content's height exceeds the page height, adjust the height
    const adjustedHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, adjustedHeight);
    // Save the PDF
    pdf.save("Fampirantiana.pdf");
  });
},

        // LISITRA IREO MANANA ANJARA 

            IreoMananaAnjaraFampirantiana:function(){
            axios.get("http://localhost:3000/listaAnjaraFampirantiana").then((response)=>{
                this.listaFampirantiana=response.data;
                this.calculateDateRange();
                
            })
        },


         // Calculate start and end dates
  calculateDateRange() {
    if (this.listaFampirantiana.length > 0) {
      const dates = this.listaFampirantiana.map(item => new Date(item.daty));
      this.startDate = new Date(Math.min(...dates));
      this.endDate = new Date(Math.max(...dates));
    }
  },



        },
         mounted:function(){
            this.IreoMananaAnjaraFampirantiana();
        },
       
        computed: {

          startDateFormatted() {
    return this.uniqueDates.length > 0 ? this.formatDatyFamp(this.uniqueDates[0]) : 'N/A';
  },
  endDateFormatted() {
    return this.uniqueDates.length > 0 ? this.formatDatyFamp(this.uniqueDates[this.uniqueDates.length - 1]) : 'N/A';
  },


  uniqueDates() {
    const dates = new Set(this.listaFampirantiana.map(item => item.daty));
    return Array.from(dates).sort(); // Ensure dates are sorted
  },
  
  weeks() {
    const numWeeks = Math.ceil(this.uniqueDates.length / 7);
    return Array.from({ length: numWeeks }, (_, i) => this.uniqueDates.slice(i * 7, i * 7 + 7));
  },

  currentWeekDates() {
    // Modify as needed if you want to display a specific week
    return this.weeks[0] || [];
  },

  currentWeekHoraires() {
    const datesSet = new Set(this.currentWeekDates);
    return this.horaires.map(horaire => {
      const anjara = {};
      this.currentWeekDates.forEach(date => {
        anjara[date] = horaire.anjara[date] || [];
      });
      return { ora: horaire.ora, anjara };
    });
  },

  horaires() {
    const horaires = {};
    this.listaFampirantiana.forEach(item => {
      if (!horaires[item.ora]) {
        horaires[item.ora] = {};
      }
      if (!horaires[item.ora][item.daty]) {
        horaires[item.ora][item.daty] = [];
      }
      horaires[item.ora][item.daty].push(item);
    });
    return Object.keys(horaires).map(ora => ({ ora, anjara: horaires[ora] }));
  },


        // HAMAFA NY LISITRA REHETRA

    //     HamafaAzyRehetra(){
    //   axios.delete("http://localhost:3000/HamafaAnjara").then(function(){
    //     return window.location.reload();
    //   });
    // },
    // Hamafa(){
    //   this.$swal({
    //     title:"Tena hamafa an'ireo lisitran'ny anjara ve ianao?",
    //     icon:'warning',
    //     showCancelButton:true,
    //     confirmButtonText:'#3085d6',
    //     cancelButtonColor:'#d33',
    //     confirmButtonText:'Eny',
    //     cancelButtonText:'Tsia'
    //   }).then((result)=> {
    //     if(result.isConfirmed){
    //       var mdpAdmin="Jaffrelot";
    //       var mdpEntrer=prompt("Saisissez votre mot de passe");
    //       if(mdpEntrer == mdpAdmin){

    //           this.$swal(
    //         {
    //           icon:'success',
    //           title:'Voafafa soamatsara',
    //           text:'ireo lisitra ny anjara',
    //           timer:2500,
    //           showConfirmButton:false
    //         }
    //       ),
    //       this.HamafaAzyRehetra();

    //       }
    //       else
    //       {
            
    //         this.$swal(
    //         {
    //           icon:'error',
    //           title:'Tsy tontosa ny famafana',
    //           text:"an'ireo lisitra ny anjara",
    //           timer:2500,
    //           showConfirmButton:false
    //         }
    //       )
            
    //       }
          
        
    //     }
    //     else
    //     {
          
    //       this.$swal({
    //         icon:'error',
    //     title:'Tsy tontosa ny famafana',
    //     text:"an'ireo lisitran'ny anjara",
    //     timer:2500,
    //     showConfirmButton:false
    //   }
    //       )
    //     }
    //   })
    // },



}
}
    </script>
<style scoped>
  .center-hr {
  text-align: center;
}

.center-hr hr {
  display: inline-block;
  width: 100%; /* Ajustez la largeur selon vos besoins */
}
  hr{

    border: 2px solid rgb(0, 0, 0);
    font-weight: bold;
  }
  .misitaka{
    /* border: 1px solid black; */
    margin: 20px;
  }
  .btn.btn-secondary,.btn.btn-primary,.btn.btn-warning{
    font-size: 25px;
    color: azure;
    font-weight: 500;
  }
  .btn.btn-success{
    width: 90px;
    padding: 0px;
    margin: 0px;
  }
    #pdf-content{
    /* border: 1px solid black; */
    padding: 47px;
  }

  .datyDebFin{
    color: rgb(29, 29, 29);
    font-size: 25px;
  }
  .gras{
    color:black;
    font-weight: 600;
  }
  /* Existing styles */
  .fanamarihana{
    color: black;
    font-weight: bold;
  }
  .table-dark {
    background-color: rgba(40, 127, 186);
    color: white;
  }
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(39, 39, 39, 0);
  }
  .table-striped tbody tr:nth-of-type(even) {
    background-color: rgb(244, 244, 244);
    color: rgb(0, 0, 0);
  }


  table {
    /* border: 1px solid black; */
    border-collapse: collapse;
    width: 100%;
    
  }

  th{
    font-size: 16px;
    border: 1px solid black;
  }

  td {

    /* border:1px solid rgba(36, 35, 35, 0.90); */
    /* font-family: normal; */
    /* padding: 7px; */
    font-size: 17px;
    border: 1px solid black;
  }
  /* .table-dark {
    padding: 6px;
  } */

  .daty, .Mpitondra {
    width: 750px;
  }

  p {
    color: black;
    font-size: 20px;
  }

  td,th{
    padding: 4px;
    text-align: center;
    vertical-align: middle;
  }


  thead th {
    background-color: #d1d1d1; 
    font-weight: bold;
  }



  
  </style>
  