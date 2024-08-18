<template>

    <div class="bloc-modale" v-if="mampisehoFampidirana">

        <div class="overlay" v-on:click="asehoNaTsiaFamp()"></div>
        
        <div class="modale card">

            <div class="btn-modale btn btn-danger" v-on:click="asehoNaTsiaFamp()">X</div>
            <h1 class="styleTexte">Hampiditra Mpiara-manompo</h1><br>
            
            <div class="Aucentre">

                <label for="" class="form-label">Anarana</label>
                <input type="text" class="form-control" v-model="anarana" required><br>
            
            </div>
            
            <button class="btn btn-primary" v-on:click="Hampiditra">Hampiditra</button>
            

        </div>
        

    </div>
    
  
</template>

<script>
import axios from "axios";
export default{
    name:'HampiditraMpiaraManompo', 
    props:['mampisehoFampidirana','asehoNaTsiaFamp'],
    data(){
        return{
        
            anarana:"",
            
        }
    },
    methods:{

    // HAFATRA FANAMARIHANA
    HafatraFampidirana:function(){
      this.$swal({
        icon:'success',
        title:"Tafiditra soamatsara i "+this.anarana,
        text:"Mirary soa!",
        timer:3500,
        showConfirmButton:false
      })
      },
    
    HafatraOlana:function(){
        this.$swal({
            icon:'error',
        title:'Misy olana fa hamarino tsara azafady',
        text:"Olana",
        timer:3900,
        showConfirmButton:false
      })
    },

    HafatraFanamarihana:function(){
        this.$swal({
            icon:'warning',
        title:'Fenoy azafady ilay anarana',
        text:"Olana",
        timer:2000,
        showConfirmButton:false
      })
    },

    // HANAVAO NY TABILAO
        Hampiditra:function(){
            
            const Anarana = this.anarana;
            if(Anarana === ""){
                this.HafatraFanamarihana();
            }
            else{
                
                axios.post("https://projet-fampirantiana.vercel.app/fampidirana",{Anarana}).then(response=>{
                    this.HafatraFampidirana();    
                    console.log(response);
                    return window.location.reload();
                }).catch(erreur=>{
                    this.HafatraOlana();
                    console.log(erreur);
                });


        // axios
        // .post('http://localhost:3000/fampidirana', {Anarana})
        // .then((response) => {
        //   console.log('Toutes les données ont été envoyées avec succès.');
        //   this.HafatraFampidirana();
        // })
        // .catch((error) => {
        //     alert("erreur")
        //   console.error("Erreur lors de l'envoi des données:", error);
        // });
         
        }
    
    
    
    }
    

},
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
    bottom: 35%;
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