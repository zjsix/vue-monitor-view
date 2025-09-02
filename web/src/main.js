import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/style/common.scss'

Vue.config.productionTip = false
import store from './store'

//组件批量注册全局
import components from '@/components';
Vue.use(components);
import 'element-ui/lib/theme-chalk/index.css';

import {
  Message,
  MessageBox,
  DatePicker,
  Form,
  FormItem,
  Input,
  Button,
  Checkbox,
  Link,
  Container,
  Main,
  Menu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Notification,
  Dialog,
  Pagination,
  Select,
  Option,
  Upload,
  Row,
  Col,
  Tag,
  InputNumber,
  Popconfirm,
  Image,
  RadioGroup,
  RadioButton,
  Radio,
  Switch
} from 'element-ui'
Input.props.clearable.default = true
Form.props.labelSuffix = {
  type: String,
  default: ':'
}
Select.props.filterable = {
  type: Boolean,
  default: true
}
TableColumn.props.formatter = {
  type: Function,
  default: (row, column, cellValue) => {
    return !(cellValue === null || cellValue === '' || cellValue === undefined) ? cellValue : '--'
  }
}
Dialog.props.closeOnClickModal = {
  type: Boolean,
  default: false
}
Vue.use(Form).use(FormItem).use(Input).use(Button).use(Checkbox).use(Link).use(Container).use(Main).use(Menu).use(MenuItem).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Table)
  .use(TableColumn).use(Dialog).use(Pagination).use(Select).use(Option).use(Upload).use(Row).use(Col).use(DatePicker).use(Tag).use(InputNumber).use(Popconfirm).use(Image).use(RadioGroup).use(RadioButton).use(Radio).use(Switch)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$notify = Notification;


import { showLoading, hideLoading } from '@/utils/loading'
Vue.prototype.showLoading = showLoading;
Vue.prototype.hideLoading = hideLoading;

import directive from '@/directive'
Vue.use(directive);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
