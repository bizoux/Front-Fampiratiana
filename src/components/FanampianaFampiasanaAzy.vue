    <template>


        <div class="bloc-modale" v-if="mampiseho">
    
            <div class="overlay" v-on:click="asehoNaTsia()"></div>
            
            <div class="modale card">
    
                <div class="btn-modale btn btn-danger" v-on:click="asehoNaTsia()">X</div>
                <div class="btn-modale2 btn btn-info" v-on:click="asehoNaTsia2()">+</div>


                <center><h1 class="styleTexte">Fomba famenoana ny anjara</h1></center><br>
                <center><h5>Fanamarihana : Rehefa mameno azy dia aza adino mijery ny toromarika ato.</h5></center>
                <h3><span class="havaozina">1-</span> Safidio <span class="havaozina">" ny daty fampirantiana "</span></h3>
                <center><img src="../image/DatyFenoina.png" alt="sary" style="width: 250px;"></center><br>
                
                <h3><span class="havaozina">2- </span>Rehefa vita izay dia <span class="havaozina">" Fenoy ny kazy "</span></h3>
                
                <center><img src="../image/KazyFenoina.png" alt="sary" style="width: 200px;"></center>
                <br>
                
                <h3><span class="havaozina">3-</span> Raha toa ka misy <span class="havaozina">"kazy tsy tiana fenoina"</span> dia manorata soratra eo fotsiny ohatra hoe "a" na izay tianao soratana fa anarana<span class="havaozina"> "tsy anaty lisitra fotsiny".</span></h3>
                <center><img src="../image/TsyFenoina.png" alt="sary" style="width: 200px;"></center><br>
                

                <h3><span class="havaozina">4- </span>Rehefa hampiditra dia tsindrio amin'izay ilay hoe <span class="havaozina">" Hampiditra "</span></h3>
                <center><img src="../image/Hampiditra.png" alt="sary" style="width: 160px;"></center><br>
                
                <center><h5>Tsara ho fantatra : Aza havela ho tsy misy ny kazy fa araho ilay toromarika faha 3</h5></center>
                
                
    
            </div>
            
    
        </div>
    
    
    </template>
    <script>
    export default{
        name:"FanampianaFampiasanaAzy",
        props:['mampiseho','asehoNaTsia','mampiseho2','asehoNaTsia2']
       
    }
    </script>
    <style scoped>
        .havaozina{
            font-size: 25px;
            font-weight: 740;
            
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
            /* border: 1px solid black; */
            text-align: justify;
            width: 800px;
                font-size: 20px;
                font-weight: bold;
                background: linear-gradient(185deg, #c97966, #feb47b);
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
            bottom: 4%;
        }
        .btn-modale{
            position: absolute;
            top: 10px;
            right: 10px;
        }
        .btn-modale2{
            position: absolute;
            top: 10px;
            right: 60px;
            color: white;
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
        h5{
            color: azure;
        }
        </style>