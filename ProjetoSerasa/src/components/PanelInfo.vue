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
        <button id="Btn" @click="Finish">Sair</button>
        <button id="Btn" @click="UploadFile">Upload Arquivo</button>
        <input type="file" name="arquivo" accept=".txt" id="InputFile" />
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data: function() {
    return {};
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
    UploadFile: function() {
      axios
      .get("")
      .then(score => (this.GeneInfScore = score.data));
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
  width: 30%;
  height: 400px;
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
  width: 90%;
}
#Btn {
  cursor: pointer;
  border: none;
  color: #fff;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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
  display: flex;
  cursor: pointer;
  align-items: center;
  position: absolute;
  margin-top: 20px;
}
</style>