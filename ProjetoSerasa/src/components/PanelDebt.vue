<template>
  <div id="general">
    <div id="Panel">
      <div>
        <span class="SubName">Entrada de NF</span>
        <div v-for="info in infoDebt" :key="info.id">{{info.launchNF}}</div>
      </div>
      <div>
        <span class="SubName">Débitos Pendentes</span>
        <div v-for="info in infoDebt" :key="info.id">{{info.openDebt}}</div>
      </div>
    </div>
    <button class="Btn" @click="ComeBack">Voltar</button>
  </div>
</template>

<script>
export default {
  computed: {
    //Method que busca as informações da store
    infoDebt() {
     return this.$store.state.InfoDebt;
    },
    Teste() {
        return this.$store.state.teste;
    }
  },
  methods: {
    //Method que retorna para a tela anterior 'SelectCompany'
    ComeBack: function() {
      this.$router.push("PanelInfo");
    }
  }
};
</script>

<style>
#general {
  margin: auto;
  user-select: none;
  max-width: 30%;
  min-height: 100px;
}
.SubName {
  margin-left: 40px;
}
#Panel {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: #ffff;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  box-shadow: 0px 0px 0px 1px rgb(243, 243, 243);
}
.Btn {
  cursor: pointer;
  border: none;
  color: #fff;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 3px;
  height: 35px;
  width: 150px;
  outline: none;
  background-color: rgb(206, 50, 172);
}
.Btn:hover {
  transition: all 0.6s;
  background-color: rgb(230, 86, 210);
}
</style>