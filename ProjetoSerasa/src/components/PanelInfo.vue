<template>
  <div id="General">
    <div id="GenePanel">
      <h3 id="Title">Dados da empresa</h3>
      <div id="panelDetalComp">
        <div id="SubName">
          <span id="SpanComp">Empresa</span>
          <span id="SpanCnpj">Cnpj</span>
          <span id="SpanAddress">Endereço</span>
        </div>
        <div id="InfoSpan" v-for="info in InfoScoreComp" :key="info.ID">
          <span id="SpanInfo">{{info.NameComp}}</span>
          <span id="SpanInfo">{{info.Cnpj}}</span>
          <span id="SpanInfo">{{info.Address}}</span>
        </div>
      </div>
      <div id="PanelData1">
        <div id="PanelData2" @click="OpenRoute">
          <span id="spanSub">Débitos Pendentes</span>
        </div>
        <div id="PanelData2" @click="OpaneScore">
          <span id="spanSub">Score</span>
        </div>
      </div>
      <div id="divBtns">
        <h1>
          <i class="far fa-file-alt"></i>
        </h1>
        <input type="file" name="arquivo" accept=".txt" id="InputFile" @change="onFileSelected" />
        <button id="Btn" @click="UploadFile">Upload Arquivo</button>
        <button id="Btn" @click="Finish">Sair</button>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  //method para declarar variaveis local
  data: function() {
    return {
      selectedFile: null,
      score: 0,
      idComp: 0,
      open_Debt: 0,
      launch_NF: 0,
      valueScore: this.$store.state.InfoDebt
    };
  },
  computed: {
    InfoScoreComp() {
      return this.$store.state.InfoScoreComp;
    }
  },
  methods: {
    //Method para ir a tela de Débitos Pendentes
    OpenRoute: function() {
      this.$router.push("PanelDebt");
    },
    //Method para ir a tela de Score
    OpaneScore: function() {
      this.$router.push("PanelScore");
    },
    //Method para finalizar a consulta
    Finish: function() {
      let Return = confirm("Deseja realmente sair??");
      if (Return == true) {
        this.$store.state.GlobalScore = [];
        this.$store.state.InfoScoreComp = [];
        this.$store.state.InfoDebt = [];
        this.$router.push("SelectCompany");
      }
    },
    // Buscando o arquivo.txt
    onFileSelected: function(event) {
      this.selectedFile = event.target.files;
      //Buscando os valores do arrey de Objetos
      for (let i = 0; i < this.valueScore.length; i++) {
        this.score = this.valueScore[i].scoreComp;
        this.launch_NF = this.valueScore[i].launchNF;
        this.open_Debt = this.valueScore[i].openDebt;
        this.idComp = this.valueScore[i].id;
        console.log(this.idComp);
        console.log(
          "DEBITO ",
          this.open_Debt,
          "NF ",
          this.launch_NF,
          "SCORE",
          this.score
        );
      }
    },
    //Ler o arquivo.txt e realizar o para API
    UploadFile: function() {
      let file = this.selectedFile[0];
      let json = [];
      let Score = this.score;
      let openDebt = this.open_Debt;
      let launchNF = this.launch_NF;
      let ID = this.idComp;
      let key = 0;
      let self = this;
      if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(evt) {
          json = JSON.parse(evt.target.result);

          json.forEach(el => {
            openDebt += el.openDebt;
            launchNF += el.launchNF;
          });
          //Regra de calculo de débitos pagos
          for (let i = 1; i <= launchNF; i++) {
            let porcentagem = 0;
            porcentagem = (Score * 2.0) / 100;
            Score = Math.round(Score + porcentagem);
          }
          //Regra de calculo de débitos pendentes
          for (let i = 1; i <= openDebt; i++) {
            let porcentagem = 0;
            porcentagem = (Score * 4.0) / 100;
            Score = Math.round(Score - porcentagem);
          }
          //Se o resultado do calculo do score for maior que 100. o valor da score será  100
          if (Score > 100) {
            Score = 100;
          }
          //Se o resultado do calculo do score for menor que 1. o valor da score será 1
          else if (Score < 1) {
            Score = 1;
          }
          self.$store.state.InfoDebt = [
            {
              id: ID,
              scoreComp: Score,
              launchNF: launchNF,
              openDebt: openDebt
            }
          ];

          for (let i = 0; i < self.$store.state.InfoScoreComp.length; i++) {
            key = self.$store.state.InfoDebt[i].id;
          }
          self.$store.state.GlobalScore[key - 1].NameComp = self.$store.state.GlobalScore[key - 1].NameComp
          console.log(self.$store.state.GlobalScore[key - 1]);
          self.$store.state.GlobalScore[key - 1].ID = ID;
          self.$store.state.GlobalScore[key - 1].score = Score;

          //Utilizando axios para realizar o put para API
          axios.put(`https://localhost:44348/api/InfoScore/${ID}`, {
            id: 5,
            launchNF: launchNF,
            openDebt: openDebt,
            scoreComp: Score
          });
          alert("Atualizado com sucesso!!");

          //axios.get(`https://localhost:44348/api/InfoScore/${ID}`).then(company => {
          //self.$store.state.InfoDebt = company.data
          //console.log(self.$store.state.InfoDebt)
        };
        reader.onerror = function() {
          console.log("error reading file");
        };
      }
    }
  }
};
</script>

<style>
#Title {
  color: black;
}
#General {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  user-select: none;
}
#GenePanel {
  margin: auto;
  background-color: rgb(252, 252, 252);
  width: 650px;
  height: 400px;
  box-shadow: 0px 0px 1px rgb(182, 180, 181);
  position: relative;
  display: flex;
  flex-direction: column;
}
#PanelData1 {
  margin-top: 20px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  height: 120px;
  width: 98%;
  border-radius: 15px;
}
#PanelData2 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 98%;
  height: 90px;
  cursor: pointer;
  border-radius: 15px;
  margin-top: 5px;
  margin-left: 5px;
  background-color: rgb(243, 243, 243);
}
#PanelData2:hover {
  transition: all 0.5s;
  color: rgb(206, 50, 172);
  box-shadow: 0px 0px 0px 1px rgb(206, 50, 172);
}
#panelDetalComp {
  padding: 5px 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 1px rgb(221, 221, 221);
  width: 90%;
  height: 50px;
  margin-left: 5%;
  background-color: #ffff;
}
#SubName {
  justify-content: center;
  min-width: 95%;
  margin: auto;
  color: black;
  font-size: 18px;
}
#SpanComp {
  margin-left: 30%;
}
#SpanCnpj {
  margin-left: 20%;
}
#SpanAddress {
  margin-left: 25%;
}
#InfoSpan {
  display: flex;
  min-width: 95%;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-size: 14px;
}
#SpanInfo {
  float: left;
  margin-left: 15%;
}
#divBtns {
  display: flex;
  align-items: center;
  margin: auto;
  margin-top: 10px;
  min-width: 60%;
  min-height: 100px;
}
#Btn {
  cursor: pointer;
  border: none;
  color: #fff;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 20px;
  border-radius: 3px;
  height: 35px;
  width: 150px;
  outline: none;
  background-color: rgb(206, 50, 172);
}
#Btn:hover {
  transition: all 0.6s;
  background-color: rgb(230, 86, 210);
}
#InputFile {
  width: 30px;
  height: 30px;
  cursor: pointer;
  align-items: center;
  position: absolute;
  opacity: 0;
}
h1 {
  color: rgb(206, 50, 172);
}
</style>