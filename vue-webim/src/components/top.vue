<template>
<section>
    <div class="groupInfo">
        <div class="nowrap title" v-if="curGroup">{{curGroup.name}}</div>
        <div class="nowrap description" v-if="curGroup">{{curGroup.description}}</div>
        <div class="btn-group">
            <a class="btn btn-close" @click="handleClose">X</a>
        </div>
    </div>
</section>
</template>

<script>
export default {
    props: ['curGroup', 'handleClose'],
}
</script>

<style lang="less">
.groupInfo{
    padding-left: 10px;
    zoom: 1;
    overflow: hidden;
    .title{
        float: left;
        font-size: 16px;
        font-weight: 600;
        line-height: 40px;
        max-width: 30%;
    }
    .description{
        float: left;
        padding-left: 10px;
        font-size: 12px;
        position: relative;
        top: 14px;
        max-width: 50%;
    }
    .btn-group{
        float: right;
        width: 100px;
        height: 40px;
        padding: 0 8px;
        line-height: 40px;
        .btn{
            display: inline-block;
            padding: 0px 6px;
            box-shadow: 0 0 1px #000;
            border-radius: 3px;
            float: right;
            height: 20px;
            line-height: 20px;
            top: 10px;
            position: relative;
        }
        .btn-close{
            &:hover{
                color: #fff;
                background-color: #ff8181;
            }
        }
    }
}
</style>