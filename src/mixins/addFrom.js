import {mapGetters} from "vuex";
import _ from 'lodash'

export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          lodash: _,
          addFormProps: {}
        }
      },
      computed: {
        ...mapGetters({}),
      },
      methods: {
        addFormPropsChange(data) {
          this.addFormProps = data;
        }

      }
    })
  }
}
