<template>


    <div class="bloc-modale" v-if="mampiseho2">

        <div class="overlay" v-on:click="asehoNaTsia2()"></div>
        
        <div class="modale card">

            <div class="btn-modale btn btn-danger" v-on:click="asehoNaTsia2()">X</div>
            <center><h1 class="styleTexte">Fomba fanaovana fanavaozana</h1></center><br>
            <h6>Fanamarihana : Rehefa mijery ny lisitra fampirantiana izay vao mihatra ity toromarika ity</h6>
            <h3><span class="havaozina">1-</span> Tsindrio ilay teny hoe <span class="havaozina">" Hampiseho fanavaozana "</span></h3>
            <center><img src="../image/btnFanavaozana.png" alt="sary" style="width: 200px;"></center><br>
            
            <h3><span class="havaozina">2- </span>Rehefa vita izay dia tsindrio ilay teny hoe <span class="havaozina">" havaozina "</span></h3>
            <div class="hahitsy">
                <img src="../image/KazyTabilao.png" alt="sary" style="width: 200px;"><span>=></span>
                <img src="../image/HampisehoFanavaozana.png" alt="sary" style="width: 185px;">
            </div><br>
            

        </div>
        

    </div>


</template>
<script>
export default{
    name:"FanampianaFanavaozana",
    props:['mampiseho2','asehoNaTsia2']
}
</script>
<style scoped>
    .havaozina{
        font-size: 22px;
        font-weight: 700;
    }
    .hahitsy{
        display: flex;
        justify-content: space-around;
    }
    span{
        font-size: 50px;
        font-weight: 600;
    }
    h3{
            font-size: 20px;
            font-weight: bold;
            background: linear-gradient(90deg, #c97966, #feb47b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            /* text-fill-color: transparent; */
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
        bottom: 23%;
    }
    .btn-modale{
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .styleTexte{
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            color:white;
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
