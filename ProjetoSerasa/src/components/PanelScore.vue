<template>
  <div class="General">
    <div id="PanelScore">
      <div id="PanelScoreValue">
        <span v-for="info in dataScore" :key="info.ID" id="FontSpan">{{info.scoreComp}}</span>
        <span>de 100</span>
      </div>
      <div id="ResScore">
        <span>Seu score está {{this.statusScore}}</span>
      </div>
      <h2>Ranking</h2>
      <div id="Ranking">
        <div id="SubName">
          <h4>Score</h4>
          <h4>Empresa</h4>
        </div>
        <div id="divRankGene">
          <div v-for="info in arreyRank" :key="info.ID" id="divRank">
            <span id="spanScore">{{info.score}}</span>
            <span id="spanName">{{info.NameComp}}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="btn" @click="ComeBack">Voltar</button>
    </div>
  </div>
</template>
<script>
export default {
  //Method para declaração de variaveis local
  data: function() {
    return {
      arreyScore: [{}],
      valueScore: 0,
      statusScore: "",
      arreyRank: [],
      GeneInfScore: 0,
      CompInf: 0
    };
  },
  computed: {
    //Method para Buscar os valores da store
    dataScore: function() {
      return this.$store.state.InfoDebt;
    },
    RankScore: function() {
      return this.$store.state.GlobalScore;
    }
  },
  // method para realizar a lógica para o Rank de empresas
  mounted() {
    // Buscando os valores do arrey da store e armazenando para uma variavel local 
    this.arreyRank = this.$store.state.GlobalScore;

    let aux = [];
    for (let i = 0; i < this.arreyRank.length; i++) {
      for (let j = i + 1; j < this.arreyRank.length; j++) {
        if (this.arreyRank[i].score < this.arreyRank[j].score) {
          aux[i] = this.arreyRank[i];
          this.arreyRank[i] = this.arreyRank[j];
          this.arreyRank[j] = aux[i];
        }
      }
    }
  },
  created() {
    //Realizando a lógica de posição do Score
    this.arreyScore = this.$store.state.InfoDebt;
    for (let i = 0; i < this.arreyScore.length; i++) {
      this.valueScore = this.$store.state.InfoDebt[i].scoreComp;
      if (this.valueScore >= 0 && this.valueScore <= 20) {
        this.statusScore = "Ruim";
      } else if (this.valueScore <= 40) {
        this.statusScore = "Regular";
      } else if (this.valueScore <= 70) {
        this.statusScore = "Normal";
      } else {
        this.statusScore = "Bom";
      }
    }
  },
  methods: {
    //Method para retornar a tela anterior 'SelectCompany'
    ComeBack: function() {
      this.$router.push("PanelInfo");
    }
  }
};
</script>

<style>
.General {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  min-width: 30%;
  margin-left: 25%;
  user-select: none;
  margin: auto;
}
#PanelScore {
  background-color: #ffffff;
  min-width: 25%;
  margin-left: 10px;
  min-height: 520px;
  display: flex;
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0px 0px 0px 1px rgb(240, 239, 239);
}
#PanelScoreValue {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 33%;
  min-height: 100px;
  max-width: 100px;
  border-radius: 100px;
  box-shadow: 6px 6px 10px green;
}
#FontSpan {
  color: rgb(206, 50, 172);
  font-size: 37px;
}
#ResScore {
  margin-top: 15px;
}
#Ranking {
  background-color: #fff;
  margin-left: 8%;
  min-width: 84%;
  min-height: 250px;
  box-shadow: 0px 0px 0px 1px rgb(253, 248, 252);
  margin: auto;
}
.btn {
  cursor: pointer;
  border: none;
  color: #fff;
  margin-top: 20px;
  margin-left: 10px;
  border-radius: 3px;
  height: 35px;
  width: 150px;
  outline: none;
  background-color: rgb(206, 50, 172);
}
.btn:hover {
  transition: all 0.6s;
  background-color: rgb(230, 86, 210);
}
#divRankGene {
  margin: auto;
  min-width: 80%;
}
#divRank {
  cursor: pointer;
  display: flex;
  min-width: 97%;
  margin: auto;
  margin-top: 10px;
  border-bottom: 1px solid rgb(252, 246, 246);
}
#SubName {
  display: flex;
  justify-content: center;
  height: 40px;
  width: 70%;
  margin-left: -40px;
}
h4 {
  margin-left: 20%;
}
#spanScore {
  margin-left: 25%;
}
#spanName {
  margin-left: 20%;
}
</style>