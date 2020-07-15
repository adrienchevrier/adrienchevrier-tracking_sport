import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/metadata`);
    console.log('service');
    console.log(res);
    return res.data || [];
  }
}