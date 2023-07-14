// 所有的请求都定义在这个位置
import axios from "axios";
import store from 'storejs';
const http = axios.create({
    baseURL:'https://netease-cloud-music-api-five-roan-88.vercel.app'
})
// 添加请求拦截器
http.interceptors.request.use(function(config) {
    const cookie = store.get('__m__cookie') ?? "";
    config.params = config.params || {};
    config.params.cookie = cookie;
    return config
})

export const fetchPlaylist = (cat) => http.get('top/playlist',{params:{cat}});
export const fetchPlaylistHot = () => http.get('/playlist/hot');
// 获取搜索关键字
/**
 * @description 关键字
 * @param {Array} 无
 * @returns {Promise}
 */
export const fetchSearchDefault = () => http.get('/search/default');

export const fetchSearchResult = (params) => http.get('/search',{params})

// 搜索建议
export const fetchSeachSuggest = (keywords) => http.get('/search/suggest',{params:{keywords}})

// 榜单
export async function fetchSeachList() {
    const res = await http.get('/toplist/detail'); // 榜单
    const playlist = await Promise.all(res.data.list.map(({id}) => http.get('./playlist/detail',{params:{id}})));
    return playlist.map(item => item.data.playlist);
} 

export const fetchSeachLike = () => http.get('search/hot/detail'); // 猜你喜欢

// 歌单头部
export const fetchSongSheet = (params) => http.get(`/playlist/detail?id=${params}`) 

// 歌单列表
export const fetchSongList = (params) => http.get(`/playlist/track/all?id=${params}`)
// 歌单头部中 用户也听了这个
export const fetchSongPlaylist = (id) => http.get('/related/playlist', { params: { id } })

// 登录
export const getQRkey = () => http.get('/login/qr/key');
export const getQRInfo = (key,qrimg = 1) => http.get('/login/qr/create',{params:{key,qrimg}})
export const checkQrStatus = (key) => http.get('/login/qr/check',{params:{key,timestamp:Date.now()}})
export const getUserAccount = () => http.get('/user/account') 
export const getUserDetail = (uid) => http.get('/user/detail',{params:{uid}})
export const getUserPlaylist = (uid) => http.get('/user/playlist', { params: { uid } });
// 地址
export const getIPAddr = () => axios.get('https://api.ipify.org/?format=json')
export const ip2Territory = (ip) => axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`)

// 评论
export const fetchUserHistory = (uid) => http.get('/user/comment/history', { params: { uid } });
//歌曲信息
export const fetchSongDetail = (ids) => http.get('/song/detail', { params: { ids } });

// 音乐播放
export const getMP3 = (id) => http.get('/song/url/v1',{params:{id,level:'standard'}})

// 更换用户信息
export const replaceUserDetail = (gender,birthday,nickname,city,signature) => http.get('/user/update',{params:{gender,birthday,nickname,city,signature}})

// 关注
export const fetchFollow = () => http.get('/artist/list?type=2&area=96&initial=b')

// MV排行
export const fetchMVlist = (area) => http.get('/top/mv', { params: { limit: 50, area } });
