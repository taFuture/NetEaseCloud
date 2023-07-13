import {getUserAccount,getUserDetail,replaceUserDetail} from '@/request'
import { areaList } from '@vant/area-data';
export default {
    render() {
        return (
            <div class="text-[1vw] mb-none bg-[#eaebee] overflow-auto dark:bg-[#151515] h-screen">
                <header class="w-screen flex justify-between h-[12vw] items-center px-[5.3vw] bg-[#fff] dark:bg-[#212121] dark:text-[#fff]">
                    <Icon icon="ep:arrow-left" class="w-[8vw] h-[8vw] text-[#010101] dark:text-[#fff]" nativeOnClick={() => {this.$router.push('/User')}}/>
                    <span class="text-[5vw]">编辑资料</span>
                    <span></span>
                </header>
                {/* 编辑内容 */}
                <section class="bg-[#fff] mt-[2.5vw] dark:bg-[#212121]">
                    <ul class="pl-[5.3vw]">
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw]">
                             <div class="dark:text-[#fff]">头像</div>
                            <div class="flex justify-between items-center">
                                <img src={this.user?.avatarUrl} alt="" class="w-[12.5vw] h-[12.5vw] rounded-full mr-[1.5vw]"  />
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw] border-y bordr-[#c0c2c4] dark:border-[#414141]" onClick={() => this.userName = !this.userName}>
                            <div class="dark:text-[#fff]">昵称</div>
                            <div class="flex justify-between items-center">
                                <span class="mr-[1.5vw] text-[#c0c2c4]">{this.detail.profile?.nickname}</span>
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw] border-b bordr-[#c0c2c4] dark:border-[#414141]" onClick={()=>this.show = !false}>
                            <div class="dark:text-[#fff]">性别</div>
                            <div class="flex justify-between items-center">
                                {this.shows == true ? (
                                <span class="mr-[1.5vw] text-[#c0c2c4]">{this.detail.profile.gender == 1 ? '男' : '女'}</span>
                                ) : ('')}
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw] ">
                            <div class="dark:text-[#fff]">二维码</div>
                            <div class="flex justify-between items-center">
                                <Icon icon="ph:qr-code-thin" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]"/>
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                    </ul>
                </section>
                <section class="bg-[#fff] mt-[2.5vw] dark:bg-[#212121]">
                    <ul class="pl-[5.3vw]">
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw] border-b bordr-[#c0c2c4] dark:border-[#414141]" onClick={() => {this.currentDateShow = !false}}>
                             <div class="dark:text-[#fff]">生日</div>
                            <div class="flex justify-between items-center">
                                <span class="mr-[1.5vw] text-[#c0c2c4]">{this.getRegistrationDate(this.detail.profile?.birthday)}</span>
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw] border-b bordr-[#c0c2c4] dark:border-[#414141]" onClick={() => { this.popupVisible = true }}>
                            <div class="dark:text-[#fff]">地区</div>
                            <div class="flex justify-between items-center">
                                <span class="mr-[1.5vw] text-[#c0c2c4]">{this.areaList.province_list[this.detail.profile?.province]} {this.areaList.city_list[this.detail.profile?.city]}</span>
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw] border-b bordr-[#c0c2c4] dark:border-[#414141]">
                            <div class="dark:text-[#fff]">大学</div>
                            <div>
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw] border-b bordr-[#c0c2c4] dark:border-[#414141]">
                            <div class="dark:text-[#fff]">音乐标签</div>
                            <div class="flex justify-between items-center">
                                <span class="mr-[1.5vw] text-[#c0c2c4]">选择标签</span>
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw]">
                            <div class="dark:text-[#fff]">简介</div>
                            <div class="flex justify-between items-center">
                                <span class="mr-[1.5vw] text-[#c0c2c4]">{this.detail.profile?.signature}</span>
                            </div>
                        </li>
                        {/* <li class="flex justify-between h-[32vw] leading-[15.8vw] pr-[5.3vw] ">
                            <div>{this.user?.nickname}</div>
                        </li> */}
                    </ul>
                </section>
                <section class="bg-[#fff] mt-[2.5vw] dark:bg-[#212121]">
                    <ul class="pl-[5.3vw]">
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw]">
                             <div class="dark:text-[#fff]">个人主页隐私设置</div>
                            <div class="flex justify-between items-center">
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                        <li class="flex items-center justify-between h-[15.8vw] leading-[15.8vw] pr-[5.3vw]">
                            <div class="dark:text-[#fff]">主页模版顺序设置</div>
                            <div class="flex justify-between items-center">
                                <Icon icon="ep:arrow-left" color="#c0c2c4" horizontalFlip="true" class="w-[5vw] h-[5vw]" />
                            </div>
                        </li>
                    </ul>
                </section>
                {/* 地区 */}
                <van-popup v-model={this.popupVisible} position="bottom" style={{ height: '40%' }}>
                    <van-area columns-num="2" confirm-button-text="完成" cancel-button-text="取消" area-list={areaList} onConfirm={this.changeArea} onCancel={()=>this.popupVisible = false}/>
                </van-popup>
                {/* 性别 */}
                <van-popup v-model={this.show} class="w-[68vw] rounded-[3vw] px-[5.8vw] py-[4.2vw] dark:bg-[#212121]">                    
                    <ul class="text-[#fff]" onClick={this.getSex}>
                        <li class="h-[9vw] leading-[9vw] flex justify-between items-center">
                            男
                            {this.sex === '男' ? <Icon icon="dashicons:yes" class="w-[5vw] h-[5vw] text-[red]"/> : ''}
                        </li>
                        <li class="h-[9vw] leading-[9vw] flex justify-between items-center">
                            女
                            {this.sex === '女' ? <Icon icon="dashicons:yes" class="w-[5vw] h-[5vw] text-[red]"/> : ''}
                        </li>
                    </ul>
                    <div class="w-[7vw] h-[7vw] rounded-full absolute top-1/2 left-1/2 translate-x-[-50%]  translate-y-[-50%]" onClick={this.changeSex}>
                        <Icon icon="mdi:remove" color="#b1b1b1" class="w-[7vw] h-[7vw] absolute top-[13vw] left-1/2 translate-x-[-50%]  translate-y-[-50%]"/>
                    </div>
                </van-popup>
                {/* 年月日 */}
                <van-popup  v-model={this.currentDateShow} position="bottom" style={{ height: '40%' }}>
                    <van-datetime-picker type="date" title="选择年月日" min-date={this.minDate} max-date={this.maxDate} onConfirm={this.changeBirty} onCancel={()=>this.currentDateShow = false}/>  
                </van-popup>
                {/* 改昵称 */}
                <van-popup v-model={this.userName} class="w-[100%] h-[100%] px-[5.8vw] py-[4.2vw]">
                        <header class="text-[#333] flex justify-between items-center h-[16vw]">
                            <div class="flex items-center">
                                <Icon icon="ph:arrow-left" class="text-[#333] w-[5vw] h-[5vw] mr-[3vw]" nativeOnclick={() => this.userName = false}/>
                                <span>修改昵称</span>
                            </div>
                            <div onClick={this.changeName}>保存</div>
                        </header>
                        <div class="relative">
                            <input type="text" class="border-b border-[#ccc] w-[100%]" value={this.detail.profile?.nickname} ref="myInput"/>
                            <Icon icon="ph:x-thin" class="text-[#ccc] w-[5vw] h-[5vw] absolute right-0 bottom-0" nativeOnclick={() => this.$refs.myInput.value = ''}/>
                        </div>
                </van-popup>
            </div>
        )
    },
    data() {    
        return {
            userName:false,//  弹出name
            user:null,
            popupVisible:false, // 底部弹出
            areaList:Object.freeze(areaList), // 冻结
            area:[],
            date:[],
            show: false, // 男女选择                                                                             
            currentDateShow:false, // 年月日
            minDate: new Date(1990, 0, 1), // 最小时间
            maxDate: new Date(2100, 12, 31), // 最大时间
            currentDate: new Date(2021, 0, 17),
            birthdays:'', // 生日信息
            checked:null, // 暗黑模式
            sex:null,
            genders:null,  // 数据性别
            birthdays:'', // 修改生日信息
            nicknames:'', // 修改昵称
            citys:'', //修改城市
            signatures:'', //修改用户签名
            userArr:[], // 用户信息的数组
            detail:[],
            shows:false, 
            areaList, // 地区数据
        }
    },
    async created() {
        console.log(this.areaList);
        // 登录
        const res1 = await getUserAccount();
        this.user = res1.data.profile
        // 用户详情
        const detail = await getUserDetail(res1.data.profile.userId);
        this.detail = detail.data
        this.genders = detail.data.profile.gender // 性别
        this.birthdays = detail.data.profile.birthday // 生日
        this.nicknames = detail.data.profile.nickname // 昵称
        this.provinces = detail.data.profile.province // 省
        this.citys = detail.data.profile.city // 城市
        this.signatures = detail.data.profile.signature // 简介
        console.log(this.detail);
        // 更改用户信息
        
        this.userArr = [this.genders,this.birthdays,this.nicknames,this.provinces,this.citys,this.signatures]
        console.log(this.userArr)
        // console.log(editor);
        this.shows = true
    },
    methods: {
        // 地区
        // confirm() {
        //     console.log(e);
        //     // console.log(this.area);
        // },
        // 日期
        getRegistrationDate(totalDays) {
            const registrationDate = new Date(totalDays); // 计算日期
            const year = registrationDate.getFullYear(); // 获取年份
            const month = registrationDate.getMonth() + 1; // 获取月份
            const date = registrationDate.getDate(); // 获取日期

            return `${year}-${month}-${date}`;
        },
        getSex(e) {
            this.sex = e.target.innerText
            // console.log(this.sex);
            if(this.sex == '男'){
                this.detail.profile.gender = 1
            }else{
                this.detail.profile.gender = 2
            }
        },
        sexShow() {
            this.show = !this.show;
        },
        // 性别
        async changeSex() {
            this.show = !this.show;
            if(this.userArr[0] != this.detail.profile.gender){
                this.userArr[0] = this.detail.profile.gender
                const editor = await replaceUserDetail(this.userArr[0],this.userArr[1],this.userArr[2],this.userArr[3],this.userArr[4],this.userArr[5]).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        // 生日
        async changeBirty(e) {
            this.currentDateShow = false;
            this.date = e;
            const newDate = new Date(this.date).getTime();
            // console.log(newDate);
            this.detail.profile.birthday = newDate;
            // console.log(this.date);
            // this.date = e;
            if(this.userArr[1] != this.detail.profile.birthday){
                this.userArr[1] = this.detail.profile.birthday
                const editor = await replaceUserDetail(this.userArr[0],this.userArr[1],this.userArr[2],this.userArr[3],this.userArr[4],this.userArr[5]).then((res) => {
                    console.log(res);
                }).catch((err) => { 
                    console.log(err);
                });
                // console.log(this.userArr[1]);
            }
        },
        // 地区
        async changeArea(e) {
            this.popupVisible = false;
            this.area = e;
            this.detail.profile.province = Number(this.area[0].code)
            this.detail.profile.city = Number(this.area[1].code)
            console.log(this.area[1].code);
            if(this.userArr[3] != this.detail.profile.province && this.userArr[4] != this.detail.profile.city){
                this.userArr[3] = this.detail.profile.province
                this.userArr[4] = this.detail.profile.city
                console.log(this.userArr[0],this.userArr[1],this.userArr[2],this.userArr[3],this.userArr[4],this.userArr[5]);
                const editor = await replaceUserDetail(this.userArr[0],this.userArr[1],this.userArr[2],this.userArr[3],this.userArr[4],this.userArr[5]).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
                
            }
        },
        async changeName() {
            this.userName = false;
            const inputValue = this.$refs.myInput.value;
            this.detail.profile.nickname = inputValue;
            // console.log(inputValue);
            if(this.userArr[2] != this.detail.profile.nickname){
                this.userArr[2] = this.detail.profile.nickname
                const editor = await replaceUserDetail(this.userArr[0],this.userArr[1],this.userArr[2],this.userArr[3],this.userArr[4],this.userArr[5]).then((res) => {
                    console.log(res);
                }).catch((err) => { 
                    console.log(err);
                });
                // console.log(this.userArr[1]);
            }
        } 
    }
}