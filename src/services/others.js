import axios from "axios";
import { API_ENPOINTS } from "../utils/api";

export const fetchOrderDetails = async (id) => await axios.get(`${API_ENPOINTS.ORDERS}/${id}`).then((res) => res.data).catch((err) => err);