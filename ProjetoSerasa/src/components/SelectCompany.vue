<template>
  <div>
    <div class="Panel">
      <select v-model="CompSelect">
        <option value="0" selected disabled>Selecione a empresa</option>
        <option
          :value=" nameCompany.id"
          v-for="nameCompany in CompInf"
          :key="nameCompany.id"
        >{{nameCompany.nameComp}}</option>
      </select>
      <button @click="advanceScreen" id="btn">Avançar</button>
    </div>
  </div>
</template>
<script>
//Declarando axios para o projeto
const axios = require("axios");
export default {
  //Method de declaração de variaveis local
  data: function() {
    return {
      CompSelect: 0,
      CompInf: [],
      GeneInfScore: []
    };
  },
  //Method para realizar o get somente depois que a tela estiver renderizada
  mounted() {
    //Utilizando axios para realizar o get
    axios
      .get("https://localhost:44348/api/company")
      .then(company => (this.CompInf = company.data));
    axios
      .get("https://localhost:44348/api/InfoScore")
      .then(score => (this.GeneInfScore = score.data));
  },
  methods: {
    //Method que busca o indice da empresa selecionada na option e armazena na store
    advanceScreen: function() {
      if (this.CompSelect > 0) {
        this.$store.commit("InfoAPIcomp", {
          ID: this.CompInf[this.CompSelect - 1].id,
          NameComp: this.CompInf[this.CompSelect - 1].nameComp,
          Cnpj: this.CompInf[this.CompSelect - 1].cnpj,
          Address: this.CompInf[this.CompSelect - 1].address
        });
        this.$store.commit("InfoDebt", {
          id: this.CompSelect,
          scoreComp: this.GeneInfScore[this.CompSelect - 1].scoreComp,
          launchNF: this.GeneInfScore[this.CompSelect - 1].launchNF,
          openDebt: this.GeneInfScore[this.CompSelect - 1].openDebt,
          valueDebt: this.GeneInfScore[this.CompSelect - 1].valueDebt
        });
        for (let i = 0; i < this.CompInf.length; i++) {
          this.$store.commit("InfoGlobalScore", {
            NameComp: this.CompInf[i].nameComp,
            ID: this.CompInf[i].id,
            score: this.GeneInfScore[i].scoreComp
          });
        }
      
        // Depois de armazenar os valores na store, ira buscar a próxima tela
        this.$router.push("PanelInfo");
      } else {
        // Se this.CompSelect for igual a 0
        alert("ATENÇÃO!! SELECIONE UMA EMPRESA PARA AVANÇAR...");
      }
    }
  }
};
</script>

<style>
.Panel {
  background-color: #ffff;
  margin-left: 40%;
  margin-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;
  width: 20%;
  box-shadow: 0px 0px 0px 1px rgb(255, 227, 241);
  border-radius: 3px;
}
#selectCompany {
  height: 35px;
  width: 200px;
  cursor: pointer;
  outline: none;
}
#btn {
  margin-top: 80px;
  cursor: pointer;
  border: none;
  color: #fff;
  border-radius: 3px;
  height: 35px;
  width: 150px;
  outline: none;
  background-color: rgb(206, 50, 172);
}
#btn:hover {
  transition: all 0.6s;
  background-color: rgb(230, 86, 210);
}
</style>