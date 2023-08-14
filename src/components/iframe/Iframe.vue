<template>
    <iframe :src="src"  frameborder="0"></iframe>
</template>

<script>
export default {
    props : {
        src : {
            type : String,
            required:true,
        }
    }
}
</script>

<style lang="less" scoped>
iframe {
    width: 100%;
    height: 100%;
}
</style>