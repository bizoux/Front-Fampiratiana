<template>
  
  <div class="fond">
    <header class="header">
      <a href="#" class="logo">Mi.Famp</a>
      <!-- <img src="../image/LogoFamp.png" alt="LogoFamp"> -->

      <!-- Menu -->
      <nav class="navbar">
         
        <router-link to="/" class="active">Fampirantiana</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button v-on:click="Hampiseho" class="btn btn-info">Fanampiana</button>
        <!-- <router-link to="/MpiaraManompo">Fanampiana</router-link>&nbsp;
         -->
         <!-- <router-link to="/Apropos">Micro</router-link> -->
         
      </nav>

    </header>
    <br>

<div style="display: flex;justify-content: center;align-items: center;">
    <div style="display: inline-block;">
    <center>
      
      <h2>FAMENOANA NY ANJARA FANAOVANA FAMPIRANTIANA</h2>
    
    </center>
    <br>
    
  

    <div class="alignement">
      
      <div class="inputDate">
        <label for="start-date" class="form-label" style="color: white;"><b>Daty fampirantiana:&nbsp;</b></label>
        <input type="date" id="start-date" v-model="startDate" class="form-control" @change="updateDateRange" />
      </div>
      <div>
        
        <router-link to="/LisitraFampirantiana" class="btn btn-primary">Hijery lisitra</router-link>
      
      </div>
    
    </div><br>

  </div>
  <div>
    <router-link to="/MpiaraManompo"><img src="../image/LogoFamp.png" alt="LogoFamp" style="height: 400px;"></router-link>
  </div>
