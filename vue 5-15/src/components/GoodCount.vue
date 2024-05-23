<template>
  <div class="count">
    <button class="del" @click="goodnum--">-</button>
    <input type="text" class="inp" :value="goodnum" />
    <button class="add" @click="goodnum++">+</button>
  </div>
</template>

<script>
export default {
    props:{
        goodnum:{
            type:Number,
            default:0
        }
    }
}
</script>

<style>
.count{
    height: 40px;
    width: 120px;
    display: flex;
}
.del{
    background-color: rgb(223, 224, 224);
    height: 30px;
    width: 30px;
    text-align: center;
    border: 0;
}
.inp{
    background-color: rgb(223, 224, 224);
    height: 30px;
    width: 45px;
    text-align: center;
    border: 0;
    line-height: 40px;
    margin: 0 10px;
}
.add{
    background-color: rgb(223, 224, 224);
    height: 30px;
    width: 30px;
    text-align: center;
    border: 0;
}
</style>