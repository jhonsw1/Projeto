<template>
  <div id="General">
    <div id="GenePanel">
      <h3 id="Title">Dados da empresa</h3>

      <div id="panelDetalComp">
        <span id="SubNames">Empresa</span>

        <div v-for="info in InfoScoreComp" :key="info.ID" id="Info">{{info.NameComp}}</div>

        <span id="SubNames">Cnpj</span>
        <div v-for="info in InfoScoreComp" :key="info.ID" id="Info">{{info.Cnpj}}</div>
        <span>Endereço</span>
        <div v-for="info in InfoScoreComp" :key="info.ID" id="Info">{{info.Address}}</div>
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
  data: function() {
    return {
      selectedFile: null,
      valueScore: this.$store.state.InfoScoreComp,
      score: 0,
      idComp: 0,
      open_Debt: 0,
      launch_NF: 0,
      value_Debt: 0
    };
  },
  computed: {
    InfoScoreComp() {
      return this.$store.state.InfoScoreComp;
    }
  },
  methods: {
    OpenRoute: function() {
      this.$router.push("PanelDebt");
    },
    Finish: function() {
      let Return = confirm("Deseja realmente sair??");
      if (Return == true) {
        this.$store.state.GlobalScore = [{}];
        this.$store.state.InfoScoreComp = [{}];
        this.$router.push("SelectCompany");
      }
    },
    OpaneScore: function() {
      this.$router.push("PanelScore");
    },
    onFileSelected: function(event) {
      this.selectedFile = event.target.files;
      for (let i = 0; i <= this.valueScore.length; i++) {
        this.score = this.valueScore[i].Score;
        this.launch_NF = this.valueScore[i].LaunchNF;
        this.open_Debt = this.valueScore[i].OpenDebt;
        this.value_Debt = this.valueScore[i].ValueDebt;
        this.idComp = this.valueScore[i].ID;
        onchange = "";
      }
    },
    UploadFile: function() {
      let file = this.selectedFile[0];
      let json = [];
      let id = this.idComp;
      let Score = this.score;
      let openDebt = this.open_Debt;
      let launchNF = this.launch_NF;
      let valueDebt = this.value_Debt;

      if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(evt) {
          json = JSON.parse(evt.target.result);

          json.forEach(el => {
            openDebt = el.openDebt;
            launchNF = el.launchNF;
            valueDebt = el.valueDebt;
          });
          for (let i = 1; i <= launchNF; i++) {
            let porcentagem = 0;
            porcentagem = (Score * 2.0) / 100;
            Score = Math.round(Score + porcentagem);
          }
          for (let i = 1; i <= openDebt; i++) {
            let porcentagem = 0;
            porcentagem = (Score * 4.0) / 100;
            Score = Math.round(Score - porcentagem);
          }
          axios
            .put(`https://localhost:44348/api/InfoScore/${id}`, {
              launchNF: launchNF,
              openDebt: openDebt,
              valueDebt: valueDebt,
              scoreComp: Score
            })
            .then(alert("Atualizado com Sucesso!!!"));
          axios;
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
  background-color: rgb(252, 252, 252);
  max-width: 80%;
  min-height: 400px;
  box-shadow: 0px 0px 1px rgb(182, 180, 181);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  box-shadow: 0px 0px 1px rgb(221, 221, 221);
  width: 90%;
  height: 50px;
  margin-left: 5%;
  background-color: #ffff;
}
#Info {
  display: flex;
  width: 180px;
  margin-top: 20px;
  margin-left: -100px;
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