</div>


    <form>
      <div>
        <!-- Affichage des semaines -->
        <div v-for="(week, weekIndex) in weeks" :key="weekIndex">
          <!-- <h3>Semaine {{ weekIndex + 1 }}</h3> -->
          <table>
            <thead>
              <tr>
                <th>Ora</th>
                <th v-for="(date, dateIndex) in week" :key="dateIndex">
                  {{ formatDate(date) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(Ora, timeIndex) in OraHanompoana" :key="timeIndex">
                <td>{{ Ora.OraFampiratiana }}</td>
                <td v-for="(date, dateIndex) in week" :key="dateIndex">
                  <div>
                    <AutoComplete
                      v-model="selectedMpiaraManompo[weekIndex][dateIndex][timeIndex][0]"
                      :suggestions="filteredMpiaraManompo"
                      @complete="searchMpiaraManompo"
                      :virtualScrollerOptions="{ itemSize: 38 }"
                      optionLabel="anarana"
                      dropdown
                    />
                    <AutoComplete
                      v-model="selectedMpiaraManompo[weekIndex][dateIndex][timeIndex][1]"
                      :suggestions="filteredMpiaraManompo"
                      @complete="searchMpiaraManompo"
                      :virtualScrollerOptions="{ itemSize: 38 }"
                      optionLabel="anarana"
                      dropdown
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br>
      <center><input type="button" value="Hampiditra" class="btn btn-primary" @click="HampiditraAnjaraFamp()"></center>
    </form>
    <!-- <button @click="generatePDF">generer</button> -->
  </div>
  <footer>
    
    <div class="lienSite">
        <a href="#">Facebook</a>
        <a href="#">Linkedin</a>
        <a href="#">Instagram</a>
    </div>
            
    
            <p>&copy; Copyright 2024 Jaffrelot,Tous droits réservés</p>
            
    </footer>
    <Fanampiana v-bind:mampiseho="mampiseho" v-bind:asehoNaTsia="asehoNaTsia" v-bind:mampiseho2="mampiseho2" v-bind:asehoNaTsia2="asehoNaTsia2"></Fanampiana>
    <FanampianaFanavaozana v-bind:mampiseho2="mampiseho2" v-bind:asehoNaTsia2="asehoNaTsia2"></FanampianaFanavaozana>
</template>

<script>
import moment from 'moment';
import jsPDF from 'jspdf';
import axios from 'axios';
import AutoComplete from 'primevue/autocomplete';
import Fanampiana from "./FanampianaFampiasanaAzy.vue";
import FanampianaFanavaozana from "./FanampianaFanavaozana.vue";
export default {
  name: 'FamenoanaAnjaraFampirantiana',
  components: {
    AutoComplete,Fanampiana,FanampianaFanavaozana
  },
  data() {
    return {
      
      filteredMpiaraManompo: [], // Ajouter cette propriété pour les suggestions filtrées
      listaMpiaraManompo: [],     
      OraHanompoana: [],
      selectedMpiaraManompo: [],
      weeks: [],
      startDate: moment(this.DatyAzo).format('YYYY-MM-DD'), // Date de début par défaut
      DatyAzo:'',
      mampiseho:true,
      mampiseho2:false
    };
  },
  mounted() {
    this.initializeData();
    this.ListaMpiaraManompo();
    this.Daty();
  },
  methods: {

    // MAMPISEHO
    asehoNaTsia:function(){
            this.mampiseho = !this.mampiseho;
        },

        asehoNaTsia2:function(){
            this.mampiseho2 = !this.mampiseho2;
        },

    // hampiseho fanamarihana
    Hampiseho:function(){
      this.mampiseho=true;
    },

    // HAFATRA FANAMARIHANA
    HafatraFampidirana:function(){
      this.$swal({
        icon:'success',
        title:"Tafiditra soamatsara ny anjaran'ny tsirairay",
        text:'Mirary soa eh!',
        timer:2500,
        showConfirmButton:false
      })
      },


    // LISITRA HAVOAKA PDF
    generatePDF() {
      const doc = new jsPDF();

      // Marges et dimensions de base
      const margin = 10;
      const cellWidth = (doc.internal.pageSize.width - margin * 2) / (this.weeks[0].length + 1);
      const cellHeight = 10;
      let startY = 20;

      // Affichage des en-têtes des colonnes
      doc.setFontSize(12);
      doc.text('Ora', margin + cellWidth / 2, startY);
      this.weeks[0].forEach((date, index) => {
        doc.text(this.formatDate(date), margin + cellWidth * (index + 1) + cellWidth / 2, startY, { align: 'center' });
      });

      startY += cellHeight;

      // Affichage des données des créneaux horaires et des noms
      this.OraHanompoana.forEach((timeSlot, timeIndex) => {
        let startX = margin;
        // Affichage de l'heure
        doc.text(timeSlot.OraFampiratiana, startX + cellWidth / 2, startY, { align: 'center' });
        startX += cellWidth;

        // Affichage des noms
        this.weeks[0].forEach((_, dateIndex) => {
          const selections = this.selectedMpiaraManompo[0]?.[dateIndex]?.[timeIndex];
          let names = '';

          if (selections) {
            const [anarana1, anarana2] = selections;
            names = `${anarana1 ? anarana1.anarana : ''} / ${anarana2 ? anarana2.anarana : ''}`;
          }

          doc.text(names, startX + cellWidth / 2, startY, { align: 'center' });
          startX += cellWidth;
        });

        startY += cellHeight;
      });

      // Télécharger le PDF
      doc.save('fandaharam-pampirantiana.pdf');
    },

    searchMpiaraManompo(event) {
      let query = event.query.toLowerCase();
      this.filteredMpiaraManompo = this.listaMpiaraManompo.filter((MpiaraManompo) =>
        MpiaraManompo.anarana.toLowerCase().includes(query)
      );
    },




    // LISITRAN'NY ANARAN'NY MPIARA-MANOMPO
    ListaMpiaraManompo: function () {
      axios.get('http://localhost:3000/listaMpiaramanompo').then((response) => {
        this.listaMpiaraManompo = response.data;
      });
    },

    // DATY AMIN'IZAO
    Daty: function () {
      axios.get('http://localhost:3000/Daty').then((response) => {
        this.DatyAzo = response.data[0].Daty;
        // this.startDate = moment(this.DatyAzo).format('DD-MM-YYYY');
      });
    },


    // HAMPIDITRA ANJARA FAMPIRANTIANA
    HampiditraAnjaraFamp: function () {
      const dataToSend = [];
      for (let weekIndex = 0; weekIndex < this.weeks.length; weekIndex++) {
        for (let timeIndex = 0; timeIndex < this.OraHanompoana.length; timeIndex++) {
          for (let dateIndex = 0; dateIndex < this.weeks[weekIndex].length; dateIndex++) {
            const selections = this.selectedMpiaraManompo[weekIndex]?.[dateIndex]?.[timeIndex];
            if (selections) {
              const [anarana1, anarana2] = selections;
              const ora = this.OraHanompoana[timeIndex].OraFampiratiana;
              const daty = this.weeks[weekIndex][dateIndex];

              if (anarana1 && anarana2) {
                dataToSend.push({ daty, ora, anarana1: anarana1.anarana, anarana2: anarana2.anarana });
              }
            }
          }
        }
      }

      axios
        .post('http://localhost:3000/HampiditraAnjaraFampiratiana', dataToSend)
        .then((response) => {
          this.HafatraFampidirana();
          console.log('Toutes les données ont été envoyées avec succès.');
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi des données:", error);
        });
    },


    // RESAKA FANDAMINANA NY DATY
    formatDate(date) {
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
      return `${jourSemaine} ${jourMois} ${moisAnnee} ${annee}`;
    },

    updateDateRange() {
      this.initializeData();
    },

    initializeData() {
      const numberOfDays = 21; // Trois semaines
      const allDates = generateDateRange(this.startDate, numberOfDays);
      this.weeks = chunkArray(allDates, 7); // Diviser les dates en semaines de 7 jours

      this.OraHanompoana = [
        { OraFampiratiana: '8:30-10:00', idOra: 1 },
        { OraFampiratiana: '10:00-11:30', idOra: 2 },
        { OraFampiratiana: '02:00-03:30', idOra: 3 },
        { OraFampiratiana: '03:00-05:30', idOra: 4 }
      ];

      // Initialiser selectedMpiaraManompo pour les semaines
      this.selectedMpiaraManompo = this.weeks.map((week) =>
        week.map(() => this.OraHanompoana.map(() => ["", ""]))
      );
    }
  }
};

// Fonction pour diviser un tableau en sous-tableaux de longueur fixe
function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

// Fonction pour générer une plage de dates
function generateDateRange(startDate, numberOfDays) {
  const dates = [];
  const start = new Date(startDate);
  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    dates.push(currentDate.toISOString().split('T')[0]); // Format YYYY-MM-DD
  }
  return dates;
}
</script>

<style scoped>

/* neuromorhism */
/* 
button{
  background: #dde1e7;
  box-shadow:5px 5px 8px #cbcfd5, -5px -5px 8px #eff3f9;
  border: 0px;
}
button:hover{
  box-shadow:inset 5px 5px 8px #cbcfd5, -5px -5px 8px #eff3f9;
} */
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
    background: linear-gradient(235deg,#00d9ff,#010645a2,#00bcd4);
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
.alignement{
  display: flex;
  justify-content: center;
}

  .btn-primary{
    /* border: 1px solid black; */
    padding: 10px;
    width: 150px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 600;
    margin: 10px;
    
  }
  .inputDate{
    /* border: 1px solid black; */
    width: 350px;
    display: flex;
  }

  label{
    /* border: 1px solid black; */
    padding: 10px;
  }

   table {
    background-color: white;
    border: 1px solid 1px solid rgba(0, 0, 0, 0.432);
  }
  
  tr,td,th {
    border: 1px solid rgba(0, 0, 0, 0.432);
    text-align: center;
  
  }
  
  th {  
  
    border: 1px solid rgba(0, 0, 0, 0.432);
  
  }
  h2{
    text-decoration: underline;
    color: rgba(200, 224, 243, 0.89);
    letter-spacing: 4px;
    font-family: monospace;
    font-weight: 600;
    background: linear-gradient(90deg, #66c9bc, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  footer{
     background-color: rgba(3, 3, 29, 0.945);
     height: auto;
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
