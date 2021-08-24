import Form from "./../../ChatBox/Form";
import Shipping from "./../../ChatBox/Shipping";
import GoogleMap from "../../../common/GoogleMap";

export const steps = [
  {
    id: 'start',
    message: `Chào User, bạn cần giúp đỡ gì...`,
    trigger: 'ask',
  },
  {
    id: 'name',
    message: `Bạn cần giúp đỡ gì ạ?`,
    trigger: 'ask',
  },
  {
    id: 'ask',
    options: [
      { value: 1, label: 'Giờ mở cửa', trigger: 'time_open' },
      { value: 2, label: 'Địa chỉ cửa hàng', trigger: 'address' },
      { value: 3, label: 'Chi tiết đơn hàng', trigger: 'product_detail' },
      { value: 4, label: 'Thông tin phí vận chuyển', trigger: 'ship_detail' }
    ]
  },
  {
    id: 'time_open',
    message: 'Cửa hàng mở từ 8h - 21h',
    trigger: 'name',
  },
  {
    id: 'product_detail',
    message: 'Nhập mã đơn hàng...',
    trigger: 'search',
  },
  {
    id: 'search',
    user: true,
    trigger: 'detail',
  },
  {
    id: 'detail',
    component: <Form />,
    trigger: 'name',
  },
  {
    id: 'address',
    component: <GoogleMap />,
    trigger: 'name',
  },
  {
    id: 'ship_detail',
    component: <Shipping />,
    trigger: 'name',
  }
]