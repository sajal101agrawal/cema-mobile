import {
  DAddressIcon,
  EditIcon,
  HomeIcons,
  LocationIcon,
  LogOutIcon,
  MyOrderIcon,
  PaymentIcon,
  PlusIcon,
  PromotIcon,
  RightIcon,
  StarFilIcon,
  WorkIcon,
} from "../assets/icons";
import { RatingUserImage } from "../assets/images";

export const ProfileData = [
  {
    id: 1,
    name: "My orders",
    icon: <MyOrderIcon height={20} width={20} />,
    icon2: <RightIcon />,
  },
  // {
  //   id: 2,
  //   name: "Payment method",
  //   icon: <PaymentIcon height={20} width={20} />,
  //   icon2: <RightIcon />,
  // },
  {
    id: 3,
    name: "Shipping Address",
    icon: <DAddressIcon height={20} width={20} />,
    icon2: <RightIcon />,
  },
  {
    id: 4,
    name: "Billing Address",
    icon: <DAddressIcon height={20} width={20} />,
    icon2: <RightIcon />,
  },
  {
    id: 5,
    name: "Sign out",
    icon: <LogOutIcon height={20} width={20} />,
    icon2: null,
  },
];


export const OrderDetailsData = [
  {
    id: 1,
    orderId: '#601245',
    price: 'KD 150.000',
    status: 'Shipping',
    date: 'Feb 25, 2023 at 8:32 PM',
    collapse: true
  },
  {
    id: 2,
    orderId: '#601245',
    price: 'KD 150.000',
    status: 'Delivered',
    date: 'Feb 25, 2023 at 8:32 PM',
    collapse: true
  },
  {
    id: 3,
    orderId: '#568423',
    price: 'KD 150.000',
    status: 'Delivered',
    date: 'Feb 25, 2023 at 8:32 PM',
    collapse: true
  },
  {
    id: 4,
    orderId: '#568423',
    price: 'KD 150.000',
    status: 'Delivered',
    date: 'Feb 25, 2023 at 8:32 PM',
    collapse: true
  },
  {
    id: 5,
    orderId: '#301587',
    price: 'KD 150.000',
    status: 'Canceled',
    date: 'Feb 25, 2023 at 8:32 PM',
    collapse: true
  },
  {
    id: 6,
    orderId: '#301587',
    price: 'KD 150.000',
    status: 'Canceled',
    date: 'Feb 25, 2023 at 8:32 PM',
    collapse: true
  },

]

export const SEARCH_DATA = [
  {
    image: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fERpbm5pbmclMjByb29tfGVufDB8fDB8fHww',
    count: 87,
    label: 'Home Decoration'
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1661876380455-29b838b2a2ef?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RGlubmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D',
    count: 544,
    label: 'Dinning Room'
  },
  {
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG9mZmljZSUyMHJvb218ZW58MHx8MHx8fDA%3D',
    count: 434,
    label: 'Office Room'
  },
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVkcnJvbXxlbnwwfHwwfHx8MA%3D%3D',
    count: 192,
    label: 'Bed Room'
  },
  {
    image: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fERpbm5pbmclMjByb29tfGVufDB8fDB8fHww',
    count: 987,
    label: 'Living Room'
  },
]

export const DRAWER_ROUTE_DATA = [
  {
    label: 'Categories',
    subLabel: ''
  },
  {
    label: 'Sale',
    subLabel: '(135 items)'
  },
  {
    label: 'New arrivals',
    subLabel: '(285 items)'
  },
  {
    label: 'Best sellers',
    subLabel: '(642 items)'
  },
  {
    label: 'Featured products',
    subLabel: '(168 items)'
  },
]

export const ReviewData = [
  {
    id : 1 ,
    name : 'Abdullah',
    date : '23 Jan',
    icon : <StarFilIcon height={12} width={12}/>,
    rating : '5.0',
    message : 'Lorem Ipsum is simply dummy has been the industry standard a type specimen book. It has survived not only five centuries, but also the leap into electronic.'
  },
  {
    id : 2 ,
    name : 'Yousef',
    date : '23 Jan',
    icon : <StarFilIcon height={12} width={12}/>,
    rating : '5.0',
    message : 'Lorem Ipsum is standard dummy text ever since the 1500s, but also the leap into electronic typesetting, remaining essentially unchanged.'
  },
  {
    id : 3 ,
    name : 'Abdullah',
    date : '23 Jan',
    icon : <StarFilIcon height={12} width={12}/>,
    rating : '5.0',
    message : 'Lorem Ipsum is simply the industry standard took a galley of type and scrambled it to make a type specimen.to'
  },
  {
    id : 4 ,
    name : 'Khaled',
    date : '23 Jan',
    icon : <StarFilIcon height={12} width={12}/>,
    rating : '5.0',
    message : 'Lorem Ipsum is of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting'
  },
  {
    id : 5 ,
    name : 'Abdullah',
    date : '23 Jan',
    icon : <StarFilIcon height={12} width={12}/>,
    rating : '5.0',
    message : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has when an unknown printer took a galley of type and scrambled it to make a type specimen book'
  },
  {
    id : 6 ,
    name : 'Abdullah',
    date : '23 Jan',
    icon : <StarFilIcon height={12} width={12}/>,
    rating : '5.0',
    message : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took but also the leap into electronic typesetting, remaining essentially unchanged.'
  },
  {
    id : 7 ,
    name : 'Fahad',
    date : '23 Jan',
    icon : <StarFilIcon height={12} width={12}/>,
    rating : '5.0',
    message : 'Lorem Ipsum has been the  a galley of type and scrambled it to make a type specimen book. but also the leap into electronic typesetting, remaining essentially unchanged.'
  },
]

export const ModalAddressData = [
  {
    id : 1 ,
    name : 'Home',
    icon : <HomeIcons/>,
    address : '8000 S Kuwait'
  },
  {
    id : 2 ,
    name : 'Work',
    icon : <WorkIcon/>,
    address : '8000 S Kuwait'
  },
  {
    id : 3 ,
    name : 'Other',
    icon : <LocationIcon/>,
    address : '8000 S Kuwait'
  },
]

export const ModalPaymentData = [
  {
    id : 1 ,
    name : ' **** 4864'
  },
  {
    id : 2 ,
    name : ' **** 4864'
  },
  {
    id : 3 ,
    name : null
  }
]

export const PaymentMethodData = [
  {
    id : 1 ,
    name : ' **** 4864',
    icon : <EditIcon/>
  },
  {
    id : 2 ,
    name : ' **** 3597',
    icon : <EditIcon/>
  },
  {
    id : 3 ,
    name : null,
    icon : <PlusIcon/>
  },
  {
    id : 4 ,
    name : null,
    icon : <EditIcon/>
  },
  {
    id : 5 ,
    name : null,
    icon : <PlusIcon/>
  }
]


export const orderTrackingData = [
  {
    isCompleted : true,
    label : 'Order Confirmed',
    description : 'Your order has been confirmed'
  },
  {
    isCompleted : true,
    label : 'Order Shipping',
    description : 'Estimated for Feb 27, 2023'
  },
  {
    isCompleted : false,
    label : 'Courier Delivering',
    description : 'Estimated for Feb 27, 2023'
  },
  {
    isCompleted : false,
    label : 'Receiving',
    description : 'Estimated for Feb 27, 2023'
  }
]