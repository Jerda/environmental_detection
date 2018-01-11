export default {
    install(Vue,options)
    {
        Vue.prototype.message = function (response) {
            if (response.data.status === undefined) {
                return this.$message(response.data.msg);
            }

            if (response.data.status === 1 && response.data.data === undefined) {
                return this.$message.success(response.data.msg);
            } else {
                return this.$message.error(response.data.msg);
            }
        }
    }
}