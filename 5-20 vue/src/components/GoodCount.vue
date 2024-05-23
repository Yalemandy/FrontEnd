<template>
  <div class="count">
    <button class="min" @click="delgoodsnum()" >-</button>
    <input type="Number" class="inp" :value="goodsnum">
    <button class="add" @click="addgoodsnum()">+</button>
  </div>
</template>

<script>
export default {
    props:{
        goodsnum:{
            typeof:Number,
            default:1
        }
    },
    methods:{
        delgoodsnum(){
            if(this.goodsnum>1)
            {
                this.$emit('delgoodsnum',this.goodsnum-1);
            }
        },
        addgoodsnum(){
            this.$emit('addgoodsnum',this.goodsnum+1);
        }
    }
}
</script>

<style scoped>
.count{
    width: 110px;
    height: 30px;
    display: flex;
}
.min{
  width: 30px;
  height: 30px;
  background-color: #f3f3f3;
  text-align: center;
  border: 0;
}
.inp{
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 0;
    background-color:#f3f3f3 ;
    margin: 0 5px;
}
.add{
    width: 30px;
  height: 30px;

  text-align: center;
  background-color: #f3f3f3;
  text-align: center;
  border: 0;
}
</style>